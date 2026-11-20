import { safeDb } from "@/lib/db/safe";
import { blogPosts } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { mergePublishedBlogArticles } from "@/lib/blog-articles";

const BASE = "https://mlhk.in";

export async function GET() {
  const db = safeDb();

  const dbPosts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.publishedAt))
    .limit(20)
    .all()
    .catch(() => []);

  const articles = mergePublishedBlogArticles(dbPosts).slice(0, 25);

  const items = articles
    .map(
      (p) => `    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${BASE}/blog/${p.slug}</link>
      <guid isPermaLink="true">${BASE}/blog/${p.slug}</guid>
      <description><![CDATA[${p.excerpt ?? ""}]]></description>
      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>MLHK Infotech Engineering &amp; SEO Journal</title>
    <link>${BASE}/blog</link>
    <description>Practical engineering, SEO, Hindi/English digital growth, and software cost guides from MLHK Infotech.</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
