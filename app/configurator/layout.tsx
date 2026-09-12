import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configurator Proiect — Estimare Preț Rapidă",
  description:
    "Configurează-ți proiectul de site, aplicație sau automatizare și primești o estimare de preț și durată în câteva minute.",
  alternates: { canonical: "/configurator" },
  openGraph: {
    title: "Configurator Proiect — Estimare Preț Rapidă | AiWANT",
    description:
      "Configurează-ți proiectul de site, aplicație sau automatizare și primești o estimare de preț și durată în câteva minute.",
    url: "/configurator",
    siteName: "AiWANT",
    locale: "ro_RO",
    type: "website",
  },
};

export default function ConfiguratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
