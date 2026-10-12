import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import Link from "next/link";
import { Plus, Pencil, ExternalLink, FileText, Calendar } from "lucide-react";

export default async function PostsPage() {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const posts = await db.select().from(blogPosts).orderBy(sql`created_at desc`).all();

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white">
            Blog Articles
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Create, publish, and curate insights for the MLHK platform.
          </p>
        </div>
        <Link
          href="/admin/cms/posts/new"
          className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#ff9f1c] px-4 text-xs font-semibold text-black shadow-[0_0_24px_rgba(255,159,28,0.25)] transition-all hover:bg-[#ffb84d] hover:shadow-[0_0_32px_rgba(255,159,28,0.35)]"
        >
          <Plus size={15} strokeWidth={2.5} /> New Article
        </Link>
      </div>

      {/* Main Table Card */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0d11]/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                <th className="px-5 py-3.5">Title</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Published Date</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-14 text-center">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-zinc-500">
                      <FileText className="size-6" />
                    </div>
                    <p className="mt-3 font-medium text-zinc-300">No blog posts found</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Get started by writing your first article.
                    </p>
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="group transition-colors hover:bg-white/[0.03]">
                    <td className="max-w-md truncate px-5 py-3.5">
                      <div className="flex flex-col">
                        <span className="font-medium text-white transition-colors group-hover:text-[#ffb84d]">
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
                    <td className="px-5 py-3.5 text-xs text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-zinc-500" />
                        {post.publishedAt ? post.publishedAt.slice(0, 10) : "Not published"}
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
    </div>
  );
}
