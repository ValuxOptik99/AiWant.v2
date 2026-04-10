import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  title: "aiwant.ro — Dezvoltare Web & Soluții AI | Constanța",
  description:
    "Dezvoltăm site-uri, aplicații web, magazine online și soluții AI pentru afaceri din România. Peste 30 de ani de experiență. Solicită ofertă gratuită.",
  keywords:
    "dezvoltare web, aplicații web, soluții AI, site prezentare, magazin online, Constanța, România, Next.js, React",
  openGraph: {
    title: "aiwant.ro — Dezvoltare Web & Soluții AI",
    description:
      "Soluții digitale pentru afaceri ambițioase. Dezvoltare web, AI, automatizări.",
    url: "https://aiwant.ro",
    siteName: "aiwant.ro",
    locale: "ro_RO",
    type: "website",
  },
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
