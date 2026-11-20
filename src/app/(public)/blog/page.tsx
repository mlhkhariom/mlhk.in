import type { Metadata } from "next";
import { safeDb } from "@/lib/db/safe";
import { blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { buildSeo } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { PageHero } from "@/components/public/PageHero";
import Link from "next/link";
import { ArrowUpRight, Rss, Search, X } from "lucide-react";

export const revalidate = 60;

type FieldNote = {
  id: string;
  category: string;
  badgeClass: string;
  meta: string;
  datePublished: string;
  title: string;
  paragraphs: string[];
  linkHref: string;
  linkLabel: string;
};

const FIELD_NOTES: FieldNote[] = [
  {
    id: "cloudflare-edge-hosting-india",
    category: "Cloud & Infrastructure",
    badgeClass: "border-[#ff9f1c]/30 bg-[#ff9f1c]/10 text-[#ffb84d]",
    meta: "October 2026 • 6 min read",
    datePublished: "2026-10-01",
    title: "Why We Chose Cloudflare Edge Over Traditional cPanel Hosting for Indian Clients",
    paragraphs: [
      "When a business owner in Shajapur, Indore, or Bhopal asks for a website, 90% of local web designers buy a cheap shared cPanel hosting account. The result? A slow site hosted on a server physically located in Germany or Singapore that takes 4 to 6 seconds to open on an Airtel or Jio phone in India.",
      "We stopped doing that years ago. Today, every system we build runs directly on Cloudflare's Global Edge network with data centers in Mumbai, Delhi, Chennai, Kolkata, and Hyderabad. When someone in Madhya Pradesh visits the site, their browser connects to a local server in India in under 30 milliseconds.",
      "The second big advantage is maintenance. Shared servers crash when PHP updates break, or get hacked through outdated WordPress plugins. Cloudflare Workers and serverless databases (like SQLite D1) have zero servers to patch, automatically handle traffic spikes, and include enterprise-grade DDoS protection without an extra bill.",
    ],
    linkHref: "/services/web-development",
    linkLabel: "Web Engineering Services",
  },
  {
    id: "excel-to-internal-dashboard",
    category: "Enterprise Software",
    badgeClass: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    meta: "September 2026 • 8 min read",
    datePublished: "2026-09-01",
    title: "How We Replaced 5 Messy Excel Sheets With One Lightweight Internal Dashboard",
    paragraphs: [
      "Almost every business doing ₹50 lakh to ₹5 crore in annual turnover in India runs on a fragile combination of WhatsApp messages, paper notebooks, and shared Excel sheets stored in someone's Google Drive. The moment three staff members edit the file at once, version conflicts happen, payments go uncollected, and customer follow-ups slip through the cracks.",
      "The mistake most business owners make next is buying a bloated foreign SaaS tool (like Salesforce or HubSpot). Within two months, staff stop using it because the interface is complicated, filled with English corporate jargon, and asks for 15 mandatory fields just to record a lead.",
      "We solve this by engineering bespoke, 4-screen dashboards tailored strictly around how that specific business operates: Screen 1 shows today's incoming inquiries; Screen 2 generates instant GST invoices with a WhatsApp PDF button; Screen 3 tracks current orders; and Screen 4 shows pending customer payments. No training required, no unnecessary menus, and zero monthly subscription per seat.",
    ],
    linkHref: "/services/enterprise-systems",
    linkLabel: "Enterprise Systems",
  },
  {
    id: "native-android-vs-pwa-india",
    category: "Mobile Engineering",
    badgeClass: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
    meta: "August 2026 • 5 min read",
    datePublished: "2026-08-01",
    title: "Native Android App vs Responsive Website: What Indian Businesses Actually Need",
    paragraphs: [
      'A client often calls saying: “Hariom, we need an Android app on Google Play Store.” The first thing we ask is: “Why do your customers need to download a 40 MB file to do business with you?”',
      "In 2026, mobile browser capabilities are extraordinary. A clean Progressive Web App (PWA) built with Next.js can install directly to a phone's home screen, send push notifications, work offline, and load in under 1 second without forcing customers through the Play Store download hurdle.",
      "You only genuinely need a Native Android App if your business requires: (1) Background GPS tracking for delivery or sales staff; (2) Direct Bluetooth thermal printer connectivity for spot billing; or (3) Complex camera barcode scanning in offline warehouse environments. If you don't need hardware-level Android APIs, a fast web platform will save you 60% of your development budget and reach 10x more users.",
    ],
    linkHref: "/services/mobile-app-development",
    linkLabel: "Mobile App Services",
  },
  {
    id: "whatsapp-business-cloud-api-automation",
    category: "Automation & AI",
    badgeClass: "border-purple-500/30 bg-purple-500/10 text-purple-400",
    meta: "July 2026 • 7 min read",
    datePublished: "2026-07-01",
    title: "Automating Business Operations with WhatsApp Business Cloud API: Real Lessons",
    paragraphs: [
      "Most third-party WhatsApp automation tools charge Indian businesses hefty monthly platform fees plus an expensive markup on every single conversation. What many don't know is that Meta provides a direct WhatsApp Business Cloud API where the first 1,000 service conversations every month are completely free.",
      "At MLHK Infotech, we connect your website forms, inventory triggers, and billing systems directly to the official Meta Cloud API using secure webhooks. When a customer submits an inquiry on your site, two things happen within 2 seconds: (1) Your customer receives a polite, personalized confirmation on WhatsApp with their reference number; and (2) Your sales executive receives an instant notification with a one-click call button.",
      "This simple automation alone reduces lead response time from 4 hours to under 2 minutes, dramatically increasing closing rates for regional Indian businesses without paying a rupee to middlemen platforms.",
    ],
    linkHref: "/services/ai-automation",
    linkLabel: "Automation Services",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: "Blog",
    description: "Notes from MLHK Infotech on building web platforms, mobile apps, enterprise systems and AI automation.",
    path: "/blog",
  });
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const resolvedParams = searchParams ? await searchParams : {};
  const query = (resolvedParams?.q ?? "").trim();
  const normalizedQuery = query.toLowerCase();

  const db = safeDb();
  const posts = await db.select().from(blogPosts).where(eq(blogPosts.status, "published")).all().catch(() => []);

  const filteredPosts = normalizedQuery
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(normalizedQuery) ||
          (p.excerpt ?? "").toLowerCase().includes(normalizedQuery) ||
          (p.content ?? "").toLowerCase().includes(normalizedQuery)
      )
    : posts;

  const filteredNotes = normalizedQuery
    ? FIELD_NOTES.filter(
        (n) =>
          n.title.toLowerCase().includes(normalizedQuery) ||
          n.category.toLowerCase().includes(normalizedQuery) ||
          n.paragraphs.some((p) => p.toLowerCase().includes(normalizedQuery))
      )
    : FIELD_NOTES;

  const schemaBlogPosts =
    posts.length > 0
      ? posts.slice(0, 10).map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          description: p.excerpt ?? undefined,
          url: `https://mlhk.in/blog/${p.slug}`,
          datePublished: p.publishedAt ?? undefined,
          author: {
            "@type": "Person",
            "@id": "https://mlhk.in/about#hariom-vishwkarma",
            name: "Hariom Vishwkarma",
            url: "https://mlhk.in/about",
          },
        }))
      : FIELD_NOTES.map((n) => ({
          "@type": "BlogPosting",
          headline: n.title,
          description: n.paragraphs[0],
          url: `https://mlhk.in/blog#${n.id}`,
          datePublished: n.datePublished,
          author: {
            "@type": "Person",
            "@id": "https://mlhk.in/about#hariom-vishwkarma",
            name: "Hariom Vishwkarma",
            url: "https://mlhk.in/about",
          },
        }));

  return (
    <>
      <JsonLd
        data={{
          "@type": "Blog",
          "@id": "https://mlhk.in/blog#blog",
          name: "MLHK Infotech Engineering Journal",
          description: "Technical articles on web platforms, mobile engineering, enterprise systems, and AI automation.",
          url: "https://mlhk.in/blog",
          publisher: {
            "@type": "Organization",
            "@id": "https://mlhk.in/#organization",
            name: "MLHK Infotech",
            url: "https://mlhk.in",
          },
          blogPost: schemaBlogPosts,
        }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }]} />

      <PageHero
        eyebrow="Journal"
        title={<>Notes from the <span className="text-brand">build.</span></>}
        description="How we scope, build and run software for businesses, written by the people doing the work."
      />

      <section className="bg-[#050607] px-4 pb-28 md:px-6">
        <div className="mx-auto max-w-4xl">
          <form action="/blog" method="get" role="search" className="mb-10 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-400" aria-hidden />
              <input
                type="search"
                name="q"
                defaultValue={query}
                aria-label="Search engineering articles"
                placeholder="Search articles on Cloudflare, ERP, Android, WhatsApp API..."
                className="w-full rounded-full border border-white/10 bg-white/[0.03] py-3 pl-11 pr-10 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-[#ff9f1c]/50"
              />
              {query && (
                <Link
                  href="/blog"
                  aria-label="Clear search"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-400 hover:bg-white/10 hover:text-white"
                >
                  <X className="size-3.5" />
                </Link>
              )}
            </div>
            <button
              type="submit"
              className="rounded-full bg-[#ff9f1c] px-5 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Search
            </button>
          </form>

          {query && (
            <p className="mb-6 text-sm text-zinc-400">
              Showing results for <span className="font-semibold text-white">&ldquo;{query}&rdquo;</span>
              {" · "}
              <Link href="/blog" className="text-[#ffb84d] hover:underline">
                Reset filter
              </Link>
            </p>
          )}

          {posts.length === 0 ? (
            <div className="space-y-12">
              {!query && (
                <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-8 md:p-10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">Engineering Journal • Field Notes</p>
                  <h2 className="mt-3 font-display text-2xl font-bold text-white md:text-3xl">
                    Lessons from building and shipping production software in India.
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
                    Practical engineering thoughts, architecture decisions, and honest advice for business owners —
                    written directly from our development desk in Shajapur.
                  </p>
                </div>
              )}

              {filteredNotes.length === 0 ? (
                <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-10 text-center">
                  <p className="text-base font-semibold text-white">No articles matched &ldquo;{query}&rdquo;.</p>
                  <Link href="/blog" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#ffb84d] hover:underline">
                    View all field notes
                  </Link>
                </div>
              ) : (
                <div className="grid gap-6">
                  {filteredNotes.map((note) => (
                    <article
                      key={note.id}
                      id={note.id}
                      className="group scroll-mt-24 rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-8 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-[#ff9f1c]/40 hover:bg-white/[0.04]"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className={`rounded-full border px-3 py-0.5 text-xs font-semibold ${note.badgeClass}`}>
                          {note.category}
                        </span>
                        <span className="text-xs font-mono text-zinc-400">{note.meta}</span>
                      </div>
                      <h3 className="mt-4 font-display text-2xl font-bold text-white transition-colors group-hover:text-[#ffb84d]">
                        {note.title}
                      </h3>
                      <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300">
                        {note.paragraphs.map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                      <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 text-xs text-zinc-400">
                        <span>By Hariom Vishwkarma • System Architect</span>
                        <Link href={note.linkHref} className="inline-flex items-center gap-1 font-semibold text-[#ffb84d] hover:underline">
                          {note.linkLabel} <ArrowUpRight className="size-3.5" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-10 text-center">
              <p className="text-base font-semibold text-white">No articles matched &ldquo;{query}&rdquo;.</p>
              <Link href="/blog" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#ffb84d] hover:underline">
                View all articles
              </Link>
            </div>
          ) : (
            <ul className="grid gap-5">
              {filteredPosts.map((post) => (
                <li key={post.id}>
                  <Link href={`/blog/${post.slug}`} className="group block rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-7 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-[#ff9f1c]/40">
                    {post.coverImage && <img src={post.coverImage} alt={post.title} loading="lazy" className="mb-6 h-52 w-full rounded-2xl object-cover" />}
                    {post.publishedAt && <p className="text-xs uppercase tracking-[0.16em] text-[#ffb84d]">{post.publishedAt.slice(0, 10)}</p>}
                    <h2 className="mt-3 font-display text-2xl font-bold text-white transition-colors group-hover:text-[#ffb84d]">{post.title}</h2>
                    {post.excerpt && <p className="mt-3 text-sm leading-relaxed text-zinc-400">{post.excerpt}</p>}
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-300 group-hover:text-white">
                      Read article <ArrowUpRight className="size-4" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-14 text-center">
            <a href="/feed.xml" className="inline-flex items-center gap-2 text-sm font-semibold text-[#ffb84d] hover:text-white">
              <Rss className="size-4" /> Subscribe via RSS
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
