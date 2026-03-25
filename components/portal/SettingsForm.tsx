"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

type User = { id: string; name: string; email: string; company?: string | null; phone?: string | null };

export default function SettingsForm({ user }: { user: User }) {
  const { update } = useSession();
  const router = useRouter();

  const initial = { name: user.name, email: user.email, company: user.company ?? "", phone: user.phone ?? "" };
  const [profile, setProfile] = useState(initial);
  const [savedProfile, setSavedProfile] = useState(initial);
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [profileStatus, setProfileStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [profileError, setProfileError] = useState("");
  const [passStatus, setPassStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [passError, setPassError] = useState("");

  const isDirty = JSON.stringify(profile) !== JSON.stringify(savedProfile);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  const inputBase = "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D4A843]";
  const inputStyle = { background: "var(--color-surface-warm)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)" };

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError("");
    setProfileStatus("loading");
    const res = await fetch("/api/portal/settings/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(profile) });
    if (res.ok) {
      setSavedProfile(profile);
      await update({ name: profile.name });
      router.refresh();
      setProfileStatus("ok");
    } else {
      const data = await res.json();
      setProfileError(data.error || "A apărut o eroare. Te rugăm să încerci din nou.");
      setProfileStatus("err");
    }
    setTimeout(() => setProfileStatus("idle"), 3000);
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError("");
    if (passwords.next.length < 8) { setPassError("Parola trebuie să aibă cel puțin 8 caractere."); return; }
    if (passwords.next !== passwords.confirm) { setPassError("Parolele nu coincid."); return; }
    setPassStatus("loading");
    const res = await fetch("/api/portal/settings/password", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ currentPassword: passwords.current, newPassword: passwords.next }) });
    const data = await res.json();
    if (!res.ok) { setPassError(data.error || "A apărut o eroare. Te rugăm să încerci din nou."); setPassStatus("err"); return; }
    setPassStatus("ok");
    setPasswords({ current: "", next: "", confirm: "" });
    setTimeout(() => setPassStatus("idle"), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Profile */}
      <form onSubmit={saveProfile} className="rounded-xl p-6 space-y-4" style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}>
        <h2 className="font-bold" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>Profil</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-text-secondary)" }}>Nume complet</label>
            <input value={profile.name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} className={inputBase} style={inputStyle} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-text-secondary)" }}>Email</label>
            <input type="email" value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} className={inputBase} style={inputStyle} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-text-secondary)" }}>Firmă</label>
            <input value={profile.company} onChange={(e) => setProfile((p) => ({ ...p, company: e.target.value }))} className={inputBase} style={inputStyle} placeholder="Opțional" />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-text-secondary)" }}>Telefon</label>
            <input type="tel" value={profile.phone} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} className={inputBase} style={inputStyle} placeholder="Opțional" />
          </div>
        </div>
        {profileStatus === "err" && profileError && (
          <p className="text-sm px-4 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}>{profileError}</p>
        )}
        <div className="flex items-center gap-3">
          <button type="submit" disabled={profileStatus === "loading" || !isDirty} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2 transition-all hover:opacity-90 disabled:opacity-60" style={{ background: "var(--color-gold)" }}>
            {profileStatus === "loading" && <Loader2 size={14} className="animate-spin" />}
            Salvează modificările
          </button>
          {profileStatus === "ok" && <span className="flex items-center gap-1 text-sm" style={{ color: "#10B981" }}><CheckCircle size={14} /> Salvat!</span>}
        </div>
      </form>

      {/* Password */}
      <form onSubmit={changePassword} className="rounded-xl p-6 space-y-4" style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}>
        <h2 className="font-bold" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>Schimbă parola</h2>
        <input type="password" placeholder="Parola actuală" value={passwords.current} onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))} className={inputBase} style={inputStyle} />
        <input type="password" placeholder="Parola nouă (min. 8 caractere)" value={passwords.next} onChange={(e) => setPasswords((p) => ({ ...p, next: e.target.value }))} className={inputBase} style={inputStyle} />
        <input type="password" placeholder="Confirmă parola nouă" value={passwords.confirm} onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))} className={inputBase} style={inputStyle} />
        {passError && <p className="text-sm px-4 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}>{passError}</p>}
        <div className="flex items-center gap-3">
          <button type="submit" disabled={passStatus === "loading"} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2 transition-all hover:opacity-90 disabled:opacity-60" style={{ background: "var(--color-gold)" }}>
            {passStatus === "loading" && <Loader2 size={14} className="animate-spin" />}
            Schimbă parola
          </button>
          {passStatus === "ok" && <span className="flex items-center gap-1 text-sm" style={{ color: "#10B981" }}><CheckCircle size={14} /> Parolă schimbată!</span>}
        </div>
      </form>
    </div>
  );
}
