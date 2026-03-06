"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Receipt,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  { label: "Dashboard", href: "/portal", icon: LayoutDashboard },
  { label: "Proiecte", href: "/portal/projects", icon: FolderKanban },
  { label: "Documente", href: "/portal/documents", icon: FileText },
  { label: "Facturi", href: "/portal/invoices", icon: Receipt },
  { label: "Notificări", href: "/portal/notifications", icon: Bell },
  { label: "Setări", href: "/portal/settings", icon: Settings },
];

function SidebarContent({
  pathname,
  unreadCount,
  userName,
  userEmail,
  onClose,
}: {
  pathname: string;
  unreadCount: number;
  userName: string;
  userEmail: string;
  onClose?: () => void;
}) {
  return (
    <div className="flex flex-col h-full" style={{ background: "var(--color-midnight)" }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b" style={{ borderColor: "var(--color-border-dark)" }}>
        <Image src="/images/logo.png" alt="AiWANT" width={36} height={36} style={{ height: 36, width: "auto" }} />
        <div>
          <div className="font-black text-base tracking-widest" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>AiWANT</div>
          <div className="text-[8px] font-semibold" style={{ color: "var(--color-gold)", letterSpacing: "0.1em" }}>CLIENT PORTAL</div>
        </div>
        {onClose && (
          <button onClick={onClose} className="ml-auto" style={{ color: "var(--color-text-muted)" }}>
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {NAV.map((item) => {
          const isActive = item.href === "/portal" ? pathname === "/portal" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 group relative"
              style={{
                background: isActive ? "rgba(212,168,67,0.12)" : "transparent",
                color: isActive ? "var(--color-gold)" : "var(--color-text-muted)",
              }}
            >
              <Icon size={18} strokeWidth={isActive ? 2 : 1.8} />
              <span>{item.label}</span>
              {item.label === "Notificări" && unreadCount > 0 && (
                <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "var(--color-gold)", color: "var(--color-midnight)" }}>
                  {unreadCount}
                </span>
              )}
              {isActive && <ChevronRight size={14} className="ml-auto" style={{ color: "var(--color-gold)" }} />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-4 pb-6 space-y-2 border-t pt-4" style={{ borderColor: "var(--color-border-dark)" }}>
        <Link href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors duration-150" style={{ color: "var(--color-text-muted)" }}>
          <ExternalLink size={16} />
          Înapoi la site
        </Link>

        <div className="px-4 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
          <p className="text-sm font-medium truncate" style={{ color: "var(--color-text-on-dark)" }}>{userName}</p>
          <p className="text-xs truncate" style={{ color: "var(--color-text-muted)" }}>{userEmail}</p>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors duration-150"
          style={{ color: "var(--color-text-muted)" }}
        >
          <LogOut size={16} />
          Deconectare
        </button>
      </div>
    </div>
  );
}

export default function Sidebar({ unreadCount, userName, userEmail }: { unreadCount: number; userName: string; userEmail: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 flex-shrink-0 sticky top-0 h-screen" style={{ background: "var(--color-midnight)", borderRight: "1px solid var(--color-border-dark)" }}>
        <SidebarContent pathname={pathname} unreadCount={unreadCount} userName={userName} userEmail={userEmail} />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-4 sticky top-0 z-40" style={{ background: "var(--color-midnight)", borderBottom: "1px solid var(--color-border-dark)" }}>
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="AiWANT" width={32} height={32} style={{ height: 32, width: "auto" }} />
          <span className="font-black text-sm tracking-widest" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>AiWANT</span>
        </div>
        <button onClick={() => setMobileOpen(true)} style={{ color: "var(--color-text-on-dark)" }}>
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div className="fixed inset-0 z-50 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: "rgba(0,0,0,0.6)" }} onClick={() => setMobileOpen(false)} />
            <motion.div className="fixed inset-y-0 left-0 z-50 w-72 md:hidden" initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
              <SidebarContent pathname={pathname} unreadCount={unreadCount} userName={userName} userEmail={userEmail} onClose={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
