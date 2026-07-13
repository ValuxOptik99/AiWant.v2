"use client";

import { Globe, LayoutDashboard, ShoppingCart, Bot, Check, type LucideIcon } from "lucide-react";
import type { ConfigService, Estimate } from "@/lib/configurator-data";

const ICON_MAP: Record<string, LucideIcon> = { Globe, LayoutDashboard, ShoppingCart, Bot };

export default function StepReview({
  projectName,
  service,
  featureLabels,
  estimate,
  timelineLabel,
  description,
  whatsappUrl,
  onContinue,
  onEdit,
}: {
  projectName: string;
  service: ConfigService;
  featureLabels: string[];
  estimate: Estimate;
  timelineLabel: string;
  description: string;
  whatsappUrl: string;
  onContinue: () => void;
  onEdit: () => void;
}) {
  const Icon = ICON_MAP[service.icon] ?? Globe;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1.5 text-center" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>
        Configurația ta e gata 🎉
      </h2>
      <p className="text-sm mb-6 text-center" style={{ color: "var(--color-text-muted)" }}>
        Așa arată proiectul pe care l-ai construit.
      </p>

      <div
        className="rounded-2xl p-6 sm:p-8"
        style={{ background: "var(--color-slate-deep)", border: "1.5px solid var(--color-gold)", boxShadow: "0 0 30px rgba(212,168,67,0.1)" }}
      >
        <div className="flex items-start justify-between gap-4 mb-6 pb-6" style={{ borderBottom: "1px solid var(--color-border-dark)" }}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--color-gold)" }}>Brief proiect</p>
            <h3 className="text-xl font-bold" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>{projectName}</h3>
            {description && <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{description}</p>}
          </div>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,168,67,0.1)" }}>
            <Icon size={20} style={{ color: "var(--color-gold)" }} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--color-text-muted)" }}>Tip proiect</p>
            <p className="text-sm font-medium" style={{ color: "var(--color-text-on-dark)" }}>{service.title}</p>

            <p className="text-xs font-semibold uppercase tracking-wide mb-2 mt-5" style={{ color: "var(--color-text-muted)" }}>Funcționalități</p>
            {featureLabels.length > 0 ? (
              <ul className="space-y-1.5">
                {featureLabels.map((label) => (
                  <li key={label} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-text-on-dark)" }}>
                    <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-gold)" }} />
                    {label}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Pachet de bază</p>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--color-text-muted)" }}>Estimare investiție</p>
            <p className="text-2xl font-black" style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}>
              {estimate.low.toLocaleString("ro-RO")}–{estimate.high.toLocaleString("ro-RO")} EUR
            </p>

            <p className="text-xs font-semibold uppercase tracking-wide mb-2 mt-5" style={{ color: "var(--color-text-muted)" }}>Durată estimată</p>
            <p className="text-sm font-medium" style={{ color: "var(--color-text-on-dark)" }}>{estimate.weeksLow}–{estimate.weeksHigh} săptămâni</p>

            <p className="text-xs font-semibold uppercase tracking-wide mb-2 mt-5" style={{ color: "var(--color-text-muted)" }}>Preferință timeline</p>
            <p className="text-sm font-medium" style={{ color: "var(--color-text-on-dark)" }}>{timelineLabel}</p>
          </div>
        </div>

        <p className="text-xs mt-6 pt-4" style={{ color: "var(--color-text-muted)", opacity: 0.7, borderTop: "1px solid var(--color-border-dark)" }}>
          Estimare orientativă. Oferta finală se stabilește după discuția de proiect.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <button
          type="button"
          onClick={onContinue}
          className="w-full py-4 rounded-xl text-base font-bold transition-all duration-200 hover:scale-[1.01] gold-glow-hover"
          style={{ background: "var(--color-gold)", color: "var(--color-midnight)" }}
        >
          Continuă — salvează configurația
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-[1.01]"
          style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.3)", color: "#25D366" }}
        >
          Trimite-mi configurația pe WhatsApp
        </a>

        <button
          type="button"
          onClick={onEdit}
          className="block w-full text-center text-sm hover:underline"
          style={{ color: "var(--color-text-muted)" }}
        >
          Modifică configurația
        </button>
      </div>
    </div>
  );
}
