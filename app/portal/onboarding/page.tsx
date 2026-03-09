"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Globe, Target, Calculator, CheckCircle,
  ChevronRight, ChevronLeft, Check, Star, AlertCircle,
} from "lucide-react";
import confetti from "canvas-confetti";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Step1 {
  companyName: string;
  companyCIF: string;
  companyRegCom: string;
  companyAddress: string;
  companyCity: string;
  companyCounty: string;
  companyFoundedYear: string;
  industryDomain: string;
  industryOther: string;
  companySize: string;
  companyDescription: string;
}

interface Step2 {
  hasWebsite: boolean;
  currentWebsiteUrl: string;
  websitePlatform: string;
  websiteSatisfaction: string;
  hasSocialMedia: boolean;
  socialFacebook: string;
  socialInstagram: string;
  socialTikTok: string;
  socialLinkedIn: string;
  socialOther: string;
  usesTools: string[];
  usesToolsOther: string;
  currentPainPoints: string;
}

interface Step3 {
  mainGoals: string[];
  goalsDescription: string;
  targetAudience: string;
  targetAgeRange: string[];
  targetLocation: string;
  competitorUrls: string;
  inspirationUrls: string;
}

interface Step4 {
  budgetRange: string;
  timeline: string;
  preferredPayment: string;
  monthlyBudgetHosting: string;
  additionalNotes: string;
}

type WizardData = { s1: Step1; s2: Step2; s3: Step3; s4: Step4 };

// ─── Constants ───────────────────────────────────────────────────────────────

const ROMANIAN_COUNTIES = [
  "Alba", "Arad", "Argeș", "Bacău", "Bihor", "Bistrița-Năsăud", "Botoșani",
  "Brăila", "Brașov", "București", "Buzău", "Călărași", "Caraș-Severin",
  "Cluj", "Constanța", "Covasna", "Dâmbovița", "Dolj", "Galați", "Giurgiu",
  "Gorj", "Harghita", "Hunedoara", "Ialomița", "Iași", "Ilfov", "Maramureș",
  "Mehedinți", "Mureș", "Neamț", "Olt", "Prahova", "Sălaj", "Satu Mare",
  "Sibiu", "Suceava", "Teleorman", "Timiș", "Tulcea", "Vâlcea", "Vaslui", "Vrancea",
];

const INDUSTRY_DOMAINS = [
  "Servicii profesionale (avocatură, contabilitate, consultanță)",
  "Sănătate (medici, clinici, farmacii)",
  "Retail / Comerț",
  "HoReCa (restaurante, hoteluri, cafenele)",
  "Fitness / Sport / Wellness",
  "Educație / Training",
  "Construcții / Imobiliare",
  "IT & Tehnologie",
  "Producție / Manufacturare",
  "Transport / Logistică",
  "Frumusețe / Cosmetică",
  "Artă / Cultură / Evenimente",
  "Altele",
];

const COMPANY_SIZES = [
  { value: "solo", label: "Solo", desc: "Doar eu" },
  { value: "micro", label: "Micro", desc: "2–9 angajați" },
  { value: "small", label: "Mică", desc: "10–49 angajați" },
  { value: "medium", label: "Medie", desc: "50+ angajați" },
];

const WEBSITE_PLATFORMS = ["WordPress", "Wix", "Squarespace", "Shopify", "Custom", "Nu știu"];

const DIGITAL_TOOLS = [
  "Facturare online (SmartBill, Oblio, FGO etc.)",
  "Email marketing (Mailchimp, MailerLite etc.)",
  "CRM (HubSpot, Salesforce etc.)",
  "Google Business Profile",
  "Google Analytics",
  "Platformă booking/programări",
  "Nimic din astea",
  "Altele",
];

const GOALS = [
  { value: "site-nou", label: "Site de prezentare nou", emoji: "🌐" },
  { value: "redesign", label: "Redesign site existent", emoji: "🔄" },
  { value: "magazin-online", label: "Magazin online", emoji: "🛒" },
  { value: "automatizari", label: "Automatizări & integrări", emoji: "⚡" },
  { value: "social-media", label: "Social media management", emoji: "📱" },
  { value: "aplicatie-custom", label: "Aplicație web custom", emoji: "💻" },
  { value: "seo", label: "SEO & vizibilitate online", emoji: "🔍" },
  { value: "altele", label: "Altele", emoji: "📊" },
];

const AGE_RANGES = ["18–25 ani", "25–35 ani", "35–50 ani", "50–65 ani", "65+ ani", "Toate vârstele"];

const TARGET_LOCATIONS = [
  { value: "local", label: "Locală", desc: "un oraș" },
  { value: "regional", label: "Regională", desc: "un județ / zonă" },
  { value: "national", label: "Națională", desc: "toată România" },
  { value: "international", label: "Internațională", desc: "" },
];

const BUDGET_OPTIONS = [
  { value: "sub-500", label: "Sub 500 EUR", sub: "~2.500 RON", desc: "Ideal pentru un landing page simplu", coins: 1 },
  { value: "500-1000", label: "500–1.000 EUR", sub: "~2.500–5.000 RON", desc: "Site de prezentare complet", coins: 2 },
  { value: "1000-2000", label: "1.000–2.000 EUR", sub: "~5.000–10.000 RON", desc: "Aplicație web sau e-commerce basic", coins: 3 },
  { value: "2000-5000", label: "2.000–5.000 EUR", sub: "~10.000–25.000 RON", desc: "Proiect complex, multiple funcționalități", coins: 4 },
  { value: "5000+", label: "5.000+ EUR", sub: "25.000+ RON", desc: "Platformă completă sau proiect enterprise", coins: 5 },
  { value: "nedecis", label: "Nu m-am decis încă", sub: "", desc: "Vreau să discutăm opțiunile", coins: 0 },
];

const TIMELINE_OPTIONS = [
  { value: "urgent", label: "Cât mai repede", sub: "1–2 săptămâni", emoji: "⚡" },
  { value: "1-2-luni", label: "1–2 luni", sub: "", emoji: "📅" },
  { value: "2-3-luni", label: "2–3 luni", sub: "", emoji: "📅" },
  { value: "3-6-luni", label: "3–6 luni", sub: "", emoji: "📅" },
  { value: "nu-urgent", label: "Nu e urgent", sub: "calitatea contează mai mult", emoji: "🕐" },
];

const PAYMENT_OPTIONS = [
  "Plată integrală la finalizare",
  "50% avans + 50% la livrare",
  "Rate lunare (cost amortizat pe durata contractului)",
  "Vreau să discutăm opțiunile",
];

const HOSTING_OPTIONS = [
  "Sub 20 EUR/lună (~100 RON)",
  "20–50 EUR/lună (~100–250 RON)",
  "50–100 EUR/lună (~250–500 RON)",
  "Discutăm în funcție de ce include",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const DRAFT_KEY = "aiwant_onboarding_draft";

function loadDraft(): Partial<WizardData> {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveDraft(data: WizardData) {
  try { localStorage.setItem(DRAFT_KEY, JSON.stringify(data)); } catch { /* */ }
}

function clearDraft() {
  try { localStorage.removeItem(DRAFT_KEY); } catch { /* */ }
}

const defaultS1 = (): Step1 => ({
  companyName: "", companyCIF: "", companyRegCom: "", companyAddress: "",
  companyCity: "", companyCounty: "", companyFoundedYear: "",
  industryDomain: "", industryOther: "", companySize: "", companyDescription: "",
});
const defaultS2 = (): Step2 => ({
  hasWebsite: false, currentWebsiteUrl: "", websitePlatform: "", websiteSatisfaction: "",
  hasSocialMedia: false, socialFacebook: "", socialInstagram: "", socialTikTok: "",
  socialLinkedIn: "", socialOther: "", usesTools: [], usesToolsOther: "", currentPainPoints: "",
});
const defaultS3 = (): Step3 => ({
  mainGoals: [], goalsDescription: "", targetAudience: "", targetAgeRange: [],
  targetLocation: "", competitorUrls: "", inspirationUrls: "",
});
const defaultS4 = (): Step4 => ({
  budgetRange: "", timeline: "", preferredPayment: "", monthlyBudgetHosting: "", additionalNotes: "",
});

// ─── Sub-components ───────────────────────────────────────────────────────────

function Input({ label, value, onChange, placeholder, helper, required, type = "text", className = "" }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; helper?: string; required?: boolean; type?: string; className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-text-primary)" }}>
        {label}{required && <span style={{ color: "#EF4444" }}> *</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all"
        style={{
          border: "1.5px solid var(--color-border)",
          background: "#fff",
          color: "var(--color-text-primary)",
        }}
        onFocus={(e) => (e.target.style.borderColor = "var(--color-gold)")}
        onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
      />
      {helper && <p className="text-xs mt-1" style={{ color: "var(--color-text-secondary)" }}>{helper}</p>}
    </div>
  );
}

function Textarea({ label, value, onChange, placeholder, rows = 3, required }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; rows?: number; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-text-primary)" }}>
        {label}{required && <span style={{ color: "#EF4444" }}> *</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all resize-none"
        style={{
          border: "1.5px solid var(--color-border)",
          background: "#fff",
          color: "var(--color-text-primary)",
        }}
        onFocus={(e) => (e.target.style.borderColor = "var(--color-gold)")}
        onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
      />
    </div>
  );
}

function Select({ label, value, onChange, options, required, placeholder }: {
  label: string; value: string; onChange: (v: string) => void;
  options: string[]; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-text-primary)" }}>
        {label}{required && <span style={{ color: "#EF4444" }}> *</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all appearance-none"
        style={{
          border: "1.5px solid var(--color-border)",
          background: "#fff",
          color: value ? "var(--color-text-primary)" : "var(--color-text-secondary)",
        }}
        onFocus={(e) => (e.target.style.borderColor = "var(--color-gold)")}
        onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
      >
        <option value="">{placeholder ?? "Selectează..."}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Toggle({ label, checked, onChange, desc }: {
  label: string; checked: boolean; onChange: (v: boolean) => void; desc?: string;
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl" style={{ border: "1.5px solid var(--color-border)", background: "#fff" }}>
      <div>
        <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>{label}</p>
        {desc && <p className="text-xs mt-0.5" style={{ color: "var(--color-text-secondary)" }}>{desc}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
        style={{ background: checked ? "var(--color-gold)" : "var(--color-border)" }}
      >
        <motion.div
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
          animate={{ left: checked ? "calc(100% - 22px)" : "2px" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
}

function StarRating({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const labels = ["", "Deloc", "Slab", "Satisfăcător", "Bun", "Foarte mulțumit"];
  return (
    <div>
      <p className="text-sm font-medium mb-2" style={{ color: "var(--color-text-primary)" }}>Cât de mulțumit ești de site-ul actual?</p>
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(String(n))}
            className="transition-transform hover:scale-110"
          >
            <Star
              size={28}
              fill={Number(value) >= n ? "var(--color-gold)" : "none"}
              stroke={Number(value) >= n ? "var(--color-gold)" : "var(--color-border)"}
            />
          </button>
        ))}
        {value && <span className="text-sm ml-2" style={{ color: "var(--color-text-secondary)" }}>{labels[Number(value)]}</span>}
      </div>
    </div>
  );
}

function MultiCheckbox({ label, options, selected, onChange }: {
  label: string; options: string[]; selected: string[]; onChange: (v: string[]) => void;
}) {
  const toggle = (opt: string) => {
    onChange(selected.includes(opt) ? selected.filter((x) => x !== opt) : [...selected, opt]);
  };
  return (
    <div>
      <p className="text-sm font-medium mb-2" style={{ color: "var(--color-text-primary)" }}>{label}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((opt) => {
          const checked = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm text-left transition-all"
              style={{
                border: `1.5px solid ${checked ? "var(--color-gold)" : "var(--color-border)"}`,
                background: checked ? "rgba(212,168,67,0.06)" : "#fff",
                color: "var(--color-text-primary)",
              }}
            >
              <div className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center transition-all" style={{ background: checked ? "var(--color-gold)" : "transparent", border: checked ? "none" : "1.5px solid var(--color-border)" }}>
                {checked && <Check size={10} color="#fff" strokeWidth={3} />}
              </div>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RadioGroup({ label, options, value, onChange, required }: {
  label: string;
  options: { value: string; label: string; desc?: string }[];
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <p className="text-sm font-medium mb-2" style={{ color: "var(--color-text-primary)" }}>
        {label}{required && <span style={{ color: "#EF4444" }}> *</span>}
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className="flex flex-col items-center justify-center p-3 rounded-xl text-center transition-all"
              style={{
                border: `1.5px solid ${selected ? "var(--color-gold)" : "var(--color-border)"}`,
                background: selected ? "rgba(212,168,67,0.06)" : "#fff",
              }}
            >
              <span className="text-sm font-semibold" style={{ color: selected ? "var(--color-gold)" : "var(--color-text-primary)" }}>{opt.label}</span>
              {opt.desc && <span className="text-xs mt-0.5" style={{ color: "var(--color-text-secondary)" }}>{opt.desc}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function GoalCard({ goal, selected, onToggle }: { goal: typeof GOALS[0]; selected: boolean; onToggle: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col items-center gap-2 p-4 rounded-xl text-center transition-all relative"
      style={{
        border: `2px solid ${selected ? "var(--color-gold)" : "var(--color-border)"}`,
        background: selected ? "rgba(212,168,67,0.06)" : "#fff",
        boxShadow: selected ? "0 0 0 3px rgba(212,168,67,0.15)" : "none",
      }}
    >
      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "var(--color-gold)" }}>
          <Check size={10} color="#fff" strokeWidth={3} />
        </div>
      )}
      <span className="text-2xl">{goal.emoji}</span>
      <span className="text-xs font-medium leading-tight" style={{ color: selected ? "var(--color-gold)" : "var(--color-text-primary)" }}>{goal.label}</span>
    </motion.button>
  );
}

function CardSelector({ options, value, onChange, required, label }: {
  options: { value: string; label: string; sub?: string; desc?: string; emoji?: string; coins?: number }[];
  value: string; onChange: (v: string) => void; required?: boolean; label: string;
}) {
  return (
    <div>
      <p className="text-sm font-medium mb-2" style={{ color: "var(--color-text-primary)" }}>
        {label}{required && <span style={{ color: "#EF4444" }}> *</span>}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <motion.button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="flex items-start gap-3 p-4 rounded-xl text-left transition-all relative"
              style={{
                border: `2px solid ${selected ? "var(--color-gold)" : "var(--color-border)"}`,
                background: selected ? "rgba(212,168,67,0.06)" : "#fff",
                boxShadow: selected ? "0 0 0 3px rgba(212,168,67,0.15)" : "none",
              }}
            >
              {opt.coins !== undefined && (
                <span className="text-lg flex-shrink-0">
                  {opt.coins === 0 ? "🤔" : "💰".repeat(opt.coins)}
                </span>
              )}
              {opt.emoji && <span className="text-xl flex-shrink-0">{opt.emoji}</span>}
              <div className="min-w-0">
                <p className="text-sm font-semibold" style={{ color: selected ? "var(--color-gold)" : "var(--color-text-primary)" }}>{opt.label}</p>
                {opt.sub && <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>{opt.sub}</p>}
                {opt.desc && <p className="text-xs mt-0.5" style={{ color: "var(--color-text-secondary)" }}>{opt.desc}</p>}
              </div>
              {selected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: "var(--color-gold)" }}>
                  <Check size={10} color="#fff" strokeWidth={3} />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step Components ──────────────────────────────────────────────────────────

function Step1Form({ data, setData, errors }: { data: Step1; setData: (d: Step1) => void; errors: Record<string, string> }) {
  const set = (key: keyof Step1) => (v: string) => setData({ ...data, [key]: v });
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Numele firmei" value={data.companyName} onChange={set("companyName")} placeholder="Ex: ABC SRL" required className="sm:col-span-2" />
        <Input label="CUI/CIF" value={data.companyCIF} onChange={set("companyCIF")} placeholder="Ex: RO12345678" helper="Codul unic de înregistrare fiscală" />
        <Input label="Nr. Registrul Comerțului" value={data.companyRegCom} onChange={set("companyRegCom")} placeholder="Ex: J13/xxxx/xxxx" />
        <Input label="Adresa sediu" value={data.companyAddress} onChange={set("companyAddress")} placeholder="Strada, Nr." className="sm:col-span-2" />
        <Input label="Oraș" value={data.companyCity} onChange={set("companyCity")} placeholder="Ex: Constanța" />
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-text-primary)" }}>Județ</label>
          <select
            value={data.companyCounty}
            onChange={(e) => set("companyCounty")(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none appearance-none"
            style={{ border: "1.5px solid var(--color-border)", background: "#fff", color: data.companyCounty ? "var(--color-text-primary)" : "var(--color-text-secondary)" }}
            onFocus={(e) => (e.target.style.borderColor = "var(--color-gold)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
          >
            <option value="">Selectează județ...</option>
            {ROMANIAN_COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <Input label="Anul înființării" value={data.companyFoundedYear} onChange={set("companyFoundedYear")} placeholder="Ex: 2015" type="number" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-text-primary)" }}>
          Domeniu de activitate <span style={{ color: "#EF4444" }}>*</span>
        </label>
        <select
          value={data.industryDomain}
          onChange={(e) => set("industryDomain")(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none appearance-none"
          style={{
            border: `1.5px solid ${errors.industryDomain ? "#EF4444" : "var(--color-border)"}`,
            background: "#fff",
            color: data.industryDomain ? "var(--color-text-primary)" : "var(--color-text-secondary)",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--color-gold)")}
          onBlur={(e) => (e.target.style.borderColor = errors.industryDomain ? "#EF4444" : "var(--color-border)")}
        >
          <option value="">Selectează domeniu...</option>
          {INDUSTRY_DOMAINS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        {errors.industryDomain && <p className="text-xs mt-1 flex items-center gap-1" style={{ color: "#EF4444" }}><AlertCircle size={11} />{errors.industryDomain}</p>}
        {data.industryDomain === "Altele" && (
          <Input label="Specifică domeniul" value={data.industryOther} onChange={set("industryOther")} placeholder="Descrie domeniul tău de activitate" className="mt-3" />
        )}
      </div>

      <RadioGroup
        label="Dimensiunea firmei"
        options={COMPANY_SIZES}
        value={data.companySize}
        onChange={set("companySize")}
        required
      />
      {errors.companySize && <p className="text-xs flex items-center gap-1 -mt-3" style={{ color: "#EF4444" }}><AlertCircle size={11} />{errors.companySize}</p>}

      <Textarea
        label="Descrie pe scurt activitatea firmei"
        value={data.companyDescription}
        onChange={set("companyDescription")}
        placeholder="Cu ce se ocupă firma ta? Ce produse sau servicii oferi?"
        rows={3}
      />
    </div>
  );
}

function Step2Form({ data, setData }: { data: Step2; setData: (d: Step2) => void }) {
  const set = (key: keyof Step2) => (v: string | boolean | string[]) => setData({ ...data, [key]: v });
  return (
    <div className="space-y-5">
      <Toggle
        label="Ai un site web în prezent?"
        checked={data.hasWebsite}
        onChange={(v) => set("hasWebsite")(v)}
      />
      <AnimatePresence>
        {data.hasWebsite && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pl-4 border-l-2" style={{ borderColor: "var(--color-gold)" }}>
              <Input label="URL site actual" value={data.currentWebsiteUrl} onChange={set("currentWebsiteUrl") as (v: string) => void} placeholder="https://..." />
              <Select label="Pe ce platformă e construit?" value={data.websitePlatform} onChange={set("websitePlatform") as (v: string) => void} options={WEBSITE_PLATFORMS} />
              <StarRating value={data.websiteSatisfaction} onChange={set("websiteSatisfaction") as (v: string) => void} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toggle
        label="Ești activ pe social media?"
        checked={data.hasSocialMedia}
        onChange={(v) => set("hasSocialMedia")(v)}
      />
      <AnimatePresence>
        {data.hasSocialMedia && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 pl-4 border-l-2" style={{ borderColor: "var(--color-gold)" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input label="Facebook" value={data.socialFacebook} onChange={set("socialFacebook") as (v: string) => void} placeholder="URL pagină sau nume" />
                <Input label="Instagram" value={data.socialInstagram} onChange={set("socialInstagram") as (v: string) => void} placeholder="@handle" />
                <Input label="TikTok" value={data.socialTikTok} onChange={set("socialTikTok") as (v: string) => void} placeholder="@handle" />
                <Input label="LinkedIn" value={data.socialLinkedIn} onChange={set("socialLinkedIn") as (v: string) => void} placeholder="URL profil/pagină" />
                <Input label="Altele" value={data.socialOther} onChange={set("socialOther") as (v: string) => void} placeholder="Altă platformă" className="sm:col-span-2" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <MultiCheckbox
        label="Ce unelte digitale folosești acum?"
        options={DIGITAL_TOOLS}
        selected={data.usesTools}
        onChange={set("usesTools") as (v: string[]) => void}
      />
      {data.usesTools.includes("Altele") && (
        <Input label="Care anume?" value={data.usesToolsOther} onChange={set("usesToolsOther") as (v: string) => void} placeholder="Descrie unealta..." />
      )}

      <Textarea
        label="Ce nu funcționează bine acum în online?"
        value={data.currentPainPoints}
        onChange={set("currentPainPoints") as (v: string) => void}
        placeholder="Ce te frustrează? Ce ai vrea să fie diferit?"
        rows={3}
      />
    </div>
  );
}

function Step3Form({ data, setData, errors }: { data: Step3; setData: (d: Step3) => void; errors: Record<string, string> }) {
  const set = (key: keyof Step3) => (v: string | string[]) => setData({ ...data, [key]: v });
  const toggleGoal = (v: string) => {
    const goals = data.mainGoals.includes(v)
      ? data.mainGoals.filter((x) => x !== v)
      : [...data.mainGoals, v];
    setData({ ...data, mainGoals: goals });
  };
  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-medium mb-2" style={{ color: "var(--color-text-primary)" }}>
          Ce servicii te interesează? <span style={{ color: "#EF4444" }}>*</span>
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {GOALS.map((g) => (
            <GoalCard
              key={g.value}
              goal={g}
              selected={data.mainGoals.includes(g.value)}
              onToggle={() => toggleGoal(g.value)}
            />
          ))}
        </div>
        {errors.mainGoals && <p className="text-xs mt-1 flex items-center gap-1" style={{ color: "#EF4444" }}><AlertCircle size={11} />{errors.mainGoals}</p>}
      </div>

      <Textarea
        label="Descrie mai detaliat ce ai nevoie"
        value={data.goalsDescription}
        onChange={set("goalsDescription") as (v: string) => void}
        placeholder="Povestește-ne mai multe despre proiectul tău ideal. Ce funcționalități sunt importante pentru tine?"
        rows={4}
      />

      <Textarea
        label="Cine sunt clienții tăi?"
        value={data.targetAudience}
        onChange={set("targetAudience") as (v: string) => void}
        placeholder="Descrie publicul țintă: vârstă, locație, interese, comportament"
        rows={3}
      />

      <MultiCheckbox
        label="Interval vârstă clienți"
        options={AGE_RANGES}
        selected={data.targetAgeRange}
        onChange={set("targetAgeRange") as (v: string[]) => void}
      />

      <RadioGroup
        label="Acoperire geografică"
        options={TARGET_LOCATIONS}
        value={data.targetLocation}
        onChange={set("targetLocation") as (v: string) => void}
        required
      />
      {errors.targetLocation && <p className="text-xs flex items-center gap-1 -mt-3" style={{ color: "#EF4444" }}><AlertCircle size={11} />{errors.targetLocation}</p>}

      <Textarea
        label="URL-uri competitori"
        value={data.competitorUrls}
        onChange={set("competitorUrls") as (v: string) => void}
        placeholder="Site-urile competitorilor tăi, câte unul pe linie"
        rows={2}
      />
      <Textarea
        label="Site-uri care îți plac"
        value={data.inspirationUrls}
        onChange={set("inspirationUrls") as (v: string) => void}
        placeholder="Site-uri care te inspiră ca design sau funcționalitate"
        rows={2}
      />
    </div>
  );
}

function Step4Form({ data, setData, errors }: { data: Step4; setData: (d: Step4) => void; errors: Record<string, string> }) {
  const set = (key: keyof Step4) => (v: string) => setData({ ...data, [key]: v });
  return (
    <div className="space-y-6">
      <CardSelector
        label="Care este bugetul tău estimat pentru proiect?"
        options={BUDGET_OPTIONS}
        value={data.budgetRange}
        onChange={set("budgetRange")}
        required
      />
      {errors.budgetRange && <p className="text-xs flex items-center gap-1 -mt-4" style={{ color: "#EF4444" }}><AlertCircle size={11} />{errors.budgetRange}</p>}

      <CardSelector
        label="Când ai vrea să fie gata?"
        options={TIMELINE_OPTIONS}
        value={data.timeline}
        onChange={set("timeline")}
        required
      />
      {errors.timeline && <p className="text-xs flex items-center gap-1 -mt-4" style={{ color: "#EF4444" }}><AlertCircle size={11} />{errors.timeline}</p>}

      <div>
        <p className="text-sm font-medium mb-2" style={{ color: "var(--color-text-primary)" }}>Cum preferi să plătești?</p>
        <div className="space-y-2">
          {PAYMENT_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => set("preferredPayment")(opt)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left transition-all"
              style={{
                border: `1.5px solid ${data.preferredPayment === opt ? "var(--color-gold)" : "var(--color-border)"}`,
                background: data.preferredPayment === opt ? "rgba(212,168,67,0.06)" : "#fff",
                color: "var(--color-text-primary)",
              }}
            >
              <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center" style={{ border: `2px solid ${data.preferredPayment === opt ? "var(--color-gold)" : "var(--color-border)"}` }}>
                {data.preferredPayment === opt && <div className="w-2 h-2 rounded-full" style={{ background: "var(--color-gold)" }} />}
              </div>
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-2" style={{ color: "var(--color-text-primary)" }}>Buget lunar pentru hosting și mentenanță?</p>
        <div className="space-y-2">
          {HOSTING_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => set("monthlyBudgetHosting")(opt)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left transition-all"
              style={{
                border: `1.5px solid ${data.monthlyBudgetHosting === opt ? "var(--color-gold)" : "var(--color-border)"}`,
                background: data.monthlyBudgetHosting === opt ? "rgba(212,168,67,0.06)" : "#fff",
                color: "var(--color-text-primary)",
              }}
            >
              <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center" style={{ border: `2px solid ${data.monthlyBudgetHosting === opt ? "var(--color-gold)" : "var(--color-border)"}` }}>
                {data.monthlyBudgetHosting === opt && <div className="w-2 h-2 rounded-full" style={{ background: "var(--color-gold)" }} />}
              </div>
              {opt}
            </button>
          ))}
        </div>
      </div>

      <Textarea
        label="Altceva ce vrei să ne spui?"
        value={data.additionalNotes}
        onChange={set("additionalNotes")}
        placeholder="Orice informație suplimentară care ne-ar ajuta să înțelegem mai bine nevoile tale"
        rows={3}
      />
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string | string[] | boolean | undefined | null }) {
  if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) return null;
  const display = Array.isArray(value) ? value.join(", ") : typeof value === "boolean" ? (value ? "Da" : "Nu") : String(value);
  return (
    <div className="flex gap-3 py-1.5 text-sm">
      <span className="flex-shrink-0 font-medium w-40" style={{ color: "var(--color-text-secondary)" }}>{label}</span>
      <span style={{ color: "var(--color-text-primary)" }}>{display}</span>
    </div>
  );
}

function SummarySection({ title, icon: Icon, children, onEdit }: {
  title: string; icon: React.ElementType; children: React.ReactNode; onEdit: () => void;
}) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--color-border)" }}>
      <div className="flex items-center justify-between px-4 py-3" style={{ background: "var(--color-surface-warm)" }}>
        <div className="flex items-center gap-2">
          <Icon size={16} style={{ color: "var(--color-gold)" }} />
          <span className="font-semibold text-sm" style={{ color: "var(--color-text-primary)" }}>{title}</span>
        </div>
        <button type="button" onClick={onEdit} className="text-xs font-medium px-3 py-1 rounded-lg" style={{ background: "rgba(212,168,67,0.1)", color: "var(--color-gold)" }}>
          Editează
        </button>
      </div>
      <div className="px-4 py-2 divide-y" style={{ borderColor: "var(--color-border)" }}>
        {children}
      </div>
    </div>
  );
}

function Step5Review({ s1, s2, s3, s4, goToStep, confirmed, setConfirmed, submitting, onSubmit }: {
  s1: Step1; s2: Step2; s3: Step3; s4: Step4;
  goToStep: (n: number) => void;
  confirmed: boolean; setConfirmed: (v: boolean) => void;
  submitting: boolean; onSubmit: () => void;
}) {
  return (
    <div className="space-y-4">
      <SummarySection title="Despre firma ta" icon={Building2} onEdit={() => goToStep(0)}>
        <SummaryRow label="Firma" value={s1.companyName} />
        <SummaryRow label="CUI/CIF" value={s1.companyCIF} />
        <SummaryRow label="Reg. Comerțului" value={s1.companyRegCom} />
        <SummaryRow label="Adresă" value={[s1.companyAddress, s1.companyCity, s1.companyCounty].filter(Boolean).join(", ")} />
        <SummaryRow label="Înființată" value={s1.companyFoundedYear ? `${s1.companyFoundedYear}` : null} />
        <SummaryRow label="Domeniu" value={s1.industryDomain === "Altele" && s1.industryOther ? s1.industryOther : s1.industryDomain} />
        <SummaryRow label="Dimensiune" value={COMPANY_SIZES.find((x) => x.value === s1.companySize)?.label} />
        <SummaryRow label="Descriere" value={s1.companyDescription} />
      </SummarySection>

      <SummarySection title="Prezența online" icon={Globe} onEdit={() => goToStep(1)}>
        <SummaryRow label="Are site web" value={s2.hasWebsite} />
        {s2.hasWebsite && (
          <>
            <SummaryRow label="URL site" value={s2.currentWebsiteUrl} />
            <SummaryRow label="Platformă" value={s2.websitePlatform} />
            <SummaryRow label="Satisfacție site" value={s2.websiteSatisfaction ? `${s2.websiteSatisfaction}/5 stele` : null} />
          </>
        )}
        <SummaryRow label="Social media" value={s2.hasSocialMedia} />
        {s2.hasSocialMedia && (
          <SummaryRow label="Platforme" value={[s2.socialFacebook && "Facebook", s2.socialInstagram && "Instagram", s2.socialTikTok && "TikTok", s2.socialLinkedIn && "LinkedIn"].filter(Boolean) as string[]} />
        )}
        <SummaryRow label="Unelte digitale" value={s2.usesTools} />
        <SummaryRow label="Probleme actuale" value={s2.currentPainPoints} />
      </SummarySection>

      <SummarySection title="Obiective și target" icon={Target} onEdit={() => goToStep(2)}>
        <SummaryRow label="Servicii dorite" value={s3.mainGoals.map((v) => GOALS.find((g) => g.value === v)?.label ?? v)} />
        <SummaryRow label="Detalii proiect" value={s3.goalsDescription} />
        <SummaryRow label="Public țintă" value={s3.targetAudience} />
        <SummaryRow label="Vârstă clienți" value={s3.targetAgeRange} />
        <SummaryRow label="Acoperire geo" value={TARGET_LOCATIONS.find((x) => x.value === s3.targetLocation)?.label} />
        <SummaryRow label="Competitori" value={s3.competitorUrls} />
        <SummaryRow label="Inspirație" value={s3.inspirationUrls} />
      </SummarySection>

      <SummarySection title="Buget și planificare" icon={Calculator} onEdit={() => goToStep(3)}>
        <SummaryRow label="Buget proiect" value={BUDGET_OPTIONS.find((x) => x.value === s4.budgetRange)?.label} />
        <SummaryRow label="Timeline" value={TIMELINE_OPTIONS.find((x) => x.value === s4.timeline)?.label} />
        <SummaryRow label="Modalitate plată" value={s4.preferredPayment} />
        <SummaryRow label="Hosting/lună" value={s4.monthlyBudgetHosting} />
        <SummaryRow label="Note adiționale" value={s4.additionalNotes} />
      </SummarySection>

      <div className="p-4 rounded-xl" style={{ background: "rgba(212,168,67,0.06)", border: "1.5px solid rgba(212,168,67,0.3)" }}>
        <button
          type="button"
          onClick={() => setConfirmed(!confirmed)}
          className="flex items-start gap-3 text-left w-full"
        >
          <div className="w-5 h-5 rounded flex-shrink-0 mt-0.5 flex items-center justify-center transition-all" style={{ background: confirmed ? "var(--color-gold)" : "transparent", border: `2px solid ${confirmed ? "var(--color-gold)" : "var(--color-border)"}` }}>
            {confirmed && <Check size={11} color="#fff" strokeWidth={3} />}
          </div>
          <span className="text-sm" style={{ color: "var(--color-text-primary)" }}>
            Confirm că informațiile furnizate sunt corecte și sunt de acord ca datele să fie folosite pentru pregătirea ofertei de servicii.
          </span>
        </button>
      </div>

      <motion.button
        type="button"
        onClick={onSubmit}
        disabled={!confirmed || submitting}
        whileHover={confirmed && !submitting ? { scale: 1.01 } : {}}
        whileTap={confirmed && !submitting ? { scale: 0.99 } : {}}
        className="w-full py-4 rounded-xl text-base font-bold transition-all"
        style={{
          background: confirmed && !submitting ? "var(--color-gold)" : "var(--color-border)",
          color: confirmed && !submitting ? "#fff" : "var(--color-text-secondary)",
          cursor: confirmed && !submitting ? "pointer" : "not-allowed",
        }}
      >
        {submitting ? "Se trimite..." : "Finalizează profilul"}
      </motion.button>
    </div>
  );
}

// ─── Main Wizard ──────────────────────────────────────────────────────────────

const STEPS = [
  { label: "Firma ta", icon: Building2, short: "Firma" },
  { label: "Online", icon: Globe, short: "Online" },
  { label: "Obiective", icon: Target, short: "Obiective" },
  { label: "Buget", icon: Calculator, short: "Buget" },
  { label: "Confirmare", icon: CheckCircle, short: "Final" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [confirmed, setConfirmed] = useState(false);
  const [autoSaved, setAutoSaved] = useState(false);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [s1, setS1Raw] = useState<Step1>(defaultS1);
  const [s2, setS2Raw] = useState<Step2>(defaultS2);
  const [s3, setS3Raw] = useState<Step3>(defaultS3);
  const [s4, setS4Raw] = useState<Step4>(defaultS4);

  // Load draft from localStorage
  useEffect(() => {
    const draft = loadDraft();
    if (draft.s1) setS1Raw({ ...defaultS1(), ...draft.s1 });
    if (draft.s2) setS2Raw({ ...defaultS2(), ...draft.s2 });
    if (draft.s3) setS3Raw({ ...defaultS3(), ...draft.s3 });
    if (draft.s4) setS4Raw({ ...defaultS4(), ...draft.s4 });
  }, []);

  const triggerAutoSave = useCallback((data: WizardData) => {
    saveDraft(data);
    setAutoSaved(true);
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => setAutoSaved(false), 2000);
  }, []);

  const setS1 = (d: Step1) => { setS1Raw(d); triggerAutoSave({ s1: d, s2, s3, s4 }); };
  const setS2 = (d: Step2) => { setS2Raw(d); triggerAutoSave({ s1, s2: d, s3, s4 }); };
  const setS3 = (d: Step3) => { setS3Raw(d); triggerAutoSave({ s1, s2, s3: d, s4 }); };
  const setS4 = (d: Step4) => { setS4Raw(d); triggerAutoSave({ s1, s2, s3, s4: d }); };

  const validate = (idx: number): boolean => {
    const errs: Record<string, string> = {};
    if (idx === 0) {
      if (!s1.companyName.trim()) errs.companyName = "Câmpul este obligatoriu.";
      if (!s1.industryDomain) errs.industryDomain = "Selectează un domeniu.";
      if (!s1.companySize) errs.companySize = "Selectează dimensiunea firmei.";
    }
    if (idx === 2) {
      if (s3.mainGoals.length === 0) errs.mainGoals = "Selectează cel puțin un serviciu.";
      if (!s3.targetLocation) errs.targetLocation = "Selectează acoperirea geografică.";
    }
    if (idx === 3) {
      if (!s4.budgetRange) errs.budgetRange = "Selectează un interval de buget.";
      if (!s4.timeline) errs.timeline = "Selectează un timeline.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const goForward = () => {
    if (!validate(step)) return;
    setDirection(1);
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setErrors({});
    setDirection(-1);
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToStep = (n: number) => {
    setErrors({});
    setDirection(n > step ? 1 : -1);
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/portal/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: s1.companyName.trim(),
          companyCIF: s1.companyCIF.trim() || undefined,
          companyRegCom: s1.companyRegCom.trim() || undefined,
          companyAddress: s1.companyAddress.trim() || undefined,
          companyCity: s1.companyCity.trim() || undefined,
          companyCounty: s1.companyCounty || undefined,
          companyFoundedYear: s1.companyFoundedYear ? parseInt(s1.companyFoundedYear) : null,
          industryDomain: s1.industryDomain === "Altele" && s1.industryOther ? s1.industryOther : s1.industryDomain,
          companySize: s1.companySize,
          companyDescription: s1.companyDescription.trim() || undefined,
          hasWebsite: s2.hasWebsite,
          currentWebsiteUrl: s2.hasWebsite ? s2.currentWebsiteUrl.trim() || undefined : undefined,
          websitePlatform: s2.hasWebsite ? s2.websitePlatform || undefined : undefined,
          websiteSatisfaction: s2.hasWebsite ? s2.websiteSatisfaction || undefined : undefined,
          hasSocialMedia: s2.hasSocialMedia,
          socialFacebook: s2.hasSocialMedia ? s2.socialFacebook.trim() || undefined : undefined,
          socialInstagram: s2.hasSocialMedia ? s2.socialInstagram.trim() || undefined : undefined,
          socialTikTok: s2.hasSocialMedia ? s2.socialTikTok.trim() || undefined : undefined,
          socialLinkedIn: s2.hasSocialMedia ? s2.socialLinkedIn.trim() || undefined : undefined,
          socialOther: s2.hasSocialMedia ? s2.socialOther.trim() || undefined : undefined,
          usesTools: [...s2.usesTools.filter((t) => t !== "Altele"), ...(s2.usesTools.includes("Altele") && s2.usesToolsOther ? [s2.usesToolsOther] : [])],
          currentPainPoints: s2.currentPainPoints.trim() || undefined,
          mainGoals: s3.mainGoals,
          goalsDescription: s3.goalsDescription.trim() || undefined,
          targetAudience: s3.targetAudience.trim() || undefined,
          targetAgeRange: s3.targetAgeRange,
          targetLocation: s3.targetLocation || undefined,
          competitorUrls: s3.competitorUrls.trim() || undefined,
          inspirationUrls: s3.inspirationUrls.trim() || undefined,
          budgetRange: s4.budgetRange || undefined,
          timeline: s4.timeline || undefined,
          preferredPayment: s4.preferredPayment || undefined,
          monthlyBudgetHosting: s4.monthlyBudgetHosting || undefined,
          additionalNotes: s4.additionalNotes.trim() || undefined,
        }),
      });

      if (!res.ok) throw new Error("Submit failed");

      clearDraft();
      setDone(true);

      // Confetti
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ["#D4A843", "#FFD700", "#ffffff", "#0E1D33"] });
      setTimeout(() => confetti({ particleCount: 60, spread: 120, origin: { y: 0.5 }, colors: ["#D4A843", "#10B981"] }), 400);

      // Countdown
      let count = 3;
      const timer = setInterval(() => {
        count--;
        setCountdown(count);
        if (count <= 0) {
          clearInterval(timer);
          router.push("/portal");
          router.refresh();
        }
      }, 1000);
    } catch {
      setErrors({ submit: "A apărut o eroare. Te rugăm să încerci din nou." });
      setSubmitting(false);
    }
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "linear-gradient(135deg, var(--color-surface) 0%, #fff 100%)" }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "#10B981" }}
          >
            <Check size={40} color="#fff" strokeWidth={3} />
          </motion.div>
          <h1 className="text-3xl font-black mb-3" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>
            Profilul tău este complet!
          </h1>
          <p className="text-base mb-2" style={{ color: "var(--color-text-secondary)" }}>
            Vom analiza informațiile și te vom contacta cu o ofertă personalizată.
          </p>
          <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
            Te redirecționăm către portal în <span className="font-bold" style={{ color: "var(--color-gold)" }}>{countdown}</span> secunde...
          </p>
        </motion.div>
      </div>
    );
  }

  const StepIcon = STEPS[step].icon;

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: "linear-gradient(135deg, var(--color-surface) 0%, #fff 60%)" }}>
      <div className="max-w-[720px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Image src="/images/logo.png" alt="AiWANT" width={40} height={40} className="mx-auto mb-3" style={{ height: 40, width: "auto" }} />
          <h2 className="text-2xl font-black" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>
            Bine ai venit!
          </h2>
          <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
            Completează profilul firmei tale pentru a-ți pregăti oferta personalizată
          </p>
        </div>

        {/* Progress Steps */}
        <div className="relative flex items-center justify-between mb-8 px-2">
          {STEPS.map((s, i) => {
            const completed = i < step;
            const active = i === step;
            const Icon = s.icon;
            return (
              <div key={i} className="flex flex-col items-center relative z-10" style={{ flex: 1 }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: completed ? "#10B981" : active ? "var(--color-gold)" : "#fff",
                    border: `2px solid ${completed ? "#10B981" : active ? "var(--color-gold)" : "var(--color-border)"}`,
                    boxShadow: active ? "0 0 0 4px rgba(212,168,67,0.2)" : "none",
                  }}
                >
                  {completed ? <Check size={16} color="#fff" strokeWidth={3} /> : <Icon size={16} color={active ? "#fff" : "var(--color-text-secondary)"} />}
                </div>
                <span className="hidden sm:block text-xs font-medium mt-1.5 text-center" style={{ color: active ? "var(--color-gold)" : completed ? "#10B981" : "var(--color-text-secondary)" }}>
                  {s.short}
                </span>
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div
                    className="absolute top-4 left-1/2 h-0.5 transition-all"
                    style={{
                      width: "calc(100% - 36px)",
                      marginLeft: "18px",
                      background: i < step ? "#10B981" : "var(--color-border)",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Card */}
        <div className="rounded-2xl overflow-hidden mb-6" style={{ background: "#fff", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: "1px solid var(--color-border-warm)" }}>
          {/* Step header */}
          <div className="px-6 pt-6 pb-4 border-b" style={{ borderColor: "var(--color-border)" }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,168,67,0.1)" }}>
                <StepIcon size={20} style={{ color: "var(--color-gold)" }} />
              </div>
              <div>
                <h3 className="font-bold text-lg" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>
                  {step === 0 && "Despre firma ta"}
                  {step === 1 && "Prezența ta online"}
                  {step === 2 && "Ce vrei să obții"}
                  {step === 3 && "Buget și planificare"}
                  {step === 4 && "Confirmă și trimite"}
                </h3>
                <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  {step === 0 && "Ajută-ne să înțelegem afacerea ta"}
                  {step === 1 && "Unde te găsesc clienții tăi acum?"}
                  {step === 2 && "Ajută-ne să înțelegem obiectivele tale"}
                  {step === 3 && "Să ne asigurăm că suntem pe aceeași pagină"}
                  {step === 4 && "Verifică informațiile înainte de a trimite"}
                </p>
              </div>
            </div>
          </div>

          {/* Step content with animation */}
          <div className="p-6 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                {step === 0 && <Step1Form data={s1} setData={setS1} errors={errors} />}
                {step === 1 && <Step2Form data={s2} setData={setS2} />}
                {step === 2 && <Step3Form data={s3} setData={setS3} errors={errors} />}
                {step === 3 && <Step4Form data={s4} setData={setS4} errors={errors} />}
                {step === 4 && (
                  <Step5Review
                    s1={s1} s2={s2} s3={s3} s4={s4}
                    goToStep={goToStep}
                    confirmed={confirmed}
                    setConfirmed={setConfirmed}
                    submitting={submitting}
                    onSubmit={handleSubmit}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom navigation */}
        {step < 4 && (
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                color: step === 0 ? "var(--color-border)" : "var(--color-text-secondary)",
                cursor: step === 0 ? "not-allowed" : "pointer",
              }}
            >
              <ChevronLeft size={18} /> Înapoi
            </button>

            <div className="flex items-center gap-3">
              <AnimatePresence>
                {autoSaved && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs"
                    style={{ color: "#10B981" }}
                  >
                    Salvat automat ✓
                  </motion.span>
                )}
              </AnimatePresence>
              <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>Pasul {step + 1} din 5</span>
            </div>

            <motion.button
              type="button"
              onClick={goForward}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold"
              style={{ background: "var(--color-gold)", color: "#fff" }}
            >
              Continuă <ChevronRight size={18} />
            </motion.button>
          </div>
        )}

        {errors.submit && (
          <p className="mt-4 text-sm text-center flex items-center justify-center gap-1" style={{ color: "#EF4444" }}>
            <AlertCircle size={14} /> {errors.submit}
          </p>
        )}
      </div>
    </div>
  );
}
