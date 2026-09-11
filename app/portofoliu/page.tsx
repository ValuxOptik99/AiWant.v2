import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import { PORTFOLIO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Portofoliu — Proiecte Web & Automatizări",
  description:
    "Proiecte livrate de AiWANT: platforme digitale, automatizări și infrastructură business pentru firme din România. Studii de caz cu rezultate concrete.",
  alternates: { canonical: "/portofoliu" },
};

export default function PortofoliuPage() {
  const industriesCount = new Set(PORTFOLIO.map((p) => p.tag)).size;

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--color-midnight)", minHeight: "100vh" }}>
        {/* Hero */}
        <section className="relative pt-36 pb-16 px-4 overflow-hidden" style={{ background: "var(--color-midnight)" }}>
          <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(212,168,67,0.08) 0%, transparent 70%)" }}
          />

          <div className="relative max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-sm mb-8" style={{ color: "var(--color-text-muted)" }}>
              <Link href="/" className="hover:opacity-80 transition-opacity" style={{ color: "var(--color-text-muted)" }}>
                Acasă
              </Link>
              <span>/</span>
              <span style={{ color: "var(--color-gold)" }}>Portofoliu</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black mb-5 leading-tight"
              style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
            >
              Proiecte care lucrează pentru{" "}
              <span style={{ color: "var(--color-gold)" }}>clienții noștri</span>
            </h1>

            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              Fiecare proiect a rezolvat o problemă reală de business. Iată cum.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-8 text-sm" style={{ color: "var(--color-text-muted)" }}>
              <span>
                <span className="font-bold text-white">{PORTFOLIO.length}</span> proiecte livrate
              </span>
              <span className="w-1 h-1 rounded-full" style={{ background: "var(--color-text-muted)" }} />
              <span>
                <span className="font-bold text-white">100%</span> cod sursă predat
              </span>
              <span className="w-1 h-1 rounded-full" style={{ background: "var(--color-text-muted)" }} />
              <span>
                clienți din <span className="font-bold text-white">{industriesCount}</span> industrii
              </span>
            </div>
          </div>
        </section>

        {/* Projects grid */}
        <section className="px-4 py-16 lg:py-20" style={{ background: "var(--color-surface)" }}>
          <div className="max-w-7xl mx-auto">
            <PortfolioGrid />
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 py-24 lg:py-32" style={{ background: "var(--color-midnight)" }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
            >
              Vrei un proiect ca acestea?
            </h2>
            <p className="text-lg mb-10" style={{ color: "var(--color-text-muted)" }}>
              Hai să discutăm despre ce ar putea face un site sau o automatizare pentru afacerea ta.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105"
                style={{ background: "var(--color-gold)", color: "var(--color-midnight)", boxShadow: "0 4px 20px rgba(212,168,67,0.25)" }}
              >
                Solicită ofertă gratuită
              </a>
              <a
                href="/#audit"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
                style={{ border: "2px solid var(--color-gold)", color: "var(--color-gold)", background: "transparent" }}
              >
                Analizează-ți site-ul gratuit →
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
