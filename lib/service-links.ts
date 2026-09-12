// Small, footer-only list of service links: only { slug, title }, so
// components/Footer.tsx doesn't need to import the ~37 KB SERVICES_DATA
// (full service page copy) just to render 6 nav links.
//
// Kept in sync with SERVICES_DATA by a build-time check in
// app/servicii/[slug]/page.tsx (generateStaticParams) that throws if these
// slugs (and order) don't match exactly.

export type ServiceLink = {
  slug: string;
  title: string;
};

export const SERVICE_LINKS: ServiceLink[] = [
  { slug: "site-prezentare", title: "Site-uri de Prezentare" },
  { slug: "aplicatii-web", title: "Aplicații Web Custom" },
  { slug: "magazine-online", title: "Magazine Online" },
  { slug: "ai-automatizari", title: "Soluții AI & Automatizări" },
  { slug: "design-uiux", title: "Design UI/UX" },
  { slug: "social-media", title: "Social Media & Marketing" },
];
