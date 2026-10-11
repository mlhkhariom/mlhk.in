import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { notFound } from "next/navigation";
import { buildSeo } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 300;
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  if (!post || post.status !== "published") return {};
  return buildSeo({
    title: post.title,
    description: post.excerpt ?? undefined,
    path: `/blog/${post.slug}`,
    image: post.coverImage ?? undefined,
    type: "article",
    publishedAt: post.publishedAt ?? undefined,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  if (!post || post.status !== "published") notFound();

  // Fetch related posts for internal linking
  const relatedPosts = await db
    .select({ id: blogPosts.id, slug: blogPosts.slug, title: blogPosts.title })
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.publishedAt))
    .limit(4);
  const related = relatedPosts.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <>
    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]} />
    <article className="mx-auto max-w-3xl bg-[#050607] px-4 pb-16 pt-12">
      <JsonLd data={{
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt ?? "",
        image: post.coverImage ?? undefined,
        datePublished: post.publishedAt ?? undefined,
        dateModified: post.publishedAt ?? undefined,
        author: { "@type": "Organization", name: "MLHK Infotech" },
        publisher: { "@type": "Organization", name: "MLHK Infotech", url: "https://mlhk.in", logo: { "@type": "ImageObject", url: "https://mlhk.in/logo.png" } },
        mainEntityOfPage: { "@type": "WebPage", "@id": `https://mlhk.in/blog/${post.slug}` },
        wordCount: post.content ? Math.round(post.content.length / 5) : 0,
        inLanguage: "en-IN",
      }} />
      {post.coverImage && <img src={post.coverImage} alt={post.title} className="mb-10 h-72 w-full rounded-[1.75rem] object-cover" />}
      <p className="mb-4 text-xs uppercase tracking-[0.16em] text-[#ffb84d]">{post.publishedAt?.slice(0, 10)}</p>
      <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">{post.title}</h1>
      {post.excerpt && <p className="mb-10 mt-6 border-l-2 border-[#ff9f1c] pl-5 text-lg leading-relaxed text-zinc-300">{post.excerpt}</p>}
      {/* Render HTML from RichEditor */}
      <div
        className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-zinc-400 prose-a:text-[#ffb84d] prose-strong:text-white prose-img:rounded-2xl"
        dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
      />
    </article>

    {/* Related Posts — Internal Linking */}
    {related.length > 0 && (
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <div className="border-t border-white/10 pt-10">
          <h2 className="font-display text-xl font-bold text-white mb-6">Related articles</h2>
          <div className="grid gap-4">
            {related.map(rp => (
              <Link key={rp.id} href={`/blog/${rp.slug}`} className="group flex items-center gap-3 rounded-xl border border-white/10 p-4 transition-colors hover:border-[#ff9f1c]/40 hover:bg-white/[0.03]">
                <span className="shrink-0 text-sm font-bold text-[#ffb84d]">→</span>
                <span className="text-sm font-medium text-zinc-300 transition-colors group-hover:text-white">{rp.title}</span>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/blog" className="text-sm font-semibold text-[#ffb84d] hover:text-white">← Back to all posts</Link>
          </div>
        </div>
      </section>
    )}
    </>
  );
}
