"use client";

import { motion, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";
import { scrollToSection } from "@/lib/utils";
import { TrendingUp, Zap, BarChart3, ArrowUpRight } from "lucide-react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

// Animated counter that runs on mount
function AnimatedNumber({ target, prefix = "", suffix = "", duration = 1.8, delay = 0 }: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
}) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      animate(scope.current, { opacity: 1 }, { duration: 0.01 });
      let start = 0;
      const steps = 60;
      const stepDuration = (duration * 1000) / steps;
      const increment = target / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          start = target;
          clearInterval(timer);
        }
        if (scope.current) {
          scope.current.textContent = `${prefix}${Math.round(start)}${suffix}`;
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [target, duration, delay, prefix, suffix, animate, scope]);

  return (
    <span ref={scope} style={{ opacity: 0 }}>
      {prefix}0{suffix}
    </span>
  );
}

// Sparkline bar chart
function Sparkline() {
  const bars = [20, 35, 28, 45, 38, 55, 48, 65, 58, 72, 68, 85];
  return (
    <div className="flex items-end gap-0.5 h-8">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ duration: 0.4, delay: 0.8 + i * 0.05, ease: "easeOut" }}
          className="w-1.5 rounded-sm flex-shrink-0"
          style={{
            background: i >= bars.length - 3
              ? "var(--color-gold)"
              : "rgba(212,168,67,0.25)",
          }}
        />
      ))}
    </div>
  );
}

function ResultsDashboard() {
  return (
    <motion.div
      className="relative w-full max-w-[420px] mx-auto"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: "0 0 60px rgba(212,168,67,0.12), 0 20px 40px rgba(0,0,0,0.4)",
        }}
      />

      {/* Main card */}
      <div
        className="rounded-2xl overflow-hidden relative"
        style={{
          background: "var(--color-slate-deep)",
          border: "1px solid rgba(212,168,67,0.2)",
        }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{
            background: "rgba(0,0,0,0.35)",
            borderBottom: "1px solid rgba(212,168,67,0.12)",
          }}
        >
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-70" />
          </div>
          <span className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>
            ROI Dashboard — Client Live
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#10B981" }} />
            <span className="text-xs" style={{ color: "#10B981" }}>LIVE</span>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* PRIMARY METRIC — big and dominant */}
          <div
            className="rounded-xl p-4"
            style={{
              background: "rgba(212,168,67,0.06)",
              border: "1px solid rgba(212,168,67,0.18)",
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--color-text-muted)" }}>
                  Eficiență Operațională
                </p>
                <div className="flex items-end gap-2">
                  <span
                    className="text-5xl font-black tabular-nums leading-none"
                    style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
                  >
                    <AnimatedNumber target={40} prefix="+" suffix="%" duration={1.6} delay={0.5} />
                  </span>
                  <span className="flex items-center gap-0.5 text-xs font-semibold pb-1" style={{ color: "#10B981" }}>
                    <ArrowUpRight size={12} />
                    vs. lunar trecut
                  </span>
                </div>
              </div>
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(212,168,67,0.12)" }}
              >
                <TrendingUp size={16} style={{ color: "var(--color-gold)" }} />
              </div>
            </div>
            <Sparkline />
          </div>

          {/* SECONDARY METRICS — side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className="rounded-xl p-3.5"
              style={{
                background: "rgba(125,211,252,0.05)",
                border: "1px solid rgba(125,211,252,0.15)",
              }}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <Zap size={12} style={{ color: "#7DD3FC" }} />
                <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Ore economisite</span>
              </div>
              <span
                className="text-3xl font-black tabular-nums"
                style={{ color: "#7DD3FC", fontFamily: "var(--font-display)" }}
              >
                <AnimatedNumber target={120} suffix="h" duration={1.4} delay={0.9} />
              </span>
              <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>/lună</p>
            </div>

            <div
              className="rounded-xl p-3.5"
              style={{
                background: "rgba(134,239,172,0.05)",
                border: "1px solid rgba(134,239,172,0.15)",
              }}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <BarChart3 size={12} style={{ color: "#86EFAC" }} />
                <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Lead-uri captate</span>
              </div>
              <span
                className="text-3xl font-black tabular-nums"
                style={{ color: "#86EFAC", fontFamily: "var(--font-display)" }}
              >
                <AnimatedNumber target={25} prefix="+" suffix="%" duration={1.4} delay={1.1} />
              </span>
              <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>creștere</p>
            </div>
          </div>

          {/* Status */}
          <div
            className="flex items-center justify-between text-xs px-1"
          >
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#10B981" }} />
              <span style={{ color: "var(--color-text-muted)" }}>Automatizare activă</span>
            </div>
            <span style={{ color: "var(--color-text-muted)" }}>Actualizat acum</span>
          </div>
        </div>
      </div>

      {/* Floating badge — top right */}
      <motion.div
        className="absolute -top-3 -right-3 px-3 py-1.5 rounded-xl text-xs font-bold shadow-xl"
        style={{
          background: "var(--color-gold)",
          color: "var(--color-midnight)",
          boxShadow: "0 4px 16px rgba(212,168,67,0.35)",
        }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        ⚡ 10+ ani experiență
      </motion.div>

      {/* Floating badge — bottom left */}
      <motion.div
        className="absolute -bottom-3 -left-3 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xl"
        style={{
          background: "var(--color-slate-deep)",
          border: "1px solid rgba(212,168,67,0.25)",
          color: "var(--color-text-on-dark)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
        }}
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        ✓ Audit inițial gratuit
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
          style={{ opacity: 0.4 }}
        >
          <source src="/images/hero-video.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(14,29,51,0.80) 0%, rgba(14,29,51,0.60) 100%)" }}
        />
        <div className="absolute inset-0 bg-dot-grid opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left column */}
          <div className="lg:col-span-3 space-y-7">
            {/* Badge */}
            <motion.div {...fadeUp(0.1)}>
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
                style={{
                  border: "1px solid rgba(212,168,67,0.3)",
                  color: "var(--color-gold)",
                  background: "rgba(212,168,67,0.07)",
                }}
              >
                ⚡ Partner Strategic în Digitalizare & Automatizare
              </span>
            </motion.div>

            {/* Headline — 3-verb punch structure */}
            <motion.h1
              {...fadeUp(0.2)}
              className="text-4xl sm:text-5xl lg:text-[3.75rem] font-black leading-[1.1] tracking-tight"
              style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
            >
              Automatizează Procesele.{" "}
              Optimizează Costurile.{" "}
              <span style={{ color: "var(--color-gold)" }}>Scalează Profitabil.</span>
            </motion.h1>

            {/* Sub-headline — hits the profit nerve */}
            <motion.p
              {...fadeUp(0.35)}
              className="text-lg leading-relaxed max-w-xl"
              style={{ color: "var(--color-text-muted)" }}
            >
              Procesele manuale îți erodează marjele de profit în fiecare zi.
              Construim infrastructura digitală care transformă haosul operațional
              în creștere predictibilă și scalabilă.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.5)} className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollToSection("#contact")}
                className="px-7 py-3.5 rounded-xl font-bold transition-all duration-200 hover:scale-105 gold-glow-hover focus-visible:outline-none"
                style={{ background: "var(--color-gold)", color: "var(--color-midnight)" }}
              >
                Solicită un Audit Gratuit
              </button>
              <button
                onClick={() => scrollToSection("#servicii")}
                className="px-7 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:scale-105 focus-visible:outline-none"
                style={{
                  border: "2px solid rgba(212,168,67,0.5)",
                  color: "var(--color-gold)",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(212,168,67,0.08)";
                  e.currentTarget.style.borderColor = "var(--color-gold)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(212,168,67,0.5)";
                }}
              >
                Explorează Soluțiile
              </button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              {...fadeUp(0.65)}
              className="flex flex-wrap gap-5 text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              <span className="flex items-center gap-1.5">
                <span style={{ color: "var(--color-gold)" }}>✓</span> Fără costuri ascunse
              </span>
              <span className="flex items-center gap-1.5">
                <span style={{ color: "var(--color-gold)" }}>✓</span> Audit 100% gratuit
              </span>
              <span className="flex items-center gap-1.5">
                <span style={{ color: "var(--color-gold)" }}>✓</span> ROI măsurabil garantat
              </span>
            </motion.div>
          </div>

          {/* Right column — metrics dashboard */}
          <motion.div
            className="lg:col-span-2 flex justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <ResultsDashboard />
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-midnight))" }}
      />
    </section>
  );
}
