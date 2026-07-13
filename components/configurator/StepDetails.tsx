"use client";

import { CONFIG_TIMELINE_OPTIONS } from "@/lib/configurator-data";

export default function StepDetails({
  timeline,
  onTimelineChange,
  projectName,
  onProjectNameChange,
  description,
  onDescriptionChange,
}: {
  timeline: string;
  onTimelineChange: (v: string) => void;
  projectName: string;
  onProjectNameChange: (v: string) => void;
  description: string;
  onDescriptionChange: (v: string) => void;
}) {
  const fieldClass =
    "w-full px-4 py-3 rounded-xl text-sm transition-colors duration-200 placeholder:opacity-50 focus:ring-2 focus:ring-[var(--color-gold)] outline-none";
  const fieldStyle = {
    background: "var(--color-slate-deep)",
    border: "1px solid var(--color-border-dark)",
    color: "var(--color-text-on-dark)",
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1.5" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>
          Detaliile proiectului tău
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
          Ultimii pași înainte de a vedea configurația completă.
        </p>
      </div>

      <div>
        <p className="text-sm font-medium mb-2.5" style={{ color: "var(--color-text-on-dark)" }}>Cât de repede vrei să fie gata?</p>
        <div className="grid grid-cols-2 gap-2.5">
          {CONFIG_TIMELINE_OPTIONS.map((opt) => {
            const selected = timeline === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onTimelineChange(opt.value)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                style={{
                  background: selected ? "rgba(212,168,67,0.1)" : "var(--color-slate-deep)",
                  border: `1.5px solid ${selected ? "var(--color-gold)" : "var(--color-border-dark)"}`,
                  color: selected ? "var(--color-gold)" : "var(--color-text-on-dark)",
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text-on-dark)" }}>
          Dă-i un nume proiectului tău <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => onProjectNameChange(e.target.value)}
          placeholder="ex: Site-ul firmei mele"
          className={fieldClass}
          style={fieldStyle}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text-on-dark)" }}>
          Descrie pe scurt ce ai în minte
        </label>
        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Opțional — orice detaliu ne ajută să înțelegem mai bine proiectul"
          rows={2}
          className={fieldClass}
          style={fieldStyle}
        />
      </div>
    </div>
  );
}
