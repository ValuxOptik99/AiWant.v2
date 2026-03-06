import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";
import { PROJECT_STATUS_LABEL, PROJECT_STATUS_COLOR, formatDate } from "@/lib/portal-utils";

export default async function ProjectsPage() {
  const session = await auth();
  if (!session) redirect("/auth/login");

  const projects = await prisma.project.findMany({
    where: { clientId: session.user.id },
    include: { _count: { select: { documents: true, milestones: true } } },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>Proiectele mele</h1>

      {projects.length === 0 ? (
        <div className="rounded-xl p-12 text-center" style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}>
          <p className="text-base font-medium mb-2" style={{ color: "var(--color-text-primary)" }}>Nu ai încă proiecte</p>
          <p className="text-sm mb-6" style={{ color: "var(--color-text-secondary)" }}>Contactează-ne pentru a începe primul tău proiect.</p>
          <Link href="/#contact" className="inline-block px-6 py-3 rounded-xl text-sm font-semibold text-white" style={{ background: "var(--color-gold)" }}>
            Contactează-ne
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/portal/projects/${p.id}`}
              className="group flex items-center justify-between p-6 rounded-xl transition-shadow duration-200 hover:shadow-md"
              style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,168,67,0.1)" }}>
                  <Globe size={18} style={{ color: "var(--color-gold)" }} />
                </div>
                <div>
                  <p className="font-semibold group-hover:underline" style={{ color: "var(--color-text-primary)" }}>{p.name}</p>
                  <div className="flex items-center gap-3 mt-1">
                    {p.domain && <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>{p.domain}</span>}
                    <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                      {p._count.documents} doc · {p._count.milestones} etape
                    </span>
                    {p.startDate && <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>Început: {formatDate(p.startDate)}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: PROJECT_STATUS_COLOR[p.status] + "18", color: PROJECT_STATUS_COLOR[p.status] }}>
                  {PROJECT_STATUS_LABEL[p.status]}
                </span>
                <ArrowRight size={16} className="opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: "var(--color-gold)" }} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
