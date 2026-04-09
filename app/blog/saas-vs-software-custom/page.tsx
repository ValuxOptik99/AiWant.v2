import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/blog/ReadingProgress";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, XCircle, AlertTriangle, TrendingUp, Train, Car } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Software SaaS vs. Platformă Custom: Care îți Scalează Business-ul? | AiWANT",
  description:
    "SaaS sau software custom? Descoperă când un abonament lunar devine o barieră în calea creșterii și când o platformă personalizată este investiția care îți scalează business-ul.",
  keywords:
    "software custom vs saas, dezvoltare software personalizat, costuri implementare software, scalabilitatea business-ului, soluții digitale pentru companii",
  openGraph: {
    title: "Software SaaS vs. Platformă Custom: Care îți Scalează Business-ul? | AiWANT",
    description:
      "Managerii sunt bombardați cu mii de aplicații SaaS ieftine, dar se lovesc de un zid când procesele devin prea complexe. Află când e momentul să treci la custom.",
    type: "article",
    url: "https://aiwant.ro/blog/saas-vs-software-custom",
  },
  alternates: {
    canonical: "https://aiwant.ro/blog/saas-vs-software-custom",
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const SAAS_PROS = [
  "Cost inițial mic — plătești lunar, fără investiție în infrastructură",
  "Implementare instantanee — funcțional în ore, nu luni",
  "Mentenanță și update-uri incluse în abonament",
  "Echipe de suport dedicate și documentație extinsă",
];

const SAAS_CONS = [
  "Rigiditate — tu te adaptezi software-ului, nu invers",
  "Dependență — prețul sau funcționalitățile pot fi schimbate oricând de furnizor",
  "Fragmentare — datele tale trăiesc în 10 aplicații care nu comunică",
  "Costuri cumulate — 5 abonamente depășesc rapid costul unei soluții custom",
];

const CUSTOM_PROS = [
  "Eficiență maximă — doar funcționalitățile de care ai nevoie, fără zgomot digital",
  "Scalabilitate — crește odată cu businessul, fără a schimba platforma",
  "Integrabilitate — se conectează cu tot ce ai deja (ERP, POS, API-uri externe)",
  "Avantaj competitiv — procesele tale unice devin automatizate și greu de copiat",
];

const CUSTOM_CONS = [
  "Investiție inițială mai mare față de un abonament SaaS",
  "Timp de dezvoltare — câteva săptămâni sau luni, nu ore",
  "Necesită un partener de dezvoltare de încredere, cu experiență",
];

const COMPARE_ROWS: { label: string; saas: string; saasType: "pos" | "neg" | "mid"; custom: string; customType: "pos" | "neg" | "mid" }[] = [
  { label: "Cost inițial", saas: "Mic (abonament)", saasType: "pos", custom: "Investiție o singură dată", customType: "mid" },
  { label: "Cost pe termen lung", saas: "Crește cu abonamentele", saasType: "neg", custom: "Predictibil și controlat", customType: "pos" },
  { label: "Timp de implementare", saas: "Ore / Zile", saasType: "pos", custom: "Săptămâni / Luni", customType: "mid" },
  { label: "Personalizare", saas: "Limitată la configurări", saasType: "neg", custom: "Nelimitată", customType: "pos" },
  { label: "Scalabilitate", saas: "Dependentă de furnizor", saasType: "neg", custom: "Controlată intern", customType: "pos" },
  { label: "Integrare cu alte sisteme", saas: "API limitat / extra cost", saasType: "mid", custom: "Nativă și completă", customType: "pos" },
  { label: "Proprietatea datelor", saas: "La furnizor", saasType: "neg", custom: "100% la tine", customType: "pos" },
  { label: "Avantaj competitiv", saas: "Același tool ca toți concurenții", saasType: "neg", custom: "Unic pentru businessul tău", customType: "pos" },
];

const SIGNALS = [
  {
    num: "01",
    title: "Plătești prea multe abonamente care nu «vorbesc» între ele",
    desc: "Ai un CRM, un tool de project management, o platformă de facturare și un sistem de stocuri — toate separate. Angajații copiază manual date între ele. Asta nu este eficiență, este un task repetitiv costisitor ascuns în infrastructura ta digitală.",
  },
  {
    num: "02",
    title: "Angajații folosesc Excel-uri externe pentru a acoperi lipsurile",
    desc: "Dacă echipa ta a creat fișiere Excel sau Google Sheets pentru a «completa» ce nu face software-ul existent — acesta este cel mai clar semnal. Ai plătit pentru un SaaS care nu rezolvă problema reală.",
  },
  {
    num: "03",
    title: "Procesele tale unice sunt limitate de ce permite aplicația standard",
    desc: "Ceea ce te diferențiază pe piață — fluxul tău de lucru, modul în care gestionezi clienții, procesul de producție sau livrare — nu poate fi replicat în niciun SaaS de pe piață. Asta înseamnă că software-ul îți limitează avantajul competitiv.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionTag({ children, color }: { children: React.ReactNode; color: "amber" | "green" | "red" }) {
  const styles = {
    amber: { bg: "rgba(186,117,23,0.09)", border: "rgba(239,159,39,0.35)", color: "#FAC775" },
    green: { bg: "rgba(29,158,117,0.08)", border: "rgba(29,158,117,0.35)", color: "#5DCAA5" },
    red: { bg: "rgba(226,75,74,0.08)", border: "rgba(226,75,74,0.35)", color: "#F09595" },
  }[color];
  return (
    <span
      className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded"
      style={{ background: styles.bg, border: `1px solid ${styles.border}`, color: styles.color, fontFamily: "var(--font-display)" }}
    >
      {children}
    </span>
  );
}

function AnalogyBox({ emoji, title, text }: { emoji: string; title: string; text: string }) {
  return (
    <div
      className="flex items-start gap-4 rounded-xl p-5 mb-5"
      style={{ background: "var(--color-slate-deep)", border: "1px solid var(--color-border-dark)" }}
    >
      <span className="text-3xl leading-none flex-shrink-0 mt-0.5">{emoji}</span>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-display)" }}>
          {title}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.85)" }}>{text}</p>
      </div>
    </div>
  );
}

function ProConGrid({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {/* Pros */}
      <div
        className="rounded-xl p-5"
        style={{ background: "rgba(29,158,117,0.06)", border: "1px solid rgba(29,158,117,0.2)" }}
      >
        <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: "1px solid rgba(29,158,117,0.15)" }}>
          <CheckCircle2 size={16} style={{ color: "#5DCAA5" }} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#5DCAA5", fontFamily: "var(--font-display)" }}>Avantaje</span>
        </div>
        <ul className="space-y-2.5">
          {pros.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.85)" }}>
              <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#1D9E75" }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
      {/* Cons */}
      <div
        className="rounded-xl p-5"
        style={{ background: "rgba(226,75,74,0.05)", border: "1px solid rgba(226,75,74,0.2)" }}
      >
        <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: "1px solid rgba(226,75,74,0.15)" }}>
          <XCircle size={16} style={{ color: "#F09595" }} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#F09595", fontFamily: "var(--font-display)" }}>Dezavantaje</span>
        </div>
        <ul className="space-y-2.5">
          {cons.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.85)" }}>
              <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#E24B4A" }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CompareTable() {
  const typeColor = {
    pos: "#5DCAA5",
    neg: "#F09595",
    mid: "#FAC775",
  };
  return (
    <div className="rounded-2xl overflow-hidden mt-5" style={{ border: "1px solid var(--color-border-dark)" }}>
      {/* Header */}
      <div className="grid grid-cols-[1.8fr_1fr_1fr]" style={{ background: "var(--color-slate-deep)", borderBottom: "1px solid var(--color-border-dark)" }}>
        <div className="px-4 py-3 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-display)" }}>Criteriu</div>
        <div className="px-4 py-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#FAC775", fontFamily: "var(--font-display)" }}>SaaS</div>
        <div className="px-4 py-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#5DCAA5", fontFamily: "var(--font-display)" }}>Custom</div>
      </div>
      {COMPARE_ROWS.map((row, i) => (
        <div
          key={i}
          className="grid grid-cols-[1.8fr_1fr_1fr] transition-colors duration-150 hover:bg-white/[0.02]"
          style={{ borderBottom: i < COMPARE_ROWS.length - 1 ? "1px solid var(--color-border-dark)" : "none" }}
        >
          <div className="px-4 py-3 text-sm font-medium" style={{ color: "var(--color-text-on-dark)", borderRight: "1px solid var(--color-border-dark)" }}>
            {row.label}
          </div>
          <div className="px-4 py-3 text-sm" style={{ color: typeColor[row.saasType], borderRight: "1px solid var(--color-border-dark)" }}>
            {row.saas}
          </div>
          <div className="px-4 py-3 text-sm" style={{ color: typeColor[row.customType] }}>
            {row.custom}
          </div>
        </div>
      ))}
    </div>
  );
}

function SignalItem({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div
      className="flex items-start gap-4 rounded-r-xl p-5 transition-colors duration-200"
      style={{
        background: "var(--color-slate-deep)",
        border: "1px solid var(--color-border-dark)",
        borderLeft: "3px solid #E24B4A",
      }}
    >
      <span
        className="text-xs font-black px-2.5 py-1 rounded flex-shrink-0 mt-0.5"
        style={{
          background: "rgba(226,75,74,0.08)",
          border: "1px solid rgba(226,75,74,0.3)",
          color: "#E24B4A",
          fontFamily: "var(--font-display)",
        }}
      >
        {num}
      </span>
      <div>
        <p className="text-sm font-bold mb-2" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>
          {title}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.8)" }}>{desc}</p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SaasVsCustomPage() {
  return (
    <>
      <ReadingProgress />
      <Navbar />

      <main style={{ background: "var(--color-midnight)", minHeight: "100vh" }}>
        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="relative pt-32 pb-12 px-4 overflow-hidden" style={{ background: "var(--color-midnight)" }}>
          <div className="absolute inset-0 bg-dot-grid opacity-15 pointer-events-none" />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(212,168,67,0.07) 0%, transparent 70%)" }}
          />

          <div className="relative max-w-3xl mx-auto">
            {/* Badge + meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                style={{ background: "rgba(212,168,67,0.1)", border: "1px solid rgba(212,168,67,0.25)", color: "var(--color-gold)" }}
              >
                Strategie Digitală · Software
              </span>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>~7 min citire</span>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                · de <span style={{ color: "rgba(200,215,230,0.7)" }}>Vlad Gheorghe</span> · aiwant.ro
              </span>
            </div>

            {/* H1 */}
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6"
              style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
            >
              Software SaaS vs. Platformă Custom:{" "}
              <span style={{ color: "var(--color-gold)" }}>Care este alegerea</span> care îți va{" "}
              <span
                style={{
                  color: "var(--color-gold)",
                  fontStyle: "italic",
                }}
              >
                scala
              </span>{" "}
              business-ul?
            </h1>

            {/* Intro hook */}
            <blockquote
              className="text-base leading-relaxed pl-5 italic"
              style={{ color: "rgba(180,200,220,0.85)", borderLeft: "3px solid var(--color-gold)" }}
            >
              Nicio companie nu poate crește astăzi fără un stack tehnologic solid. Dar managerii
              sunt bombardați cu mii de aplicații SaaS ieftine — și se lovesc de un{" "}
              <strong style={{ color: "var(--color-gold-light, #F0C060)", fontStyle: "normal" }}>
                zid invizibil
              </strong>{" "}
              în momentul în care procesele lor devin prea complexe pentru uneltele standard.
            </blockquote>
          </div>
        </div>

        {/* ── Article body ────────────────────────────────────────────── */}
        <article id="article-body" className="max-w-3xl mx-auto px-4 pb-24 space-y-12">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm group"
            style={{ color: "var(--color-text-muted)" }}
          >
            <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
            <span className="group-hover:underline">Înapoi la blog</span>
          </Link>

          {/* Intro paragraphs */}
          <div className="space-y-4 text-base leading-relaxed" style={{ color: "rgba(180,200,220,0.85)" }}>
            <p>
              Întrebarea nu este «SaaS sau custom?». Întrebarea corectă este:{" "}
              <strong style={{ color: "white" }}>
                la ce stadiu de creștere se află businessul tău și ce tip de software îl va duce mai departe?
              </strong>
            </p>
            <p>
              Acest articol te ajută să înțelegi exact când un abonament lunar este o economie
              inteligentă — și când devine o barieră în calea scalării reale.
            </p>
          </div>

          {/* Divider */}
          <div className="h-px w-full" style={{ background: "var(--color-border-dark)" }} />

          {/* ── Section 01: SaaS ── */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-display)" }}>Secțiunea 01</span>
              <SectionTag color="amber">SaaS</SectionTag>
            </div>

            <h2
              className="text-2xl sm:text-3xl font-black leading-tight"
              style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
            >
              Soluțiile SaaS — «Călătoria cu Trenul»
            </h2>

            <AnalogyBox
              emoji="🚆"
              title="Analogia"
              text="Urci în tren: ruta, orarul și opririle sunt fixate. Ajungi repede dacă destinația ta coincide cu ruta. Dacă nu — cobori acolo unde îți permite trenul."
            />

            <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.85)" }}>
              Soluțiile SaaS (Software as a Service) sunt aplicații gata construite, accesibile prin
              abonament lunar. Salesforce, Trello, Monday, Notion — le cunoști. Sunt rapide de
              implementat, costă puțin la start și nu ai nevoie de o echipă tehnică internă.
            </p>

            <ProConGrid pros={SAAS_PROS} cons={SAAS_CONS} />
          </section>

          <div className="h-px w-full" style={{ background: "var(--color-border-dark)" }} />

          {/* ── Section 02: Custom ── */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-display)" }}>Secțiunea 02</span>
              <SectionTag color="green">Custom</SectionTag>
            </div>

            <h2
              className="text-2xl sm:text-3xl font-black leading-tight"
              style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
            >
              Software-ul Custom — «Construirea unei mașini de curse»
            </h2>

            <AnalogyBox
              emoji="🏎️"
              title="Analogia"
              text="Construiești vehiculul exact pe specificațiile tale: motor, greutate, aerodinamică — totul optimizat pentru pista ta. Investiție mai mare la start, performanță fără compromis pe termen lung."
            />

            <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.85)" }}>
              O platformă custom este dezvoltată de la zero, exclusiv pe fluxurile și procesele tale
              de lucru. Nu există funcționalități inutile, nu există limitări impuse de un furnizor
              terț. Fiecare modul rezolvă o problemă reală din businessul tău.
            </p>

            <ProConGrid pros={CUSTOM_PROS} cons={CUSTOM_CONS} />
          </section>

          <div className="h-px w-full" style={{ background: "var(--color-border-dark)" }} />

          {/* ── Comparison Table ── */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-display)" }}>Comparație directă</span>
            </div>

            <h2
              className="text-2xl sm:text-3xl font-black leading-tight"
              style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
            >
              SaaS vs. Custom — față în față
            </h2>

            <CompareTable />
          </section>

          <div className="h-px w-full" style={{ background: "var(--color-border-dark)" }} />

          {/* ── Section 03: Tipping Point ── */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-display)" }}>Secțiunea 03</span>
              <SectionTag color="red">Punct de inflexiune</SectionTag>
            </div>

            <h2
              className="text-2xl sm:text-3xl font-black leading-tight"
              style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
            >
              Când să treci la Custom?{" "}
              <span style={{ color: "#F09595" }}>Cele 3 semnale de alarmă</span>
            </h2>

            <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.85)" }}>
              Acesta este momentul decisiv. SaaS-ul a funcționat bine la start — dar există trei
              semnale clare care îți spun că ai depășit limita uneltelor standard și că fiecare zi
              de întârziere te costă eficiență și bani.
            </p>

            <div className="space-y-3">
              {SIGNALS.map((s) => (
                <SignalItem key={s.num} {...s} />
              ))}
            </div>
          </section>

          {/* ── Conclusion ── */}
          <div
            className="rounded-2xl p-7"
            style={{ background: "rgba(212,168,67,0.05)", border: "1px solid rgba(212,168,67,0.18)" }}
          >
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}>
              Concluzie
            </p>
            <p className="text-base leading-relaxed" style={{ color: "rgba(180,200,220,0.85)" }}>
              SaaS este excelent pentru start și pentru nevoi standardizate. Software-ul Custom este
              motorul scalării reale — atunci când procesele tale au depășit ce oferă o soluție
              generică. Nu este o decizie de tip «ori una, ori alta», ci o decizie de moment:{" "}
              <strong style={{ color: "white" }}>
                când crești suficient de mult pentru ca rigiditatea să coste mai mult decât
                investiția într-o platformă construită pe tine.
              </strong>
            </p>
          </div>

          {/* ── CTA ── */}
          <div
            className="relative rounded-2xl overflow-hidden p-8 text-center"
            style={{
              background: "linear-gradient(135deg, var(--color-slate-deep) 0%, rgba(14,29,51,0.9) 100%)",
              border: "1px solid rgba(212,168,67,0.2)",
            }}
          >
            <div
              className="absolute -top-16 -right-16 w-64 h-64 pointer-events-none rounded-full"
              style={{ background: "radial-gradient(circle, rgba(212,168,67,0.12) 0%, transparent 65%)" }}
            />
            <div className="relative">
              <h2
                className="text-2xl font-black mb-3"
                style={{ color: "white", fontFamily: "var(--font-display)" }}
              >
                Nu lăsa o soluție generică să îți limiteze potențialul de creștere.
              </h2>
              <p className="text-sm leading-relaxed mb-7 max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
                Contactează echipa AiWANT pentru o{" "}
                <span style={{ color: "rgba(240,192,106,0.9)" }}>sesiune de consultanță gratuită</span>
                : analizăm procesele tale actuale și îți propunem arhitectura digitală care
                transformă taskurile repetitive în profit real.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105"
                style={{
                  background: "var(--color-gold)",
                  color: "var(--color-midnight)",
                  boxShadow: "0 4px 20px rgba(212,168,67,0.3)",
                }}
              >
                Solicită consultanța gratuită →
              </Link>
            </div>
          </div>

          {/* ── SEO Tags ── */}
          <div className="pt-6" style={{ borderTop: "1px solid var(--color-border-dark)" }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--color-text-muted)" }}>
              Tag-uri
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "software custom vs saas",
                "dezvoltare software personalizat",
                "costuri implementare software",
                "scalabilitatea business-ului",
                "soluții digitale pentru companii",
                "platformă web personalizată",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "var(--color-text-muted)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── Author card ── */}
          <div
            className="flex items-center gap-4 p-5 rounded-2xl"
            style={{ background: "var(--color-slate-deep)", border: "1px solid var(--color-border-dark)" }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0"
              style={{ background: "rgba(212,168,67,0.15)", color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
            >
              V
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--color-text-on-dark)" }}>Vlad Gheorghe</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                Strategic Digital Partner @ AiWANT · aiwant.ro
              </p>
            </div>
          </div>

          {/* Back to blog */}
          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: "var(--color-text-muted)" }}
            >
              <ArrowLeft size={14} />
              Vezi toate articolele
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
