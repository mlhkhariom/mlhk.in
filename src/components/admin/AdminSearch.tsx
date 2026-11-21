"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2, X } from "lucide-react";
import Link from "next/link";

type Result = {
  id: string;
  title: string;
  subtitle?: string | null;
  module: string;
  href: string;
  type: string | null;
};

const moduleTone: Record<string, string> = {
  Lead: "text-emerald-400",
  Client: "text-sky-400",
  Project: "text-[#ff9f1c]",
  Invoice: "text-amber-300",
  Ticket: "text-rose-400",
  Expense: "text-orange-400",
  Blog: "text-indigo-400",
  Page: "text-zinc-300",
  Service: "text-cyan-400",
  Portfolio: "text-violet-400",
};

export default function AdminSearch() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const trimmed = q.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    const t = setTimeout(() => {
      fetch(`/api/admin/search?q=${encodeURIComponent(trimmed)}`, { signal: controller.signal })
        .then((r) => (r.ok ? r.json() : []))
        .then((d: unknown) => {
          setResults(Array.isArray(d) ? (d as Result[]) : []);
          setOpen(true);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }, 220);

    return () => {
      clearTimeout(t);
      controller.abort();
    };
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
    <div ref={ref} className="relative w-52 sm:w-64 lg:w-80">
      <div className="relative flex items-center">
        <Search className="pointer-events-none absolute left-3 size-3.5 text-zinc-500" />
        <input
          ref={inputRef}
          type="search"
          aria-label="Global admin search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => q.trim().length >= 2 && setOpen(true)}
          placeholder="Search leads, invoices, projects..."
          className="h-9 w-full rounded-lg border border-white/10 bg-[#0d0f14] pl-8.5 pr-14 text-xs text-white placeholder-zinc-500 outline-none transition-colors focus:border-[#ff9f1c]/60"
        />
        {q ? (
          <button
            type="button"
            onClick={() => {
              setQ("");
              setResults([]);
              setOpen(false);
            }}
            aria-label="Clear search"
            className="absolute right-2.5 text-zinc-500 hover:text-zinc-200"
          >
            <X className="size-3.5" />
          </button>
        ) : (
          <kbd className="pointer-events-none absolute right-2.5 hidden rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 sm:inline-block">
            ⌘K
          </kbd>
        )}
      </div>

      {loading && (
        <div className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2">
          <Loader2 className="size-3 animate-spin text-[#ff9f1c]" />
        </div>
      )}

      {open && results.length > 0 && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-white/10 bg-[#0d0f14] p-1.5 shadow-2xl sm:w-96">
          <div className="flex items-center justify-between px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
            <span>Matches</span>
            <span className="tabular-nums">{results.length}</span>
          </div>
          <div className="max-h-80 space-y-0.5 overflow-y-auto">
            {results.map((r) => (
              <Link
                key={`${r.module}-${r.id}`}
                href={r.href}
                onClick={() => {
                  setOpen(false);
                  setQ("");
                }}
                className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-xs transition-colors hover:bg-white/[0.06]"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-zinc-100">{r.title}</p>
                  {r.subtitle && (
                    <p className="truncate text-[11px] text-zinc-500">{r.subtitle}</p>
                  )}
                </div>
                <span
                  className={`shrink-0 font-mono text-[10px] font-semibold uppercase tracking-wider ${
                    moduleTone[r.module] ?? "text-zinc-400"
                  }`}
                >
                  {r.module}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {open && q.trim().length >= 2 && !loading && results.length === 0 && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-xl border border-white/10 bg-[#0d0f14] px-4 py-5 text-center text-xs text-zinc-500 shadow-2xl">
          No records matching &ldquo;{q}&rdquo; across CRM, ERP, or CMS.
        </div>
      )}
    </div>
  );
}
