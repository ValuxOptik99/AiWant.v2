import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Mail, Phone, Calendar, Briefcase, ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/portal-utils";

export default async function AdminContactsPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/auth/login");

  const [contacts, auditLeads] = await Promise.all([
    prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.auditLead.findMany({ where: { converted: true }, orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Formulare de contact</h1>
        <p className="text-sm text-[#8A9BB5] mt-1">{contacts.length} mesaje primite</p>
      </div>

      <div className="space-y-4">
        {contacts.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-2xl space-y-3"
            style={{ background: "rgba(21,40,71,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-base font-semibold text-white">{c.name}</p>
                <div className="flex flex-wrap items-center gap-3 mt-1">
                  <a
                    href={`mailto:${c.email}`}
                    className="flex items-center gap-1.5 text-sm text-[#D4A843] hover:underline"
                  >
                    <Mail size={13} />
                    {c.email}
                  </a>
                  {c.phone && (
                    <a
                      href={`tel:${c.phone}`}
                      className="flex items-center gap-1.5 text-sm text-[#8A9BB5] hover:text-white transition-colors"
                    >
                      <Phone size={13} />
                      {c.phone}
                    </a>
                  )}
                </div>
              </div>
              <div className="text-right flex-shrink-0 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-[#8A9BB5] justify-end">
                  <Calendar size={11} />
                  {formatDate(c.createdAt)}
                </div>
                {c.projectType && (
                  <div className="flex items-center gap-1.5 text-xs justify-end">
                    <Briefcase size={11} style={{ color: "#D4A843" }} />
                    <span style={{ color: "#D4A843" }}>{c.projectType}</span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-sm text-[#CBD5E1] leading-relaxed whitespace-pre-wrap border-t pt-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              {c.message}
            </p>

            <div className="flex gap-2 pt-1">
              <a
                href={`mailto:${c.email}?subject=Re: Solicitare AiWANT`}
                className="px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80"
                style={{ background: "rgba(212,168,67,0.1)", color: "#D4A843" }}
              >
                Răspunde
              </a>
            </div>
          </div>
        ))}

        {contacts.length === 0 && (
          <div
            className="py-16 text-center rounded-2xl text-[#8A9BB5]"
            style={{ border: "1px dashed rgba(255,255,255,0.1)" }}
          >
            Niciun mesaj primit încă.
          </div>
        )}
      </div>

      {/* Audit leads */}
      <div className="mt-10">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-white">Audituri</h2>
          <p className="text-sm text-[#8A9BB5] mt-1">{auditLeads.length} lead-uri din auditul gratuit</p>
        </div>

        {auditLeads.length === 0 ? (
          <div
            className="py-16 text-center rounded-2xl text-[#8A9BB5]"
            style={{ border: "1px dashed rgba(255,255,255,0.1)" }}
          >
            Niciun lead din audit încă.
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(21,40,71,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  {["Site", "Scor", "Contact", "Dată"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 font-semibold text-xs uppercase tracking-wide text-[#8A9BB5]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {auditLeads.map((lead) => (
                  <tr key={lead.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <td className="px-5 py-4">
                      <a href={lead.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-[#D4A843] hover:underline">
                        {lead.url.replace(/^https?:\/\//, "")} <ExternalLink size={12} />
                      </a>
                    </td>
                    <td className="px-5 py-4 font-semibold" style={{ color: lead.performanceScore !== null && lead.performanceScore >= 90 ? "#10B981" : lead.performanceScore !== null && lead.performanceScore >= 50 ? "#F59E0B" : "#EF4444" }}>
                      {lead.performanceScore ?? "—"}/100
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-white font-medium">{lead.name}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-0.5">
                        <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 text-xs text-[#8A9BB5] hover:text-white transition-colors">
                          <Mail size={11} />
                          {lead.email}
                        </a>
                        {lead.phone && (
                          <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 text-xs text-[#8A9BB5] hover:text-white transition-colors">
                            <Phone size={11} />
                            {lead.phone}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs text-[#8A9BB5] whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={11} />
                        {formatDate(lead.createdAt)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
