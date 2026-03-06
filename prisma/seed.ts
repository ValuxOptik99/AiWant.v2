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

  console.log("Done!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
