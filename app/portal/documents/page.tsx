import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Download } from "lucide-react";
import { DOCUMENT_TYPE_LABEL, DOCUMENT_TYPE_COLOR, INVOICE_STATUS_LABEL, INVOICE_STATUS_COLOR, formatDate, formatFileSize } from "@/lib/portal-utils";

export default async function AllDocumentsPage() {
  const session = await auth();
  if (!session) redirect("/auth/login");

  const docs = await prisma.document.findMany({
    where: { project: { clientId: session.user.id } },
    include: { project: { select: { id: true, name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-5xl space-y-6">
      <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>Toate documentele</h1>

      {docs.length === 0 ? (
        <div className="rounded-xl p-12 text-center" style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}>
          <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>Nu ai încă documente. Acestea vor apărea aici după ce le încărcăm.</p>
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden" style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)", background: "var(--color-surface-warm)" }}>
                {["Document", "Proiect", "Tip", "Dată", "Mărime", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-3 font-semibold text-xs uppercase tracking-wide" style={{ color: "var(--color-text-secondary)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {docs.map((doc) => (
                <tr key={doc.id} style={{ borderBottom: "1px solid var(--color-border)" }} className="hover:bg-[var(--color-surface-warm)] transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium" style={{ color: "var(--color-text-primary)" }}>{doc.name}</p>
                    {doc.type === "INVOICE" && doc.invoiceStatus && (
                      <span className="text-xs font-semibold" style={{ color: INVOICE_STATUS_COLOR[doc.invoiceStatus] }}>
                        {INVOICE_STATUS_LABEL[doc.invoiceStatus]}{doc.invoiceAmount ? ` · ${doc.invoiceAmount} EUR` : ""}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <Link href={`/portal/projects/${doc.project.id}`} className="text-xs hover:underline" style={{ color: "var(--color-navy)" }}>
                      {doc.project.name}
                    </Link>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: DOCUMENT_TYPE_COLOR[doc.type] + "18", color: DOCUMENT_TYPE_COLOR[doc.type] }}>
                      {DOCUMENT_TYPE_LABEL[doc.type]}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap" style={{ color: "var(--color-text-secondary)" }}>{formatDate(doc.createdAt)}</td>
                  <td className="px-5 py-4" style={{ color: "var(--color-text-secondary)" }}>{formatFileSize(doc.fileSize)}</td>
                  <td className="px-5 py-4">
                    <a href={`/api/portal/documents/${doc.id}/download`} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: "rgba(212,168,67,0.1)", color: "var(--color-gold)" }}>
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
