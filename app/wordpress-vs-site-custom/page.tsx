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

const URL = `${SITE_URL}/wordpress-vs-site-custom`;

export const metadata: Metadata = {
  title: "WordPress vs Site Custom — Ce Alegi în 2026?",
  description:
    "WordPress sau site custom: comparație onestă pe cost, viteză, securitate și ușurință de editare. Spunem clar când WordPress e alegerea corectă și când nu e.",
  alternates: { canonical: "/wordpress-vs-site-custom" },
  openGraph: {
    title: "WordPress vs Site Custom — Ce Alegi în 2026? | AiWANT",
    description:
      "Nu există un răspuns universal. O comparație onestă, cu situațiile concrete în care WordPress câștigă și cele în care un site custom câștigă.",
    url: "/wordpress-vs-site-custom",
    siteName: "AiWANT",
    locale: "ro_RO",
    type: "article",
  },
};

const FAQ = [
  {
    question: "WordPress este nesigur?",
    answer:
      "WordPress ca platformă nu este nesigur în sine — rulează o mare parte din internet. Riscul vine din pluginurile terțe neactualizate și din faptul că oricine poate instala orice, fără control de calitate. Un WordPress întreținut activ (actualizări la zi, pluginuri puține și verificate, backup-uri) este suficient de sigur pentru majoritatea site-urilor de prezentare.",
  },
  {
    question: "Un site custom nu are nevoie deloc de mentenanță?",
    answer:
      "Are nevoie de mult mai puțină. Nu există pluginuri terțe de actualizat, deci nu există acel risc constant de incompatibilitate. Mentenanța se reduce, în principal, la găzduire și la modificări de conținut sau funcționalitate atunci când tu le ceri — nu la „patch-uri” lunare obligatorii ca să nu se stingă site-ul.",
  },
  {
    question: "Pot trece mai târziu de pe WordPress pe un site custom?",
    answer:
      "Da. Conținutul (texte, imagini) se poate prelua; designul și funcționalitățile se reconstruiesc, pentru că cele două arhitecturi nu sunt compatibile direct. Cel mai simplu moment pentru trecere este atunci când mentenanța WordPress-ului a ajuns să coste, în timp și bani, cât un site nou.",
  },
  {
    question: "De ce ar alege cineva WordPress dacă e mai lent și mai vulnerabil?",
    answer:
      "Pentru că viteza brută nu e singurul criteriu. Dacă publici articole zilnic, ai nevoie de zeci de pluginuri gata făcute sau echipa ta trebuie să editeze singură fără să depindă de un dezvoltator, WordPress rezolvă exact asta — rapid și ieftin la pornire. „Mai lent” contează mai puțin dacă site-ul e, oricum, un blog cu conținut frecvent, nu un magazin sau o aplicație unde fiecare secundă de încărcare pierde clienți.",
  },
  {
    question: "Care e diferența reală de cost pe termen lung?",
    answer:
      "WordPress costă mai puțin la pornire, dar acumulează costuri: hosting mai performant pe măsură ce site-ul crește, pluginuri premium, timp de mentenanță sau un abonament la o firmă care se ocupă de asta. Un site custom costă mai mult la pornire, dar costul de operare rămâne aproape constant — pentru că nu depinde de un ecosistem de pluginuri care trebuie ținut la zi.",
  },
];

export default function WordpressVsCustomPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(URL, FAQ)) }}
      />
      <InfoPageShell
        breadcrumb="WordPress vs site custom"
        h1="WordPress vs site custom — ce alegi în 2026"
        subtitle="Nu există o alegere universal corectă. O comparație onestă, cu situațiile în care WordPress este alegerea potrivită și cele în care un site custom chiar contează."
        updated="septembrie 2026"
      >
        <P>
          Întrebarea nu e „care platformă e mai bună”, ci „ce ai tu nevoie să facă
          site-ul, cine îl editează și cât de des”. Răspunsul schimbă complet
          recomandarea — și orice comparație care nu spune asta clar încearcă, de
          fapt, să te convingă de o singură variantă.
        </P>

        <H2>Comparație directă</H2>
        <PriceTable
          head={["Criteriu", "WordPress", "Site custom"]}
          rows={[
            ["Cost inițial", "Mic — temă și pluginuri, de multe ori sub 500 EUR", "Mai mare — de la 249 EUR pentru un site simplu, construit de la zero"],
            ["Cost de operare", "Crește cu numărul de pluginuri și cu hostingul necesar", "Aproape constant — doar hosting și, opțional, mentenanță"],
            ["Viteză", "Depinde de tema și pluginurile instalate — adesea mai lent", "Optimizat din construcție, fără cod nefolosit din pluginuri"],
            ["Securitate", "Vulnerabilă dacă pluginurile nu sunt actualizate constant", "Suprafață de atac mult mai mică — nu există pluginuri terțe"],
            ["Ușurință de editare", "Foarte ușor — panou vizual, fără cunoștințe tehnice", "Ușor pentru conținut prin panou de administrare; structura cere un dezvoltator"],
            ["Dependență de dezvoltator", "Mică pentru conținut; mare dacă apar probleme tehnice", "Mică pentru folosirea de zi cu zi; necesară pentru orice schimbare structurală"],
          ]}
        />

        <H2>Când WordPress este alegerea corectă</H2>
        <P>
          Spus direct: pentru multe site-uri, WordPress este soluția potrivită, nu un
          compromis. Are sens clar dacă:
        </P>
        <Bullets
          items={[
            <>
              <strong>Publici conținut frecvent.</strong> Un blog cu postări zilnice sau
              săptămânale se editează natural în WordPress, fără să implici un
              dezvoltator la fiecare articol.
            </>,
            <>
              <strong>Echipa ta editează singură, des.</strong> Dacă mai multe persoane
              trebuie să adauge sau să modifice conținut fără cunoștințe tehnice,
              editorul vizual din WordPress e mai prietenos decât orice panou custom.
            </>,
            <>
              <strong>Bugetul de pornire e mic.</strong> O temă bună plus câteva
              pluginuri rezolvă rapid un site funcțional, la un cost pe care un site
              construit de la zero nu-l poate egala inițial.
            </>,
            <>
              <strong>Ai nevoie de funcționalități „gata făcute”.</strong> Formular
              complex, calendar de rezervări, sistem de membri — pentru multe dintre
              acestea există deja un plugin matur, testat de milioane de instalări.
            </>,
          ]}
        />

        <H2>Când are sens un site custom</H2>
        <P>Site-ul construit de la zero câștigă clar atunci când:</P>
        <Bullets
          items={[
            <>
              <strong>Viteza contează direct pentru business.</strong> Un magazin online
              sau o pagină de conversie pierde clienți la fiecare secundă în plus de
              încărcare — aici diferența de viteză nu e teoretică.
            </>,
            <>
              <strong>Ai nevoie de control complet.</strong> Nu ești limitat de ce
              permite un plugin; orice funcționalitate se construiește exact cum ai
              nevoie, fără compromisuri de compatibilitate.
            </>,
            <>
              <strong>Ai integrări proprii.</strong> Conectarea cu un CRM intern, cu un
              sistem de facturare specific sau cu o bază de date proprie e mai directă
              fără un strat de plugin peste ea.
            </>,
            <>
              <strong>Vrei cost de operare aproape zero.</strong> Fără pluginuri de
              actualizat, riscul de „s-a stricat site-ul după un update” dispare
              aproape complet.
            </>,
          ]}
        />

        <Callout>
          O comparație corectă nu are un câștigător universal. Dacă cineva îți spune
          că <strong>orice</strong> site trebuie să fie pe WordPress — sau că{" "}
          <strong>niciun</strong> site nu ar trebui — nu îți vinde o soluție, îți
          vinde ce știe el să construiască.
        </Callout>

        <H2>Întrebări frecvente</H2>
        <Faq items={FAQ} />

        <H2>Mai departe</H2>
        <RelatedLinks
          links={[
            { href: "/servicii/site-prezentare", label: "Site-uri de prezentare" },
            { href: "/cat-costa-un-site", label: "Cât costă un site de prezentare" },
            { href: "/pret-magazin-online", label: "Cât costă un magazin online" },
            { href: "/agentie-web-vs-freelancer", label: "Agenție vs freelancer" },
            { href: "/configurator", label: "Configurează o ofertă" },
          ]}
        />
      </InfoPageShell>
    </>
  );
}
