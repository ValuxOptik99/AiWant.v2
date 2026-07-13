"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus } from "lucide-react";

type Client = { id: string; name: string; company: string | null; email: string };

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

export default function NewProjectForm({ clients }: { clients: Client[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    clientId: clients[0]?.id || "",
    description: "",
    status: "DISCOVERY",
    domain: "",
    totalValue: "",
    monthlyFee: "20",
    startDate: new Date().toISOString().slice(0, 10),
    gaPropertyId: "",
    gaMeasurementId: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        totalValue: form.totalValue ? parseFloat(form.totalValue) : undefined,
        monthlyFee: form.monthlyFee ? parseFloat(form.monthlyFee) : undefined,
        startDate: form.startDate || undefined,
      }),
    });

    if (res.ok) {
      const project = await res.json();
      router.push(`/admin/projects/${project.id}`);
    } else {
      const data = await res.json();
      setError(data.error || "Eroare la creare proiect.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-2xl space-y-5" style={{ background: "rgba(21,40,71,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className={labelClass}>Nume proiect *</label>
          <input className={inputClass} style={inputStyle} value={form.name} onChange={(e) => set("name", e.target.value)} required placeholder="Website + Automatizări" />
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
          <label className={labelClass}>Status</label>
          <select className={inputClass} style={inputStyle} value={form.status} onChange={(e) => set("status", e.target.value)}>
            {STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value} style={{ background: "#152847" }}>{s.label}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>Descriere</label>
          <textarea className={inputClass} style={inputStyle} rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} />
        </div>

        <div>
          <label className={labelClass}>Domeniu</label>
          <input className={inputClass} style={inputStyle} value={form.domain} onChange={(e) => set("domain", e.target.value)} placeholder="client.ro" />
        </div>

        <div>
          <label className={labelClass}>Data start</label>
          <input type="date" className={inputClass} style={inputStyle} value={form.startDate} onChange={(e) => set("startDate", e.target.value)} />
        </div>

        <div>
          <label className={labelClass}>Valoare totală (€)</label>
          <input type="number" className={inputClass} style={inputStyle} value={form.totalValue} onChange={(e) => set("totalValue", e.target.value)} placeholder="5000" />
        </div>

        <div>
          <label className={labelClass}>Abonament lunar (€)</label>
          <input type="number" className={inputClass} style={inputStyle} value={form.monthlyFee} onChange={(e) => set("monthlyFee", e.target.value)} placeholder="200" />
        </div>

        <div className="sm:col-span-2 p-3 rounded-xl text-xs" style={{ background: "rgba(212,168,67,0.08)", border: "1px solid rgba(212,168,67,0.25)", color: "#D4A843" }}>
          Sfat ofertare: prezintă întâi valoarea totală a proiectului, apoi costul lunar de hosting ca procent (ex: «doar 1,5% din investiție»). Prima cifră văzută devine etalonul.
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit" disabled={loading}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#0E1D33] transition-all hover:opacity-90 disabled:opacity-60"
        style={{ background: "#D4A843" }}
      >
        {loading ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
        {loading ? "Se creează..." : "Creează proiect"}
      </button>
    </form>
  );
}
