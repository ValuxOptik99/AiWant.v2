import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";
import { DOCUMENT_TYPE_LABELS, INVOICE_STATUS_LABELS, INVOICE_STATUS_COLORS, formatFileSize, formatDate } from "@/lib/portal-utils";
import DocumentUploadForm from "@/components/admin/DocumentUploadForm";

type Props = { params: Promise<{ id: string }> };

export default async function AdminProjectDocumentsPage({ params }: Props) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/auth/login");

  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    select: { id: true, name: true },
  });
  if (!project) notFound();

  const documents = await prisma.document.findMany({
    where: { projectId: id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link href={`/admin/projects/${id}`} className="text-[#8A9BB5] hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Documente</h1>
          <p className="text-sm text-[#8A9BB5] mt-0.5">{project.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            <table className="w-full">
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <th className="text-left text-xs font-semibold text-[#8A9BB5] px-5 py-3 uppercase tracking-wider">Document</th>
                  <th className="text-left text-xs font-semibold text-[#8A9BB5] px-5 py-3 uppercase tracking-wider">Tip</th>
                  <th className="text-left text-xs font-semibold text-[#8A9BB5] px-5 py-3 uppercase tracking-wider">Dată</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, i) => (
                  <tr key={doc.id} style={{ borderBottom: i < documents.length - 1 ? "1px solid rgba(255,255,255,0.04)" : undefined, background: "rgba(21,40,71,0.4)" }}>
                    <td className="px-5 py-3">
                      <p className="text-sm font-medium text-white">{doc.name}</p>
                      {doc.fileSize && <p className="text-xs text-[#8A9BB5]">{formatFileSize(doc.fileSize)}</p>}
                      {doc.invoiceNumber && (
                        <p className="text-xs text-[#D4A843]">#{doc.invoiceNumber} · €{doc.invoiceAmount?.toLocaleString()}</p>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-xs text-[#8A9BB5]">{DOCUMENT_TYPE_LABELS[doc.type]}</span>
                      {doc.invoiceStatus && (
                        <div className="mt-1">
                          <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={INVOICE_STATUS_COLORS[doc.invoiceStatus]}>
                            {INVOICE_STATUS_LABELS[doc.invoiceStatus]}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3 text-xs text-[#8A9BB5]">{formatDate(doc.createdAt)}</td>
                    <td className="px-5 py-3">
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                        style={{ background: "rgba(212,168,67,0.1)", color: "#D4A843" }}
                      >
                        Descarcă
                      </a>
                    </td>
                  </tr>
                ))}
                {documents.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-5 py-10 text-center text-[#8A9BB5] text-sm">
                      Niciun document încărcat.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <DocumentUploadForm projectId={id} />
        </div>
      </div>
    </div>
  );
}
