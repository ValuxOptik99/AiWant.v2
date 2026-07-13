"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import { PROJECT_TYPES, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/utils";
import ScrollReveal from "./ScrollReveal";

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  phone: "",
  projectType: "Platformă digitală / site web",
  message: "",
};

function inputStyle(hasError?: boolean) {
  return {
    background: "var(--color-slate-deep)",
    border: `1px solid ${hasError ? "#ef4444" : "var(--color-border-dark)"}`,
    color: "var(--color-text-on-dark)",
    outline: "none",
  };
}

export default function ContactSection() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = "Câmp obligatoriu";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Email invalid";
    if (!form.message.trim()) e.message = "Câmp obligatoriu";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch {
      setStatus("error");
    }
  };

  const fieldClass =
    "w-full px-4 py-3 rounded-xl text-sm transition-colors duration-200 placeholder:opacity-50 focus:ring-2 focus:ring-[var(--color-gold)]";

  return (
    <section id="contact" style={{ background: "var(--color-midnight)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — info */}
          <ScrollReveal direction="right">
            <div className="space-y-8">
              <div>
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-5"
                  style={{
                    border: "1px solid var(--color-border-dark)",
                    color: "var(--color-gold)",
                    background: "rgba(212,168,67,0.06)",
                  }}
                >
                  Primul pas e gratuit
                </span>
                <h2
                  className="text-3xl sm:text-4xl font-bold mb-4 mt-3"
                  style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
                >
                  Gata să automatizezi{" "}
                  <span style={{ color: "var(--color-gold)" }}>creșterea afacerii tale?</span>
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  Auditează-ți procesele actuale împreună cu noi — gratuit. Îți arătăm
                  exact unde pierzi timp și bani și ce soluție digitală ți se potrivește.
                </p>
              </div>

              {/* What's included in the audit */}
              <div
                className="rounded-2xl p-6 space-y-4"
                style={{
                  background: "var(--color-slate-deep)",
                  border: "1px solid var(--color-border-dark)",
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--color-gold)" }}
                >
                  Ce primești în auditul gratuit
                </p>
                {[
                  "Analiză a proceselor manuale care consumă cel mai mult timp",
                  "Identificarea punctelor critice de eroare din workflow-ul tău",
                  "Recomandare clară a soluției digitale potrivite (fără jargon tehnic)",
                  "Estimare de ROI — cât timp și bani poți recupera",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 text-xs font-bold"
                      style={{ background: "rgba(212,168,67,0.15)", color: "var(--color-gold)" }}
                    >
                      ✓
                    </span>
                    <span className="text-sm leading-snug" style={{ color: "var(--color-text-muted)" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Contact details */}
              <div className="space-y-4">
                <a href="mailto:aiwant.automation@gmail.com" className="flex items-center gap-3 group">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(212,168,67,0.1)" }}
                  >
                    <Mail size={18} style={{ color: "var(--color-gold)" }} />
                  </div>
                  <span
                    className="text-sm group-hover:underline"
                    style={{ color: "var(--color-text-on-dark)" }}
                  >
                    aiwant.automation@gmail.com
                  </span>
                </a>

                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(212,168,67,0.1)" }}
                  >
                    <Phone size={18} style={{ color: "var(--color-gold)" }} />
                  </div>
                  <span className="text-sm" style={{ color: "var(--color-text-on-dark)" }}>
                    +40 749 997 163
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(212,168,67,0.1)" }}
                  >
                    <MapPin size={18} style={{ color: "var(--color-gold)" }} />
                  </div>
                  <span className="text-sm" style={{ color: "var(--color-text-on-dark)" }}>
                    Bd. Iuliu Maniu 15H, București, România
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — form */}
          <ScrollReveal delay={0.15}>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Name */}
              <div>
                <input
                  type="text"
                  placeholder="Nume *"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className={fieldClass}
                  style={inputStyle(!!errors.name)}
                  aria-label="Nume"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Email *"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className={fieldClass}
                  style={inputStyle(!!errors.email)}
                  aria-label="Email"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <input
                  type="tel"
                  placeholder="Telefon (opțional)"
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  className={fieldClass}
                  style={inputStyle()}
                  aria-label="Telefon"
                />
              </div>

              {/* Project type */}
              <div>
                <select
                  value={form.projectType}
                  onChange={(e) => setForm((p) => ({ ...p, projectType: e.target.value }))}
                  className={fieldClass}
                  style={inputStyle()}
                  aria-label="Tip proiect"
                >
                  <option value="">Tip proiect</option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
                  Poți schimba oricând — alegem împreună soluția potrivită.
                </p>
              </div>

              {/* Message */}
              <div>
                <textarea
                  placeholder="Ex: Am o firmă de [domeniu] și aș avea nevoie de [site nou / magazin online / automatizare]. Bugetul estimat: [suma]. *"
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  rows={5}
                  className={fieldClass}
                  style={inputStyle(!!errors.message)}
                  aria-label="Mesaj"
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3.5 rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:scale-100 focus-visible:outline-none gold-glow-hover"
                style={{ background: "var(--color-gold)", color: "var(--color-midnight)" }}
              >
                {status === "loading" ? "Se trimite..." : "Solicită Auditul Gratuit"}
              </button>

              {/* WhatsApp link */}
              <a
                href={buildWhatsAppUrl(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "rgba(37,211,102,0.1)",
                  border: "1px solid rgba(37,211,102,0.3)",
                  color: "#25D366",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Sau discută direct pe WhatsApp
              </a>

              {/* Feedback */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 p-4 rounded-xl text-sm"
                    style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}
                  >
                    <CheckCircle size={16} />
                    Mesajul a fost trimis! Te voi contacta în curând.
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 p-4 rounded-xl text-sm"
                    style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}
                  >
                    <AlertCircle size={16} />
                    A apărut o eroare. Te rog încearcă din nou sau contactează-mă direct.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
