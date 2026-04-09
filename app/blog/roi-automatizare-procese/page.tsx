import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/blog/ReadingProgress";
import RoiCalculator from "@/components/blog/RoiCalculator";
import Link from "next/link";
import { ArrowLeft, TrendingDown, TrendingUp, BarChart3, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cât te costă să NU automatizezi? Calculul ascuns al ineficienței | AiWANT",
  description:
    "Descoperă costurile invizibile ale proceselor manuale și cum să calculezi ROI-ul unui proiect de automatizare. Exemplu concret cu cifre reale.",
  keywords:
    "calcul ROI automatizare, cost erori umane business, eficienta operativa companii, economii prin software custom, reducerea costurilor operaționale",
  openGraph: {
    title: "Cât te costă să NU automatizezi? Calculul ascuns al ineficienței | AiWANT",
    description:
      "Procesele manuale par gratuite pentru că plătești deja salariul. Dar sunt cea mai scumpă metodă de operare. Află cum să calculezi punctul de rentabilitate al automatizării.",
    type: "article",
    url: "https://aiwant.ro/blog/roi-automatizare-procese",
  },
  alternates: {
    canonical: "https://aiwant.ro/blog/roi-automatizare-procese",
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const ICEBERG_VISIBLE = [
  { title: "Salariul angajatului", desc: "care execută task-ul manual în fiecare zi" },
  { title: "Costul licențelor", desc: "software existente — tools parțial utilizate" },
];

const ICEBERG_HIDDEN = [
  {
    title: "Eroarea umană",
    desc: "O cifră greșită într-o factură sau contract generează costuri de recuperare, penalități și, cel mai grav, pierderea încrederii clientului.",
  },
  {
    title: "Costul oportunității",
    desc: "Dacă expertul tău de vânzări petrece 2 ore/zi introducând date în CRM, câte apeluri de vânzare nu a mai făcut? Câtă pipeline nu a generat?",
  },
  {
    title: "Context switching",
    desc: "Trecerea repetată între task-uri administrative și muncă strategică nu este «gratuită» — studiile arată că refocalizarea după o întrerupere durează 23 de minute.",
  },
];

const FORMULA_STEPS = [
  {
    num: "Pas 01",
    title: "Identifică procesul concret",
    desc: "Alege un singur flux de lucru repetitiv: procesarea comenzilor, introducerea datelor din facturi, trimiterea confirmărilor, raportarea lunară. Fii specific — nu «administrație», ci «procesarea comenzilor primite pe WhatsApp».",
  },
  {
    num: "Pas 02",
    title: "Calculează costul actual: ore × cost orar",
    desc: "Numărul de ore pe săptămână alocate procesului, înmulțit cu costul orar al angajatului (salariu brut ÷ ore lucrate/lună). Adaugă 30% pentru beneficii și overhead. Aceasta este pierderea ta săptămânală reală.",
  },
  {
    num: "Pas 03",
    title: "Estimează reducerea după automatizare",
    desc: "O soluție custom bine implementată reduce un proces repetitiv cu 80–95%. Calculează costul rezidual al supravegherii umane (validare, excepții) și compară cu investiția inițială în platformă.",
  },
];

const CASE_ROWS = [
  { label: "Timp/săptămână", before: "10 ore", after: "30 minute", diff: "−9,5 ore" },
  { label: "Cost săptămânal", before: "450 RON", after: "22,5 RON", diff: "−427,5 RON" },
  { label: "Cost lunar", before: "1.800 RON", after: "90 RON", diff: "−1.710 RON" },
  { label: "Cost anual", before: "21.600 RON", after: "1.080 RON", diff: "−20.520 RON" },
];

const QUAL_CARDS = [
  {
    emoji: "📈",
    title: "Scalabilitate fără angajări masive",
    body: "Poți crește volumul de la 100 la 1.000 de comenzi fără să dublezi echipa administrativă. Software-ul scalează, oamenii se concentrează pe creștere.",
  },
  {
    emoji: "🎯",
    title: "Standardizarea calității",
    body: "Software-ul nu obosește, nu uită și nu face greșeli de tastare la sfârșitul zilei. Fiecare proces se execută la fel de corect la a 1.000-a comandă ca la prima.",
  },
  {
    emoji: "📊",
    title: "Decizii bazate pe date reale",
    body: "Automatizarea îți oferă date în timp real pe care un proces manual nu le poate genera niciodată la aceeași viteză. Decizii mai bune, mai rapide, mai profitabile.",
  },
  {
    emoji: "🔒",
    title: "Avantaj competitiv durabil",
    body: "Procesele automatizate devin parte din ADN-ul operațional al companiei — greu de copiat, ușor de îmbunătățit iterativ odată cu creșterea businessului.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionTag({ children, color }: { children: React.ReactNode; color: "red" | "green" | "blue" }) {
  const s = {
    red:   { bg: "rgba(226,75,74,0.08)",   border: "rgba(226,75,74,0.3)",   color: "#F09595" },
    green: { bg: "rgba(29,158,117,0.08)",  border: "rgba(29,158,117,0.3)",  color: "#5DCAA5" },
    blue:  { bg: "rgba(55,138,221,0.08)",  border: "rgba(55,138,221,0.28)", color: "#85B7EB" },
  }[color];
  return (
    <span
      className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded"
      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color, fontFamily: "var(--font-display)" }}
    >
      {children}
    </span>
  );
}

function IcebergSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Visible */}
      <div className="rounded-xl p-5" style={{ background: "var(--color-slate-deep)", border: "1px solid var(--color-border-dark)" }}>
        <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: "1px solid var(--color-border-dark)" }}>
          <span className="text-sm">▲</span>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#EF9F27", fontFamily: "var(--font-display)" }}>
            Deasupra apei — vizibil
          </span>
        </div>
        <ul className="space-y-3">
          {ICEBERG_VISIBLE.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#EF9F27" }} />
              <div style={{ color: "rgba(170,190,210,0.85)" }}>
                <strong className="block text-xs mb-0.5" style={{ color: "var(--color-text-on-dark)" }}>{item.title}</strong>
                {item.desc}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Hidden */}
      <div
        className="rounded-xl p-5"
        style={{ background: "rgba(21,45,69,0.7)", border: "1px solid rgba(35,75,114,0.5)" }}
      >
        <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: "1px solid rgba(35,75,114,0.4)" }}>
          <span className="text-sm">▼</span>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-gold-light, #F0C060)", fontFamily: "var(--font-display)" }}>
            Sub apă — invizibil
          </span>
        </div>
        <ul className="space-y-4">
          {ICEBERG_HIDDEN.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "var(--color-gold)" }} />
              <div style={{ color: "rgba(170,190,210,0.85)" }}>
                <strong className="block text-xs mb-0.5" style={{ color: "var(--color-text-on-dark)" }}>{item.title}</strong>
                {item.desc}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FormulaStep({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div
      className="flex items-start gap-4 rounded-xl p-5 transition-colors duration-200"
      style={{ background: "var(--color-slate-deep)", border: "1px solid var(--color-border-dark)" }}
    >
      <span
        className="text-xs font-black px-2.5 py-1 rounded flex-shrink-0 mt-0.5"
        style={{
          background: "rgba(212,168,67,0.08)",
          border: "1px solid rgba(212,168,67,0.22)",
          color: "var(--color-gold)",
          fontFamily: "var(--font-display)",
        }}
      >
        {num}
      </span>
      <div>
        <p className="text-sm font-bold mb-1.5" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>
          {title}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.8)" }}>{desc}</p>
      </div>
    </div>
  );
}

function CaseStudyTable() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--color-border-dark)" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3" style={{ background: "var(--color-slate-deep)", borderBottom: "1px solid var(--color-border-dark)" }}>
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}>
          Mini Case Study
        </span>
        <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Procesarea comenzilor — exemplu real</span>
      </div>

      {/* Column headers */}
      <div
        className="grid grid-cols-4 text-xs font-bold uppercase tracking-widest"
        style={{ background: "rgba(21,34,47,0.8)", borderBottom: "1px solid var(--color-border-dark)", fontFamily: "var(--font-display)" }}
      >
        <div className="px-4 py-2.5" style={{ color: "var(--color-text-muted)", borderRight: "1px solid var(--color-border-dark)" }}>Indicator</div>
        <div className="px-4 py-2.5" style={{ color: "#F09595", borderRight: "1px solid var(--color-border-dark)" }}>Înainte</div>
        <div className="px-4 py-2.5" style={{ color: "#5DCAA5", borderRight: "1px solid var(--color-border-dark)" }}>După automatizare</div>
        <div className="px-4 py-2.5" style={{ color: "var(--color-gold)" }}>Diferența</div>
      </div>

      {/* Rows */}
      {CASE_ROWS.map((row, i) => (
        <div
          key={i}
          className="grid grid-cols-4 text-sm transition-colors duration-150 hover:bg-white/[0.02]"
          style={{ borderBottom: i < CASE_ROWS.length - 1 ? "1px solid var(--color-border-dark)" : "none" }}
        >
          <div className="px-4 py-3 font-medium" style={{ color: "var(--color-text-on-dark)", borderRight: "1px solid var(--color-border-dark)" }}>{row.label}</div>
          <div className="px-4 py-3 font-medium" style={{ color: "#F09595", borderRight: "1px solid var(--color-border-dark)" }}>{row.before}</div>
          <div className="px-4 py-3 font-medium" style={{ color: "#5DCAA5", borderRight: "1px solid var(--color-border-dark)" }}>{row.after}</div>
          <div className="px-4 py-3 font-semibold" style={{ color: "var(--color-gold)" }}>{row.diff}</div>
        </div>
      ))}

      {/* Conclusion */}
      <div
        className="px-5 py-4 text-sm leading-relaxed"
        style={{ background: "rgba(29,158,117,0.06)", borderTop: "1px solid rgba(29,158,117,0.2)", color: "#5DCAA5" }}
      >
        <strong className="font-bold">Punctul de rentabilitate: </strong>
        O platformă custom de procesare comenzi cu investiție de 15.000 RON se amortizează în mai puțin de 9 luni și generează economii nete de peste 20.000 RON/an începând cu anul 2 — fără să pui la socoteală erorile eliminate și viteza crescută.
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RoiAutomatizarePage() {
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
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                style={{ background: "rgba(212,168,67,0.1)", border: "1px solid rgba(212,168,67,0.25)", color: "var(--color-gold)" }}
              >
                ROI · Eficiență Operațională
              </span>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>~8 min citire</span>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                · de <span style={{ color: "rgba(200,215,230,0.7)" }}>Vlad Gheorghe</span> · aiwant.ro
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6"
              style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
            >
              Cât te costă, de fapt, să{" "}
              <span
                style={{
                  color: "#F09595",
                  textDecoration: "underline",
                  textDecorationStyle: "wavy",
                  textDecorationColor: "rgba(226,75,74,0.5)",
                  textUnderlineOffset: "6px",
                }}
              >
                NU
              </span>{" "}
              automatizezi?{" "}
              <span style={{ color: "var(--color-gold)" }}>Calculul ascuns al ineficienței.</span>
            </h1>

            <blockquote
              className="text-base leading-relaxed pl-5 italic"
              style={{ color: "rgba(180,200,220,0.85)", borderLeft: "3px solid var(--color-gold)" }}
            >
              Mulți manageri văd software-ul și automatizarea ca pe o cheltuială de capital. Dar
              există un cost mult mai mare, pe care nu îl vezi în niciun raport:{" "}
              <strong style={{ color: "var(--color-gold-light, #F0C060)", fontStyle: "normal" }}>
                costul ascuns al «status quo-ului».
              </strong>{" "}
              Să faci același lucru manual în fiecare zi pare «gratuit» — pentru că plătești deja
              salariul angajatului. În realitate, este cea mai scumpă metodă de operare.
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
              În acest articol descifrăm împreună cum să calculezi dacă un proiect de automatizare
              se plătește singur, în cât timp ajungi la punctul de rentabilitate și — la fel de
              important —{" "}
              <strong style={{ color: "white" }}>
                ce valoare adăugată vine dincolo de economiile directe în bani.
              </strong>
            </p>
            <p>
              Nu ai nevoie de un departament de analiză financiară. Ai nevoie de trei cifre și de
              onestitate față de cum funcționează procesele tale acum.
            </p>
          </div>

          <div className="h-px w-full" style={{ background: "var(--color-border-dark)" }} />

          {/* ── Section 01: Iceberg ── */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-display)" }}>Secțiunea 01</span>
              <SectionTag color="red">Costurile ascunse</SectionTag>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>
              Teoria Aisbergului —{" "}
              <span style={{ color: "#FAC775" }}>Costul Vizibil</span> vs.{" "}
              <span style={{ color: "var(--color-gold)" }}>Costul Invizibil</span>
            </h2>

            <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.85)" }}>
              Când te gândești la costul unui proces manual, vezi vârful aisbergului. Salariul
              angajatului, licența unui software — acestea apar în buget. Dar masa uriașă sub apă
              este invizibilă, și este de obicei de câteva ori mai mare.
            </p>

            <IcebergSection />
          </section>

          <div className="h-px w-full" style={{ background: "var(--color-border-dark)" }} />

          {/* ── Section 02: Formula ROI ── */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-display)" }}>Secțiunea 02</span>
              <SectionTag color="green">Formula ROI</SectionTag>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>
              Cum calculezi ROI-ul unei automatizări în{" "}
              <span style={{ color: "#5DCAA5" }}>3 pași simpli</span>
            </h2>

            <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.85)" }}>
              Nu ai nevoie de un PhD în matematică. Ai nevoie de trei cifre pe care le știi deja și
              de 10 minute de onestitate față de realitatea proceselor tale.
            </p>

            <div className="space-y-3">
              {FORMULA_STEPS.map((s) => (
                <FormulaStep key={s.num} {...s} />
              ))}
            </div>

            {/* Interactive calculator */}
            <RoiCalculator />

            {/* Case study */}
            <CaseStudyTable />
          </section>

          <div className="h-px w-full" style={{ background: "var(--color-border-dark)" }} />

          {/* ── Section 03: Qualitative ROI ── */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-display)" }}>Secțiunea 03</span>
              <SectionTag color="blue">Valoare Adăugată</SectionTag>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>
              Dincolo de bani — ROI-ul{" "}
              <span style={{ color: "#85B7EB" }}>Calitativ</span> al Automatizării
            </h2>

            <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.85)" }}>
              Banii economisiți sunt importanți. Dar automatizarea aduce și ceva ce nu apare în
              nicio foaie de calcul: capacitatea de a scala fără stres, fără angajări masive și
              fără degradarea calității.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {QUAL_CARDS.map((card, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5 transition-colors duration-200"
                  style={{ background: "var(--color-slate-deep)", border: "1px solid var(--color-border-dark)" }}
                >
                  <div className="text-2xl mb-3">{card.emoji}</div>
                  <p className="text-sm font-bold mb-2" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>
                    {card.title}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.8)" }}>{card.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Conclusion ── */}
          <div className="rounded-2xl p-7" style={{ background: "rgba(212,168,67,0.05)", border: "1px solid rgba(212,168,67,0.18)" }}>
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}>
              Concluzie
            </p>
            <p className="text-base leading-relaxed" style={{ color: "rgba(180,200,220,0.85)" }}>
              Automatizarea nu este un lux pentru companiile mari. Este o necesitate pentru orice
              business care vrea să rămână competitiv și profitabil. Dacă pierzi timp pe task-uri
              repetitive, pierzi bani —{" "}
              <strong style={{ color: "white" }}>
                bani pe care nu îi vezi în nicio linie de buget, dar pe care îi simți în lipsa de
                creștere și în epuizarea echipei tale.
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
                Nu lăsa profitul să se scurgă prin procesele tale neautomatizate.
              </h2>
              <p className="text-sm leading-relaxed mb-7 max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
                Solicită un{" "}
                <span style={{ color: "rgba(240,192,106,0.9)" }}>Audit de Eficiență la AiWANT</span>
                : analizăm fluxurile tale actuale, calculăm potențialul real de economisire și îți
                propunem arhitectura digitală care transformă taskurile repetitive în profit direct.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105"
                style={{ background: "var(--color-gold)", color: "var(--color-midnight)", boxShadow: "0 4px 20px rgba(212,168,67,0.3)" }}
              >
                Solicită Auditul de Eficiență →
              </Link>
            </div>
          </div>

          {/* ── SEO Tags ── */}
          <div className="pt-6" style={{ borderTop: "1px solid var(--color-border-dark)" }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--color-text-muted)" }}>Tag-uri</p>
            <div className="flex flex-wrap gap-2">
              {["calcul ROI automatizare", "cost erori umane business", "eficienta operativa companii", "economii prin software custom", "reducerea costurilor operationale", "platforma web personalizata"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--color-text-muted)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── Author card ── */}
          <div className="flex items-center gap-4 p-5 rounded-2xl" style={{ background: "var(--color-slate-deep)", border: "1px solid var(--color-border-dark)" }}>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0"
              style={{ background: "rgba(212,168,67,0.15)", color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
            >
              V
            </div>
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
