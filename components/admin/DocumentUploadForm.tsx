"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2 } from "lucide-react";

const DOC_TYPES = [
  { value: "CONTRACT", label: "Contract" },
  { value: "INVOICE", label: "Factură" },
  { value: "REPORT", label: "Raport" },
  { value: "PROPOSAL", label: "Propunere" },
  { value: "DESIGN", label: "Design" },
  { value: "OTHER", label: "Altele" },
];

const INVOICE_STATUSES = [
  { value: "PENDING", label: "În așteptare" },
  { value: "PAID", label: "Plătită" },
  { value: "OVERDUE", label: "Restantă" },
  { value: "CANCELLED", label: "Anulată" },
];

const inputClass = "w-full px-3 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#D4A843] placeholder:text-[#8A9BB5]";
const inputStyle = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" };
const labelClass = "block text-xs font-semibold text-[#8A9BB5] uppercase tracking-wider mb-1";

const defaultDueDate = () => new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

export default function DocumentUploadForm({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    name: "",
    type: "CONTRACT",
    description: "",
    invoiceNumber: "",
    invoiceAmount: "",
    invoiceDueDate: defaultDueDate(),
    invoiceStatus: "PENDING",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const isInvoice = form.type === "INVOICE";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("projectId", projectId);
    data.append("name", form.name || file.name);
    data.append("type", form.type);
    data.append("description", form.description);
    if (isInvoice) {
      data.append("invoiceNumber", form.invoiceNumber);
      data.append("invoiceAmount", form.invoiceAmount);
      data.append("invoiceDueDate", form.invoiceDueDate);
      data.append("invoiceStatus", form.invoiceStatus);
    }

    await fetch("/api/admin/documents/upload", { method: "POST", body: data });
    setLoading(false);
    setFile(null);
    setForm({ name: "", type: "CONTRACT", description: "", invoiceNumber: "", invoiceAmount: "", invoiceDueDate: defaultDueDate(), invoiceStatus: "PENDING" });
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 rounded-2xl space-y-4"
      style={{ background: "rgba(21,40,71,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <h2 className="text-sm font-semibold text-white flex items-center gap-2">
        <Upload size={15} style={{ color: "#D4A843" }} />
        Încarcă document
      </h2>

      <div>
        <label className={labelClass}>Fișier *</label>
        <input
          type="file" required
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full text-sm text-[#8A9BB5] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:cursor-pointer"
          style={{ color: "#8A9BB5" }}
        />
      </div>

      <div>
        <label className={labelClass}>Nume document</label>
        <input className={inputClass} style={inputStyle} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Lasă gol pentru numele fișierului" />
      </div>

      <div>
        <label className={labelClass}>Tip *</label>
        <select className={inputClass} style={inputStyle} value={form.type} onChange={(e) => set("type", e.target.value)}>
          {DOC_TYPES.map((t) => (
            <option key={t.value} value={t.value} style={{ background: "#152847" }}>{t.label}</option>
          ))}
        </select>
      </div>

      {isInvoice && (
        <>
          <div>
            <label className={labelClass}>Număr factură</label>
            <input className={inputClass} style={inputStyle} value={form.invoiceNumber} onChange={(e) => set("invoiceNumber", e.target.value)} placeholder="2024-001" />
          </div>
          <div>
            <label className={labelClass}>Sumă (€)</label>
            <input type="number" className={inputClass} style={inputStyle} value={form.invoiceAmount} onChange={(e) => set("invoiceAmount", e.target.value)} placeholder="1500" />
          </div>
          <div>
            <label className={labelClass}>Scadență</label>
            <input type="date" className={inputClass} style={inputStyle} value={form.invoiceDueDate} onChange={(e) => set("invoiceDueDate", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Status factură</label>
            <select className={inputClass} style={inputStyle} value={form.invoiceStatus} onChange={(e) => set("invoiceStatus", e.target.value)}>
              {INVOICE_STATUSES.map((s) => (
                <option key={s.value} value={s.value} style={{ background: "#152847" }}>{s.label}</option>
              ))}
            </select>
          </div>
        </>
      )}

      <div>
        <label className={labelClass}>Descriere</label>
        <textarea className={inputClass} style={inputStyle} rows={2} value={form.description} onChange={(e) => set("description", e.target.value)} />
      </div>

      <button
        type="submit" disabled={loading || !file}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-[#0E1D33] transition-all hover:opacity-90 disabled:opacity-50"
        style={{ background: "#D4A843" }}
      >
        {loading ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
        {loading ? "Se încarcă..." : "Încarcă"}
      </button>
    </form>
  );
}
