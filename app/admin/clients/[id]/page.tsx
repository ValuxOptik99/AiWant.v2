import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/lib/portal-utils";
import { PROJECT_STATUS_LABEL, PROJECT_STATUS_COLOR } from "@/lib/portal-utils";
import ApprovalActions from "@/components/admin/ApprovalActions";

type Props = { params: Promise<{ id: string }> };

export default async function AdminClientDetailPage({ params }: Props) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
    include: { projects: { include: { _count: { select: { documents: true } } } } },
  });
  if (!user) notFound();

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
        <Link href="/admin/clients" className="hover:underline" style={{ color: "var(--color-gold)" }}>Clienți</Link>
        <span>/</span>
        <span>{user.name}</span>
      </div>

      {/* Client info */}
      <div className="rounded-xl p-6" style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>{user.name}</h1>
            <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>{user.email}</p>
            {user.company && <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>{user.company}</p>}
            {user.phone && <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>{user.phone}</p>}
          </div>
          <div className="flex flex-col gap-2 items-end">
            {user.role === "PENDING" && <ApprovalActions userId={user.id} />}
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Înregistrat: {formatDate(user.createdAt)}</p>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="rounded-xl p-6" style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>Proiecte ({user.projects.length})</h2>
          <Link href={`/admin/projects?client=${user.id}`} className="text-xs font-medium px-3 py-1.5 rounded-lg" style={{ background: "rgba(212,168,67,0.1)", color: "var(--color-gold)" }}>
            + Proiect nou
          </Link>
        </div>
        <div className="space-y-3">
          {user.projects.map((p) => (
            <Link key={p.id} href={`/admin/projects/${p.id}`} className="flex items-center justify-between p-4 rounded-xl group" style={{ background: "var(--color-surface-warm)", border: "1px solid var(--color-border)" }}>
              <div>
                <p className="font-medium text-sm group-hover:underline" style={{ color: "var(--color-text-primary)" }}>{p.name}</p>
                {p.domain && <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>{p.domain} · {p._count.documents} doc</p>}
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: PROJECT_STATUS_COLOR[p.status] + "18", color: PROJECT_STATUS_COLOR[p.status] }}>
                {PROJECT_STATUS_LABEL[p.status]}
              </span>
            </Link>
          ))}
          {user.projects.length === 0 && <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>Niciun proiect.</p>}
        </div>
      </div>
    </div>
  );
}
