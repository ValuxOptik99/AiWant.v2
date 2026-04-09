import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Admin user
  const adminPassword = await bcrypt.hash("Admin@AiWANT2024", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@aiwant.ro" },
    update: {},
    create: {
      email: "admin@aiwant.ro",
      password: adminPassword,
      name: "Vlad Gheorghe",
      company: "Vendor Comp SRL",
      phone: "+40 xxx xxx xxx",
      role: "ADMIN",
    },
  });
  console.log("Admin created:", admin.email);

  // Demo client
  const clientPassword = await bcrypt.hash("Client@Demo2024", 12);
  const client = await prisma.user.upsert({
    where: { email: "demo@client.ro" },
    update: {},
    create: {
      email: "demo@client.ro",
      password: clientPassword,
      name: "Ion Popescu",
      company: "Demo SRL",
      phone: "+40 700 000 000",
      role: "CLIENT",
    },
  });
  console.log("Client created:", client.email);

  // Demo project
  const project = await prisma.project.upsert({
    where: { id: "demo-project-1" },
    update: {},
    create: {
      id: "demo-project-1",
      clientId: client.id,
      name: "Website + Automatizări",
      description: "Website complet cu automatizări de email, CRM și raportare automată.",
      status: "IN_PROGRESS",
      domain: "demo.aiwant.ro",
      totalValue: 4500,
      monthlyFee: 200,
      startDate: new Date("2024-01-15"),
      gaPropertyId: "properties/123456789",
      gaMeasurementId: "G-XXXXXXXXXX",
    },
  });
  console.log("Project created:", project.name);

  // Milestones
  const milestones = [
    { title: "Discovery & Strategie", description: "Analiza cerințelor și planificarea proiectului", completed: true, order: 0 },
    { title: "Design UI/UX", description: "Wireframes și design vizual aprobat", completed: true, order: 1 },
    { title: "Dezvoltare Frontend", description: "Implementarea paginilor și componentelor", completed: true, order: 2 },
    { title: "Integrări & Automatizări", description: "Email, CRM, webhook-uri", completed: false, dueDate: new Date("2024-03-31"), order: 3 },
    { title: "Testare & QA", description: "Teste complete pe toate dispozitivele", completed: false, dueDate: new Date("2024-04-15"), order: 4 },
    { title: "Go Live", description: "Lansare oficială pe domeniu", completed: false, dueDate: new Date("2024-05-01"), order: 5 },
  ];

  for (const m of milestones) {
    await prisma.milestone.create({
      data: {
        projectId: project.id,
        title: m.title,
        description: m.description,
        completed: m.completed,
        completedAt: m.completed ? new Date() : null,
        dueDate: m.dueDate || null,
        order: m.order,
      },
    });
  }
  console.log("Milestones created:", milestones.length);

  // Sample uptime checks
  const now = Date.now();
  for (let i = 0; i < 48; i++) {
    const responseTime = 150 + Math.floor(Math.random() * 400);
    await prisma.uptimeCheck.create({
      data: {
        projectId: project.id,
        status: "UP",
        responseTime,
        checkedAt: new Date(now - i * 30 * 60 * 1000),
      },
    });
  }
  console.log("Uptime checks created: 48");

  // Welcome notification for demo client
  await prisma.notification.create({
    data: {
      userId: client.id,
      title: "Bun venit în portalul AiWANT!",
      message: "Contul tău este activ. Poți urmări progresul proiectelor tale în timp real.",
      link: "/portal",
    },
  });

  // Blog post — taskuri repetitive
  const blogContent = `
<p>Problema nu este oboseala în sine. Problema reală este <strong>costul de oportunitate</strong>: fiecare oră petrecută pe un task de 0 lei valoare adăugată este o oră în care nu ai construit o strategie, nu ai vorbit cu un client nou, nu ai crescut businessul.</p>
<p>În acest articol identificăm cele mai comune 5 activități care îți consumă resursele invizibil — și îți arătăm cum o platformă custom, construită specific pentru nevoile tale, poate face munca în locul lor.</p>

<h2>1. Introducerea manuală a datelor (Data Entry)</h2>
<p>Copiezi informații din facturi, e-mailuri sau formulare în baze de date ori Excel? Fiecare ciclu durează minute. Înmulțit cu zeci de intrări pe zi, vorbim despre ore pierdute săptămânal — ore plătite direct din profitul tău.</p>
<p><strong>Riscul:</strong> O singură cifră greșită introdusă manual poate genera erori în rapoarte, facturi incorecte sau decizii financiare bazate pe date false. Eroarea umană în data entry depășește 1% la volume mari — suficient să coste scump.</p>
<p><strong>Soluția tech:</strong> Un sistem cu OCR (recunoaștere optică a caracterelor) extrage automat datele din documente și le introduce direct într-o bază de date centralizată. Zero copy-paste, zero erori de tastare.</p>

<h2>2. Gestionarea și raportarea vânzărilor / stocurilor</h2>
<p>Verifici manual stocurile sau agregezi vânzările zilnice din mai multe surse pentru raportul de final de lună? Procesul poate dura ore, iar datele sunt deja depășite în momentul în care le citești.</p>
<p><strong>Riscul:</strong> Deciziile de business luate pe date vechi de 24–48 de ore pot însemna stoc epuizat, comenzi ratate sau capitalizare greșită a unui trend de vânzări în creștere.</p>
<p><strong>Soluția tech:</strong> Un dashboard custom conectat prin API la toate sursele tale — ERP, platforme eCommerce, POS — cu grafice live și alerte automate când un KPI iese din parametri.</p>

<h2>3. Programarea și confirmarea întâlnirilor / comenzilor</h2>
<p>Trimiți manual e-mailuri de confirmare, setezi întâlniri pe calendare diferite sau procesezi comenzi primite prin WhatsApp și e-mail? Fiecare pas manual introduce întârzieri și riscul de a pierde clienți în flux.</p>
<p><strong>Riscul:</strong> Un client care nu primește confirmare în câteva minute percepe lipsă de profesionalism. Dubla programare sau comenzile omise sunt costuri directe și reputaționale greu de recuperat.</p>
<p><strong>Soluția tech:</strong> Un portal de clienți sau un sistem de booking automatizat care trimite notificări instant, actualizează calendarele și procesează comenzile fără nicio intervenție umană.</p>

<h2>4. Facturarea și urmărirea plăților (Follow-up)</h2>
<p>Verifici manual cine a plătit și trimiți e-mailuri de întârziere? Când ai zeci de clienți activi, acest proces devine o sursă constantă de stres și un risc serios de cash flow.</p>
<p><strong>Riscul:</strong> O factură uitată sau urmărită cu întârziere înseamnă cash flow deficitar. La scară, lipsa unui sistem clar de follow-up poate bloca lichiditatea companiei în perioade critice.</p>
<p><strong>Soluția tech:</strong> Integrarea modulului de facturare cu sistemul de management: statusul se schimbă automat în «Plătit» la confirmare, iar reminder-ele sunt trimise la intervalele setate, fără intervenție umană.</p>

<h2>5. Gestionarea documentelor interne</h2>
<p>Cauți contracte vechi prin foldere de e-mail sau drive-uri neorganizate? Sau, mai rău, nu ești sigur dacă documentul găsit este versiunea actualizată sau una expirată?</p>
<p><strong>Riscul:</strong> Utilizarea unui document expirat (contract, procedură internă, ofertă de preț) poate genera erori juridice, financiare sau de conformitate. Timpul de căutare se traduce direct în cost de personal.</p>
<p><strong>Soluția tech:</strong> O platformă internă (Document Management System) cu căutare inteligentă full-text, control de versiuni și permisiuni pe roluri. Documentul corect, mereu la un clic distanță.</p>

<hr>

<p>Automatizarea nu este un lux rezervat corporațiilor. Este instrumentul prin care un business de orice dimensiune poate scala fără să crească proporțional costurile de personal. Fiecare task automatizat eliberează capacitate umană pentru munca ce contează cu adevărat: <strong>relații cu clienții, inovație, creștere sustenabilă.</strong></p>
`;

  await prisma.blogPost.upsert({
    where: { slug: "taskuri-repetitive-automatizare" },
    update: {},
    create: {
      title: "5 Task-uri Repetitive care îți «fură» Profitul și Cum să le Elimini prin Automatizare",
      slug: "taskuri-repetitive-automatizare",
      excerpt:
        "Imaginează-ți o zi obișnuită: un manager deschide trei tabele Excel, copiază cifre dintr-un e-mail în altul, trimite manual confirmări de întâlniri și caută un contract dintr-un dosar creat acum doi ani. Aceasta nu este o poveste rară — este rutina zilnică a mii de companii din România.",
      content: blogContent.trim(),
      description:
        "Descoperi care sunt cele 5 taskuri repetitive care îți consumă profitul invizibil și cum o platformă custom de la AiWANT le elimină prin automatizare.",
      category: "Automatizare",
      published: true,
      authorId: admin.id,
    },
  });
  console.log("Blog post seeded: taskuri-repetitive-automatizare");

  // Blog post — SaaS vs. Custom
  const saasContent = `
<p>Întrebarea nu este «SaaS sau custom?». Întrebarea corectă este: <strong>la ce stadiu de creștere se află businessul tău și ce tip de software îl va duce mai departe?</strong></p>
<p>Acest articol te ajută să înțelegi exact când un abonament lunar este o economie inteligentă — și când devine o barieră în calea scalării reale.</p>

<h2>Soluțiile SaaS — «Călătoria cu Trenul»</h2>
<p>Soluțiile SaaS (Software as a Service) sunt aplicații gata construite, accesibile prin abonament lunar. Salesforce, Trello, Monday, Notion — le cunoști. Sunt rapide de implementat, costă puțin la start și nu ai nevoie de o echipă tehnică internă.</p>
<p><strong>Avantaje:</strong> Cost inițial mic, implementare instantanee, mentenanță inclusă, suport dedicat.</p>
<p><strong>Dezavantaje:</strong> Rigiditate — tu te adaptezi software-ului, nu invers. Dependență de furnizor. Fragmentare — datele trăiesc în 10 aplicații care nu comunică. Costuri cumulate care depășesc rapid o soluție custom.</p>

<h2>Software-ul Custom — «Construirea unei mașini de curse»</h2>
<p>O platformă custom este dezvoltată de la zero, exclusiv pe fluxurile și procesele tale de lucru. Nu există funcționalități inutile, nu există limitări impuse de un furnizor terț. Fiecare modul rezolvă o problemă reală din businessul tău.</p>
<p><strong>Avantaje:</strong> Eficiență maximă, scalabilitate controlată, integrabilitate nativă, avantaj competitiv unic.</p>
<p><strong>Dezavantaje:</strong> Investiție inițială mai mare, timp de dezvoltare de săptămâni/luni, necesită un partener de încredere.</p>

<h2>SaaS vs. Custom — față în față</h2>
<p>Comparație pe 8 criterii esențiale: cost inițial, cost pe termen lung, timp de implementare, personalizare, scalabilitate, integrare cu alte sisteme, proprietatea datelor și avantaj competitiv. Pe termen lung, platforma custom câștigă la 6 din 8 criterii.</p>

<h2>Când să treci la Custom? Cele 3 semnale de alarmă</h2>
<p><strong>Semnalul 01 — Plătești prea multe abonamente care nu «vorbesc» între ele:</strong> Ai un CRM, un tool de project management, o platformă de facturare și un sistem de stocuri — toate separate. Angajații copiază manual date între ele.</p>
<p><strong>Semnalul 02 — Angajații folosesc Excel-uri externe pentru a acoperi lipsurile:</strong> Dacă echipa ta a creat fișiere Excel sau Google Sheets pentru a «completa» ce nu face software-ul existent — acesta este cel mai clar semnal.</p>
<p><strong>Semnalul 03 — Procesele tale unice sunt limitate de ce permite aplicația standard:</strong> Ceea ce te diferențiază pe piață nu poate fi replicat în niciun SaaS de pe piață. Asta înseamnă că software-ul îți limitează avantajul competitiv.</p>

<hr>

<p>SaaS este excelent pentru start și pentru nevoi standardizate. Software-ul Custom este motorul scalării reale — atunci când procesele tale au depășit ce oferă o soluție generică. <strong>Când crești suficient de mult pentru ca rigiditatea să coste mai mult decât investiția într-o platformă construită pe tine.</strong></p>
`;

  await prisma.blogPost.upsert({
    where: { slug: "saas-vs-software-custom" },
    update: {},
    create: {
      title: "Software SaaS vs. Platformă Custom: Care este alegerea care îți va scala business-ul?",
      slug: "saas-vs-software-custom",
      excerpt:
        "Managerii sunt bombardați cu mii de aplicații SaaS ieftine — și se lovesc de un zid invizibil în momentul în care procesele lor devin prea complexe. Află când un abonament lunar devine o barieră în calea scalării și când e momentul să treci la custom.",
      content: saasContent.trim(),
      description:
        "SaaS sau software custom? Descoperă când un abonament lunar devine o barieră în calea creșterii și când o platformă personalizată este investiția care îți scalează business-ul.",
      category: "Strategie",
      published: true,
      authorId: admin.id,
    },
  });
  console.log("Blog post seeded: saas-vs-software-custom");

  console.log("Done!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
