import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, FileText, ListChecks } from "lucide-react";
import { PROJECT_STATUS_LABELS, PROJECT_STATUS_COLORS, formatDate } from "@/lib/portal-utils";
import ProjectEditForm from "@/components/admin/ProjectEditForm";

type Props = { params: Promise<{ id: string }> };

export default async function AdminProjectDetailPage({ params }: Props) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/auth/login");

  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      client: { select: { id: true, name: true, company: true, email: true } },
      milestones: { orderBy: { order: "asc" } },
      documents: { orderBy: { createdAt: "desc" }, take: 5 },
    },
  });

  if (!project) notFound();

  const clients = await prisma.user.findMany({
    where: { role: { not: "ADMIN" } },
    select: { id: true, name: true, company: true, email: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/projects" className="text-[#8A9BB5] hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">{project.name}</h1>
          <p className="text-sm text-[#8A9BB5] mt-0.5">
            Client: {project.client.name}
            {project.client.company ? ` · ${project.client.company}` : ""}
          </p>
        </div>
        <span
          className="ml-auto px-3 py-1 rounded-full text-xs font-semibold"
          style={PROJECT_STATUS_COLORS[project.status]}
        >
          {PROJECT_STATUS_LABELS[project.status]}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProjectEditForm project={project} clients={clients} />
        </div>

        <div className="space-y-4">
          <Link
            href={`/admin/projects/${project.id}/documents`}
            className="flex items-center gap-3 p-4 rounded-2xl transition-all hover:border-[#D4A843]"
            style={{ background: "rgba(21,40,71,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(212,168,67,0.1)" }}>
              <FileText size={18} style={{ color: "#D4A843" }} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Documente</p>
              <p className="text-xs text-[#8A9BB5]">{project.documents.length} fișiere</p>
            </div>
          </Link>

          <Link
            href={`/admin/projects/${project.id}/milestones`}
            className="flex items-center gap-3 p-4 rounded-2xl transition-all hover:border-[#D4A843]"
            style={{ background: "rgba(21,40,71,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(16,185,129,0.1)" }}>
              <ListChecks size={18} style={{ color: "#10B981" }} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Milestone-uri</p>
              <p className="text-xs text-[#8A9BB5]">
                {project.milestones.filter((m) => m.completed).length}/{project.milestones.length} completate
              </p>
            </div>
          </Link>

          <div className="p-4 rounded-2xl space-y-3" style={{ background: "rgba(21,40,71,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-xs font-semibold text-[#8A9BB5] uppercase tracking-wider">Info proiect</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#8A9BB5]">Data start</span>
                <span className="text-white">{project.startDate ? formatDate(project.startDate) : "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8A9BB5]">Data finalizare</span>
                <span className="text-white">{project.endDate ? formatDate(project.endDate) : "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8A9BB5]">Valoare totală</span>
                <span className="text-white">{project.totalValue ? `€${project.totalValue.toLocaleString()}` : "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8A9BB5]">Abonament lunar</span>
                <span className="text-white">{project.monthlyFee ? `€${project.monthlyFee}/lună` : "—"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
