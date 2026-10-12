"use client";

import { useState, useMemo } from "react";
import {
  Pencil,
  Trash2,
  Plus,
  X,
  Check,
  Search,
  Sparkles,
  AlertCircle,
  Loader2,
  FolderOpen,
} from "lucide-react";

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
  const [deletingId, setDeletingId] = useState<unknown | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  function openNew() {
    setForm({});
    setEditRow(null);
    setError(null);
    setShowForm(true);
  }

  function openEdit(row: Row) {
    setForm({ ...row });
    setEditRow(row);
    setError(null);
    setShowForm(true);
  }

  function close() {
    setShowForm(false);
    setForm({});
    setEditRow(null);
    setError(null);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = editRow
        ? await fetch(apiPath, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          })
        : await fetch(apiPath, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string })?.error || "Failed to save record");
      }

      close();
      onRefresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSaving(false);
    }
  }

  async function del(row: Row) {
    const identifier = String(row.title ?? row.name ?? row.id ?? "this item");
    if (!confirm(`Are you sure you want to permanently delete "${identifier}"?`)) return;

    setDeletingId(row.id);
    try {
      await fetch(apiPath, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: row.id }),
      });
      onRefresh();
    } finally {
      setDeletingId(null);
    }
  }

  // Filter rows based on search
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const q = searchQuery.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some((val) =>
        val !== null && val !== undefined && String(val).toLowerCase().includes(q)
      )
    );
  }, [data, searchQuery]);

  const displayFields = fields.slice(0, 4);

  return (
    <div className="space-y-4">
      {/* Top action & filter bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-64 rounded-xl border border-white/10 bg-white/[0.03] pl-9 pr-3 text-xs text-white placeholder-zinc-500 transition-colors focus:border-[#ff9f1c] focus:outline-none focus:ring-1 focus:ring-[#ff9f1c]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-zinc-400">
            {filteredData.length} {filteredData.length === 1 ? "entry" : "entries"}
          </span>
        </div>

        <button
          onClick={openNew}
          className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#ff9f1c] px-4 text-xs font-semibold text-black shadow-[0_0_24px_rgba(255,159,28,0.25)] transition-all hover:bg-[#ffb84d] hover:shadow-[0_0_32px_rgba(255,159,28,0.35)]"
        >
          <Plus size={15} strokeWidth={2.5} /> Add {title}
        </button>
      </div>

      {/* Main Table Card */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0d11]/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                {displayFields.map((f) => (
                  <th key={f.key} className="px-5 py-3.5">
                    {f.label}
                  </th>
                ))}
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={displayFields.length + 1} className="px-6 py-14 text-center">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-zinc-500">
                      <FolderOpen className="size-6" />
                    </div>
                    <p className="mt-3 font-medium text-zinc-300">
                      {searchQuery ? "No matching records found" : `No ${title.toLowerCase()} recorded yet`}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {searchQuery
                        ? "Try clearing your search query"
                        : `Click "Add ${title}" to create your first entry.`}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredData.map((row, i) => (
                  <tr
                    key={(row.id as string) ?? i}
                    className="group transition-colors hover:bg-white/[0.03]"
                  >
                    {displayFields.map((f, idx) => {
                      const val = row[f.key];
                      const isFirst = idx === 0;

                      return (
                        <td key={f.key} className="max-w-xs truncate px-5 py-3.5">
                          {f.type === "select" && val ? (
                            <span className="inline-flex items-center rounded-md border border-[#ff9f1c]/20 bg-[#ff9f1c]/10 px-2 py-0.5 text-xs font-medium text-[#ffb84d]">
                              {String(val)}
                            </span>
                          ) : isFirst ? (
                            <span className="font-medium text-white">{String(val ?? "—")}</span>
                          ) : (
                            <span className="text-zinc-400">{String(val ?? "—")}</span>
                          )}
                        </td>
                      );
                    })}
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(row)}
                          title="Edit"
                          className="flex size-7 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-zinc-400 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-[#ffb84d]"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => del(row)}
                          disabled={deletingId === row.id}
                          title="Delete"
                          className="flex size-7 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-zinc-400 transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                        >
                          {deletingId === row.id ? (
                            <Loader2 size={13} className="animate-spin" />
                          ) : (
                            <Trash2 size={13} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / New Modal Dialog */}
      {showForm && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            onClick={close}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-white/15 bg-[#0c0d11] p-6 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 text-[#ffb84d]">
                  <Sparkles size={14} />
                </span>
                <h3 className="font-display text-base font-bold text-white">
                  {editRow ? "Edit" : "New"} {title}
                </h3>
              </div>
              <button
                type="button"
                onClick={close}
                className="rounded-lg p-1 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                <AlertCircle className="size-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={save} className="mt-4 space-y-4">
              <div className="max-h-[60vh] space-y-3.5 overflow-y-auto pr-1">
                {fields.map((f) => (
                  <div key={f.key}>
                    <label className="mb-1.5 block text-xs font-semibold tracking-wide text-zinc-300">
                      {f.label}
                      {f.required && <span className="ml-1 text-[#ff9f1c]">*</span>}
                    </label>

                    {f.type === "textarea" ? (
                      <textarea
                        rows={3}
                        required={f.required}
                        value={(form[f.key] as string) ?? ""}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 transition-colors focus:border-[#ff9f1c] focus:outline-none focus:ring-1 focus:ring-[#ff9f1c]"
                      />
                    ) : f.type === "select" ? (
                      <select
                        required={f.required}
                        value={(form[f.key] as string) ?? ""}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-[#121318] px-3.5 py-2.5 text-xs text-white transition-colors focus:border-[#ff9f1c] focus:outline-none focus:ring-1 focus:ring-[#ff9f1c]"
                      >
                        <option value="">Select an option...</option>
                        {f.options?.map((o) => (
                          <option key={o} value={o} className="bg-[#121318] text-white">
                            {o}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={f.type ?? "text"}
                        required={f.required}
                        value={(form[f.key] as string) ?? ""}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 transition-colors focus:border-[#ff9f1c] focus:outline-none focus:ring-1 focus:ring-[#ff9f1c]"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={close}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#ff9f1c] px-5 py-2 text-xs font-semibold text-black shadow-[0_0_20px_rgba(255,159,28,0.25)] transition-all hover:bg-[#ffb84d] disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 size={13} className="animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Check size={13} strokeWidth={2.5} /> Save Record
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
