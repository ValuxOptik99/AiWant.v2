"use client";

import { useState } from "react";
import { Loader2, Save } from "lucide-react";

type Admin = { id: string; name: string; email: string; phone: string | null };

const inputClass = "w-full px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#D4A843] placeholder:text-[#8A9BB5]";
const inputStyle = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" };
const labelClass = "block text-xs font-semibold text-[#8A9BB5] uppercase tracking-wider mb-1.5";

export default function AdminSettingsForm({ admin }: { admin: Admin }) {
  const [profile, setProfile] = useState({ name: admin.name, email: admin.email, phone: admin.phone || "" });
  const [password, setPassword] = useState({ current: "", next: "", confirm: "" });
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingProfile(true);
    setProfileMsg(null);
    const res = await fetch("/api/portal/settings/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    setLoadingProfile(false);
    setProfileMsg(res.ok ? { type: "success", text: "Profil actualizat cu succes." } : { type: "error", text: "Eroare la salvare." });
  };

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.next !== password.confirm) {
      setPasswordMsg({ type: "error", text: "Parolele nu coincid." });
      return;
    }
    setLoadingPassword(true);
    setPasswordMsg(null);
    const res = await fetch("/api/portal/settings/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: password.current, newPassword: password.next }),
    });
    setLoadingPassword(false);
    if (res.ok) {
      setPasswordMsg({ type: "success", text: "Parola a fost schimbată." });
      setPassword({ current: "", next: "", confirm: "" });
    } else {
      const data = await res.json();
      setPasswordMsg({ type: "error", text: data.error || "Eroare la schimbarea parolei." });
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={saveProfile} className="p-6 rounded-2xl space-y-4" style={{ background: "rgba(21,40,71,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <h2 className="text-base font-semibold text-white">Informații profil</h2>
        <div>
          <label className={labelClass}>Nume complet</label>
          <input className={inputClass} style={inputStyle} value={profile.name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} required />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input type="email" className={inputClass} style={inputStyle} value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} required />
        </div>
        <div>
          <label className={labelClass}>Telefon</label>
          <input className={inputClass} style={inputStyle} value={profile.phone} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} />
        </div>
        {profileMsg && (
          <p className="text-sm" style={{ color: profileMsg.type === "success" ? "#10B981" : "#EF4444" }}>{profileMsg.text}</p>
        )}
        <button type="submit" disabled={loadingProfile} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#0E1D33] hover:opacity-90 disabled:opacity-60" style={{ background: "#D4A843" }}>
          {loadingProfile ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          {loadingProfile ? "Se salvează..." : "Salvează"}
        </button>
      </form>

      <form onSubmit={savePassword} className="p-6 rounded-2xl space-y-4" style={{ background: "rgba(21,40,71,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <h2 className="text-base font-semibold text-white">Schimbă parola</h2>
        <div>
          <label className={labelClass}>Parola curentă</label>
          <input type="password" className={inputClass} style={inputStyle} value={password.current} onChange={(e) => setPassword((p) => ({ ...p, current: e.target.value }))} required />
        </div>
        <div>
          <label className={labelClass}>Parola nouă</label>
          <input type="password" className={inputClass} style={inputStyle} value={password.next} onChange={(e) => setPassword((p) => ({ ...p, next: e.target.value }))} required minLength={8} />
        </div>
        <div>
          <label className={labelClass}>Confirmare parolă nouă</label>
          <input type="password" className={inputClass} style={inputStyle} value={password.confirm} onChange={(e) => setPassword((p) => ({ ...p, confirm: e.target.value }))} required />
        </div>
        {passwordMsg && (
          <p className="text-sm" style={{ color: passwordMsg.type === "success" ? "#10B981" : "#EF4444" }}>{passwordMsg.text}</p>
        )}
        <button type="submit" disabled={loadingPassword} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#0E1D33] hover:opacity-90 disabled:opacity-60" style={{ background: "#D4A843" }}>
          {loadingPassword ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          {loadingPassword ? "Se salvează..." : "Schimbă parola"}
        </button>
      </form>
    </div>
  );
}
