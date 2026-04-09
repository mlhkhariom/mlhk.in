"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2, ExternalLink } from "lucide-react";
import dynamic from "next/dynamic";

const RichEditor = dynamic(() => import("@/components/admin/RichEditor"), { ssr: false });

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [id, setId] = useState("");
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", coverImage: "", status: "draft" });
  const [saving, setSaving] = useState(false);
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    params.then(p => {
      setId(p.id);
      fetch(`/api/admin/posts/${p.id}`).then(r => r.json()).then((d: unknown) => setForm(d as typeof form));
    });
  }, []);

  async function save() {
    setSaving(true);
    await fetch(`/api/admin/posts/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false);
  }

  async function del() {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    router.push("/admin/cms/posts");
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <Link href="/admin/cms/posts" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"><ArrowLeft size={16} /> Posts</Link>
        <div className="flex gap-3">
          {form.slug && <a href={`/blog/${form.slug}`} target="_blank" className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1"><ExternalLink size={14} /> Preview</a>}
          <button onClick={del} className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"><Trash2 size={14} /> Delete</button>
        </div>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Post</h1>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Title *</label>
            <input value={form.title} onChange={e => set("title", e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Slug *</label>
            <input value={form.slug} onChange={e => set("slug", e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600 block mb-1">Cover Image URL</label>
          <input value={form.coverImage} onChange={e => set("coverImage", e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600 block mb-1">Excerpt</label>
          <input value={form.excerpt} onChange={e => set("excerpt", e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600 block mb-1">Content</label>
          <RichEditor value={form.content} onChange={v => set("content", v)} />
        </div>
        <div className="flex items-center gap-4 pt-2">
          <select value={form.status} onChange={e => set("status", e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <button onClick={save} disabled={saving}
            className="bg-blue-600 text-white text-sm px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
            {saving ? "Saving..." : "Update Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
