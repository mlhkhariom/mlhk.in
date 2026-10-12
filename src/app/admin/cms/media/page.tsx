"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import {
  Upload,
  Trash2,
  Copy,
  Check,
  Search,
  FileText,
  Video,
  File,
  Image as ImageIcon,
  Loader2,
  ExternalLink,
} from "lucide-react";

type MediaItem = {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  createdAt?: string;
};

export default function MediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    try {
      const res = await fetch("/api/admin/media");
      const d = await res.json();
      setItems(Array.isArray(d) ? d : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  async function handleFileUpload(file: File) {
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/media", { method: "POST", body: fd });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert((err as { error?: string })?.error || "Upload failed");
      }
    } catch (e) {
      alert(e instanceof Error ? e.message : "Upload error");
    } finally {
      setUploading(false);
      load();
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  }

  async function del(item: MediaItem) {
    if (!confirm(`Are you sure you want to delete "${item.name}"?`)) return;
    setDeletingId(item.id);
    try {
      await fetch("/api/admin/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, url: item.url }),
      });
      load();
    } finally {
      setDeletingId(null);
    }
  }

  function copy(url: string) {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => {
      setCopiedUrl((curr) => (curr === url ? null : curr));
    }, 2000);
  }

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter((i) => i.name.toLowerCase().includes(q));
  }, [items, searchQuery]);

  function formatBytes(bytes: number) {
    if (!bytes || bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white">
            Media Library
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Secure asset storage powered by Cloudflare R2 bucket.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#ff9f1c] px-4 text-xs font-semibold text-black shadow-[0_0_24px_rgba(255,159,28,0.25)] transition-all hover:bg-[#ffb84d] disabled:opacity-60"
          >
            {uploading ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <Upload size={14} strokeWidth={2.5} /> Upload Asset
              </>
            )}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*,video/*,.pdf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file);
            }}
          />
        </div>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
          isDragging
            ? "border-[#ff9f1c] bg-[#ff9f1c]/10"
            : "border-white/10 bg-white/[0.02] hover:border-[#ff9f1c]/40 hover:bg-white/[0.04]"
        }`}
      >
        <div className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-zinc-400 transition-transform group-hover:scale-105 group-hover:text-[#ffb84d]">
          {uploading ? (
            <Loader2 className="size-6 animate-spin text-[#ff9f1c]" />
          ) : (
            <Upload className="size-6" />
          )}
        </div>
        <p className="mt-3 text-xs font-semibold text-white">
          {uploading
            ? "Streaming asset to Cloudflare R2..."
            : "Click to upload or drag & drop files here"}
        </p>
        <p className="mt-1 text-[11px] text-zinc-500">
          Supports PNG, JPG, WebP, SVG, MP4, and PDF (Up to 15MB)
        </p>
      </div>

      {/* Filter and stats bar */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search media files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-64 rounded-xl border border-white/10 bg-white/[0.03] pl-9 pr-3 text-xs text-white placeholder-zinc-500 transition-colors focus:border-[#ff9f1c] focus:outline-none focus:ring-1 focus:ring-[#ff9f1c]"
          />
        </div>
        <span className="text-xs text-zinc-400">
          Showing {filteredItems.length} of {items.length} files
        </span>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 className="size-6 animate-spin text-[#ff9f1c]" />
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#0c0d11] p-12 text-center text-zinc-400">
          <ImageIcon className="mx-auto size-10 opacity-30" />
          <p className="mt-3 text-sm font-medium text-zinc-300">
            {searchQuery ? "No files matched your search" : "No media files uploaded yet"}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Uploaded images and assets will be served directly from the edge.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filteredItems.map((item) => {
            const isImg = item.type?.startsWith("image");
            const isVid = item.type?.startsWith("video");
            const isPdf = item.type?.includes("pdf");
            const isCopied = copiedUrl === item.url;

            return (
              <div
                key={item.id}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0c0d11] transition-all hover:border-[#ff9f1c]/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                {/* Media Preview Box */}
                <div className="relative aspect-square w-full overflow-hidden bg-black/40">
                  {isImg ? (
                    <img
                      src={item.url}
                      alt={item.name}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex size-full flex-col items-center justify-center gap-2 text-zinc-500">
                      {isVid ? (
                        <Video className="size-8 text-[#ff9f1c]/60" />
                      ) : isPdf ? (
                        <FileText className="size-8 text-red-400/60" />
                      ) : (
                        <File className="size-8" />
                      )}
                      <span className="font-mono text-[10px] uppercase text-zinc-400">
                        {item.type?.split("/")[1] ?? "FILE"}
                      </span>
                    </div>
                  )}

                  {/* Hover Quick Actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-1.5 bg-black/60 opacity-0 backdrop-blur-xs transition-opacity group-hover:opacity-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copy(item.url);
                      }}
                      title="Copy Public URL"
                      className="flex size-8 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white transition-all hover:bg-[#ff9f1c] hover:text-black"
                    >
                      {isCopied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open full size"
                      className="flex size-8 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white transition-all hover:bg-white/20"
                    >
                      <ExternalLink size={14} />
                    </a>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        del(item);
                      }}
                      disabled={deletingId === item.id}
                      title="Delete asset"
                      className="flex size-8 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-red-400 transition-all hover:bg-red-500 hover:text-white disabled:opacity-50"
                    >
                      {deletingId === item.id ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Trash2 size={14} />
                      )}
                    </button>
                  </div>

                  {/* Copied Pill Overlay */}
                  {isCopied && (
                    <div className="absolute top-2 left-2 rounded-md bg-[#ff9f1c] px-2 py-0.5 text-[10px] font-bold text-black shadow-md">
                      Copied!
                    </div>
                  )}
                </div>

                {/* Metadata */}
                <div className="p-2.5">
                  <p className="truncate text-xs font-medium text-white" title={item.name}>
                    {item.name}
                  </p>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-zinc-500">
                    <span>{formatBytes(item.size)}</span>
                    <span className="font-mono text-[10px] uppercase">
                      {item.type?.split("/")[1] ?? ""}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
