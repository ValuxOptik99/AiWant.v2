// Verificare paginilor locale de SEO — rulează cu `npx tsx scripts/check-local-seo.ts`.
//
// Nu "repară" nimic — doar raportează. Pragul de duplicare (5) mai ales: dacă
// apar perechi peste 0.85, soluția e să scrii mai multe fapte specifice
// orașelor respective în lib/local-seo-data.ts, nu să inventezi date.

import { CITIES, getAllLocalPages, getCityBySlug } from "../lib/local-seo-data";
import { buildLocalPageCopy, type LocalPageCopy } from "../lib/local-seo-copy";
import type { LocalPage } from "../lib/local-seo-data";

let failures = 0;
let warnings = 0;

function fail(msg: string) {
  failures++;
  console.log(`  ✗ ${msg}`);
}

function warn(msg: string) {
  warnings++;
  console.log(`  ⚠ ${msg}`);
}

function section(title: string) {
  console.log(`\n${title}`);
}

const pages: LocalPage[] = getAllLocalPages();
const copies: { page: LocalPage; copy: LocalPageCopy }[] = pages.map((page) => ({
  page,
  copy: buildLocalPageCopy(page),
}));

console.log(`Verific ${pages.length} pagini locale (${CITIES.length} orașe × 3 servicii)...`);

// ── 1. Slug-uri unice ───────────────────────────────────────────────────────
section("1. Slug-uri unice");
{
  const citySlugs = CITIES.map((c) => c.slug);
  const dupCity = citySlugs.filter((s, i) => citySlugs.indexOf(s) !== i);
  if (dupCity.length > 0) {
    fail(`Slug-uri de oraș duplicate: ${[...new Set(dupCity)].join(", ")}`);
  }

  const pageSlugs = pages.map((p) => p.slug);
  const dupPages = pageSlugs.filter((s, i) => pageSlugs.indexOf(s) !== i);
  if (dupPages.length > 0) {
    fail(`Slug-uri de pagină duplicate: ${[...new Set(dupPages)].join(", ")}`);
  }

  if (dupCity.length === 0 && dupPages.length === 0) {
    console.log(`  ✓ ${citySlugs.length} slug-uri de oraș și ${pageSlugs.length} slug-uri de pagină, toate unice.`);
  }
}

// ── 2. Referințe valide (nearby) ─────────────────────────────────────────────
section("2. Referințe valide în `nearby`");
{
  let checked = 0;
  for (const city of CITIES) {
    for (const nearbySlug of city.nearby) {
      checked++;
      if (nearbySlug === city.slug) {
        fail(`${city.slug}: se auto-referențiază în nearby`);
        continue;
      }
      if (!getCityBySlug(nearbySlug)) {
        fail(`${city.slug}: nearby conține "${nearbySlug}", care nu există în CITIES`);
      }
    }
  }
  if (failures === 0) console.log(`  ✓ ${checked} referințe nearby verificate, toate valide.`);
}

// ── 3. Unicitatea titlurilor și descrierilor ─────────────────────────────────
section("3. Unicitatea titlurilor și descrierilor");
{
  const titleMap = new Map<string, string[]>();
  const descMap = new Map<string, string[]>();
  for (const { page, copy } of copies) {
    (titleMap.get(copy.metaTitle) ?? titleMap.set(copy.metaTitle, []).get(copy.metaTitle)!).push(page.slug);
    (descMap.get(copy.metaDescription) ?? descMap.set(copy.metaDescription, []).get(copy.metaDescription)!).push(
      page.slug
    );
  }
  let dupTitles = 0;
  for (const [title, slugs] of titleMap) {
    if (slugs.length > 1) {
      dupTitles++;
      fail(`metaTitle identic pe ${slugs.length} pagini: "${title}" — ${slugs.join(", ")}`);
    }
  }
  let dupDescs = 0;
  for (const [desc, slugs] of descMap) {
    if (slugs.length > 1) {
      dupDescs++;
      fail(`metaDescription identică pe ${slugs.length} pagini: "${desc.slice(0, 60)}…" — ${slugs.join(", ")}`);
    }
  }
  if (dupTitles === 0 && dupDescs === 0) {
    console.log(`  ✓ Toate cele ${copies.length} metaTitle și metaDescription sunt distincte.`);
  }
}

// ── 4. Lungimi ────────────────────────────────────────────────────────────────
section("4. Lungimi (metaTitle ≤ 62, metaDescription 120–165)");
{
  let badTitles = 0;
  let badDescs = 0;
  for (const { page, copy } of copies) {
    if (copy.metaTitle.length > 62) {
      badTitles++;
      fail(`${page.slug}: metaTitle are ${copy.metaTitle.length} caractere (max 62) — "${copy.metaTitle}"`);
    }
    if (copy.metaDescription.length < 120 || copy.metaDescription.length > 165) {
      badDescs++;
      fail(
        `${page.slug}: metaDescription are ${copy.metaDescription.length} caractere (interval 120–165)`
      );
    }
  }
  if (badTitles === 0 && badDescs === 0) {
    console.log(`  ✓ Toate titlurile și descrierile respectă limitele de lungime.`);
  }
}

// ── 5. Prag de duplicare (similaritate Jaccard) ──────────────────────────────
section("5. Prag de duplicare — similaritate Jaccard pe conținut (prag 0.85)");
{
  const STOPWORDS = new Set([
    "și", "sau", "de", "din", "la", "cu", "pe", "un", "o", "in", "în", "ce", "care", "nu", "e", "este",
    "sunt", "ai", "au", "va", "vei", "vor", "sa", "să", "ca", "pentru", "prin", "fara", "fără", "mai",
    "cel", "cea", "cele", "acest", "această", "acest", "tale", "tau", "tău", "ta", "ti", "te", "tu",
    "noi", "ne", "iti", "îți", "toate", "toti", "toți", "dintre", "asta", "aceasta", "acesta",
  ]);

  function wordSet(text: string): Set<string> {
    const normalized = text.toLowerCase();
    const words = normalized.match(/[a-zăâîșțâşţ0-9]+/g) ?? [];
    return new Set(words.filter((w) => w.length > 2 && !STOPWORDS.has(w)));
  }

  function contentText(copy: LocalPageCopy): string {
    return [
      copy.intro,
      ...copy.industryBlocks.map((b) => `${b.title} ${b.body}`),
      ...copy.faq.map((f) => `${f.question} ${f.answer}`),
    ].join(" ");
  }

  function jaccard(a: Set<string>, b: Set<string>): number {
    let intersection = 0;
    for (const w of a) if (b.has(w)) intersection++;
    const union = a.size + b.size - intersection;
    return union === 0 ? 0 : intersection / union;
  }

  const byService = new Map<string, { page: LocalPage; copy: LocalPageCopy; words: Set<string> }[]>();
  for (const { page, copy } of copies) {
    const key = page.service.key;
    const words = wordSet(contentText(copy));
    if (!byService.has(key)) byService.set(key, []);
    byService.get(key)!.push({ page, copy, words });
  }

  const THRESHOLD = 0.85;
  const overThreshold: { a: string; b: string; score: number }[] = [];
  let comparisons = 0;

  for (const [, items] of byService) {
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        comparisons++;
        const score = jaccard(items[i].words, items[j].words);
        if (score > THRESHOLD) {
          overThreshold.push({ a: items[i].page.slug, b: items[j].page.slug, score });
        }
      }
    }
  }

  console.log(`  ${comparisons} perechi comparate (în cadrul aceluiași serviciu).`);
  if (overThreshold.length === 0) {
    console.log(`  ✓ Nicio pereche peste pragul de ${THRESHOLD}.`);
  } else {
    overThreshold.sort((a, b) => b.score - a.score);
    warn(`${overThreshold.length} perechi peste pragul de ${THRESHOLD} — conținut posibil prea similar:`);
    for (const { a, b, score } of overThreshold) {
      console.log(`    - ${a}  ×  ${b}   (Jaccard: ${score.toFixed(3)})`);
    }
  }
}

// ── 6. Text placeholder ──────────────────────────────────────────────────────
section("6. Text placeholder (lorem, TODO, XXX, TBD)");
{
  const placeholderRe = /\b(lorem|todo|xxx+|tbd)\b/i;
  let found = 0;
  for (const { page, copy } of copies) {
    const fields: [string, string][] = [
      ["metaTitle", copy.metaTitle],
      ["metaDescription", copy.metaDescription],
      ["h1", copy.h1],
      ["subtitle", copy.subtitle],
      ["intro", copy.intro],
      ["digitalNote", copy.digitalNote],
      ["areasIntro", copy.areasIntro],
      ...copy.industryBlocks.flatMap(
        (b, i): [string, string][] => [
          [`industryBlocks[${i}].title`, b.title],
          [`industryBlocks[${i}].body`, b.body],
        ]
      ),
      ...copy.includes.map((inc, i): [string, string] => [`includes[${i}]`, inc]),
      ...copy.faq.flatMap(
        (f, i): [string, string][] => [
          [`faq[${i}].question`, f.question],
          [`faq[${i}].answer`, f.answer],
        ]
      ),
    ];
    for (const [field, value] of fields) {
      if (placeholderRe.test(value)) {
        found++;
        fail(`${page.slug}: text placeholder găsit în ${field}: "${value.slice(0, 80)}"`);
      }
    }
  }
  if (found === 0) console.log(`  ✓ Niciun text placeholder găsit.`);
}

// ── Rezumat ───────────────────────────────────────────────────────────────────
console.log(`\n${"─".repeat(60)}`);
console.log(`Rezultat: ${failures} eșecuri, ${warnings} avertismente (pagini verificate: ${pages.length}).`);
if (failures > 0) {
  process.exitCode = 1;
}
