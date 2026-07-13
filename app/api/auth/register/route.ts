import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { notifyAdminNewRegistration } from "@/lib/notifications";

const configSummarySchema = z.object({
  projectName: z.string(),
  service: z.string(),
  features: z.array(z.string()),
  estimateLow: z.number(),
  estimateHigh: z.number(),
  timeline: z.string(),
});

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  company: z.string().optional(),
  phone: z.string().optional(),
  configSummary: configSummarySchema.optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      return NextResponse.json({ error: "Email-ul este deja înregistrat." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        company: data.company || null,
        phone: data.phone || null,
        role: "PENDING",
        registrationConfig: data.configSummary ?? undefined,
      },
    });

    await notifyAdminNewRegistration(user.name, user.email, data.configSummary);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Date invalide.", details: err.issues }, { status: 400 });
    }
    console.error("[register]", err);
    return NextResponse.json({ error: "Eroare internă." }, { status: 500 });
  }
}
