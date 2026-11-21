"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Save,
  Loader2,
  Check,
  MenuSquare,
  AlertCircle,
} from "lucide-react";

type MenuItem = { label: string; href: string; target?: string };
type MenuData = { location: string; items: MenuItem[] | string };

const LOCATIONS = [
  { key: "header", label: "Header Navigation" },
  { key: "footer", label: "Footer Links" },
  { key: "mobile", label: "Mobile Menu" },
];

export default function MenusPage() {
  const [menus, setMenus] = useState<Record<string, MenuItem[]>>({
    header: [],
    footer: [],
    mobile: [],
  });
  const [active, setActive] = useState("header");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/menus", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : []))
      .then((data: unknown) => {
        const list = Array.isArray(data) ? (data as MenuData[]) : [];
        const m: Record<string, MenuItem[]> = { header: [], footer: [], mobile: [] };
        list.forEach((d) => {
          try {
            m[d.location] = typeof d.items === "string" ? JSON.parse(d.items) : d.items;
          } catch {}
        });
        setMenus(m);
      })
      .catch(() => {});
  }, []);

  const items = menus[active] ?? [];

  function addItem() {
    setMenus((m) => ({
      ...m,
      [active]: [...(m[active] ?? []), { label: "New Link", href: "/", target: "_self" }],
    }));
  }

  function updateItem(i: number, key: keyof MenuItem, val: string) {
    setMenus((m) => {
      const arr = [...(m[active] ?? [])];
      arr[i] = { ...arr[i], [key]: val };
      return { ...m, [active]: arr };
    });
  }

  function moveItem(i: number, dir: -1 | 1) {
    setMenus((m) => {
      const arr = [...(m[active] ?? [])];
      const targetIdx = i + dir;
      if (targetIdx < 0 || targetIdx >= arr.length) return m;
      const [moved] = arr.splice(i, 1);
      arr.splice(targetIdx, 0, moved);
      return { ...m, [active]: arr };
    });
  }

  function removeItem(i: number) {
    setMenus((m) => ({
      ...m,
      [active]: (m[active] ?? []).filter((_, idx) => idx !== i),
    }));
  }

  async function save() {
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/menus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location: active, items }),
      });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(d.error || "Failed to save navigation menu");
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save menu");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
            CMS · Site Architecture
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-white">
            Navigation Menus
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Configure and reorder public header, footer, and mobile menu links safely.
          </p>
        </div>

        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#ff9f1c] px-4 text-xs font-semibold text-[#07080a] hover:bg-[#ffb043] disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              <span>Saving...</span>
            </>
          ) : saved ? (
            <>
              <Check size={14} strokeWidth={2.5} />
              <span>Saved</span>
            </>
          ) : (
            <>
              <Save size={14} strokeWidth={2.5} />
              <span>Save Menu</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-300"
        >
          <AlertCircle className="size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Location Tabs */}
      <div className="flex gap-1 rounded-xl border border-white/10 bg-[#0d0f14] p-1">
        {LOCATIONS.map((l) => (
          <button
            key={l.key}
            type="button"
            onClick={() => {
              setActive(l.key);
              setError(null);
            }}
            className={`flex-1 rounded-lg px-4 py-2 text-xs font-medium transition-colors ${
              active === l.key
                ? "bg-white/10 font-semibold text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {l.label} ({(menus[l.key] ?? []).length})
          </button>
        ))}
      </div>

      {/* Menu Links List */}
      <div className="space-y-2.5">
        {items.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-12 text-center">
            <MenuSquare className="mx-auto size-7 text-zinc-600" />
            <p className="mt-3 text-sm font-medium text-zinc-300">No links in this menu yet</p>
            <p className="mt-1 text-xs text-zinc-500">
              Add links below and click &ldquo;Save Menu&rdquo; to persist to D1.
            </p>
          </div>
        ) : (
          items.map((item, i) => (
            <div
              key={i}
              className="flex flex-wrap items-center gap-2.5 rounded-xl border border-white/10 bg-[#0d0f14] p-3"
            >
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveItem(i, -1)}
                  disabled={i === 0}
                  aria-label="Move link up"
                  className="flex size-7 items-center justify-center rounded-md border border-white/10 text-zinc-400 hover:border-white/25 hover:text-white disabled:opacity-30"
                >
                  <ArrowUp size={12} />
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(i, 1)}
                  disabled={i === items.length - 1}
                  aria-label="Move link down"
                  className="flex size-7 items-center justify-center rounded-md border border-white/10 text-zinc-400 hover:border-white/25 hover:text-white disabled:opacity-30"
                >
                  <ArrowDown size={12} />
                </button>
              </div>

              <input
                aria-label="Link label"
                value={item.label}
                onChange={(e) => updateItem(i, "label", e.target.value)}
                placeholder="Link Label"
                className="w-40 rounded-lg border border-white/10 bg-[#07080a] px-3 py-1.5 text-xs text-white outline-none focus:border-[#ff9f1c]"
              />
              <input
                aria-label="Link URL"
                value={item.href}
                onChange={(e) => updateItem(i, "href", e.target.value)}
                placeholder="/services or https://mlhk.in"
                className="min-w-[180px] flex-1 rounded-lg border border-white/10 bg-[#07080a] px-3 py-1.5 font-mono text-xs text-white outline-none focus:border-[#ff9f1c]"
              />
              <select
                aria-label="Link target"
                value={item.target ?? "_self"}
                onChange={(e) => updateItem(i, "target", e.target.value)}
                className="rounded-lg border border-white/10 bg-[#07080a] px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#ff9f1c]"
              >
                <option value="_self">Same tab</option>
                <option value="_blank">New tab</option>
              </select>
              <button
                type="button"
                onClick={() => removeItem(i)}
                aria-label="Remove link"
                className="flex size-7 items-center justify-center rounded-md border border-white/10 text-zinc-400 hover:border-red-500/40 hover:text-red-400"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))
        )}
      </div>

      <button
        type="button"
        onClick={addItem}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-[#0d0f14] px-4 text-xs font-medium text-zinc-200 hover:border-[#ff9f1c]/50 hover:text-[#ff9f1c]"
      >
        <Plus size={14} />
        <span>Add Navigation Link</span>
      </button>
    </div>
  );
}
