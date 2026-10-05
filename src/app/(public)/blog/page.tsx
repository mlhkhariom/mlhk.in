import type { Metadata } from "next";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { buildSeo } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import Link from "next/link";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({ title: "Blog", description: "Insights on technology, business, and digital transformation from MLHK Infotech.", path: "/blog" });
}

export default async function BlogPage() {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const posts = await db.select().from(blogPosts).where(eq(blogPosts.status, "published")).all();

  return (
    <>
    <JsonLd data={{
      "@type": "Blog",
      name: "MLHK Infotech Blog",
      description: "Insights on technology, business, and digital transformation.",
      url: "https://mlhk.in/blog",
      publisher: { "@type": "Organization", name: "MLHK Infotech" },
      blogPost: posts.slice(0, 10).map(p => ({
        "@type": "BlogPosting",
        headline: p.title,
        url: `https://mlhk.in/blog/${p.slug}`,
        datePublished: p.publishedAt ?? undefined,
      })),
    }} />
    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-gray-500">Insights on technology, business, and digital transformation</p>
      </div>
      {posts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">No posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid gap-8">
          {posts.map(post => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block border rounded-2xl p-6 hover:shadow-md transition-shadow">
              {post.coverImage && <img src={post.coverImage} alt={post.title} className="w-full h-48 object-cover rounded-xl mb-4" loading="lazy" />}
              <p className="text-xs text-blue-500 font-medium mb-2">{post.publishedAt?.slice(0, 10)}</p>
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">{post.title}</h2>
              {post.excerpt && <p className="text-gray-500 text-sm leading-relaxed">{post.excerpt}</p>}
            </Link>
          ))}
        </div>
      )}
      <div className="mt-12 text-center">
        <Link href="/feed.xml" className="text-sm text-blue-600 hover:underline">Subscribe via RSS →</Link>
      </div>
    </div>
    </>
  );
}
