# CLAUDE CODE PROMPT — Politica de Confidențialitate + Consent Checkbox

## CONTEXT

The aiwant.ro website needs a proper **Privacy Policy page** (Politica de Confidențialitate) and a **mandatory consent checkbox** on every form that submits personal data (contact form, registration form, onboarding wizard). This is required by GDPR (Regulamentul General privind Protecția Datelor) which applies in Romania as an EU member state.

The company behind the site is **Vendor Comp SRL**, CUI 10000750, based in Constanța, Romania.

---

## TASK 1: Privacy Policy Page

### Route: `/politica-de-confidentialitate`

### Design
- **Same layout as service subpages** — navbar at top, footer at bottom, consistent with the rest of the site
- **Hero section** (small, dark --color-midnight):
  - Title: "Politica de Confidențialitate"
  - Subtitle: "Ultima actualizare: [current date]"
- **Content area** (light background --color-surface):
  - Clean, readable typography
  - Proper heading hierarchy (h2 for sections, h3 for subsections)
  - Max-width 800px, centered
  - Generous line-height (1.8) for readability
  - Sections linked from a mini table of contents at the top

### Content (in Romanian, legally sound for GDPR):

---

**Cuprins** (clickable anchor links to each section below):
1. Cine suntem
2. Ce date colectăm
3. Cum folosim datele tale
4. Temeiul legal al prelucrării
5. Cum stocăm și protejăm datele
6. Cu cine partajăm datele
7. Cookie-uri
8. Drepturile tale
9. Modificări ale politicii
10. Contact

---

**1. Cine suntem**

Acest site web, aiwant.ro, este operat de **SC VENDOR COMP SRL**, CUI 10000750, înregistrată la ORC sub nr. J13/2710/1997, cu sediul în mun. Mangalia, Str. Matei Basarab nr. 29, jud. Constanța, România.

În sensul Regulamentului (UE) 2016/679 (GDPR), Vendor Comp SRL este operator de date cu caracter personal pentru datele colectate prin intermediul acestui site.

**Persoană de contact pentru protecția datelor:**
Email: contact@aiwant.ro
Telefon: +40 7XX XXX XXX

---

**2. Ce date colectăm**

Colectăm următoarele categorii de date cu caracter personal:

**a) Date furnizate direct de tine:**
- **Formularul de contact:** nume, adresă de email, număr de telefon (opțional), tipul proiectului de interes, mesajul tău
- **Înregistrarea contului:** nume, adresă de email, parolă (stocată criptat), numele firmei (opțional), număr de telefon (opțional)
- **Profilul de onboarding:** informații despre firmă (nume, CUI, adresă, domeniu de activitate), prezența online actuală, obiectivele de business, bugetul estimat și preferințele de plată
- **Documente încărcate:** în cadrul portalului de client, documentele contractuale pe care le schimbăm

**b) Date colectate automat:**
- **Date de navigare:** adresă IP, tip browser, sistem de operare, pagini vizitate, durata vizitei, sursa traficului
- **Cookie-uri:** cookie-uri tehnice necesare funcționării site-ului și cookie-uri analitice (Google Analytics) — vezi secțiunea Cookie-uri
- **Date de performanță:** timpii de încărcare a paginilor, erori tehnice (colectate pentru îmbunătățirea serviciului)

---

**3. Cum folosim datele tale**

Folosim datele colectate exclusiv în următoarele scopuri:

- **Comunicare:** pentru a răspunde la mesajele și solicitările tale de ofertă
- **Prestarea serviciilor:** pentru a crea și gestiona contul tău de client, a livra serviciile contractate și a administra relația contractuală
- **Personalizarea ofertei:** pentru a înțelege nevoile tale de business și a pregăti o ofertă adaptată
- **Facturare:** pentru emiterea facturilor fiscale și gestionarea plăților
- **Îmbunătățirea site-ului:** pentru a analiza modul în care este utilizat site-ul și a-l îmbunătăți (prin date analitice anonimizate)
- **Obligații legale:** pentru a respecta obligațiile legale și fiscale aplicabile

**Nu folosim datele tale pentru:**
- Marketing direct nesolicitat (nu trimitem newsletter fără consimțământul tău explicit)
- Vânzarea sau închirierea datelor către terți
- Crearea de profiluri automate pentru luarea de decizii

---

**4. Temeiul legal al prelucrării**

Prelucrăm datele tale cu caracter personal pe baza următoarelor temeiuri legale prevăzute de GDPR:

- **Consimțământul tău** (Art. 6 alin. 1 lit. a GDPR) — atunci când completezi un formular și bifezi căsuța de consimțământ
- **Executarea unui contract** (Art. 6 alin. 1 lit. b GDPR) — atunci când prelucrarea este necesară pentru prestarea serviciilor contractate
- **Interesul nostru legitim** (Art. 6 alin. 1 lit. f GDPR) — pentru îmbunătățirea site-ului și a serviciilor noastre, pe baza datelor analitice anonimizate
- **Obligații legale** (Art. 6 alin. 1 lit. c GDPR) — pentru respectarea legislației fiscale și contabile

---

**5. Cum stocăm și protejăm datele**

- Datele sunt stocate pe servere securizate, cu acces restricționat
- Parolele sunt criptate utilizând algoritmi moderni de hashing (bcrypt)
- Conexiunile sunt protejate prin certificate SSL/TLS (HTTPS)
- Efectuăm backup-uri regulate ale datelor
- Accesul la datele personale este limitat doar la persoanele care au nevoie de ele pentru scopurile menționate mai sus

**Perioada de stocare:**
- **Date din formularul de contact:** maxim 12 luni de la ultima interacțiune, sau până la retragerea consimțământului
- **Date din contul de client:** pe toată durata relației contractuale + 5 ani după încetare (conform obligațiilor legale fiscale)
- **Date analitice:** maxim 26 luni (conform setărilor Google Analytics)
- **Cookie-uri:** conform duratei specificate în secțiunea Cookie-uri

---

**6. Cu cine partajăm datele**

Nu vindem și nu închiriem datele tale cu caracter personal. Putem partaja datele doar cu:

- **Furnizori de servicii tehnice** care ne ajută să operăm site-ul și serviciile:
  - Vercel Inc. (hosting și infrastructură) — SUA, cu clauze contractuale standard UE
  - Neon Inc. (bază de date) — SUA, cu clauze contractuale standard UE
  - Google LLC (analytics) — SUA, cu clauze contractuale standard UE
- **Autorități publice** — doar dacă suntem obligați legal (ex: ANAF pentru date fiscale)
- **Colaboratori** — doar în măsura strict necesară pentru prestarea serviciilor contractate, pe baza unor acorduri de confidențialitate

Transferul de date în afara Spațiului Economic European (SEE) se realizează exclusiv cu respectarea garanțiilor prevăzute de GDPR (clauze contractuale standard sau decizii de adecvare ale Comisiei Europene).

---

**7. Cookie-uri**

Site-ul nostru utilizează următoarele tipuri de cookie-uri:

**a) Cookie-uri strict necesare:**
- Cookie-uri de sesiune pentru autentificare și funcționarea portalului de client
- Cookie-uri de preferință (ex: starea de consimțământ)
- Acestea nu pot fi dezactivate deoarece sunt esențiale pentru funcționarea site-ului

**b) Cookie-uri analitice (Google Analytics 4):**
- Scop: analiza traficului și a comportamentului de navigare pentru îmbunătățirea site-ului
- Furnizor: Google LLC
- Durata: până la 26 de luni
- Poți refuza aceste cookie-uri la prima vizită pe site (prin bannerul de cookie-uri)

**Controlul cookie-urilor:** Poți seta browserul să blocheze sau să te alerteze despre cookie-uri. Dezactivarea cookie-urilor necesare poate afecta funcționarea site-ului.

---

**8. Drepturile tale**

Conform GDPR, ai următoarele drepturi privind datele tale cu caracter personal:

- **Dreptul de acces** — poți solicita o copie a datelor pe care le deținem despre tine
- **Dreptul la rectificare** — poți cere corectarea datelor incorecte sau incomplete
- **Dreptul la ștergere** ("dreptul de a fi uitat") — poți solicita ștergerea datelor tale, cu excepția celor pe care suntem obligați legal să le păstrăm
- **Dreptul la restricționarea prelucrării** — poți cere limitarea prelucrării în anumite condiții
- **Dreptul la portabilitatea datelor** — poți primi datele tale într-un format structurat, uzual, care poate fi citit automat
- **Dreptul de opoziție** — poți te opune prelucrării datelor în anumite situații
- **Dreptul de a retrage consimțământul** — în orice moment, fără a afecta legalitatea prelucrării efectuate anterior

**Cum îți exerciți drepturile:**
Trimite un email la **contact@aiwant.ro** cu subiectul "Protecția datelor — [dreptul solicitat]". Vom răspunde în termen de maximum 30 de zile.

**Plângeri:**
Dacă consideri că prelucrarea datelor tale încalcă GDPR, ai dreptul de a depune o plângere la **Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)**:
- Adresă: B-dul G-ral Gheorghe Magheru nr. 28-30, sector 1, București, România
- Website: www.dataprotection.ro
- Email: anspdcp@dataprotection.ro

---

**9. Modificări ale politicii**

Ne rezervăm dreptul de a actualiza această politică de confidențialitate periodic. Modificările vor fi publicate pe această pagină cu o nouă dată de "Ultima actualizare". Pentru modificări semnificative, vom afișa o notificare vizibilă pe site.

Te încurajăm să verifici periodic această pagină.

---

**10. Contact**

Pentru orice întrebări sau solicitări legate de protecția datelor tale personale:

**SC VENDOR COMP SRL**
Email: contact@aiwant.ro
Telefon: +40 7XX XXX XXX
Adresă: Mangalia, Str. Matei Basarab nr. 29, jud. Constanța, România

---

### SEO Metadata
```tsx
export const metadata = {
  title: "Politica de Confidențialitate — aiwant.ro",
  description: "Politica de confidențialitate și protecția datelor personale pentru aiwant.ro, operat de Vendor Comp SRL.",
  robots: "noindex, follow", // Privacy policies don't need to be indexed
};
```

---

## TASK 2: Mandatory Consent Checkbox on ALL Forms

### Forms that need the checkbox:

1. **Contact form** (homepage `/` — section #contact)
2. **Registration form** (`/auth/register`)
3. **Onboarding wizard** (Step 5 — confirmation step, `/portal/onboarding`)

### Checkbox Component

Create a reusable component: `components/ConsentCheckbox.tsx`

```tsx
// Visual: checkbox + label text with link to privacy policy
// The link opens in a new tab
// Checkbox is REQUIRED — form cannot submit without it
// Error state: red border + error message if user tries to submit without checking
```

**Label text for each form:**

**Contact form:**
"Am citit și sunt de acord cu [Politica de Confidențialitate](/politica-de-confidentialitate). Înțeleg că datele furnizate vor fi folosite exclusiv pentru a răspunde solicitării mele."

**Registration form:**
"Am citit și accept [Politica de Confidențialitate](/politica-de-confidentialitate). Înțeleg că datele mele vor fi prelucrate conform GDPR pentru crearea și administrarea contului de client."

**Onboarding wizard (Step 5):**
"Confirm că informațiile furnizate sunt corecte și sunt de acord cu [Politica de Confidențialitate](/politica-de-confidentialitate). Înțeleg că datele vor fi folosite pentru pregătirea ofertei de servicii."

### Implementation Details

- **Checkbox style**: custom styled (not default browser checkbox)
  - Unchecked: --color-border border, rounded-sm, white background
  - Checked: --color-gold background, white checkmark icon
  - Error: --color-danger border, red error text below
  - Hover: subtle gold border glow
- **Link style**: --color-gold, underline on hover, opens `/politica-de-confidentialitate` in new tab (`target="_blank"`)
- **Validation**: zod schema includes `consent: z.literal(true, { errorMap: () => ({ message: "Trebuie să accepți politica de confidențialitate" }) })`
- **Error message**: "Trebuie să accepți politica de confidențialitate pentru a continua."
- **Position**: just above the submit button on every form
- **Spacing**: comfortable margin-top (mt-6) to separate it from form fields

### Form Submit Behavior

- If checkbox is NOT checked and user clicks submit:
  1. Scroll to checkbox (if not in view)
  2. Red border on checkbox
  3. Error message appears below
  4. Form does NOT submit
- If checkbox IS checked:
  1. Normal form submission
  2. Save `consentGiven: true` and `consentTimestamp: new Date()` alongside form data

### Database Changes

Add consent tracking fields where relevant:

```prisma
// Add to User model (for registration consent)
model User {
  // ... existing fields ...
  consentGiven      Boolean   @default(false)
  consentTimestamp   DateTime?
}

// Add to ClientProfile model (for onboarding consent)  
model ClientProfile {
  // ... existing fields ...
  consentGiven      Boolean   @default(false)
  consentTimestamp   DateTime?
}

// For contact form submissions (if you store them)
// Add consentGiven and consentTimestamp fields to the contact submission record
```

---

## TASK 3: Cookie Consent Banner

### Simple cookie banner (bottom of screen, first visit only)

- **Position**: fixed bottom, full width, z-index above everything
- **Background**: --color-midnight with slight transparency (95% opacity) + backdrop-blur
- **Content**: 
  - Text: "Acest site folosește cookie-uri pentru a-ți oferi cea mai bună experiență. Cookie-urile analitice ne ajută să îmbunătățim site-ul."
  - Link: "[Află mai multe](/politica-de-confidentialitate#cookie-uri)" (--color-gold)
  - **Two buttons**:
    - "Acceptă toate" (--color-gold filled) — sets cookie, enables GA
    - "Doar necesare" (outline, --color-text-on-dark) — sets cookie, disables GA
- **Storage**: save preference in a cookie `cookie_consent` with value `all` or `necessary` (expires 365 days)
- **GA conditional loading**: Only initialize Google Analytics if `cookie_consent === 'all'`
- **Don't show again** after user makes a choice (check cookie on page load)
- **Animation**: slide up from bottom (Framer Motion, 0.3s ease-out)
- **Mobile**: stack buttons vertically, slightly smaller text

---

## FOOTER UPDATE

Update the existing footer to include the privacy policy link:

In the Legal column, ensure these links exist:
- **Politica de Confidențialitate** → `/politica-de-confidentialitate`
- **Termeni și Condiții** → `/termeni-si-conditii` (can be a placeholder page for now)
- **ANPC** → `https://anpc.ro/` (external link, opens in new tab)

---

## STRICT RULES

1. **All text in ROMANIAN** — every label, legal text, error message
2. **Privacy policy content must be legally sound** for Romania/EU GDPR — use the exact text provided above
3. **Consent checkbox is MANDATORY** — forms physically cannot submit without it
4. **Privacy policy link opens in new tab** from form checkboxes — user shouldn't lose their form progress
5. **Cookie consent banner shows only once** — after choice, never again (unless cookies are cleared)
6. **GA only loads after consent** — if user chooses "Doar necesare", Google Analytics must NOT load
7. **Store consent timestamps** — for GDPR compliance, always record WHEN consent was given
8. **The privacy policy page is part of the site** — same navbar, footer, design language, not a separate ugly legal page
9. **Reusable ConsentCheckbox component** — one component used in all 3 forms, with customizable label text
10. **Replace placeholder contact info** (email, phone) with real data when deploying
