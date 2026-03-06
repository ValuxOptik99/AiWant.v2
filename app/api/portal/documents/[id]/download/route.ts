import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Props) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const document = await prisma.document.findUnique({
    where: { id },
    include: { project: { select: { clientId: true } } },
  });

  if (!document) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Clients can only access their own documents; admins can access all
  if (session.user.role !== "ADMIN" && document.project.clientId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.redirect(document.fileUrl);
}
