"use client";

import { useState } from "react";
import { Bell, BellOff } from "lucide-react";
import { useRouter } from "next/navigation";

type Notification = { id: string; title: string; message: string; read: boolean; link?: string | null; createdAt: string };

export default function NotificationList({ notifications }: { notifications: Notification[] }) {
  const router = useRouter();
  const [items, setItems] = useState(notifications);
  const [loading, setLoading] = useState(false);

  const markAllRead = async () => {
    setLoading(true);
    await fetch("/api/portal/notifications/read-all", { method: "POST" });
    setItems((p) => p.map((n) => ({ ...n, read: true })));
    setLoading(false);
    router.refresh();
  };

  const markRead = async (id: string) => {
    await fetch(`/api/portal/notifications/${id}/read`, { method: "POST" });
    setItems((p) => p.map((n) => (n.id === id ? { ...n, read: true } : n)));
    router.refresh();
  };

  const unread = items.filter((n) => !n.read).length;

  return (
    <div className="space-y-4">
      {unread > 0 && (
        <button onClick={markAllRead} disabled={loading} className="text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-150" style={{ background: "rgba(212,168,67,0.1)", color: "var(--color-gold)" }}>
          Marchează toate ca citite ({unread})
        </button>
      )}

      {items.length === 0 ? (
        <div className="rounded-xl p-12 text-center" style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}>
          <BellOff size={32} className="mx-auto mb-3" style={{ color: "var(--color-text-muted)" }} />
          <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>Nu ai notificări.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((n) => (
            <div
              key={n.id}
              className="flex items-start gap-4 p-5 rounded-xl cursor-pointer transition-colors duration-150"
              style={{ background: n.read ? "#fff" : "rgba(212,168,67,0.05)", border: `1px solid ${n.read ? "var(--color-border-warm)" : "rgba(212,168,67,0.2)"}` }}
              onClick={() => { if (!n.read) markRead(n.id); if (n.link) router.push(n.link); }}
            >
              <div className="mt-0.5 flex-shrink-0">
                <Bell size={16} style={{ color: n.read ? "var(--color-text-muted)" : "var(--color-gold)" }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{n.title}</p>
                <p className="text-sm mt-0.5" style={{ color: "var(--color-text-secondary)" }}>{n.message}</p>
                <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
                  {new Date(n.createdAt).toLocaleDateString("ro-RO", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              {!n.read && <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: "var(--color-gold)" }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
