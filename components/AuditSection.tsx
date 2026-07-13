"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle, XCircle, Loader2, AlertTriangle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/utils";
import ScrollReveal from "./ScrollReveal";

type AuditResult = {
  auditId: string;
  performanceScore: number;
  lcp: number | null;
  cls: number | null;
  inp: number | null;
  topIssues: { title: string; savings: number | null }[];
  passed: string[];
};

type ViewState = "input" | "loading" | "results" | "error";

const LOADING_MESSAGES = [
  "Ne conectăm la site-ul tău...",
  "Măsurăm viteza de încărcare...",
  "Analizăm imaginile și scripturile...",
  "Verificăm experiența pe mobil...",
  "Pregătim raportul...",
];

function scoreColor(score: number): string {
  if (score >= 90) return "#10B981";
  if (score >= 50) return "#F59E0B";
  return "#EF4444";
}

function scoreVerdict(score: number): string {
  if (score >= 90) return "Excelent — site-ul tău e rapid!";
  if (score >= 50) return "Decent, dar există loc de îmbunătățire.";
  return "Site-ul tău pierde clienți din cauza vitezei.";
}

function vitalStatus(value: number, good: number, ok: number): "good" | "ok" | "poor" {
  if (value <= good) return "good";
  if (value <= ok) return "ok";
  return "poor";
}
const STATUS_COLOR: Record<string, string> = { good: "#10B981", ok: "#F59E0B", poor: "#EF4444" };

function ScoreGauge({ score }: { score: number }) {
  const size = 180;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const color = scoreColor(score);

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - score / 100) }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-black tabular-nums" style={{ color, fontFamily: "var(--font-display)" }}>{score}</span>
        <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>/ 100</span>
      </div>
    </div>
  );
}

function VitalCard({ label, value, unit, description, status }: {
  label: string; value: string; unit: string; description: string; status: "good" | "ok" | "poor";
}) {
  return (
    <div className="rounded-xl p-4 flex-1" style={{ background: "var(--color-slate-deep)", border: "1px solid var(--color-border-dark)" }}>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: STATUS_COLOR[status] }} />
        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>{label}</span>
      </div>
      <p className="text-2xl font-bold" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>
        {value}<span className="text-sm font-normal ml-0.5" style={{ color: "var(--color-text-muted)" }}>{unit}</span>
      </p>
      <p className="text-xs mt-1 leading-snug" style={{ color: "var(--color-text-muted)" }}>{description}</p>
    </div>
  );
}

function LeadForm({ result, url }: { result: AuditResult; url: string }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setError("Trebuie să fii de acord cu prelucrarea datelor.");
      return;
    }
    setError("");
    setStatus("loading");
    try {
      const res = await fetch("/api/audit/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auditId: result.auditId, ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Eroare");
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "A apărut o eroare.");
      setStatus("error");
    }
  };

  const fieldClass =
    "w-full px-4 py-3 rounded-xl text-sm transition-colors duration-200 placeholder:opacity-50 focus:ring-2 focus:ring-[var(--color-gold)]";
  const fieldStyle = {
    background: "var(--color-slate-deep)",
    border: "1px solid var(--color-border-dark)",
    color: "var(--color-text-on-dark)",
    outline: "none",
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 p-5 rounded-xl" style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}>
        <CheckCircle size={20} className="flex-shrink-0" />
        <p className="text-sm">✓ Mulțumesc! Îți trimit raportul în maximum 24h. Verifică și inbox-ul de spam.</p>
      </div>
    );
  }

  const whatsappMessage = `Bună! Tocmai am analizat site-ul meu (${url}) — scor ${result.performanceScore}/100. Aș vrea să discutăm despre îmbunătățirea performanței.`;

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text" placeholder="Nume *" required
            value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            className={fieldClass} style={fieldStyle}
          />
          <input
            type="email" placeholder="Email *" required
            value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            className={fieldClass} style={fieldStyle}
          />
        </div>
        <input
          type="tel" placeholder="Telefon (opțional)"
          value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
          className={fieldClass} style={fieldStyle}
        />

        <label className="flex items-start gap-2.5 text-xs" style={{ color: "var(--color-text-muted)" }}>
          <input
            type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 flex-shrink-0"
          />
          <span>
            Sunt de acord cu prelucrarea datelor conform{" "}
            <a href="/politica-de-confidentialitate" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--color-gold)" }}>
              Politicii de confidențialitate
            </a>.
          </span>
        </label>

        {error && <p className="text-xs" style={{ color: "#ef4444" }}>{error}</p>}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3.5 rounded-xl font-semibold transition-all duration-200 hover:scale-[1.01] disabled:opacity-60 gold-glow-hover"
          style={{ background: "var(--color-gold)", color: "var(--color-midnight)" }}
        >
          {status === "loading" ? "Se trimite..." : "Trimite-mi raportul complet"}
        </button>
      </form>

      <a
        href={buildWhatsAppUrl(WHATSAPP_NUMBER, whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center mt-4 text-sm hover:underline"
        style={{ color: "var(--color-gold)" }}
      >
        Sau hai să discutăm direct pe WhatsApp →
      </a>
    </div>
  );
}

export default function AuditSection() {
  const [view, setView] = useState<ViewState>("input");
  const [urlInput, setUrlInput] = useState("");
  const [submittedUrl, setSubmittedUrl] = useState("");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const loadingTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (view === "loading") {
      setLoadingMsgIndex(0);
      loadingTimer.current = setInterval(() => {
        setLoadingMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length);
      }, 4000);
    }
    return () => {
      if (loadingTimer.current) clearInterval(loadingTimer.current);
    };
  }, [view]);

  const runAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    setSubmittedUrl(urlInput.trim());
    setView("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlInput.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Nu am putut analiza acest site.");
      setResult(data);
      setView("results");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Nu am putut analiza acest site.");
      setView("error");
    }
  };

  const reset = () => {
    setView("input");
    setUrlInput("");
    setResult(null);
    setErrorMsg("");
  };

  return (
    <section id="audit" style={{ background: "var(--color-midnight)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-28">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-5"
              style={{ border: "1px solid var(--color-border-dark)", color: "var(--color-gold)", background: "rgba(212,168,67,0.06)" }}
            >
              Audit gratuit și instant
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
            >
              Cât de bun este site-ul tău?
            </h2>
            <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: "var(--color-text-muted)" }}>
              Analiză gratuită și instantă — fără cont, fără email. Vezi scorul real de performanță măsurat de Google.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{ background: "var(--color-slate-deep)", border: "1px solid var(--color-border-dark)" }}
          >
            <AnimatePresence mode="wait">
              {view === "input" && (
                <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <form onSubmit={runAudit} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="www.site-ul-tau.ro"
                      className="flex-1 px-4 py-3.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
                      style={{ background: "var(--color-midnight)", border: "1px solid var(--color-border-dark)", color: "var(--color-text-on-dark)" }}
                      aria-label="URL site"
                    />
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02] gold-glow-hover flex-shrink-0"
                      style={{ background: "var(--color-gold)", color: "var(--color-midnight)" }}
                    >
                      <Search size={16} /> Analizează gratuit
                    </button>
                  </form>
                  <p className="text-xs text-center mt-4" style={{ color: "var(--color-text-muted)" }}>
                    ⚡ Rezultate în ~20 secunde · Powered by Google PageSpeed
                  </p>
                </motion.div>
              )}

              {view === "loading" && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-8 text-center">
                  <Loader2 size={32} className="mx-auto mb-5 animate-spin" style={{ color: "var(--color-gold)" }} />
                  <div className="h-5 mb-6">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={loadingMsgIndex}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {LOADING_MESSAGES[loadingMsgIndex]}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <div className="h-1.5 max-w-xs mx-auto rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "var(--color-gold)", width: "40%" }}
                      animate={{ x: ["-100%", "250%"] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              )}

              {view === "error" && (
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-6">
                  <AlertTriangle size={28} className="mx-auto mb-3" style={{ color: "#EF4444" }} />
                  <p className="text-sm mb-5" style={{ color: "var(--color-text-on-dark)" }}>{errorMsg}</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={reset}
                      className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]"
                      style={{ background: "var(--color-gold)", color: "var(--color-midnight)" }}
                    >
                      Încearcă din nou
                    </button>
                    <a
                      href={buildWhatsAppUrl(WHATSAPP_NUMBER, `Bună! Am încercat să-mi analizez site-ul (${submittedUrl}) dar analiza automată nu a funcționat. Puteți face un audit manual?`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:underline"
                      style={{ color: "var(--color-gold)" }}
                    >
                      Contactează-mă pe WhatsApp →
                    </a>
                  </div>
                </motion.div>
              )}

              {view === "results" && result && (
                <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                  {/* Score */}
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <ScoreGauge score={result.performanceScore} />
                    <div className="text-center sm:text-left">
                      <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--color-text-muted)" }}>
                        {submittedUrl}
                      </p>
                      <p className="text-lg font-semibold" style={{ color: scoreColor(result.performanceScore) }}>
                        {scoreVerdict(result.performanceScore)}
                      </p>
                    </div>
                  </div>

                  {/* Core Web Vitals */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {result.lcp !== null && (
                      <VitalCard
                        label="LCP" value={result.lcp.toFixed(1)} unit="s"
                        description="Timpul până se afișează conținutul principal"
                        status={vitalStatus(result.lcp, 2.5, 4)}
                      />
                    )}
                    {result.cls !== null && (
                      <VitalCard
                        label="CLS" value={result.cls.toFixed(2)} unit=""
                        description="Cât de mult „sare” conținutul în timpul încărcării"
                        status={vitalStatus(result.cls, 0.1, 0.25)}
                      />
                    )}
                    {result.inp !== null && (
                      <VitalCard
                        label="INP" value={String(result.inp)} unit="ms"
                        description="Rapiditatea răspunsului la interacțiuni"
                        status={vitalStatus(result.inp, 200, 500)}
                      />
                    )}
                  </div>

                  {/* Issues */}
                  {result.topIssues.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold mb-3" style={{ color: "var(--color-text-on-dark)" }}>Probleme detectate</p>
                      <ul className="space-y-2">
                        {result.topIssues.map((issue, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm">
                            <XCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: "#EF4444" }} />
                            <span style={{ color: "var(--color-text-muted)" }}>
                              {issue.title}
                              {issue.savings !== null && (
                                <span className="ml-1.5 font-medium" style={{ color: "#EF4444" }}>
                                  −{issue.savings.toFixed(1)}s potențial
                                </span>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Passed */}
                  {result.passed.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold mb-3" style={{ color: "var(--color-text-on-dark)" }}>Ce funcționează bine</p>
                      <ul className="space-y-2">
                        {result.passed.map((title, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm">
                            <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: "#10B981" }} />
                            <span style={{ color: "var(--color-text-muted)" }}>{title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button onClick={reset} className="text-sm hover:underline" style={{ color: "var(--color-gold)" }}>
                    Analizează alt site →
                  </button>

                  {/* The Ask */}
                  <div className="rounded-2xl p-6" style={{ background: "rgba(212,168,67,0.06)", border: "1px solid rgba(212,168,67,0.25)" }}>
                    <p className="text-lg font-bold mb-2" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>
                      Vrei raportul complet cu plan de acțiune?
                    </p>
                    <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                      Îți trimit gratuit analiza detaliată: ce cauzează fiecare problemă, cât te costă în clienți pierduți și pașii concreți de rezolvare — prioritizați după impact.
                    </p>
                    <LeadForm result={result} url={submittedUrl} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
