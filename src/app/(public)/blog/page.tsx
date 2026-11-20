import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Clock, Rss, Search, ShieldCheck, X } from "lucide-react";
import { eq } from "drizzle-orm";
import { safeDb } from "@/lib/db/safe";
import { blogPosts } from "@/lib/db/schema";
import { buildSeo } from "@/lib/seo";
import { BRAND } from "@/lib/brand";
import {
  estimateReadingMinutes,
  mergePublishedBlogArticles,
  stripHtmlToText,
} from "@/lib/blog-articles";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { PageHero } from "@/components/public/PageHero";
import { ShowcaseImage } from "@/components/ui/ShowcaseImage";
import { QuickContactTrigger } from "@/components/public/QuickContactTrigger";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: "Engineering & Growth Journal — Web, App, SEO, ERP & Hindi Guides",
    description:
      "Actionable engineering guides, transparent Indian website & app cost breakdowns, Local SEO playbooks, Cloudflare architecture notes, and bilingual Hindi + English growth strategies from MLHK Infotech.",
    path: "/blog",
    keywords: [
      "MLHK Infotech blog",
      "website development cost in India 2026",
      "local SEO guide Tier 2 Tier 3 cities India",
      "Hindi website SEO guide Bharat",
      "Cloudflare Edge vs cPanel India",
      "GST ERP dashboard vs Excel",
    ],
  });
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; cat?: string }>;
}) {
  const resolvedParams = searchParams ? await searchParams : {};
  const query = (resolvedParams?.q ?? "").trim();
  const activeCategory = (resolvedParams?.cat ?? "").trim();
  const normalizedQuery = query.toLowerCase();

  const db = safeDb();
  const dbRows = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .all()
    .catch(() => []);

  const allArticles = mergePublishedBlogArticles(dbRows);
  const categories = Array.from(new Set(allArticles.map((a) => a.category)));

  const filteredArticles = allArticles.filter((article) => {
    if (activeCategory && article.category !== activeCategory) return false;
    if (!normalizedQuery) return true;
    const bodyText = stripHtmlToText(article.content).toLowerCase();
    return (
      article.title.toLowerCase().includes(normalizedQuery) ||
      article.excerpt.toLowerCase().includes(normalizedQuery) ||
      article.category.toLowerCase().includes(normalizedQuery) ||
      article.tags.some((t) => t.toLowerCase().includes(normalizedQuery)) ||
      bodyText.includes(normalizedQuery)
    );
  });

  const featuredArticle = !query && !activeCategory ? filteredArticles[0] : undefined;
  const gridArticles = featuredArticle ? filteredArticles.slice(1) : filteredArticles;

  const schemaBlogPosts = allArticles.slice(0, 12).map((article) => ({
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    url: `${BRAND.url}/blog/${article.slug}`,
    image: article.coverImage.startsWith("http")
      ? article.coverImage
      : `${BRAND.url}${article.coverImage}`,
    datePublished: article.publishedAt,
    author: {
      "@type": "Person",
      "@id": `${BRAND.url}/about#hariom-vishwkarma`,
      name: BRAND.founder,
      url: `${BRAND.url}/about`,
    },
  }));

  return (
    <>
      <JsonLd
        data={{
          "@type": "Blog",
          "@id": `${BRAND.url}/blog#blog`,
          name: "MLHK Infotech Engineering & Growth Journal",
          description:
            "Technical articles on web platforms, transparent pricing, Local SEO, mobile apps, enterprise GST ERP, and Hindi + English Bharat digital growth.",
          url: `${BRAND.url}/blog`,
          inLanguage: ["en-IN", "hi-IN"],
          publisher: {
            "@type": "Organization",
            "@id": `${BRAND.url}/#organization`,
            name: BRAND.name,
            url: BRAND.url,
          },
          blogPost: schemaBlogPosts,
        }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }]} />

      <PageHero
        eyebrow="Engineering & Growth Journal"
        title={
          <>
            Real playbooks from <span className="text-brand">shipping production software.</span>
          </>
        }
        description="Honest INR pricing breakdowns, Local SEO & Google Maps strategies, Cloudflare architecture notes, and Hindi + English growth guides — written directly by our engineering desk."
      />

      <section className="bg-[#050607] px-4 pb-28 md:px-6">
        <div className="mx-auto max-w-6xl">
          {/* Search + Category Filter Bar */}
          <div className="mb-10 space-y-5 border-b border-white/10 pb-8">
            <form action="/blog" method="get" role="search" className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-400" aria-hidden />
                <input
                  type="search"
                  name="q"
                  defaultValue={query}
                  aria-label="Search engineering and SEO articles"
                  placeholder="Search website cost, Local SEO, Hindi SEO, ERP, Android, WhatsApp API..."
                  className="w-full rounded-full border border-white/12 bg-white/[0.03] py-3 pl-11 pr-10 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-[#ff9f1c]/60"
                />
                {activeCategory && <input type="hidden" name="cat" value={activeCategory} />}
                {query && (
                  <Link
                    href={activeCategory ? `/blog?cat=${encodeURIComponent(activeCategory)}` : "/blog"}
                    aria-label="Clear search"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-400 hover:bg-white/10 hover:text-white"
                  >
                    <X className="size-3.5" />
                  </Link>
                )}
              </div>
              <button
                type="submit"
                className="min-h-[44px] rounded-full bg-[#ff9f1c] px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02] hover:bg-[#ffb84d] active:scale-[0.98]"
              >
                Search Articles
              </button>
            </form>

            {/* Category Links */}
            <div className="flex flex-wrap items-center gap-2" aria-label="Filter articles by category">
              <Link
                href={query ? `/blog?q=${encodeURIComponent(query)}` : "/blog"}
                className={`rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  !activeCategory
                    ? "border-[#ff9f1c]/50 bg-[#ff9f1c]/15 text-[#ffb84d]"
                    : "border-white/10 bg-white/[0.02] text-zinc-300 hover:border-white/25 hover:text-white"
                }`}
              >
                All Guides ({allArticles.length})
              </Link>
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                const href = query
                  ? `/blog?cat=${encodeURIComponent(cat)}&q=${encodeURIComponent(query)}`
                  : `/blog?cat=${encodeURIComponent(cat)}`;
                return (
                  <Link
                    key={cat}
                    href={href}
                    className={`rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                      isActive
                        ? "border-[#ff9f1c]/50 bg-[#ff9f1c]/15 text-[#ffb84d]"
                        : "border-white/10 bg-white/[0.02] text-zinc-300 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {cat}
                  </Link>
                );
              })}
            </div>
          </div>

          {(query || activeCategory) && (
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-400">
              <p>
                Showing <span className="font-semibold text-white">{filteredArticles.length}</span>{" "}
                {filteredArticles.length === 1 ? "article" : "articles"}
                {activeCategory ? (
                  <>
                    {" "}in <span className="font-semibold text-[#ffb84d]">{activeCategory}</span>
                  </>
                ) : null}
                {query ? (
                  <>
                    {" "}matching <span className="font-semibold text-white">&ldquo;{query}&rdquo;</span>
                  </>
                ) : null}
              </p>
              <Link href="/blog" className="text-xs font-semibold text-[#ffb84d] hover:underline">
                Reset all filters
              </Link>
            </div>
          )}

          {filteredArticles.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-12 text-center">
              <p className="font-display text-xl font-bold text-white">No articles matched your filter.</p>
              <p className="mt-2 text-sm text-zinc-400">
                Try another keyword like &ldquo;SEO&rdquo;, &ldquo;Cost&rdquo;, &ldquo;ERP&rdquo;, or &ldquo;Hindi&rdquo;, or browse all guides.
              </p>
              <Link
                href="/blog"
                className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[#ff9f1c] px-5 py-2.5 text-sm font-semibold text-black hover:bg-[#ffb84d]"
              >
                View all guides
              </Link>
            </div>
          ) : (
            <div className="space-y-10">
              {/* Featured Lead Story */}
              {featuredArticle && (
                <Link
                  href={`/blog/${featuredArticle.slug}`}
                  className="group grid grid-cols-1 overflow-hidden rounded-3xl border border-white/10 bg-[#0a0b0e] transition-all duration-300 hover:border-[#ff9f1c]/45 lg:grid-cols-12"
                >
                  <div className="relative min-h-[260px] overflow-hidden bg-zinc-950 lg:col-span-6 lg:min-h-[360px]">
                    <ShowcaseImage
                      src={featuredArticle.coverImage}
                      alt={featuredArticle.title}
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050607]/80 via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-col justify-between p-7 md:p-10 lg:col-span-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                        <span className="font-semibold uppercase tracking-[0.16em] text-[#ffb84d]">
                          Featured · {featuredArticle.category}
                        </span>
                        <span className="text-zinc-600">•</span>
                        <span className="inline-flex items-center gap-1 tabular-nums">
                          <Clock className="size-3.5 text-[#ff9f1c]" />
                          {estimateReadingMinutes(featuredArticle.content)} min read
                        </span>
                      </div>
                      <h2 className="mt-4 font-display text-2xl font-bold leading-snug text-white transition-colors group-hover:text-[#ffb84d] md:text-3xl">
                        {featuredArticle.title}
                      </h2>
                      <p className="mt-4 text-sm leading-relaxed text-zinc-300 md:text-base">
                        {featuredArticle.excerpt}
                      </p>
                    </div>
                    <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5 text-xs">
                      <span className="text-zinc-400">
                        By <strong className="text-zinc-200">{BRAND.founder}</strong> · {featuredArticle.publishedAt.slice(0, 10)}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-semibold text-[#ffb84d] group-hover:text-white">
                        Read guide <ArrowUpRight className="size-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Editorial Grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {gridArticles.map((article) => {
                  const readMins = estimateReadingMinutes(article.content);
                  return (
                    <Link
                      key={article.slug}
                      href={`/blog/${article.slug}`}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0b0e] transition-all duration-300 hover:-translate-y-1 hover:border-[#ff9f1c]/45"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                        <ShowcaseImage
                          src={article.coverImage}
                          alt={article.title}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0b0e] via-transparent to-transparent opacity-80" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-6">
                        <div>
                          <div className="flex items-center justify-between gap-2 text-[11px] text-zinc-400">
                            <span className="font-semibold uppercase tracking-[0.14em] text-[#ffb84d]">
                              {article.category}
                            </span>
                            <span className="inline-flex items-center gap-1 tabular-nums">
                              <Clock className="size-3 text-zinc-500" />
                              {readMins} min
                            </span>
                          </div>
                          <h2 className="mt-3 font-display text-lg font-bold leading-snug text-white transition-colors group-hover:text-[#ffb84d]">
                            {article.title}
                          </h2>
                          <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-zinc-400">
                            {article.excerpt}
                          </p>
                        </div>
                        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                          <span className="tabular-nums text-zinc-500">{article.publishedAt.slice(0, 10)}</span>
                          <span className="inline-flex items-center gap-1 font-semibold text-zinc-200 group-hover:text-[#ffb84d]">
                            Read article <ArrowUpRight className="size-3.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Editorial E-E-A-T + Direct Popup Quote CTA */}
          <div className="mt-16 rounded-3xl border border-[#ff9f1c]/20 bg-gradient-to-br from-[#ff9f1c]/[0.08] via-[#0a0b0e] to-[#0a0b0e] p-8 md:p-10">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#ffb84d]">
                    <ShieldCheck className="size-4" /> Verified Indian Engineering Desk
                  </span>
                  <span>·</span>
                  <span className="tabular-nums">MSME {BRAND.udyamNumber}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <BookOpen className="size-3.5 text-[#ff9f1c]" /> Written by {BRAND.founder}
                  </span>
                </div>
                <h2 className="mt-3 font-display text-2xl font-bold text-white md:text-3xl">
                  Want us to audit your website, SEO, or software plan?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  Skip agency sales calls. Open our 30-second popup brief and get an honest technical plan + fixed INR estimate directly from our team.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <QuickContactTrigger service="SEO & Local Google Ranking">
                  Get Free Technical Audit
                </QuickContactTrigger>
                <Link
                  href="/hi/locations"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-[#ff9f1c]/50 hover:text-[#ffb84d]"
                >
                  हिन्दी शहर गाइड देखें
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-center text-sm">
            <a href="/feed.xml" className="inline-flex items-center gap-2 font-semibold text-[#ffb84d] hover:text-white">
              <Rss className="size-4" /> Subscribe via RSS Feed
            </a>
            <Link href="/locations" className="text-zinc-400 transition-colors hover:text-white">
              Explore 38+ City SEO Hubs →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

