import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createNotification } from "@/lib/notifications";
import { formatDate } from "@/lib/portal-utils";

export const runtime = "nodejs";
export const maxDuration = 30;

const DAY_MS = 24 * 60 * 60 * 1000;
const DEDUPE_WINDOW_MS = 4 * DAY_MS;

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });

  // ── 1. Overdue transition ──────────────────────────────────────────────
  const nowOverdue = await prisma.document.findMany({
    where: { type: "INVOICE", invoiceStatus: "PENDING", invoiceDueDate: { lt: now } },
    include: { project: { include: { client: true } } },
  });

  let markedOverdue = 0;
  for (const inv of nowOverdue) {
    await prisma.document.update({ where: { id: inv.id }, data: { invoiceStatus: "OVERDUE" } });
    markedOverdue++;

    await createNotification({
      userId: inv.project.clientId,
      title: "Factură restantă — risc de suspendare",
      message: `Factura ${inv.invoiceNumber ?? inv.name} (${inv.invoiceAmount ?? 0} EUR) a depășit scadența. Conform contractului, serviciile pot fi suspendate în lipsa plății. Achită pentru a evita întreruperea.`,
      link: "/portal/invoices",
    });

    if (admin) {
      await createNotification({
        userId: admin.id,
        title: "Factură devenită restantă",
        message: `Factura ${inv.invoiceNumber ?? inv.name} (${inv.invoiceAmount ?? 0} EUR) a clientului ${inv.project.client.name} pentru proiectul ${inv.project.name} a devenit restantă.`,
        link: `/admin/projects/${inv.project.id}`,
      });
    }
  }

  // ── 2. Pre-due reminder (T-3 days) ─────────────────────────────────────
  const dueSoon = await prisma.document.findMany({
    where: {
      type: "INVOICE",
      invoiceStatus: "PENDING",
      invoiceDueDate: { gte: new Date(now.getTime() + 2 * DAY_MS), lt: new Date(now.getTime() + 3 * DAY_MS) },
    },
    include: { project: { include: { client: true } } },
  });

  let remindersSent = 0;
  const REMINDER_TITLE = "Factură scadentă în 3 zile";
  for (const inv of dueSoon) {
    const invoiceRef = inv.invoiceNumber ?? inv.name;
    const alreadySent = await prisma.notification.findFirst({
      where: {
        userId: inv.project.clientId,
        title: REMINDER_TITLE,
        message: { contains: invoiceRef },
        createdAt: { gte: new Date(now.getTime() - DEDUPE_WINDOW_MS) },
      },
    });
    if (alreadySent) continue;

    await createNotification({
      userId: inv.project.clientId,
      title: REMINDER_TITLE,
      message: `Factura ${invoiceRef} (${inv.invoiceAmount ?? 0} EUR) este scadentă pe ${formatDate(inv.invoiceDueDate)}. Plătește la timp pentru a evita penalitățile de întârziere și întreruperea serviciilor.`,
      link: "/portal/invoices",
    });
    remindersSent++;
  }

  // ── 3. Contract end-date warning (T-30 days) ───────────────────────────
  const contractsExpiringSoon = await prisma.project.findMany({
    where: {
      endDate: { gte: new Date(now.getTime() + 29 * DAY_MS), lt: new Date(now.getTime() + 30 * DAY_MS) },
      status: { notIn: ["COMPLETED", "PAUSED"] },
    },
    include: { client: true },
  });

  let contractRemindersSent = 0;
  for (const project of contractsExpiringSoon) {
    const title = `Contractul pentru ${project.name} expiră în 30 de zile`;
    const clientLink = `/portal/projects/${project.id}`;
    const alreadySent = await prisma.notification.findFirst({
      where: { userId: project.clientId, title, link: clientLink, createdAt: { gte: new Date(now.getTime() - DEDUPE_WINDOW_MS) } },
    });
    if (alreadySent) continue;

    const dateLabel = formatDate(project.endDate);
    await createNotification({
      userId: project.clientId,
      title,
      message: `Fără prelungire, serviciile asociate (hosting, mentenanță) se opresc la ${dateLabel}. Contactează-mă pentru reînnoire în condițiile actuale.`,
      link: clientLink,
    });

    if (admin) {
      await createNotification({
        userId: admin.id,
        title: `Contract client expiră în 30 de zile — ${project.name}`,
        message: `Contractul lui ${project.client.name} pentru proiectul ${project.name} expiră pe ${dateLabel}. Ia legătura pentru reînnoire.`,
        link: `/admin/projects/${project.id}`,
      });
    }

    contractRemindersSent++;
  }

  return NextResponse.json({ markedOverdue, remindersSent, contractRemindersSent });
}
