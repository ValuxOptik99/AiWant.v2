"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PORTFOLIO } from "@/lib/constants";
import { CaseStudyCard } from "./CaseStudyCard";
import ScrollReveal from "./ScrollReveal";

const FEATURED_COUNT = 2;

export default function PortfolioSection() {
  const featured = PORTFOLIO.slice(0, FEATURED_COUNT);
  const remaining = PORTFOLIO.length - FEATURED_COUNT;

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
          {featured.map((project, i) => (
            <CaseStudyCard key={project.name} project={project} index={i} />
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="mt-12 text-center">
            {remaining > 0 && (
              <p className="text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>
                ...și alte {remaining} proiecte livrate
              </p>
            )}
            <Link
              href="/portofoliu"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
              style={{
                border: "2px solid var(--color-gold)",
                color: "var(--color-gold)",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(212,168,67,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              Vezi toate proiectele <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
