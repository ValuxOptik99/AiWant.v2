"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const DIFFERENTIATORS = [
  { emoji: "🎯", text: "Comunicare directă cu dezvoltatorul" },
  { emoji: "🔧", text: "Tehnologii moderne, cod curat" },
  { emoji: "📦", text: "Cod sursă predat integral" },
];

export default function AboutSection() {
  return (
    <section id="despre" style={{ background: "var(--color-surface)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left — photo placeholder */}
          <ScrollReveal className="lg:col-span-2" direction="right">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                aspectRatio: "4/5",
                background: "var(--color-surface-warm)",
                border: "1px solid var(--color-border-warm)",
              }}
            >
              <Image
                src="/images/vlad.jpg"
                alt="Vlad Gheorghe, fondator AiWANT"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />

              {/* Accent corner */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ background: "var(--color-gold)" }}
              />
            </div>
          </ScrollReveal>

          {/* Right — text */}
          <div className="lg:col-span-3 space-y-6">
            <ScrollReveal>
              <h2
                className="text-3xl sm:text-4xl font-bold mb-6"
                style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
              >
                Cine suntem 
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-base leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                Salutare ! Sunt Vlad, fondatorul AiWant, cu peste 10 ani de
                experiență în programare și web design. Construiesc
                soluții digitale pentru afaceri care vor să crească.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-base leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                Cu o experiență atât în business, cât și în tehnologie, te pot ajuta să-ți duci
                afacerea la următorul nivel — fie că ai nevoie de un site nou, o aplicație dedicată,
                sau automatizări care să-ți salveze timp și bani.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-base leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                Lucrez cu fiecare client direct — fără intermediari, fără agenție mare,
                fără birocrație. Primești atenție dedicată și un partener tehnic care
                înțelege atât codul, cât și nevoile afacerii tale.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p className="text-base leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                Folosesc cele mai moderne tehnologii — Next.js, React, AI, automatizări
                — pentru a livra produse rapide, sigure și ușor de administrat.
              </p>
            </ScrollReveal>

            {/* Differentiators */}
            <ScrollReveal delay={0.5}>
              <div className="flex flex-wrap gap-3 mt-4">
                {DIFFERENTIATORS.map((d) => (
                  <div
                    key={d.text}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
                    style={{
                      background: "rgba(212,168,67,0.08)",
                      border: "1px solid rgba(212,168,67,0.2)",
                      color: "var(--color-navy)",
                    }}
                  >
                    <span>{d.emoji}</span>
                    <span>{d.text}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
