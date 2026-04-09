"use client";

import { motion } from "framer-motion";
import { scrollToSection } from "@/lib/utils";
import { TrendingUp, Zap, BarChart3 } from "lucide-react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

// Strategic results visual
function ResultsDashboard() {
  return (
    <motion.div
      className="relative w-full max-w-md mx-auto"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Main card */}
      <div
        className="rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: "var(--color-slate-deep)",
          border: "1px solid var(--color-border-dark)",
        }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ background: "rgba(0,0,0,0.3)", borderBottom: "1px solid var(--color-border-dark)" }}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
            <div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
          </div>
          <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            business-dashboard.tsx
          </span>
          <div />
        </div>

        {/* Metrics */}
        <div className="p-5 space-y-4">
          {/* ROI row */}
          <div
            className="flex items-center justify-between p-3 rounded-xl"
            style={{ background: "rgba(212,168,67,0.08)", border: "1px solid rgba(212,168,67,0.15)" }}
          >
            <div className="flex items-center gap-2">
              <TrendingUp size={16} style={{ color: "var(--color-gold)" }} />
              <span className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>
                Eficiență operațională
              </span>
            </div>
            <span className="text-sm font-bold" style={{ color: "var(--color-gold)" }}>
              +40%
            </span>
          </div>

          {/* Time saved row */}
          <div
            className="flex items-center justify-between p-3 rounded-xl"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-border-dark)" }}
          >
            <div className="flex items-center gap-2">
              <Zap size={16} style={{ color: "#7DD3FC" }} />
              <span className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>
                Ore manuale eliminate / lună
              </span>
            </div>
            <span className="text-sm font-bold" style={{ color: "#7DD3FC" }}>
              120h
            </span>
          </div>

          {/* Lead capture row */}
          <div
            className="flex items-center justify-between p-3 rounded-xl"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-border-dark)" }}
          >
            <div className="flex items-center gap-2">
              <BarChart3 size={16} style={{ color: "#86EFAC" }} />
              <span className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>
                Creștere captare lead-uri
              </span>
            </div>
            <span className="text-sm font-bold" style={{ color: "#86EFAC" }}>
              +25%
            </span>
          </div>

          {/* Status bar */}
          <div
            className="flex items-center gap-2 pt-2 mt-1"
            style={{ borderTop: "1px solid var(--color-border-dark)" }}
          >
            <div
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ background: "var(--color-success)" }}
            />
            <span style={{ color: "var(--color-success)", fontSize: "0.65rem" }}>
              Infrastructură digitală activă — procese automatizate
            </span>
          </div>
        </div>
      </div>

      {/* Floating badge — top right */}
      <motion.div
        className="absolute -top-4 -right-4 px-3 py-2 rounded-xl text-xs font-semibold shadow-lg"
        style={{
          background: "var(--color-gold)",
          color: "var(--color-midnight)",
        }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        ⚡ 10+ ani experiență
      </motion.div>

      {/* Floating badge — bottom left */}
      <motion.div
        className="absolute -bottom-4 -left-4 px-3 py-2 rounded-xl text-xs font-semibold shadow-lg"
        style={{
          background: "var(--color-slate-deep)",
          border: "1px solid var(--color-border-dark)",
          color: "var(--color-text-on-dark)",
        }}
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        ✓ Audit gratuit inclus
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--color-midnight)" }}
    >
      {/* Video background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.45 }}
        >
          <source src="/images/hero-video.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(14,29,51,0.75) 0%, rgba(14,29,51,0.55) 100%)" }}
        />
        <div className="absolute inset-0 bg-dot-grid opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left column */}
          <div className="lg:col-span-3 space-y-6">
            {/* Badge */}
            <motion.div {...fadeUp(0.1)}>
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
                style={{
                  border: "1px solid var(--color-border-dark)",
                  color: "var(--color-gold)",
                  background: "rgba(212,168,67,0.06)",
                }}
              >
                ⚡ Partner Strategic în Digitalizare & Automatizare
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.25)}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
            >
              Scalează operațiunile cu{" "}
              <span style={{ color: "var(--color-gold)" }}>Automatizare Inteligentă</span>{" "}
              & Platforme Digitale Performante
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              {...fadeUp(0.4)}
              className="text-lg leading-relaxed max-w-xl"
              style={{ color: "var(--color-text-muted)" }}
            >
              Eliminăm blocajele manuale și construim infrastructura digitală care
              transformă ineficiența în creștere măsurabilă. Soluții personalizate
              pentru afaceri din România care vor să scaleze.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.55)} className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollToSection("#contact")}
                className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105 gold-glow-hover focus-visible:outline-none"
                style={{ background: "var(--color-gold)", color: "var(--color-midnight)" }}
              >
                Solicită un Audit Gratuit
              </button>
              <button
                onClick={() => scrollToSection("#servicii")}
                className="px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 focus-visible:outline-none"
                style={{
                  border: "2px solid var(--color-gold)",
                  color: "var(--color-gold)",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(212,168,67,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Explorează Soluțiile
              </button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              {...fadeUp(0.7)}
              className="flex flex-wrap gap-4 text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              <span>✓ Fără costuri ascunse</span>
              <span>✓ Audit inițial 100% gratuit</span>
              <span>✓ ROI măsurabil garantat</span>
            </motion.div>
          </div>

          {/* Right column — results dashboard */}
          <motion.div
            className="lg:col-span-2 flex justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <ResultsDashboard />
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--color-midnight))",
        }}
      />
    </section>
  );
}
