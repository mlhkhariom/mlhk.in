"use client";
import { useEffect, useState } from "react";
import { Plus, Trash2, GripVertical, Save } from "lucide-react";

type MenuItem = { label: string; href: string; target?: string };
type MenuData = { location: string; items: MenuItem[] };

const LOCATIONS = [
  { key: "header", label: "Header Navigation" },
  { key: "footer", label: "Footer Links" },
  { key: "mobile", label: "Mobile Menu" },
];

export default function MenusPage() {
  const [menus, setMenus] = useState<Record<string, MenuItem[]>>({ header: [], footer: [], mobile: [] });
  const [active, setActive] = useState("header");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/menus").then(r => r.json()).then((data: unknown) => {
      const list = data as MenuData[];
      const m: Record<string, MenuItem[]> = { header: [], footer: [], mobile: [] };
      list.forEach(d => { try { m[d.location] = JSON.parse(d.items as unknown as string); } catch {} });
      setMenus(m);
    });
  }, []);

  const items = menus[active] ?? [];

  function addItem() {
    setMenus(m => ({ ...m, [active]: [...(m[active] ?? []), { label: "New Link", href: "/" }] }));
  }

  function updateItem(i: number, key: keyof MenuItem, val: string) {
    setMenus(m => {
      const arr = [...(m[active] ?? [])];
      arr[i] = { ...arr[i], [key]: val };
      return { ...m, [active]: arr };
    });
  }

  function removeItem(i: number) {
    setMenus(m => ({ ...m, [active]: (m[active] ?? []).filter((_, idx) => idx !== i) }));
  }

  async function save() {
    setSaving(true);
    await fetch("/api/admin/menus", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: active, items }) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Menu Editor</h1>
        <button onClick={save} disabled={saving}
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50">
          <Save size={15} /> {saved ? "Saved!" : saving ? "Saving..." : "Save Menu"}
        </button>
      </div>

      {/* Location tabs */}
      <div className="flex gap-2 mb-6">
        {LOCATIONS.map(l => (
          <button key={l.key} onClick={() => setActive(l.key)}
            className={`text-sm px-4 py-2 rounded-lg font-medium transition-colors ${active === l.key ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            {l.label}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="space-y-2 mb-4">
        {items.length === 0 && <p className="text-gray-400 text-sm text-center py-8 border-2 border-dashed rounded-xl">No items. Add your first menu item.</p>}
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 bg-white border rounded-xl px-4 py-3">
            <GripVertical size={16} className="text-gray-300 shrink-0" />
            <input value={item.label} onChange={e => updateItem(i, "label", e.target.value)} placeholder="Label"
              className="border rounded px-2 py-1 text-sm w-32 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            <input value={item.href} onChange={e => updateItem(i, "href", e.target.value)} placeholder="/page or https://..."
              className="border rounded px-2 py-1 text-sm flex-1 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            <select value={item.target ?? "_self"} onChange={e => updateItem(i, "target", e.target.value)}
              className="border rounded px-2 py-1 text-xs focus:outline-none">
              <option value="_self">Same tab</option>
              <option value="_blank">New tab</option>
            </select>
            <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-600"><Trash2 size={15} /></button>
          </div>
        ))}
      </div>

      <button onClick={addItem} className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium">
        <Plus size={16} /> Add Menu Item
      </button>
    </div>
  );
}
