import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configurator Proiect — Estimare Preț Rapidă",
  description:
    "Configurează-ți proiectul de site, aplicație sau automatizare și primești o estimare de preț și durată în câteva minute.",
  alternates: { canonical: "/configurator" },
};

export default function ConfiguratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
