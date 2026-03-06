import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Download } from "lucide-react";
import { INVOICE_STATUS_LABEL, INVOICE_STATUS_COLOR, formatDate } from "@/lib/portal-utils";

export default async function InvoicesPage() {
  const session = await auth();
  if (!session) redirect("/auth/login");

  const invoices = await prisma.document.findMany({
    where: { type: "INVOICE", project: { clientId: session.user.id } },
    include: { project: { select: { id: true, name: true } } },
    orderBy: { createdAt: "desc" },
  });

  const total = invoices.reduce((s, i) => s + (i.invoiceAmount ?? 0), 0);
  const paid = invoices.filter((i) => i.invoiceStatus === "PAID").reduce((s, i) => s + (i.invoiceAmount ?? 0), 0);
  const overdue = invoices.filter((i) => i.invoiceStatus === "OVERDUE").reduce((s, i) => s + (i.invoiceAmount ?? 0), 0);

  return (
    <div className="max-w-5xl space-y-6">
      <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>Facturi</h1>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total facturat", value: total, color: "var(--color-text-primary)" },
          { label: "Plătit", value: paid, color: "#10B981" },
          { label: "Restant", value: overdue, color: overdue > 0 ? "#EF4444" : "var(--color-text-primary)" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-5" style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}>
            <p className="text-xs font-medium mb-2" style={{ color: "var(--color-text-secondary)" }}>{s.label}</p>
            <p className="text-xl font-bold" style={{ color: s.color, fontFamily: "var(--font-display)" }}>{s.value.toFixed(0)} EUR</p>
          </div>
        ))}
      </div>

      {invoices.length === 0 ? (
        <div className="rounded-xl p-12 text-center" style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}>
          <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>Nu ai încă facturi.</p>
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden" style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)", background: "var(--color-surface-warm)" }}>
                {["Nr. factură", "Proiect", "Sumă", "Scadență", "Status", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-3 font-semibold text-xs uppercase tracking-wide" style={{ color: "var(--color-text-secondary)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} style={{ borderBottom: "1px solid var(--color-border)" }} className="hover:bg-[var(--color-surface-warm)] transition-colors">
                  <td className="px-5 py-4 font-medium" style={{ color: "var(--color-text-primary)" }}>{inv.invoiceNumber ?? inv.name}</td>
                  <td className="px-5 py-4">
                    <Link href={`/portal/projects/${inv.project.id}`} className="text-xs hover:underline" style={{ color: "var(--color-navy)" }}>{inv.project.name}</Link>
                  </td>
                  <td className="px-5 py-4 font-semibold" style={{ color: "var(--color-text-primary)" }}>{inv.invoiceAmount ? `${inv.invoiceAmount} EUR` : "—"}</td>
                  <td className="px-5 py-4 whitespace-nowrap" style={{ color: inv.invoiceStatus === "OVERDUE" ? "#EF4444" : "var(--color-text-secondary)" }}>
                    {formatDate(inv.invoiceDueDate)}
                  </td>
                  <td className="px-5 py-4">
                    {inv.invoiceStatus && (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: INVOICE_STATUS_COLOR[inv.invoiceStatus] + "18", color: INVOICE_STATUS_COLOR[inv.invoiceStatus] }}>
                        {INVOICE_STATUS_LABEL[inv.invoiceStatus]}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <a href={`/api/portal/documents/${inv.id}/download`} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: "rgba(212,168,67,0.1)", color: "var(--color-gold)" }}>
                      <Download size={12} /> PDF
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
