// Hub-ul paginilor locale. Fără el, cele ~135 de pagini pe oraș ar fi
// orfane — Google le-ar găsi doar din sitemap, ceea ce înseamnă indexare
// lentă și autoritate internă zero. De aici pleacă un link către fiecare.

import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import ServiceNavbar from "@/components/ServiceNavbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CITIES, LOCAL_SERVICES, LOCAL_SERVICE_ORDER } from "@/lib/local-seo-data";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Orașe în care lucrăm — Site-uri, Magazine Online și Automatizări",
  description:
    "Creăm site-uri de prezentare, magazine online și automatizări pentru firme din toate reședințele de județ din România. Alege orașul tău și vezi oferta locală.",
  alternates: { canonical: "/orase" },
  openGraph: {
    title: "Orașe în care lucrăm | AiWANT",
    description:
      "Site-uri, magazine online și automatizări pentru firme din toate reședințele de județ din România.",
    url: "/orase",
    siteName: "AiWANT",
    locale: "ro_RO",
    type: "website",
  },
};

const REGION_ORDER = [
  "Dobrogea",
  "Muntenia",
  "Oltenia",
  "Moldova",
  "Bucovina",
  "Transilvania",
  "Banat",
  "Crișana",
  "Maramureș",
];

export default function OrasePage() {
  const byRegion = REGION_ORDER.map((region) => ({
    region,
    cities: CITIES.filter((c) => c.region === region).sort((a, b) =>
      a.name.localeCompare(b.name, "ro")
    ),
  })).filter((group) => group.cities.length > 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/orase#page`,
    name: "Orașe în care lucrăm",
    url: `${SITE_URL}/orase`,
    isPartOf: { "@id": `${SITE_URL}/#organization` },
    about: CITIES.map((city) => ({ "@type": "City", name: city.name })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceNavbar />

      <section
        className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden"
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
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-sm mb-8"
            style={{ color: "var(--color-text-muted)" }}
          >
            <Link href="/" style={{ color: "var(--color-text-muted)" }}>
              Acasă
            </Link>
            <span>/</span>
            <span style={{ color: "var(--color-gold)" }}>Orașe</span>
          </nav>

          <h1
            className="text-4xl sm:text-5xl font-black mb-6"
            style={{
              color: "var(--color-text-on-dark)",
              fontFamily: "var(--font-display)",
              lineHeight: 1.1,
            }}
          >
            Orașe în care lucrăm
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--color-text-on-dark)", opacity: 0.78 }}
          >
            Suntem din Constanța și lucrăm integral la distanță, cu firme din toată
            România. Alege orașul tău ca să vezi oferta locală pentru site-uri,
            magazine online și automatizări.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20" style={{ background: "var(--color-surface)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {byRegion.map((group) => (
            <div key={group.region}>
              <h2
                className="text-xl sm:text-2xl font-bold mb-6 pb-3"
                style={{
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-display)",
                  borderBottom: "1px solid var(--color-border-warm)",
                }}
              >
                {group.region}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.cities.map((city) => (
                  <div
                    key={city.slug}
                    className="p-5 rounded-2xl"
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid var(--color-border-warm)",
                    }}
                  >
                    <p
                      className="flex items-center gap-2 font-bold mb-1"
                      style={{
                        color: "var(--color-text-primary)",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      <MapPin size={16} style={{ color: "var(--color-gold-dark)" }} />
                      {city.name}
                    </p>
                    <p className="text-xs mb-4" style={{ color: "var(--color-text-muted)" }}>
                      {city.county === "București" ? "Municipiul București" : `Județul ${city.county}`}
                    </p>
                    <ul className="space-y-1.5">
                      {LOCAL_SERVICE_ORDER.map((key) => {
                        const service = LOCAL_SERVICES[key];
                        return (
                          <li key={key}>
                            <Link
                              href={`/${service.urlPrefix}-${city.slug}`}
                              className="inline-flex items-center gap-1.5 text-sm transition-opacity hover:opacity-70"
                              style={{ color: "var(--color-navy)" }}
                            >
                              <ArrowRight size={13} />
                              {service.label} {city.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16" style={{ background: "var(--color-midnight)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-2xl sm:text-3xl font-black mb-4"
            style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
          >
            Nu găsești orașul tău?
          </h2>
          <p className="text-lg mb-8" style={{ color: "var(--color-text-on-dark)", opacity: 0.75 }}>
            Lucrăm cu firme din toată țara, nu doar din orașele listate aici. Scrie-ne
            și primești o estimare în aceeași zi.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold"
            style={{ background: "var(--color-gold)", color: "var(--color-midnight)" }}
          >
            Cere o ofertă <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
