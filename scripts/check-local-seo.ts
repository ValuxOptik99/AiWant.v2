/**
 * Verificare pentru paginile locale generate (/creare-site-web-<oras> etc.).
 *
 *   npx tsx scripts/check-local-seo.ts
 *
 * Rulează pe textul REAL produs de lib/local-seo-copy.ts pentru toate cele ~135
 * de pagini. Motivul pentru care există: la conținut generat prin interpolare,
 * o singură formulare greșită se multiplică instant în toate orașele, iar
 * greșelile nu se văd citind codul — se văd doar citind rezultatul.
 *
 * Ieșire: cod 0 dacă totul trece, 1 dacă a picat ceva (utilizabil în CI).
 */

import { readFileSync } from "node:fs";
import { buildLocalPageCopy, type LocalPageCopy } from "@/lib/local-seo-copy";
import { CITIES, getAllLocalPages } from "@/lib/local-seo-data";

const TITLE_MAX = 62;
const DESC_MIN = 120;
const DESC_MAX = 165;
const DUPLICATE_THRESHOLD = 0.85;

const pages = getAllLocalPages().map((page) => ({
  serviceKey: page.service.key,
  copy: buildLocalPageCopy(page),
}));

const passed: string[] = [];
const failed: string[] = [];

function check(condition: boolean, okMessage: string, failMessage: string) {
  (condition ? passed : failed).push(condition ? okMessage : failMessage);
}

/** Tot textul vizibil al unei pagini, într-un singur șir. */
function fullText(c: LocalPageCopy): string {
  return [
    c.metaTitle,
    c.metaDescription,
    c.h1,
    c.subtitle,
    c.intro,
    c.digitalNote,
    c.areasIntro,
    ...c.industryBlocks.flatMap((b) => [b.title, b.body]),
    ...c.faq.flatMap((f) => [f.question, f.answer]),
    ...c.siblingServices.map((s) => s.label),
    ...c.nearbyLinks.map((l) => l.label),
  ].join(" \n ");
}

function duplicates<T>(values: T[]): T[] {
  return [...new Set(values.filter((v, i) => values.indexOf(v) !== i))];
}

// ── 1. Slug-uri unice ────────────────────────────────────────────────────────
const slugs = pages.map((p) => p.copy.slug);
const dupSlugs = duplicates(slugs);
check(
  dupSlugs.length === 0,
  `1. Slug-uri unice — ${slugs.length} pagini`,
  `1. Slug-uri duplicate: ${dupSlugs.join(", ")}`
);

// ── 2. Referințe între orașe ─────────────────────────────────────────────────
const citySlugs = new Set(CITIES.map((c) => c.slug));
const badRefs: string[] = [];
for (const city of CITIES) {
  for (const nearby of city.nearby) {
    if (!citySlugs.has(nearby)) badRefs.push(`${city.slug} → ${nearby} (inexistent)`);
    if (nearby === city.slug) badRefs.push(`${city.slug} → sine`);
  }
}
const refCount = CITIES.reduce((sum, c) => sum + c.nearby.length, 0);
check(
  badRefs.length === 0,
  `2. Referințe "nearby" valide — ${refCount} linkuri între orașe`,
  `2. Referințe invalide:\n     ${badRefs.join("\n     ")}`
);

// ── 3. Unicitatea metadatelor ────────────────────────────────────────────────
for (const [field, label] of [
  ["metaTitle", "Titluri"],
  ["metaDescription", "Descrieri"],
  ["h1", "H1-uri"],
] as const) {
  const values = pages.map((p) => p.copy[field]);
  const dup = duplicates(values);
  check(
    dup.length === 0,
    `3. ${label} unice — ${values.length}/${values.length}`,
    `3. ${label} duplicate (${dup.length}): ${dup.slice(0, 3).join(" | ")}`
  );
}

// ── 4. Lungimi ───────────────────────────────────────────────────────────────
// Titlul: Google taie pe la ~60 de caractere. Cel mai lung nume de oraș din
// CITIES e "Drobeta-Turnu Severin" (21), deci partea fixă a unei variante de
// titlu trebuie să stea sub ~41 de caractere.
const longTitles = pages.filter((p) => p.copy.metaTitle.length > TITLE_MAX);
check(
  longTitles.length === 0,
  `4a. Titluri ≤ ${TITLE_MAX} car — maxim ${Math.max(...pages.map((p) => p.copy.metaTitle.length))}`,
  `4a. Titluri prea lungi (${longTitles.length}):\n     ` +
    longTitles
      .slice(0, 5)
      .map((p) => `${p.copy.metaTitle.length} — "${p.copy.metaTitle}"`)
      .join("\n     ")
);

const badDesc = pages.filter(
  (p) => p.copy.metaDescription.length < DESC_MIN || p.copy.metaDescription.length > DESC_MAX
);
const descLengths = pages.map((p) => p.copy.metaDescription.length);
check(
  badDesc.length === 0,
  `4b. Descrieri ${DESC_MIN}–${DESC_MAX} car — între ${Math.min(...descLengths)} și ${Math.max(...descLengths)}`,
  `4b. Descrieri în afara intervalului (${badDesc.length}):\n     ` +
    badDesc
      .slice(0, 5)
      .map((p) => `${p.copy.metaDescription.length} — ${p.copy.slug}`)
      .join("\n     ")
);

// ── 5. Duplicare de conținut între pagini din același serviciu ───────────────
function contentTokens(c: LocalPageCopy): Set<string> {
  return new Set(
    fullText(c)
      .toLowerCase()
      .replace(/[^\p{L}\p{N} ]/gu, " ")
      .split(/\s+/)
      .filter((word) => word.length > 3)
  );
}

const byService = new Map<string, { slug: string; tokens: Set<string> }[]>();
for (const { serviceKey, copy } of pages) {
  const list = byService.get(serviceKey) ?? [];
  list.push({ slug: copy.slug, tokens: contentTokens(copy) });
  byService.set(serviceKey, list);
}

const tooSimilar: string[] = [];
let highest = { value: 0, a: "", b: "" };
for (const list of byService.values()) {
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      const a = list[i].tokens;
      const b = list[j].tokens;
      let intersection = 0;
      for (const word of a) if (b.has(word)) intersection++;
      const jaccard = intersection / (a.size + b.size - intersection);
      if (jaccard > highest.value) highest = { value: jaccard, a: list[i].slug, b: list[j].slug };
      if (jaccard > DUPLICATE_THRESHOLD) {
        tooSimilar.push(`${list[i].slug} ~ ${list[j].slug} = ${jaccard.toFixed(3)}`);
      }
    }
  }
}
check(
  tooSimilar.length === 0,
  `5. Duplicare sub prag — suprapunerea maximă ${highest.value.toFixed(3)} (${highest.a} ~ ${highest.b}), prag ${DUPLICATE_THRESHOLD}`,
  `5. Perechi peste pragul ${DUPLICATE_THRESHOLD} (${tooSimilar.length}):\n     ` +
    tooSimilar.slice(0, 8).join("\n     ") +
    `\n     → nu "repara" inventând date despre orașe; îmbogățește lib/local-seo-data.ts cu informație reală.`
);

// ── 6. Artefacte de interpolare și gramatică ─────────────────────────────────
// Fiecare tipar de aici corespunde unui bug care chiar s-a întâmplat.
const PATTERNS: [RegExp, string][] = [
  [/\b(\p{Lu}[\p{L}-]+) și \1\b/u, 'cuvânt repetat — ex. "Constanța și Constanța"'],
  [/restul județul\b/u, '"restul județul" — lipsește genitivul'],
  [/din județului|în județului/u, "genitiv greșit după din/în"],
  [/pentru (\p{Lu}[\p{L}-]+) față de \1/u, '"pentru X față de X"'],
  [/ {2,}/u, "spațiu dublu"],
  [/ [,.]/u, "spațiu înainte de virgulă sau punct"],
  [/lorem|TODO|XXX|TBD/i, "text placeholder rămas"],
  [/\bundefined\b|\bNaN\b|\[object/, "valoare nedefinită ajunsă în text"],
];

const artifacts: string[] = [];
for (const { copy } of pages) {
  const text = fullText(copy);
  for (const [pattern, label] of PATTERNS) {
    const match = text.match(pattern);
    if (match) artifacts.push(`${copy.slug}: ${label} → "${match[0].trim()}"`);
  }
}
check(
  artifacts.length === 0,
  `6. Artefacte gramaticale — 0 pe ${pages.length} pagini (${PATTERNS.length} tipare verificate)`,
  `6. Artefacte gramaticale (${artifacts.length}):\n     ` + artifacts.slice(0, 12).join("\n     ")
);


// ── 7. Paginile editoriale (scrise de mână, nu generate) ─────────────────────
// Aceleași limite de lungime se aplică și aici. Sunt scrise manual, deci nimeni
// nu numără caracterele — de asta le numără scriptul. Trei din patru depășeau
// 165 la prima verificare.
const EDITORIAL_ROUTES = [
  "cat-costa-un-site",
  "pret-magazin-online",
  "wordpress-vs-site-custom",
  "agentie-web-vs-freelancer",
];

const editorialProblems: string[] = [];
const editorialLengths: number[] = [];

for (const route of EDITORIAL_ROUTES) {
  let source: string;
  try {
    source = readFileSync(`app/${route}/page.tsx`, "utf8");
  } catch {
    editorialProblems.push(`${route}: app/${route}/page.tsx nu există`);
    continue;
  }

  const title = source.match(/title:\s*\n?\s*"([^"]*)"/)?.[1];
  const description = source.match(/description:\s*\n?\s*"([^"]*)"/)?.[1];

  if (!title) editorialProblems.push(`${route}: lipsește metadata.title`);
  else if (title.length > TITLE_MAX)
    editorialProblems.push(`${route}: titlu ${title.length} car (max ${TITLE_MAX}) — "${title}"`);

  if (!description) editorialProblems.push(`${route}: lipsește metadata.description`);
  else {
    editorialLengths.push(description.length);
    if (description.length < DESC_MIN || description.length > DESC_MAX)
      editorialProblems.push(`${route}: descriere ${description.length} car (${DESC_MIN}–${DESC_MAX})`);
  }

  if (!new RegExp(`canonical:\\s*"/${route}"`).test(source))
    editorialProblems.push(`${route}: canonical lipsă sau diferit de "/${route}"`);

  if (!source.includes("faqJsonLd"))
    editorialProblems.push(`${route}: fără FAQPage JSON-LD`);
}

check(
  editorialProblems.length === 0,
  `7. Pagini editoriale — ${EDITORIAL_ROUTES.length}/${EDITORIAL_ROUTES.length} cu titlu, descriere (${Math.min(...editorialLengths)}–${Math.max(...editorialLengths)} car), canonical și FAQ JSON-LD`,
  `7. Probleme pe paginile editoriale (${editorialProblems.length}):\n     ` + editorialProblems.join("\n     ")
);

// ── Raport ───────────────────────────────────────────────────────────────────
console.log("\n=== TRECUT ===");
for (const line of passed) console.log("  ✓ " + line);
if (failed.length > 0) {
  console.log("\n=== PICAT ===");
  for (const line of failed) console.log("  ✗ " + line);
}
console.log(`\n${pages.length} pagini verificate · ${failed.length} verificări picate.\n`);

process.exit(failed.length > 0 ? 1 : 0);
