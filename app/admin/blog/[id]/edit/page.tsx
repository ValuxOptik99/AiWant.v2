import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import BlogPostForm from "@/components/admin/BlogPostForm";

export default async function AdminBlogEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/auth/login");

  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link href="/admin/blog" className="text-[#8A9BB5] hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Editează articolul</h1>
            <p className="text-sm text-[#8A9BB5] mt-0.5 truncate max-w-xs">{post.title}</p>
          </div>
        </div>
        {post.published && (
          <Link
            href={`/blog/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg transition-all"
            style={{ background: "rgba(212,168,67,0.1)", color: "#D4A843" }}
          >
            <ExternalLink size={13} />
            Vezi live
          </Link>
        )}
      </div>

      <div
        className="rounded-2xl p-6 lg:p-8"
        style={{ background: "rgba(21,40,71,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <BlogPostForm
          mode="edit"
          initialData={{
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            description: post.description,
            category: post.category,
            imageUrl: post.imageUrl,
            published: post.published,
          }}
        />
      </div>
    </div>
  );
}
