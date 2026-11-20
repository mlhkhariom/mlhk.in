import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import Link from "next/link";
import { Plus, Pencil, ExternalLink, FileText, Calendar, BookOpen } from "lucide-react";
import { EDITORIAL_ARTICLES, estimateReadingMinutes } from "@/lib/blog-articles";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  let posts: (typeof blogPosts.$inferSelect)[] = [];
  let dbWarning: string | null = null;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) {
      dbWarning = "Cloudflare D1 binding unavailable in local preview — showing built-in editorial library below.";
    } else {
      const db = getDb(env.DB);
      posts = await db.select().from(blogPosts).orderBy(sql`created_at desc`).all();
    }
  } catch (err) {
    console.error("[ADMIN_POSTS_PAGE_ERROR]", err);
    dbWarning = "Could not query blog_posts table. Check D1 binding or run migrations.";
  }

  const publishedCount = posts.filter((p) => p.status === "published").length;
  const draftCount = posts.filter((p) => p.status !== "published").length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white">
            Blog &amp; SEO Journal CMS
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Publish bilingual English &amp; Hindi SEO articles with automatic sitemap, RSS, and IndexNow updates.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <a
            href="/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 text-xs font-medium text-zinc-300 hover:border-white/20 hover:text-white"
          >
            <ExternalLink size={13} /> View Live Blog
          </a>
          <Link
            href="/admin/cms/posts/new"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#ff9f1c] px-4 text-xs font-semibold text-black shadow-[0_0_24px_rgba(255,159,28,0.25)] transition-all hover:bg-[#ffb84d]"
          >
            <Plus size={15} strokeWidth={2.5} /> New Article
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-white/10 bg-[#0c0d11]/80 p-4">
          <p className="text-[11px] font-medium text-zinc-400">CMS Published</p>
          <p className="mt-1 font-display text-2xl font-bold tabular-nums text-emerald-400">{publishedCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0c0d11]/80 p-4">
          <p className="text-[11px] font-medium text-zinc-400">CMS Drafts</p>
          <p className="mt-1 font-display text-2xl font-bold tabular-nums text-amber-400">{draftCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0c0d11]/80 p-4">
          <p className="text-[11px] font-medium text-zinc-400">Built-In SEO Guides</p>
          <p className="mt-1 font-display text-2xl font-bold tabular-nums text-[#ffb84d]">{EDITORIAL_ARTICLES.length}</p>
        </div>
      </div>

      {dbWarning && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-200">
          {dbWarning}
        </div>
      )}

      {/* CMS Posts Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0d11]/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="border-b border-white/10 px-5 py-3.5">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-300">
            Database Articles (D1 CMS)
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                <th className="px-5 py-3.5">Title &amp; Slug</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Read Time</th>
                <th className="px-5 py-3.5">Published Date</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="mx-auto flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-zinc-500">
                      <FileText className="size-5" />
                    </div>
                    <p className="mt-3 font-medium text-zinc-300">No custom CMS articles created yet</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Your public blog is currently displaying {EDITORIAL_ARTICLES.length} flagship SEO articles. Click &ldquo;New Article&rdquo; to publish custom posts.
                    </p>
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="group transition-colors hover:bg-white/[0.03]">
                    <td className="max-w-md px-5 py-3.5">
                      <div className="flex flex-col">
                        <span className="truncate font-medium text-white transition-colors group-hover:text-[#ffb84d]">
                          {post.title}
                        </span>
                        <span className="font-mono text-[11px] text-zinc-500">
                          /blog/{post.slug}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          post.status === "published"
                            ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                            : "border border-amber-500/30 bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            post.status === "published" ? "bg-emerald-400" : "bg-amber-400"
                          }`}
                        />
                        {post.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-xs text-zinc-400">
                      {estimateReadingMinutes(post.content)} min
                    </td>
                    <td className="px-5 py-3.5 text-xs text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-zinc-500" />
                        {post.publishedAt ? post.publishedAt.slice(0, 10) : "Draft"}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {post.slug && (
                          <a
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Preview Public URL"
                            className="flex size-7 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-zinc-400 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
                          >
                            <ExternalLink size={13} />
                          </a>
                        )}
                        <Link
                          href={`/admin/cms/posts/${post.id}/edit`}
                          title="Edit Article"
                          className="flex size-7 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-zinc-400 transition-colors hover:border-[#ff9f1c]/30 hover:bg-[#ff9f1c]/10 hover:text-[#ffb84d]"
                        >
                          <Pencil size={13} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Evergreen Built-in SEO Articles Reference */}
      <div className="rounded-2xl border border-white/10 bg-[#0c0d11]/60 p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BookOpen className="size-4 text-[#ffb84d]" />
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-300">
              Active Built-In Editorial SEO Guides ({EDITORIAL_ARTICLES.length})
            </h2>
          </div>
          <span className="text-[11px] text-zinc-500">
            Create a CMS post with the same slug to override any guide.
          </span>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {EDITORIAL_ARTICLES.map((art) => (
            <a
              key={art.slug}
              href={`/blog/${art.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-xs transition-colors hover:border-[#ff9f1c]/40"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-zinc-200">{art.title}</p>
                <p className="mt-0.5 font-mono text-[10px] text-zinc-500">/blog/{art.slug}</p>
              </div>
              <ExternalLink className="size-3.5 shrink-0 text-zinc-400" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
