import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES_DATA, getServiceBySlug } from "@/lib/services-data";
import ServicePageTemplate from "@/components/ServicePageTemplate";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
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
      title: service.seoTitle,
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
