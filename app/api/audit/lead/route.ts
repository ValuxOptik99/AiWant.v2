import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createNotification } from "@/lib/notifications";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: { auditId?: string; name?: string; email?: string; phone?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Cerere invalidă." }, { status: 400 });
  }

  const { auditId, name, email, phone } = body;

  if (!auditId || typeof auditId !== "string") {
    return NextResponse.json({ error: "Audit invalid." }, { status: 400 });
  }
  if (!name || !name.trim()) {
    return NextResponse.json({ error: "Numele este obligatoriu." }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Email invalid." }, { status: 400 });
  }

  const lead = await prisma.auditLead.findUnique({ where: { id: auditId } });
  if (!lead) {
    return NextResponse.json({ error: "Audit invalid." }, { status: 404 });
  }

  await prisma.auditLead.update({
    where: { id: auditId },
    data: {
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || undefined,
      converted: true,
    },
  });

  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (admin) {
    await createNotification({
      userId: admin.id,
      title: "Lead nou din auditul gratuit 🔥",
      message: `${name} (${email}) a analizat ${lead.url} — scor ${lead.performanceScore ?? "—"}/100. Are nevoie de ajutor cu performanța site-ului.`,
      link: "/admin/contacts",
    });
  }

  return NextResponse.json({ success: true });
}
