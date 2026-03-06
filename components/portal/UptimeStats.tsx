"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type Check = { responseTime: number | null; status: string; checkedAt: string };

export default function UptimeStats({
  lastCheck,
  uptime24h,
  avgResponseTime,
  checks,
}: {
  lastCheck: Check | null;
  uptime24h: string | null;
  avgResponseTime: number | null;
  checks: Check[];
}) {
  const isOnline = lastCheck?.status === "UP";

  return (
    <div className="rounded-xl p-6 space-y-6" style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}>
      <h2 className="font-bold" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>Disponibilitate (Uptime)</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Status */}
        <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: isOnline ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)" }}>
          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: isOnline ? "#10B981" : "#EF4444" }} />
          <div>
            <p className="text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>Status curent</p>
            <p className="font-bold text-lg" style={{ color: isOnline ? "#10B981" : "#EF4444" }}>{lastCheck ? (isOnline ? "Online" : "Offline") : "Necunoscut"}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl" style={{ background: "var(--color-surface-warm)" }}>
          <p className="text-xs font-medium mb-1" style={{ color: "var(--color-text-secondary)" }}>Uptime (24h)</p>
          <p className="font-bold text-lg" style={{ color: "var(--color-text-primary)" }}>{uptime24h ? `${uptime24h}%` : "—"}</p>
        </div>

        <div className="p-4 rounded-xl" style={{ background: "var(--color-surface-warm)" }}>
          <p className="text-xs font-medium mb-1" style={{ color: "var(--color-text-secondary)" }}>Timp răspuns mediu</p>
          <p className="font-bold text-lg" style={{ color: "var(--color-text-primary)" }}>{avgResponseTime ? `${avgResponseTime} ms` : "—"}</p>
        </div>
      </div>

      {checks.length > 0 && (
        <div>
          <p className="text-xs font-medium mb-3" style={{ color: "var(--color-text-secondary)" }}>Timp de răspuns (ultimele 48 verificări)</p>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={checks} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="checkedAt" tick={false} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#8A9BB5" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "var(--color-midnight)", border: "none", borderRadius: 8, fontSize: 12, color: "var(--color-text-on-dark)" }}
                formatter={(v) => [`${v} ms`, "Timp răspuns"]}
                labelFormatter={() => ""}
              />
              <Area type="monotone" dataKey="responseTime" stroke="#D4A843" fill="rgba(212,168,67,0.12)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {!lastCheck && (
        <p className="text-sm text-center" style={{ color: "var(--color-text-secondary)" }}>Nu există date de uptime. Monitorizarea va începe în curând.</p>
      )}
    </div>
  );
}
