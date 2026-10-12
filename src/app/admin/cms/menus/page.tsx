"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, GripVertical, Save, Loader2, Check, Sparkles } from "lucide-react";

type MenuItem = { label: string; href: string; target?: string };
type MenuData = { location: string; items: MenuItem[] };

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

  useEffect(() => {
    fetch("/api/admin/menus")
      .then((r) => r.json())
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
      [active]: [...(m[active] ?? []), { label: "New Link", href: "/" }],
    }));
  }

  function updateItem(i: number, key: keyof MenuItem, val: string) {
    setMenus((m) => {
      const arr = [...(m[active] ?? [])];
      arr[i] = { ...arr[i], [key]: val };
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
    await fetch("/api/admin/menus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ location: active, items }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white">
            Navigation Menu Editor
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Structure public header, footer, and mobile navigation links.
          </p>
        </div>

        <button
          onClick={save}
          disabled={saving}
          className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#ff9f1c] px-5 text-xs font-semibold text-black shadow-[0_0_24px_rgba(255,159,28,0.25)] transition-all hover:bg-[#ffb84d] disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 size={14} className="animate-spin" /> Saving...
            </>
          ) : saved ? (
            <>
              <Check size={14} strokeWidth={2.5} /> Saved!
            </>
          ) : (
            <>
              <Save size={14} strokeWidth={2.5} /> Save Changes
            </>
          )}
        </button>
      </div>

      {/* Location Tabs */}
      <div className="flex gap-2 rounded-2xl border border-white/10 bg-[#0c0d11]/80 p-1.5 backdrop-blur-md">
        {LOCATIONS.map((l) => (
          <button
            key={l.key}
            onClick={() => setActive(l.key)}
            className={`flex-1 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              active === l.key
                ? "bg-[#ff9f1c] text-black shadow-md"
                : "text-zinc-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Items Container */}
      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-12 text-center text-zinc-400">
            <Sparkles className="mx-auto size-8 text-zinc-600" />
            <p className="mt-3 text-xs font-medium text-zinc-300">No navigation items configured</p>
            <p className="mt-1 text-[11px] text-zinc-500">
              Click below to add links to this navigation zone.
            </p>
          </div>
        ) : (
          items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0c0d11] p-3 transition-colors hover:border-white/20"
            >
              <GripVertical size={16} className="shrink-0 text-zinc-600" />
              <input
                value={item.label}
                onChange={(e) => updateItem(i, "label", e.target.value)}
                placeholder="Link Label"
                className="w-36 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white placeholder-zinc-500 transition-colors focus:border-[#ff9f1c] focus:outline-none"
              />
              <input
                value={item.href}
                onChange={(e) => updateItem(i, "href", e.target.value)}
                placeholder="/page or https://..."
                className="flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-white placeholder-zinc-500 transition-colors focus:border-[#ff9f1c] focus:outline-none"
              />
              <select
                value={item.target ?? "_self"}
                onChange={(e) => updateItem(i, "target", e.target.value)}
                className="rounded-lg border border-white/10 bg-[#121318] px-2.5 py-1.5 text-xs text-white focus:border-[#ff9f1c] focus:outline-none"
              >
                <option value="_self" className="bg-[#121318] text-white">Same tab</option>
                <option value="_blank" className="bg-[#121318] text-white">New tab</option>
              </select>
              <button
                onClick={() => removeItem(i)}
                className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))
        )}
      </div>

      <button
        onClick={addItem}
        className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-[#ffb84d] transition-all hover:border-[#ff9f1c]/40 hover:bg-[#ff9f1c]/10"
      >
        <Plus size={14} /> Add Navigation Item
      </button>
    </div>
  );
}
