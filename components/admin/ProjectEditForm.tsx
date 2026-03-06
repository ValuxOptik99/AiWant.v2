"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";

type Client = { id: string; name: string; company: string | null; email: string };
type Project = {
  id: string;
  name: string;
  description: string | null;
  status: string;
  domain: string | null;
  totalValue: number | null;
  monthlyFee: number | null;
  gaPropertyId: string | null;
  gaMeasurementId: string | null;
  startDate: Date | null;
  endDate: Date | null;
  clientId: string;
};

const STATUS_OPTIONS = [
  { value: "DISCOVERY", label: "Discovery" },
  { value: "IN_PROGRESS", label: "În progres" },
  { value: "REVIEW", label: "Review" },
  { value: "COMPLETED", label: "Finalizat" },
  { value: "MAINTENANCE", label: "Mentenanță" },
  { value: "PAUSED", label: "Pauzat" },
];

const inputClass = "w-full px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#D4A843] placeholder:text-[#8A9BB5]";
const inputStyle = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" };
const labelClass = "block text-xs font-semibold text-[#8A9BB5] uppercase tracking-wider mb-1.5";

export default function ProjectEditForm({ project, clients }: { project: Project; clients: Client[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: project.name,
    description: project.description || "",
    status: project.status,
    domain: project.domain || "",
    clientId: project.clientId,
    totalValue: project.totalValue?.toString() || "",
    monthlyFee: project.monthlyFee?.toString() || "",
    gaPropertyId: project.gaPropertyId || "",
    gaMeasurementId: project.gaMeasurementId || "",
    startDate: project.startDate ? project.startDate.toISOString().split("T")[0] : "",
    endDate: project.endDate ? project.endDate.toISOString().split("T")[0] : "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch(`/api/admin/projects/${project.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        totalValue: form.totalValue ? parseFloat(form.totalValue) : null,
        monthlyFee: form.monthlyFee ? parseFloat(form.monthlyFee) : null,
        startDate: form.startDate || null,
        endDate: form.endDate || null,
      }),
    });
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-2xl space-y-5" style={{ background: "rgba(21,40,71,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <h2 className="text-base font-semibold text-white">Editează proiect</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className={labelClass}>Nume proiect *</label>
          <input className={inputClass} style={inputStyle} value={form.name} onChange={(e) => set("name", e.target.value)} required />
        </div>

        <div>
          <label className={labelClass}>Client *</label>
          <select className={inputClass} style={inputStyle} value={form.clientId} onChange={(e) => set("clientId", e.target.value)} required>
            {clients.map((c) => (
              <option key={c.id} value={c.id} style={{ background: "#152847" }}>
                {c.name}{c.company ? ` (${c.company})` : ""}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Status *</label>
          <select className={inputClass} style={inputStyle} value={form.status} onChange={(e) => set("status", e.target.value)}>
            {STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value} style={{ background: "#152847" }}>{s.label}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>Descriere</label>
          <textarea
            className={inputClass} style={inputStyle} rows={3}
            value={form.description} onChange={(e) => set("description", e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>Domeniu (ex: client.ro)</label>
          <input className={inputClass} style={inputStyle} value={form.domain} onChange={(e) => set("domain", e.target.value)} placeholder="client.ro" />
        </div>

        <div>
          <label className={labelClass}>Valoare totală (€)</label>
          <input type="number" className={inputClass} style={inputStyle} value={form.totalValue} onChange={(e) => set("totalValue", e.target.value)} placeholder="5000" />
        </div>

        <div>
          <label className={labelClass}>Abonament lunar (€)</label>
          <input type="number" className={inputClass} style={inputStyle} value={form.monthlyFee} onChange={(e) => set("monthlyFee", e.target.value)} placeholder="200" />
        </div>

        <div>
          <label className={labelClass}>Data start</label>
          <input type="date" className={inputClass} style={inputStyle} value={form.startDate} onChange={(e) => set("startDate", e.target.value)} />
        </div>

        <div>
          <label className={labelClass}>Data finalizare</label>
          <input type="date" className={inputClass} style={inputStyle} value={form.endDate} onChange={(e) => set("endDate", e.target.value)} />
        </div>

        <div>
          <label className={labelClass}>GA4 Property ID</label>
          <input className={inputClass} style={inputStyle} value={form.gaPropertyId} onChange={(e) => set("gaPropertyId", e.target.value)} placeholder="properties/123456789" />
        </div>

        <div>
          <label className={labelClass}>GA4 Measurement ID</label>
          <input className={inputClass} style={inputStyle} value={form.gaMeasurementId} onChange={(e) => set("gaMeasurementId", e.target.value)} placeholder="G-XXXXXXXXXX" />
        </div>
      </div>

      <button
        type="submit" disabled={loading}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#0E1D33] transition-all hover:opacity-90 disabled:opacity-60"
        style={{ background: saved ? "#10B981" : "#D4A843", color: saved ? "white" : "#0E1D33" }}
      >
        {loading ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
        {saved ? "Salvat!" : loading ? "Se salvează..." : "Salvează modificările"}
      </button>
    </form>
  );
}
