// Shell pentru paginile editoriale cu intenție comercială
// (/cat-costa-un-site, /pret-magazin-online, comparațiile).
// Server component — conținutul trebuie să fie în HTML de la prima încărcare.

import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import ServiceNavbar from "@/components/ServiceNavbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export function InfoPageShell({
  h1,
  subtitle,
  breadcrumb,
  updated,
  children,
  ctaTitle = "Vrei o estimare pentru proiectul tău?",
  ctaText = "Primul apel este gratuit și se termină cu un preț și un termen concrete, nu cu o ofertă vagă.",
}: {
  h1: string;
  subtitle: string;
  breadcrumb: string;
  updated: string;
  children: React.ReactNode;
  ctaTitle?: string;
  ctaText?: string;
}) {
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Bună! Aș dori o estimare de preț pentru proiectul meu."
  )}`;

  return (
    <>
      <ServiceNavbar />

      <section
        className="relative pt-32 pb-14 md:pt-40 md:pb-20 overflow-hidden"
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
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-sm mb-8"
            style={{ color: "var(--color-text-muted)" }}
          >
            <Link href="/" style={{ color: "var(--color-text-muted)" }}>
              Acasă
            </Link>
            <span>/</span>
            <span style={{ color: "var(--color-gold)" }}>{breadcrumb}</span>
          </nav>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6"
            style={{
              color: "var(--color-text-on-dark)",
              fontFamily: "var(--font-display)",
              lineHeight: 1.15,
            }}
          >
            {h1}
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto mb-6"
            style={{ color: "var(--color-text-on-dark)", opacity: 0.78 }}
          >
            {subtitle}
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            Actualizat: {updated}
          </p>
        </div>
      </section>

      <article style={{ background: "var(--color-surface)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          {children}
        </div>
      </article>

      <section className="py-16 md:py-20" style={{ background: "var(--color-midnight)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-2xl sm:text-3xl font-black mb-4"
            style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
          >
            {ctaTitle}
          </h2>
          <p className="text-lg mb-8" style={{ color: "var(--color-text-on-dark)", opacity: 0.75 }}>
            {ctaText}
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

// ── Primitive de conținut ─────────────────────────────────────────────────────

export function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="text-2xl sm:text-3xl font-bold mt-12 mb-5 first:mt-0"
      style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
    >
      {children}
    </h2>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-xl font-bold mt-8 mb-3"
      style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
    >
      {children}
    </h3>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-lg leading-relaxed mb-5" style={{ color: "var(--color-text-secondary)" }}>
      {children}
    </p>
  );
}

export function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mb-6 space-y-3">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 text-lg leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <span
            className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: "var(--color-gold)" }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function PriceTable({
  head,
  rows,
  note,
}: {
  head: string[];
  rows: string[][];
  note?: string;
}) {
  return (
    <div className="mb-6">
      <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid var(--color-border-warm)" }}>
        <table className="w-full text-left border-collapse" style={{ background: "#FFFFFF" }}>
          <thead>
            <tr style={{ background: "var(--color-surface-warm)" }}>
              {head.map((cell) => (
                <th
                  key={cell}
                  className="px-4 py-3 text-sm font-bold whitespace-nowrap"
                  style={{
                    color: "var(--color-text-primary)",
                    borderBottom: "1px solid var(--color-border-warm)",
                  }}
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="px-4 py-3 align-top"
                    style={{
                      color: j === 0 ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                      fontWeight: j === 0 ? 600 : 400,
                      borderTop: i === 0 ? "none" : "1px solid var(--color-border-warm)",
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && (
        <p className="mt-3 text-sm" style={{ color: "var(--color-text-muted)" }}>
          {note}
        </p>
      )}
    </div>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="p-5 rounded-2xl mb-6 text-lg leading-relaxed"
      style={{
        background: "var(--color-surface-warm)",
        borderLeft: "3px solid var(--color-gold)",
        color: "var(--color-text-primary)",
      }}
    >
      {children}
    </div>
  );
}

export function Faq({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="space-y-3 mb-6">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-xl overflow-hidden"
          style={{ background: "#FFFFFF", border: "1px solid var(--color-border-warm)" }}
        >
          <summary
            className="cursor-pointer list-none p-5 flex items-start justify-between gap-4"
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
          <div className="px-5 pb-5 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}

export function RelatedLinks({ links }: { links: { href: string; label: string }[] }) {
  return (
    <ul className="flex flex-wrap gap-2.5 mt-4">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-opacity hover:opacity-75"
            style={{
              background: "#FFFFFF",
              border: "1px solid var(--color-border-warm)",
              color: "var(--color-navy)",
            }}
          >
            {link.label} <ArrowRight size={13} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function faqJsonLd(url: string, items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
