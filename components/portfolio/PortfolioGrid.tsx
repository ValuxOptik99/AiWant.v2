"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PORTFOLIO } from "@/lib/constants";
import { CaseStudyCard } from "@/components/CaseStudyCard";

const TAGS = Array.from(new Set(PORTFOLIO.map((p) => p.tag)));

export default function PortfolioGrid() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const filtered = activeTag ? PORTFOLIO.filter((p) => p.tag === activeTag) : PORTFOLIO;

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {["Toate", ...TAGS].map((tag) => {
          const isActive = tag === "Toate" ? activeTag === null : activeTag === tag;
          return (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === "Toate" ? null : tag)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
              style={{
                background: isActive ? "var(--color-gold)" : "transparent",
                color: isActive ? "#fff" : "var(--color-text-secondary)",
                border: `1px solid ${isActive ? "var(--color-gold)" : "var(--color-border)"}`,
              }}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTag ?? "all"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {filtered.map((project, i) => (
            <CaseStudyCard key={project.name} project={project} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
