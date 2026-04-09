import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export const runtime = "edge";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  if (!post || post.status !== "published") notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      {post.coverImage && <img src={post.coverImage} alt={post.title} className="w-full h-64 object-cover rounded-2xl mb-8" />}
      <p className="text-xs text-blue-500 font-medium mb-3">{post.publishedAt?.slice(0, 10)}</p>
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
      {post.excerpt && <p className="text-lg text-gray-500 mb-8 leading-relaxed border-l-4 border-blue-200 pl-4">{post.excerpt}</p>}
      <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</div>
    </article>
  );
}
