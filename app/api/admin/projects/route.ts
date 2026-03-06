import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  clientId: z.string(),
  description: z.string().optional(),
  status: z.string().default("DISCOVERY"),
  domain: z.string().optional(),
  totalValue: z.number().optional(),
  monthlyFee: z.number().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  gaPropertyId: z.string().optional(),
  gaMeasurementId: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const data = schema.parse(body);

    const project = await prisma.project.create({
      data: {
        name: data.name,
        clientId: data.clientId,
        description: data.description || null,
        status: data.status as any,
        domain: data.domain || null,
        totalValue: data.totalValue ?? null,
        monthlyFee: data.monthlyFee ?? null,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        gaPropertyId: data.gaPropertyId || null,
        gaMeasurementId: data.gaMeasurementId || null,
      },
    });

    // Notify client about new project
    await prisma.notification.create({
      data: {
        userId: data.clientId,
        title: "Proiect nou creat",
        message: `Proiectul "${data.name}" a fost creat și adăugat în portalul tău.`,
        link: `/portal/projects/${project.id}`,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Date invalide.", details: err.issues }, { status: 400 });
    }
    console.error("[admin/projects POST]", err);
    return NextResponse.json({ error: "Eroare internă." }, { status: 500 });
  }
}
