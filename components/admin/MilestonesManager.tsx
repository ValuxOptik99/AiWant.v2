"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Loader2, Check, Trash2, GripVertical, Lightbulb } from "lucide-react";

type Milestone = {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  completedAt: Date | null;
  dueDate: Date | null;
  order: number;
};

const inputClass = "w-full px-3 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#D4A843] placeholder:text-[#8A9BB5]";
const inputStyle = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" };

export default function MilestonesManager({ projectId, initialMilestones }: { projectId: string; initialMilestones: Milestone[] }) {
  const router = useRouter();
  const [milestones, setMilestones] = useState(initialMilestones);
  const [loading, setLoading] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newForm, setNewForm] = useState({ title: "", description: "", dueDate: "" });

  const addMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading("add");
    const res = await fetch(`/api/admin/projects/${projectId}/milestones`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newForm, order: milestones.length }),
    });
    const created = await res.json();
    setMilestones((m) => [...m, created]);
    setNewForm({ title: "", description: "", dueDate: "" });
    setShowForm(false);
    setLoading(null);
    router.refresh();
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    setLoading(id);
    await fetch(`/api/admin/projects/${projectId}/milestones/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });
    setMilestones((m) => m.map((ms) => ms.id === id ? { ...ms, completed: !completed, completedAt: !completed ? new Date() : null } : ms));
    setLoading(null);
  };

  const deleteMilestone = async (id: string) => {
    if (!confirm("Ștergi acest milestone?")) return;
    setLoading(`del-${id}`);
    await fetch(`/api/admin/projects/${projectId}/milestones/${id}`, { method: "DELETE" });
    setMilestones((m) => m.filter((ms) => ms.id !== id));
    setLoading(null);
    router.refresh();
  };

  return (
    <div className="space-y-4">
      {milestones.length === 0 && (
        <div className="flex items-start gap-3 p-4 rounded-2xl text-sm" style={{ background: "rgba(212,168,67,0.08)", border: "1px solid rgba(212,168,67,0.25)", color: "#D4A843" }}>
          <Lightbulb size={16} className="flex-shrink-0 mt-0.5" />
          <p>
            Sfat: adaugă prima etapă ca fiind deja finalizată (ex: «Contract semnat» sau «Discuție inițială»). Clienții care văd progres de la început rămân mai implicați.
          </p>
        </div>
      )}
      <div className="space-y-3">
        {milestones.map((ms, i) => (
          <div
            key={ms.id}
            className="flex items-start gap-3 p-4 rounded-2xl"
            style={{ background: "rgba(21,40,71,0.6)", border: `1px solid ${ms.completed ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.08)"}` }}
          >
            <GripVertical size={16} className="mt-0.5 text-[#4A5B75] cursor-grab flex-shrink-0" />
            <button
              onClick={() => toggleComplete(ms.id, ms.completed)}
              disabled={loading === ms.id}
              className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
              style={{
                borderColor: ms.completed ? "#10B981" : "#4A5B75",
                background: ms.completed ? "#10B981" : "transparent",
              }}
            >
              {loading === ms.id ? (
                <Loader2 size={10} className="animate-spin text-white" />
              ) : ms.completed ? (
                <Check size={10} className="text-white" />
              ) : null}
            </button>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold ${ms.completed ? "line-through text-[#8A9BB5]" : "text-white"}`}>
                {ms.title}
              </p>
              {ms.description && <p className="text-xs text-[#8A9BB5] mt-0.5">{ms.description}</p>}
              {ms.dueDate && (
                <p className="text-xs text-[#8A9BB5] mt-1">
                  Termen: {new Date(ms.dueDate).toLocaleDateString("ro-RO")}
                </p>
              )}
            </div>
            <button
              onClick={() => deleteMilestone(ms.id)}
              disabled={loading === `del-${ms.id}`}
              className="text-[#8A9BB5] hover:text-red-400 transition-colors flex-shrink-0"
            >
              {loading === `del-${ms.id}` ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
            </button>
          </div>
        ))}

        {milestones.length === 0 && !showForm && (
          <div className="py-10 text-center text-[#8A9BB5] text-sm rounded-2xl" style={{ border: "1px dashed rgba(255,255,255,0.1)" }}>
            Niciun milestone adăugat.
          </div>
        )}
      </div>

      {showForm ? (
        <form onSubmit={addMilestone} className="p-5 rounded-2xl space-y-3" style={{ background: "rgba(21,40,71,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <input
            className={inputClass} style={inputStyle} placeholder="Titlu milestone *" required
            value={newForm.title} onChange={(e) => setNewForm((f) => ({ ...f, title: e.target.value }))}
          />
          <input
            className={inputClass} style={inputStyle} placeholder="Descriere (opțional)"
            value={newForm.description} onChange={(e) => setNewForm((f) => ({ ...f, description: e.target.value }))}
          />
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#8A9BB5] whitespace-nowrap">Termen:</span>
            <input
              type="date" className={inputClass} style={inputStyle}
              value={newForm.dueDate} onChange={(e) => setNewForm((f) => ({ ...f, dueDate: e.target.value }))}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit" disabled={loading === "add"}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-[#0E1D33]"
              style={{ background: "#D4A843" }}
            >
              {loading === "add" ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
              Adaugă
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl text-sm font-semibold text-[#8A9BB5] hover:text-white transition-colors">
              Anulează
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold w-full justify-center transition-all hover:opacity-80"
          style={{ background: "rgba(212,168,67,0.1)", color: "#D4A843", border: "1px dashed rgba(212,168,67,0.3)" }}
        >
          <Plus size={15} />
          Adaugă milestone
        </button>
      )}
    </div>
  );
}
