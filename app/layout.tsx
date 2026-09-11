import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL, WHATSAPP_NUMBER } from "@/lib/constants";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Automatizare Procese & Aplicații Web pentru Firme | AiWANT",
    template: "%s | AiWANT",
  },
  description:
    "Automatizăm procese repetitive și construim aplicații web custom pentru firme din România. Partener strategic în digitalizare — cod sursă predat integral.",
  openGraph: {
    title: "Automatizare Procese & Aplicații Web pentru Firme | AiWANT",
    description:
      "Automatizăm procese repetitive și construim aplicații web custom pentru firme din România. Partener strategic în digitalizare — cod sursă predat integral.",
    url: "/",
    siteName: "AiWANT",
    locale: "ro_RO",
    type: "website",
  },
};

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "AiWANT",
      legalName: "Vendor Comp SRL",
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
      email: "aiwant.automation@gmail.com",
      telephone: `+${WHATSAPP_NUMBER}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Constanța",
        addressCountry: "RO",
      },
      // Not verified this session — confirm these accounts exist before relying on them.
      sameAs: [
        "https://www.linkedin.com/company/aiwant",
        "https://github.com/aiwant-ro",
        "https://www.instagram.com/aiwant.ro",
        "https://www.tiktok.com/@aiwant.ro",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "AiWANT",
      url: SITE_URL,
      image: `${SITE_URL}/images/logo.png`,
      telephone: `+${WHATSAPP_NUMBER}`,
      email: "aiwant.automation@gmail.com",
      areaServed: "RO",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Constanța",
        addressCountry: "RO",
      },
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={`${sora.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RGB8SS3R8X"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RGB8SS3R8X');
            `,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
