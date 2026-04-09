import Link from "next/link";
import { ArrowRight, Rss } from "lucide-react";
import { prisma } from "@/lib/prisma";
import BlogPreviewTabs, { type SerializedPost } from "./BlogPreviewTabs";
import SpotlightBackground from "./SpotlightBackground";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function readingTime(content: string): number {
  const words = stripHtml(content).split(" ").filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function BlogPreviewSection() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 6,
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      category: true,
      imageUrl: true,
      content: true,
      createdAt: true,
      author: { select: { name: true } },
    },
  });

  if (posts.length === 0) return null;

  const serialized: SerializedPost[] = posts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    category: p.category,
    imageUrl: p.imageUrl,
    createdAt: p.createdAt.toISOString(),
    readingTime: readingTime(p.content),
    author: { name: p.author.name },
  }));

  const categories = [...new Set(serialized.map((p) => p.category))];

  return (
    <section
      id="blog"
      className="relative"
      style={{ background: "var(--color-midnight)" }}
    >
      {/* Gold top separator */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-48 z-10"
        style={{ background: "linear-gradient(90deg, transparent, var(--color-gold), transparent)" }}
      />

      <SpotlightBackground className="py-24">
        {/* Dot grid on top of spotlights */}
        <div className="absolute inset-0 bg-dot-grid opacity-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Rss size={14} style={{ color: "var(--color-gold)" }} />
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "var(--color-gold)" }}
              >
                Blog & Resurse
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-black leading-tight"
              style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
            >
              Insight-uri pentru afaceri care{" "}
              <span style={{ color: "var(--color-gold)" }}>cresc inteligent</span>
            </h2>
            <p
              className="mt-3 text-base max-w-xl"
              style={{ color: "rgba(170,190,210,0.75)" }}
            >
              Articole practice despre automatizare, optimizare și transformare digitală — scrise
              pentru antreprenori care vor rezultate, nu teorie.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm flex-shrink-0 transition-all duration-200 hover:scale-105 group"
            style={{
              background: "rgba(212,168,67,0.1)",
              border: "1px solid rgba(212,168,67,0.25)",
              color: "var(--color-gold)",
            }}
          >
            Toate articolele
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Tabs + cards */}
        <BlogPreviewTabs posts={serialized} categories={categories} />
      </div>
      </SpotlightBackground>
    </section>
  );
}
