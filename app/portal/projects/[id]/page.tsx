import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, FileText, BarChart2, MessageSquare, CheckCircle, Circle, Clock, AlertTriangle } from "lucide-react";
import { PROJECT_STATUS_LABEL, PROJECT_STATUS_COLOR, formatDate } from "@/lib/portal-utils";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/utils";

const DAY_MS = 24 * 60 * 60 * 1000;

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
  const totalMilestones = project.milestones.length;
  const progress = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;
  const firstIncompleteId = project.milestones.find((m) => !m.completed)?.id;
  const isActiveStatus = project.status === "DISCOVERY" || project.status === "IN_PROGRESS";
  const showMilestonesSection = totalMilestones > 0 || isActiveStatus;

  const momentumCopy =
    progress === 0 && isActiveStatus
      ? { text: "Proiectul tău este în pregătire — prima etapă începe curând", color: "var(--color-gold)" }
      : progress === 100
      ? { text: "Toate etapele finalizate ✓", color: "#10B981" }
      : progress >= 50
      ? { text: "Mai mult de jumătate — se apropie finalul!", color: "var(--color-gold)" }
      : { text: "Prinde viteză 🚀", color: "var(--color-gold)" };

  const monthlyFeePct =
    project.monthlyFee && project.totalValue && project.totalValue > 0
      ? ((project.monthlyFee / project.totalValue) * 100).toFixed(1).replace(".", ",")
      : null;

  const now = new Date();
  const daysToEnd = project.endDate ? Math.ceil((project.endDate.getTime() - now.getTime()) / DAY_MS) : null;
  let contractStrip: { background: string; border: string; textColor: string; message: string } | null = null;
  if (daysToEnd !== null) {
    const dateLabel = formatDate(project.endDate);
    if (daysToEnd >= 31 && daysToEnd <= 45) {
      contractStrip = {
        background: "rgba(212,168,67,0.08)", border: "rgba(212,168,67,0.3)", textColor: "var(--color-gold)",
        message: `Perioada contractuală se încheie pe ${dateLabel}. Hai să discutăm continuarea — răspunde-mi cu 30 de zile înainte pentru condițiile actuale.`,
      };
    } else if (daysToEnd >= 0 && daysToEnd <= 30) {
      contractStrip = {
        background: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.3)", textColor: "#F59E0B",
        message: `Contractul expiră pe ${dateLabel}. Fără prelungire, hosting-ul și mentenanța se opresc la expirare. Contactează-mă pentru reînnoire.`,
      };
    } else if (daysToEnd < 0 && project.status !== "COMPLETED" && project.status !== "PAUSED") {
      contractStrip = {
        background: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.35)", textColor: "#EF4444",
        message: `Perioada contractuală a expirat pe ${dateLabel}. Serviciile funcționează în perioada de grație — reînnoiește pentru a evita întreruperea.`,
      };
    }
  }

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
            {
              label: "Abonament lunar",
              value: project.monthlyFee ? `${project.monthlyFee} EUR/lună` : "—",
              sub: monthlyFeePct ? `(${monthlyFeePct}% din valoarea proiectului)` : undefined,
            },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs font-medium mb-1" style={{ color: "var(--color-text-secondary)" }}>{item.label}</p>
              <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{item.value}</p>
              {item.sub && <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>{item.sub}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Contract end-date warning */}
      {contractStrip && (
        <div className="rounded-xl p-5 flex items-start gap-3" style={{ background: contractStrip.background, border: `1px solid ${contractStrip.border}` }}>
          <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" style={{ color: contractStrip.textColor }} />
          <div className="flex-1">
            <p className="text-sm font-medium" style={{ color: contractStrip.textColor }}>{contractStrip.message}</p>
            <a
              href={buildWhatsAppUrl(WHATSAPP_NUMBER, `Bună! Vreau să discutăm despre reînnoirea contractului pentru proiectul ${project.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-90"
              style={{ background: "var(--color-gold)", color: "#fff" }}
            >
              Contactează-mă pentru reînnoire
            </a>
          </div>
        </div>
      )}

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
      {showMilestonesSection && (
        <div className="rounded-xl p-6" style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>Progres proiect</h2>
            <span className="text-sm font-bold" style={{ color: "var(--color-gold)" }}>{progress}%</span>
          </div>
          <div className="w-full h-2 rounded-full mb-2" style={{ background: "var(--color-border)" }}>
            <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: "var(--color-gold)" }} />
          </div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>{completedMilestones} din {totalMilestones} etape finalizate</span>
            <span className="text-xs font-medium" style={{ color: momentumCopy.color }}>{momentumCopy.text}</span>
          </div>
          {totalMilestones > 0 && (
            <div className="space-y-3">
              {project.milestones.map((m) => {
                const isNext = m.id === firstIncompleteId;
                return (
                  <div
                    key={m.id}
                    className="flex items-start gap-3 rounded-lg"
                    style={isNext ? { borderLeft: "3px solid var(--color-gold)", background: "rgba(212,168,67,0.06)", padding: "0.5rem 0.75rem", marginLeft: "-0.75rem" } : undefined}
                  >
                    {m.completed ? (
                      <CheckCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: "#10B981" }} />
                    ) : m.dueDate && new Date(m.dueDate) < new Date() ? (
                      <Clock size={18} className="flex-shrink-0 mt-0.5" style={{ color: "#F59E0B" }} />
                    ) : (
                      <Circle size={18} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-text-muted)" }} />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium" style={{ color: m.completed ? "var(--color-text-secondary)" : "var(--color-text-primary)", textDecoration: m.completed ? "line-through" : "none" }}>
                          {m.title}
                        </p>
                        {isNext && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: "rgba(212,168,67,0.15)", color: "var(--color-gold)" }}>
                            Urmează
                          </span>
                        )}
                      </div>
                      {m.description && <p className="text-xs mt-0.5" style={{ color: "var(--color-text-secondary)" }}>{m.description}</p>}
                      {m.dueDate && !m.completed && <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>Termen: {formatDate(m.dueDate)}</p>}
                    </div>
                    {m.completed && m.completedAt && (
                      <span className="text-xs flex-shrink-0" style={{ color: "#10B981" }}>{formatDate(m.completedAt)}</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
