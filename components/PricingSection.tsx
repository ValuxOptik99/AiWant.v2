"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Globe, LayoutDashboard, ShoppingCart, Bot, type LucideIcon } from "lucide-react";
import { PRICING } from "@/lib/constants";
import { scrollToSection } from "@/lib/utils";
import ScrollReveal from "./ScrollReveal";

const ICON_MAP: Record<string, LucideIcon> = {
  Globe,
  LayoutDashboard,
  ShoppingCart,
  Bot,
};

function PricingCard({
  tier,
  index,
}: {
  tier: (typeof PRICING)[0];
  index: number;
}) {
  const Icon: LucideIcon = ICON_MAP[tier.icon] || Globe;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: "#fff",
        border: tier.featured ? "2px solid var(--color-gold)" : "1px solid var(--color-border-warm)",
        boxShadow: tier.featured ? "0 0 30px rgba(212,168,67,0.15)" : "none",
      }}
    >
      {/* Featured badge */}
      {tier.featured && tier.badge && (
        <div
          className="absolute top-0 left-0 right-0 text-center py-1.5 text-xs font-bold tracking-wide"
          style={{ background: "var(--color-gold)", color: "#fff" }}
        >
          {tier.badge}
        </div>
      )}

      <div className={`flex flex-col flex-1 p-6 ${tier.featured && tier.badge ? "pt-10" : ""}`}>
        {/* Icon + title */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(212,168,67,0.1)" }}
          >
            <Icon size={20} strokeWidth={1.8} style={{ color: "var(--color-gold)" }} />
          </div>
          <h3
            className="font-bold text-lg"
            style={{
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-display)",
            }}
          >
            {tier.title}
          </h3>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div
            className="text-2xl font-bold"
            style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
          >
            {tier.price}
          </div>
          <div className="text-sm mt-0.5" style={{ color: "var(--color-text-secondary)" }}>
            {tier.subtitle}
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-2.5 flex-1 mb-6">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <Check
                size={16}
                strokeWidth={2.5}
                className="mt-0.5 flex-shrink-0"
                style={{ color: "var(--color-gold)" }}
              />
              <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                {f}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => scrollToSection("#contact")}
          className="w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 focus-visible:outline-none"
          style={
            tier.featured
              ? { background: "var(--color-gold)", color: "#fff" }
              : {
                  background: "transparent",
                  border: "2px solid var(--color-gold)",
                  color: "var(--color-gold)",
                }
          }
        >
          Solicită ofertă
        </button>
      </div>

      {/* Featured glow pulse */}
      {tier.featured && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ opacity: [0, 0.15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ border: "2px solid var(--color-gold)", borderRadius: "inherit" }}
        />
      )}
    </motion.div>
  );
}

export default function PricingSection() {
  return (
    <section id="preturi" style={{ background: "var(--color-surface-warm)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <ScrollReveal className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
          >
            Investiție transparentă
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--color-text-secondary)" }}>
            Prețuri orientative. Fiecare proiect primește o ofertă personalizată în
            funcție de complexitate.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {PRICING.map((tier, i) => (
            <PricingCard key={tier.title} tier={tier} index={i} />
          ))}
        </div>

        {/* Footer note */}
        <ScrollReveal delay={0.3}>
          <div className="mt-10 text-center space-y-2">
            <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
              Toate proiectele includ:{" "}
              <strong>cod sursă predat · suport post-livrare · documentație</strong>
            </p>
            <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
              Hosting & administrare de la{" "}
              <strong style={{ color: "var(--color-navy)" }}>15 EUR/lună</strong> —
              detalii în oferta personalizată
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
