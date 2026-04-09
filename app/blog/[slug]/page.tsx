import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Tag, ArrowLeft, User } from "lucide-react";
import { formatDate } from "@/lib/portal-utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const revalidate = 60;

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
    title: `${post.title} — AiWANT Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.imageUrl ? [post.imageUrl] : [],
      type: "article",
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

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--color-midnight)", minHeight: "100vh" }}>
        {/* Back link */}
        <div className="max-w-3xl mx-auto px-4 pt-28 pb-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm transition-colors"
            style={{ color: "var(--color-text-muted)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-gold)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)"; }}
          >
            <ArrowLeft size={15} />
            Înapoi la blog
          </Link>
        </div>

        {/* Article */}
        <article className="max-w-3xl mx-auto px-4 pb-24">
          {/* Meta */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span
                className="text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5"
                style={{ background: "rgba(212,168,67,0.1)", color: "var(--color-gold)", border: "1px solid rgba(212,168,67,0.2)" }}
              >
                <Tag size={11} />
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--color-text-muted)" }}>
                <Calendar size={11} />
                {formatDate(post.createdAt)}
              </span>
              <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--color-text-muted)" }}>
                <User size={11} />
                {post.author.name}
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl font-black leading-tight mb-5"
              style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
            >
              {post.title}
            </h1>

            <p
              className="text-lg leading-relaxed"
              style={{ color: "var(--color-text-muted)", borderLeft: "3px solid var(--color-gold)", paddingLeft: "1rem" }}
            >
              {post.excerpt}
            </p>
          </header>

          {/* Cover image */}
          {post.imageUrl && (
            <div className="relative w-full rounded-2xl overflow-hidden mb-10" style={{ aspectRatio: "16/9" }}>
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Footer CTA */}
          <div
            className="mt-16 p-8 rounded-2xl text-center"
            style={{ background: "var(--color-slate-deep)", border: "1px solid rgba(212,168,67,0.15)" }}
          >
            <p
              className="text-xl font-bold mb-3"
              style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
            >
              Vrei să implementezi ceva similar în afacerea ta?
            </p>
            <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
              Hai să discutăm despre procesele tale. Primul audit este 100% gratuit.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
              style={{ background: "var(--color-gold)", color: "var(--color-midnight)" }}
            >
              Solicită un Audit Gratuit →
            </Link>
          </div>
        </article>
      </main>

      {/* Blog prose styles */}
      <style>{`
        .blog-prose { color: rgba(200,215,235,0.9); font-size: 1rem; line-height: 1.8; }
        .blog-prose h2 { font-size: 1.5rem; font-weight: 800; margin: 2.5rem 0 1rem; color: white; font-family: var(--font-display); }
        .blog-prose h3 { font-size: 1.2rem; font-weight: 700; margin: 2rem 0 0.75rem; color: white; }
        .blog-prose p { margin: 1rem 0; }
        .blog-prose ul, .blog-prose ol { padding-left: 1.75rem; margin: 1rem 0; }
        .blog-prose li { margin: 0.4rem 0; }
        .blog-prose blockquote { border-left: 3px solid #D4A843; padding: 0.75rem 1.25rem; margin: 1.5rem 0; color: rgba(200,215,235,0.7); font-style: italic; background: rgba(212,168,67,0.04); border-radius: 0 0.5rem 0.5rem 0; }
        .blog-prose a { color: #D4A843; text-decoration: underline; text-underline-offset: 3px; }
        .blog-prose a:hover { opacity: 0.85; }
        .blog-prose strong { color: white; font-weight: 700; }
        .blog-prose em { color: rgba(200,215,235,0.8); }
        .blog-prose img { max-width: 100%; border-radius: 1rem; margin: 1.5rem 0; }
        .blog-prose code { background: rgba(212,168,67,0.1); color: #D4A843; padding: 0.15em 0.45em; border-radius: 0.3em; font-size: 0.875em; }
        .blog-prose pre { background: rgba(0,0,0,0.5); border-radius: 1rem; padding: 1.25rem; overflow-x: auto; margin: 1.5rem 0; border: 1px solid rgba(255,255,255,0.06); }
        .blog-prose pre code { background: none; color: rgba(255,255,255,0.85); padding: 0; font-size: 0.875rem; }
        .blog-prose hr { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 2rem 0; }
      `}</style>

      <Footer />
    </>
  );
}
