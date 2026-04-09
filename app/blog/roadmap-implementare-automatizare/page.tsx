import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/blog/ReadingProgress";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "De la Haos la Eficiență: Planul în 4 Pași pentru Automatizare | AiWANT",
  description:
    "Roadmap complet de implementare a automatizării în business: audit, arhitectură, pilot și scalare. Treci de la procese manuale la un sistem inteligent fără a întrerupe operațiunile actuale.",
  keywords:
    "implementare automatizare business, proces transformare digitală, pași automatizare fluxuri de lucru, integrare tehnologie în companie, roadmap automatizare",
  openGraph: {
    title: "De la Haos la Eficiență: Planul în 4 Pași pentru Automatizare | AiWANT",
    description:
      "Teama de a rupe procesele care funcționează deja este reală. Dar există un roadmap structurat care minimizează riscul și maximizează câștigurile imediate.",
    type: "article",
    url: "https://aiwant.ro/blog/roadmap-implementare-automatizare",
  },
  alternates: {
    canonical: "https://aiwant.ro/blog/roadmap-implementare-automatizare",
  },
};

// ─── Step color tokens ────────────────────────────────────────────────────────

const STEPS = {
  s1: { color: "#D4A843", bg: "rgba(212,168,67,0.08)",   border: "rgba(212,168,67,0.25)" },
  s2: { color: "#378ADD", bg: "rgba(55,138,221,0.08)",   border: "rgba(55,138,221,0.25)" },
  s3: { color: "#1D9E75", bg: "rgba(29,158,117,0.08)",   border: "rgba(29,158,117,0.25)" },
  s4: { color: "#9F77DD", bg: "rgba(159,119,221,0.08)",  border: "rgba(159,119,221,0.25)" },
} as const;

// ─── Data ─────────────────────────────────────────────────────────────────────

const CRITERIA = [
  {
    num: "Criteriu 01",
    title: "Repetitive și fără logică complexă",
    body: "Task-ul se face la fel, de fiecare dată, fără decizii creative. Introducerea datelor, trimiterea confirmărilor, generarea rapoartelor standard.",
  },
  {
    num: "Criteriu 02",
    title: "Digital — datele există deja",
    body: "Nu automatizezi procese care pornesc de la hârtie. Alegi fluxuri unde informațiile sunt deja în sisteme digitale: email, formulare, baze de date.",
  },
  {
    num: "Criteriu 03",
    title: "Impact mare dacă apare eroarea",
    body: "Unde o greșeală umană costă mai mult decât automatizarea în sine. Facturare incorectă, date de livrare greșite, contracte cu termene expirate.",
  },
];

const AS_IS = [
  "Comanda primită pe WhatsApp / email",
  "Copiată manual în Excel / ERP",
  "Email de confirmare trimis manual",
  "Factură creată și trimisă manual",
  "Follow-up plată verificat manual",
];

const TO_BE = [
  "Comanda capturată automat din orice canal",
  "Înregistrată instant în ERP + CRM",
  "Confirmare trimisă automat în secunde",
  "Factură generată și trimisă automat",
  "Reminder plată trimis la scadență",
];

const SANDBOX = [
  {
    title: "Implementare controlată pe un subset de date",
    desc: "Rulăm noua soluție în paralel cu procesul manual existent timp de 1–2 săptămâni. Comparăm output-urile și identificăm discrepanțele înainte ca acestea să afecteze clienți reali.",
  },
  {
    title: "Stress testing — ce se întâmplă la volume mari?",
    desc: "Testăm comportamentul sistemului cu date incomplete, formate neobișnuite și volume de 10× față de media zilnică. Un sistem care cedează la 200 de comenzi pe zi este mai periculos decât niciun sistem.",
  },
  {
    title: "Feedback loop cu utilizatorii finali",
    desc: "Angajații care vor folosi zilnic sistemul sunt implicați în faza de testare. Sunt cei care vor identifica fricțiunile pe care niciun developer nu le vede din afară — și implicarea lor timpurie elimină rezistența la adoptare.",
  },
  {
    title: "Plan de rollback definit înainte de lansare",
    desc: "Înainte de a pune sistemul în producție, știm exact cum revenim la procesul manual dacă ceva nu funcționează. Nu din pesimism — ci pentru că un plan de retragere clar este singura metodă de a lansa cu adevărat fără frică.",
  },
];

const FLYWHEEL = [
  {
    emoji: "🎯",
    title: "Succes pilot → extindere departamentală",
    body: "Primul pilot demonstrat intern devine argumentul cel mai puternic pentru extindere. Nu ai nevoie de prezentări PowerPoint — ai rezultate reale din propriul business.",
  },
  {
    emoji: "🔄",
    title: "Iterație continuă pe logica de business",
    body: "Procesele se schimbă odată cu businessul. O platformă custom bine arhitecturată poate fi modificată și extinsă fără a reconstrui de la zero — indiferent cum evoluează compania ta.",
  },
  {
    emoji: "📈",
    title: "Monitorizarea ROI-ului real",
    body: "Verificăm trimestrial dacă economiile estimate înainte de implementare s-au realizat. Dacă nu — identificăm blocajele și le rezolvăm. Dacă da — extindem modelul.",
  },
  {
    emoji: "🤖",
    title: "Adăugarea straturilor AI",
    body: "Odată ce infrastructura este stabilă și datele curg corect, poți adăuga straturi de inteligență artificială: predicție cerere, scoring lead-uri, detectarea anomaliilor în timp real.",
  },
];

const SERIES = [
  { num: "Art. 1", title: "5 Task-uri Repetitive care îți «fură» profitul", href: "/blog/taskuri-repetitive-automatizare" },
  { num: "Art. 2", title: "Software SaaS vs. Platformă Custom — care scalează business-ul?", href: "/blog/saas-vs-software-custom" },
  { num: "Art. 3", title: "Cât te costă, de fapt, să NU automatizezi?", href: "/blog/roi-automatizare-procese" },
  { num: "Art. 4", title: "Ești proprietar sau chiriaș în lumea digitală?", href: "/blog/proprietate-digitala-vs-social-media" },
  { num: "Art. 5", title: "De la Haos la Eficiență: Planul în 4 pași — ești aici", href: "/blog/roadmap-implementare-automatizare", active: true },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepBadge({ label, step }: { label: string; step: keyof typeof STEPS }) {
  const s = STEPS[step];
  return (
    <span
      className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full"
      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color, fontFamily: "var(--font-display)" }}
    >
      {label}
    </span>
  );
}

function StepSection({ step, children }: { step: keyof typeof STEPS; children: React.ReactNode }) {
  return (
    <div
      className="pl-5 space-y-5"
      style={{ borderLeft: `2px solid ${STEPS[step].color}` }}
    >
      {children}
    </div>
  );
}

function RoadmapOverview() {
  const items = [
    { step: "s1" as const, num: "Pas 01", label: "Audit", sub: "Low-hanging fruit", href: "#pas1" },
    { step: "s2" as const, num: "Pas 02", label: "Arhitectură", sub: "Blueprint", href: "#pas2" },
    { step: "s3" as const, num: "Pas 03", label: "Pilot", sub: "Sandbox phase", href: "#pas3" },
    { step: "s4" as const, num: "Pas 04", label: "Scalare", sub: "Flywheel effect", href: "#pas4" },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 rounded-2xl overflow-hidden my-8" style={{ border: "1px solid var(--color-border-dark)" }}>
      {items.map((item, i) => (
        <a
          key={item.num}
          href={item.href}
          className="flex flex-col items-center text-center py-5 px-3 transition-colors duration-150 hover:bg-white/[0.03] no-underline"
          style={{ borderRight: i < items.length - 1 ? "1px solid var(--color-border-dark)" : "none", background: "var(--color-slate-deep)" }}
        >
          <StepBadge label={item.num} step={item.step} />
          <span className="mt-2.5 text-xs font-bold" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>{item.label}</span>
          <span className="mt-0.5 text-xs" style={{ color: "var(--color-text-muted)" }}>{item.sub}</span>
        </a>
      ))}
    </div>
  );
}

function CriteriaCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {CRITERIA.map((c, i) => (
        <div key={i} className="rounded-xl p-4 transition-colors duration-150" style={{ background: "var(--color-slate-deep)", border: "1px solid var(--color-border-dark)" }}>
          <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}>{c.num}</span>
          <p className="text-sm font-bold mb-1.5" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>{c.title}</p>
          <p className="text-xs leading-relaxed" style={{ color: "rgba(170,190,210,0.8)" }}>{c.body}</p>
        </div>
      ))}
    </div>
  );
}

function FlowCompare() {
  const FlowItem = ({ label, manual }: { label: string; manual: boolean }) => (
    <div className="flex items-center gap-2 text-sm leading-snug" style={{ color: "rgba(170,190,210,0.85)" }}>
      <span
        className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold flex-shrink-0"
        style={manual
          ? { background: "rgba(226,75,74,0.08)", border: "1px solid rgba(226,75,74,0.3)", color: "#F09595" }
          : { background: "rgba(29,158,117,0.08)", border: "1px solid rgba(29,158,117,0.3)", color: "#5DCAA5" }
        }
      >
        {manual ? "M" : "A"}
      </span>
      {label}
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {/* As-Is */}
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--color-border-dark)" }}>
        <div className="px-4 py-2.5 text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(226,75,74,0.06)", color: "#F09595", fontFamily: "var(--font-display)" }}>
          As-Is — cum este acum
        </div>
        <div className="p-4 space-y-2.5" style={{ background: "var(--color-slate-deep)" }}>
          {AS_IS.map((s, i) => (
            <>
              <FlowItem key={i} label={s} manual={true} />
              {i < AS_IS.length - 1 && <div className="text-center text-xs" style={{ color: "var(--color-text-muted)" }}>↓</div>}
            </>
          ))}
        </div>
      </div>
      {/* To-Be */}
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--color-border-dark)" }}>
        <div className="px-4 py-2.5 text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(29,158,117,0.06)", color: "#5DCAA5", fontFamily: "var(--font-display)" }}>
          To-Be — după automatizare
        </div>
        <div className="p-4 space-y-2.5" style={{ background: "var(--color-slate-deep)" }}>
          {TO_BE.map((s, i) => (
            <>
              <FlowItem key={i} label={s} manual={false} />
              {i < TO_BE.length - 1 && <div className="text-center text-xs" style={{ color: "var(--color-text-muted)" }}>↓</div>}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

function ToolDecision() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="rounded-xl p-4" style={{ background: "var(--color-slate-deep)", border: "1px solid var(--color-border-dark)" }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-3 pb-2.5" style={{ color: "#EF9F27", fontFamily: "var(--font-display)", borderBottom: "1px solid var(--color-border-dark)" }}>Când alegi SaaS</p>
        <p className="text-sm font-bold mb-1.5" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>Procese standard, volum mic</p>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.8)" }}>Procesul este comun industriei, integrările necesare sunt disponibile nativ și nu ai nevoie de logică de business complexă sau proprietară. Start rapid, cost inițial minim.</p>
      </div>
      <div className="rounded-xl p-4" style={{ background: "var(--color-slate-deep)", border: "1px solid var(--color-border-dark)" }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-3 pb-2.5" style={{ color: "#1D9E75", fontFamily: "var(--font-display)", borderBottom: "1px solid var(--color-border-dark)" }}>Când alegi Custom</p>
        <p className="text-sm font-bold mb-1.5" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>Procese unice, scalare planificată</p>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.8)" }}>Procesul te diferențiază pe piață, ai nevoie de integrări specifice sau fluxul tău de lucru nu se potrivește în niciun template standard. Investiție mai mare, control total.</p>
      </div>
    </div>
  );
}

function SandboxChecklist() {
  return (
    <div className="space-y-3">
      {SANDBOX.map((item, i) => (
        <div key={i} className="flex items-start gap-3 rounded-xl p-4 transition-colors duration-150" style={{ background: "var(--color-slate-deep)", border: "1px solid var(--color-border-dark)" }}>
          <div
            className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: "rgba(29,158,117,0.08)", border: "1px solid rgba(29,158,117,0.3)" }}
          >
            <CheckCircle2 size={11} style={{ color: "#1D9E75" }} />
          </div>
          <div>
            <p className="text-sm font-bold mb-1" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>{item.title}</p>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.8)" }}>{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function FlywheelCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {FLYWHEEL.map((card, i) => (
        <div key={i} className="rounded-xl p-4 transition-colors duration-150" style={{ background: "var(--color-slate-deep)", border: "1px solid var(--color-border-dark)" }}>
          <div className="text-2xl mb-2.5">{card.emoji}</div>
          <p className="text-sm font-bold mb-1.5" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>{card.title}</p>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.8)" }}>{card.body}</p>
        </div>
      ))}
    </div>
  );
}

function RoiMonitor() {
  const metrics = [
    { val: "Ore/săpt", label: "economii de timp per proces" },
    { val: "% erori", label: "reducere față de baseline manual" },
    { val: "Luni", label: "până la amortizarea investiției" },
  ];
  return (
    <div className="rounded-xl p-5" style={{ background: "rgba(21,45,69,0.7)", border: "1px solid rgba(35,75,114,0.45)" }}>
      <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}>
        Dashboard de monitorizare ROI — indicatori urmăriți trimestrial
      </p>
      <div className="grid grid-cols-3 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="text-center">
            <span className="text-lg font-black block" style={{ color: "#5DCAA5", fontFamily: "var(--font-display)" }}>{m.val}</span>
            <span className="text-xs mt-1 block" style={{ color: "rgba(255,255,255,0.45)" }}>{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SeriesNav() {
  return (
    <div className="rounded-2xl p-5" style={{ background: "var(--color-slate-deep)", border: "1px solid var(--color-border-dark)" }}>
      <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-display)" }}>
        Seria completă — De la problemă la implementare
      </p>
      <div className="space-y-1">
        {SERIES.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="flex items-center gap-3 py-2.5 text-sm transition-colors duration-150 no-underline"
            style={{
              color: item.active ? "var(--color-gold)" : "rgba(170,190,210,0.8)",
              borderBottom: i < SERIES.length - 1 ? "1px solid var(--color-border-dark)" : "none",
            }}
          >
            <span
              className="text-xs font-bold px-2 py-0.5 rounded flex-shrink-0"
              style={item.active
                ? { background: "rgba(212,168,67,0.1)", border: "1px solid rgba(212,168,67,0.25)", color: "var(--color-gold)", fontFamily: "var(--font-display)" }
                : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--color-text-muted)", fontFamily: "var(--font-display)" }
              }
            >
              {item.num}
            </span>
            <span className={item.active ? "font-semibold" : ""}>{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RoadmapAutomatizarePage() {
  return (
    <>
      <ReadingProgress />
      <Navbar />

      <main style={{ background: "var(--color-midnight)", minHeight: "100vh" }}>
        {/* ── Header ────────────────────────────────────────────────── */}
        <div className="relative pt-32 pb-12 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-dot-grid opacity-15 pointer-events-none" />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(212,168,67,0.07) 0%, transparent 70%)" }}
          />

          <div className="relative max-w-3xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                style={{ background: "rgba(212,168,67,0.1)", border: "1px solid rgba(212,168,67,0.25)", color: "var(--color-gold)" }}
              >
                Ghid · Roadmap Implementare
              </span>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>~9 min citire</span>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                · de <span style={{ color: "rgba(200,215,230,0.7)" }}>Vlad Gheorghe</span> · aiwant.ro
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6"
              style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
            >
              De la Haos la Eficiență:{" "}
              <span style={{ color: "var(--color-gold)" }}>Planul în 4 Pași</span> pentru a
              Automatiza Business-ul Tău
            </h1>

            <blockquote
              className="text-base leading-relaxed pl-5 italic"
              style={{ color: "rgba(180,200,220,0.85)", borderLeft: "3px solid var(--color-gold)" }}
            >
              Toată lumea vorbește despre AI și Automatizare — dar implementarea poate părea o
              operațiune chirurgicală riscantă.{" "}
              <strong style={{ color: "var(--color-gold-light, #F0C060)", fontStyle: "normal" }}>
                Teama de a «rupe» ceea ce funcționează deja, teama de rezistența echipei și lipsa
                unui punct de start clar
              </strong>{" "}
              sunt motivele reale pentru care businessuri care știu că au nevoie de schimbare amână
              luni sau ani de zile.
            </blockquote>
          </div>
        </div>

        {/* ── Article body ────────────────────────────────────────────── */}
        <article id="article-body" className="max-w-3xl mx-auto px-4 pb-24 space-y-12">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm group" style={{ color: "var(--color-text-muted)" }}>
            <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
            <span className="group-hover:underline">Înapoi la blog</span>
          </Link>

          {/* Intro */}
          <div className="space-y-4 text-base leading-relaxed" style={{ color: "rgba(180,200,220,0.85)" }}>
            <p>
              Vestea bună: nu trebuie să schimbi totul deodată. Nu trebuie să întrerupi
              operațiunile și nu trebuie să faci un pariu uriaș cu banii companiei. Există un drum
              structurat, pas cu pas, care minimizează riscurile și generează câștiguri vizibile de
              la primul sprint.
            </p>
            <p>
              Acesta este roadmap-ul pe care îl folosim la AiWANT cu fiecare client —{" "}
              <strong style={{ color: "white" }}>
                de la primul audit de procese până la scalarea completă a ecosistemului digital.
              </strong>
            </p>
          </div>

          <RoadmapOverview />

          <div className="h-px w-full" style={{ background: "var(--color-border-dark)" }} />

          {/* ── Pas 01: Audit ── */}
          <section id="pas1" className="space-y-5 scroll-mt-28">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-display)" }}>Secțiunea 01</span>
              <StepBadge label="Pas 01" step="s1" />
            </div>

            <StepSection step="s1">
              <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>
                Auditul și Identificarea{" "}
                <span style={{ color: "#D4A843" }}>«Low-Hanging Fruit»</span>
              </h2>

              <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.85)" }}>
                Prima greșeală pe care o fac companiile care se apucă de automatizare este să vrea
                să schimbe totul deodată. Aceasta este rețeta pentru haos, costuri mari și echipe
                demotivate. Corect este să începi mic, să câștig rapid și să construiești încredere
                internă.
              </p>

              <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.85)" }}>
                Auditul nu este un proces complicat. Este un exercițiu de onestitate: care sunt
                procesele care se repetă zilnic, care implică transferul de date între sisteme și
                unde o eroare costă cel mai mult?
              </p>

              <CriteriaCards />

              <div
                className="rounded-xl p-5 text-sm leading-relaxed"
                style={{ background: "rgba(212,168,67,0.05)", border: "1px solid rgba(212,168,67,0.18)", color: "rgba(180,200,220,0.85)" }}
              >
                <strong style={{ color: "var(--color-gold)" }}>Obiectivul Pasului 1: </strong>
                Alege un singur proces pilot cu risc mic, dar vizibilitate mare în organizație. Nu
                cel mai complex flux — ci cel care va genera cel mai rapid un «wow» vizibil pentru
                echipă și management. Succesul primului pilot finanțează și justifică pasul următor.
              </div>
            </StepSection>
          </section>

          <div className="h-px w-full" style={{ background: "var(--color-border-dark)" }} />

          {/* ── Pas 02: Arhitectură ── */}
          <section id="pas2" className="space-y-5 scroll-mt-28">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-display)" }}>Secțiunea 02</span>
              <StepBadge label="Pas 02" step="s2" />
            </div>

            <StepSection step="s2">
              <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>
                Proiectarea Arhitecturii —{" "}
                <span style={{ color: "#378ADD" }}>The Blueprint</span>
              </h2>

              <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.85)" }}>
                Înainte de orice cod sau configurare, avem nevoie de logică clară. Cel mai frecvent
                eșec în proiectele de automatizare nu este tehnic — este lipsa unei hărți clare a
                ceea ce vrei să construiești. Definim două stări ale procesului ales.
              </p>

              <FlowCompare />

              <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.85)" }}>
                Cu harta clară, urmează decizia de tool. Aceasta nu este o decizie arbitrară — se
                bazează pe complexitatea procesului, pe nevoile de integrare și pe planul de
                scalare.
              </p>

              <ToolDecision />
            </StepSection>
          </section>

          <div className="h-px w-full" style={{ background: "var(--color-border-dark)" }} />

          {/* ── Pas 03: Pilot ── */}
          <section id="pas3" className="space-y-5 scroll-mt-28">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-display)" }}>Secțiunea 03</span>
              <StepBadge label="Pas 03" step="s3" />
            </div>

            <StepSection step="s3">
              <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>
                Implementarea Pilot și Testarea —{" "}
                <span style={{ color: "#1D9E75" }}>The Sandbox Phase</span>
              </h2>

              <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.85)" }}>
                Niciodată nu lansezi o automatizare direct în producție fără testare. Indiferent
                cât de simplă pare soluția, comportamentul în condiții reale — cu date incomplete,
                volume mari sau utilizatori neobișnuiți cu interfața — este mereu diferit de
                comportamentul în teorie.
              </p>

              <SandboxChecklist />
            </StepSection>
          </section>

          <div className="h-px w-full" style={{ background: "var(--color-border-dark)" }} />

          {/* ── Pas 04: Scalare ── */}
          <section id="pas4" className="space-y-5 scroll-mt-28">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-display)" }}>Secțiunea 04</span>
              <StepBadge label="Pas 04" step="s4" />
            </div>

            <StepSection step="s4">
              <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>
                Scalarea și Optimizarea Continuă —{" "}
                <span style={{ color: "#9F77DD" }}>The Flywheel Effect</span>
              </h2>

              <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.85)" }}>
                Automatizarea nu este un proiect cu termen de finalizare. Este un volant care, odată
                pus în mișcare, se accelerează singur. Fiecare proces automatizat eliberează resurse
                care finanțează automatizarea următorului — și viteza de rotație crește cu fiecare
                ciclu.
              </p>

              <FlywheelCards />
              <RoiMonitor />
            </StepSection>
          </section>

          {/* ── Series nav ── */}
          <SeriesNav />

          {/* ── Conclusion ── */}
          <div className="rounded-2xl p-7" style={{ background: "rgba(212,168,67,0.05)", border: "1px solid rgba(212,168,67,0.18)" }}>
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}>
              Concluzie
            </p>
            <p className="text-base leading-relaxed" style={{ color: "rgba(180,200,220,0.85)" }}>
              Transformarea digitală nu este un salt în necunoscut — este o serie de pași mici,
              bine calculați, fiecare bazat pe succesul celui anterior. Cheia nu este să
              automatizezi totul, ci să știi de unde să începi, cum să testezi fără risc și cum să
              extinzi metodic.{" "}
              <strong style={{ color: "white" }}>
                Roadmap-ul există. Lipsește doar decizia de a-l urma.
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
              <h2 className="text-2xl font-black mb-3" style={{ color: "white", fontFamily: "var(--font-display)" }}>
                Gata să pornești primul tău sprint de automatizare?
              </h2>
              <p className="text-sm leading-relaxed mb-7 max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
                La AiWANT parcurgem împreună toți cei 4 pași: de la{" "}
                <span style={{ color: "rgba(240,192,106,0.9)" }}>auditul proceselor tale actuale</span>
                {" "}până la scalarea completă a ecosistemului digital. Fără haos, fără întreruperea
                operațiunilor, cu rezultate vizibile de la prima iterație.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105"
                style={{ background: "var(--color-gold)", color: "var(--color-midnight)", boxShadow: "0 4px 20px rgba(212,168,67,0.3)" }}
              >
                Solicită auditul gratuit →
              </Link>
            </div>
          </div>

          {/* ── SEO Tags ── */}
          <div className="pt-6" style={{ borderTop: "1px solid var(--color-border-dark)" }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--color-text-muted)" }}>Tag-uri</p>
            <div className="flex flex-wrap gap-2">
              {["implementare automatizare business", "proces transformare digitală", "pași automatizare fluxuri de lucru", "integrare tehnologie în companie", "roadmap automatizare", "platformă web personalizată"].map((tag) => (
                <span key={tag} className="text-xs px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--color-text-muted)" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── Author card ── */}
          <div className="flex items-center gap-4 p-5 rounded-2xl" style={{ background: "var(--color-slate-deep)", border: "1px solid var(--color-border-dark)" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0" style={{ background: "rgba(212,168,67,0.15)", color: "var(--color-gold)", fontFamily: "var(--font-display)" }}>V</div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--color-text-on-dark)" }}>Vlad Gheorghe</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>Strategic Digital Partner @ AiWANT · aiwant.ro</p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--color-text-muted)" }}>
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
