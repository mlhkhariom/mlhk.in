"use client";
import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Result = { id: string; title: string; module: string; href: string; type: string | null };

export default function AdminSearch() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (q.length < 2) { setResults([]); return; }
    const t = setTimeout(() => {
      fetch(`/api/admin/search?q=${encodeURIComponent(q)}`).then(r => r.json()).then((d: unknown) => { setResults(d as Result[]); setOpen(true); });
    }, 300);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    function handler(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const moduleColor: Record<string, string> = {
    Blog: "bg-blue-50 text-blue-600", Lead: "bg-green-50 text-green-600",
    Client: "bg-purple-50 text-purple-600", Project: "bg-orange-50 text-orange-600",
    Pages: "bg-gray-100 text-gray-600", Service: "bg-pink-50 text-pink-600", Portfolio: "bg-yellow-50 text-yellow-600",
  };

  return (
    <div ref={ref} className="relative w-72">
      <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
        <Search size={15} className="text-gray-400 shrink-0" />
        <input value={q} onChange={e => setQ(e.target.value)} onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Search everything..." className="bg-transparent text-sm w-full focus:outline-none text-gray-700 placeholder-gray-400" />
      </div>
      {open && results.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-white border rounded-xl shadow-lg z-50 overflow-hidden">
          {results.map(r => (
            <Link key={`${r.module}-${r.id}`} href={r.href} onClick={() => { setOpen(false); setQ(""); }}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors">
              <span className={`text-xs px-2 py-0.5 rounded font-medium shrink-0 ${moduleColor[r.module] ?? "bg-gray-100 text-gray-600"}`}>{r.module}</span>
              <span className="text-sm text-gray-800 truncate">{r.title}</span>
            </Link>
          ))}
        </div>
      )}
      {open && q.length >= 2 && results.length === 0 && (
        <div className="absolute top-full mt-1 w-full bg-white border rounded-xl shadow-lg z-50 px-4 py-3 text-sm text-gray-400">No results found</div>
      )}
    </div>
  );
}
