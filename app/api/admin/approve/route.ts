import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  userId: z.string(),
  action: z.enum(["approve", "reject"]),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { userId, action } = schema.parse(body);

    if (action === "approve") {
      const user = await prisma.user.update({
        where: { id: userId },
        data: { role: "CLIENT" },
        select: { id: true, name: true },
      });

      // Notify client their account was approved
      await prisma.notification.create({
        data: {
          userId: user.id,
          title: "Cont aprobat!",
          message: "Contul tău a fost aprobat. Bun venit în portalul AiWANT!",
          link: "/portal",
        },
      });
    } else {
      await prisma.user.delete({ where: { id: userId } });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Date invalide." }, { status: 400 });
    }
    console.error("[admin/approve]", err);
    return NextResponse.json({ error: "Eroare internă." }, { status: 500 });
  }
}
