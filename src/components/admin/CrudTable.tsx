"use client";
import { useState } from "react";
import { Pencil, Trash2, Plus, X, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export type Field = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "select" | "number";
  options?: string[];
  required?: boolean;
};

type Row = Record<string, unknown>;

interface Props {
  title: string;
  data: Row[];
  fields: Field[];
  apiPath: string;
  onRefresh: () => void;
}

export default function CrudTable({ title, data, fields, apiPath, onRefresh }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [editRow, setEditRow] = useState<Row | null>(null);
  const [form, setForm] = useState<Row>({});
  const [saving, setSaving] = useState(false);

  function openNew() { setForm({}); setEditRow(null); setShowForm(true); }
  function openEdit(row: Row) { setForm({ ...row }); setEditRow(row); setShowForm(true); }
  function close() { setShowForm(false); setForm({}); setEditRow(null); }

  async function save() {
    setSaving(true);
    if (editRow) {
      await fetch(apiPath, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } else {
      await fetch(apiPath, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    setSaving(false);
    close();
    onRefresh();
  }

  async function del(row: Row) {
    if (!confirm(`Delete "${row.title ?? row.name}"?`)) return;
    await fetch(apiPath, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: row.id }) });
    onRefresh();
  }

  const displayFields = fields.slice(0, 3);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <button onClick={openNew} className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-blue-700 flex items-center gap-1">
          <Plus size={14} /> Add
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{editRow ? "Edit" : "New"} {title}</h3>
              <button onClick={close}><X size={18} className="text-gray-400" /></button>
            </div>
            <div className="space-y-3">
              {fields.map(f => (
                <div key={f.key}>
                  <label className="text-xs font-medium text-gray-600 block mb-1">{f.label}{f.required && " *"}</label>
                  {f.type === "textarea" ? (
                    <textarea rows={4} value={(form[f.key] as string) ?? ""} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      className="border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                  ) : f.type === "select" ? (
                    <select value={(form[f.key] as string) ?? ""} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      className="border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select...</option>
                      {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input type={f.type ?? "text"} value={(form[f.key] as string) ?? ""} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      className="border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={save} disabled={saving}
                className="bg-blue-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1">
                <Check size={14} /> {saving ? "Saving..." : "Save"}
              </button>
              <button onClick={close} className="text-sm text-gray-500 hover:text-gray-700">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                {displayFields.map(f => <th key={f.key} className="px-4 py-3 text-left font-medium">{f.label}</th>)}
                <th className="px-4 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.length === 0 ? (
                <tr><td colSpan={displayFields.length + 1} className="px-4 py-8 text-center text-gray-400">No records yet</td></tr>
              ) : data.map((row, i) => (
                <tr key={(row.id as string) ?? i} className="hover:bg-gray-50">
                  {displayFields.map(f => (
                    <td key={f.key} className="px-4 py-3 text-gray-700 max-w-xs truncate">
                      {f.type === "select" && row[f.key] ? (
                        <span className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded">{row[f.key] as string}</span>
                      ) : (String(row[f.key] ?? "—"))}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <button onClick={() => openEdit(row)} className="text-blue-600 hover:text-blue-800"><Pencil size={14} /></button>
                      <button onClick={() => del(row)} className="text-red-500 hover:text-red-700"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
