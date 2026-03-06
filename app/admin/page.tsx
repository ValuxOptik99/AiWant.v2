import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Users, FolderKanban, Clock, Receipt, CheckCircle, XCircle } from "lucide-react";

export default async function AdminDashboard() {
  const [totalClients, pending, activeProjects, overdueInvoices] = await Promise.all([
    prisma.user.count({ where: { role: "CLIENT" } }),
    prisma.user.findMany({ where: { role: "PENDING" }, orderBy: { createdAt: "desc" } }),
    prisma.project.count({ where: { status: { in: ["IN_PROGRESS", "REVIEW", "DISCOVERY"] } } }),
    prisma.document.count({ where: { type: "INVOICE", invoiceStatus: "OVERDUE" } }),
  ]);

  return (
    <div className="max-w-5xl space-y-8">
      <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Clienți activi", value: totalClients, icon: Users, color: "#3B82F6", href: "/admin/clients" },
          { label: "În așteptare", value: pending.length, icon: Clock, color: "#F59E0B", href: "/admin/clients?role=PENDING" },
          { label: "Proiecte active", value: activeProjects, icon: FolderKanban, color: "var(--color-gold)", href: "/admin/projects" },
          { label: "Facturi restante", value: overdueInvoices, icon: Receipt, color: overdueInvoices > 0 ? "#EF4444" : "#10B981", href: "/admin/projects" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.label} href={s.href} className="rounded-xl p-5 transition-shadow hover:shadow-md" style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>{s.label}</span>
                <Icon size={16} style={{ color: s.color }} />
              </div>
              <div className="text-2xl font-bold" style={{ color: s.color, fontFamily: "var(--font-display)" }}>{s.value}</div>
            </Link>
          );
        })}
      </div>

      {/* Pending approvals */}
      {pending.length > 0 && (
        <div className="rounded-xl p-6" style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}>
          <h2 className="font-bold mb-4" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>
            Conturi în așteptarea aprobării ({pending.length})
          </h2>
          <div className="space-y-3">
            {pending.map((u) => (
              <div key={u.id} className="flex items-center justify-between gap-4 p-4 rounded-xl" style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}>
                <div>
                  <p className="font-medium text-sm" style={{ color: "var(--color-text-primary)" }}>{u.name}</p>
                  <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>{u.email}{u.company ? ` · ${u.company}` : ""}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                    {new Date(u.createdAt).toLocaleDateString("ro-RO")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <form action={`/api/admin/approve`} method="POST">
                    <input type="hidden" name="userId" value={u.id} />
                    <input type="hidden" name="action" value="approve" />
                    <button type="submit" className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg" style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}>
                      <CheckCircle size={12} /> Aprobă
                    </button>
                  </form>
                  <form action={`/api/admin/approve`} method="POST">
                    <input type="hidden" name="userId" value={u.id} />
                    <input type="hidden" name="action" value="reject" />
                    <button type="submit" className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}>
                      <XCircle size={12} /> Respinge
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
