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
  AlertCircle,
} from "lucide-react";

type MediaItem = {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  createdAt?: string;
};

const BUILTIN_SHOWCASE_ASSETS = [
  { name: "MLHK Studio Hub", url: "/images/showcase/studio-hub.jpg", category: "Brand" },
  { name: "ERP Dashboard Showcase", url: "/images/showcase/erp-dashboard.jpg", category: "ERP" },
  { name: "Mobile App Engineering", url: "/images/showcase/mobile-app.jpg", category: "Mobile" },
  { name: "SEO & Growth Analytics", url: "/images/showcase/seo-growth.jpg", category: "SEO" },
  { name: "Case Study — AI Laptop", url: "/images/showcase/case-ailaptop.jpg", category: "Portfolio" },
  { name: "Case Study — IKSC Bridge", url: "/images/showcase/case-iksc.jpg", category: "Portfolio" },
  { name: "Case Study — Erotix Brand", url: "/images/showcase/case-erotix.jpg", category: "Portfolio" },
];

export default function MediaPage() {
  const [tab, setTab] = useState<"r2" | "builtin">("r2");
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "image" | "docs">("all");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    try {
      const res = await fetch("/api/admin/media", { cache: "no-store" });
      const d = await res.json();
      setItems(Array.isArray(d) ? (d as MediaItem[]) : []);
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
    setErrorMessage(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/media", { method: "POST", body: fd });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        setErrorMessage(err?.error || "Upload failed");
      }
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : "Upload error");
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
    setDeletingId(item.id);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/admin/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, url: item.url }),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        setErrorMessage(err?.error || "Failed to delete asset");
      } else {
        setConfirmDeleteId(null);
        load();
      }
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : "Delete error");
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
    return items.filter((i) => {
      if (typeFilter === "image" && !i.type?.startsWith("image")) return false;
      if (typeFilter === "docs" && i.type?.startsWith("image")) return false;
      if (!searchQuery.trim()) return true;
      return i.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [items, searchQuery, typeFilter]);

  const filteredBuiltIn = useMemo(() => {
    if (!searchQuery.trim()) return BUILTIN_SHOWCASE_ASSETS;
    const q = searchQuery.toLowerCase();
    return BUILTIN_SHOWCASE_ASSETS.filter(
      (a) => a.name.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  function formatBytes(bytes: number) {
    if (!bytes || bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
            CMS · Asset Storage
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-white">
            Media Library
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Upload images &amp; documents to R2 storage or copy verified local showcase asset URLs.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#ff9f1c] px-4 text-xs font-semibold text-[#07080a] hover:bg-[#ffb043] disabled:opacity-60"
          >
            {uploading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload size={14} strokeWidth={2.5} />
                <span>Upload Asset</span>
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

      {errorMessage && (
        <div
          role="alert"
          className="flex items-center justify-between gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-300"
        >
          <span className="flex items-center gap-2">
            <AlertCircle className="size-4 shrink-0" />
            {errorMessage}
          </span>
          <button type="button" onClick={() => setErrorMessage(null)} className="text-red-200 hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* Tabs + Search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex rounded-lg border border-white/10 bg-[#0d0f14] p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setTab("r2")}
            className={`rounded-md px-3 py-1.5 transition-colors ${
              tab === "r2" ? "bg-white/10 font-medium text-white" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Uploaded Media ({items.length})
          </button>
          <button
            type="button"
            onClick={() => setTab("builtin")}
            className={`rounded-md px-3 py-1.5 transition-colors ${
              tab === "builtin"
                ? "bg-white/10 font-medium text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Built-In Showcase ({BUILTIN_SHOWCASE_ASSETS.length})
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              aria-label="Search media"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-56 rounded-lg border border-white/10 bg-[#0d0f14] pl-8.5 pr-3 text-xs text-white placeholder-zinc-500 outline-none focus:border-[#ff9f1c]/60"
            />
          </div>
          {tab === "r2" && (
            <select
              aria-label="Filter file type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
              className="h-9 rounded-lg border border-white/10 bg-[#0d0f14] px-2.5 text-xs text-white outline-none focus:border-[#ff9f1c]"
            >
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="docs">Video / PDF</option>
            </select>
          )}
        </div>
      </div>

      {tab === "r2" ? (
        <>
          {/* Upload Dropzone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-7 text-center transition-colors ${
              isDragging
                ? "border-[#ff9f1c] bg-[#ff9f1c]/10"
                : "border-white/15 bg-[#0d0f14] hover:border-[#ff9f1c]/50"
            }`}
          >
            {uploading ? (
              <Loader2 className="size-5 animate-spin text-[#ff9f1c]" />
            ) : (
              <Upload className="size-5 text-zinc-400" />
            )}
            <p className="mt-2.5 text-xs font-medium text-white">
              {uploading ? "Uploading to R2..." : "Click to upload or drag & drop files here"}
            </p>
            <p className="mt-1 text-[11px] text-zinc-500">
              PNG, JPG, WebP, SVG, MP4, or PDF (up to 15 MB)
            </p>
          </div>

          {loading ? (
            <div className="flex h-44 items-center justify-center rounded-xl border border-white/10 bg-[#0d0f14]">
              <Loader2 className="size-6 animate-spin text-[#ff9f1c]" />
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-12 text-center">
              <ImageIcon className="mx-auto size-8 text-zinc-600" />
              <p className="mt-3 text-sm font-medium text-zinc-300">No uploaded files yet</p>
              <p className="mt-1 text-xs text-zinc-500">
                Upload new media above or switch to &ldquo;Built-In Showcase&rdquo; for ready-to-use brand assets.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filteredItems.map((item) => {
                const isImg = item.type?.startsWith("image");
                const isVid = item.type?.startsWith("video");
                const isPdf = item.type?.includes("pdf");
                const isCopied = copiedUrl === item.url;

                return (
                  <div
                    key={item.id}
                    className="group overflow-hidden rounded-xl border border-white/10 bg-[#0d0f14] transition-colors hover:border-white/25"
                  >
                    <div className="relative aspect-square w-full overflow-hidden bg-[#07080a]">
                      {isImg ? (
                        <img
                          src={item.url}
                          alt={item.name}
                          className="size-full object-cover"
                        />
                      ) : (
                        <div className="flex size-full flex-col items-center justify-center gap-1.5 text-zinc-500">
                          {isVid ? (
                            <Video className="size-7 text-[#ff9f1c]" />
                          ) : isPdf ? (
                            <FileText className="size-7 text-rose-400" />
                          ) : (
                            <File className="size-7" />
                          )}
                          <span className="font-mono text-[10px] uppercase">
                            {item.type?.split("/")[1] ?? "FILE"}
                          </span>
                        </div>
                      )}

                      <div
                        className={`absolute inset-0 flex items-center justify-center gap-1.5 bg-black/75 transition-opacity ${
                          confirmDeleteId === item.id
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        {confirmDeleteId === item.id ? (
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => del(item)}
                              disabled={deletingId === item.id}
                              className="rounded-md bg-red-500 px-2.5 py-1 text-[11px] font-semibold text-white"
                            >
                              {deletingId === item.id ? "..." : "Delete"}
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(null)}
                              className="rounded-md border border-white/20 px-2 py-1 text-[11px] text-zinc-200"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => copy(item.url)}
                              title="Copy URL"
                              className="flex size-8 items-center justify-center rounded-lg border border-white/15 bg-black/60 text-white hover:border-[#ff9f1c] hover:text-[#ff9f1c]"
                            >
                              {isCopied ? <Check size={14} /> : <Copy size={14} />}
                            </button>
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Open"
                              className="flex size-8 items-center justify-center rounded-lg border border-white/15 bg-black/60 text-white hover:border-white/40"
                            >
                              <ExternalLink size={14} />
                            </a>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(item.id)}
                              title="Delete"
                              className="flex size-8 items-center justify-center rounded-lg border border-white/15 bg-black/60 text-rose-400 hover:border-rose-400"
                            >
                              <Trash2 size={14} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="p-2.5">
                      <p className="truncate text-xs font-medium text-white">{item.name}</p>
                      <p className="mt-0.5 font-mono text-[10px] text-zinc-500">
                        {formatBytes(item.size)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBuiltIn.map((asset) => {
            const isCopied = copiedUrl === asset.url;
            return (
              <div
                key={asset.url}
                className="overflow-hidden rounded-xl border border-white/10 bg-[#0d0f14]"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#07080a]">
                  <img
                    src={asset.url}
                    alt={asset.name}
                    className="size-full object-cover"
                  />
                </div>
                <div className="p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-xs font-semibold text-white">{asset.name}</p>
                    <span className="font-mono text-[10px] uppercase text-zinc-500">
                      {asset.category}
                    </span>
                  </div>
                  <p className="mt-1 truncate font-mono text-[10px] text-zinc-500">{asset.url}</p>
                  <button
                    type="button"
                    onClick={() => copy(asset.url)}
                    className="mt-3 inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-lg border border-white/10 text-xs font-medium text-zinc-200 hover:border-[#ff9f1c]/50 hover:text-[#ff9f1c]"
                  >
                    {isCopied ? <Check size={13} /> : <Copy size={13} />}
                    <span>{isCopied ? "Path Copied" : "Copy Asset Path"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
