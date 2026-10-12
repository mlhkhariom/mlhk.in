"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2, Command } from "lucide-react";
import Link from "next/link";

type Result = {
  id: string;
  title: string;
  module: string;
  href: string;
  type: string | null;
};

const moduleColor: Record<string, string> = {
  Blog: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Lead: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Client: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Project: "bg-[#ff9f1c]/10 text-[#ffb84d] border-[#ff9f1c]/20",
  Pages: "bg-zinc-500/10 text-zinc-300 border-zinc-500/20",
  Service: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Portfolio: "bg-amber-500/10 text-amber-300 border-amber-500/20",
};

export default function AdminSearch() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut ⌘K or / to focus search
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (q.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const t = setTimeout(() => {
      fetch(`/api/admin/search?q=${encodeURIComponent(q.trim())}`)
        .then((r) => r.json())
        .then((d: unknown) => {
          setResults(d as Result[]);
          setOpen(true);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }, 250);

    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-64 md:w-80">
      <div className="relative flex items-center">
        <Search className="pointer-events-none absolute left-3.5 size-4 text-zinc-400" />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Search records, posts, leads..."
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 pl-9 pr-14 text-xs text-white placeholder-zinc-500 outline-none transition-all focus:border-[#ff9f1c]/50 focus:bg-white/[0.06] focus:ring-1 focus:ring-[#ff9f1c]/50"
        />
        <div className="pointer-events-none absolute right-2.5 flex items-center gap-1 rounded border border-white/10 bg-white/[0.05] px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">
          <Command className="size-2.5" /> K
        </div>
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d0f14]/95 p-1.5 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100">
          <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Search Matches ({results.length})
          </p>
          <div className="max-h-72 overflow-y-auto space-y-0.5">
            {results.map((r) => (
              <Link
                key={`${r.module}-${r.id}`}
                href={r.href}
                onClick={() => {
                  setOpen(false);
                  setQ("");
                }}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs transition-colors hover:bg-white/[0.06]"
              >
                <span
                  className={`rounded-md border px-1.5 py-0.5 text-[10px] font-medium shrink-0 ${
                    moduleColor[r.module] ?? "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                  }`}
                >
                  {r.module}
                </span>
                <span className="truncate text-zinc-200 hover:text-white">
                  {r.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {open && q.trim().length >= 2 && !loading && results.length === 0 && (
        <div className="absolute top-full z-50 mt-2 w-full rounded-2xl border border-white/10 bg-[#0d0f14]/95 px-4 py-4 text-center text-xs text-zinc-500 shadow-2xl backdrop-blur-xl">
          No matching records found for &quot;{q}&quot;
        </div>
      )}

      {loading && (
        <div className="absolute right-9 top-1/2 -translate-y-1/2">
          <Loader2 className="size-3 animate-spin text-[#ff9f1c]" />
        </div>
      )}
    </div>
  );
}
