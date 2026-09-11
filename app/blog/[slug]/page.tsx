import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, Tag, ArrowLeft, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/portal-utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/blog/ReadingProgress";
import type { Metadata } from "next";

export const revalidate = 60;

function readingTime(html: string): number {
  const words = html.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.imageUrl ? [{ url: post.imageUrl, width: 1200, height: 630 }] : [],
      type: "article",
      publishedTime: post.createdAt.toISOString(),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug, published: true },
    include: { author: { select: { name: true } } },
  });
  if (!post) notFound();

  const minutes = readingTime(post.content);

  // Related posts — same category, exclude current
  const related = await prisma.blogPost.findMany({
    where: { published: true, category: post.category, NOT: { id: post.id } },
    orderBy: { createdAt: "desc" },
    take: 2,
    select: { id: true, title: true, slug: true, excerpt: true, imageUrl: true, category: true, createdAt: true },
  });

  return (
    <>
      <ReadingProgress />
      <Navbar />

      <main style={{ background: "var(--color-midnight)" }}>

        {/* ── Cover hero ────────────────────────────────────────────────── */}
        {post.imageUrl ? (
          <div className="relative w-full overflow-hidden" style={{ height: "55vh", minHeight: 320, maxHeight: 560 }}>
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, rgba(14,29,51,0.3) 0%, rgba(14,29,51,0.5) 50%, rgba(14,29,51,0.95) 100%)",
              }}
            />
            {/* Meta on top of image */}
            <div className="absolute bottom-0 left-0 right-0 max-w-3xl mx-auto px-4 pb-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(212,168,67,0.15)", color: "var(--color-gold)", border: "1px solid rgba(212,168,67,0.3)", backdropFilter: "blur(8px)" }}
                >
                  <Tag size={10} />
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
                  <Calendar size={11} />
                  {formatDate(post.createdAt)}
                </span>
                <span className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
                  <Clock size={11} />
                  {minutes} min citire
                </span>
                <span className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
                  <User size={11} />
                  {post.author.name}
                </span>
              </div>
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight"
                style={{ color: "white", fontFamily: "var(--font-display)", textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}
              >
                {post.title}
              </h1>
            </div>
          </div>
        ) : (
          /* No image — plain header */
          <div
            className="relative pt-32 pb-12 px-4 overflow-hidden"
            style={{ background: "var(--color-midnight)" }}
          >
            <div className="absolute inset-0 bg-dot-grid opacity-15 pointer-events-none" />
            <div className="relative max-w-3xl mx-auto">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(212,168,67,0.1)", color: "var(--color-gold)", border: "1px solid rgba(212,168,67,0.2)" }}
                >
                  <Tag size={10} />
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--color-text-muted)" }}>
                  <Calendar size={11} />
                  {formatDate(post.createdAt)}
                </span>
                <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--color-text-muted)" }}>
                  <Clock size={11} />
                  {minutes} min citire
                </span>
              </div>
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight"
                style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
              >
                {post.title}
              </h1>
            </div>
          </div>
        )}

        {/* ── Article body ──────────────────────────────────────────────── */}
        <article className="max-w-3xl mx-auto px-4 py-12 lg:py-16">

          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm mb-10 transition-colors group"
            style={{ color: "var(--color-text-muted)" }}
          >
            <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
            <span className="group-hover:underline">Înapoi la blog</span>
          </Link>

          {/* Excerpt pull-quote */}
          <blockquote
            className="text-lg leading-relaxed mb-10 pl-5"
            style={{
              color: "rgba(200,215,235,0.85)",
              borderLeft: "3px solid var(--color-gold)",
              fontStyle: "italic",
            }}
          >
            {post.excerpt}
          </blockquote>

          {/* Rich text content */}
          <div
            id="article-body"
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author card */}
          <div
            className="flex items-center gap-4 mt-14 p-5 rounded-2xl"
            style={{ background: "var(--color-slate-deep)", border: "1px solid var(--color-border-dark)" }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0"
              style={{ background: "rgba(212,168,67,0.15)", color: "var(--color-gold)", fontFamily: "var(--font-display)" }}
            >
              {post.author.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--color-text-on-dark)" }}>
                {post.author.name}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                Strategic Digital Partner @ AiWANT
              </p>
            </div>
          </div>

          {/* CTA block */}
          <div
            className="mt-10 p-8 rounded-2xl text-center"
            style={{
              background: "linear-gradient(135deg, var(--color-slate-deep), rgba(21,40,71,0.7))",
              border: "1px solid rgba(212,168,67,0.2)",
              boxShadow: "0 0 40px rgba(212,168,67,0.06)",
            }}
          >
            <p
              className="text-xl font-black mb-3"
              style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
            >
              Vrei să implementezi asta în afacerea ta?
            </p>
            <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
              Auditează procesele tale împreună cu noi. Gratuit, fără angajamente.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105"
              style={{
                background: "var(--color-gold)",
                color: "var(--color-midnight)",
                boxShadow: "0 4px 20px rgba(212,168,67,0.3)",
              }}
            >
              Solicită un Audit Gratuit →
            </a>
          </div>
        </article>

        {/* ── Related posts ─────────────────────────────────────────────── */}
        {related.length > 0 && (
          <section
            className="px-4 py-16 border-t"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <div className="max-w-3xl mx-auto">
              <h2
                className="text-2xl font-black mb-8"
                style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
              >
                Articole similare
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    href={`/blog/${p.slug}`}
                    className="group flex gap-4 p-4 rounded-2xl transition-all duration-200"
                    style={{
                      background: "var(--color-slate-deep)",
                      border: "1px solid var(--color-border-dark)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,168,67,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border-dark)";
                    }}
                  >
                    {p.imageUrl && (
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={p.imageUrl} alt={p.title} fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex flex-col justify-center gap-1.5 min-w-0">
                      <span
                        className="text-xs font-semibold"
                        style={{ color: "var(--color-gold)" }}
                      >
                        {p.category}
                      </span>
                      <p
                        className="text-sm font-bold leading-snug line-clamp-2 group-hover:underline underline-offset-2"
                        style={{ color: "var(--color-text-on-dark)" }}
                      >
                        {p.title}
                      </p>
                      <span className="flex items-center gap-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
                        {formatDate(p.createdAt)}
                        <ArrowRight size={11} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Back to blog ──────────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto px-4 pb-20 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: "var(--color-text-muted)" }}
          >
            <ArrowLeft size={14} />
            Vezi toate articolele
          </Link>
        </div>
      </main>

      {/* ── Prose styles ──────────────────────────────────────────────────── */}
      <style>{`
        .blog-prose { color: rgba(200,215,235,0.9); font-size: 1.0625rem; line-height: 1.85; }
        .blog-prose > * + * { margin-top: 1.2em; }
        .blog-prose h2 { font-size: 1.6rem; font-weight: 800; margin-top: 2.5rem; margin-bottom: 0.75rem; color: white; font-family: var(--font-display); letter-spacing: -0.02em; }
        .blog-prose h3 { font-size: 1.2rem; font-weight: 700; margin-top: 2rem; margin-bottom: 0.5rem; color: white; }
        .blog-prose p { margin: 1.1em 0; }
        .blog-prose ul { padding-left: 1.5rem; list-style: none; }
        .blog-prose ul li::before { content: "→"; color: #D4A843; font-weight: 700; display: inline-block; width: 1.5em; margin-left: -1.5em; }
        .blog-prose ol { padding-left: 1.75rem; margin: 1rem 0; }
        .blog-prose li { margin: 0.5rem 0; }
        .blog-prose blockquote { border-left: 3px solid #D4A843; padding: 0.75rem 1.25rem; margin: 1.75rem 0; color: rgba(200,215,235,0.7); font-style: italic; background: rgba(212,168,67,0.04); border-radius: 0 0.75rem 0.75rem 0; }
        .blog-prose a { color: #D4A843; text-decoration: underline; text-underline-offset: 3px; transition: opacity 0.15s; }
        .blog-prose a:hover { opacity: 0.8; }
        .blog-prose strong { color: white; font-weight: 700; }
        .blog-prose em { color: rgba(200,215,235,0.8); }
        .blog-prose img { max-width: 100%; border-radius: 1rem; margin: 2rem 0; border: 1px solid rgba(255,255,255,0.06); }
        .blog-prose code { background: rgba(212,168,67,0.1); color: #D4A843; padding: 0.15em 0.45em; border-radius: 0.35em; font-size: 0.875em; border: 1px solid rgba(212,168,67,0.15); }
        .blog-prose pre { background: rgba(0,0,0,0.55); border-radius: 1rem; padding: 1.5rem; overflow-x: auto; margin: 2rem 0; border: 1px solid rgba(255,255,255,0.08); }
        .blog-prose pre code { background: none; color: rgba(255,255,255,0.88); padding: 0; font-size: 0.875rem; border: none; }
        .blog-prose hr { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 2.5rem 0; }
        .blog-prose table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.9rem; }
        .blog-prose th { text-align: left; padding: 0.6rem 1rem; background: rgba(212,168,67,0.08); color: #D4A843; font-weight: 700; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid rgba(212,168,67,0.2); }
        .blog-prose td { padding: 0.6rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(200,215,235,0.85); }
        .blog-prose tr:last-child td { border-bottom: none; }
      `}</style>

      <Footer />
    </>
  );
}
