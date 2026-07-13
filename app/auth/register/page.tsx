"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2, CheckCircle, ClipboardList } from "lucide-react";
import { getService, computeEstimate, getFeatureLabels, type ServiceKey } from "@/lib/configurator-data";

type ConfigSummary = {
  projectName: string;
  serviceTitle: string;
  features: string[];
  estimateLow: number;
  estimateHigh: number;
  timeline: string;
};

function readConfiguratorSummary(): ConfigSummary | null {
  try {
    const raw = localStorage.getItem("aiwant_configurator");
    if (!raw) return null;
    const cfg = JSON.parse(raw) as { service?: ServiceKey; features?: string[]; projectName?: string; timeline?: string };
    if (!cfg.service || !cfg.projectName) return null;
    const service = getService(cfg.service);
    const estimate = computeEstimate(cfg.service, cfg.features ?? []);
    return {
      projectName: cfg.projectName,
      serviceTitle: service.title,
      features: getFeatureLabels(cfg.service, cfg.features ?? []),
      estimateLow: estimate.low,
      estimateHigh: estimate.high,
      timeline: cfg.timeline ?? "",
    };
  } catch {
    return null;
  }
}

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromConfigurator = searchParams.get("from") === "configurator";

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", company: "", phone: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [configSummary, setConfigSummary] = useState<ConfigSummary | null>(null);

  useEffect(() => {
    if (fromConfigurator) setConfigSummary(readConfiguratorSummary());
  }, [fromConfigurator]);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 8) { setError("Parola trebuie să aibă cel puțin 8 caractere."); return; }
    if (form.password !== form.confirm) { setError("Parolele nu coincid."); return; }

    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name, email: form.email, password: form.password, company: form.company, phone: form.phone,
        configSummary: configSummary
          ? {
              projectName: configSummary.projectName,
              service: configSummary.serviceTitle,
              features: configSummary.features,
              estimateLow: configSummary.estimateLow,
              estimateHigh: configSummary.estimateHigh,
              timeline: configSummary.timeline,
            }
          : undefined,
      }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) { setError(data.error || "A apărut o eroare."); return; }
    setSuccess(true);
  };

  const inputBase = "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D4A843] placeholder:text-[#8A9BB5]";
  const inputStyle = { background: "rgba(255,255,255,0.05)", border: "1px solid var(--color-border-dark)", color: "var(--color-text-on-dark)" };

  const passwordStrength = (pwd: string) => {
    if (!pwd) return null;
    const hasMixedCase = /[a-z]/.test(pwd) && /[A-Z]/.test(pwd);
    const hasDigit = /\d/.test(pwd);
    if (pwd.length >= 12 || (pwd.length >= 8 && hasMixedCase && hasDigit)) {
      return { percent: 100, color: "#10B981", label: "Parolă sigură ✓" };
    }
    if (pwd.length >= 8) {
      return { percent: 70, color: "var(--color-gold)", label: "Aproape acolo" };
    }
    return { percent: 30, color: "rgba(212,168,67,0.4)", label: "Continuă..." };
  };
  const strength = passwordStrength(form.password);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: "var(--color-midnight)" }}>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "var(--color-gold)" }} />

      <div className="relative w-full max-w-md rounded-2xl p-8 sm:p-10" style={{ background: "var(--color-slate-deep)", border: "1px solid var(--color-border-dark)" }}>
        <div className="flex items-center justify-center gap-3 mb-8">
          <Image src="/images/logo.png" alt="AiWANT" width={40} height={40} style={{ height: 40, width: "auto" }} />
          <div className="text-left leading-none">
            <div className="font-black tracking-widest text-lg" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)", letterSpacing: "0.15em" }}>AiWANT</div>
            <div className="text-[8px] font-semibold" style={{ color: "var(--color-gold)", letterSpacing: "0.1em" }}>CLIENT PORTAL</div>
          </div>
        </div>

        {success ? (
          <div className="text-center space-y-4">
            <CheckCircle size={48} className="mx-auto" style={{ color: "#10B981" }} />
            <h2 className="text-xl font-bold" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>Cont creat cu succes!</h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              Contul tău a fost creat. Vei putea accesa portalul după ce administratorul aprobă accesul.
            </p>
            <button onClick={() => router.push("/auth/login")} className="w-full py-3 rounded-xl font-semibold text-white mt-4" style={{ background: "var(--color-gold)" }}>
              Mergi la login
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-center mb-1" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>
              {configSummary ? "Salvează-ți proiectul" : "Creează cont"}
            </h1>
            <p className="text-sm text-center mb-2" style={{ color: "var(--color-text-muted)" }}>Înregistrează-te pentru a accesa portalul</p>
            {!configSummary && (
              <p className="text-sm text-center mb-8" style={{ color: "var(--color-text-muted)" }}>Alătură-te clienților care își gestionează proiectele digital.</p>
            )}

            {configSummary && (
              <div className="mb-8 p-4 rounded-xl" style={{ background: "rgba(212,168,67,0.06)", border: "1px solid rgba(212,168,67,0.3)" }}>
                <div className="flex items-start gap-2.5">
                  <ClipboardList size={16} className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-gold)" }} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--color-text-on-dark)" }}>
                      📋 Configurația ta: {configSummary.projectName}
                    </p>
                    <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
                      {configSummary.serviceTitle} · {configSummary.features.length} funcționalități · {configSummary.estimateLow.toLocaleString("ro-RO")}–{configSummary.estimateHigh.toLocaleString("ro-RO")} EUR
                    </p>
                    <p className="text-xs mt-1.5" style={{ color: "var(--color-gold)" }}>Se salvează în contul tău după înregistrare.</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" placeholder="Nume complet *" value={form.name} onChange={set("name")} required className={inputBase} style={inputStyle} />
              <input type="email" placeholder="Email *" value={form.email} onChange={set("email")} required className={inputBase} style={inputStyle} />
              <div>
                <input type="text" placeholder="Firma (opțional)" value={form.company} onChange={set("company")} className={inputBase} style={inputStyle} />
                <p className="mt-1 text-xs px-1" style={{ color: "var(--color-text-muted)" }}>Opțional — ne ajută să pregătim contul tău mai repede.</p>
              </div>
              <input type="tel" placeholder="Telefon (opțional)" value={form.phone} onChange={set("phone")} className={inputBase} style={inputStyle} />

              <div>
                <div className="relative">
                  <input type={showPass ? "text" : "password"} placeholder="Parolă * (min. 8 caractere)" value={form.password} onChange={set("password")} required className={`${inputBase} pr-12`} style={inputStyle} />
                  <button type="button" onClick={() => setShowPass((p) => !p)} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "var(--color-text-muted)" }}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {strength && (
                  <div className="mt-1.5 px-1">
                    <p className="text-xs text-right mb-1" style={{ color: strength.color }}>{strength.label}</p>
                    <div className="h-[2px] w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <div className="h-full rounded-full transition-all duration-300" style={{ width: `${strength.percent}%`, background: strength.color }} />
                    </div>
                  </div>
                )}
              </div>
              <input type="password" placeholder="Confirmă parola *" value={form.confirm} onChange={set("confirm")} required className={inputBase} style={inputStyle} />

              {error && <p className="text-sm text-center px-4 py-3 rounded-xl" style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}>{error}</p>}

              <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 disabled:opacity-60" style={{ background: "var(--color-gold)" }}>
                {loading && <Loader2 size={16} className="animate-spin" />}
                {loading ? "Se creează contul..." : configSummary ? "Continuă" : "Creează cont"}
              </button>
            </form>

            <p className="text-center text-sm mt-6" style={{ color: "var(--color-text-muted)" }}>
              Ai deja cont?{" "}
              <Link href="/auth/login" className="font-medium hover:underline" style={{ color: "var(--color-gold)" }}>Conectează-te</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}
