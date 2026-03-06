"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Globe,
  LayoutDashboard,
  ShoppingCart,
  Bot,
  Palette,
  Megaphone,
  Paintbrush,
  Smartphone,
  Search,
  Mail,
  Lock,
  Zap,
  Server,
  FileText,
  ClipboardList,
  Database,
  Users,
  Cable,
  Bell,
  BookOpen,
  LayoutGrid,
  ShoppingBag,
  CreditCard,
  Package,
  BarChart2,
  Workflow,
  BarChart3,
  LayoutTemplate,
  MousePointer,
  Calendar,
  MessageCircle,
  TrendingUp,
  CheckCircle,
  XCircle,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Phone,
  MessageSquare,
  ImageIcon,
  type LucideIcon,
} from "lucide-react";
import { ServiceData, getOtherServices } from "@/lib/services-data";
import ServiceNavbar from "@/components/ServiceNavbar";

// ── Icon map ─────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, LucideIcon> = {
  Globe,
  LayoutDashboard,
  ShoppingCart,
  Bot,
  Palette,
  Megaphone,
  Paintbrush,
  Smartphone,
  Search,
  Mail,
  Lock,
  Zap,
  Server,
  FileText,
  ClipboardList,
  Database,
  Users,
  Cable,
  Bell,
  BookOpen,
  LayoutGrid,
  ShoppingBag,
  CreditCard,
  Package,
  BarChart2,
  Workflow,
  BarChart3,
  LayoutTemplate,
  MousePointer,
  Calendar,
  MessageCircle,
  TrendingUp,
  ImageIcon,
};

function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] || Globe;
}

// ── Scroll reveal wrapper ─────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Section: Hero ─────────────────────────────────────────────────────────────
function HeroSection({ service }: { service: ServiceData }) {
  const Icon = getIcon(service.icon);
  return (
    <section
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
      style={{ background: "var(--color-midnight)" }}
    >
      {/* Background grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-gold) 1px, transparent 1px), linear-gradient(90deg, var(--color-gold) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow blob */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "var(--color-gold)" }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center gap-2 text-sm mb-8"
          style={{ color: "var(--color-text-muted)" }}
        >
          <Link
            href="/"
            className="hover:opacity-80 transition-opacity"
            style={{ color: "var(--color-text-muted)" }}
          >
            Acasă
          </Link>
          <span>/</span>
          <Link
            href="/#servicii"
            className="hover:opacity-80 transition-opacity"
            style={{ color: "var(--color-text-muted)" }}
          >
            Servicii
          </Link>
          <span>/</span>
          <span style={{ color: "var(--color-gold)" }}>{service.title}</span>
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(212,168,67,0.12)", border: "1px solid rgba(212,168,67,0.25)" }}
          >
            <Icon size={40} strokeWidth={1.5} style={{ color: "var(--color-gold)" }} />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6"
          style={{
            color: "var(--color-text-on-dark)",
            fontFamily: "var(--font-display)",
            lineHeight: 1.1,
          }}
        >
          {service.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
          style={{ color: "var(--color-text-muted)" }}
        >
          {service.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/#contact"
            className="px-8 py-4 rounded-xl text-base font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{ background: "var(--color-gold)" }}
          >
            Solicită ofertă gratuită
          </Link>
          <a
            href={`https://wa.me/40749997163?text=Bună%2C%20sunt%20interesat%20de%20${encodeURIComponent(service.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium transition-opacity duration-200 hover:opacity-70"
            style={{ color: "var(--color-text-on-dark)" }}
          >
            Sau contactează-mă pe WhatsApp
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ── Section: Problem & Solution ───────────────────────────────────────────────
function ProblemSolutionSection({ service }: { service: ServiceData }) {
  return (
    <section className="py-20 lg:py-28" style={{ background: "var(--color-surface)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
          >
            De ce ai nevoie de {service.title.toLowerCase()}?
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Problems */}
          <Reveal delay={0.1}>
            <div
              className="rounded-2xl p-8"
              style={{ background: "#fff", border: "1px solid var(--color-border-warm)" }}
            >
              <h3
                className="text-xl font-bold mb-6"
                style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
              >
                Provocările cu care te confrunți
              </h3>
              <ul className="space-y-4">
                {service.problems.map((p, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <XCircle
                      size={18}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: "#E05252" }}
                    />
                    <span
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {p}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Solutions */}
          <Reveal delay={0.2}>
            <div
              className="rounded-2xl p-8"
              style={{
                background: "var(--color-midnight)",
                border: "1px solid rgba(212,168,67,0.15)",
              }}
            >
              <h3
                className="text-xl font-bold mb-6"
                style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
              >
                Cum rezolvăm
              </h3>
              <ul className="space-y-4">
                {service.solutions.map((s, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle
                      size={18}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: "var(--color-gold)" }}
                    />
                    <span
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--color-text-on-dark)" }}
                    >
                      {s}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── Section: What's Included ──────────────────────────────────────────────────
function WhatsIncludedSection({ service }: { service: ServiceData }) {
  return (
    <section
      className="py-20 lg:py-28"
      style={{ background: "var(--color-surface-warm)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
          >
            Ce primești concret
          </h2>
          <p className="text-lg" style={{ color: "var(--color-text-secondary)" }}>
            Fiecare proiect include toate acestea, fără costuri ascunse.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {service.features.map((feature, i) => {
            const Icon = getIcon(feature.icon);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                }}
                whileHover={{ y: -4 }}
                className="rounded-xl p-6 flex flex-col gap-3 transition-shadow duration-300 hover:shadow-lg"
                style={{
                  background: "#fff",
                  border: "1px solid var(--color-border-warm)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(212,168,67,0.1)" }}
                >
                  <Icon size={20} strokeWidth={1.8} style={{ color: "var(--color-gold)" }} />
                </div>
                <h3
                  className="font-bold text-base"
                  style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Section: Process Timeline ─────────────────────────────────────────────────
function ProcessSection({ service }: { service: ServiceData }) {
  return (
    <section
      className="py-20 lg:py-28"
      style={{ background: "var(--color-midnight)" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
          >
            Cum lucrăm la {service.title.toLowerCase()}
          </h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            Un proces clar, transparent, cu livrabile la fiecare pas.
          </p>
        </Reveal>

        <div className="relative">
          {/* Connecting line */}
          <div
            className="absolute left-6 top-8 bottom-8 w-px"
            style={{ background: "rgba(212,168,67,0.2)" }}
          />

          <div className="space-y-8">
            {service.process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex gap-6"
              >
                {/* Step number bubble */}
                <div className="relative flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-black z-10 relative"
                    style={{
                      background: "var(--color-gold)",
                      color: "var(--color-midnight)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {String(step.step).padStart(2, "0")}
                  </div>
                </div>

                {/* Content */}
                <div
                  className="flex-1 rounded-xl p-6"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3
                      className="font-bold text-lg"
                      style={{
                        color: "var(--color-text-on-dark)",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {step.title}
                    </h3>
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                      style={{
                        background: "rgba(212,168,67,0.15)",
                        color: "var(--color-gold)",
                      }}
                    >
                      {step.timeframe}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section: Real Projects ────────────────────────────────────────────────────
function ProjectsSection({ service }: { service: ServiceData }) {
  const hasProjects = service.projects.length > 0;

  return (
    <section
      className="py-20 lg:py-28"
      style={{ background: "var(--color-surface)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
          >
            Proiecte realizate
          </h2>
          {service.projectsNote && (
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {service.projectsNote}
            </p>
          )}
        </Reveal>

        {hasProjects ? (
          <div
            className={`grid gap-8 ${
              service.projects.length === 1
                ? "max-w-2xl mx-auto"
                : service.projects.length === 2
                ? "md:grid-cols-2 max-w-4xl mx-auto"
                : "md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {service.projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-xl"
                style={{
                  background: "#fff",
                  border: "1px solid var(--color-border-warm)",
                }}
              >
                {/* Screenshot */}
                <div
                  className="relative h-48 overflow-hidden"
                  style={{ background: "var(--color-slate-deep)" }}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="text-xs font-semibold tracking-widest uppercase"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        Proiect intern
                      </span>
                    </div>
                  )}
                  {/* Gold overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "rgba(212,168,67,0.08)" }}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className="font-bold text-lg mb-2"
                    style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
                  >
                    {project.name}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{
                          background: "rgba(212,168,67,0.1)",
                          color: "var(--color-gold)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <Reveal>
            <div
              className="max-w-2xl mx-auto rounded-2xl p-10 text-center"
              style={{
                background: "var(--color-midnight)",
                border: "1px solid rgba(212,168,67,0.15)",
              }}
            >
              <p
                className="text-lg leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                {service.projectsNote ||
                  "Lucrăm în prezent la proiecte în această categorie. Contactează-ne pentru mai multe detalii."}
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

// ── Section: Pricing Preview ──────────────────────────────────────────────────
function PricingSection({ service }: { service: ServiceData }) {
  return (
    <section
      className="py-20 lg:py-28"
      style={{ background: "var(--color-slate-deep)" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-2"
            style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
          >
            Investiție orientativă
          </h2>
          <p className="mb-10" style={{ color: "var(--color-text-muted)" }}>
            Prețuri transparente, fără costuri ascunse.
          </p>
        </Reveal>

        {/* Price display */}
        <Reveal delay={0.1}>
          <div
            className="rounded-2xl p-8 mb-8"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(212,168,67,0.2)",
            }}
          >
            <div
              className="text-5xl font-black mb-2"
              style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
            >
              {service.pricingFrom}
            </div>
            <div className="text-lg mb-6" style={{ color: "var(--color-text-muted)" }}>
              {service.pricingFromRON}
            </div>

            {service.pricingExtra && service.pricingExtra.length > 0 && (
              <div className="space-y-3 text-left">
                {service.pricingExtra.map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-4 py-2"
                    style={{ borderTop: i === 0 ? "1px solid rgba(255,255,255,0.06)" : undefined }}
                  >
                    <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold" style={{ color: "var(--color-text-on-dark)" }}>
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        {/* Pricing factors */}
        <Reveal delay={0.2}>
          <div className="mb-8 text-left">
            <h3
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--color-gold)" }}
            >
              Ce influențează prețul
            </h3>
            <ul className="space-y-2">
              {service.pricingFactors.map((factor, i) => (
                <li key={i} className="flex items-center gap-3 text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "var(--color-gold)" }}
                  />
                  {factor}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.3}>
          <p
            className="text-base mb-6"
            style={{ color: "var(--color-text-muted)" }}
          >
            Fiecare proiect e unic. Solicită o ofertă personalizată.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-8 py-4 rounded-xl text-base font-bold text-white transition-all duration-200 hover:scale-105"
            style={{ background: "var(--color-gold)" }}
          >
            Solicită ofertă personalizată
          </Link>
        </Reveal>

        {/* Trust badges */}
        <Reveal delay={0.4}>
          <div
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            {["Fără costuri ascunse", "Cod sursă predat", "Suport post-livrare"].map(
              (badge) => (
                <span key={badge} className="flex items-center gap-1.5">
                  <CheckCircle size={14} style={{ color: "var(--color-gold)" }} />
                  {badge}
                </span>
              )
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Section: FAQ ──────────────────────────────────────────────────────────────
function FAQSection({ service }: { service: ServiceData }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="py-20 lg:py-28"
      style={{ background: "var(--color-surface-warm)" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
          >
            Întrebări frecvente
          </h2>
        </Reveal>

        <div className="space-y-3">
          {service.faq.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={i} delay={i * 0.06}>
                <div
                  className="rounded-xl overflow-hidden transition-shadow duration-200"
                  style={{
                    background: "#fff",
                    border: "1px solid var(--color-border-warm)",
                    boxShadow: isOpen ? "0 4px 24px rgba(0,0,0,0.06)" : "none",
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span
                      className="font-semibold text-base"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown
                        size={18}
                        style={{ color: "var(--color-gold)" }}
                      />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div
                          className="px-6 pb-5 text-sm leading-relaxed"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Section: Final CTA ────────────────────────────────────────────────────────
function FinalCTASection({ service }: { service: ServiceData }) {
  return (
    <section
      className="py-20 lg:py-28 text-center"
      style={{ background: "var(--color-midnight)" }}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
          >
            Hai să construim ceva mișto împreună
          </h2>
          <p className="text-lg mb-10" style={{ color: "var(--color-text-muted)" }}>
            Discuție inițială gratuită, fără obligații. Îți spun direct dacă și cum
            te pot ajuta.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              href="/#contact"
              className="px-8 py-4 rounded-xl text-base font-bold text-white transition-all duration-200 hover:scale-105 w-full sm:w-auto text-center"
              style={{ background: "var(--color-gold)" }}
            >
              Solicită ofertă gratuită
            </Link>
            <a
              href="tel:+40749997163"
              className="flex items-center gap-2 text-sm font-medium transition-opacity duration-200 hover:opacity-70"
              style={{ color: "var(--color-text-on-dark)" }}
            >
              <Phone size={16} style={{ color: "var(--color-gold)" }} />
              +40 749 997 163
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <Link
            href="/#servicii"
            className="inline-flex items-center gap-2 text-sm transition-opacity duration-200 hover:opacity-70"
            style={{ color: "var(--color-text-muted)" }}
          >
            <ArrowLeft size={14} />
            Vezi toate serviciile
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

// ── Section: Other Services ───────────────────────────────────────────────────
function OtherServicesSection({ currentSlug }: { currentSlug: string }) {
  const others = getOtherServices(currentSlug);

  return (
    <section className="py-16 lg:py-20" style={{ background: "var(--color-surface)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
          >
            Alte servicii
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {others.map((s, i) => {
            const Icon = getIcon(s.icon);
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
              >
                <Link
                  href={`/servicii/${s.slug}`}
                  className="group flex flex-col items-center gap-3 p-5 rounded-xl text-center transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                  style={{
                    background: "#fff",
                    border: "1px solid var(--color-border-warm)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200"
                    style={{ background: "rgba(212,168,67,0.08)" }}
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.8}
                      style={{ color: "var(--color-gold)" }}
                    />
                  </div>
                  <span
                    className="text-xs font-semibold leading-tight"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {s.title}
                  </span>
                  <ArrowRight
                    size={12}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 -mt-1"
                    style={{ color: "var(--color-gold)" }}
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Main template ─────────────────────────────────────────────────────────────
export default function ServicePageTemplate({ service }: { service: ServiceData }) {
  return (
    <>
      <ServiceNavbar />
      <main>
        <HeroSection service={service} />
        <ProblemSolutionSection service={service} />
        <WhatsIncludedSection service={service} />
        <ProcessSection service={service} />
        <ProjectsSection service={service} />
        <PricingSection service={service} />
        <FAQSection service={service} />
        <FinalCTASection service={service} />
        <OtherServicesSection currentSlug={service.slug} />
      </main>
    </>
  );
}
