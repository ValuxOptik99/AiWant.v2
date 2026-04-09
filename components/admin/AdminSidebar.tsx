"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Users, FolderKanban, Settings, LogOut, MessageSquare, Menu, X, ChevronRight, ExternalLink, Shield, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Clienți", href: "/admin/clients", icon: Users },
  { label: "Proiecte", href: "/admin/projects", icon: FolderKanban },
  { label: "Blog", href: "/admin/blog", icon: BookOpen },
  { label: "Contacte", href: "/admin/contacts", icon: MessageSquare },
  { label: "Setări", href: "/admin/settings", icon: Settings },
];

function SidebarContent({ pathname, onClose }: { pathname: string; onClose?: () => void }) {
  return (
    <div className="flex flex-col h-full" style={{ background: "#0A1628" }}>
      <div className="flex items-center gap-3 px-6 py-6 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <Image src="/images/logo.png" alt="AiWANT" width={36} height={36} style={{ height: 36, width: "auto" }} />
        <div>
          <div className="font-black text-base tracking-widest" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>AiWANT</div>
          <div className="flex items-center gap-1 text-[8px] font-semibold" style={{ color: "#EF4444", letterSpacing: "0.1em" }}>
            <Shield size={8} /> ADMIN PANEL
          </div>
        </div>
        {onClose && <button onClick={onClose} className="ml-auto" style={{ color: "rgba(255,255,255,0.5)" }}><X size={20} /></button>}
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {NAV.map((item) => {
          const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} onClick={onClose} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150"
              style={{ background: isActive ? "rgba(239,68,68,0.12)" : "transparent", color: isActive ? "#EF4444" : "rgba(255,255,255,0.6)" }}>
              <Icon size={18} />
              <span>{item.label}</span>
              {isActive && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 pb-6 space-y-2 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <Link href="/portal" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
          <ExternalLink size={16} /> Portal client
        </Link>
        <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
          <LogOut size={16} /> Deconectare
        </button>
      </div>
    </div>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <aside className="hidden md:flex flex-col w-64 flex-shrink-0 sticky top-0 h-screen" style={{ background: "#0A1628", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
        <SidebarContent pathname={pathname} />
      </aside>
      <div className="md:hidden flex items-center justify-between px-4 py-4 sticky top-0 z-40" style={{ background: "#0A1628", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <span className="font-black text-sm tracking-widest" style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}>ADMIN</span>
        <button onClick={() => setMobileOpen(true)} style={{ color: "rgba(255,255,255,0.8)" }}><Menu size={22} /></button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div className="fixed inset-0 z-50 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: "rgba(0,0,0,0.7)" }} onClick={() => setMobileOpen(false)} />
            <motion.div className="fixed inset-y-0 left-0 z-50 w-72 md:hidden" initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
              <SidebarContent pathname={pathname} onClose={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
