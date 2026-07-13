"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import { Globe, LayoutDashboard, ShoppingCart, Bot, type LucideIcon } from "lucide-react";
import type { ConfigService, Estimate } from "@/lib/configurator-data";

const ICON_MAP: Record<string, LucideIcon> = { Globe, LayoutDashboard, ShoppingCart, Bot };

function useAnimatedNumber(value: number) {
  const motionValue = useMotionValue(value);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 0.5,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return display;
}

export default function SummaryPanel({
  projectName,
  service,
  featureLabels,
  estimate,
  compact = false,
}: {
  projectName: string;
  service: ConfigService | null;
  featureLabels: string[];
  estimate: Estimate;
  compact?: boolean;
}) {
  const low = useAnimatedNumber(estimate.low);
  const high = useAnimatedNumber(estimate.high);
  const Icon = service ? ICON_MAP[service.icon] : null;

  return (
    <motion.div
      layout
      className="rounded-2xl p-6"
      style={{ background: "var(--color-slate-deep)", border: "1px solid var(--color-border-dark)" }}
    >
      <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--color-gold)" }}>
        {projectName || "Proiectul tău"}
      </p>

      {service && (
        <motion.div
          key={service.key}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2.5 mt-3 mb-4"
        >
          {Icon && (
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,168,67,0.1)" }}>
              <Icon size={16} style={{ color: "var(--color-gold)" }} />
            </div>
          )}
          <span className="text-sm font-semibold" style={{ color: "var(--color-text-on-dark)" }}>{service.title}</span>
        </motion.div>
      )}

      {!compact && (
        <div className="space-y-1.5 mb-4">
          <AnimatePresence initial={false}>
            {featureLabels.map((label) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -8, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2 text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                <span style={{ color: "var(--color-gold)" }}>✓</span>
                {label}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <div className="pt-4" style={{ borderTop: "1px solid var(--color-border-dark)" }}>
        <p className="text-xs font-medium mb-1" style={{ color: "var(--color-text-muted)" }}>Estimare investiție</p>
        <p className="text-2xl font-black tabular-nums" style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}>
          {low.toLocaleString("ro-RO")}–{high.toLocaleString("ro-RO")} EUR
        </p>
        {estimate.low >= 300 && (
          <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>
            sau de la ~{Math.round(low / 12).toLocaleString("ro-RO")} EUR/lună cu plata în rate (12 luni)
          </p>
        )}
        {estimate.weeksLow > 0 && (
          <>
            <p className="text-xs font-medium mt-3 mb-1" style={{ color: "var(--color-text-muted)" }}>Durată estimată</p>
            <p className="text-sm font-semibold" style={{ color: "var(--color-text-on-dark)" }}>
              {estimate.weeksLow}–{estimate.weeksHigh} săptămâni
            </p>
          </>
        )}
      </div>

      {!compact && (
        <p className="text-xs mt-4 leading-snug" style={{ color: "var(--color-text-muted)", opacity: 0.7 }}>
          Estimare orientativă. Oferta finală se stabilește după discuția de proiect.
        </p>
      )}
    </motion.div>
  );
}
