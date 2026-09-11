import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/blog/ReadingProgress";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "5 Task-uri Repetitive care îți «fură» Profitul | Automatizare Business",
  description:
    "Descoperi care sunt cele 5 taskuri repetitive care îți consumă profitul invizibil și cum o platformă custom de la Aiwant le elimină prin automatizare.",
  keywords:
    "automatizare procese business, reducerea costurilor operaționale, taskuri repetitive, eficiență în companie, dezvoltare software custom",
  openGraph: {
    title: "5 Task-uri Repetitive care îți «fură» Profitul | AiWANT",
    description:
      "Costul de oportunitate al muncii manuale este invizibil — până îl calculezi. Descoperă cum să elimini cei mai mari consumatori de timp din businessul tău.",
    type: "article",
    url: "/blog/taskuri-repetitive-automatizare",
  },
  alternates: {
    canonical: "/blog/taskuri-repetitive-automatizare",
  },
};

// ─── Task card data ────────────────────────────────────────────────────────────
const TASKS = [
  {
    num: "01",
    title: "Introducerea manuală a datelor (Data Entry)",
    desc: "Copiezi informații din facturi, e-mailuri sau formulare în baze de date ori Excel? Fiecare ciclu durează minute. Înmulțit cu zeci de intrări pe zi, vorbim despre ore pierdute săptămânal — ore plătite direct din profitul tău.",
    risk: "O singură cifră greșită introdusă manual poate genera erori în rapoarte, facturi incorecte sau decizii financiare bazate pe date false. Eroarea umană în data entry depășește 1% la volume mari — suficient să coste scump.",
    tech: "Un sistem cu OCR (recunoaștere optică a caracterelor) extrage automat datele din documente și le introduce direct într-o bază de date centralizată. Zero copy-paste, zero erori de tastare.",
  },
  {
    num: "02",
    title: "Gestionarea și raportarea vânzărilor / stocurilor",
    desc: "Verifici manual stocurile sau agregezi vânzările zilnice din mai multe surse pentru raportul de final de lună? Procesul poate dura ore, iar datele sunt deja depășite în momentul în care le citești.",
    risk: "Deciziile de business luate pe date vechi de 24–48 de ore pot însemna stoc epuizat, comenzi ratate sau capitalizare greșită a unui trend de vânzări în creștere.",
    tech: "Un dashboard custom conectat prin API la toate sursele tale — ERP, platforme eCommerce, POS — cu grafice live și alerte automate când un KPI iese din parametri.",
  },
  {
    num: "03",
    title: "Programarea și confirmarea întâlnirilor / comenzilor",
    desc: "Trimiți manual e-mailuri de confirmare, setezi întâlniri pe calendare diferite sau procesezi comenzi primite prin WhatsApp și e-mail? Fiecare pas manual introduce întârzieri și riscul de a pierde clienți în flux.",
    risk: "Un client care nu primește confirmare în câteva minute percepe lipsă de profesionalism. Dubla programare sau comenzile omise sunt costuri directe și reputaționale greu de recuperat.",
    tech: "Un portal de clienți sau un sistem de booking automatizat care trimite notificări instant, actualizează calendarele și procesează comenzile fără nicio intervenție umană.",
  },
  {
    num: "04",
    title: "Facturarea și urmărirea plăților (Follow-up)",
    desc: "Verifici manual cine a plătit și trimiți e-mailuri de întârziere? Când ai zeci de clienți activi, acest proces devine o sursă constantă de stres și un risc serios de cash flow.",
    risk: "O factură uitată sau urmărită cu întârziere înseamnă cash flow deficitar. La scară, lipsa unui sistem clar de follow-up poate bloca lichiditatea companiei în perioade critice.",
    tech: "Integrarea modulului de facturare cu sistemul de management: statusul se schimbă automat în «Plătit» la confirmare, iar reminder-ele sunt trimise la intervalele setate, fără intervenție umană.",
  },
  {
    num: "05",
    title: "Gestionarea documentelor interne",
    desc: "Cauți contracte vechi prin foldere de e-mail sau drive-uri neorganizate? Sau, mai rău, nu ești sigur dacă documentul găsit este versiunea actualizată sau una expirată?",
    risk: "Utilizarea unui document expirat (contract, procedură internă, ofertă de preț) poate genera erori juridice, financiare sau de conformitate. Timpul de căutare se traduce direct în cost de personal.",
    tech: "O platformă internă (Document Management System) cu căutare inteligentă full-text, control de versiuni și permisiuni pe roluri. Documentul corect, mereu la un clic distanță.",
  },
];

// ─── Task card component ───────────────────────────────────────────────────────
function TaskCard({ task, index }: { task: (typeof TASKS)[0]; index: number }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "var(--color-slate-deep)",
        border: "1px solid var(--color-border-dark)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        animationDelay: `${index * 0.05}s`,
      }}
    >
      {/* Header */}
      <div
        className="flex items-start gap-4 px-6 py-5"
        style={{ borderBottom: "1px solid var(--color-border-dark)" }}
      >
        <span
          className="text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex-shrink-0 mt-0.5"
          style={{
            background: "rgba(212,168,67,0.1)",
            border: "1px solid rgba(212,168,67,0.25)",
            color: "var(--color-gold)",
            fontFamily: "var(--font-display)",
          }}
        >
          Task {task.num}
        </span>
        <h3
          className="text-lg font-bold leading-snug pt-0.5"
          style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
        >
          {task.title}
        </h3>
      </div>

      {/* Body */}
      <div className="px-6 py-5 space-y-4">
        <p className="text-sm leading-relaxed" style={{ color: "rgba(180,195,215,0.85)" }}>
          {task.desc}
        </p>

        {/* Risk + Tech pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Risk */}
          <div
            className="rounded-xl p-4"
            style={{
              background: "rgba(239,68,68,0.06)",
              border: "1px solid rgba(239,68,68,0.2)",
            }}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <AlertTriangle size={11} style={{ color: "#F87171" }} />
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "#F87171" }}
              >
                Riscul
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(248,113,113,0.8)" }}>
              {task.risk}
            </p>
          </div>

          {/* Tech solution */}
          <div
            className="rounded-xl p-4"
            style={{
              background: "rgba(125,211,252,0.05)",
              border: "1px solid rgba(125,211,252,0.2)",
            }}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <Zap size={11} style={{ color: "#7DD3FC" }} />
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "#7DD3FC" }}
              >
                Soluția tech
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(125,211,252,0.8)" }}>
              {task.tech}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function TaskuriRepetitivePage() {
  return (
    <>
      <ReadingProgress />
      <Navbar />

      <main style={{ background: "var(--color-midnight)", minHeight: "100vh" }}>
        {/* ── Header ──────────────────────────────────────────────────── */}
        <div
          className="relative pt-32 pb-12 px-4 overflow-hidden"
          style={{ background: "var(--color-midnight)" }}
        >
          <div className="absolute inset-0 bg-dot-grid opacity-15 pointer-events-none" />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(212,168,67,0.07) 0%, transparent 70%)",
            }}
          />

          <div className="relative max-w-3xl mx-auto">
            {/* Badge */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(212,168,67,0.1)",
                  border: "1px solid rgba(212,168,67,0.25)",
                  color: "var(--color-gold)",
                }}
              >
                Automatizare · Business
              </span>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                ~6 min citire
              </span>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                · de{" "}
                <span style={{ color: "rgba(200,215,230,0.7)" }}>Vlad Gheorghe</span>{" "}
                · aiwant.ro
              </span>
            </div>

            {/* H1 */}
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6"
              style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
            >
              5 Task-uri Repetitive care îți{" "}
              <span
                className="relative"
                style={{
                  color: "var(--color-gold)",
                  textDecoration: "line-through",
                  textDecorationColor: "rgba(239,68,68,0.6)",
                }}
              >
                «fură»
              </span>{" "}
              Profitul și Cum să le Elimini prin{" "}
              <span style={{ color: "var(--color-gold)" }}>Automatizare</span>
            </h1>

            {/* Pull-quote */}
            <blockquote
              className="text-base leading-relaxed pl-5 italic"
              style={{
                color: "rgba(180,200,220,0.85)",
                borderLeft: "3px solid var(--color-gold)",
              }}
            >
              Imaginează-ți o zi obișnuită: un manager deschide trei tabele Excel, copiază
              cifre dintr-un e-mail în altul, trimite manual confirmări de întâlniri și caută
              un contract dintr-un dosar creat acum doi ani.{" "}
              <strong style={{ color: "var(--color-gold-light, #F0C060)", fontStyle: "normal" }}>
                Aceasta nu este o poveste rară — este rutina zilnică a mii de companii din
                România.
              </strong>
            </blockquote>
          </div>
        </div>

        {/* ── Article body ────────────────────────────────────────────── */}
        <article
          id="article-body"
          className="max-w-3xl mx-auto px-4 pb-20 space-y-10"
        >
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
              Problema nu este oboseala în sine. Problema reală este{" "}
              <strong style={{ color: "white" }}>costul de oportunitate</strong>: fiecare oră
              petrecută pe un task de 0 lei valoare adăugată este o oră în care nu ai construit
              o strategie, nu ai vorbit cu un client nou, nu ai crescut businessul.
            </p>
            <p>
              În acest articol identificăm cele mai comune 5 activități care îți consumă
              resursele invizibil — și îți arătăm cum o platformă custom, construită specific
              pentru nevoile tale, poate face munca în locul lor.
            </p>
          </div>

          {/* Section label */}
          <div
            className="flex items-center gap-4"
            style={{ borderTop: "1px solid var(--color-border-dark)", paddingTop: "2rem" }}
          >
            <span
              className="text-xs font-bold uppercase tracking-widest whitespace-nowrap"
              style={{ color: "var(--color-text-muted)" }}
            >
              Cele 5 task-uri care îți mănâncă profitul
            </span>
            <div className="h-px flex-1" style={{ background: "var(--color-border-dark)" }} />
          </div>

          {/* Task cards */}
          <div className="space-y-5">
            {TASKS.map((task, i) => (
              <TaskCard key={task.num} task={task} index={i} />
            ))}
          </div>

          {/* Conclusion highlight */}
          <div
            className="rounded-2xl p-7"
            style={{
              background: "rgba(212,168,67,0.05)",
              border: "1px solid rgba(212,168,67,0.18)",
            }}
          >
            <p
              className="text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
            >
              Concluzie
            </p>
            <p className="text-base leading-relaxed" style={{ color: "rgba(180,200,220,0.85)" }}>
              Automatizarea nu este un lux rezervat corporațiilor. Este instrumentul prin care
              un business de orice dimensiune poate scala fără să crească proporțional costurile
              de personal. Fiecare task automatizat eliberează capacitate umană pentru munca ce
              contează cu adevărat:{" "}
              <strong style={{ color: "white" }}>
                relații cu clienții, inovație, creștere sustenabilă.
              </strong>
            </p>
          </div>

          {/* CTA block */}
          <div
            className="relative rounded-2xl overflow-hidden p-8 text-center"
            style={{
              background: "linear-gradient(135deg, var(--color-slate-deep) 0%, rgba(14,29,51,0.9) 100%)",
              border: "1px solid rgba(212,168,67,0.2)",
            }}
          >
            {/* Gold glow */}
            <div
              className="absolute -top-16 -right-16 w-64 h-64 pointer-events-none rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(212,168,67,0.12) 0%, transparent 65%)",
              }}
            />
            <div className="relative">
              <h2
                className="text-2xl font-black mb-3"
                style={{ color: "white", fontFamily: "var(--font-display)" }}
              >
                Ai recunoscut vreunul din aceste task-uri în compania ta?
              </h2>
              <p className="text-sm leading-relaxed mb-7 max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
                Nu lăsa timpul să se scurgă prin degetele tale.{" "}
                <span style={{ color: "rgba(240,192,106,0.9)" }}>
                  Contactează AiWANT pentru un audit gratuit de procese
                </span>{" "}
                și descoperă exact unde pierzi eficiență — și cum o platformă custom construită
                pentru tine poate schimba asta.
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
                Solicită auditul gratuit →
              </Link>
            </div>
          </div>

          {/* SEO tags */}
          <div
            className="pt-6"
            style={{ borderTop: "1px solid var(--color-border-dark)" }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: "var(--color-text-muted)" }}
            >
              Tag-uri
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "automatizare procese business",
                "reducerea costurilor operaționale",
                "taskuri repetitive",
                "eficiență în companie",
                "dezvoltare software custom",
                "platformă web personalizată",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 rounded-full transition-colors"
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

          {/* Author card */}
          <div
            className="flex items-center gap-4 p-5 rounded-2xl"
            style={{ background: "var(--color-slate-deep)", border: "1px solid var(--color-border-dark)" }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0"
              style={{
                background: "rgba(212,168,67,0.15)",
                color: "var(--color-gold)",
                fontFamily: "var(--font-display)",
              }}
            >
              V
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--color-text-on-dark)" }}>
                Vlad Gheorghe
              </p>
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
