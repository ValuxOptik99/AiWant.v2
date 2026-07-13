import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Download, AlertTriangle } from "lucide-react";
import { INVOICE_STATUS_LABEL, INVOICE_STATUS_COLOR, formatDate } from "@/lib/portal-utils";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/utils";

const DAY_MS = 24 * 60 * 60 * 1000;
const ziLabel = (n: number) => (n === 1 ? "zi" : "zile");

function dueDateContext(invoiceStatus: string | null, invoiceDueDate: Date | null, now: Date) {
  if (!invoiceDueDate) return null;
  const diffDays = Math.ceil((invoiceDueDate.getTime() - now.getTime()) / DAY_MS);
  if (invoiceStatus === "OVERDUE") {
    const overdueDays = Math.max(1, -diffDays);
    return { text: `depășită cu ${overdueDays} ${ziLabel(overdueDays)}`, color: "#EF4444", bold: true };
  }
  if (invoiceStatus === "PENDING") {
    if (diffDays <= 0) return { text: "scadentă azi", color: "#F59E0B", bold: true };
    if (diffDays <= 5) return { text: `în ${diffDays} ${ziLabel(diffDays)}`, color: "#F59E0B", bold: false };
  }
  return null;
}

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
  const overdueInvoices = invoices.filter((i) => i.invoiceStatus === "OVERDUE");
  const overdue = overdueInvoices.reduce((s, i) => s + (i.invoiceAmount ?? 0), 0);
  const now = new Date();

  return (
    <div className="max-w-5xl space-y-6">
      <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>Facturi</h1>

      {/* Overdue alert */}
      {overdueInvoices.length > 0 && (
        <div className="rounded-xl p-5" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.35)" }}>
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#EF4444" }} />
            <div className="flex-1">
              <p className="font-semibold" style={{ color: "#EF4444" }}>
                Ai {overdueInvoices.length === 1 ? "o factură restantă" : `${overdueInvoices.length} facturi restante`} — serviciile tale sunt în risc
              </p>
              <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
                Conform contractului, neplata la scadență poate duce la suspendarea serviciilor active (hosting, mentenanță, aplicație). Total restant: {overdue.toFixed(0)} EUR.
              </p>
              <ul className="text-sm mt-3 space-y-1">
                {overdueInvoices.slice(0, 3).map((inv) => (
                  <li key={inv.id} style={{ color: "var(--color-text-primary)" }}>
                    <span className="font-medium">{inv.invoiceNumber ?? inv.name}</span> — {inv.invoiceAmount ?? 0} EUR, scadentă {formatDate(inv.invoiceDueDate)}
                  </li>
                ))}
                {overdueInvoices.length > 3 && (
                  <li style={{ color: "var(--color-text-secondary)" }}>și încă {overdueInvoices.length - 3}...</li>
                )}
              </ul>
              <a
                href={buildWhatsAppUrl(WHATSAPP_NUMBER, `Bună! Vreau să discut despre facturile restante (${overdue.toFixed(0)} EUR).`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: "var(--color-gold)", color: "#fff" }}
              >
                Contactează-mă pentru plată
              </a>
            </div>
          </div>
        </div>
      )}

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
              {invoices.map((inv) => {
                const context = dueDateContext(inv.invoiceStatus, inv.invoiceDueDate, now);
                return (
                <tr key={inv.id} style={{ borderBottom: "1px solid var(--color-border)" }} className="hover:bg-[var(--color-surface-warm)] transition-colors">
                  <td className="px-5 py-4 font-medium" style={{ color: "var(--color-text-primary)" }}>{inv.invoiceNumber ?? inv.name}</td>
                  <td className="px-5 py-4">
                    <Link href={`/portal/projects/${inv.project.id}`} className="text-xs hover:underline" style={{ color: "var(--color-navy)" }}>{inv.project.name}</Link>
                  </td>
                  <td className="px-5 py-4 font-semibold" style={{ color: "var(--color-text-primary)" }}>{inv.invoiceAmount ? `${inv.invoiceAmount} EUR` : "—"}</td>
                  <td className="px-5 py-4 whitespace-nowrap" style={{ color: inv.invoiceStatus === "OVERDUE" ? "#EF4444" : "var(--color-text-secondary)" }}>
                    {formatDate(inv.invoiceDueDate)}
                    {context && (
                      <p className="text-xs mt-0.5" style={{ color: context.color, fontWeight: context.bold ? 600 : 400 }}>{context.text}</p>
                    )}
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
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
