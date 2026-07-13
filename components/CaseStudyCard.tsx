"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { AlertCircle, Lightbulb, TrendingUp, ExternalLink } from "lucide-react";
import { PORTFOLIO } from "@/lib/constants";

export type PortfolioProject = (typeof PORTFOLIO)[number];

export function ImpactBadge({ metric, label }: { metric: string; label: string }) {
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

export function CaseStudyCard({
  project,
  index,
}: {
  project: PortfolioProject;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });
  const hasLiveLink = project.link.startsWith("http");

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

        {/* Tech tags + live link */}
        <div className="px-6 py-4 flex flex-wrap items-center gap-1.5">
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
          {hasLiveLink && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold ml-auto hover:underline"
              style={{ color: "var(--color-gold)" }}
            >
              Vezi site-ul live <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
