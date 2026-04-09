import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/portal-utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — AiWANT | Automatizare, AI & Business Digital",
  description: "Articole despre automatizare, AI, digitalizare și strategii de creștere pentru afaceri din România.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } },
  });

  const categories = Array.from(new Set(posts.map((p) => p.category)));

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--color-midnight)", minHeight: "100vh" }}>
        {/* Hero */}
        <section className="pt-32 pb-16 px-4" style={{ background: "var(--color-midnight)" }}>
          <div className="max-w-4xl mx-auto text-center">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
              style={{ border: "1px solid rgba(212,168,67,0.25)", color: "var(--color-gold)", background: "rgba(212,168,67,0.06)" }}
            >
              Resurse & Insights
            </span>
            <h1
              className="text-4xl sm:text-5xl font-black mb-5 leading-tight"
              style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
            >
              Automatizare, AI &{" "}
              <span style={{ color: "var(--color-gold)" }}>Business Digital</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--color-text-muted)" }}>
              Articole practice despre cum să-ți optimizezi procesele, să scalezi afacerea
              și să folosești tehnologia ca avantaj competitiv.
            </p>
          </div>
        </section>

        {/* Category filter chips */}
        {categories.length > 0 && (
          <section className="px-4 pb-8">
            <div className="max-w-7xl mx-auto flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="text-xs px-3 py-1.5 rounded-full font-medium"
                  style={{ background: "rgba(212,168,67,0.08)", color: "var(--color-gold)", border: "1px solid rgba(212,168,67,0.2)" }}
                >
                  {cat}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Posts grid */}
        <section className="px-4 pb-24">
          <div className="max-w-7xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-24" style={{ color: "var(--color-text-muted)" }}>
                <p className="text-lg">Niciun articol publicat încă.</p>
                <p className="text-sm mt-2 opacity-60">Revino curând.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
                    style={{
                      background: "var(--color-slate-deep)",
                      border: "1px solid var(--color-border-dark)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,168,67,0.4)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(212,168,67,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border-dark)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    {/* Cover image */}
                    {post.imageUrl ? (
                      <div className="relative w-full flex-shrink-0 overflow-hidden" style={{ aspectRatio: "16/9" }}>
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-full flex items-center justify-center flex-shrink-0"
                        style={{ aspectRatio: "16/9", background: "rgba(212,168,67,0.05)" }}
                      >
                        <span className="text-4xl opacity-20">✍️</span>
                      </div>
                    )}

                    {/* Body */}
                    <div className="flex flex-col flex-1 p-5 gap-3">
                      {/* Category + date */}
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className="text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1"
                          style={{ background: "rgba(212,168,67,0.1)", color: "var(--color-gold)" }}
                        >
                          <Tag size={10} />
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
                          <Calendar size={10} />
                          {formatDate(post.createdAt)}
                        </span>
                      </div>

                      {/* Title */}
                      <h2
                        className="font-bold text-lg leading-snug"
                        style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
                      >
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-sm leading-relaxed flex-1 line-clamp-3" style={{ color: "var(--color-text-muted)" }}>
                        {post.excerpt}
                      </p>

                      {/* CTA */}
                      <div
                        className="flex items-center gap-1 text-sm font-medium mt-auto pt-2"
                        style={{ color: "var(--color-gold)" }}
                      >
                        Citește articolul
                        <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
