"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";

const RichEditor = dynamic(() => import("@/components/admin/RichEditor"), { ssr: false });

export default function NewPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", coverImage: "", status: "draft" });
  const [saving, setSaving] = useState(false);
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  async function save() {
    setSaving(true);
    await fetch("/api/admin/posts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    router.push("/admin/cms/posts");
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/cms/posts" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"><ArrowLeft size={16} /> Posts</Link>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Post</h1>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Title *</label>
            <input value={form.title} onChange={e => { set("title", e.target.value); set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")); }}
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
          <input value={form.coverImage} onChange={e => set("coverImage", e.target.value)} placeholder="https://..."
            className="border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600 block mb-1">Excerpt</label>
          <input value={form.excerpt} onChange={e => set("excerpt", e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600 block mb-1">Content</label>
          <RichEditor value={form.content} onChange={v => set("content", v)} placeholder="Write your post content here..." />
        </div>
        <div className="flex items-center gap-4 pt-2">
          <select value={form.status} onChange={e => set("status", e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <button onClick={save} disabled={saving || !form.title || !form.slug}
            className="bg-blue-600 text-white text-sm px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
            {saving ? "Saving..." : "Save Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
