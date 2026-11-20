import type { MetadataRoute } from "next";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { blogPosts, pages, subsidiaries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { SERVICE_DETAILS } from "@/lib/brand";
import { LOCATION_HUBS, getLocationHeroVisual } from "@/lib/seo-locations";
import { SOLUTION_PAGES } from "@/lib/seo-solutions";
import { EDITORIAL_ARTICLES } from "@/lib/blog-articles";
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
    {
      url: `${BASE_URL}/hi/locations`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      images: [`${BASE_URL}/images/showcase/studio-hub.jpg`],
    },
    ...SERVICE_DETAILS.map((s) => ({
      url: `${BASE_URL}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      images: [DEFAULT_OG_IMAGE],
    })),
    ...SOLUTION_PAGES.map((sol) => ({
      url: `${BASE_URL}/solutions/${sol.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      images: [DEFAULT_OG_IMAGE],
    })),
    ...LOCATION_HUBS.map((loc) => {
      const heroImg = `${BASE_URL}${getLocationHeroVisual(loc).src}`;
      return {
        url: `${BASE_URL}/locations/${loc.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: loc.slug === "indore" || loc.slug === "madhya-pradesh" || loc.slug === "india" ? 0.9 : 0.85,
        images: [heroImg],
      };
    }),
    ...LOCATION_HUBS.map((loc) => {
      const heroImg = `${BASE_URL}${getLocationHeroVisual(loc).src}`;
      return {
        url: `${BASE_URL}/hi/locations/${loc.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: loc.slug === "indore" || loc.slug === "madhya-pradesh" || loc.slug === "india" ? 0.9 : 0.85,
        images: [heroImg],
      };
    }),
  ];

  const editorialBlogEntries: MetadataRoute.Sitemap = EDITORIAL_ARTICLES.map((art) => ({
    url: `${BASE_URL}/blog/${art.slug}`,
    lastModified: new Date(art.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
    images: [art.coverImage.startsWith("http") ? art.coverImage : `${BASE_URL}${art.coverImage}`],
  }));

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) {
      return [...staticPages, ...editorialBlogEntries];
    }
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

    const cmsSlugSet = new Set(publishedPosts.map((p) => p.slug));
    const postPages: MetadataRoute.Sitemap = [
      ...publishedPosts.map((p) => ({
        url: `${BASE_URL}/blog/${p.slug}`,
        lastModified: p.publishedAt ? new Date(p.publishedAt) : now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
        images: p.coverImage
          ? [p.coverImage.startsWith("http") ? p.coverImage : `${BASE_URL}${p.coverImage}`]
          : [DEFAULT_OG_IMAGE],
      })),
      ...editorialBlogEntries.filter((entry) => {
        const slug = entry.url.replace(`${BASE_URL}/blog/`, "");
        return !cmsSlugSet.has(slug);
      }),
    ];

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
    return [...staticPages, ...editorialBlogEntries];
  }
}

