"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { AlertCircle, Lightbulb, TrendingUp } from "lucide-react";
import { PORTFOLIO } from "@/lib/constants";
import ScrollReveal from "./ScrollReveal";

function ImpactBadge({ metric, label }: { metric: string; label: string }) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
      style={{
        background: "rgba(212,168,67,0.12)",
        border: "1px solid rgba(212,168,67,0.25)",
      }}
    >
      <span
        className="text-sm font-bold tabular-nums"
        style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
      >
        {metric}
      </span>
      <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
        {label}
      </span>
    </div>
  );
}

function CaseStudyCard({
  project,
  index,
}: {
  project: (typeof PORTFOLIO)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="group rounded-2xl overflow-hidden flex flex-col"
      style={{
        border: "1px solid var(--color-border-dark)",
        background: "var(--color-slate-deep)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(212,168,67,0.4)";
        e.currentTarget.style.boxShadow = "0 0 28px rgba(212,168,67,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--color-border-dark)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Screenshot */}
      <div className="relative w-full overflow-hidden flex-shrink-0" style={{ aspectRatio: "16/9" }}>
        <Image
          src={project.image}
          alt={`Screenshot ${project.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(14,29,51,0.8))" }}
        />
        {/* Tag */}
        <div className="absolute top-3 left-3">
          <span
            className="text-xs px-2.5 py-1 rounded-full font-semibold"
            style={{
              background: "rgba(212,168,67,0.2)",
              color: "var(--color-gold)",
              border: "1px solid rgba(212,168,67,0.3)",
              backdropFilter: "blur(4px)",
            }}
          >
            {project.tag}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 divide-y" style={{ borderColor: "var(--color-border-dark)" }}>
        {/* Project name */}
        <div className="px-6 pt-5 pb-4">
          <h3
            className="font-bold text-xl"
            style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
          >
            {project.name}
          </h3>
        </div>

        {/* Challenge */}
        <div className="px-6 py-4 flex gap-3">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: "rgba(239,68,68,0.12)" }}
          >
            <AlertCircle size={14} style={{ color: "#F87171" }} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: "#F87171" }}>
              Problema
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              {project.challenge}
            </p>
          </div>
        </div>

        {/* Solution */}
        <div className="px-6 py-4 flex gap-3">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: "rgba(125,211,252,0.12)" }}
          >
            <Lightbulb size={14} style={{ color: "#7DD3FC" }} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: "#7DD3FC" }}>
              Soluția
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              {project.solution}
            </p>
          </div>
        </div>

        {/* Impact */}
        <div className="px-6 py-4 flex gap-3 flex-1">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: "rgba(212,168,67,0.12)" }}
          >
            <TrendingUp size={14} style={{ color: "var(--color-gold)" }} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-gold)" }}>
              Rezultate
            </p>
            <div className="flex flex-wrap gap-2">
              {project.impact.map((item) => (
                <ImpactBadge key={item.metric} metric={item.metric} label={item.label} />
              ))}
            </div>
          </div>
        </div>

        {/* Tech tags */}
        <div className="px-6 py-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded"
              style={{
                background: "rgba(255,255,255,0.04)",
                color: "var(--color-text-muted)",
                border: "1px solid var(--color-border-dark)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  return (
    <section id="portofoliu" style={{ background: "var(--color-midnight)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <ScrollReveal className="text-center mb-6">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{
              border: "1px solid var(--color-border-dark)",
              color: "var(--color-gold)",
              background: "rgba(212,168,67,0.06)",
            }}
          >
            Rezultate reale, clienți reali
          </span>
        </ScrollReveal>

        <ScrollReveal className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
          >
            Studii de caz — de la problemă la{" "}
            <span style={{ color: "var(--color-gold)" }}>impact măsurabil</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--color-text-muted)" }}>
            Nu livrăm doar cod. Livrăm sisteme care rezolvă probleme reale de business
            și generează rezultate cuantificabile.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTFOLIO.map((project, i) => (
            <CaseStudyCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
