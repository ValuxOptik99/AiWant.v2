"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { scrollToSection } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", "")).filter(Boolean);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = useCallback(
    (href: string) => {
      setMobileOpen(false);
      scrollToSection(href);
    },
    []
  );

  const handleCTA = () => {
    setMobileOpen(false);
    scrollToSection("#contact");
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={scrolled ? {} : {}}
        initial={false}
      >
        <div
          className={`transition-all duration-300 ${
            scrolled ? "glass-light" : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20 md:h-24">
              {/* Logo */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-3 flex-shrink-0 focus-visible:outline-none"
                aria-label="AIWANT — acasă"
              >
                {/* Icon — left */}
                <Image
                  src="/images/logo.png"
                  alt="AiWANT"
                  width={52}
                  height={52}
                  style={{ height: 52, width: "auto", objectFit: "contain" }}
                  priority
                />
                {/* Text block — right of icon */}
                <div className="text-left leading-none">
                  <div
                    className="font-black tracking-widest text-xl"
                    style={{
                      color: scrolled ? "var(--color-navy)" : "var(--color-text-on-dark)",
                      fontFamily: "var(--font-display)",
                      letterSpacing: "0.15em",
                    }}
                  >
                    AiWANT
                  </div>
                  <div
                    className="text-[9px] font-semibold tracking-widest mt-0.5"
                    style={{
                      color: scrolled ? "var(--color-navy)" : "var(--color-gold)",
                      letterSpacing: "0.12em",
                    }}
                  >
                    PROCESS & BUSINESS AUTOMATION
                  </div>
                </div>
              </button>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center gap-1">
                {NAV_LINKS.map((link) => {
                  const id = link.href.replace("#", "");
                  const isActive = activeSection === id;
                  return (
                    <button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none rounded-lg"
                      style={{
                        color: isActive
                          ? "var(--color-gold)"
                          : scrolled
                          ? "var(--color-text-primary)"
                          : "var(--color-text-on-dark)",
                      }}
                    >
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="nav-underline"
                          className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                          style={{ background: "var(--color-gold)" }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Desktop CTA */}
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/portal"
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-80 focus-visible:outline-none"
                  style={{
                    color: scrolled ? "var(--color-navy)" : "var(--color-text-on-dark)",
                    border: `1px solid ${scrolled ? "rgba(35,75,114,0.3)" : "rgba(255,255,255,0.2)"}`,
                  }}
                >
                  <User size={14} />
                  Contul meu
                </Link>
                <button
                  onClick={handleCTA}
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:scale-105 gold-glow-hover focus-visible:outline-none"
                  style={{ background: "var(--color-gold)" }}
                >
                  Solicită ofertă
                </button>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen((p) => !p)}
                className="md:hidden p-2 rounded-lg focus-visible:outline-none"
                style={{ color: scrolled ? "var(--color-text-primary)" : "var(--color-text-on-dark)" }}
                aria-label={mobileOpen ? "Închide meniu" : "Deschide meniu"}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-y-0 right-0 z-40 w-72 flex flex-col pt-20 px-6 pb-8 overflow-y-auto"
            style={{ background: "var(--color-midnight)" }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <nav className="flex flex-col gap-2 mt-4">
              {NAV_LINKS.map((link, i) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <motion.button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200"
                    style={{
                      color: isActive ? "var(--color-gold)" : "var(--color-text-on-dark)",
                      background: isActive ? "rgba(212,168,67,0.08)" : "transparent",
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    {link.label}
                  </motion.button>
                );
              })}
            </nav>
            <motion.div
              className="mt-4 flex flex-col gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Link
                href="/portal"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold text-sm border"
                style={{ color: "var(--color-text-on-dark)", borderColor: "rgba(255,255,255,0.2)" }}
              >
                <User size={15} />
                Contul meu
              </Link>
              <button
                onClick={handleCTA}
                className="w-full py-3 rounded-lg font-semibold text-white"
                style={{ background: "var(--color-gold)" }}
              >
                Solicită ofertă
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-30 md:hidden"
            style={{ background: "rgba(0,0,0,0.5)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
