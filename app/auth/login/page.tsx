"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Email sau parolă incorectă.");
      return;
    }

    router.push("/portal");
    router.refresh();
  };

  const inputBase =
    "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D4A843] placeholder:text-[#8A9BB5]";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--color-midnight)" }}
    >
      {/* Background glow */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "var(--color-gold)" }}
      />

      <div
        className="relative w-full max-w-md rounded-2xl p-8 sm:p-10"
        style={{
          background: "var(--color-slate-deep)",
          border: "1px solid var(--color-border-dark)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <Image src="/images/logo.png" alt="AiWANT" width={40} height={40} style={{ height: 40, width: "auto" }} />
          <div className="text-left leading-none">
            <div className="font-black tracking-widest text-lg" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)", letterSpacing: "0.15em" }}>AiWANT</div>
            <div className="text-[8px] font-semibold" style={{ color: "var(--color-gold)", letterSpacing: "0.1em" }}>CLIENT PORTAL</div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-1" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>
          Conectează-te
        </h1>
        <p className="text-sm text-center mb-8" style={{ color: "var(--color-text-muted)" }}>
          Accesează contul tău de client
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputBase}
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--color-border-dark)", color: "var(--color-text-on-dark)" }}
          />

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Parolă *"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`${inputBase} pr-12`}
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--color-border-dark)", color: "var(--color-text-on-dark)" }}
            />
            <button
              type="button"
              onClick={() => setShowPass((p) => !p)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
              style={{ color: "var(--color-text-muted)" }}
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="text-right">
            <Link href="/auth/forgot-password" className="text-xs hover:underline" style={{ color: "var(--color-text-muted)" }}>
              Am uitat parola
            </Link>
          </div>

          {error && (
            <p className="text-sm text-center px-4 py-3 rounded-xl" style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 disabled:opacity-60"
            style={{ background: "var(--color-gold)" }}
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Se conectează..." : "Conectează-te"}
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: "var(--color-text-muted)" }}>
          Nu ai cont?{" "}
          <Link href="/auth/register" className="font-medium hover:underline" style={{ color: "var(--color-gold)" }}>
            Înregistrează-te
          </Link>
        </p>
      </div>
    </div>
  );
}
