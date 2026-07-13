"use client";

import { motion } from "framer-motion";
import { Globe, LayoutDashboard, ShoppingCart, Bot, Check, type LucideIcon } from "lucide-react";
import { CONFIG_SERVICES, type ServiceKey } from "@/lib/configurator-data";

const ICON_MAP: Record<string, LucideIcon> = { Globe, LayoutDashboard, ShoppingCart, Bot };

export default function StepService({
  value,
  onSelect,
}: {
  value: ServiceKey | null;
  onSelect: (key: ServiceKey) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-1.5" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>
        Ce vrei să construim?
      </h2>
      <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
        Alege tipul de proiect care se potrivește cel mai bine.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CONFIG_SERVICES.map((service) => {
          const Icon = ICON_MAP[service.icon] ?? Globe;
          const selected = value === service.key;
          return (
            <motion.button
              key={service.key}
              type="button"
              onClick={() => onSelect(service.key)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="relative flex flex-col items-start gap-3 p-5 rounded-2xl text-left transition-colors"
              style={{
                background: "var(--color-slate-deep)",
                border: `2px solid ${selected ? "var(--color-gold)" : "var(--color-border-dark)"}`,
                boxShadow: selected ? "0 0 0 3px rgba(212,168,67,0.15)" : "none",
              }}
            >
              {selected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "var(--color-gold)" }}>
                  <Check size={11} color="#0E1D33" strokeWidth={3} />
                </div>
              )}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(212,168,67,0.1)" }}>
                <Icon size={20} style={{ color: "var(--color-gold)" }} />
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: "var(--color-text-on-dark)" }}>{service.title}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>{service.desc}</p>
              </div>
              <span className="text-xs font-semibold" style={{ color: "var(--color-gold)" }}>de la {service.basePrice} EUR</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
