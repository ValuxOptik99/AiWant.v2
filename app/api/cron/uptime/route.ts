import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function GET(req: Request) {
  // Verify cron secret to prevent unauthorized calls
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projects = await prisma.project.findMany({
    where: { domain: { not: null }, status: { in: ["IN_PROGRESS", "COMPLETED", "MAINTENANCE"] } },
    select: { id: true, domain: true },
  });

  const results = await Promise.allSettled(
    projects.map(async (project) => {
      const url = `https://${project.domain}`;
      const start = Date.now();
      let status: "UP" | "DOWN" | "DEGRADED" = "DOWN";
      let responseTime: number | null = null;

      try {
        const res = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(10000) });
        responseTime = Date.now() - start;
        if (res.ok) {
          status = responseTime > 3000 ? "DEGRADED" : "UP";
        }
      } catch {
        responseTime = null;
      }

      await prisma.uptimeCheck.create({
        data: { projectId: project.id, status, responseTime },
      });

      return { projectId: project.id, domain: project.domain, status, responseTime };
    })
  );

  // Clean up old uptime checks (keep last 30 days)
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await prisma.uptimeCheck.deleteMany({ where: { checkedAt: { lt: thirtyDaysAgo } } });

  const succeeded = results.filter((r) => r.status === "fulfilled").map((r) => (r as PromiseFulfilledResult<any>).value);

  return NextResponse.json({ checked: succeeded.length, results: succeeded });
}
