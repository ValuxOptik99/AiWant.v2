import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const maxDuration = 45;

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 3;

const IMPORTANT_AUDITS = [
  "render-blocking-resources",
  "unused-javascript",
  "uses-optimized-images",
  "server-response-time",
  "largest-contentful-paint-element",
  "uses-text-compression",
  "uses-responsive-images",
];

function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function isRawIp(host: string): boolean {
  // IPv4
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) return true;
  // IPv6 (contains a colon, or is bracketed)
  if (host.includes(":")) return true;
  return false;
}

function normalizeUrl(input: string): { ok: true; url: string } | { ok: false; error: string } {
  const trimmed = input.trim();
  if (!trimmed) return { ok: false, error: "URL invalid." };

  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  let parsed: URL;
  try {
    parsed = new URL(withScheme);
  } catch {
    return { ok: false, error: "URL invalid." };
  }

  const host = parsed.hostname.toLowerCase();

  if (
    host === "localhost" ||
    host.endsWith(".local") ||
    host.startsWith("127.") ||
    host.startsWith("10.") ||
    host.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(host) ||
    isRawIp(host)
  ) {
    return { ok: false, error: "Doar domenii publice pot fi analizate." };
  }

  if (!host.includes(".")) {
    return { ok: false, error: "URL invalid." };
  }

  return { ok: true, url: parsed.toString() };
}

type LighthouseAudit = {
  title?: string;
  score?: number | null;
  numericValue?: number;
  details?: { overallSavingsMs?: number };
};

export async function POST(req: Request) {
  let body: { url?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Cerere invalidă." }, { status: 400 });
  }

  if (!body.url || typeof body.url !== "string") {
    return NextResponse.json({ error: "URL invalid." }, { status: 400 });
  }

  const normalized = normalizeUrl(body.url);
  if (!normalized.ok) {
    return NextResponse.json({ error: normalized.error }, { status: 400 });
  }

  const ipHash = hashIp(getClientIp(req));
  const recentCount = await prisma.auditLead.count({
    where: { ipHash, createdAt: { gte: new Date(Date.now() - RATE_LIMIT_WINDOW_MS) } },
  });
  if (recentCount >= RATE_LIMIT_MAX) {
    return NextResponse.json(
      { error: "Ai atins limita de analize pentru această oră. Contactează-mă direct pentru un audit manual complet." },
      { status: 429 }
    );
  }

  const psiUrl = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  psiUrl.searchParams.set("url", normalized.url);
  psiUrl.searchParams.set("strategy", "mobile");
  psiUrl.searchParams.set("category", "performance");
  psiUrl.searchParams.set("locale", "ro");
  if (process.env.PAGESPEED_API_KEY) {
    psiUrl.searchParams.set("key", process.env.PAGESPEED_API_KEY);
  }

  let data: any;
  try {
    const res = await fetch(psiUrl.toString(), { signal: AbortSignal.timeout(35000) });
    if (!res.ok) throw new Error(`PSI status ${res.status}`);
    data = await res.json();
    if (!data.lighthouseResult) throw new Error("No lighthouseResult");
  } catch {
    return NextResponse.json(
      { error: "Nu am putut analiza acest site. Verifică adresa sau contactează-mă pentru un audit manual." },
      { status: 422 }
    );
  }

  const audits: Record<string, LighthouseAudit> = data.lighthouseResult.audits ?? {};
  const performanceScore = Math.round((data.lighthouseResult.categories?.performance?.score ?? 0) * 100);
  const lcp = audits["largest-contentful-paint"]?.numericValue
    ? audits["largest-contentful-paint"].numericValue! / 1000
    : null;
  const cls = audits["cumulative-layout-shift"]?.numericValue ?? null;
  const inp = audits["interaction-to-next-paint"]?.numericValue ?? null;

  const issueCandidates = Object.entries(audits)
    .filter(([id, audit]) => {
      if (audit.score === null || audit.score === undefined) return false;
      if (audit.score >= 0.9) return false;
      const savings = audit.details?.overallSavingsMs ?? 0;
      return savings > 100 || IMPORTANT_AUDITS.includes(id);
    })
    .map(([id, audit]) => ({
      title: audit.title ?? id,
      savings: audit.details?.overallSavingsMs ? audit.details.overallSavingsMs / 1000 : null,
    }))
    .sort((a, b) => (b.savings ?? 0) - (a.savings ?? 0))
    .slice(0, 5);

  const passed = IMPORTANT_AUDITS
    .filter((id) => audits[id]?.score !== null && audits[id]?.score !== undefined && audits[id].score! >= 0.9)
    .map((id) => audits[id].title ?? id)
    .slice(0, 4);

  const lead = await prisma.auditLead.create({
    data: {
      url: normalized.url,
      performanceScore,
      lcp,
      cls,
      inp: inp ? Math.round(inp) : null,
      topIssues: issueCandidates,
      ipHash,
    },
  });

  return NextResponse.json({
    auditId: lead.id,
    performanceScore,
    lcp,
    cls,
    inp: inp ? Math.round(inp) : null,
    topIssues: issueCandidates,
    passed,
  });
}
