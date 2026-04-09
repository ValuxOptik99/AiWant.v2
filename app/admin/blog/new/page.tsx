import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlogPostForm from "@/components/admin/BlogPostForm";

export default async function AdminBlogNewPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/auth/login");

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/blog" className="text-[#8A9BB5] hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Articol nou</h1>
          <p className="text-sm text-[#8A9BB5] mt-0.5">Completează toate câmpurile și publică articolul</p>
        </div>
      </div>

      <div
        className="rounded-2xl p-6 lg:p-8"
        style={{ background: "rgba(21,40,71,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <BlogPostForm mode="create" />
      </div>
    </div>
  );
}
