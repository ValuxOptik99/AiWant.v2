import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  clientId: z.string(),
  description: z.string().optional().nullable(),
  status: z.string(),
  domain: z.string().optional().nullable(),
  totalValue: z.number().optional().nullable(),
  monthlyFee: z.number().optional().nullable(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  gaPropertyId: z.string().optional().nullable(),
  gaMeasurementId: z.string().optional().nullable(),
});

type Props = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Props) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const data = schema.parse(body);

    const project = await prisma.project.update({
      where: { id },
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

    return NextResponse.json(project);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Date invalide." }, { status: 400 });
    }
    console.error("[admin/projects PUT]", err);
    return NextResponse.json({ error: "Eroare internă." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Props) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  try {
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/projects DELETE]", err);
    return NextResponse.json({ error: "Eroare internă." }, { status: 500 });
  }
}
