import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  order: z.number().default(0),
});

type Props = { params: Promise<{ id: string }> };

export async function POST(req: Request, { params }: Props) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id: projectId } = await params;

  try {
    const body = await req.json();
    const data = schema.parse(body);

    const milestone = await prisma.milestone.create({
      data: {
        projectId,
        title: data.title,
        description: data.description || null,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        order: data.order,
        completed: false,
      },
    });

    return NextResponse.json(milestone, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Date invalide." }, { status: 400 });
    }
    console.error("[milestones POST]", err);
    return NextResponse.json({ error: "Eroare internă." }, { status: 500 });
  }
}
