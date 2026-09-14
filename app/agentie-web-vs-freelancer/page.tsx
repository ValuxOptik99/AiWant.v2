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

const URL = `${SITE_URL}/agentie-web-vs-freelancer`;

export const metadata: Metadata = {
  title: "Agenție Web vs Freelancer — Ce Alegi și Ce Întrebi",
  description:
    "Agenție sau freelancer pentru site-ul tău: comparație pe preț, viteză, risc de abandon și continuitate, plus întrebările de pus înainte să semnezi, indiferent de variantă.",
  alternates: { canonical: "/agentie-web-vs-freelancer" },
  openGraph: {
    title: "Agenție Web vs Freelancer — Ce Alegi și Ce Întrebi | AiWANT",
    description:
      "Nu eticheta „agenție” sau „freelancer” contează, ci ce se întâmplă cu proiectul tău peste doi ani. Comparație onestă și lista de întrebări de pus înainte să semnezi.",
    url: "/agentie-web-vs-freelancer",
    siteName: "AiWANT",
    locale: "ro_RO",
    type: "article",
  },
};

const FAQ = [
  {
    question: "E mai sigur să lucrez cu o agenție decât cu un freelancer?",
    answer:
      "Nu automat. Contează mărimea reală a structurii, nu eticheta de pe site. O „agenție” formată dintr-o singură persoană are exact același risc de continuitate ca un freelancer — dacă acea persoană se îmbolnăvește, schimbă domeniul sau pur și simplu se oprește, proiectul rămâne în același loc. Întreabă direct câte persoane lucrează efectiv la proiectul tău, nu doar cum se numește firma.",
  },
  {
    question: "De ce e freelancerul, de obicei, mai ieftin?",
    answer:
      "Pentru că nu are costurile de structură ale unei firme — birou, contabilitate separată, uneori alți angajați. Acel cost dispare din preț, dar cu el dispare și „stratul” care preia proiectul dacă persoana nu mai poate continua. Prețul mai mic e real, nu doar un truc de marketing — dar vine la pachet cu risc concentrat într-o singură persoană.",
  },
  {
    question: "Ce garanție am că site-ul chiar funcționează după livrare?",
    answer:
      "Cere-o în scris, indiferent cu cine lucrezi: o perioadă de garanție (de obicei 30–90 de zile) în care bug-urile se remediază gratuit, și un contract sau cel puțin o comandă/factură care descrie exact ce se livrează. O garanție „pe cuvânt” nu poate fi cerută dacă lucrurile nu merg bine.",
  },
  {
    question: "Cine se ocupă de site dacă persoana cu care am lucrat dispare?",
    answer:
      "Depinde exclusiv de ce primești la livrare. Dacă ai codul sursă, accesul la domeniu și la conturile de hosting, orice alt dezvoltator poate prelua proiectul — inconvenient, dar rezolvabil. Dacă site-ul e „găzduit” pe infrastructura persoanei respective și nu ai acces la nimic, ești blocat. Asta se verifică înainte de a semna, nu după.",
  },
  {
    question: "Ce contează mai mult decât eticheta agenție/freelancer?",
    answer:
      "Trei lucruri: ce primești efectiv la livrare (cod sursă, acces, documentație), ce garanție ai în scris, și de cât timp există persoana sau firma respectivă în acest domeniu. Un freelancer cu 8 ani de proiecte livrate și recenzii verificabile e, de multe ori, o alegere mai sigură decât o „agenție” înființată acum trei luni.",
  },
];

export default function AgentieVsFreelancerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(URL, FAQ)) }}
      />
      <InfoPageShell
        breadcrumb="Agenție vs freelancer"
        h1="Agenție web vs freelancer — ce alegi și ce întrebi"
        subtitle="Eticheta de pe site contează mai puțin decât crezi. Comparație onestă pe preț, viteză și risc, plus întrebările de pus înainte să semnezi, indiferent cu cine lucrezi."
        updated="septembrie 2026"
      >
        <P>
          „Agenție” sună mai sigur decât „freelancer” — dar o agenție poate fi și ea
          o singură persoană cu o firmă înființată, la fel cum un freelancer poate
          avea zece ani de experiență și zeci de proiecte livrate. Eticheta nu spune
          nimic despre ce se întâmplă cu proiectul tău peste doi ani. Contează
          structura reală din spatele ei.
        </P>

        <H2>Comparație directă</H2>
        <PriceTable
          head={["Criteriu", "Freelancer", "Agenție"]}
          rows={[
            ["Preț", "De regulă mai mic — fără costuri de structură", "De regulă mai mare — acoperă costurile firmei"],
            ["Viteză", "Poate fi rapidă — o singură persoană decide, fără proces intern", "Variază — poate avea proces mai clar, dar și mai multe verigi"],
            ["Risc de abandon", "Concentrat într-o singură persoană", "Mai mic doar dacă structura are efectiv mai mulți oameni"],
            ["Continuitate", "Depinde integral de disponibilitatea acelei persoane", "Mai bună doar dacă firma e reală, nu un singur om cu o firmă"],
            ["Garanție", "De obicei negociabilă, rareori formalizată din start", "Mai des inclusă contractual, dar verifică clauzele exacte"],
            ["Cine răspunde peste 2 ani", "Aceeași persoană, dacă mai lucrează în domeniu", "Firma, dacă încă există și dacă persoana care știe codul mai e acolo"],
          ]}
        />

        <H2>Ce întrebi înainte să semnezi, indiferent de variantă</H2>
        <P>
          Aceste întrebări contează mai mult decât „agenție sau freelancer” — și pun
          orice ofertă la aceeași probă:
        </P>
        <Bullets
          items={[
            <>
              <strong>Cine deține codul sursă, domeniul și conturile după livrare?</strong>{" "}
              Dacă răspunsul nu e „tu, integral”, orice altă întrebare devine
              secundară.
            </>,
            <>
              <strong>Ce garanție există, în scris, și pentru cât timp?</strong> Cere
              perioada exactă și ce anume acoperă — bug-uri, nu cereri noi de
              funcționalitate.
            </>,
            <>
              <strong>De cât timp lucrează în acest domeniu?</strong> Un istoric
              verificabil de proiecte livrate contează mai mult decât forma juridică.
            </>,
            <>
              <strong>Ce se întâmplă dacă vrei să lucrezi cu altcineva peste un an?</strong>{" "}
              Un răspuns clar aici arată dacă lucrezi cu cineva transparent sau cu
              cineva care te vrea dependent.
            </>,
            <>
              <strong>Poți vorbi cu un client anterior?</strong> Nu un testimonial
              scris pe site, ci o referință verificabilă.
            </>,
          ]}
        />

        <Callout>
          Întrebarea reală nu e „agenție sau freelancer”, ci{" "}
          <strong>„ce primesc dacă lucrurile nu merg bine”</strong>. Codul sursă,
          accesele și un contract clar rezolvă asta indiferent cine ți-a construit
          site-ul.
        </Callout>

        <H2>Întrebări frecvente</H2>
        <Faq items={FAQ} />

        <H2>Mai departe</H2>
        <RelatedLinks
          links={[
            { href: "/cat-costa-un-site", label: "Cât costă un site de prezentare" },
            { href: "/pret-magazin-online", label: "Cât costă un magazin online" },
            { href: "/wordpress-vs-site-custom", label: "WordPress vs site custom" },
            { href: "/servicii/site-prezentare", label: "Site-uri de prezentare" },
            { href: "/configurator", label: "Configurează o ofertă" },
          ]}
        />
      </InfoPageShell>
    </>
  );
}
