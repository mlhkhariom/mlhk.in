import type { Metadata } from "next";
import { safeDb } from "@/lib/db/safe";
import { getDb } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { buildSeo } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { PageHero } from "@/components/public/PageHero";
import Link from "next/link";
import { ArrowUpRight, Rss } from "lucide-react";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: "Blog",
    description: "Notes from MLHK Infotech on building web platforms, mobile apps, enterprise systems and AI automation.",
    path: "/blog",
  });
}

export default async function BlogPage() {
  const db = safeDb();
  const posts = await db.select().from(blogPosts).where(eq(blogPosts.status, "published")).all().catch(() => []);

  return (
    <>
      <JsonLd
        data={{
          "@type": "Blog",
          name: "MLHK Infotech Blog",
          description: "Notes on building web, mobile, enterprise and AI systems.",
          url: "https://mlhk.in/blog",
          publisher: { "@type": "Organization", name: "MLHK Infotech" },
          blogPost: posts.slice(0, 10).map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `https://mlhk.in/blog/${p.slug}`,
            datePublished: p.publishedAt ?? undefined,
          })),
        }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

      <PageHero
        eyebrow="Journal"
        title={<>Notes from the <span className="text-brand">build.</span></>}
        description="How we scope, build and run software for businesses, written by the people doing the work."
      />

      <section className="bg-[#050607] px-4 pb-28 md:px-6">
        <div className="mx-auto max-w-4xl">
          {posts.length === 0 ? (
            <div className="rounded-[1.75rem] border border-dashed border-white/15 p-12 text-center">
              <p className="font-display text-xl font-bold text-white">First articles are in progress.</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
                Subscribe to the RSS feed to be notified when we publish.
              </p>
            </div>
          ) : (
            <ul className="grid gap-5">
              {posts.map((post) => (
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
            <Link href="/feed.xml" className="inline-flex items-center gap-2 text-sm font-semibold text-[#ffb84d] hover:text-white">
              <Rss className="size-4" /> Subscribe via RSS
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
