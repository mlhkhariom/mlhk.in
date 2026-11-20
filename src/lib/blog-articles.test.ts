import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  EDITORIAL_ARTICLES,
  estimateReadingMinutes,
  extractHeadings,
  injectHeadingIds,
  mergePublishedBlogArticles,
} from "./blog-articles";
import { LOCATION_HUBS, getLocationHeroVisual, getLocationTierBucket } from "./seo-locations";
import { HINDI_CITY_MAP, getHindiLocationData } from "./seo-locations-hi";

describe("blog-articles & bilingual 38-city SEO hubs", () => {
  it("merges D1 CMS posts over editorial articles with identical slugs", () => {
    const merged = mergePublishedBlogArticles([
      {
        id: "cms-override-1",
        slug: EDITORIAL_ARTICLES[0].slug,
        title: "Custom CMS Override Title",
        excerpt: "Updated excerpt",
        content: "<h2>Fresh Section</h2><p>Updated body copy.</p>",
        coverImage: "/images/showcase/seo-growth.jpg",
        status: "published",
        publishedAt: "2026-12-01T00:00:00.000Z",
      },
      {
        id: "cms-draft-ignored",
        slug: "hidden-draft",
        title: "Draft Should Not Appear",
        excerpt: null,
        content: "<p>Draft</p>",
        coverImage: null,
        status: "draft",
        publishedAt: null,
      },
    ]);

    assert.equal(merged.length, EDITORIAL_ARTICLES.length);
    assert.equal(merged[0].title, "Custom CMS Override Title");
    assert.equal(merged[0].source, "cms");
    assert.ok(!merged.some((a) => a.slug === "hidden-draft"));
  });

  it("extracts headings and injects matching deterministic anchor IDs (English & Hindi)", () => {
    const html = "<h2>Why Website Cost Varies</h2><p>Body</p><h2>हिंदी SEO के फायदे</h2>";
    const headings = extractHeadings(html);
    assert.equal(headings.length, 2);
    assert.ok(headings[0].id.startsWith("sec-"));
    assert.ok(headings[1].id.startsWith("sec-"));

    const injected = injectHeadingIds(html);
    assert.ok(injected.includes(`id="${headings[0].id}"`));
    assert.ok(injected.includes(`id="${headings[1].id}"`));
    assert.ok(estimateReadingMinutes(html) >= 1);
  });

  it("covers 38 unique pan-India Tier-1, Tier-2 & Tier-3 city hubs with complete Hindi localizations and static images", () => {
    assert.ok(LOCATION_HUBS.length >= 38, `Expected at least 38 hubs, got ${LOCATION_HUBS.length}`);
    const seenSlugs = new Set<string>();

    for (const loc of LOCATION_HUBS) {
      assert.ok(!seenSlugs.has(loc.slug), `Duplicate location slug: ${loc.slug}`);
      seenSlugs.add(loc.slug);

      // Every city must have an explicit entry in HINDI_CITY_MAP
      assert.ok(HINDI_CITY_MAP[loc.slug], `Missing explicit Hindi city mapping for ${loc.slug}`);

      const hi = getHindiLocationData(loc);
      assert.ok(/[\u0900-\u097f]/.test(hi.nameHi), `Expected Devanagari nameHi for ${loc.slug}`);
      assert.ok(hi.faqsHi.length >= 4, `Expected >=4 Hindi FAQs for ${loc.slug}`);
      assert.ok(hi.packagesHi.length >= 4, `Expected >=4 Hindi packages for ${loc.slug}`);

      const visual = getLocationHeroVisual(loc);
      assert.ok(visual.src.startsWith("/images/showcase/"), `Unexpected hero image path for ${loc.slug}: ${visual.src}`);

      const bucket = getLocationTierBucket(loc);
      assert.ok(["HQ & MP", "Tier-1 Metro", "Tier-2 Growth", "Tier-3 Regional", "Pan-India"].includes(bucket));
    }
  });
});
