// ─────────────────────────────────────────────────────────────────────────────
// Paginile locale: /creare-site-web-<oras>, /magazin-online-<oras>,
// /automatizari-firme-<oras>.
//
// Next.js rezolvă întâi segmentele statice (/blog, /servicii, /portofoliu,
// /orase, /configurator...), deci acest [slug] de la rădăcină prinde doar ce
// nu s-a potrivit deja. `dynamicParams = false` face ca orice alt slug să
// returneze 404 în loc să genereze o pagină goală — important ca Google să nu
// indexeze URL-uri inventate.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllLocalPages, getLocalPage } from "@/lib/local-seo-data";
import { buildLocalPageCopy } from "@/lib/local-seo-copy";
import { SITE_URL } from "@/lib/constants";
import LocalPageTemplate from "@/components/LocalPageTemplate";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllLocalPages().map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getLocalPage(slug);
  if (!page) return {};

  const copy = buildLocalPageCopy(page);

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: { canonical: copy.canonical },
    openGraph: {
      title: `${copy.metaTitle} | AiWANT`,
      description: copy.metaDescription,
      url: copy.canonical,
      siteName: "AiWANT",
      locale: "ro_RO",
      type: "website",
    },
  };
}

export default async function LocalServicePage({ params }: Props) {
  const { slug } = await params;
  const page = getLocalPage(slug);
  if (!page) notFound();

  const copy = buildLocalPageCopy(page);
  const { city, service } = page;
  const url = `${SITE_URL}/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Acasă", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.parentLabel,
            item: `${SITE_URL}${copy.parentHref}`,
          },
          { "@type": "ListItem", position: 3, name: copy.h1, item: url },
        ],
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: copy.h1,
        description: copy.metaDescription,
        serviceType: service.label,
        url,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: [
          { "@type": "City", name: city.name },
          { "@type": "AdministrativeArea", name: `Județul ${city.county}` },
        ],
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "EUR",
          lowPrice: service.priceFrom.replace(/[^0-9]/g, ""),
          availability: "https://schema.org/InStock",
          url,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: copy.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LocalPageTemplate page={page} copy={copy} />
    </>
  );
}
