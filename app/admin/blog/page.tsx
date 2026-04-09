import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { formatDate } from "@/lib/portal-utils";
import DeleteBlogPostButton from "@/components/admin/DeleteBlogPostButton";

export default async function AdminBlogPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/auth/login");

  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } },
  });

  const published = posts.filter((p) => p.published).length;
  const drafts = posts.length - published;

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog</h1>
          <p className="text-sm text-[#8A9BB5] mt-1">
            {posts.length} articole &middot; {published} publicate &middot; {drafts} draft-uri
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: "#D4A843", color: "#0E1D33" }}
        >
          <Plus size={16} />
          Articol nou
        </Link>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <th className="text-left text-xs font-semibold text-[#8A9BB5] px-6 py-4 uppercase tracking-wider">Titlu</th>
              <th className="text-left text-xs font-semibold text-[#8A9BB5] px-6 py-4 uppercase tracking-wider hidden md:table-cell">Categorie</th>
              <th className="text-left text-xs font-semibold text-[#8A9BB5] px-6 py-4 uppercase tracking-wider hidden sm:table-cell">Status</th>
              <th className="text-left text-xs font-semibold text-[#8A9BB5] px-6 py-4 uppercase tracking-wider hidden lg:table-cell">Data</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-[#8A9BB5] uppercase tracking-wider">Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, i) => (
              <tr
                key={post.id}
                style={{
                  borderBottom: i < posts.length - 1 ? "1px solid rgba(255,255,255,0.04)" : undefined,
                  background: "rgba(21,40,71,0.4)",
                }}
              >
                {/* Title + excerpt */}
                <td className="px-6 py-4 max-w-xs">
                  <p className="text-sm font-semibold text-white truncate">{post.title}</p>
                  <p className="text-xs text-[#8A9BB5] truncate mt-0.5">{post.excerpt}</p>
                </td>

                {/* Category */}
                <td className="px-6 py-4 hidden md:table-cell">
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: "rgba(212,168,67,0.1)", color: "#D4A843" }}
                  >
                    {post.category}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4 hidden sm:table-cell">
                  <span
                    className="flex items-center gap-1.5 text-xs font-medium w-fit px-2.5 py-1 rounded-full"
                    style={
                      post.published
                        ? { background: "rgba(16,185,129,0.12)", color: "#10B981" }
                        : { background: "rgba(255,255,255,0.06)", color: "#8A9BB5" }
                    }
                  >
                    {post.published ? <Eye size={11} /> : <EyeOff size={11} />}
                    {post.published ? "Publicat" : "Draft"}
                  </span>
                </td>

                {/* Date */}
                <td className="px-6 py-4 hidden lg:table-cell">
                  <span className="text-xs text-[#8A9BB5]">{formatDate(post.createdAt)}</span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/blog/${post.id}/edit`}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                      style={{ background: "rgba(212,168,67,0.1)", color: "#D4A843" }}
                      title="Editează"
                    >
                      <Pencil size={14} />
                    </Link>
                    <DeleteBlogPostButton postId={post.id} postTitle={post.title} />
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center text-[#8A9BB5]">
                  <p className="text-base mb-2">Niciun articol creat încă.</p>
                  <Link href="/admin/blog/new" className="text-sm text-[#D4A843] underline">
                    Creează primul articol →
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
