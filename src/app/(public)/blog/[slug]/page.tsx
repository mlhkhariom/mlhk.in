import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Clock, List, ShieldCheck } from "lucide-react";
import { eq } from "drizzle-orm";
import { safeDb } from "@/lib/db/safe";
import { blogPosts } from "@/lib/db/schema";
import { buildSeo } from "@/lib/seo";
import { BRAND } from "@/lib/brand";
import { sanitizeHtml } from "@/lib/sanitize";
import {
  EDITORIAL_ARTICLES,
  estimateReadingMinutes,
  extractHeadings,
  getEditorialArticleBySlug,
  injectHeadingIds,
  mergePublishedBlogArticles,
  stripHtmlToText,
  type BlogArticle,
} from "@/lib/blog-articles";
import { ArticleJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { ShowcaseImage } from "@/components/ui/ShowcaseImage";
import { QuickContactTrigger } from "@/components/public/QuickContactTrigger";

export const revalidate = 300;

export function generateStaticParams() {
  return EDITORIAL_ARTICLES.map((article) => ({ slug: article.slug }));
}

async function resolveArticle(slug: string): Promise<BlogArticle | undefined> {
  const db = safeDb();
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1)
    .catch(() => []);

  if (post && post.status === "published") {
    const editorialFallback = getEditorialArticleBySlug(slug);
    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt?.trim() || stripHtmlToText(post.content).slice(0, 175),
      category: editorialFallback?.category ?? "Engineering Journal",
      coverImage: post.coverImage?.trim() || editorialFallback?.coverImage || "/images/showcase/studio-hub.jpg",
      publishedAt: post.publishedAt || post.createdAt || "2026-10-01T00:00:00.000Z",
      content: post.content || "",
      tags: editorialFallback?.tags ?? ["MLHK Infotech", "Engineering", "India"],
      faqs: editorialFallback?.faqs,
      relatedServiceHref: editorialFallback?.relatedServiceHref,
      relatedServiceLabel: editorialFallback?.relatedServiceLabel,
      source: "cms",
    };
  }

  return getEditorialArticleBySlug(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await resolveArticle(slug);
  if (!article) {
    return buildSeo({ title: "Article Not Found", path: `/blog/${slug}`, noIndex: true });
  }
  const isHindi = /[\u0900-\u097f]/.test(article.title);
  return buildSeo({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
    image: article.coverImage,
    type: "article",
    publishedAt: article.publishedAt,
    locale: isHindi ? "hi_IN" : "en_IN",
    keywords: [...article.tags, "MLHK Infotech", "India IT Engineering"],
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await resolveArticle(slug);
  if (!article) notFound();

  const db = safeDb();
  const dbRows = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .all()
    .catch(() => []);

  const allArticles = mergePublishedBlogArticles(dbRows);
  const related = allArticles.filter((a) => a.slug !== article.slug).slice(0, 3);

  // Sanitize HTML first (strips untrusted tags/attrs), then inject deterministic TOC anchor IDs on <h2>
  const sanitized = sanitizeHtml(article.content);
  const renderedHtml = injectHeadingIds(sanitized);
  const headings = extractHeadings(sanitized);
  const wordCount = stripHtmlToText(sanitized).split(/\s+/).filter(Boolean).length;
  const readMins = estimateReadingMinutes(sanitized);
  const isHindi = /[\u0900-\u097f]/.test(article.title);

  return (
    <>
      <ArticleJsonLd
        title={article.title}
        excerpt={article.excerpt}
        slug={article.slug}
        image={
          article.coverImage.startsWith("http")
            ? article.coverImage
            : `${BRAND.url}${article.coverImage}`
        }
        publishedAt={article.publishedAt}
        wordCount={wordCount}
      />
      {article.faqs && article.faqs.length > 0 && <FaqJsonLd faqs={article.faqs} />}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: article.title, href: `/blog/${article.slug}` },
        ]}
      />

      <div className="bg-[#050607] px-4 pb-24 pt-12 md:px-6 md:pt-16">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <header className="mx-auto max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
              <span className="font-semibold uppercase tracking-[0.18em] text-[#ffb84d]">
                {article.category}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="tabular-nums">{article.publishedAt.slice(0, 10)}</span>
              <span className="text-zinc-600">•</span>
              <span className="inline-flex items-center gap-1 tabular-nums">
                <Clock className="size-3.5 text-[#ff9f1c]" />
                {readMins} min read ({wordCount} words)
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold leading-[1.12] tracking-tight text-white text-balance md:text-5xl">
              {article.title}
            </h1>

            <p data-speakable="summary" className="mt-6 border-l-2 border-[#ff9f1c] pl-5 text-base leading-relaxed text-zinc-300 md:text-lg">
              {article.excerpt}
            </p>

            {/* Cover Showcase Image */}
            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/10 bg-zinc-950">
              <ShowcaseImage
                src={article.coverImage}
                alt={article.title}
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050607]/60 via-transparent to-transparent" />
            </div>
          </header>

          {/* Main Grid: Article Body + Sticky TOC / CTA Sidebar */}
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12">
            <article className="lg:col-span-8">
              <div
                className="prose prose-invert prose-lg max-w-none prose-headings:scroll-mt-24 prose-headings:font-display prose-headings:text-white prose-h2:mt-10 prose-h2:text-2xl prose-p:leading-relaxed prose-p:text-zinc-300 prose-li:text-zinc-300 prose-a:text-[#ffb84d] prose-strong:text-white prose-blockquote:border-[#ff9f1c] prose-blockquote:bg-white/[0.02] prose-blockquote:py-2 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-img:rounded-2xl"
                dangerouslySetInnerHTML={{ __html: renderedHtml }}
              />

              {/* Visible FAQs matching FAQPage JSON-LD */}
              {article.faqs && article.faqs.length > 0 && (
                <section className="mt-14 border-t border-white/10 pt-10" aria-labelledby="article-faqs">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffb84d]">
                    Quick Answers
                  </p>
                  <h2 id="article-faqs" className="mt-2 font-display text-2xl font-bold text-white">
                    Frequently Asked Questions
                  </h2>
                  <div className="mt-6">
                    {article.faqs.map((faq) => (
                      <details key={faq.question} className="group border-b border-white/10 py-4 first:pt-0">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-white marker:content-none">
                          <span>{faq.question}</span>
                          <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-white/15 text-[#ffb84d] transition-transform group-open:rotate-45">
                            +
                          </span>
                        </summary>
                        <p className="mt-3 text-sm leading-relaxed text-zinc-300">{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* Author E-E-A-T Verification Box */}
              <div className="mt-12 rounded-2xl border border-white/10 bg-[#0a0b0e] p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#ffb84d]">
                      <ShieldCheck className="size-3.5" /> Verified Author · E-E-A-T
                    </p>
                    <h3 className="mt-2 font-display text-lg font-bold text-white">
                      {BRAND.founder} ({BRAND.founderAlias})
                    </h3>
                    <p className="text-xs text-zinc-400">{BRAND.founderRole}</p>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-300">
                      Founder &amp; System Architect at MLHK Infotech (est. April 2020 · MSME {BRAND.udyamNumber} · GSTIN {BRAND.gstin}). Engineering production web systems, Android apps, Local SEO, and GST ERP across Indore, Shajapur, and all 28 Indian states.
                    </p>
                  </div>
                  <Link
                    href="/about"
                    className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#ffb84d] hover:text-white"
                  >
                    Founder profile <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </article>

            {/* Right Rail: Table of Contents + Instant Popup Quote */}
            <aside className="space-y-6 lg:col-span-4">
              {headings.length > 0 && (
                <div className="rounded-2xl border border-white/10 bg-[#0a0b0e] p-6 lg:sticky lg:top-24">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ffb84d]">
                    <List className="size-3.5" /> On This Page
                  </p>
                  <nav aria-label="Table of contents" className="mt-4 space-y-2.5">
                    {headings.map((h) => (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        className="block text-sm leading-snug text-zinc-300 transition-colors hover:text-[#ffb84d]"
                      >
                        {h.text}
                      </a>
                    ))}
                  </nav>

                  <div className="mt-7 border-t border-white/10 pt-6">
                    <p className="font-display text-base font-bold text-white">
                      {isHindi ? "क्या आपको अपनी वेबसाइट या SEO बनवानी है?" : "Need help implementing this?"}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                      {isHindi
                        ? "30 सेकंड में अपनी जानकारी भेजें — हमारी टीम आपको सही प्लान और कम बजट का एस्टीमेट देगी।"
                        : "Get an honest technical plan and transparent INR estimate directly from our engineering desk."}
                    </p>
                    <div className="mt-4 flex flex-col gap-2.5">
                      <QuickContactTrigger
                        service={article.category}
                        lang={isHindi ? "hi" : "en"}
                        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[#ff9f1c] px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-[1.01] hover:bg-[#ffb84d]"
                      >
                        {isHindi ? "तुरंत फ्री कोट पाएं" : "Get Instant Quote"}
                      </QuickContactTrigger>
                      {article.relatedServiceHref && article.relatedServiceLabel && (
                        <Link
                          href={article.relatedServiceHref}
                          className="inline-flex min-h-[40px] w-full items-center justify-center gap-1.5 rounded-full border border-white/12 px-4 py-2 text-xs font-semibold text-zinc-200 transition-colors hover:border-[#ff9f1c]/45 hover:text-[#ffb84d]"
                        >
                          {article.relatedServiceLabel} <ArrowUpRight className="size-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </aside>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <section className="mx-auto mt-20 max-w-6xl border-t border-white/10 pt-12">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="font-display text-2xl font-bold text-white">Continue Reading</h2>
                <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#ffb84d] hover:text-white">
                  <ArrowLeft className="size-4" /> All journal articles
                </Link>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
                {related.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0a0b0e] p-5 transition-colors hover:border-[#ff9f1c]/45"
                  >
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ffb84d]">
                        {rp.category}
                      </p>
                      <h3 className="mt-2 font-display text-base font-bold leading-snug text-white transition-colors group-hover:text-[#ffb84d]">
                        {rp.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-400">
                        {rp.excerpt}
                      </p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-zinc-300 group-hover:text-[#ffb84d]">
                      Read guide <ArrowUpRight className="size-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

