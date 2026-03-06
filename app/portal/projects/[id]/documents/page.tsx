import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { Download } from "lucide-react";
import { DOCUMENT_TYPE_LABEL, DOCUMENT_TYPE_COLOR, INVOICE_STATUS_LABEL, INVOICE_STATUS_COLOR, formatDate, formatFileSize } from "@/lib/portal-utils";
import { DocumentType } from "@prisma/client";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ type?: string }> };

export default async function ProjectDocumentsPage({ params, searchParams }: Props) {
  const session = await auth();
  if (!session) redirect("/auth/login");

  const { id } = await params;
  const { type } = await searchParams;

  const project = await prisma.project.findFirst({ where: { id, clientId: session.user.id } });
  if (!project) notFound();

  const docs = await prisma.document.findMany({
    where: { projectId: id, ...(type ? { type: type as DocumentType } : {}) },
    orderBy: { createdAt: "desc" },
  });

  const TYPES: DocumentType[] = ["CONTRACT", "ANNEX", "INVOICE", "REPORT"];

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
        <Link href="/portal/projects" className="hover:underline" style={{ color: "var(--color-gold)" }}>Proiecte</Link>
        <span>/</span>
        <Link href={`/portal/projects/${id}`} className="hover:underline" style={{ color: "var(--color-gold)" }}>{project.name}</Link>
        <span>/</span>
        <span>Documente</span>
      </div>

      <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>Documente</h1>

      {/* Type filter */}
      <div className="flex flex-wrap gap-2">
        <Link href={`/portal/projects/${id}/documents`} className="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150" style={{ background: !type ? "var(--color-gold)" : "rgba(255,255,255,0.6)", color: !type ? "#fff" : "var(--color-text-secondary)", border: "1px solid var(--color-border)" }}>
          Toate
        </Link>
        {TYPES.map((t) => (
          <Link key={t} href={`/portal/projects/${id}/documents?type=${t}`} className="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150" style={{ background: type === t ? DOCUMENT_TYPE_COLOR[t] : "rgba(255,255,255,0.6)", color: type === t ? "#fff" : "var(--color-text-secondary)", border: "1px solid var(--color-border)" }}>
            {DOCUMENT_TYPE_LABEL[t]}
          </Link>
        ))}
      </div>

      {docs.length === 0 ? (
        <div className="rounded-xl p-12 text-center" style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}>
          <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>Nu există documente în această categorie.</p>
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden" style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)", background: "var(--color-surface-warm)" }}>
                {["Document", "Tip", "Dată", "Mărime", "Factură", "Acțiuni"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 font-semibold text-xs uppercase tracking-wide" style={{ color: "var(--color-text-secondary)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {docs.map((doc) => (
                <tr key={doc.id} style={{ borderBottom: "1px solid var(--color-border)" }} className="hover:bg-[var(--color-surface-warm)] transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium" style={{ color: "var(--color-text-primary)" }}>{doc.name}</p>
                    {doc.description && <p className="text-xs mt-0.5" style={{ color: "var(--color-text-secondary)" }}>{doc.description}</p>}
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: DOCUMENT_TYPE_COLOR[doc.type] + "18", color: DOCUMENT_TYPE_COLOR[doc.type] }}>
                      {DOCUMENT_TYPE_LABEL[doc.type]}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap" style={{ color: "var(--color-text-secondary)" }}>{formatDate(doc.createdAt)}</td>
                  <td className="px-5 py-4" style={{ color: "var(--color-text-secondary)" }}>{formatFileSize(doc.fileSize)}</td>
                  <td className="px-5 py-4">
                    {doc.type === "INVOICE" && doc.invoiceStatus && (
                      <div>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: INVOICE_STATUS_COLOR[doc.invoiceStatus] + "18", color: INVOICE_STATUS_COLOR[doc.invoiceStatus] }}>
                          {INVOICE_STATUS_LABEL[doc.invoiceStatus]}
                        </span>
                        {doc.invoiceAmount && <p className="text-xs mt-1 font-medium" style={{ color: "var(--color-text-primary)" }}>{doc.invoiceAmount} EUR</p>}
                        {doc.invoiceDueDate && <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>Scadent: {formatDate(doc.invoiceDueDate)}</p>}
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <a
                      href={`/api/portal/documents/${doc.id}/download`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors duration-150"
                      style={{ background: "rgba(212,168,67,0.1)", color: "var(--color-gold)" }}
                    >
                      <Download size={12} /> Descarcă
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
