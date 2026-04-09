"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import * as Tabs from "@radix-ui/react-tabs";
import { ArrowRight, Clock, BookOpen } from "lucide-react";

export interface SerializedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  imageUrl: string | null;
  createdAt: string;
  readingTime: number;
  author: { name: string };
}

interface BlogPreviewTabsProps {
  posts: SerializedPost[];
  categories: string[];
}

function PostCard({ post, index }: { post: SerializedPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "var(--color-slate-deep)",
        border: "1px solid var(--color-border-dark)",
      }}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden h-48 flex-shrink-0">
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, var(--color-navy) 0%, var(--color-midnight) 100%)",
            }}
          >
            <BookOpen size={36} style={{ color: "rgba(212,168,67,0.35)" }} />
          </div>
        )}
        {/* Category pill */}
        <span
          className="absolute top-3 left-3 text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm"
          style={{
            background: "rgba(212,168,67,0.15)",
            border: "1px solid rgba(212,168,67,0.3)",
            color: "var(--color-gold)",
          }}
        >
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3
          className="text-base font-bold leading-snug line-clamp-2 group-hover:text-amber-300 transition-colors duration-200"
          style={{ color: "var(--color-text-on-dark)", fontFamily: "var(--font-display)" }}
        >
          {post.title}
        </h3>
        <p
          className="text-sm leading-relaxed line-clamp-3 flex-1"
          style={{ color: "rgba(170,190,210,0.8)" }}
        >
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2" style={{ borderTop: "1px solid var(--color-border-dark)" }}>
          <div className="flex items-center gap-1.5">
            <Clock size={11} style={{ color: "var(--color-text-muted)" }} />
            <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              {post.readingTime} min citire
            </span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold transition-all duration-200 group/link"
            style={{ color: "var(--color-gold)" }}
          >
            Citește
            <ArrowRight
              size={12}
              className="transition-transform duration-200 group-hover/link:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function BlogPreviewTabs({ posts, categories }: BlogPreviewTabsProps) {
  const allTab = "toate";
  const [active, setActive] = useState(allTab);

  const filtered = active === allTab ? posts : posts.filter((p) => p.category === active);

  return (
    <Tabs.Root value={active} onValueChange={setActive}>
      {/* Tab triggers */}
      <Tabs.List className="flex flex-wrap gap-2 justify-center mb-10">
        <Tabs.Trigger
          value={allTab}
          className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none"
          style={{
            background: active === allTab ? "var(--color-gold)" : "rgba(255,255,255,0.05)",
            color: active === allTab ? "var(--color-midnight)" : "rgba(180,200,220,0.7)",
            border: active === allTab ? "none" : "1px solid rgba(255,255,255,0.08)",
          }}
        >
          Toate articolele
        </Tabs.Trigger>
        {categories.map((cat) => (
          <Tabs.Trigger
            key={cat}
            value={cat}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none"
            style={{
              background: active === cat ? "var(--color-gold)" : "rgba(255,255,255,0.05)",
              color: active === cat ? "var(--color-midnight)" : "rgba(180,200,220,0.7)",
              border: active === cat ? "none" : "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {cat}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {/* Tab content */}
      <Tabs.Content value={active} forceMount asChild>
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filtered.length === 0 ? (
                <div className="text-center py-16" style={{ color: "var(--color-text-muted)" }}>
                  <BookOpen size={32} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Niciun articol în această categorie încă.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((post, i) => (
                    <PostCard key={post.id} post={post} index={i} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}
