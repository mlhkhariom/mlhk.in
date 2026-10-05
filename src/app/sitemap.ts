import type { MetadataRoute } from "next";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { blogPosts, pages, subsidiaries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const BASE = "https://mlhk.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/portfolio`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/subsidiaries`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  try {
    const { env } = getCloudflareContext();
    const db = getDb(env.DB);

    const [publishedPosts, publishedPages, activeBrands] = await Promise.all([
      db.select({ slug: blogPosts.slug, publishedAt: blogPosts.publishedAt }).from(blogPosts).where(eq(blogPosts.status, "published")).all(),
      db.select({ slug: pages.slug, updatedAt: pages.updatedAt }).from(pages).where(eq(pages.status, "published")).all(),
      db.select({ slug: subsidiaries.slug }).from(subsidiaries).where(eq(subsidiaries.active, true)).all(),
    ]);

    const postPages: MetadataRoute.Sitemap = publishedPosts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    const cmsPages: MetadataRoute.Sitemap = publishedPages.map((p) => ({
      url: `${BASE}/p/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));

    const brandPages: MetadataRoute.Sitemap = activeBrands.map((b) => ({
      url: `${BASE}/subsidiaries/${b.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    return [...staticPages, ...postPages, ...cmsPages, ...brandPages];
  } catch {
    return staticPages;
  }
}
