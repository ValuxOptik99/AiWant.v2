"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { PORTFOLIO } from "@/lib/constants";
import ScrollReveal from "./ScrollReveal";

function PortfolioCard({
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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      whileHover={{ scale: 1.02 }}
      className="group rounded-xl overflow-hidden transition-all duration-300 cursor-pointer"
      style={{
        border: "1px solid var(--color-border-dark)",
        background: "var(--color-slate-deep)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--color-gold)";
        e.currentTarget.style.boxShadow = "0 0 20px rgba(212,168,67,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--color-border-dark)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Project screenshot */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <Image
          src={project.image}
          alt={`Screenshot ${project.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        {/* Subtle dark overlay at bottom for readability */}
        <div
          className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(14,29,51,0.6))" }}
        />
      </div>

      {/* Card body */}
      <div className="p-5 space-y-3">
        {/* Tag */}
        <span
          className="inline-block text-xs px-2.5 py-1 rounded-full font-medium"
          style={{
            background: "rgba(212,168,67,0.15)",
            color: "var(--color-gold-light)",
          }}
        >
          {project.tag}
        </span>

        <h3
          className="font-bold text-lg"
          style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
        >
          {project.name}
        </h3>

        <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "var(--color-text-muted)",
                border: "1px solid var(--color-border-dark)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <a
          href={project.link}
          className="inline-flex items-center gap-1 text-sm font-medium mt-1 group/link"
          style={{ color: "var(--color-gold)" }}
        >
          <span>Vezi proiectul</span>
          <ExternalLink
            size={13}
            className="transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200"
          />
        </a>
      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  return (
    <section id="portofoliu" style={{ background: "var(--color-midnight)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <ScrollReveal className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
          >
            Proiecte recente
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--color-text-muted)" }}>
            O selecție din lucrările noastre pentru clienți din diverse industrii.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTFOLIO.map((project, i) => (
            <PortfolioCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
