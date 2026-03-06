"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { SERVICES_DATA } from "@/lib/services-data";

export default function ServiceNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-services-dropdown]")) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const navLinks = [
    { label: "Servicii", href: "/#servicii" },
    { label: "Portofoliu", href: "/#portofoliu" },
    { label: "Prețuri", href: "/#preturi" },
    { label: "Despre noi", href: "/#despre" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div
          className={`transition-all duration-300 ${
            scrolled ? "glass-light" : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20 md:h-24">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center gap-3 flex-shrink-0 focus-visible:outline-none"
                aria-label="AiWANT — acasă"
              >
                <Image
                  src="/images/logo.png"
                  alt="AiWANT"
                  width={52}
                  height={52}
                  style={{ height: 52, width: "auto", objectFit: "contain" }}
                  priority
                />
                <div className="text-left leading-none">
                  <div
                    className="font-black tracking-widest text-xl"
                    style={{
                      color: scrolled
                        ? "var(--color-navy)"
                        : "var(--color-text-on-dark)",
                      fontFamily: "var(--font-display)",
                      letterSpacing: "0.15em",
                    }}
                  >
                    AiWANT
                  </div>
                  <div
                    className="text-[9px] font-semibold tracking-widest mt-0.5"
                    style={{
                      color: scrolled
                        ? "var(--color-navy)"
                        : "var(--color-gold)",
                      letterSpacing: "0.12em",
                    }}
                  >
                    PROCESS & BUSINESS AUTOMATION
                  </div>
                </div>
              </Link>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) =>
                  link.label === "Servicii" ? (
                    // Services dropdown
                    <div
                      key="servicii"
                      className="relative"
                      data-services-dropdown
                    >
                      <button
                        onClick={() => setServicesOpen((p) => !p)}
                        className="flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none rounded-lg"
                        style={{
                          color: scrolled
                            ? "var(--color-text-primary)"
                            : "var(--color-text-on-dark)",
                        }}
                      >
                        Servicii
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${
                            servicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 mt-2 w-56 rounded-xl overflow-hidden shadow-xl"
                            style={{
                              background: "var(--color-midnight)",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }}
                          >
                            {SERVICES_DATA.map((s) => (
                              <Link
                                key={s.slug}
                                href={`/servicii/${s.slug}`}
                                onClick={() => setServicesOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-150 hover:bg-white/5"
                                style={{ color: "var(--color-text-on-dark)" }}
                              >
                                {s.title}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none rounded-lg hover:opacity-80"
                      style={{
                        color: scrolled
                          ? "var(--color-text-primary)"
                          : "var(--color-text-on-dark)",
                      }}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>

              {/* Desktop CTA */}
              <div className="hidden md:block">
                <Link
                  href="/#contact"
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:scale-105 focus-visible:outline-none inline-block"
                  style={{ background: "var(--color-gold)" }}
                >
                  Solicită ofertă
                </Link>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen((p) => !p)}
                className="md:hidden p-2 rounded-lg focus-visible:outline-none"
                style={{
                  color: scrolled
                    ? "var(--color-text-primary)"
                    : "var(--color-text-on-dark)",
                }}
                aria-label={mobileOpen ? "Închide meniu" : "Deschide meniu"}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

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
            <nav className="flex flex-col gap-1 mt-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-left px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200"
                    style={{ color: "var(--color-text-on-dark)" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Services list in mobile */}
              <div
                className="mt-2 rounded-xl overflow-hidden"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <p
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--color-gold)" }}
                >
                  Servicii
                </p>
                {SERVICES_DATA.map((s, i) => (
                  <motion.div
                    key={s.slug}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                  >
                    <Link
                      href={`/servicii/${s.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-2.5 text-sm transition-colors duration-150"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {s.title}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <Link
                href="/#contact"
                onClick={() => setMobileOpen(false)}
                className="block w-full py-3 rounded-lg font-semibold text-white text-center"
                style={{ background: "var(--color-gold)" }}
              >
                Solicită ofertă
              </Link>
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
