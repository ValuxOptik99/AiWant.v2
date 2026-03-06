import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, ExternalLink, Calendar } from "lucide-react";
import { PROJECT_STATUS_LABELS, PROJECT_STATUS_COLORS, formatDate } from "@/lib/portal-utils";

export default async function AdminProjectsPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/auth/login");

  const projects = await prisma.project.findMany({
    include: { client: { select: { name: true, company: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Proiecte</h1>
          <p className="text-sm text-[#8A9BB5] mt-1">{projects.length} proiecte în total</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#0E1D33] transition-all hover:opacity-90"
          style={{ background: "#D4A843" }}
        >
          <Plus size={16} />
          Proiect nou
        </Link>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <th className="text-left text-xs font-semibold text-[#8A9BB5] px-6 py-4 uppercase tracking-wider">Proiect</th>
              <th className="text-left text-xs font-semibold text-[#8A9BB5] px-6 py-4 uppercase tracking-wider">Client</th>
              <th className="text-left text-xs font-semibold text-[#8A9BB5] px-6 py-4 uppercase tracking-wider">Status</th>
              <th className="text-left text-xs font-semibold text-[#8A9BB5] px-6 py-4 uppercase tracking-wider">Valoare</th>
              <th className="text-left text-xs font-semibold text-[#8A9BB5] px-6 py-4 uppercase tracking-wider">Data start</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, i) => (
              <tr
                key={project.id}
                style={{
                  borderBottom: i < projects.length - 1 ? "1px solid rgba(255,255,255,0.04)" : undefined,
                  background: "rgba(21,40,71,0.4)",
                }}
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-semibold text-white">{project.name}</p>
                    {project.domain && (
                      <a
                        href={`https://${project.domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#8A9BB5] hover:text-[#D4A843] flex items-center gap-1 mt-0.5 w-fit"
                      >
                        {project.domain} <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-white">{project.client.name}</p>
                  <p className="text-xs text-[#8A9BB5]">{project.client.company || project.client.email}</p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={PROJECT_STATUS_COLORS[project.status]}
                  >
                    {PROJECT_STATUS_LABELS[project.status]}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {project.totalValue ? (
                    <p className="text-sm text-white font-medium">€{project.totalValue.toLocaleString()}</p>
                  ) : (
                    <span className="text-[#8A9BB5] text-sm">—</span>
                  )}
                  {project.monthlyFee && (
                    <p className="text-xs text-[#8A9BB5]">+€{project.monthlyFee}/lună</p>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-sm text-[#8A9BB5]">
                    <Calendar size={13} />
                    {project.startDate ? formatDate(project.startDate) : "—"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                    style={{ background: "rgba(212,168,67,0.1)", color: "#D4A843" }}
                  >
                    Gestionează
                  </Link>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-[#8A9BB5]">
                  Niciun proiect creat încă.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
