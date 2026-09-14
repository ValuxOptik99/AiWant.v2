import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import {
  InfoPageShell,
  H2,
  P,
  Bullets,
  PriceTable,
  Callout,
  Faq,
  RelatedLinks,
  faqJsonLd,
} from "@/components/InfoPageShell";

const URL = `${SITE_URL}/pret-magazin-online`;

export const metadata: Metadata = {
  title: "Cât Costă un Magazin Online în 2026 — Prețuri Reale",
  description:
    "Cât costă un magazin online: Shopify, WooCommerce sau platformă custom, cu costul real pe anul 1 — licență, hosting, pluginuri, comisioane. De la 800 EUR, fără comision pe vânzare.",
  alternates: { canonical: "/pret-magazin-online" },
  openGraph: {
    title: "Cât Costă un Magazin Online în 2026 | AiWANT",
    description:
      "Shopify, WooCommerce sau magazin custom — costul real pe anul 1, ce urcă prețul și cât din vânzări rămâne la tine, nu la platformă.",
    url: "/pret-magazin-online",
    siteName: "AiWANT",
    locale: "ro_RO",
    type: "article",
  },
};

const FAQ = [
  {
    question: "Cât costă, de fapt, un magazin online la cheie?",
    answer:
      "Pentru un magazin construit pe măsură, cu catalog, plăți, curierat și facturare integrate, prețul pornește realist de la 800 EUR. Costul final depinde de numărul de produse, de câte variante are fiecare (mărime, culoare) și de câte sisteme externe trebuie conectate. Pe Shopify sau WooCommerce poți porni și mai ieftin lunar, dar plătești constant — abonament, aplicații, uneori comision pe vânzare.",
  },
  {
    question: "E mai ieftin să pornesc pe Shopify sau WooCommerce?",
    answer:
      "La pornire, aproape întotdeauna da. Pe termen lung, depinde cât vinzi. Shopify are abonament lunar plus, de multe ori, comision pe tranzacție și aplicații plătite pentru funcționalități care într-un magazin custom sunt incluse din start. WooCommerce nu are abonament de platformă, dar cere hosting dedicat, o temă, pluginuri de plăți și curierat, plus timp pentru actualizări și pentru compatibilitatea dintre ele.",
  },
  {
    question: "Ce comision plătesc la fiecare vânzare?",
    answer:
      "Către noi, niciunul — magazinul e al tău, fără procent din cifra de afaceri. Singurul cost per tranzacție este comisionul procesatorului de plăți (de regulă 2–3%), care există indiferent de platformă. Pe un marketplace precum eMAG, comisionul e cu totul altă categorie — poate ajunge la 10–20% din valoarea comenzii, în funcție de categoria de produs.",
  },
  {
    question: "Pot trece de pe Shopify sau WooCommerce pe un magazin propriu mai târziu?",
    answer:
      "Da, dar nu este o migrare banală. Catalogul de produse și istoricul comenzilor se pot exporta, însă designul, automatizările și integrările se refac de la zero pe noua platformă. E mai simplu să pornești direct pe o soluție pe care o poți extinde, decât să muți un magazin activ după ce a crescut.",
  },
  {
    question: "Cât timp durează să fie gata un magazin online?",
    answer:
      "La noi, termenul standard este 2–4 săptămâni, în funcție de numărul de produse și de integrările cerute. Un magazin simplu pe Shopify sau WooCommerce poate fi „live” în câteva zile, dar configurarea corectă a plăților, curieratului și facturării — ca să nu apară surprize la prima comandă reală — durează, indiferent de platformă.",
  },
];

export default function PretMagazinOnlinePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(URL, FAQ)) }}
      />
      <InfoPageShell
        breadcrumb="Cât costă un magazin online"
        h1="Cât costă un magazin online în 2026"
        subtitle="Shopify, WooCommerce sau platformă custom — costul real pe anul 1, nu doar prețul de pe pagina de start, plus cât din fiecare vânzare rămâne efectiv la tine."
        updated="septembrie 2026"
      >
        <P>
          „Cât costă un magazin online” are trei răspunsuri complet diferite, în funcție
          de platforma aleasă. Problema e că prețul afișat de Shopify sau de un plugin
          WooCommerce nu este costul real — costul real apare abia după ce aduni
          abonamentul, hostingul, temele, pluginurile și comisioanele pe un an întreg.
        </P>

        <H2>Costul real pe anul 1</H2>
        <PriceTable
          head={["Platformă", "Cost an 1 (estimat)", "Comision pe vânzare", "Cine deține magazinul"]}
          rows={[
            [
              "Shopify",
              "≈500 – 1.200 EUR (abonament + aplicații + temă)",
              "2 – 2,9% / tranzacție dacă nu folosești Shopify Payments",
              "Shopify — magazinul „locuiește” pe platforma lor",
            ],
            [
              "WooCommerce",
              "≈300 – 700 EUR (hosting + temă + pluginuri)",
              "0% către WooCommerce, doar comisionul procesatorului (≈2–3%)",
              "Tu, dar depinzi de WordPress și de actualizările lui",
            ],
            [
              "Magazin custom (AiWANT)",
              "de la 800 EUR, o singură dată",
              "0% către noi, doar comisionul procesatorului (≈2–3%)",
              "Tu, integral — cod sursă predat",
            ],
          ]}
          note="Estimările pentru Shopify și WooCommerce sunt orientative, pe baza prețurilor publice ale platformelor la data actualizării; variază cu numărul de aplicații/pluginuri folosite. Comisionul procesatorului de plăți (Stripe, Netopia etc.) se aplică indiferent de platformă."
        />

        <H2>Ce urcă efectiv prețul</H2>
        <P>
          Indiferent pe ce platformă construiești, aceleași lucruri scumpesc un magazin
          online:
        </P>
        <Bullets
          items={[
            <>
              <strong>Numărul de produse și variantele.</strong> Un catalog cu mărimi,
              culori și combinații cere structură de date mai complexă și filtre mai
              bune, nu doar „mai multe rânduri într-un tabel”.
            </>,
            <>
              <strong>Integrarea de plăți.</strong> Card, ramburs, transfer bancar — fiecare
              metodă înseamnă configurare și testare separată.
            </>,
            <>
              <strong>Curieratul.</strong> Generarea automată de AWB-uri și calculul
              corect al costului de livrare pe zonă cresc complexitatea checkout-ului.
            </>,
            <>
              <strong>Facturarea.</strong> Emiterea automată a facturii la fiecare
              comandă, integrată cu un sistem precum SmartBill sau Oblio, e o
              integrare separată de platforma de e-commerce în sine.
            </>,
            <>
              <strong>ERP-ul sau stocul existent.</strong> Dacă magazinul trebuie să
              sincronizeze stocuri cu un sistem de gestiune deja folosit, aici apare de
              obicei cel mai mult timp de lucru.
            </>,
          ]}
        />

        <H2>Comisioanele marketplace-urilor vs magazin propriu</H2>
        <P>
          A vinde pe un marketplace (eMAG și altele similare) are un avantaj real —
          trafic existent, fără să-l aduci tu. Costul acelui trafic este comisionul
          pe fiecare vânzare, care variază pe categorii de produs și poate ajunge la
          10–20% din valoarea comenzii. Într-un magazin propriu, acel procent nu mai
          pleacă nicăieri — rămâne marjă.
        </P>
        <Callout>
          Un magazin propriu nu exclude marketplace-urile — cele mai multe afaceri
          folosesc ambele canale. Diferența e că, pe termen lung, magazinul propriu e
          singurul unde <strong>păstrezi datele clienților</strong> și{" "}
          <strong>controlezi marja</strong>, în loc să depinzi integral de regulile
          altcuiva.
        </Callout>

        <H2>Întrebări frecvente</H2>
        <Faq items={FAQ} />

        <H2>Mai departe</H2>
        <RelatedLinks
          links={[
            { href: "/servicii/magazine-online", label: "Magazine online" },
            { href: "/cat-costa-un-site", label: "Cât costă un site de prezentare" },
            { href: "/wordpress-vs-site-custom", label: "WordPress vs site custom" },
            { href: "/agentie-web-vs-freelancer", label: "Agenție vs freelancer" },
            { href: "/configurator", label: "Configurează o ofertă" },
          ]}
        />
      </InfoPageShell>
    </>
  );
}
