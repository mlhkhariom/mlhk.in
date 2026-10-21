import type { MetadataRoute } from "next";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { blogPosts, pages, subsidiaries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { SERVICE_DETAILS } from "@/lib/brand";

const BASE = "https://mlhk.in";

export const revalidate = 86400; // 24 hours ISR cache

const STATIC_LASTMOD = new Date("2026-10-21T00:00:00.000Z");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: STATIC_LASTMOD, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/about`, lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services`, lastModified: STATIC_LASTMOD, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/portfolio`, lastModified: STATIC_LASTMOD, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: STATIC_LASTMOD, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/subsidiaries`, lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/process`, lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/faq`, lastModified: STATIC_LASTMOD, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/ai-automation`, lastModified: STATIC_LASTMOD, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/privacy-policy`, lastModified: STATIC_LASTMOD, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms-and-conditions`, lastModified: STATIC_LASTMOD, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms-of-service`, lastModified: STATIC_LASTMOD, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/cancellation-refund-policy`, lastModified: STATIC_LASTMOD, changeFrequency: "yearly", priority: 0.3 },
    ...SERVICE_DETAILS.map((s) => ({
      url: `${BASE}/services/${s.slug}`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
  ];

  try {
    const { env } = await getCloudflareContext({ async: true });
    const db = getDb(env.DB);

    const [publishedPosts, publishedPages, activeBrands] = await Promise.all([
      db.select({ slug: blogPosts.slug, publishedAt: blogPosts.publishedAt }).from(blogPosts).where(eq(blogPosts.status, "published")).all(),
      db.select({ slug: pages.slug, updatedAt: pages.updatedAt }).from(pages).where(eq(pages.status, "published")).all(),
      db.select({ slug: subsidiaries.slug }).from(subsidiaries).where(eq(subsidiaries.active, true)).all(),
    ]);

    const postPages: MetadataRoute.Sitemap = publishedPosts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.publishedAt ? new Date(p.publishedAt) : STATIC_LASTMOD,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    const cmsPages: MetadataRoute.Sitemap = publishedPages.map((p) => ({
      url: `${BASE}/p/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : STATIC_LASTMOD,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));

    const brandPages: MetadataRoute.Sitemap = activeBrands.map((b) => ({
      url: `${BASE}/subsidiaries/${b.slug}`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    return [...staticPages, ...postPages, ...cmsPages, ...brandPages];
  } catch {
    return staticPages;
  }
}
