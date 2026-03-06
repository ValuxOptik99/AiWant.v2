"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PROCESS_STEPS } from "@/lib/constants";
import ScrollReveal from "./ScrollReveal";

function StepCard({
  step,
  index,
  total,
}: {
  step: (typeof PROCESS_STEPS)[0];
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className="relative flex flex-col items-center text-center">
      {/* Step number */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <span
          className="text-6xl font-black leading-none select-none"
          style={{
            color: "var(--color-gold)",
            opacity: 0.25,
            fontFamily: "var(--font-display)",
          }}
        >
          {step.number}
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-3 space-y-2 max-w-xs"
      >
        <h3
          className="font-bold text-lg"
          style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
        >
          {step.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
          {step.description}
        </p>
      </motion.div>

      {/* Connecting line — horizontal on desktop */}
      {index < total - 1 && (
        <motion.div
          className="hidden lg:block absolute top-8 left-[60%] right-0 h-px"
          style={{ borderTop: "1px dashed var(--color-border-dark)", transformOrigin: "left" }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.3, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}

export default function ProcessSection() {
  return (
    <section style={{ background: "var(--color-midnight)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <ScrollReveal className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
          >
            Procesul nostru
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--color-text-muted)" }}>
            De la idee la lansare, în pași clari.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-4 relative">
          {PROCESS_STEPS.map((step, i) => (
            <StepCard
              key={step.number}
              step={step}
              index={i}
              total={PROCESS_STEPS.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
