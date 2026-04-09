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

  console.log("Done!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
