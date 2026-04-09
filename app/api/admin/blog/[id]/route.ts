import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().min(5).optional(),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/).optional(),
  excerpt: z.string().min(20).max(300).optional(),
  content: z.string().min(10).optional(),
  description: z.string().min(50).max(160).optional(),
  category: z.string().min(1).optional(),
  imageUrl: z.string().optional().nullable(),
  published: z.boolean().optional(),
});

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: "Nu există." }, { status: 404 });

  return NextResponse.json(post);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const data = updateSchema.parse(body);

    if (data.slug) {
      const conflict = await prisma.blogPost.findFirst({
        where: { slug: data.slug, NOT: { id } },
      });
      if (conflict) {
        return NextResponse.json({ error: "Slug-ul există deja." }, { status: 409 });
      }
    }

    const post = await prisma.blogPost.update({ where: { id }, data });
    return NextResponse.json(post);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0].message }, { status: 422 });
    }
    console.error("[blog/PATCH]", err);
    return NextResponse.json({ error: "Eroare internă." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
