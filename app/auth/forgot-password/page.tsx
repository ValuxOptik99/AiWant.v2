"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // In v1, just show success (email not implemented)
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--color-midnight)" }}>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "var(--color-gold)" }} />
      <div className="relative w-full max-w-md rounded-2xl p-8 sm:p-10" style={{ background: "var(--color-slate-deep)", border: "1px solid var(--color-border-dark)" }}>
        <div className="flex items-center justify-center gap-3 mb-8">
          <Image src="/images/logo.png" alt="AiWANT" width={40} height={40} style={{ height: 40, width: "auto" }} />
          <div className="text-left leading-none">
            <div className="font-black tracking-widest text-lg" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)", letterSpacing: "0.15em" }}>AiWANT</div>
            <div className="text-[8px] font-semibold" style={{ color: "var(--color-gold)", letterSpacing: "0.1em" }}>CLIENT PORTAL</div>
          </div>
        </div>

        {sent ? (
          <div className="text-center space-y-4">
            <CheckCircle size={48} className="mx-auto" style={{ color: "#10B981" }} />
            <h2 className="text-xl font-bold" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>Email trimis!</h2>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Dacă adresa există în sistem, vei primi instrucțiuni de resetare a parolei.
            </p>
            <Link href="/auth/login" className="inline-block mt-4 text-sm font-medium hover:underline" style={{ color: "var(--color-gold)" }}>
              ← Înapoi la login
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-center mb-2" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>Resetare parolă</h1>
            <p className="text-sm text-center mb-8" style={{ color: "var(--color-text-muted)" }}>Introdu emailul contului tău</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email" placeholder="Email *" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#D4A843] placeholder:text-[#8A9BB5]"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--color-border-dark)", color: "var(--color-text-on-dark)" }}
              />
              <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 disabled:opacity-60" style={{ background: "var(--color-gold)" }}>
                {loading && <Loader2 size={16} className="animate-spin" />}
                {loading ? "Se trimite..." : "Trimite email de resetare"}
              </button>
            </form>
            <p className="text-center text-sm mt-6">
              <Link href="/auth/login" className="hover:underline" style={{ color: "var(--color-text-muted)" }}>← Înapoi la login</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
