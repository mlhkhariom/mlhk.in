"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Loader2, Sparkles, Search } from "lucide-react";
import dynamic from "next/dynamic";
import { BLOG_COVER_PRESETS } from "@/lib/blog-articles";

const RichEditor = dynamic(() => import("@/components/admin/RichEditor"), { ssr: false });

export default function NewPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "/images/showcase/studio-hub.jpg",
    status: "published",
  });
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error((d as { error?: string })?.error || "Failed to create post");
      }
      router.push("/admin/cms/posts");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error saving post");
      setSaving(false);
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
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0c0d11]/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:p-8">
        <div className="flex items-center gap-2.5 border-b border-white/10 pb-5">
          <span className="flex size-8 items-center justify-center rounded-xl border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 text-[#ffb84d]">
            <Sparkles size={16} />
          </span>
          <div>
            <h1 className="font-display text-xl font-bold text-white">Create New SEO Article</h1>
            <p className="text-xs text-zinc-400">
              Publish directly to Cloudflare D1 with auto sitemap, RSS feed, and IndexNow ping.
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
            {error}
          </div>
        )}

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
                onChange={(e) => {
                  const val = e.target.value;
                  set("title", val);
                  if (!slugTouched) {
                    set(
                      "slug",
                      val
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[^a-z0-9-]/g, "")
                        .replace(/-+/g, "-")
                        .replace(/^-|-$/g, ""),
                    );
                  }
                }}
                placeholder="e.g. Best Local SEO Strategy for Indian Businesses in 2026"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-[#ff9f1c] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-zinc-300">
                URL Slug <span className="text-[#ff9f1c]">*</span>
              </label>
              <input
                required
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  set("slug", e.target.value);
                }}
                placeholder="local-seo-strategy-indian-businesses-2026"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 font-mono text-xs text-white placeholder-zinc-500 focus:border-[#ff9f1c] focus:outline-none"
              />
            </div>
          </div>

          {/* Cover Image URL + Verified Studio Presets */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-zinc-300">
              Cover Image URL (Use verified static CDN presets or your own URL)
            </label>
            <input
              value={form.coverImage}
              onChange={(e) => set("coverImage", e.target.value)}
              placeholder="/images/showcase/studio-hub.jpg"
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-[#ff9f1c] focus:outline-none"
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
              <span>SEO Excerpt / Meta Description</span>
              <span className="font-mono text-[10px] text-zinc-500">{form.excerpt.length}/160 chars</span>
            </label>
            <textarea
              rows={2}
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              placeholder="Write a 120–160 character summary for Google Search snippets and blog cards..."
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-[#ff9f1c] focus:outline-none"
            />
          </div>

          {/* Live Google SERP Preview */}
          <div className="rounded-xl border border-white/10 bg-[#07080a] p-4">
            <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              <Search size={11} className="text-[#ffb84d]" /> Live Google Search Snippet Preview
            </p>
            <p className="mt-2 truncate font-mono text-[11px] text-emerald-400">
              https://mlhk.in/blog/{form.slug || "your-article-slug"}
            </p>
            <p className="mt-0.5 truncate text-sm font-semibold text-blue-400">
              {form.title || "Your SEO Article Title"} | MLHK Infotech
            </p>
            <p className="mt-1 line-clamp-2 text-xs text-zinc-400">
              {form.excerpt || "Your meta description summary will appear here in Google Search results..."}
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
                <option value="published" className="bg-[#121318] text-white">Published (Live)</option>
                <option value="draft" className="bg-[#121318] text-white">Draft (Unlisted)</option>
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
                  <Check size={14} strokeWidth={2.5} /> Save &amp; Publish
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
