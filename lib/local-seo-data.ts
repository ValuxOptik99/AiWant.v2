// ─────────────────────────────────────────────────────────────────────────────
// LOCAL SEO — date pentru paginile pe oraș (/creare-site-web-<oras> etc.)
//
// Scopul acestui fișier: fiecare pagină locală trebuie să conțină informație
// REALĂ despre orașul respectiv (profil economic, industrii dominante,
// localități deservite, vecini), nu doar numele orașului înlocuit într-un
// șablon. Paginile generate din date identice sunt tratate de Google drept
// "thin content" și nu se indexează.
//
// Regula de completare: dacă adaugi un oraș nou, `localNote` și `digitalNote`
// trebuie scrise de mână, specific orașului. Nu copia de la alt oraș.
// ─────────────────────────────────────────────────────────────────────────────

export type CitySize = "metropola" | "mare" | "mediu" | "mic";

export type IndustryKey =
  | "turism"
  | "horeca"
  | "transport"
  | "logistica"
  | "agricultura"
  | "agroalimentar"
  | "industrie"
  | "auto"
  | "constructii"
  | "imobiliare"
  | "medical"
  | "juridic"
  | "it"
  | "retail"
  | "educatie"
  | "energie"
  | "lemn"
  | "textile"
  | "servicii"
  | "vinificatie"
  | "balneo"
  | "mestesuguri";

export type IndustryAngle = {
  /** Cum apare în text: "firmele din <label>" */
  label: string;
  /** Ce are nevoie industria asta de la un site de prezentare */
  site: string;
  /** Ce are nevoie de la un magazin online */
  magazin: string;
  /** Ce proces repetitiv se automatizează tipic aici */
  automatizari: string;
};

export const INDUSTRIES: Record<IndustryKey, IndustryAngle> = {
  turism: {
    label: "turism și cazare",
    site: "un site propriu prin care să primească rezervări directe, fără comisionul de 15–20% luat de platformele de booking",
    magazin: "vânzare directă de pachete, sejururi și vouchere cadou, cu plata online încasată integral",
    automatizari:
      "confirmări automate de rezervare, remindere înainte de sosire și sincronizarea calendarului între platformele de booking",
  },
  horeca: {
    label: "HoReCa",
    site: "meniu actualizabil fără programator, program vizibil și buton de rezervare care funcționează de pe telefon",
    magazin: "comenzi online pentru livrare și ridicare, fără comisionul aplicațiilor de food delivery",
    automatizari:
      "preluarea comenzilor direct în bucătărie, confirmări pe WhatsApp și rapoarte zilnice de vânzări",
  },
  transport: {
    label: "transport",
    site: "pagini separate pe tip de serviciu și formular de cerere ofertă care ajunge direct la dispecerat",
    magazin: "comandă online pentru servicii standardizate de curierat și distribuție, cu plata în avans",
    automatizari:
      "generarea automată a documentelor de transport, urmărirea curselor și facturarea lunară recurentă",
  },
  logistica: {
    label: "logistică și depozitare",
    site: "prezentarea capacităților de depozitare și a acoperirii geografice, cu cerere de ofertă structurată",
    magazin: "portal de comandă pentru clienții recurenți, cu prețuri negociate per client",
    automatizari:
      "sincronizarea stocurilor între depozit și sistemele clienților, plus alerte automate la prag minim",
  },
  agricultura: {
    label: "agricultură",
    site: "prezentarea culturilor, a capacităților și a certificărilor, cu contact direct pentru cumpărători",
    magazin: "vânzare directă către consumator, scurtcircuitând intermediarii din lanțul de distribuție",
    automatizari:
      "evidența parcelelor și a lucrărilor agricole, plus rapoarte pentru dosarele APIA",
  },
  agroalimentar: {
    label: "producție agroalimentară",
    site: "prezentarea produselor și a certificărilor de calitate pentru clienți B2B",
    magazin: "vânzare directă din producție către consumator, cu livrare pe județ sau național",
    automatizari:
      "urmărirea loturilor, a termenelor de valabilitate și generarea automată a avizelor",
  },
  industrie: {
    label: "producție industrială",
    site: "catalog tehnic de produse, fișe descărcabile și formular de cerere ofertă pentru achizitori",
    magazin: "portal B2B cu prețuri diferențiate pe client și comandă repetată în doi pași",
    automatizari:
      "preluarea comenzilor în sistemul de producție, planificarea pe utilaje și raportarea în timp real",
  },
  auto: {
    label: "auto și service",
    site: "listă de servicii cu prețuri orientative și programare online direct din pagină",
    magazin: "vânzare de piese cu filtrare după marcă, model și an de fabricație",
    automatizari:
      "programări automate, remindere la revizie și ITP, plus deviz generat din fișa mașinii",
  },
  constructii: {
    label: "construcții",
    site: "portofoliu vizual de lucrări finalizate — argumentul care închide cel mai repede o vânzare în construcții",
    magazin: "vânzare de materiale cu calculator de cantități integrat în pagina produsului",
    automatizari:
      "devize generate din șabloane, urmărirea stadiului pe șantier și facturare pe etape",
  },
  imobiliare: {
    label: "imobiliare",
    site: "listări proprii, actualizabile din panou de administrare, care nu depind de portalurile de anunțuri",
    magazin: "rezervare online cu avans pentru unitățile dintr-un ansamblu rezidențial",
    automatizari:
      "distribuirea automată a lead-urilor către agenți și urmărirea fiecărei cereri până la vizionare",
  },
  medical: {
    label: "servicii medicale private",
    site: "prezentarea specializărilor și a medicilor, cu programare online care reduce apelurile la recepție",
    magazin: "vânzare de pachete de analize și abonamente de sănătate",
    automatizari:
      "programări, remindere SMS înainte de consultație și reducerea neprezentărilor",
  },
  juridic: {
    label: "servicii juridice",
    site: "pagini separate pe arie de practică — așa te găsesc clienții care caută exact speța lor",
    magazin: "consultații plătite online și modele de documente livrate automat",
    automatizari:
      "preluarea structurată a spețelor, termene urmărite automat și generarea documentelor din șabloane",
  },
  it: {
    label: "IT și servicii digitale",
    site: "pagini de produs și studii de caz care demonstrează competența tehnică, nu doar o listă de tehnologii",
    magazin: "vânzare de licențe și abonamente cu livrare automată a cheilor",
    automatizari:
      "integrarea uneltelor interne — CRM, facturare, suport — într-un flux unic, fără copy-paste",
  },
  retail: {
    label: "comerț",
    site: "vitrina online a magazinului fizic, cu program, locație și stoc orientativ",
    magazin: "magazin online complet, cu gestiune de stoc sincronizată cu magazinul fizic",
    automatizari:
      "sincronizarea stocurilor, generarea automată a facturilor și procesarea retururilor",
  },
  educatie: {
    label: "educație și cursuri",
    site: "prezentarea cursurilor, a formatorilor și a rezultatelor, cu înscriere direct din pagină",
    magazin: "vânzare de cursuri online cu acces livrat automat după plată",
    automatizari:
      "înscrieri, plăți recurente și emiterea automată a diplomelor la finalul cursului",
  },
  energie: {
    label: "energie și instalații",
    site: "calculator de economie și formular de cerere ofertă cu datele tehnice necesare din prima",
    magazin: "vânzare de echipamente cu configurator de sistem",
    automatizari:
      "devize automate din consumul declarat, urmărirea instalărilor și mentenanța programată",
  },
  lemn: {
    label: "prelucrarea lemnului și mobilă",
    site: "galerie de proiecte realizate și formular de comandă pentru mobilier la comandă",
    magazin: "vânzare online cu configurator de dimensiuni, finisaje și accesorii",
    automatizari:
      "de la comanda clientului la lista de debitare, fără retranscriere manuală",
  },
  textile: {
    label: "textile și confecții",
    site: "prezentarea capacităților de producție și a colecțiilor pentru clienți B2B",
    magazin: "magazin online cu variante de mărime și culoare și gestiune de stoc pe SKU",
    automatizari:
      "urmărirea comenzilor de producție și sincronizarea stocului între canale de vânzare",
  },
  servicii: {
    label: "servicii profesionale",
    site: "pagini pe fiecare serviciu, cu prețuri orientative și formular care califică lead-ul dinainte",
    magazin: "pachete de servicii vândute online, cu plată în avans",
    automatizari:
      "colectarea documentelor de la clienți, remindere pentru termene și facturare recurentă",
  },
  vinificatie: {
    label: "vinificație",
    site: "prezentarea cramei și a sortimentelor, cu rezervare pentru degustări",
    magazin: "vânzare directă de vin, cu livrare națională și pachete pentru corporate",
    automatizari:
      "gestiunea comenzilor sezoniere și campanii automate către clienții care au mai comandat",
  },
  balneo: {
    label: "turism balnear",
    site: "prezentarea procedurilor și a pachetelor de tratament, cu cerere de rezervare",
    magazin: "vânzare online de pachete balneare și vouchere",
    automatizari:
      "programarea procedurilor, confirmări automate și gestiunea perioadelor de vârf",
  },
  mestesuguri: {
    label: "producție artizanală",
    site: "portofoliu vizual și poveste de brand — ce face diferența la produsele lucrate manual",
    magazin: "vânzare directă către clienți din toată țara, cu produse la comandă",
    automatizari:
      "preluarea comenzilor personalizate și urmărirea stadiului fiecărei piese",
  },
};

// ─────────────────────────────────────────────────────────────────────────────

export type City = {
  /** slug fără diacritice, folosit în URL */
  slug: string;
  /** numele cu diacritice, folosit în text */
  name: string;
  /** județul, cu diacritice */
  county: string;
  /** regiunea istorică */
  region: string;
  size: CitySize;
  /** 3–4 industrii dominante, ordonate după relevanță */
  industries: IndustryKey[];
  /** 1–2 propoziții unice despre profilul economic al orașului */
  localNote: string;
  /** 1 propoziție unică despre starea concurenței online din oraș */
  digitalNote: string;
  /** localități din zonă deservite de aici (pentru long-tail) */
  areas: string[];
  /** slug-urile orașelor vecine, pentru internal linking */
  nearby: string[];
};

export const CITIES: City[] = [
  {
    slug: "constanta",
    name: "Constanța",
    county: "Constanța",
    region: "Dobrogea",
    size: "metropola",
    industries: ["turism", "transport", "logistica", "horeca"],
    localNote:
      "Constanța trăiește din port și din litoral: cel mai mare port de la Marea Neagră aduce firme de transport, expediții și depozitare, iar sezonul estival concentrează într-o vară cât un an întreg de cifră de afaceri pentru HoReCa și cazare.",
    digitalNote:
      "Foarte multe firme locale se bazează încă exclusiv pe Facebook și pe platformele de booking — un site propriu, bine structurat, urcă rapid pe căutările locale.",
    areas: ["Mamaia", "Năvodari", "Ovidiu", "Agigea", "Eforie", "Techirghiol", "Cumpăna"],
    nearby: ["mangalia", "navodari", "medgidia", "tulcea"],
  },
  {
    slug: "bucuresti",
    name: "București",
    county: "București",
    region: "Muntenia",
    size: "metropola",
    industries: ["it", "servicii", "imobiliare", "retail"],
    localNote:
      "București concentrează cea mai mare densitate de firme din țară și, implicit, cea mai dură concurență pe căutări. Aici diferența nu o mai face simpla existență a unui site, ci viteza, structura și claritatea ofertei.",
    digitalNote:
      "Pe piața bucureșteană aproape toată lumea are site — avantajul se câștigă din poziționare pe nișă și din pagini de serviciu bine făcute, nu dintr-un homepage generic.",
    areas: ["Sector 1", "Sector 2", "Sector 3", "Sector 4", "Sector 5", "Sector 6", "Voluntari", "Popești-Leordeni"],
    nearby: ["buftea", "giurgiu", "ploiesti", "targoviste"],
  },
  {
    slug: "cluj-napoca",
    name: "Cluj-Napoca",
    county: "Cluj",
    region: "Transilvania",
    size: "metropola",
    industries: ["it", "educatie", "imobiliare", "servicii"],
    localNote:
      "Cluj-Napoca este al doilea pol IT al țării și un oraș universitar mare — clienții de aici compară ofertele tehnic și se uită la stack, la viteză și la cine rămâne proprietarul codului.",
    digitalNote:
      "Nivelul de așteptare digitală este ridicat: un site lent sau un design de acum cinci ani pierde clientul înainte să citească oferta.",
    areas: ["Mănăștur", "Mărăști", "Gheorgheni", "Zorilor", "Florești", "Apahida", "Baciu"],
    nearby: ["targu-mures", "zalau", "bistrita", "alba-iulia"],
  },
  {
    slug: "timisoara",
    name: "Timișoara",
    county: "Timiș",
    region: "Banat",
    size: "metropola",
    industries: ["auto", "industrie", "it", "servicii"],
    localNote:
      "Timișoara are o economie puternic industrială, cu furnizori pentru industria auto și producători care lucrează mult pe export — de aici nevoia frecventă de site bilingv și de cataloage tehnice descărcabile.",
    digitalNote:
      "Firmele de producție din zonă au adesea site-uri vechi, făcute o dată și uitate; o refacere corectă aduce lead-uri B2B care acum ajung la concurența din Ungaria sau Serbia.",
    areas: ["Dumbrăvița", "Giroc", "Ghiroda", "Moșnița Nouă", "Lugoj", "Sânnicolau Mare"],
    nearby: ["arad", "resita", "deva"],
  },
  {
    slug: "iasi",
    name: "Iași",
    county: "Iași",
    region: "Moldova",
    size: "metropola",
    industries: ["it", "educatie", "medical", "imobiliare"],
    localNote:
      "Iași combină cel mai mare centru universitar din Moldova cu un sector IT în creștere și cu o piață medicală privată foarte activă — trei domenii în care programarea online și prezentarea clară a specializărilor fac diferența.",
    digitalNote:
      "Concurența locală crește rapid, dar multe cabinete și firme de servicii încă nu au nici măcar programare online.",
    areas: ["Copou", "Tătărași", "Păcurari", "Miroslava", "Valea Lupului", "Popricani"],
    nearby: ["botosani", "vaslui", "piatra-neamt", "suceava"],
  },
  {
    slug: "brasov",
    name: "Brașov",
    county: "Brașov",
    region: "Transilvania",
    size: "metropola",
    industries: ["turism", "horeca", "industrie", "imobiliare"],
    localNote:
      "Brașovul are două sezoane turistice pe an și o zonă industrială solidă în jurul orașului — pensiunile din Poiana Brașov și din Bran concurează direct cu platformele de booking pentru aceleași rezervări.",
    digitalNote:
      "În turismul brașovean, cine are site propriu cu rezervare directă păstrează 15–20% din valoarea fiecărei rezervări, bani care altfel pleacă în comision.",
    areas: ["Poiana Brașov", "Săcele", "Râșnov", "Bran", "Predeal", "Ghimbav", "Codlea"],
    nearby: ["sfantu-gheorghe", "sibiu", "miercurea-ciuc", "targoviste"],
  },
  {
    slug: "craiova",
    name: "Craiova",
    county: "Dolj",
    region: "Oltenia",
    size: "metropola",
    industries: ["auto", "industrie", "agricultura", "retail"],
    localNote:
      "Craiova este centrul economic al Olteniei, cu o industrie auto puternică și un lanț dens de furnizori și service-uri în jurul ei, plus un hinterland agricol care aduce firme de input-uri și procesare.",
    digitalNote:
      "Multe firme craiovene bune tehnic au o prezență online sub nivelul lor real — decalajul se închide cel mai rapid cu pagini de serviciu separate.",
    areas: ["Ișalnița", "Podari", "Filiași", "Băilești", "Calafat", "Segarcea"],
    nearby: ["slatina", "drobeta-turnu-severin", "targu-jiu", "ramnicu-valcea"],
  },
  {
    slug: "galati",
    name: "Galați",
    county: "Galați",
    region: "Moldova",
    size: "metropola",
    industries: ["industrie", "transport", "logistica", "constructii"],
    localNote:
      "Galațiul este definit de combinatul siderurgic și de portul fluvial — un ecosistem de firme de construcții metalice, transport și servicii industriale care vând aproape exclusiv B2B.",
    digitalNote:
      "În B2B-ul gălățean, decizia de achiziție începe tot pe Google: fără pagini tehnice și fișe descărcabile, cererea de ofertă nu ajunge la tine.",
    areas: ["Brăila", "Tecuci", "Șendreni", "Vânători", "Pechea"],
    nearby: ["braila", "focsani", "tulcea", "vaslui"],
  },
  {
    slug: "ploiesti",
    name: "Ploiești",
    county: "Prahova",
    region: "Muntenia",
    size: "mare",
    industries: ["energie", "industrie", "transport", "retail"],
    localNote:
      "Ploieștiul rămâne capitala petrolieră a țării, cu rafinării și un lanț lung de furnizori de echipamente, mentenanță și servicii tehnice — clienți B2B care caută pe Google specificații, nu sloganuri.",
    digitalNote:
      "Firmele tehnice din Prahova pierd cereri pentru că site-urile lor nu au pagini separate pe fiecare categorie de servicii.",
    areas: ["Băicoi", "Câmpina", "Bușteni", "Sinaia", "Blejoi", "Băneasa", "Brazi"],
    nearby: ["bucuresti", "targoviste", "buzau", "brasov"],
  },
  {
    slug: "oradea",
    name: "Oradea",
    county: "Bihor",
    region: "Crișana",
    size: "mare",
    industries: ["turism", "balneo", "industrie", "servicii"],
    localNote:
      "Oradea a investit masiv în centrul istoric și în turismul balnear de la Băile Felix, iar apropierea de graniță aduce clienți din Ungaria — motiv pentru care site-urile bilingve performează aici mai bine decât în alte orașe.",
    digitalNote:
      "Turismul orădean și cel balnear se vând încă mult prin agenții; un canal propriu de rezervare schimbă complet marja.",
    areas: ["Băile Felix", "Sânmartin", "Sântandrei", "Salonta", "Marghita", "Aleșd"],
    nearby: ["satu-mare", "zalau", "arad", "baia-mare"],
  },
  {
    slug: "arad",
    name: "Arad",
    county: "Arad",
    region: "Banat",
    size: "mare",
    industries: ["industrie", "auto", "logistica", "agricultura"],
    localNote:
      "Aradul este un nod logistic spre vestul Europei, cu parcuri industriale și firme de transport internațional care lucrează cu parteneri din Ungaria, Austria și Germania.",
    digitalNote:
      "Pentru firmele arădene care exportă, un site doar în română limitează inutil piața de clienți.",
    areas: ["Vladimirescu", "Sântana", "Pecica", "Ineu", "Lipova", "Chișineu-Criș"],
    nearby: ["timisoara", "oradea", "deva", "resita"],
  },
  {
    slug: "sibiu",
    name: "Sibiu",
    county: "Sibiu",
    region: "Transilvania",
    size: "mare",
    industries: ["turism", "industrie", "auto", "horeca"],
    localNote:
      "Sibiul are un turism urban constant tot anul și o industrie de componente auto bine dezvoltată în jurul orașului — două piețe cu așteptări digitale foarte diferite, dar ambele exigente.",
    digitalNote:
      "Turiștii care caută cazare sau experiențe în Sibiu decid de pe telefon, în câteva secunde: viteza site-ului contează mai mult decât designul.",
    areas: ["Șelimbăr", "Cisnădie", "Avrig", "Mediaș", "Rășinari", "Sibiel"],
    nearby: ["alba-iulia", "brasov", "ramnicu-valcea", "targu-mures"],
  },
  {
    slug: "bacau",
    name: "Bacău",
    county: "Bacău",
    region: "Moldova",
    size: "mare",
    industries: ["industrie", "agroalimentar", "retail", "transport"],
    localNote:
      "Bacăul are o economie mixtă — producție, procesare alimentară și comerț — cu multe firme de familie ajunse la a doua generație, care acum digitalizează procese ținute ani de zile în Excel.",
    digitalNote:
      "Aici automatizarea aduce un câștig mai vizibil decât un site nou: multe firme încă introduc manual aceleași date în trei locuri.",
    areas: ["Onești", "Moinești", "Comănești", "Buhuși", "Hemeiuș", "Mărgineni"],
    nearby: ["piatra-neamt", "vaslui", "focsani", "iasi"],
  },
  {
    slug: "pitesti",
    name: "Pitești",
    county: "Argeș",
    region: "Muntenia",
    size: "mare",
    industries: ["auto", "industrie", "logistica", "retail"],
    localNote:
      "Piteștiul este cel mai concentrat centru auto din România: platforma de la Mioveni și rețeaua de furnizori din jur dictează ritmul economic al întregului județ.",
    digitalNote:
      "Furnizorii auto din Argeș vând B2B, dar sunt verificați online înainte de orice audit — un site slab ridică semne de întrebare despre firmă.",
    areas: ["Mioveni", "Ștefănești", "Bascov", "Bradu", "Curtea de Argeș", "Câmpulung"],
    nearby: ["ramnicu-valcea", "targoviste", "slatina", "bucuresti"],
  },
  {
    slug: "braila",
    name: "Brăila",
    county: "Brăila",
    region: "Muntenia",
    size: "mare",
    industries: ["agricultura", "transport", "industrie", "constructii"],
    localNote:
      "Brăila are port fluvial și un hinterland agricol întins în Bărăgan — comerțul cu cereale, transportul și serviciile pentru fermieri formează coloana economică a orașului.",
    digitalNote:
      "Firmele agricole brăilene lucrează mult pe relații, dar noii clienți și furnizorii îi caută întâi online.",
    areas: ["Chiscani", "Movila Miresii", "Ianca", "Însurăței", "Făurei"],
    nearby: ["galati", "buzau", "slobozia", "tulcea"],
  },
  {
    slug: "targu-mures",
    name: "Târgu Mureș",
    county: "Mureș",
    region: "Transilvania",
    size: "mare",
    industries: ["medical", "industrie", "educatie", "servicii"],
    localNote:
      "Târgu Mureș este un pol medical și universitar pentru tot centrul țării, cu clinici private care atrag pacienți din mai multe județe — un context în care programarea online scade dramatic presiunea pe recepție.",
    digitalNote:
      "Piața medicală privată locală este competitivă, dar puține clinici au un flux digital complet de la căutare la programare.",
    areas: ["Sângeorgiu de Mureș", "Cristești", "Ungheni", "Reghin", "Sighișoara", "Luduș"],
    nearby: ["sibiu", "cluj-napoca", "bistrita", "alba-iulia"],
  },
  {
    slug: "baia-mare",
    name: "Baia Mare",
    county: "Maramureș",
    region: "Maramureș",
    size: "mare",
    industries: ["lemn", "mestesuguri", "turism", "industrie"],
    localNote:
      "Baia Mare și Maramureșul trăiesc din prelucrarea lemnului, mobilier la comandă și un turism cultural în creștere — domenii unde imaginea produsului vinde mai mult decât textul.",
    digitalNote:
      "Atelierele și producătorii locali au produse excelente și fotografii proaste online — acolo se pierde vânzarea.",
    areas: ["Baia Sprie", "Recea", "Tăuții-Măgherăuș", "Sighetu Marmației", "Borșa", "Vișeu de Sus"],
    nearby: ["satu-mare", "zalau", "bistrita", "suceava"],
  },
  {
    slug: "buzau",
    name: "Buzău",
    county: "Buzău",
    region: "Muntenia",
    size: "mediu",
    industries: ["industrie", "agricultura", "transport", "vinificatie"],
    localNote:
      "Buzăul are o industrie de sârmă și materiale de construcții bine înfiptă, iar zona colinară aduce podgorii și producători mici care vând tot mai mult direct către consumator.",
    digitalNote:
      "Producătorii buzoieni care au deschis vânzare directă online au sărit peste intermediari fără să piardă clienții tradiționali.",
    areas: ["Râmnicu Sărat", "Nehoiu", "Pogoanele", "Pătârlagele", "Merei"],
    nearby: ["ploiesti", "braila", "focsani", "slobozia"],
  },
  {
    slug: "botosani",
    name: "Botoșani",
    county: "Botoșani",
    region: "Moldova",
    size: "mediu",
    industries: ["textile", "agricultura", "retail", "servicii"],
    localNote:
      "Botoșaniul are o tradiție de confecții și textile care lucrează în lohn, alături de o agricultură de familie extinsă — două lumi care abia acum încep să vândă și direct, nu doar prin intermediari.",
    digitalNote:
      "Pe piața botoșăneană, un site profesionist te diferențiază imediat, pentru că mulți concurenți nu au deloc.",
    areas: ["Dorohoi", "Darabani", "Săveni", "Flămânzi", "Bucecea"],
    nearby: ["suceava", "iasi", "vaslui"],
  },
  {
    slug: "satu-mare",
    name: "Satu Mare",
    county: "Satu Mare",
    region: "Crișana",
    size: "mediu",
    industries: ["industrie", "lemn", "agricultura", "logistica"],
    localNote:
      "Satu Mare lucrează mult la export, cu firme de mobilă, componente și procesare care livrează în Ungaria și mai departe în UE — de aici cererea constantă de prezentare bilingvă și de fișe tehnice clare.",
    digitalNote:
      "Clientul extern verifică furnizorul pe site înainte de prima discuție; lipsa unei versiuni în engleză sau maghiară costă contracte.",
    areas: ["Carei", "Negrești-Oaș", "Tășnad", "Ardud", "Livada"],
    nearby: ["baia-mare", "oradea", "zalau"],
  },
  {
    slug: "ramnicu-valcea",
    name: "Râmnicu Vâlcea",
    county: "Vâlcea",
    region: "Oltenia",
    size: "mediu",
    industries: ["industrie", "balneo", "turism", "energie"],
    localNote:
      "Vâlcea combină industria chimică din jurul Râmnicului cu stațiunile balneare de pe Valea Oltului — Călimănești, Băile Olănești, Băile Govora — unde sezonul se întinde aproape tot anul.",
    digitalNote:
      "Stațiunile vâlcene depind încă mult de bilete prin agenții; rezervarea directă pe site schimbă structura de costuri.",
    areas: ["Călimănești", "Băile Olănești", "Băile Govora", "Horezu", "Drăgășani", "Brezoi"],
    nearby: ["pitesti", "craiova", "sibiu", "targu-jiu"],
  },
  {
    slug: "suceava",
    name: "Suceava",
    county: "Suceava",
    region: "Bucovina",
    size: "mediu",
    industries: ["turism", "lemn", "agroalimentar", "horeca"],
    localNote:
      "Bucovina are unul dintre cele mai puternice branduri turistice interne, susținut de mănăstiri, pensiuni de familie și producători locali de alimente — un mix care vinde excelent online dacă e prezentat vizual.",
    digitalNote:
      "Pensiunile bucovinene cu site propriu și rezervare directă au un avantaj clar față de cele care depind exclusiv de platforme.",
    areas: ["Gura Humorului", "Vatra Dornei", "Câmpulung Moldovenesc", "Rădăuți", "Fălticeni", "Voroneț"],
    nearby: ["botosani", "piatra-neamt", "baia-mare", "iasi"],
  },
  {
    slug: "piatra-neamt",
    name: "Piatra Neamț",
    county: "Neamț",
    region: "Moldova",
    size: "mediu",
    industries: ["turism", "industrie", "lemn", "horeca"],
    localNote:
      "Piatra Neamț este poarta către Ceahlău și Bicaz, cu un turism montan care a crescut constant și cu firme de prelucrare a lemnului în toată zona Neamțului.",
    digitalNote:
      "Turismul din Neamț se vinde azi în primul rând din fotografii și hartă — două lucruri pe care majoritatea site-urilor locale le tratează superficial.",
    areas: ["Roman", "Târgu Neamț", "Bicaz", "Durău", "Săvinești", "Dumbrava Roșie"],
    nearby: ["bacau", "suceava", "iasi", "vaslui"],
  },
  {
    slug: "targu-jiu",
    name: "Târgu Jiu",
    county: "Gorj",
    region: "Oltenia",
    size: "mediu",
    industries: ["energie", "industrie", "turism", "constructii"],
    localNote:
      "Gorjul depinde de complexul energetic și de minerit, iar tranziția energetică împinge firmele locale către servicii noi — construcții, instalații și energie regenerabilă.",
    digitalNote:
      "Firmele gorjene care se reprofilează au nevoie de o poziționare online nouă, pentru că vechea reputație nu se transferă automat pe serviciile noi.",
    areas: ["Motru", "Rovinari", "Novaci", "Târgu Cărbunești", "Bumbești-Jiu", "Runcu"],
    nearby: ["craiova", "drobeta-turnu-severin", "ramnicu-valcea", "deva"],
  },
  {
    slug: "deva",
    name: "Deva",
    county: "Hunedoara",
    region: "Transilvania",
    size: "mediu",
    industries: ["industrie", "turism", "constructii", "transport"],
    localNote:
      "Hunedoara trece de la industria grea la turism și servicii — cetățile, Retezatul și Castelul Corvinilor aduc un flux turistic care nu era valorificat digital acum câțiva ani.",
    digitalNote:
      "Operatorii turistici din județ au conținut bun de arătat, dar îl țin în albume de Facebook, nu într-un site care apare în căutări.",
    areas: ["Hunedoara", "Simeria", "Orăștie", "Hațeg", "Brad", "Petroșani"],
    nearby: ["alba-iulia", "timisoara", "arad", "targu-jiu"],
  },
  {
    slug: "alba-iulia",
    name: "Alba Iulia",
    county: "Alba",
    region: "Transilvania",
    size: "mediu",
    industries: ["turism", "vinificatie", "lemn", "horeca"],
    localNote:
      "Alba Iulia și-a construit un turism urban în jurul Cetății Alba Carolina, iar podgoriile din Alba și zona Apusenilor completează o ofertă locală ușor de vândut online.",
    digitalNote:
      "Cramele și pensiunile din Alba au produs premium, dar prezentare online sub nivelul produsului.",
    areas: ["Sebeș", "Aiud", "Blaj", "Cugir", "Ocna Mureș", "Zlatna"],
    nearby: ["sibiu", "cluj-napoca", "deva", "targu-mures"],
  },
  {
    slug: "bistrita",
    name: "Bistrița",
    county: "Bistrița-Năsăud",
    region: "Transilvania",
    size: "mediu",
    industries: ["lemn", "industrie", "agroalimentar", "turism"],
    localNote:
      "Bistrița are o industrie a lemnului și a mobilei bine așezată și o zonă montană — Colibița, Valea Someșului — cu potențial turistic încă insuficient exploatat online.",
    digitalNote:
      "Producătorii de mobilă din județ primesc comenzi din toată țara atunci când au un configurator online, nu doar o galerie.",
    areas: ["Năsăud", "Beclean", "Sângeorz-Băi", "Colibița", "Prundu Bârgăului"],
    nearby: ["cluj-napoca", "targu-mures", "baia-mare", "suceava"],
  },
  {
    slug: "focsani",
    name: "Focșani",
    county: "Vrancea",
    region: "Moldova",
    size: "mediu",
    industries: ["vinificatie", "agricultura", "agroalimentar", "retail"],
    localNote:
      "Vrancea este una dintre cele mai mari podgorii din țară — Odobești, Panciu, Cotești — iar vânzarea directă de vin către consumator a crescut puternic în ultimii ani.",
    digitalNote:
      "Cramele vrâncene care vând online ajung la clienți din București și Cluj fără niciun distribuitor la mijloc.",
    areas: ["Odobești", "Panciu", "Mărășești", "Adjud", "Cotești"],
    nearby: ["galati", "buzau", "bacau", "braila"],
  },
  {
    slug: "targoviste",
    name: "Târgoviște",
    county: "Dâmbovița",
    region: "Muntenia",
    size: "mediu",
    industries: ["industrie", "turism", "constructii", "agricultura"],
    localNote:
      "Târgoviște are un trecut industrial metalurgic și un centru istoric care atrage turism de weekend din București — două piețe complet diferite, care cer abordări digitale separate.",
    digitalNote:
      "Proximitatea de București înseamnă că firmele locale concurează cu agenții din Capitală, dar pot câștiga pe căutările cu specific local.",
    areas: ["Moreni", "Pucioasa", "Găești", "Fieni", "Titu"],
    nearby: ["ploiesti", "pitesti", "bucuresti", "brasov"],
  },
  {
    slug: "slatina",
    name: "Slatina",
    county: "Olt",
    region: "Oltenia",
    size: "mediu",
    industries: ["industrie", "agricultura", "transport", "constructii"],
    localNote:
      "Slatina este dominată de industria aluminiului și de firmele conexe, într-un județ cu suprafețe agricole mari și cu multe societăți de prestări servicii agricole.",
    digitalNote:
      "În Olt, firmele cu site propriu sunt încă minoritare — o pagină bine făcută prinde primele poziții pe căutările locale fără efort mare.",
    areas: ["Caracal", "Balș", "Corabia", "Scornicești", "Drăgănești-Olt"],
    nearby: ["craiova", "pitesti", "ramnicu-valcea", "alexandria"],
  },
  {
    slug: "drobeta-turnu-severin",
    name: "Drobeta-Turnu Severin",
    county: "Mehedinți",
    region: "Oltenia",
    size: "mediu",
    industries: ["turism", "transport", "energie", "horeca"],
    localNote:
      "Severinul stă pe Dunăre, lângă Porțile de Fier și Cazane — un culoar turistic care atrage vizitatori români și sârbi, plus activitate de transport fluvial și energie hidro.",
    digitalNote:
      "Turismul de pe Clisura Dunării se caută intens vara, dar puțini operatori locali apar în primele rezultate.",
    areas: ["Orșova", "Strehaia", "Vânju Mare", "Baia de Aramă", "Eșelnița"],
    nearby: ["targu-jiu", "craiova", "resita"],
  },
  {
    slug: "resita",
    name: "Reșița",
    county: "Caraș-Severin",
    region: "Banat",
    size: "mediu",
    industries: ["industrie", "turism", "lemn", "constructii"],
    localNote:
      "Reșița are o istorie siderurgică lungă, iar județul Caraș-Severin a devenit destinație pentru turismul de natură — Semenic, Cheile Nerei, Valea Almăjului.",
    digitalNote:
      "Pensiunile din Caraș-Severin depind de grupuri de Facebook pentru rezervări; un site cu disponibilitate clară le dublează încrederea.",
    areas: ["Caransebeș", "Bocșa", "Oravița", "Anina", "Băile Herculane", "Moldova Nouă"],
    nearby: ["timisoara", "arad", "drobeta-turnu-severin", "deva"],
  },
  {
    slug: "tulcea",
    name: "Tulcea",
    county: "Tulcea",
    region: "Dobrogea",
    size: "mediu",
    industries: ["turism", "horeca", "transport", "agroalimentar"],
    localNote:
      "Tulcea este poarta Deltei Dunării — un turism de nișă, scump și sezonier, unde clientul caută pe Google pensiuni, tururi și pescuit sportiv cu luni înainte de sosire.",
    digitalNote:
      "În Deltă, rezervarea se face aproape exclusiv online: cine nu apare în căutări nu există pentru turistul din afara județului.",
    areas: ["Sulina", "Crișan", "Murighiol", "Sfântu Gheorghe (Deltă)", "Măcin", "Babadag", "Jurilovca"],
    nearby: ["constanta", "braila", "galati"],
  },
  {
    slug: "calarasi",
    name: "Călărași",
    county: "Călărași",
    region: "Muntenia",
    size: "mediu",
    industries: ["agricultura", "agroalimentar", "transport", "industrie"],
    localNote:
      "Călărași este un județ agricol de câmpie, cu ferme mari, silozuri și firme de servicii agricole, plus schimburi comerciale constante peste Dunăre, cu Bulgaria.",
    digitalNote:
      "Firmele agricole din Călărași folosesc încă hârtie și Excel pentru evidențe pe care un sistem simplu le-ar ține automat.",
    areas: ["Oltenița", "Lehliu-Gară", "Budești", "Fundulea", "Dragalina"],
    nearby: ["slobozia", "bucuresti", "giurgiu", "braila"],
  },
  {
    slug: "giurgiu",
    name: "Giurgiu",
    county: "Giurgiu",
    region: "Muntenia",
    size: "mediu",
    industries: ["transport", "logistica", "agricultura", "constructii"],
    localNote:
      "Giurgiu trăiește din punctul de trecere spre Bulgaria și din traficul de marfă asociat — vamă, expediții, depozitare — într-un județ altfel puternic agricol.",
    digitalNote:
      "Firmele de transport din Giurgiu primesc cereri internaționale; fără un site în engleză, cererile ajung la concurență.",
    areas: ["Bolintin-Vale", "Mihăilești", "Comana", "Ghimpați", "Bolintin-Deal"],
    nearby: ["bucuresti", "alexandria", "calarasi"],
  },
  {
    slug: "alexandria",
    name: "Alexandria",
    county: "Teleorman",
    region: "Muntenia",
    size: "mic",
    industries: ["agricultura", "agroalimentar", "retail", "transport"],
    localNote:
      "Teleormanul este unul dintre cele mai agricole județe din țară, cu exploatații mari și cu firme de input-uri, service utilaje și transport cereale concentrate în jurul Alexandriei.",
    digitalNote:
      "Concurența online locală este redusă — un site corect construit prinde rapid pagina 1 pe căutările din județ.",
    areas: ["Roșiori de Vede", "Turnu Măgurele", "Zimnicea", "Videle"],
    nearby: ["giurgiu", "slatina", "bucuresti"],
  },
  {
    slug: "slobozia",
    name: "Slobozia",
    county: "Ialomița",
    region: "Muntenia",
    size: "mic",
    industries: ["agricultura", "agroalimentar", "transport", "industrie"],
    localNote:
      "Slobozia stă în mijlocul Bărăganului, cu procesare de cereale, ferme mari și o industrie alimentară care livrează în toată țara.",
    digitalNote:
      "Producătorii din Ialomița vând bine B2B, dar pierd complet segmentul de vânzare directă, unde marja e dublă.",
    areas: ["Fetești", "Urziceni", "Țăndărei", "Amara", "Căzănești"],
    nearby: ["calarasi", "braila", "buzau", "bucuresti"],
  },
  {
    slug: "vaslui",
    name: "Vaslui",
    county: "Vaslui",
    region: "Moldova",
    size: "mic",
    industries: ["agricultura", "textile", "retail", "servicii"],
    localNote:
      "Vasluiul are o economie bazată pe agricultură, confecții și comerț, cu firme mici care se bazează aproape exclusiv pe clienți din județ.",
    digitalNote:
      "Tocmai pentru că puține firme vasluiene investesc în online, cine o face ajunge repede prima pe căutările locale.",
    areas: ["Bârlad", "Huși", "Negrești", "Murgeni"],
    nearby: ["iasi", "bacau", "galati", "botosani"],
  },
  {
    slug: "zalau",
    name: "Zalău",
    county: "Sălaj",
    region: "Transilvania",
    size: "mic",
    industries: ["industrie", "lemn", "agricultura", "constructii"],
    localNote:
      "Zalăul are producție de anvelope și materiale de construcții, iar în rest Sălajul e un județ de firme mici, multe în prelucrarea lemnului și în construcții.",
    digitalNote:
      "Firmele sălăjene care lucrează pentru clienți din Cluj sau Oradea au nevoie de un site care să le scoată din zona de „furnizor local anonim”.",
    areas: ["Șimleu Silvaniei", "Jibou", "Cehu Silvaniei", "Crasna"],
    nearby: ["cluj-napoca", "oradea", "satu-mare", "baia-mare"],
  },
  {
    slug: "sfantu-gheorghe",
    name: "Sfântu Gheorghe",
    county: "Covasna",
    region: "Transilvania",
    size: "mic",
    industries: ["turism", "balneo", "lemn", "agroalimentar"],
    localNote:
      "Covasna are turism balnear — Covasna, Malnaș, Balvanyos — și o rețea de producători mici de alimente, într-un județ majoritar maghiarofon unde site-urile bilingve sunt regula, nu excepția.",
    digitalNote:
      "Un site doar în română pierde jumătate din publicul local; unul doar în maghiară pierde turiștii din restul țării.",
    areas: ["Târgu Secuiesc", "Covasna", "Baraolt", "Întorsura Buzăului"],
    nearby: ["brasov", "miercurea-ciuc", "buzau"],
  },
  {
    slug: "miercurea-ciuc",
    name: "Miercurea Ciuc",
    county: "Harghita",
    region: "Transilvania",
    size: "mic",
    industries: ["turism", "balneo", "lemn", "agroalimentar"],
    localNote:
      "Harghita trăiește din turismul montan și balnear — Lacu Roșu, Băile Tușnad, Praid — și din prelucrarea lemnului, cu foarte multe pensiuni de familie.",
    digitalNote:
      "Pensiunile din Harghita au ocupare bună în sezon, dar rezervările vin prin platforme care iau comision; canalul direct e încă neexploatat.",
    areas: ["Odorheiu Secuiesc", "Gheorgheni", "Toplița", "Băile Tușnad", "Praid", "Borsec"],
    nearby: ["sfantu-gheorghe", "brasov", "targu-mures", "piatra-neamt"],
  },
  {
    slug: "buftea",
    name: "Buftea",
    county: "Ilfov",
    region: "Muntenia",
    size: "mic",
    industries: ["logistica", "imobiliare", "constructii", "servicii"],
    localNote:
      "Ilfovul este centura economică a Bucureștiului: depozite, parcuri logistice și ansambluri rezidențiale care cresc an de an în jurul Buftei, Otopeniului și Voluntariului.",
    digitalNote:
      "Firmele din Ilfov concurează pe aceleași căutări cu cele din București, dar pot câștiga pe termeni cu specific local.",
    areas: ["Otopeni", "Voluntari", "Bragadiru", "Chitila", "Popești-Leordeni", "Pantelimon", "Mogoșoaia"],
    nearby: ["bucuresti", "targoviste", "giurgiu"],
  },
  // ── Localități suplimentare din județul Constanța (zona de bază AiWANT) ──────
  {
    slug: "mangalia",
    name: "Mangalia",
    county: "Constanța",
    region: "Dobrogea",
    size: "mic",
    industries: ["turism", "balneo", "horeca", "constructii"],
    localNote:
      "Mangalia adună stațiunile din sudul litoralului — Saturn, Venus, Jupiter, Neptun, Olimp — plus turism balnear și un șantier naval care susține economia orașului în afara sezonului.",
    digitalNote:
      "Pe litoralul de sud, sezonul se joacă în trei luni: cine nu apare în căutări în februarie–aprilie pierde vara.",
    areas: ["Saturn", "Venus", "Jupiter", "Neptun", "Olimp", "2 Mai", "Vama Veche", "Limanu"],
    nearby: ["constanta", "medgidia", "navodari"],
  },
  {
    slug: "navodari",
    name: "Năvodari",
    county: "Constanța",
    region: "Dobrogea",
    size: "mic",
    industries: ["turism", "industrie", "horeca", "constructii"],
    localNote:
      "Năvodari a crescut puternic pe zona rezidențială și de cazare de pe Mamaia Nord, peste baza industrială petrochimică moștenită de la Midia.",
    digitalNote:
      "Zona Mamaia Nord s-a umplut de regimuri hoteliere mici care se promovează doar pe Instagram — un site propriu le dă un canal de rezervare care nu depinde de algoritm.",
    areas: ["Mamaia Nord", "Corbu", "Lumina", "Ovidiu", "Sibioara"],
    nearby: ["constanta", "mangalia", "medgidia"],
  },
  {
    slug: "medgidia",
    name: "Medgidia",
    county: "Constanța",
    region: "Dobrogea",
    size: "mic",
    industries: ["industrie", "agricultura", "transport", "constructii"],
    localNote:
      "Medgidia este nodul industrial și feroviar al Dobrogei interioare, cu fabrica de ciment, firme de construcții și un hinterland agricol care alimentează silozurile din zonă.",
    digitalNote:
      "Firmele din Medgidia lucrează mult ca subcontractori; un site propriu le aduce clienți direcți, nu doar prin lanțul de contractori.",
    areas: ["Cernavodă", "Murfatlar", "Basarabi", "Castelu", "Poarta Albă"],
    nearby: ["constanta", "mangalia", "navodari", "calarasi"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SERVICIILE oferite la nivel local (3 × fiecare oraș)
// ─────────────────────────────────────────────────────────────────────────────

export type LocalServiceKey = "site" | "magazin" | "automatizari";

export type LocalService = {
  key: LocalServiceKey;
  /** prefixul de URL: /<urlPrefix>-<citySlug> */
  urlPrefix: string;
  /** eticheta scurtă, pentru breadcrumb și linkuri */
  label: string;
  /** verbul + substantivul folosit în H1: "Creare site web în Constanța" */
  h1Lead: string;
  /** pagina de serviciu națională către care se face link-ul de autoritate */
  parentSlug: string;
  icon: string;
  priceFrom: string;
  priceFromRON: string;
  delivery: string;
  /** cuvintele-cheie secundare pe care le ținem în text */
  secondaryKeywords: string[];
  includes: string[];
};

export const LOCAL_SERVICES: Record<LocalServiceKey, LocalService> = {
  site: {
    key: "site",
    urlPrefix: "creare-site-web",
    label: "Creare site web",
    h1Lead: "Creare site web",
    parentSlug: "site-prezentare",
    icon: "Globe",
    priceFrom: "249 EUR",
    priceFromRON: "~1.245 RON",
    delivery: "2–3 zile lucrătoare",
    secondaryKeywords: [
      "realizare site web",
      "creare site de prezentare",
      "firmă web design",
      "site de prezentare preț",
    ],
    includes: [
      "Design personalizat, fără template-uri cumpărate",
      "Responsive complet — telefon, tabletă, desktop",
      "Optimizare SEO tehnică: titluri, meta, sitemap, schema markup",
      "Formular de contact cu notificare pe email și WhatsApp",
      "Certificat SSL și hosting incluse",
      "Google Analytics și Search Console configurate",
      "Cod sursă predat integral",
    ],
  },
  magazin: {
    key: "magazin",
    urlPrefix: "magazin-online",
    label: "Magazin online",
    h1Lead: "Magazin online",
    parentSlug: "magazine-online",
    icon: "ShoppingCart",
    priceFrom: "699 EUR",
    priceFromRON: "~3.495 RON",
    delivery: "2–4 săptămâni",
    secondaryKeywords: [
      "creare magazin online",
      "site de vânzări online",
      "platformă e-commerce",
      "magazin online preț",
    ],
    includes: [
      "Catalog de produse cu variante, categorii și filtre",
      "Coș de cumpărături și checkout optimizat pentru mobil",
      "Integrare procesator de plăți și plată ramburs",
      "Panou de administrare pentru produse, comenzi și stocuri",
      "Integrare cu firme de curierat",
      "Facturare automată la fiecare comandă",
      "Cod sursă predat integral",
    ],
  },
  automatizari: {
    key: "automatizari",
    urlPrefix: "automatizari-firme",
    label: "Automatizări",
    h1Lead: "Automatizări pentru firme",
    parentSlug: "ai-automatizari",
    icon: "Bot",
    priceFrom: "100 EUR",
    priceFromRON: "~500 RON",
    delivery: "1–3 săptămâni",
    secondaryKeywords: [
      "automatizare procese business",
      "automatizări n8n",
      "integrări API",
      "digitalizare firmă",
    ],
    includes: [
      "Audit gratuit al proceselor repetitive din firmă",
      "Fluxuri automate construite în n8n sau cod dedicat",
      "Integrări între aplicațiile pe care le folosești deja",
      "Procesare automată de documente și facturi",
      "Chatboți și asistenți AI pe datele firmei",
      "Rapoarte automate pe email sau WhatsApp",
      "Monitorizare și suport după implementare",
    ],
  },
};

export const LOCAL_SERVICE_ORDER: LocalServiceKey[] = ["site", "magazin", "automatizari"];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

export type LocalPage = {
  slug: string;
  city: City;
  service: LocalService;
};

export function localSlug(serviceKey: LocalServiceKey, citySlug: string): string {
  return `${LOCAL_SERVICES[serviceKey].urlPrefix}-${citySlug}`;
}

let cachedPages: LocalPage[] | null = null;

export function getAllLocalPages(): LocalPage[] {
  if (cachedPages) return cachedPages;
  const pages: LocalPage[] = [];
  for (const city of CITIES) {
    for (const key of LOCAL_SERVICE_ORDER) {
      const service = LOCAL_SERVICES[key];
      pages.push({ slug: `${service.urlPrefix}-${city.slug}`, city, service });
    }
  }
  cachedPages = pages;
  return pages;
}

const pageIndex = new Map<string, LocalPage>();

export function getLocalPage(slug: string): LocalPage | undefined {
  if (pageIndex.size === 0) {
    for (const page of getAllLocalPages()) pageIndex.set(page.slug, page);
  }
  return pageIndex.get(slug);
}

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

/**
 * Variantă deterministă pe baza slug-ului. Folosită ca să nu aibă toate
 * paginile aceeași ordine de secțiuni și aceleași formulări de introducere —
 * două pagini vecine arată diferit, dar rezultatul e stabil între build-uri.
 */
export function variantIndex(slug: string, buckets: number): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) % 100000;
  }
  return hash % buckets;
}
