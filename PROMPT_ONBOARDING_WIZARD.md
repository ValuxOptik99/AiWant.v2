# CLAUDE CODE PROMPT — Onboarding Wizard pentru Client Portal aiwant.ro

## CONTEXT

The aiwant.ro client portal already has authentication (register → admin approves → client logs in). We need to add an **obligatory onboarding wizard** that activates the FIRST time an approved client logs into the portal. The client CANNOT access any portal page until the onboarding is complete.

This onboarding collects critical business information that helps Vlad (the admin) understand the client before creating their project/offer. The data is stored in the database and visible in the admin panel.

---

## FLOW

```
Register → PENDING → Admin approves → CLIENT role
                                          ↓
                                    First login
                                          ↓
                              onboardingCompleted === false?
                                    ↓ YES              ↓ NO
                            Redirect to               Normal portal
                          /portal/onboarding            dashboard
                                    ↓
                          Step 1 → 2 → 3 → 4 → 5
                                    ↓
                          onboardingCompleted = true
                                    ↓
                          Redirect to /portal
                          (with confetti/welcome)
```

---

## DATABASE CHANGES

Add to existing `User` model:

```prisma
model User {
  // ... existing fields ...
  onboardingCompleted  Boolean   @default(false)
  onboardingData       ClientProfile?
}

model ClientProfile {
  id                String   @id @default(cuid())
  
  // === STEP 1: Informații firmă ===
  companyName        String          // Numele firmei
  companyCIF         String?         // CUI/CIF
  companyRegCom      String?         // Nr. Registrul Comerțului (J13/xxxx/xxxx)
  companyAddress     String?         // Adresa sediu
  companyCity        String?         // Oraș
  companyCounty      String?         // Județ
  companyFoundedYear Int?            // Anul înființării
  industryDomain     String          // Domeniu de activitate (dropdown + altele)
  companySize        String          // Dimensiune (solo/micro/small/medium)
  companyDescription String?         // Descrie pe scurt activitatea firmei (textarea)
  
  // === STEP 2: Prezența online actuală ===
  hasWebsite         Boolean  @default(false)
  currentWebsiteUrl  String?         // URL site existent
  websitePlatform    String?         // Pe ce e construit (WordPress, Wix, custom, nu știu)
  websiteSatisfaction String?        // Cât de mulțumit e (1-5 scale or text)
  hasSocialMedia     Boolean  @default(false)
  socialFacebook     String?         // URL pagină Facebook
  socialInstagram    String?         // Handle Instagram
  socialTikTok       String?         // Handle TikTok
  socialLinkedIn     String?         // URL LinkedIn
  socialOther        String?         // Alte platforme
  usesTools          String?         // Ce unelte digitale folosește (CRM, facturare, email marketing etc.)
  currentPainPoints  String?         // Ce nu funcționează bine acum? (textarea)
  
  // === STEP 3: Obiective și target ===
  targetAudience     String?         // Cine sunt clienții lor (textarea)
  targetAgeRange     String?         // Interval vârstă (dropdown multi)
  targetLocation     String?         // Locație geografică (local/regional/național/internațional)
  mainGoals          String[]        // Obiective principale (multi-select)
  // Opțiuni: "Site nou", "Redesign site existent", "Magazin online", 
  // "Automatizări", "Social media", "Aplicație custom", "SEO", "Altele"
  goalsDescription   String?         // Descrie mai detaliat ce ai nevoie (textarea)
  competitorUrls     String?         // URL-uri competitori (textarea, un URL per linie)
  inspirationUrls    String?         // Site-uri care îți plac ca design/funcționalitate (textarea)
  
  // === STEP 4: Buget și timeline ===
  budgetRange        String?         // Interval buget (dropdown)
  // Opțiuni: "Sub 500 EUR", "500-1.000 EUR", "1.000-2.000 EUR", 
  // "2.000-5.000 EUR", "5.000+ EUR", "Nu m-am decis încă"
  timeline           String?         // Când vrea să fie gata (dropdown)
  // Opțiuni: "Cât mai repede", "1-2 luni", "2-3 luni", "3-6 luni", "Nu e urgent"
  preferredPayment   String?         // Cum preferă să plătească (dropdown)
  // Opțiuni: "Plată integrală", "Rate lunare", "50% avans + rest la livrare", "Nu m-am decis"
  monthlyBudgetHosting String?       // Buget lunar pentru hosting/mentenanță (dropdown)
  // Opțiuni: "Sub 20 EUR/lună", "20-50 EUR/lună", "50-100 EUR/lună", "Discutăm"
  additionalNotes    String?         // Altceva ce vrei să ne spui? (textarea)
  
  // === STEP 5: Rezumat & confirmare (no new fields, just review) ===
  
  // === META ===
  completedAt        DateTime @default(now())
  updatedAt          DateTime @updatedAt
  
  user               User     @relation(fields: [userId], references: [id])
  userId             String   @unique
}
```

---

## MIDDLEWARE UPDATE

Update the existing portal middleware to check onboarding:

```typescript
// middleware.ts (or in portal layout.tsx)
// After verifying user is authenticated and role === CLIENT:

if (!user.onboardingCompleted && !pathname.startsWith('/portal/onboarding')) {
  redirect('/portal/onboarding');
}

// Allow /portal/onboarding even if not completed
// Block ALL other /portal/* routes if not completed
```

---

## ONBOARDING WIZARD UI

### Route: `/portal/onboarding`

### Layout
- **NO sidebar** — clean, focused layout without the portal navigation
- **Background**: --color-surface with subtle gradient
- **Centered container**: max-width 720px
- **Top**: aiwant.ro logo (small, centered) + "Bine ai venit!" text
- **Progress bar**: horizontal steps indicator showing all 5 steps with labels
  - Current step: --color-gold filled circle + bold label
  - Completed steps: --color-success check icon + green circle
  - Future steps: --color-border-dark empty circle + muted label
  - Connecting lines between steps (filled gold for completed, gray for future)
- **Step content area**: white card with padding, rounded-xl, subtle shadow
- **Bottom navigation**: "← Înapoi" (text button) + "Continuă →" (gold filled button) + step indicator "Pasul 2 din 5"
- **Animations**: step transitions with Framer Motion — slide left/right + fade

### Step 1: "Despre firma ta" 
**Icon**: Building2 (Lucide)
**Subtitle**: "Ajută-ne să înțelegem afacerea ta"

Fields:
- **Numele firmei*** (text input, pre-filled from registration `company` field if exists)
- **CUI/CIF** (text input, with helper text: "Ex: RO12345678")
- **Nr. Registrul Comerțului** (text input, placeholder: "J13/xxxx/xxxx")
- **Adresa sediu** (text input)
- **Oraș** (text input) + **Județ** (dropdown with all Romanian counties)
- **Anul înființării** (number input, min 1990, max current year)
- **Domeniu de activitate*** (dropdown):
  - Servicii profesionale (avocatură, contabilitate, consultanță)
  - Sănătate (medici, clinici, farmacii)
  - Retail / Comerț
  - HoReCa (restaurante, hoteluri, cafenele)
  - Fitness / Sport / Wellness
  - Educație / Training
  - Construcții / Imobiliare
  - IT & Tehnologie
  - Producție / Manufacturare
  - Transport / Logistică
  - Frumusețe / Cosmetică
  - Artă / Cultură / Evenimente
  - Altele (apare text input suplimentar)
- **Dimensiunea firmei*** (radio buttons):
  - Solo (doar eu)
  - Micro (2-9 angajați)
  - Mică (10-49 angajați)
  - Medie (50+ angajați)
- **Descrie pe scurt activitatea firmei** (textarea, 3 rows, placeholder: "Cu ce se ocupă firma ta? Ce produse sau servicii oferi?")

**Required fields**: Numele firmei, Domeniu de activitate, Dimensiunea firmei

### Step 2: "Prezența ta online"
**Icon**: Globe (Lucide)
**Subtitle**: "Unde te găsesc clienții tăi acum?"

Fields:
- **Ai un site web în prezent?** (toggle switch Da/Nu)
  - IF Da:
    - **URL site actual** (text input, placeholder: "https://...")
    - **Pe ce platformă e construit?** (dropdown: WordPress, Wix, Squarespace, Shopify, Custom, Nu știu)
    - **Cât de mulțumit ești de site-ul actual?** (5-star rating component, with labels: Deloc → Foarte mulțumit)
- **Ești activ pe social media?** (toggle switch Da/Nu)
  - IF Da:
    - **Facebook** (text input, placeholder: "URL pagină sau nume")
    - **Instagram** (text input, placeholder: "@handle")
    - **TikTok** (text input, placeholder: "@handle")
    - **LinkedIn** (text input, placeholder: "URL profil/pagină")
    - **Altele** (text input)
- **Ce unelte digitale folosești acum?** (multi-select checkboxes):
  - Facturare online (SmartBill, Oblio, FGO etc.)
  - Email marketing (Mailchimp, MailerLite etc.)
  - CRM (HubSpot, Salesforce etc.)
  - Google Business Profile
  - Google Analytics
  - Platformă booking/programări
  - Nimic din astea
  - Altele (text input)
- **Ce nu funcționează bine acum în online?** (textarea, 3 rows, placeholder: "Ce te frustrează? Ce ai vrea să fie diferit?")

**Required fields**: None (all optional, but encouraged)

### Step 3: "Ce vrei să obții"
**Icon**: Target (Lucide)
**Subtitle**: "Ajută-ne să înțelegem obiectivele tale"

Fields:
- **Ce servicii te interesează?*** (multi-select cards — visual, clickable, with icon + label):
  - 🌐 Site de prezentare nou
  - 🔄 Redesign site existent
  - 🛒 Magazin online
  - ⚡ Automatizări & integrări
  - 📱 Social media management
  - 💻 Aplicație web custom
  - 🔍 SEO & vizibilitate online
  - 📊 Altele
- **Descrie mai detaliat ce ai nevoie** (textarea, 4 rows, placeholder: "Povestește-ne mai multe despre proiectul tău ideal. Ce funcționalități sunt importante pentru tine?")
- **Cine sunt clienții tăi?** (textarea, 3 rows, placeholder: "Descrie publicul țintă: vârstă, locație, interese, comportament")
- **Interval vârstă clienți** (multi-select checkboxes):
  - 18-25 ani
  - 25-35 ani
  - 35-50 ani
  - 50-65 ani
  - 65+ ani
  - Toate vârstele
- **Acoperire geografică*** (radio buttons):
  - Locală (un oraș)
  - Regională (un județ / zonă)
  - Națională (toată România)
  - Internațională
- **URL-uri competitori** (textarea, 2 rows, placeholder: "Site-urile competitorilor tăi, câte unul pe linie")
- **Site-uri care îți plac** (textarea, 2 rows, placeholder: "Site-uri care te inspiră ca design sau funcționalitate")

**Required fields**: Ce servicii te interesează, Acoperire geografică

### Step 4: "Buget și planificare"
**Icon**: Calculator (Lucide)
**Subtitle**: "Să ne asigurăm că suntem pe aceeași pagină"

Fields:
- **Care este bugetul tău estimat pentru proiect?*** (visual card selector — single select):
  - 💰 Sub 500 EUR (~2.500 RON) — "Ideal pentru un landing page simplu"
  - 💰💰 500 – 1.000 EUR (~2.500 – 5.000 RON) — "Site de prezentare complet"
  - 💰💰💰 1.000 – 2.000 EUR (~5.000 – 10.000 RON) — "Aplicație web sau e-commerce basic"
  - 💰💰💰💰 2.000 – 5.000 EUR (~10.000 – 25.000 RON) — "Proiect complex, multiple funcționalități"
  - 🚀 5.000+ EUR (25.000+ RON) — "Platformă completă sau proiect enterprise"
  - 🤔 Nu m-am decis încă — "Vreau să discutăm opțiunile"
- **Când ai vrea să fie gata?*** (visual card selector — single select):
  - ⚡ Cât mai repede (1-2 săptămâni)
  - 📅 1-2 luni
  - 📅 2-3 luni
  - 📅 3-6 luni
  - 🕐 Nu e urgent, calitatea contează mai mult
- **Cum preferi să plătești?** (radio buttons):
  - Plată integrală la finalizare
  - 50% avans + 50% la livrare
  - Rate lunare (cost amortizat pe durata contractului)
  - Vreau să discutăm opțiunile
- **Buget lunar pentru hosting și mentenanță?** (radio buttons):
  - Sub 20 EUR/lună (~100 RON)
  - 20-50 EUR/lună (~100-250 RON)
  - 50-100 EUR/lună (~250-500 RON)
  - Discutăm în funcție de ce include
- **Altceva ce vrei să ne spui?** (textarea, 3 rows, placeholder: "Orice informație suplimentară care ne-ar ajuta să înțelegem mai bine nevoile tale")

**Required fields**: Buget estimat, Timeline

### Step 5: "Confirmă și trimite"
**Icon**: CheckCircle (Lucide)
**Subtitle**: "Verifică informațiile înainte de a trimite"

Content:
- **Summary card** showing all data from steps 1-4, organized in sections:
  - Each section is collapsible/expandable (default: expanded)
  - Section header matches the step name + icon
  - Data displayed as label: value pairs
  - Empty/skipped fields show "—" or are hidden
  - **Edit button** (pencil icon) on each section header → navigates back to that step
- **Checkbox***: "Confirm că informațiile furnizate sunt corecte și sunt de acord ca datele să fie folosite pentru pregătirea ofertei de servicii."
- **Submit button**: "Finalizează profilul" (large, --color-gold, full width)

**After submit**:
1. Save all data to `ClientProfile` table
2. Set `user.onboardingCompleted = true`
3. Create notification for admin: "Clientul [Nume] a completat profilul de onboarding"
4. Show **success screen** (2-3 seconds):
   - Confetti animation (use canvas-confetti library or CSS confetti)
   - Large checkmark icon (animated, green)
   - "Profilul tău este complet!"
   - "Vom analiza informațiile și te vom contacta cu o ofertă personalizată."
   - "Te redirecționăm către portal..." (countdown 3s)
5. Redirect to `/portal`

---

## ADMIN VIEW OF ONBOARDING DATA

### In Admin Client Detail (`/admin/clients/[id]`)

Add a new section/tab: **"Profil Onboarding"**

- Display all collected data in a clean, readable format
- Organized by the same 4 sections as the wizard
- **Status badge**: "Onboarding complet ✓" or "Onboarding incomplet ⏳"
- **Completed at**: timestamp
- **Export button**: export client profile as PDF (optional, nice-to-have)
- **Quick notes field**: where admin can add internal notes about the client (textarea, saved separately)

### In Admin Dashboard

- **Widget**: "Profiluri noi de onboarding" — shows clients who completed onboarding in the last 7 days, with a quick preview of their goals and budget
- Clicking opens the full client profile

### In Admin Client List

- **Column**: "Onboarding" with status badge (Complete/Pending/Not started)
- **Filter**: by onboarding status

---

## TECHNICAL DETAILS

### Form State Management
- Use React `useState` or `useReducer` for wizard state
- **Persist state between steps** — do NOT lose data when going back/forward
- **Save draft on each step** (optional but nice): auto-save to localStorage so if the user closes the browser, they can continue where they left off
- Clear localStorage draft after successful submission

### Validation
- Use **zod** schemas for each step
- Validate on "Continuă →" click — show inline errors below fields
- Required fields have red asterisk (*) and red border on error
- Optional fields: no validation, just save whatever is filled

### API Route
```
POST /api/portal/onboarding
Body: { step1Data, step2Data, step3Data, step4Data }
- Validates all data with zod
- Creates ClientProfile record
- Updates user.onboardingCompleted = true
- Creates admin notification
- Returns success
```

### Animations (Framer Motion)
- **Step transition**: current step slides out left, new step slides in from right (going forward). Reverse for going back.
- **Progress bar**: animated fill between steps (width transition)
- **Card selector**: hover scale(1.02) + gold border glow, selected state with checkmark + gold border
- **Toggle switches**: smooth slide animation
- **Success screen**: scale-up checkmark + confetti burst
- **Auto-save indicator**: small "Salvat automat" text that fades in/out when draft saves

---

## STRICT RULES

1. **All text in ROMANIAN** — every label, placeholder, error message, helper text
2. **Wizard is BLOCKING** — client cannot navigate to any /portal/* page until complete
3. **Back button preserves data** — going back never loses filled information
4. **Step validation only on forward** — going back skips validation
5. **Mobile responsive** — wizard must work perfectly on phone (single column, full width inputs)
6. **Progress indicator always visible** — user always knows where they are
7. **No sidebar during onboarding** — clean, focused experience
8. **Admin gets notified** — in-app notification when onboarding is completed
9. **Data is read-only for client** after submission — they can view but not edit (admin can edit)
10. **Dropdown options must match exactly** what's specified above — these are tailored to Romanian small business context
