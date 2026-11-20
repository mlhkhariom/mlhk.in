import type { MetadataRoute } from "next";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { blogPosts, pages, subsidiaries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { SERVICE_DETAILS } from "@/lib/brand";
import {
  BASE_URL,
  CORE_STATIC_PATHS,
  DEFAULT_OG_IMAGE,
  buildCanonicalUrl,
} from "@/lib/seo-utils";

export const revalidate = 3600; // 1 hour ISR + instant revalidatePath() on CMS publish

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    ...CORE_STATIC_PATHS.map((entry) => ({
      url: buildCanonicalUrl(entry.path),
      lastModified: now,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      images: [DEFAULT_OG_IMAGE],
    })),
    ...SERVICE_DETAILS.map((s) => ({
      url: `${BASE_URL}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      images: [DEFAULT_OG_IMAGE],
    })),
  ];

  try {
    const { env } = await getCloudflareContext({ async: true });
    const db = getDb(env.DB);

    const [publishedPosts, publishedPages, activeBrands] = await Promise.all([
      db
        .select({
          slug: blogPosts.slug,
          publishedAt: blogPosts.publishedAt,
          coverImage: blogPosts.coverImage,
        })
        .from(blogPosts)
        .where(eq(blogPosts.status, "published"))
        .all(),
      db
        .select({ slug: pages.slug, updatedAt: pages.updatedAt })
        .from(pages)
        .where(eq(pages.status, "published"))
        .all(),
      db
        .select({ slug: subsidiaries.slug, logo: subsidiaries.logo })
        .from(subsidiaries)
        .where(eq(subsidiaries.active, true))
        .all(),
    ]);

    const postPages: MetadataRoute.Sitemap = publishedPosts.map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      lastModified: p.publishedAt ? new Date(p.publishedAt) : now,
      changeFrequency: "weekly" as const,
      priority: 0.75,
      images: p.coverImage
        ? [p.coverImage.startsWith("http") ? p.coverImage : `${BASE_URL}${p.coverImage}`]
        : [DEFAULT_OG_IMAGE],
    }));

    const cmsPages: MetadataRoute.Sitemap = publishedPages.map((p) => ({
      url: `${BASE_URL}/p/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    }));

    const brandPages: MetadataRoute.Sitemap = activeBrands.map((b) => ({
      url: `${BASE_URL}/subsidiaries/${b.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
      ...(b.logo
        ? { images: [b.logo.startsWith("http") ? b.logo : `${BASE_URL}${b.logo}`] }
        : {}),
    }));

    return [...staticPages, ...postPages, ...cmsPages, ...brandPages];
  } catch {
    return staticPages;
  }
}
