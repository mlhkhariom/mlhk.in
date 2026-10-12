"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2, ExternalLink, Check, Loader2, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

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
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    params.then((p) => {
      setId(p.id);
      fetch(`/api/admin/posts/${p.id}`)
        .then((r) => r.json())
        .then((d: unknown) => {
          if (d && typeof d === "object") {
            setForm((prev) => ({ ...prev, ...(d as typeof form) }));
          }
        })
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
      setStatusMessage("Article saved successfully!");
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error saving article");
    } finally {
      setSaving(false);
    }
  }

  async function del() {
    if (!confirm("Are you sure you want to permanently delete this article?")) return;
    setDeleting(true);
    try {
      await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      router.push("/admin/cms/posts");
    } finally {
      setDeleting(false);
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
        <div className="flex items-center gap-3">
          {form.slug && (
            <a
              href={`/blog/${form.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
            >
              <ExternalLink size={13} /> View Live
            </a>
          )}
          <button
            type="button"
            onClick={del}
            disabled={deleting}
            className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/20 disabled:opacity-50"
          >
            {deleting ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Trash2 size={13} />
            )}{" "}
            Delete
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0c0d11]/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md md:p-8">
        <div className="flex items-center gap-2.5 border-b border-white/10 pb-5">
          <span className="flex size-8 items-center justify-center rounded-xl border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 text-[#ffb84d]">
            <Sparkles size={16} />
          </span>
          <div>
            <h1 className="font-display text-xl font-bold text-white">Edit Article</h1>
            <p className="text-xs text-zinc-400">
              Update post contents, slug routing, and publication status.
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
                <label className="mb-1.5 block text-xs font-semibold text-zinc-300">
                  Title <span className="text-[#ff9f1c]">*</span>
                </label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
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
                placeholder="https://mlhk.in/api/media/..."
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
