import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { UserRole } from "@prisma/client";
import { formatDate } from "@/lib/portal-utils";

const ROLE_LABEL: Record<UserRole, string> = { ADMIN: "Admin", CLIENT: "Client", PENDING: "În așteptare" };
const ROLE_COLOR: Record<UserRole, string> = { ADMIN: "#3B82F6", CLIENT: "#10B981", PENDING: "#F59E0B" };

type Props = { searchParams: Promise<{ role?: string; q?: string }> };

export default async function AdminClientsPage({ searchParams }: Props) {
  const { role, q } = await searchParams;

  const clients = await prisma.user.findMany({
    where: {
      role: role ? { equals: role as UserRole } : { in: ["CLIENT", "PENDING"] },
      OR: q ? [{ name: { contains: q, mode: "insensitive" } }, { email: { contains: q, mode: "insensitive" } }] : undefined,
    },
    include: { _count: { select: { projects: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>Clienți</h1>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}>
        <div className="p-4 border-b flex flex-wrap gap-3" style={{ borderColor: "var(--color-border)" }}>
          {(["", "CLIENT", "PENDING"] as const).map((r) => (
            <Link key={r} href={r ? `/admin/clients?role=${r}` : "/admin/clients"} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: role === r || (!role && !r) ? "var(--color-gold)" : "var(--color-surface-warm)", color: role === r || (!role && !r) ? "#fff" : "var(--color-text-secondary)", border: "1px solid var(--color-border)" }}>
              {r === "CLIENT" ? "Clienți activi" : r === "PENDING" ? "În așteptare" : "Toți"}
            </Link>
          ))}
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-border)", background: "var(--color-surface-warm)" }}>
              {["Nume", "Email", "Firmă", "Rol", "Proiecte", "Înregistrat", "Acțiuni"].map((h) => (
                <th key={h} className="text-left px-5 py-3 font-semibold text-xs uppercase tracking-wide" style={{ color: "var(--color-text-secondary)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clients.map((u) => (
              <tr key={u.id} style={{ borderBottom: "1px solid var(--color-border)" }} className="hover:bg-[var(--color-surface-warm)] transition-colors">
                <td className="px-5 py-4 font-medium" style={{ color: "var(--color-text-primary)" }}>{u.name}</td>
                <td className="px-5 py-4" style={{ color: "var(--color-text-secondary)" }}>{u.email}</td>
                <td className="px-5 py-4" style={{ color: "var(--color-text-secondary)" }}>{u.company ?? "—"}</td>
                <td className="px-5 py-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: ROLE_COLOR[u.role] + "18", color: ROLE_COLOR[u.role] }}>
                    {ROLE_LABEL[u.role]}
                  </span>
                </td>
                <td className="px-5 py-4 text-center" style={{ color: "var(--color-text-secondary)" }}>{u._count.projects}</td>
                <td className="px-5 py-4" style={{ color: "var(--color-text-secondary)" }}>{formatDate(u.createdAt)}</td>
                <td className="px-5 py-4">
                  <Link href={`/admin/clients/${u.id}`} className="text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: "rgba(212,168,67,0.1)", color: "var(--color-gold)" }}>
                    Gestionează
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {clients.length === 0 && <p className="text-sm text-center py-10" style={{ color: "var(--color-text-secondary)" }}>Niciun client găsit.</p>}
      </div>
    </div>
  );
}
