"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2, ExternalLink, Check, Loader2, Sparkles, Search } from "lucide-react";
import dynamic from "next/dynamic";
import { BLOG_COVER_PRESETS } from "@/lib/blog-articles";

const RichEditor = dynamic(() => import("@/components/admin/RichEditor"), { ssr: false });

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [id, setId] = useState("");
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    status: "draft",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    params.then((p) => {
      setId(p.id);
      fetch(`/api/admin/posts/${p.id}`, { cache: "no-store" })
        .then(async (r) => {
          if (!r.ok) {
            const errBody = (await r.json().catch(() => ({}))) as { error?: string };
            throw new Error(errBody.error || "Failed to load article");
          }
          return r.json();
        })
        .then((d: unknown) => {
          if (d && typeof d === "object") {
            const rec = d as Record<string, unknown>;
            setForm({
              title: typeof rec.title === "string" ? rec.title : "",
              slug: typeof rec.slug === "string" ? rec.slug : "",
              excerpt: typeof rec.excerpt === "string" ? rec.excerpt : "",
              content: typeof rec.content === "string" ? rec.content : "",
              coverImage: typeof rec.coverImage === "string" ? rec.coverImage : "",
              status: rec.status === "published" ? "published" : "draft",
            });
          }
        })
        .catch((err) => setError(err instanceof Error ? err.message : "Unable to load article"))
        .finally(() => setLoading(false));
    });
  }, [params]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setStatusMessage(null);
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error((d as { error?: string })?.error || "Failed to update article");
      }
      setStatusMessage("Article saved & revalidated on live site!");
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error saving article");
    } finally {
      setSaving(false);
    }
  }

  async function del() {
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error((d as { error?: string })?.error || "Failed to delete article");
      }
      router.push("/admin/cms/posts");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete article");
      setConfirmDelete(false);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/cms/posts"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft size={14} /> Back to Articles
        </Link>
        <div className="flex items-center gap-3">
          {form.slug && (
            <a
              href={`/blog/${form.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-white/20 hover:text-white"
            >
              <ExternalLink size={13} /> View Live
            </a>
          )}
          {confirmDelete ? (
            <div className="inline-flex items-center gap-2">
              <button
                type="button"
                onClick={del}
                disabled={deleting}
                className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/40 bg-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-200 hover:bg-red-500/30 disabled:opacity-50"
              >
                {deleting ? <Loader2 size={13} className="animate-spin" /> : "Confirm Delete"}
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="inline-flex items-center rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              disabled={deleting}
              className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20 disabled:opacity-50"
            >
              <Trash2 size={13} /> Delete
            </button>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0c0d11]/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:p-8">
        <div className="flex items-center gap-2.5 border-b border-white/10 pb-5">
          <span className="flex size-8 items-center justify-center rounded-xl border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 text-[#ffb84d]">
            <Sparkles size={16} />
          </span>
          <div>
            <h1 className="font-display text-xl font-bold text-white">Edit Article</h1>
            <p className="text-xs text-zinc-400">
              Update post content, SEO meta description, cover artwork, and publication status.
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
            {error}
          </div>
        )}

        {statusMessage && (
          <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300">
            {statusMessage}
          </div>
        )}

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="size-6 animate-spin text-[#ff9f1c]" />
          </div>
        ) : (
          <form onSubmit={save} className="mt-6 space-y-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-1.5 flex items-center justify-between text-xs font-semibold text-zinc-300">
                  <span>Title <span className="text-[#ff9f1c]">*</span></span>
                  <span className="font-mono text-[10px] text-zinc-500">{form.title.length}/65 chars</span>
                </label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white focus:border-[#ff9f1c] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-zinc-300">
                  Slug <span className="text-[#ff9f1c]">*</span>
                </label>
                <input
                  required
                  value={form.slug}
                  onChange={(e) => set("slug", e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 font-mono text-xs text-white focus:border-[#ff9f1c] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-zinc-300">
                Cover Image URL
              </label>
              <input
                value={form.coverImage}
                onChange={(e) => set("coverImage", e.target.value)}
                placeholder="/images/showcase/studio-hub.jpg"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white focus:border-[#ff9f1c] focus:outline-none"
              />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {BLOG_COVER_PRESETS.map((preset) => (
                  <button
                    key={preset.src}
                    type="button"
                    onClick={() => set("coverImage", preset.src)}
                    className={`rounded-lg border px-2.5 py-1 text-[11px] transition-colors ${
                      form.coverImage === preset.src
                        ? "border-[#ff9f1c] bg-[#ff9f1c]/15 text-[#ffb84d]"
                        : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 flex items-center justify-between text-xs font-semibold text-zinc-300">
                <span>Short Excerpt / Meta Description</span>
                <span className="font-mono text-[10px] text-zinc-500">{form.excerpt.length}/160 chars</span>
              </label>
              <textarea
                rows={2}
                value={form.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white focus:border-[#ff9f1c] focus:outline-none"
              />
            </div>

            <div className="rounded-xl border border-white/10 bg-[#07080a] p-4">
              <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                <Search size={11} className="text-[#ffb84d]" /> Live Google Search Snippet Preview
              </p>
              <p className="mt-2 truncate font-mono text-[11px] text-emerald-400">
                https://mlhk.in/blog/{form.slug || "slug"}
              </p>
              <p className="mt-0.5 truncate text-sm font-semibold text-blue-400">
                {form.title || "Article Title"} | MLHK Infotech
              </p>
              <p className="mt-1 line-clamp-2 text-xs text-zinc-400">
                {form.excerpt || "Summary description shown in search results..."}
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-zinc-300">
                Article Content
              </label>
              <RichEditor
                value={form.content}
                onChange={(v) => set("content", v)}
                placeholder="Write the full body of the article here..."
              />
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-5">
              <div className="flex items-center gap-3">
                <label className="text-xs font-semibold text-zinc-400">Publication Status:</label>
                <select
                  value={form.status}
                  onChange={(e) => set("status", e.target.value)}
                  className="rounded-xl border border-white/10 bg-[#121318] px-3 py-1.5 text-xs text-white focus:border-[#ff9f1c] focus:outline-none"
                >
                  <option value="draft" className="bg-[#121318] text-white">Draft (Unlisted)</option>
                  <option value="published" className="bg-[#121318] text-white">Published (Live)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={saving || !form.title.trim() || !form.slug.trim()}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#ff9f1c] px-6 py-2.5 text-xs font-semibold text-black shadow-[0_0_24px_rgba(255,159,28,0.25)] transition-all hover:bg-[#ffb84d] disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Check size={14} strokeWidth={2.5} /> Update Article
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
