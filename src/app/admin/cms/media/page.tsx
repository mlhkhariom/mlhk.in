"use client";
import { useEffect, useState, useRef } from "react";
import { Upload, Trash2, Copy } from "lucide-react";

type MediaItem = { id: string; name: string; url: string; type: string; size: number };

export default function MediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = async () => { const d = await fetch("/api/admin/media").then(r => r.json()); setItems(d as MediaItem[]); };
  useEffect(() => { load(); }, []);

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    await fetch("/api/admin/media", { method: "POST", body: fd });
    setUploading(false);
    load();
  }

  async function del(item: MediaItem) {
    if (!confirm(`Delete "${item.name}"?`)) return;
    await fetch("/api/admin/media", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: item.id, url: item.url }) });
    load();
  }

  function copy(url: string) {
    navigator.clipboard.writeText(url);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
        <button onClick={() => inputRef.current?.click()} disabled={uploading}
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-60">
          <Upload size={16} /> {uploading ? "Uploading..." : "Upload File"}
        </button>
        <input ref={inputRef} type="file" accept="image/*,video/*,.pdf" className="hidden" onChange={upload} />
      </div>

      {items.length === 0 ? (
        <div className="border-2 border-dashed rounded-2xl p-16 text-center text-gray-400">
          <Upload size={32} className="mx-auto mb-3 opacity-40" />
          <p>No files uploaded yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {items.map(item => (
            <div key={item.id} className="border rounded-xl overflow-hidden group relative bg-gray-50">
              {item.type?.startsWith("image") ? (
                <img src={item.url} alt={item.name} className="w-full h-28 object-cover" onError={e => (e.currentTarget.style.display = "none")} />
              ) : (
                <div className="w-full h-28 flex items-center justify-center text-gray-400 text-xs font-mono">{item.type?.split("/")[1] ?? "file"}</div>
              )}
              <div className="p-2">
                <p className="text-xs text-gray-700 truncate">{item.name}</p>
                <p className="text-xs text-gray-400">{item.size ? `${(item.size / 1024).toFixed(1)} KB` : ""}</p>
              </div>
              <div className="absolute top-1 right-1 hidden group-hover:flex gap-1">
                <button onClick={() => copy(item.url)} className="bg-white rounded p-1 shadow text-blue-600 hover:text-blue-800"><Copy size={12} /></button>
                <button onClick={() => del(item)} className="bg-white rounded p-1 shadow text-red-500 hover:text-red-700"><Trash2 size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
