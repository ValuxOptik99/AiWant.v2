import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES_DATA, getServiceBySlug } from "@/lib/services-data";
import { SERVICE_LINKS } from "@/lib/service-links";
import ServicePageTemplate from "@/components/ServicePageTemplate";

type Props = {
  params: Promise<{ slug: string }>;
};

// lib/service-links.ts duplicates { slug, title } so components/Footer.tsx
// doesn't have to import the full SERVICES_DATA. Fail the build if it drifts
// out of sync (slugs must match SERVICES_DATA exactly, in the same order).
function assertServiceLinksInSync() {
  const dataSlugs = SERVICES_DATA.map((s) => s.slug);
  const linkSlugs = SERVICE_LINKS.map((s) => s.slug);
  const inSync =
    dataSlugs.length === linkSlugs.length &&
    dataSlugs.every((slug, i) => slug === linkSlugs[i]);
  if (!inSync) {
    throw new Error(
      `lib/service-links.ts is out of sync with lib/services-data.ts SERVICES_DATA.\n` +
        `Expected slugs (in order): [${dataSlugs.join(", ")}]\n` +
        `Found in service-links.ts: [${linkSlugs.join(", ")}]`
    );
  }
}

export async function generateStaticParams() {
  assertServiceLinksInSync();
  return SERVICES_DATA.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: { canonical: `/servicii/${service.slug}` },
    openGraph: {
      title: `${service.seoTitle} | AiWANT`,
      description: service.seoDescription,
      url: `/servicii/${service.slug}`,
      siteName: "AiWANT",
      locale: "ro_RO",
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  return <ServicePageTemplate service={service} />;
}
