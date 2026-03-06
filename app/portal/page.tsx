import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FolderKanban, FileText, Receipt, Activity, ArrowRight } from "lucide-react";
import { PROJECT_STATUS_LABEL, PROJECT_STATUS_COLOR } from "@/lib/portal-utils";

export default async function PortalDashboard() {
  const session = await auth();
  if (!session) redirect("/auth/login");

  const [projects, documents, notifications] = await Promise.all([
    prisma.project.findMany({
      where: { clientId: session.user.id },
      include: { documents: true, milestones: true },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.document.findMany({
      where: { project: { clientId: session.user.id } },
    }),
    prisma.notification.findMany({
      where: { userId: session.user.id, read: false },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const unpaidInvoices = documents.filter(
    (d) => d.type === "INVOICE" && d.invoiceStatus !== "PAID"
  );
  const unpaidTotal = unpaidInvoices.reduce((s, d) => s + (d.invoiceAmount ?? 0), 0);
  const activeProjects = projects.filter((p) => ["DISCOVERY", "IN_PROGRESS", "REVIEW", "MAINTENANCE"].includes(p.status));

  const today = new Date().toLocaleDateString("ro-RO", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>
          Bună, {session.user.name?.split(" ")[0]}!
        </h1>
        <p className="text-sm capitalize" style={{ color: "var(--color-text-secondary)" }}>{today}</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Proiecte active", value: activeProjects.length, icon: FolderKanban, color: "var(--color-navy)" },
          { label: "Documente", value: documents.length, icon: FileText, color: "#3B82F6" },
          { label: "Facturi neplătite", value: unpaidInvoices.length, sub: unpaidTotal > 0 ? `${unpaidTotal.toFixed(0)} EUR` : undefined, icon: Receipt, color: unpaidInvoices.length > 0 ? "#EF4444" : "#10B981" },
          { label: "Notificări noi", value: notifications.length, icon: Activity, color: "#F59E0B" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-xl p-5" style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>{stat.label}</span>
                <Icon size={16} style={{ color: stat.color }} />
              </div>
              <div className="text-2xl font-bold" style={{ color: stat.color, fontFamily: "var(--font-display)" }}>{stat.value}</div>
              {stat.sub && <div className="text-xs mt-1" style={{ color: "#EF4444" }}>{stat.sub}</div>}
            </div>
          );
        })}
      </div>

      {/* Unread notifications */}
      {notifications.length > 0 && (
        <div className="rounded-xl p-6" style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>Notificări recente</h2>
            <Link href="/portal/notifications" className="text-xs font-medium flex items-center gap-1 hover:underline" style={{ color: "var(--color-gold)" }}>
              Vezi toate <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {notifications.map((n) => (
              <div key={n.id} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: "rgba(212,168,67,0.06)" }}>
                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: "var(--color-gold)" }} />
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>{n.title}</p>
                  <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects overview */}
      <div className="rounded-xl p-6" style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>Proiectele mele</h2>
          <Link href="/portal/projects" className="text-xs font-medium flex items-center gap-1 hover:underline" style={{ color: "var(--color-gold)" }}>
            Toate proiectele <ArrowRight size={12} />
          </Link>
        </div>

        {projects.length === 0 ? (
          <p className="text-sm text-center py-8" style={{ color: "var(--color-text-secondary)" }}>
            Nu ai încă proiecte. Contactează-ne pentru a începe.
          </p>
        ) : (
          <div className="space-y-3">
            {projects.map((p) => (
              <Link
                key={p.id}
                href={`/portal/projects/${p.id}`}
                className="flex items-center justify-between p-4 rounded-xl transition-colors duration-150 group"
                style={{ background: "var(--color-surface-warm)", border: "1px solid var(--color-border)" }}
              >
                <div>
                  <p className="font-medium text-sm group-hover:underline" style={{ color: "var(--color-text-primary)" }}>{p.name}</p>
                  {p.domain && <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>{p.domain}</p>}
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: PROJECT_STATUS_COLOR[p.status] + "20", color: PROJECT_STATUS_COLOR[p.status] }}>
                  {PROJECT_STATUS_LABEL[p.status]}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
