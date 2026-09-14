import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import {
  InfoPageShell,
  H2,
  H3,
  P,
  Bullets,
  PriceTable,
  Callout,
  Faq,
  RelatedLinks,
  faqJsonLd,
} from "@/components/InfoPageShell";

const URL = `${SITE_URL}/cat-costa-un-site`;

export const metadata: Metadata = {
  title: "Cât Costă un Site de Prezentare în 2026 — Prețuri Reale",
  description:
    "Cât costă un site web în România: prețuri reale pe tip de proiect, ce urcă factura, ce costuri ascunse apar după livrare și cum compari corect două oferte. De la 249 EUR.",
  alternates: { canonical: "/cat-costa-un-site" },
  openGraph: {
    title: "Cât Costă un Site de Prezentare în 2026 | AiWANT",
    description:
      "Prețuri reale pentru un site web în România, pe tip de proiect, plus costurile recurente pe care majoritatea ofertelor nu le menționează.",
    url: "/cat-costa-un-site",
    siteName: "AiWANT",
    locale: "ro_RO",
    type: "article",
  },
};

const FAQ = [
  {
    question: "Care este cel mai mic preț realist pentru un site de prezentare?",
    answer:
      "Sub 200 EUR vorbim aproape sigur despre un șablon cumpărat, completat cu textele tale. Poate fi suficient dacă ai nevoie doar de o prezență minimă. Un site construit pe măsură, cu structură gândită pentru căutări și cu cod predat, pornește realist de la 249 EUR. Diferența nu stă în numărul de pagini, ci în cât din muncă e făcută pentru tine și cât e refolosită.",
  },
  {
    question: "De ce diferă atât de mult ofertele pentru același site?",
    answer:
      "Pentru că „site de prezentare” descrie zece lucruri diferite. Întreabă concret: cine scrie textele, cine face pozele, câte revizuiri sunt incluse, ce se întâmplă după livrare, cine deține codul și domeniul, și dacă hostingul e inclus sau facturat separat. Două oferte care diferă de trei ori conțin, de obicei, răspunsuri diferite la aceste întrebări.",
  },
  {
    question: "Ce costuri recurente am după ce site-ul e gata?",
    answer:
      "Domeniul .ro costă în jur de 10–15 EUR pe an. Hostingul variază de la aproape zero (pe platforme moderne, pentru un site de prezentare) până la câteva sute de euro pe an pentru aplicații. Certificatul SSL este gratuit prin Let's Encrypt — dacă cineva ți-l facturează separat ca obligatoriu, merită întrebat de ce. Mentenanța este opțională, nu obligatorie.",
  },
  {
    question: "E mai ieftin un site pe WordPress?",
    answer:
      "Inițial, de multe ori da. Pe termen lung, depinde: WordPress cere actualizări, pluginuri și, de obicei, hosting mai scump, iar costul de mentenanță se acumulează. Un site static modern are cost de operare aproape zero, dar orice modificare structurală cere un dezvoltator. Alegerea corectă ține de cât de des schimbi conținutul și de cine se ocupă de el.",
  },
  {
    question: "Pot plăti în rate?",
    answer:
      "Da. Lucrăm de obicei cu un avans la start și restul la livrare, iar pentru proiecte mai mari împărțim pe etape. Există și varianta de plată lunară, care întinde costul pe 12 luni și include mentenanța — utilă dacă vrei să nu ai o ieșire mare de numerar la început.",
  },
];

export default function CatCostaUnSitePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(URL, FAQ)) }}
      />
      <InfoPageShell
        breadcrumb="Cât costă un site"
        h1="Cât costă un site de prezentare în 2026"
        subtitle="Prețuri reale pe tip de proiect, ce anume urcă factura și ce costuri apar după livrare — scris ca să poți compara două oferte, nu ca să te convingem de a noastră."
        updated="septembrie 2026"
      >
        <P>
          Întrebarea „cât costă un site” primește rareori un răspuns util, pentru că
          răspunsul corect depinde de ce înțelege fiecare prin „site”. Mai jos sunt
          intervalele reale de pe piața din România, împreună cu ce anume plătești în
          fiecare dintre ele.
        </P>

        <H2>Prețuri pe tip de proiect</H2>
        <PriceTable
          head={["Tip de proiect", "Interval de piață", "La noi", "Termen"]}
          rows={[
            ["Landing page (o pagină)", "150 – 600 EUR", "de la 249 EUR", "2–3 zile"],
            ["Site de prezentare, 1–4 pagini", "250 – 1.200 EUR", "249 EUR", "2–3 zile"],
            ["Site de prezentare, 5–10 pagini", "500 – 2.500 EUR", "499 EUR", "4–5 zile"],
            ["Magazin online", "800 – 6.000 EUR", "de la 800 EUR", "2–4 săptămâni"],
            ["Aplicație web / platformă custom", "1.500 – 15.000+ EUR", "de la 800 EUR", "de la 3 săptămâni"],
            ["Automatizări și integrări", "100 – 3.000 EUR", "de la 100 EUR", "1–3 săptămâni"],
          ]}
          note="Intervalele de piață sunt orientative și variază în funcție de agenție, oraș și complexitate. Prețurile noastre sunt fixe, stabilite înainte de start."
        />

        <H2>Ce urcă efectiv prețul</H2>
        <P>
          Numărul de pagini contează mult mai puțin decât cred majoritatea clienților.
          Iată ce mută cu adevărat prețul:
        </P>
        <Bullets
          items={[
            <>
              <strong>Conținutul.</strong> Dacă textele și pozele nu există, cineva
              trebuie să le producă. Asta poate adăuga 30–50% la un proiect mic.
            </>,
            <>
              <strong>Integrările.</strong> Plăți, curierat, facturare, CRM, ERP —
              fiecare conexiune cu un sistem extern înseamnă implementare și testare.
            </>,
            <>
              <strong>Funcționalitatea dinamică.</strong> Un formular e ieftin. Un
              sistem de programări cu disponibilitate reală, notificări și anulări nu
              mai este un formular.
            </>,
            <>
              <strong>Multilingv.</strong> A doua limbă nu dublează prețul, dar adaugă
              structură, traduceri și verificare.
            </>,
            <>
              <strong>Numărul de revizuiri.</strong> Ofertele foarte ieftine includ
              de obicei una singură; a treia rundă de modificări se facturează.
            </>,
          ]}
        />

        <H2>Costurile de după livrare</H2>
        <P>
          Aici apar cele mai multe surprize. Un site „gata” încă are costuri anuale, iar
          o ofertă corectă ți le spune din start:
        </P>
        <PriceTable
          head={["Cost", "Cât e realist", "Obligatoriu?"]}
          rows={[
            ["Domeniu .ro", "10 – 15 EUR / an", "Da"],
            ["Hosting site de prezentare", "0 – 60 EUR / an", "Da"],
            ["Hosting aplicație / magazin", "60 – 500 EUR / an", "Da"],
            ["Certificat SSL", "0 EUR (Let's Encrypt)", "Da, dar gratuit"],
            ["Mentenanță", "20 – 100 EUR / lună", "Nu"],
            ["Modificări de conținut", "0 EUR dacă ai panou de administrare", "Nu"],
          ]}
        />
        <Callout>
          Întrebarea care separă o ofertă bună de una proastă:{" "}
          <strong>cine deține codul sursă, domeniul și conturile după livrare?</strong>{" "}
          Dacă răspunsul nu este „tu”, prețul mic de la început se transformă într-o
          dependență scumpă mai târziu.
        </Callout>

        <H2>Cum compari corect două oferte</H2>
        <P>
          Pune-le pe amândouă să răspundă la aceleași șase întrebări, în scris. Diferența
          de preț devine, de obicei, explicabilă imediat:
        </P>
        <Bullets
          items={[
            "Ce se livrează exact — câte pagini, ce funcționalități, ce integrări?",
            "Cine produce textele și imaginile?",
            "Câte runde de modificări sunt incluse și cât costă următoarea?",
            "Cine deține codul, domeniul și conturile după livrare?",
            "Ce costuri recurente apar și cine le plătește?",
            "Ce se întâmplă dacă vrei să lucrezi cu altcineva peste un an?",
          ]}
        />

        <H2>Plată o singură dată sau lunar?</H2>
        <P>
          Plata integrală este mai ieftină pe total și îți dă independență completă.
          Varianta lunară are sens dacă preferi să nu blochezi capital la început și dacă
          vrei mentenanța inclusă — dar verifică mereu ce se întâmplă cu site-ul dacă
          oprești plata. Un abonament din care rămâi fără nimic la final este chirie, nu
          investiție.
        </P>

        <H2>Întrebări frecvente</H2>
        <Faq items={FAQ} />

        <H2>Mai departe</H2>
        <RelatedLinks
          links={[
            { href: "/servicii/site-prezentare", label: "Site-uri de prezentare" },
            { href: "/pret-magazin-online", label: "Cât costă un magazin online" },
            { href: "/wordpress-vs-site-custom", label: "WordPress vs site custom" },
            { href: "/agentie-web-vs-freelancer", label: "Agenție vs freelancer" },
            { href: "/configurator", label: "Configurează o ofertă" },
          ]}
        />
      </InfoPageShell>
    </>
  );
}
