"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Loader2, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

const RichEditor = dynamic(() => import("@/components/admin/RichEditor"), { ssr: false });

export default function NewPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    status: "draft",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.slug) return;
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error saving post");
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/cms/posts"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft size={14} /> Back to Articles
        </Link>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0c0d11]/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md md:p-8">
        <div className="flex items-center gap-2.5 border-b border-white/10 pb-5">
          <span className="flex size-8 items-center justify-center rounded-xl border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 text-[#ffb84d]">
            <Sparkles size={16} />
          </span>
          <div>
            <h1 className="font-display text-xl font-bold text-white">Create New Article</h1>
            <p className="text-xs text-zinc-400">
              Compose editorial content with rich typography and edge delivery.
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
              <label className="mb-1.5 block text-xs font-semibold text-zinc-300">
                Title <span className="text-[#ff9f1c]">*</span>
              </label>
              <input
                required
                value={form.title}
                onChange={(e) => {
                  const val = e.target.value;
                  set("title", val);
                  set(
                    "slug",
                    val
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^a-z0-9-]/g, "")
                  );
                }}
                placeholder="e.g. Architecting Scalable Cloudflare Workflows"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 transition-colors focus:border-[#ff9f1c] focus:outline-none focus:ring-1 focus:ring-[#ff9f1c]"
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
                placeholder="architecting-scalable-cloudflare-workflows"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 font-mono text-xs text-white placeholder-zinc-500 transition-colors focus:border-[#ff9f1c] focus:outline-none focus:ring-1 focus:ring-[#ff9f1c]"
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
              placeholder="https://mlhk.in/api/media/banner.webp"
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 transition-colors focus:border-[#ff9f1c] focus:outline-none focus:ring-1 focus:ring-[#ff9f1c]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-zinc-300">
              Short Excerpt / Summary
            </label>
            <textarea
              rows={2}
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              placeholder="A concise summary displayed on blog archive cards and meta tags..."
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 transition-colors focus:border-[#ff9f1c] focus:outline-none focus:ring-1 focus:ring-[#ff9f1c]"
            />
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

          {/* Form Actions */}
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
              disabled={saving || !form.title || !form.slug}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#ff9f1c] px-6 py-2.5 text-xs font-semibold text-black shadow-[0_0_24px_rgba(255,159,28,0.25)] transition-all hover:bg-[#ffb84d] disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Check size={14} strokeWidth={2.5} /> Save & Create
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
