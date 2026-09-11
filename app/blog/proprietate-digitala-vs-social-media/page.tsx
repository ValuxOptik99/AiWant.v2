import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/blog/ReadingProgress";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ești proprietar sau chiriaș în lumea digitală?",
  description:
    "Diferența dintre a exista pe social media și a deține un hub digital propriu. De ce site-ul tău este infrastructură critică, nu cheltuială de marketing.",
  keywords:
    "proprietate digitală business, infrastructură digitală companie, controlul datelor client, integrare software și website, platformă web pentru business",
  openGraph: {
    title: "Ești proprietar sau chiriaș în lumea digitală? | AiWANT",
    description:
      "Multe companii există doar pe Facebook sau Instagram. Dar ce se întâmplă când algoritmul se schimbă sau contul este suspendat? Descoperă de ce ai nevoie de un hub digital propriu.",
    type: "article",
    url: "/blog/proprietate-digitala-vs-social-media",
  },
  alternates: {
    canonical: "/blog/proprietate-digitala-vs-social-media",
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const RISKS = [
  {
    title: "Schimbarea algoritmului",
    body: "Facebook, Instagram și LinkedIn modifică algoritmii de reach organic de mai multe ori pe an. O schimbare poate reduce vizibilitatea cu 60–80% fără nicio notificare prealabilă.",
  },
  {
    title: "Suspendarea contului",
    body: "Conturi cu ani de activitate și mii de urmăritori au fost suspendate din eroare. Recuperarea poate dura luni — timp în care businessul tău digital dispare complet.",
  },
  {
    title: "Pierderea datelor clienților",
    body: "Followerii tăi nu sunt ai tăi. Nu ai accesul la adresele lor de email, la comportamentul de achiziție sau la istoricul interacțiunilor. Platforma deține acele date, nu tu.",
  },
];

const RENT_ITEMS = [
  { text: "Regulile le stabilește platforma, nu tu" },
  { text: "Nu dețidesailul de followeri — sunt datele platformei" },
  { text: "Reach organic depinde de algoritm, nu de munca ta" },
  { text: "Integrarea cu sisteme externe este limitată sau inexistentă" },
  { text: "Contul poate dispărea oricând, din orice motiv" },
];

const OWN_ITEMS = [
  { text: "Tu stabilești UX-ul, regulile și fluxul de navigare" },
  { text: "Dețidesailul datelor clienților: email, comportament, preferințe" },
  { text: "Vizibilitatea este construită prin SEO stabil, nu algoritm" },
  { text: "Integrezi orice sistem: CRM, ERP, booking, facturare" },
  { text: "Platforma ta nu dispare niciodată fără decizia ta" },
];

const HUB_FEATURES = [
  {
    emoji: "📋",
    title: "Formulare inteligente conectate la CRM",
    desc: "Fiecare lead completat pe site ajunge automat în CRM-ul tău, cu scor de calificare, tag-uri automate și notificare pentru echipa de vânzări — fără nicio intervenție manuală.",
  },
  {
    emoji: "🧮",
    title: "Calculatoare interactive de ROI sau preț",
    desc: "Instrumente care educă clientul și colectează lead-uri calificate simultan. Un calculator de preț custom pe site convertește de 3–5× mai bine decât un formular de contact clasic.",
  },
  {
    emoji: "🔐",
    title: "Portale securizate pentru clienți",
    desc: "Zone autentificate unde clienții tăi pot vedea progresul proiectelor, descărca documente, aproba propuneri sau face plăți — eliminând zeci de e-mailuri și apeluri săptămânal.",
  },
  {
    emoji: "🔗",
    title: "Integrări API cu ecosistemul tău",
    desc: "Site-ul tău custom poate vorbi cu orice sistem extern: ERP, platforme de email marketing, sisteme de gestiune stocuri, procesatoare de plăți. Datele curg automat, fără copiere manuală.",
  },
  {
    emoji: "📊",
    title: "Analytics și date în timp real",
    desc: "Spre deosebire de paginile de social media, pe platforma ta proprie ai acces la fiecare click, fiecare drum de navigare, fiecare punct de abandon — și poți acționa pe baza acestor date.",
  },
];

const CHAIN_NODES = [
  { emoji: "📧", label: "Email Marketing", sub: "Mailchimp, SendGrid", hub: false },
  { emoji: "🌐", label: "Platforma ta web", sub: "Hub central", hub: true },
  { emoji: "🏭", label: "ERP / Stocuri", sub: "Gestiune internă", hub: false },
  { emoji: "💳", label: "Plăți & Facturare", sub: "Stripe, Netopia", hub: false },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionTag({ children, color }: { children: React.ReactNode; color: "red" | "gold" | "blue" }) {
  const s = {
    red:  { bg: "rgba(226,75,74,0.08)",   border: "rgba(226,75,74,0.3)",   color: "#F09595" },
    gold: { bg: "rgba(212,168,67,0.07)",  border: "rgba(212,168,67,0.22)", color: "var(--color-gold)" },
    blue: { bg: "rgba(55,138,221,0.08)",  border: "rgba(55,138,221,0.28)", color: "#85B7EB" },
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

function RiskGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
      {RISKS.map((r, i) => (
        <div
          key={i}
          className="rounded-xl p-4"
          style={{ background: "rgba(226,75,74,0.06)", border: "1px solid rgba(226,75,74,0.2)" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#E24B4A" }} />
            <p className="text-xs font-bold" style={{ color: "#F09595", fontFamily: "var(--font-display)" }}>{r.title}</p>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "rgba(240,149,149,0.75)" }}>{r.body}</p>
        </div>
      ))}
    </div>
  );
}

function VsComparison() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--color-border-dark)" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {/* Rent */}
        <div className="p-5" style={{ background: "var(--color-slate-deep)", borderBottom: "1px solid var(--color-border-dark)" }}>
          <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: "1px solid var(--color-border-dark)" }}>
            <span className="text-lg">🏚️</span>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#F09595", fontFamily: "var(--font-display)" }}>
              Social Media = Chirie
            </span>
          </div>
          <ul className="space-y-2.5">
            {RENT_ITEMS.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.8)" }}>
                <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#E24B4A" }} />
                <span dangerouslySetInnerHTML={{ __html: item.text.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--color-text-on-dark)">$1</strong>') }} />
              </li>
            ))}
          </ul>
        </div>

        {/* Own */}
        <div className="p-5" style={{ background: "rgba(21,45,69,0.7)" }}>
          <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: "1px solid rgba(35,75,114,0.4)" }}>
            <span className="text-lg">🏠</span>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#5DCAA5", fontFamily: "var(--font-display)" }}>
              Website propriu = Proprietate
            </span>
          </div>
          <ul className="space-y-2.5">
            {OWN_ITEMS.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.8)" }}>
                <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#1D9E75" }} />
                <span dangerouslySetInnerHTML={{ __html: item.text.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--color-text-on-dark)">$1</strong>') }} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Verdict */}
      <div
        className="px-6 py-4 text-sm leading-relaxed italic"
        style={{
          background: "rgba(212,168,67,0.05)",
          borderTop: "1px solid rgba(212,168,67,0.15)",
          color: "rgba(180,200,220,0.85)",
        }}
      >
        <strong className="not-italic font-bold" style={{ color: "var(--color-gold)" }}>Concluzia secțiunii: </strong>
        Un business solid are nevoie de o «acasă» digitală pe care nimeni nu o poate dărâma peste capul lui. Social media este excelentă ca amplificator — dar niciodată ca fundație.
      </div>
    </div>
  );
}

function HubFeatureList() {
  return (
    <div className="space-y-3">
      {HUB_FEATURES.map((f, i) => (
        <div
          key={i}
          className="flex items-start gap-4 rounded-r-xl p-5 transition-colors duration-200"
          style={{
            background: "var(--color-slate-deep)",
            border: "1px solid var(--color-border-dark)",
            borderLeft: "3px solid var(--color-gold)",
          }}
        >
          <span className="text-xl flex-shrink-0 mt-0.5">{f.emoji}</span>
          <div>
            <p className="text-sm font-bold mb-1.5" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>
              {f.title}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.8)" }}>{f.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function IntegrationChain() {
  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col sm:flex-row my-5"
      style={{ background: "var(--color-slate-deep)", border: "1px solid var(--color-border-dark)" }}
    >
      {CHAIN_NODES.map((node, i) => (
        <>
          <div
            key={node.label}
            className="flex-1 flex flex-col items-center justify-center p-4 text-center"
            style={{
              background: node.hub ? "rgba(35,75,114,0.25)" : "transparent",
              borderRight: i < CHAIN_NODES.length - 1 ? "1px solid var(--color-border-dark)" : "none",
            }}
          >
            <div className="text-2xl mb-2">{node.emoji}</div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-1"
              style={{ color: node.hub ? "var(--color-gold)" : "var(--color-text-muted)", fontFamily: "var(--font-display)" }}
            >
              {node.label}
            </p>
            <p className="text-xs" style={{ color: "rgba(170,190,210,0.6)" }}>{node.sub}</p>
          </div>
          {i < CHAIN_NODES.length - 1 && (
            <div
              key={`arrow-${i}`}
              className="flex items-center justify-center sm:w-8 py-2 sm:py-0"
              style={{ color: "var(--color-text-muted)", fontSize: "12px" }}
            >
              →
            </div>
          )}
        </>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProprietateDigitalaPage() {
  return (
    <>
      <ReadingProgress />
      <Navbar />

      <main style={{ background: "var(--color-midnight)", minHeight: "100vh" }}>
        {/* ── Header ──────────────────────────────────────────────────── */}
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
                Infrastructură Digitală · Strategie
              </span>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>~7 min citire</span>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                · de <span style={{ color: "rgba(200,215,230,0.7)" }}>Vlad Gheorghe</span> · aiwant.ro
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6"
              style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
            >
              Ești proprietar sau{" "}
              <span
                style={{
                  color: "#F09595",
                  textDecoration: "underline",
                  textDecorationStyle: "wavy",
                  textDecorationColor: "rgba(226,75,74,0.5)",
                  textUnderlineOffset: "6px",
                }}
              >
                chiriaș
              </span>{" "}
              în lumea{" "}
              <span style={{ color: "var(--color-gold)" }}>digitală?</span>
            </h1>

            <blockquote
              className="text-base leading-relaxed pl-5 italic"
              style={{ color: "rgba(180,200,220,0.85)", borderLeft: "3px solid var(--color-gold)" }}
            >
              Multe companii moderne există doar pe Facebook, Instagram sau LinkedIn. Par că au
              prezență digitală, dar de fapt{" "}
              <strong style={{ color: "var(--color-gold-light, #F0C060)", fontStyle: "normal" }}>
                închiriază spațiu pe terenul altcuiva
              </strong>{" "}
              — și plătesc chiria cu atenția, datele și dependența față de regulile unui terț pe
              care nu îl controlează nimeni.
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
              Ce se întâmplă dacă algoritmul se schimbă peste noapte și reach-ul tău organic cade
              cu 80%? Dacă contul este suspendat din greșeală — și echipa de suport a platformei nu
              răspunde în 3 săptămâni? Dacă platforma decide să îți limiteze accesul la datele
              clienților tăi?
            </p>
            <p>
              Acest articol explică de ce un website propriu nu este o cheltuială de marketing, ci o{" "}
              <strong style={{ color: "white" }}>
                investiție în infrastructură critică și control operațional
              </strong>{" "}
              — fundația pe care construiești automatizarea, datele și creșterea businessului tău.
            </p>
          </div>

          <div className="h-px w-full" style={{ background: "var(--color-border-dark)" }} />

          {/* ── Section 01: Risks ── */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-display)" }}>Secțiunea 01</span>
              <SectionTag color="red">Proprietate vs. Chirie</SectionTag>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>
              Cele 3 riscuri reale ale existenței{" "}
              <span style={{ color: "#F09595" }}>doar pe Social Media</span>
            </h2>

            <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.85)" }}>
              Înainte să vorbim despre ce câștigi prin proprietate digitală, trebuie să înțelegi ce
              riști concret în fiecare zi în care businessul tău trăiește exclusiv pe platformele
              altora.
            </p>

            <RiskGrid />

            <h2 className="text-xl sm:text-2xl font-black leading-tight pt-2" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>
              Social Media vs. Website propriu — față în față
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.85)" }}>
              Diferența fundamentală nu este despre estetică sau trafic. Este despre cine
              controlează regulile, datele și viitorul prezenței tale digitale.
            </p>

            <VsComparison />
          </section>

          <div className="h-px w-full" style={{ background: "var(--color-border-dark)" }} />

          {/* ── Section 02: Hub ── */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-display)" }}>Secțiunea 02</span>
              <SectionTag color="gold">Hub de Automatizare</SectionTag>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>
              Site-ul ca platformă de automatizare —{" "}
              <span style={{ color: "var(--color-gold)" }}>nu doar vitrină</span>
            </h2>

            <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.85)" }}>
              Platforma ta socială nu poate integra un CRM complex, un configurator de produse sau
              un dashboard de date în timp real. Un website propriu, construit corect, devine{" "}
              <strong style={{ color: "white" }}>
                centrul de comandă al întregului tău ecosistem digital.
              </strong>
            </p>

            <HubFeatureList />

            {/* CTA note */}
            <div
              className="rounded-xl p-5 text-sm leading-relaxed"
              style={{ background: "rgba(21,45,69,0.7)", border: "1px solid rgba(35,75,114,0.45)", color: "rgba(255,255,255,0.62)" }}
            >
              <strong style={{ color: "var(--color-gold-light, #F0C060)", fontWeight: 500 }}>Ideea principală AiWANT: </strong>
              Site-ul tău este «materia primă» pe care tehnologia și automatizarea o transformă în
              profit. Un site de prezentare este un cost. O platformă web custom este un activ care
              lucrează pentru tine 24/7.
            </div>
          </section>

          <div className="h-px w-full" style={{ background: "var(--color-border-dark)" }} />

          {/* ── Section 03: Data ── */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-display)" }}>Secțiunea 03</span>
              <SectionTag color="blue">Date & Scalabilitate</SectionTag>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black leading-tight" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>
              Controlul datelor și scalabilitatea —{" "}
              <span style={{ color: "#85B7EB" }}>avantajul pe care nu îl poți construi pe terenul altcuiva</span>
            </h2>

            <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.85)" }}>
              Trăim în zorii erei post-cookie. Platformele third-party restricționează tot mai
              agresiv accesul la datele de comportament ale utilizatorilor. Singura sursă de date
              care va rămâne intactă este cea colectată pe platforma ta proprie.
            </p>

            {/* Data cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl p-5" style={{ background: "var(--color-slate-deep)", border: "1px solid var(--color-border-dark)" }}>
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-3 pb-2.5"
                  style={{ color: "#1D9E75", fontFamily: "var(--font-display)", borderBottom: "1px solid var(--color-border-dark)" }}
                >
                  First-party data
                </p>
                <p className="text-sm font-bold mb-2" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>
                  Date colectate direct, deținute de tine
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.8)" }}>
                  Email-uri, comportament de navigare, preferințe de produs, istoricul achizițiilor — colectate cu consimțământ pe platforma ta. Nimeni nu ți le poate lua și nu se supun restricțiilor cookie de la terți.
                </p>
              </div>
              <div className="rounded-xl p-5" style={{ background: "var(--color-slate-deep)", border: "1px solid var(--color-border-dark)" }}>
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-3 pb-2.5"
                  style={{ color: "#E24B4A", fontFamily: "var(--font-display)", borderBottom: "1px solid var(--color-border-dark)" }}
                >
                  Third-party data
                </p>
                <p className="text-sm font-bold mb-2" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>
                  Date împrumutate, pe termen limitat
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.8)" }}>
                  Datele de targeting de pe Facebook sau Google se reduc constant prin legislație (GDPR), politici de browser și decizii corporate. Businessul bazat pe ele construiește pe nisip.
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.85)" }}>
              Un ecosistem digital funcțional nu este o colecție de aplicații separate. Este un lanț
              integrat în care fiecare componentă comunică cu celelalte — iar hub-ul central este
              platforma ta web.
            </p>

            <IntegrationChain />

            <p className="text-sm leading-relaxed" style={{ color: "rgba(170,190,210,0.85)" }}>
              Fără o platformă web controlată, aceste conexiuni sunt imposibile sau extrem de
              costisitoare. Cu ea, fiecare sistem alimentează celelalte cu date în timp real — și tu
              ai o imagine completă, nu un puzzle de aplicații disparate.
            </p>
          </section>

          {/* ── Conclusion ── */}
          <div className="rounded-2xl p-7" style={{ background: "rgba(212,168,67,0.05)", border: "1px solid rgba(212,168,67,0.18)" }}>
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}>
              Concluzie
            </p>
            <p className="text-base leading-relaxed" style={{ color: "rgba(180,200,220,0.85)" }}>
              Nu te mulțumi cu o prezență digitală fragilă construită pe terenul altcuiva. Fiecare
              zi petrecută exclusiv pe social media este o zi în care nu îți construiești un activ
              propriu, nu colectezi date care îți aparțin și nu creezi infrastructura pe care să pui
              straturi de automatizare și AI.{" "}
              <strong style={{ color: "white" }}>
                Proprietatea digitală nu este o opțiune de lux — este fundația oricărui business
                care vrea să crească controlat și sustenabil.
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
                Ai nevoie de mai mult decât o simplă pagină web?
              </h2>
              <p className="text-sm leading-relaxed mb-7 max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
                Contactează AiWANT pentru a transforma site-ul tău dintr-o simplă vitrină{" "}
                <span style={{ color: "rgba(240,192,106,0.9)" }}>într-un motor de business automatizat</span>
                . Construim platforme custom care funcționează pentru tine, nu doar pentru a fi văzute.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105"
                style={{ background: "var(--color-gold)", color: "var(--color-midnight)", boxShadow: "0 4px 20px rgba(212,168,67,0.3)" }}
              >
                Discută cu AiWANT →
              </Link>
            </div>
          </div>

          {/* ── SEO Tags ── */}
          <div className="pt-6" style={{ borderTop: "1px solid var(--color-border-dark)" }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--color-text-muted)" }}>Tag-uri</p>
            <div className="flex flex-wrap gap-2">
              {["proprietate digitală business", "infrastructură digitală companie", "controlul datelor client", "integrare software și website", "platformă web pentru business", "first-party data"].map((tag) => (
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
