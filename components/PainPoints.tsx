"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, AlertTriangle, TrendingDown } from "lucide-react";

const PAIN_POINTS = [
  {
    icon: Clock,
    tag: "Pierdere de Timp",
    title: "Ore valoroase irosite pe sarcini repetitive",
    description:
      "Introducerea manuală a datelor, rapoarte generate cu copia-lipeste, emailuri trimise unul câte unul. Echipa ta pierde zile întregi pe muncă fără valoare adăugată.",
    stat: "~40%",
    statLabel: "din timp pierdut pe sarcini automatizabile",
    accentColor: "#F59E0B",
  },
  {
    icon: AlertTriangle,
    tag: "Eroare Umană",
    title: "Greșeli costisitoare din procese fragmentate",
    description:
      "Datele din Excel nu se sincronizează cu CRM-ul. Comenzile se pierd între departamente. Facturi emise greșit. Fiecare eroare costă bani, timp și reputație.",
    stat: "1 din 3",
    statLabel: "procese manuale generează erori critice",
    accentColor: "#EF4444",
  },
  {
    icon: TrendingDown,
    tag: "Barieră de Scalare",
    title: "Sistemele actuale nu suportă creșterea",
    description:
      "Mai mulți clienți înseamnă mai mult haos, nu mai mult profit. Dacă fiecare client nou adaugă ore de muncă manuală, afacerea ta nu poate scala — poate doar supraviețui.",
    stat: "3x",
    statLabel: "mai greu de scalat fără infrastructură digitală",
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
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: "var(--color-slate-deep)",
        border: "1px solid var(--color-border-dark)",
      }}
    >
      {/* Top accent line */}
      <div
        className="h-1 w-full"
        style={{ background: point.accentColor }}
      />

      <div className="p-7 flex flex-col gap-5 flex-1">
        {/* Icon + tag */}
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${point.accentColor}18` }}
          >
            <Icon size={22} strokeWidth={1.8} style={{ color: point.accentColor }} />
          </div>
          <span
            className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{
              background: `${point.accentColor}18`,
              color: point.accentColor,
            }}
          >
            {point.tag}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-xl font-bold leading-snug"
          style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
        >
          {point.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed flex-1"
          style={{ color: "var(--color-text-muted)" }}
        >
          {point.description}
        </p>

        {/* Stat callout */}
        <div
          className="flex items-center gap-4 p-4 rounded-xl"
          style={{
            background: `${point.accentColor}0D`,
            border: `1px solid ${point.accentColor}30`,
          }}
        >
          <span
            className="text-3xl font-bold tabular-nums"
            style={{ color: point.accentColor, fontFamily: "var(--font-display)" }}
          >
            {point.stat}
          </span>
          <span
            className="text-xs leading-snug"
            style={{ color: "var(--color-text-muted)" }}
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
    <section
      id="probleme"
      style={{ background: "var(--color-midnight)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          {/* Eyebrow */}
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{
              border: "1px solid var(--color-border-dark)",
              color: "var(--color-gold)",
              background: "rgba(212,168,67,0.06)",
            }}
          >
            Recunoști aceste probleme?
          </span>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight"
            style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
          >
            Afacerea ta e frânată de{" "}
            <span style={{ color: "var(--color-gold)" }}>procese manuale?</span>
          </h2>

          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            Majoritatea afacerilor din România pierd zilnic bani și timp din cauza
            sistemelor digitale ineficiente sau inexistente. Nu trebuie să fie așa.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PAIN_POINTS.map((point, i) => (
            <PainCard key={point.tag} point={point} index={i} />
          ))}
        </div>

        {/* Bottom CTA bridge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-14"
        >
          <p
            className="text-base mb-5"
            style={{ color: "var(--color-text-muted)" }}
          >
            Dacă te regăsești în cel puțin una din situațiile de mai sus,{" "}
            <span style={{ color: "var(--color-text-on-dark)", fontWeight: 600 }}>
              avem soluția potrivită.
            </span>
          </p>
          <button
            onClick={() => {
              const el = document.querySelector("#servicii");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 focus-visible:outline-none gold-glow-hover"
            style={{
              background: "var(--color-gold)",
              color: "var(--color-midnight)",
            }}
          >
            Vezi cum te ajutăm →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
