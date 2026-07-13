"use client";

import { Check } from "lucide-react";
import { CONFIG_FEATURES, type ServiceKey } from "@/lib/configurator-data";

export default function StepFeatures({
  service,
  selected,
  onToggle,
}: {
  service: ServiceKey;
  selected: string[];
  onToggle: (key: string) => void;
}) {
  const features = CONFIG_FEATURES[service] ?? [];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1.5" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>
        Alege funcționalitățile
      </h2>
      <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
        Bifează doar ce știi sigur — putem ajusta oricând împreună.
      </p>

      <div className="space-y-2.5">
        {features.map((feature) => {
          const checked = selected.includes(feature.key);
          return (
            <button
              key={feature.key}
              type="button"
              onClick={() => onToggle(feature.key)}
              className="w-full flex items-center justify-between gap-3 p-4 rounded-xl text-left transition-colors"
              style={{
                background: "var(--color-slate-deep)",
                border: `1.5px solid ${checked ? "var(--color-gold)" : "var(--color-border-dark)"}`,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center transition-all"
                  style={{ background: checked ? "var(--color-gold)" : "transparent", border: checked ? "none" : "1.5px solid var(--color-border-dark)" }}
                >
                  {checked && <Check size={11} color="#0E1D33" strokeWidth={3} />}
                </div>
                <span className="text-sm font-medium" style={{ color: "var(--color-text-on-dark)" }}>{feature.label}</span>
              </div>
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                style={{ background: "rgba(212,168,67,0.1)", color: "var(--color-gold)" }}
              >
                +{feature.price} EUR
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
