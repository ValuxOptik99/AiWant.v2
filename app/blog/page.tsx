import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogGrid from "@/components/blog/BlogGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Automatizare, AI & Business Digital",
  description:
    "Articole practice despre automatizare, AI, digitalizare și strategii de creștere pentru afaceri din România.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — AiWANT",
    description: "Resurse și insights despre digitalizare și automatizare pentru antreprenori.",
    type: "website",
  },
};

export const revalidate = 60;

function readingTime(html: string): number {
  const words = html.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } },
  });

  const serialized = posts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    category: p.category,
    imageUrl: p.imageUrl,
    createdAt: p.createdAt,
    readingTime: readingTime(p.content),
    author: { name: p.author.name },
  }));

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--color-midnight)", minHeight: "100vh" }}>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section
          className="relative pt-36 pb-20 px-4 overflow-hidden"
          style={{ background: "var(--color-midnight)" }}
        >
          {/* Dot grid */}
          <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />
          {/* Gold radial glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, rgba(212,168,67,0.08) 0%, transparent 70%)",
            }}
          />

          <div className="relative max-w-3xl mx-auto text-center">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
              style={{
                border: "1px solid rgba(212,168,67,0.25)",
                color: "var(--color-gold)",
                background: "rgba(212,168,67,0.06)",
              }}
            >
              Resurse & Insights
            </span>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black mb-5 leading-tight"
              style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
            >
              Automatizare, AI &{" "}
              <span style={{ color: "var(--color-gold)" }}>Business Digital</span>
            </h1>

            <p
              className="text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              Articole practice despre cum să-ți optimizezi procesele, să reduci
              costurile operaționale și să folosești tehnologia ca avantaj competitiv.
            </p>

            {posts.length > 0 && (
              <div className="flex items-center justify-center gap-6 mt-8 text-sm" style={{ color: "var(--color-text-muted)" }}>
                <span>
                  <span className="font-bold text-white">{posts.length}</span> articole publicate
                </span>
                <span className="w-1 h-1 rounded-full" style={{ background: "var(--color-text-muted)" }} />
                <span>
                  <span className="font-bold text-white">
                    {Array.from(new Set(posts.map((p) => p.category))).length}
                  </span>{" "}
                  categorii
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Separator */}
        <div
          className="h-px mx-4 max-w-7xl lg:mx-auto"
          style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,67,0.2), transparent)" }}
        />

        {/* ── Posts grid ────────────────────────────────────────────────── */}
        <section className="px-4 py-16 lg:py-20">
          <div className="max-w-7xl mx-auto">
            <BlogGrid posts={serialized} />
          </div>
        </section>

        {/* ── Bottom CTA ────────────────────────────────────────────────── */}
        <section className="px-4 pb-24">
          <div
            className="max-w-3xl mx-auto rounded-2xl p-10 text-center"
            style={{
              background: "var(--color-slate-deep)",
              border: "1px solid rgba(212,168,67,0.15)",
              boxShadow: "0 0 40px rgba(212,168,67,0.05)",
            }}
          >
            <p
              className="text-2xl font-black mb-3"
              style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
            >
              Vrei să implementezi ceva din ce citești?
            </p>
            <p className="text-base mb-7" style={{ color: "var(--color-text-muted)" }}>
              Oferim un audit gratuit al proceselor tale — fără angajamente, fără pitch de vânzare.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105"
              style={{
                background: "var(--color-gold)",
                color: "var(--color-midnight)",
                boxShadow: "0 4px 20px rgba(212,168,67,0.25)",
              }}
            >
              Solicită un Audit Gratuit →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
