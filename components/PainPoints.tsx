"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, AlertTriangle, TrendingDown } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

const PAIN_POINTS = [
  {
    icon: Clock,
    tag: "Pierdere de Timp",
    title: "Procesele manuale îți erodează marjele de profit în fiecare zi",
    description:
      "La 20 de ore pe săptămână pierdute pe introduceri manuale de date, rapoarte copy-paste și emailuri individuale, plătești efectiv un angajat să nu producă nimic. Asta nu e o problemă de eficiență — e o hemoragie financiară.",
    stat: "~40%",
    statLabel: "din costurile operaționale provin din muncă automatizabilă",
    accentColor: "#F59E0B",
  },
  {
    icon: AlertTriangle,
    tag: "Eroare Umană",
    title: "Erorile umane nu sunt accidente — sunt o taxă ascunsă pe profitul tău",
    description:
      "O factură greșită. O comandă pierdută. Date nesincronizate între Excel și CRM. Fiecare eroare costă reparație, timp și clienți. Și vor continua să apară atâta timp cât procesele tale rămân manuale și fragmentate.",
    stat: "1 din 3",
    statLabel: "procese manuale generează erori care costă direct clienți",
    accentColor: "#EF4444",
  },
  {
    icon: TrendingDown,
    tag: "Barieră de Scalare",
    title: "Fiecare client nou devine o povară operațională, nu o sursă de profit",
    description:
      "Dacă dublarea clienților înseamnă dublarea stresului și a costurilor operaționale, nu ai un business scalabil — ai o capcană. Fără infrastructură digitală, creșterea te va costa mai mult decât te va plăti.",
    stat: "3×",
    statLabel: "mai costisitor să crești fără sisteme digitale față de cu ele",
    accentColor: "#8B5CF6",
  },
];

function PainCard({
  point,
  index,
}: {
  point: (typeof PAIN_POINTS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });
  const Icon = point.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col rounded-2xl overflow-hidden group"
      style={{
        background: "linear-gradient(160deg, var(--color-slate-deep) 0%, rgba(14,29,51,0.8) 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.35), 0 1px 4px rgba(0,0,0,0.2)",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px ${point.accentColor}40, 0 0 32px ${point.accentColor}12`;
        e.currentTarget.style.borderColor = `${point.accentColor}35`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.35), 0 1px 4px rgba(0,0,0,0.2)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
      }}
    >
      {/* Top accent line with glow */}
      <div
        className="h-[3px] w-full"
        style={{
          background: `linear-gradient(90deg, ${point.accentColor}, ${point.accentColor}60)`,
          boxShadow: `0 0 12px ${point.accentColor}60`,
        }}
      />

      <div className="p-7 flex flex-col gap-5 flex-1">
        {/* Icon + tag */}
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: `${point.accentColor}15`,
              boxShadow: `0 0 0 1px ${point.accentColor}25`,
            }}
          >
            <Icon size={21} strokeWidth={1.8} style={{ color: point.accentColor }} />
          </div>
          <span
            className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{
              background: `${point.accentColor}12`,
              color: point.accentColor,
              border: `1px solid ${point.accentColor}25`,
            }}
          >
            {point.tag}
          </span>
        </div>

        {/* Title — larger, bolder */}
        <h3
          className="text-[1.2rem] font-bold leading-snug"
          style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
        >
          {point.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed flex-1"
          style={{ color: "rgba(180,195,215,0.85)" }}
        >
          {point.description}
        </p>

        {/* Stat callout — premium treatment */}
        <div
          className="flex items-center gap-4 p-4 rounded-xl"
          style={{
            background: `linear-gradient(135deg, ${point.accentColor}0A, ${point.accentColor}05)`,
            border: `1px solid ${point.accentColor}28`,
            boxShadow: `inset 0 1px 0 ${point.accentColor}15`,
          }}
        >
          <span
            className="text-4xl font-black tabular-nums leading-none"
            style={{
              color: point.accentColor,
              fontFamily: "var(--font-display)",
              textShadow: `0 0 24px ${point.accentColor}40`,
            }}
          >
            {point.stat}
          </span>
          <span
            className="text-xs leading-snug font-medium"
            style={{ color: "rgba(180,195,215,0.75)" }}
          >
            {point.statLabel}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function PainPoints() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-10% 0px" });

  return (
    <section id="probleme" style={{ background: "var(--color-midnight)" }}>
      {/* Subtle top separator */}
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,67,0.2), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{
              border: "1px solid rgba(212,168,67,0.25)",
              color: "var(--color-gold)",
              background: "rgba(212,168,67,0.06)",
            }}
          >
            Recunoști aceste probleme?
          </span>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black mb-5 leading-tight"
            style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
          >
            Afacerea ta pierde bani{" "}
            <span style={{ color: "var(--color-gold)" }}>în fiecare zi</span>{" "}
            din cauza proceselor manuale
          </h2>

          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(160,180,210,0.9)" }}
          >
            Nu e o problemă de oameni sau de motivație. E o problemă de sisteme.
            Și are soluție.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {PAIN_POINTS.map((point, i) => (
            <PainCard key={point.tag} point={point} index={i} />
          ))}
        </div>

        {/* Bottom bridge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-16"
        >
          <p className="text-base mb-6" style={{ color: "rgba(160,180,210,0.8)" }}>
            Dacă te regăsești în cel puțin una din situațiile de mai sus,{" "}
            <span style={{ color: "var(--color-text-on-dark)", fontWeight: 700 }}>
              ai nevoie de un audit al proceselor tale.
            </span>
          </p>
          <button
            onClick={() => scrollToSection("#servicii")}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold transition-all duration-200 hover:scale-105 focus-visible:outline-none gold-glow-hover"
            style={{
              background: "var(--color-gold)",
              color: "var(--color-midnight)",
              boxShadow: "0 4px 20px rgba(212,168,67,0.3)",
            }}
          >
            Descoperă soluția →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
