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
    <article className="max-w-3xl mx-auto px-4 py-16">
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
      {post.coverImage && <img src={post.coverImage} alt={post.title} className="w-full h-64 object-cover rounded-2xl mb-8" />}
      <p className="text-xs text-blue-500 font-medium mb-3">{post.publishedAt?.slice(0, 10)}</p>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
      {post.excerpt && <p className="text-lg text-gray-500 mb-8 leading-relaxed border-l-4 border-blue-200 pl-4">{post.excerpt}</p>}
      {/* Render HTML from RichEditor */}
      <div
        className="prose prose-gray max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
      />
    </article>

    {/* Related Posts — Internal Linking */}
    {related.length > 0 && (
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <div className="border-t border-gray-100 pt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <div className="grid gap-4">
            {related.map(rp => (
              <Link key={rp.id} href={`/blog/${rp.slug}`} className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-blue-600 font-bold text-sm shrink-0">→</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">{rp.title}</span>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/blog" className="text-sm text-blue-600 hover:underline">← Back to all posts</Link>
          </div>
        </div>
      </section>
    )}
    </>
  );
}
