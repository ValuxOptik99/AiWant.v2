import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import UptimeStats from "@/components/portal/UptimeStats";

type Props = { params: Promise<{ id: string }> };

export default async function ProjectStatsPage({ params }: Props) {
  const session = await auth();
  if (!session) redirect("/auth/login");

  const { id } = await params;

  const project = await prisma.project.findFirst({
    where: { id, clientId: session.user.id },
  });
  if (!project) notFound();

  // Uptime last 48 checks
  const uptimeChecks = await prisma.uptimeCheck.findMany({
    where: { projectId: id },
    orderBy: { checkedAt: "desc" },
    take: 288, // ~24h at 5min intervals
  });

  const uptime24h = uptimeChecks.length > 0
    ? ((uptimeChecks.filter((c) => c.status === "UP").length / uptimeChecks.length) * 100).toFixed(2)
    : null;
  const avgResponseTime = uptimeChecks.length > 0
    ? Math.round(uptimeChecks.reduce((s, c) => s + (c.responseTime ?? 0), 0) / uptimeChecks.filter((c) => c.responseTime !== null).length)
    : null;
  const lastCheck = uptimeChecks[0] ?? null;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
        <Link href="/portal/projects" className="hover:underline" style={{ color: "var(--color-gold)" }}>Proiecte</Link>
        <span>/</span>
        <Link href={`/portal/projects/${id}`} className="hover:underline" style={{ color: "var(--color-gold)" }}>{project.name}</Link>
        <span>/</span>
        <span>Statistici</span>
      </div>

      <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>Statistici</h1>

      {/* Uptime section */}
      <UptimeStats
        lastCheck={lastCheck ? { status: lastCheck.status, responseTime: lastCheck.responseTime, checkedAt: lastCheck.checkedAt.toISOString() } : null}
        uptime24h={uptime24h}
        avgResponseTime={avgResponseTime}
        checks={uptimeChecks.slice(0, 48).reverse().map((c) => ({ responseTime: c.responseTime, status: c.status, checkedAt: c.checkedAt.toISOString() }))}
      />

      {/* Analytics placeholder */}
      <div className="rounded-xl p-8 text-center" style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}>
        <h2 className="font-bold mb-2" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>Trafic Google Analytics</h2>
        {project.gaPropertyId ? (
          <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>Datele GA4 sunt disponibile. Conectat la proprietatea {project.gaPropertyId}.</p>
        ) : (
          <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>Statisticile de trafic nu sunt configurate încă. Contactează-ne pentru integrarea Google Analytics.</p>
        )}
      </div>

      {/* PageSpeed placeholder */}
      <div className="rounded-xl p-8 text-center" style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}>
        <h2 className="font-bold mb-2" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>Performanță (Core Web Vitals)</h2>
        {project.domain ? (
          <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>Scorul de performanță pentru {project.domain} este calculat zilnic.</p>
        ) : (
          <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>Domeniul proiectului nu este configurat.</p>
        )}
      </div>
    </div>
  );
}
