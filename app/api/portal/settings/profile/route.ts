import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
});

export async function PUT(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const data = schema.parse(body);

    const emailConflict = await prisma.user.findFirst({
      where: { email: data.email, id: { not: session.user.id } },
    });
    if (emailConflict) {
      return NextResponse.json({ error: "Email-ul este deja folosit." }, { status: 409 });
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: data.name,
        email: data.email,
        company: data.company || null,
        phone: data.phone || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Date invalide." }, { status: 400 });
    }
    console.error("[settings/profile]", err);
    return NextResponse.json({ error: "Eroare internă." }, { status: 500 });
  }
}
