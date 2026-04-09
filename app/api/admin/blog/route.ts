import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const blogPostSchema = z.object({
  title: z.string().min(5, "Titlul trebuie să aibă minim 5 caractere"),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Slug invalid"),
  excerpt: z.string().min(20).max(300),
  content: z.string().min(10),
  description: z.string().min(50).max(160),
  category: z.string().min(1),
  imageUrl: z.string().optional().nullable(),
  published: z.boolean(),
});

export async function GET() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } },
  });

  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const data = blogPostSchema.parse(body);

    const existing = await prisma.blogPost.findUnique({ where: { slug: data.slug } });
    if (existing) {
      return NextResponse.json({ error: "Slug-ul există deja." }, { status: 409 });
    }

    const post = await prisma.blogPost.create({
      data: { ...data, authorId: session.user.id },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0].message }, { status: 422 });
    }
    console.error("[blog/POST]", err);
    return NextResponse.json({ error: "Eroare internă." }, { status: 500 });
  }
}
