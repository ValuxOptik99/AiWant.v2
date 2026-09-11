import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/constants";
import { SERVICES_DATA } from "@/lib/services-data";

export const revalidate = 3600;

// Manually maintained — static pages don't have a real per-page "last modified"
// source, and calling new Date() on every request would lie to Google.
const STATIC_LAST_MODIFIED = new Date("2026-09-11");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE_URL}/portofoliu`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/configurator`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.6 },
  ];

  const serviceEntries: MetadataRoute.Sitemap = SERVICES_DATA.map((service) => ({
    url: `${SITE_URL}/servicii/${service.slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true, imageUrl: true },
    });
    blogEntries = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "weekly",
      priority: 0.7,
      ...(post.imageUrl
        ? { images: [post.imageUrl.startsWith("http") ? post.imageUrl : `${SITE_URL}${post.imageUrl}`] }
        : {}),
    }));
  } catch (error) {
    console.error("sitemap: failed to load blog posts", error);
  }

  return [...staticEntries, ...serviceEntries, ...blogEntries];
}
