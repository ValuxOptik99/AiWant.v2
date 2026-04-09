"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";

export interface BlogPostCard {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  imageUrl: string | null;
  createdAt: Date;
  readingTime: number;
  author: { name: string };
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("ro-RO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// ─── Featured (first) post card ───────────────────────────────────────────────
function FeaturedCard({ post }: { post: BlogPostCard }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group relative flex flex-col lg:flex-row rounded-2xl overflow-hidden"
        style={{
          background: "var(--color-slate-deep)",
          border: "1px solid rgba(212,168,67,0.2)",
          boxShadow: "0 4px 32px rgba(0,0,0,0.3)",
        }}
      >
        {/* Image */}
        <div className="relative w-full lg:w-3/5 flex-shrink-0 overflow-hidden" style={{ minHeight: 280 }}>
          {post.imageUrl ? (
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, var(--color-midnight), var(--color-slate-deep))" }}
            >
              <span className="text-6xl opacity-10">✍️</span>
            </div>
          )}
          {/* Overlay gradient */}
          <div
            className="absolute inset-0 pointer-events-none lg:hidden"
            style={{ background: "linear-gradient(to top, rgba(14,29,51,0.85), transparent)" }}
          />
          {/* Featured badge */}
          <div className="absolute top-4 left-4">
            <span
              className="text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider"
              style={{ background: "var(--color-gold)", color: "var(--color-midnight)" }}
            >
              ✦ Articol recomandat
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col justify-center p-7 lg:p-10 gap-5 flex-1">
          {/* Category + meta */}
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: "rgba(212,168,67,0.12)", color: "var(--color-gold)", border: "1px solid rgba(212,168,67,0.2)" }}
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
              {post.readingTime} min citire
            </span>
          </div>

          {/* Title */}
          <h2
            className="text-2xl sm:text-3xl font-black leading-snug"
            style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
          >
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-base leading-relaxed line-clamp-3" style={{ color: "var(--color-text-muted)" }}>
            {post.excerpt}
          </p>

          {/* CTA */}
          <div
            className="inline-flex items-center gap-2 text-sm font-bold mt-2 w-fit"
            style={{ color: "var(--color-gold)" }}
          >
            Citește articolul
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Regular post card ────────────────────────────────────────────────────────
function PostCard({ post, index }: { post: BlogPostCard; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: "var(--color-slate-deep)",
          border: "1px solid var(--color-border-dark)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
        }}
      >
        {/* Cover image */}
        <div className="relative w-full flex-shrink-0 overflow-hidden" style={{ aspectRatio: "16/9" }}>
          {post.imageUrl ? (
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, rgba(14,29,51,0.8), rgba(21,40,71,0.9))" }}
            >
              <span className="text-3xl opacity-15">✍️</span>
            </div>
          )}
          {/* Top gradient overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, rgba(212,168,67,0.08), transparent)" }}
          />
          {/* Category pill on image */}
          <div className="absolute top-3 left-3">
            <span
              className="text-xs px-2.5 py-1 rounded-full font-semibold"
              style={{
                background: "rgba(14,29,51,0.85)",
                color: "var(--color-gold)",
                border: "1px solid rgba(212,168,67,0.3)",
                backdropFilter: "blur(4px)",
              }}
            >
              {post.category}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          {/* Meta */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
              <Calendar size={10} />
              {formatDate(post.createdAt)}
            </span>
            <span className="w-1 h-1 rounded-full" style={{ background: "var(--color-text-muted)" }} />
            <span className="flex items-center gap-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
              <Clock size={10} />
              {post.readingTime} min
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-bold text-lg leading-snug transition-colors duration-200"
            style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm leading-relaxed flex-1 line-clamp-3" style={{ color: "var(--color-text-muted)" }}>
            {post.excerpt}
          </p>

          {/* Bottom bar */}
          <div
            className="flex items-center justify-between pt-3 mt-1"
            style={{ borderTop: "1px solid var(--color-border-dark)" }}
          >
            <span className="text-xs font-medium" style={{ color: "rgba(160,180,210,0.6)" }}>
              {post.author.name}
            </span>
            <span
              className="flex items-center gap-1 text-xs font-semibold"
              style={{ color: "var(--color-gold)" }}
            >
              Citește
              <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Category filter bar ──────────────────────────────────────────────────────
function CategoryBar({
  categories,
  active,
  onChange,
}: {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {["Toate", ...categories].map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className="text-sm px-4 py-2 rounded-full font-medium transition-all duration-200"
            style={{
              background: isActive ? "var(--color-gold)" : "rgba(255,255,255,0.04)",
              color: isActive ? "var(--color-midnight)" : "var(--color-text-muted)",
              border: isActive ? "1px solid var(--color-gold)" : "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState({ filtered }: { filtered: boolean }) {
  return (
    <div className="text-center py-24 col-span-full">
      <div className="text-5xl mb-4 opacity-20">📭</div>
      <p className="text-lg font-semibold" style={{ color: "var(--color-text-on-dark)" }}>
        {filtered ? "Niciun articol în această categorie" : "Niciun articol publicat încă"}
      </p>
      <p className="text-sm mt-2" style={{ color: "var(--color-text-muted)" }}>
        {filtered ? "Selectează o altă categorie" : "Revino curând — scriem în continuare!"}
      </p>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function BlogGrid({ posts }: { posts: BlogPostCard[] }) {
  const [activeCategory, setActiveCategory] = useState("Toate");

  const categories = Array.from(new Set(posts.map((p) => p.category)));

  const filtered = activeCategory === "Toate"
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  const [featured, ...rest] = filtered;

  return (
    <div className="space-y-10">
      {/* Category filter */}
      {categories.length > 1 && (
        <CategoryBar
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-8"
        >
          {filtered.length === 0 ? (
            <EmptyState filtered={activeCategory !== "Toate"} />
          ) : (
            <>
              {/* Featured post */}
              {featured && <FeaturedCard post={featured} />}

              {/* Rest of posts */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post, i) => (
                    <PostCard key={post.id} post={post} index={i} />
                  ))}
                </div>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
