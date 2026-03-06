import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ id: string; milestoneId: string }> };

export async function PATCH(req: Request, { params }: Props) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { milestoneId } = await params;

  try {
    const body = await req.json();
    const milestone = await prisma.milestone.update({
      where: { id: milestoneId },
      data: {
        ...body,
        completedAt: body.completed === true ? new Date() : body.completed === false ? null : undefined,
      },
    });
    return NextResponse.json(milestone);
  } catch (err) {
    console.error("[milestones PATCH]", err);
    return NextResponse.json({ error: "Eroare internă." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Props) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { milestoneId } = await params;

  try {
    await prisma.milestone.delete({ where: { id: milestoneId } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[milestones DELETE]", err);
    return NextResponse.json({ error: "Eroare internă." }, { status: 500 });
  }
}
