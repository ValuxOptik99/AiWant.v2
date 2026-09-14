// Server component — paginile locale trebuie să livreze HTML complet la
// prima încărcare, fără hidratare pentru conținutul indexabil. Navbar-ul și
// footer-ul rămân componente client (au interacțiune), restul e static.

import Link from "next/link";
import {
  Globe,
  ShoppingCart,
  Bot,
  MapPin,
  Check,
  ArrowRight,
  Phone,
  MessageSquare,
  Clock,
  Tag,
  type LucideIcon,
} from "lucide-react";
import ServiceNavbar from "@/components/ServiceNavbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import type { LocalPageCopy } from "@/lib/local-seo-copy";
import type { LocalPage } from "@/lib/local-seo-data";

const ICONS: Record<string, LucideIcon> = { Globe, ShoppingCart, Bot };

export default function LocalPageTemplate({
  page,
  copy,
}: {
  page: LocalPage;
  copy: LocalPageCopy;
}) {
  const Icon = ICONS[page.service.icon] ?? Globe;
  const { city, service } = page;

  const waMessage = encodeURIComponent(
    `Bună! Sunt din ${city.name} și aș dori o ofertă pentru ${service.label.toLowerCase()}.`
  );
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  return (
    <>
      <ServiceNavbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden"
        style={{ background: "var(--color-midnight)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-gold) 1px, transparent 1px), linear-gradient(90deg, var(--color-gold) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "var(--color-gold)" }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center justify-center gap-2 text-sm mb-8"
            style={{ color: "var(--color-text-muted)" }}
          >
            <Link href="/" style={{ color: "var(--color-text-muted)" }}>
              Acasă
            </Link>
            <span>/</span>
            <Link href={copy.parentHref} style={{ color: "var(--color-text-muted)" }}>
              {copy.parentLabel}
            </Link>
            <span>/</span>
            <span style={{ color: "var(--color-gold)" }}>{city.name}</span>
          </nav>

          <div className="flex justify-center mb-6">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{
                background: "rgba(212,168,67,0.12)",
                border: "1px solid rgba(212,168,67,0.25)",
              }}
            >
              <Icon size={40} strokeWidth={1.5} style={{ color: "var(--color-gold)" }} />
            </div>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6"
            style={{
              color: "var(--color-text-on-dark)",
              fontFamily: "var(--font-display)",
              lineHeight: 1.1,
            }}
          >
            {copy.h1}
          </h1>

          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-8"
            style={{ color: "var(--color-text-on-dark)", opacity: 0.78 }}
          >
            {copy.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10 text-sm">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: "rgba(212,168,67,0.1)",
                border: "1px solid rgba(212,168,67,0.25)",
                color: "var(--color-gold)",
              }}
            >
              <Tag size={15} /> de la {copy.priceFrom} ({copy.priceFromRON})
            </span>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: "rgba(240,236,227,0.06)",
                border: "1px solid var(--color-border-dark)",
                color: "var(--color-text-on-dark)",
              }}
            >
              <Clock size={15} /> livrare în {copy.delivery}
            </span>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: "rgba(240,236,227,0.06)",
                border: "1px solid var(--color-border-dark)",
                color: "var(--color-text-on-dark)",
              }}
            >
              <MapPin size={15} /> {city.name}, {city.county}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-transform hover:scale-[1.02]"
              style={{ background: "var(--color-gold)", color: "var(--color-midnight)" }}
            >
              <MessageSquare size={18} /> Cere o ofertă pe WhatsApp
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-opacity hover:opacity-80"
              style={{
                border: "1px solid var(--color-border-dark)",
                color: "var(--color-text-on-dark)",
              }}
            >
              <Phone size={18} /> Formular de contact
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONTEXT LOCAL ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: "var(--color-surface)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-6"
            style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
          >
            {service.label} pentru firme din {city.name}
          </h2>
          <p className="text-lg leading-relaxed mb-5" style={{ color: "var(--color-text-secondary)" }}>
            {copy.intro}
          </p>
          <p
            className="text-lg leading-relaxed pl-5"
            style={{
              color: "var(--color-text-primary)",
              borderLeft: "3px solid var(--color-gold)",
            }}
          >
            {copy.digitalNote}
          </p>
        </div>
      </section>

      {/* ── INDUSTRII LOCALE ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: "var(--color-surface-warm)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-3 text-center"
            style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
          >
            Ce cer domeniile puternice din {city.name}
          </h2>
          <p
            className="text-center max-w-2xl mx-auto mb-12"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Economia locală din {city.name} nu arată ca cea din alt oraș, deci nici
            soluția nu poate fi aceeași. Iată de la ce pornim.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {copy.industryBlocks.map((block) => (
              <div
                key={block.title}
                className="p-6 rounded-2xl"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid var(--color-border-warm)",
                }}
              >
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
                >
                  {block.title}
                </h3>
                <p style={{ color: "var(--color-text-secondary)" }}>{block.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CE INCLUDE ───────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: "var(--color-surface)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-10 text-center"
            style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
          >
            Ce include un proiect de {service.label.toLowerCase()}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {copy.includes.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{ background: "#FFFFFF", border: "1px solid var(--color-border-warm)" }}
              >
                <Check
                  size={20}
                  className="shrink-0 mt-0.5"
                  style={{ color: "var(--color-success)" }}
                />
                <span style={{ color: "var(--color-text-primary)" }}>{item}</span>
              </li>
            ))}
          </ul>

          <div
            className="mt-10 p-6 rounded-2xl text-center"
            style={{ background: "var(--color-slate-deep)" }}
          >
            <p className="text-sm mb-1" style={{ color: "var(--color-text-muted)" }}>
              Preț de pornire pentru {city.name}
            </p>
            <p
              className="text-3xl font-black mb-1"
              style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
            >
              de la {copy.priceFrom}
            </p>
            <p style={{ color: "var(--color-text-on-dark)", opacity: 0.7 }}>
              {copy.priceFromRON} · livrare în {copy.delivery} · fără tarif diferit pe oraș
            </p>
          </div>
        </div>
      </section>

      {/* ── ZONE DESERVITE ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: "var(--color-surface-warm)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
          >
            Zone deservite din {city.county === "București" ? "București și Ilfov" : `județul ${city.county}`}
          </h2>
          <p className="mb-8" style={{ color: "var(--color-text-secondary)" }}>
            {copy.areasIntro}
          </p>
          <ul className="flex flex-wrap gap-2.5">
            {copy.areas.map((area) => (
              <li
                key={area}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid var(--color-border-warm)",
                  color: "var(--color-text-primary)",
                }}
              >
                <MapPin size={14} style={{ color: "var(--color-gold-dark)" }} />
                {area}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: "var(--color-surface)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-10 text-center"
            style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
          >
            Întrebări frecvente — {service.label.toLowerCase()} {city.name}
          </h2>
          <div className="space-y-3">
            {copy.faq.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl overflow-hidden"
                style={{ background: "#FFFFFF", border: "1px solid var(--color-border-warm)" }}
              >
                <summary
                  className="cursor-pointer list-none p-5 font-semibold flex items-start justify-between gap-4"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  <h3 className="text-base font-semibold">{item.question}</h3>
                  <span
                    className="shrink-0 transition-transform group-open:rotate-45 text-xl leading-none"
                    style={{ color: "var(--color-gold-dark)" }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div
                  className="px-5 pb-5 leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── LINKURI INTERNE ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: "var(--color-surface-warm)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div>
            <h2
              className="text-xl sm:text-2xl font-bold mb-6"
              style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
            >
              Alte servicii în {city.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {copy.siblingServices.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="flex items-center justify-between gap-4 p-5 rounded-xl transition-opacity hover:opacity-80"
                  style={{ background: "#FFFFFF", border: "1px solid var(--color-border-warm)" }}
                >
                  <span>
                    <span
                      className="block font-semibold"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {s.label}
                    </span>
                    <span className="block text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      {s.blurb}
                    </span>
                  </span>
                  <ArrowRight size={18} style={{ color: "var(--color-gold-dark)" }} />
                </Link>
              ))}
            </div>
          </div>

          {copy.nearbyLinks.length > 0 && (
            <div>
              <h2
                className="text-xl sm:text-2xl font-bold mb-6"
                style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
              >
                {service.label} și în orașele din jur
              </h2>
              <ul className="flex flex-wrap gap-2.5">
                {copy.nearbyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block px-4 py-2 rounded-full text-sm transition-opacity hover:opacity-75"
                      style={{
                        background: "#FFFFFF",
                        border: "1px solid var(--color-border-warm)",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/orase"
                    className="inline-block px-4 py-2 rounded-full text-sm font-semibold transition-opacity hover:opacity-75"
                    style={{
                      background: "rgba(212,168,67,0.14)",
                      border: "1px solid rgba(212,168,67,0.35)",
                      color: "var(--color-gold-dark)",
                    }}
                  >
                    Toate orașele →
                  </Link>
                </li>
              </ul>
            </div>
          )}

          <div>
            <p style={{ color: "var(--color-text-secondary)" }}>
              Vezi și pagina națională de serviciu:{" "}
              <Link
                href={copy.parentHref}
                className="font-semibold underline underline-offset-4"
                style={{ color: "var(--color-gold-dark)" }}
              >
                {copy.parentLabel}
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: "var(--color-midnight)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-2xl sm:text-4xl font-black mb-4"
            style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
          >
            Discutăm despre proiectul tău din {city.name}?
          </h2>
          <p className="text-lg mb-8" style={{ color: "var(--color-text-on-dark)", opacity: 0.75 }}>
            Primul apel este gratuit și se termină cu o estimare clară de preț și termen —
            nu cu o ofertă vagă.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-transform hover:scale-[1.02]"
              style={{ background: "var(--color-gold)", color: "var(--color-midnight)" }}
            >
              <MessageSquare size={18} /> Scrie-ne pe WhatsApp
            </a>
            <Link
              href="/configurator"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-opacity hover:opacity-80"
              style={{
                border: "1px solid var(--color-border-dark)",
                color: "var(--color-text-on-dark)",
              }}
            >
              Configurează o ofertă <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
