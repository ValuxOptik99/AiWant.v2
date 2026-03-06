import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, FileText, BarChart2, MessageSquare, CheckCircle, Circle, Clock } from "lucide-react";
import { PROJECT_STATUS_LABEL, PROJECT_STATUS_COLOR, formatDate } from "@/lib/portal-utils";

type Props = { params: Promise<{ id: string }> };

export default async function ProjectDetailPage({ params }: Props) {
  const session = await auth();
  if (!session) redirect("/auth/login");

  const { id } = await params;

  const project = await prisma.project.findFirst({
    where: { id, clientId: session.user.id },
    include: { milestones: { orderBy: { order: "asc" } }, _count: { select: { documents: true } } },
  });

  if (!project) notFound();

  const completedMilestones = project.milestones.filter((m) => m.completed).length;
  const progress = project.milestones.length > 0 ? Math.round((completedMilestones / project.milestones.length) * 100) : 0;

  return (
    <div className="max-w-4xl space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
        <Link href="/portal/projects" className="hover:underline" style={{ color: "var(--color-gold)" }}>Proiecte</Link>
        <span>/</span>
        <span>{project.name}</span>
      </div>

      {/* Header */}
      <div className="rounded-xl p-6" style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>{project.name}</h1>
            {project.domain && (
              <a href={`https://${project.domain}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm hover:underline" style={{ color: "var(--color-navy)" }}>
                {project.domain} <ExternalLink size={12} />
              </a>
            )}
          </div>
          <span className="text-sm font-semibold px-3 py-1.5 rounded-full" style={{ background: PROJECT_STATUS_COLOR[project.status] + "18", color: PROJECT_STATUS_COLOR[project.status] }}>
            {PROJECT_STATUS_LABEL[project.status]}
          </span>
        </div>

        {project.description && (
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{project.description}</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t" style={{ borderColor: "var(--color-border)" }}>
          {[
            { label: "Data start", value: formatDate(project.startDate) },
            { label: "Data finalizare", value: formatDate(project.endDate) },
            { label: "Valoare proiect", value: project.totalValue ? `${project.totalValue} EUR` : "—" },
            { label: "Abonament lunar", value: project.monthlyFee ? `${project.monthlyFee} EUR/lună` : "—" },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs font-medium mb-1" style={{ color: "var(--color-text-secondary)" }}>{item.label}</p>
              <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Documente", sub: `${project._count.documents} fișiere`, href: `/portal/projects/${project.id}/documents`, icon: FileText },
          { label: "Statistici", sub: "Trafic, uptime, performanță", href: `/portal/projects/${project.id}/stats`, icon: BarChart2 },
          { label: "Contactează-mă", sub: "Trimite un mesaj", href: "/#contact", icon: MessageSquare },
        ].map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.label} href={action.href} className="flex items-center gap-4 p-5 rounded-xl transition-shadow duration-200 hover:shadow-md group" style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,168,67,0.1)" }}>
                <Icon size={18} style={{ color: "var(--color-gold)" }} />
              </div>
              <div>
                <p className="font-semibold text-sm group-hover:underline" style={{ color: "var(--color-text-primary)" }}>{action.label}</p>
                <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>{action.sub}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Milestones */}
      {project.milestones.length > 0 && (
        <div className="rounded-xl p-6" style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>Progres proiect</h2>
            <span className="text-sm font-bold" style={{ color: "var(--color-gold)" }}>{progress}%</span>
          </div>
          <div className="w-full h-2 rounded-full mb-6" style={{ background: "var(--color-border)" }}>
            <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: "var(--color-gold)" }} />
          </div>
          <div className="space-y-3">
            {project.milestones.map((m) => (
              <div key={m.id} className="flex items-start gap-3">
                {m.completed ? (
                  <CheckCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: "#10B981" }} />
                ) : m.dueDate && new Date(m.dueDate) < new Date() ? (
                  <Clock size={18} className="flex-shrink-0 mt-0.5" style={{ color: "#F59E0B" }} />
                ) : (
                  <Circle size={18} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-text-muted)" }} />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: m.completed ? "var(--color-text-secondary)" : "var(--color-text-primary)", textDecoration: m.completed ? "line-through" : "none" }}>
                    {m.title}
                  </p>
                  {m.description && <p className="text-xs mt-0.5" style={{ color: "var(--color-text-secondary)" }}>{m.description}</p>}
                  {m.dueDate && !m.completed && <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>Termen: {formatDate(m.dueDate)}</p>}
                </div>
                {m.completed && m.completedAt && (
                  <span className="text-xs flex-shrink-0" style={{ color: "#10B981" }}>{formatDate(m.completedAt)}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
