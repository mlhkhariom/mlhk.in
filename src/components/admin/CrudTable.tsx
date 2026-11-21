"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Pencil,
  Trash2,
  Plus,
  X,
  Check,
  Search,
  AlertCircle,
  Loader2,
  FolderOpen,
  ExternalLink,
} from "lucide-react";

export type Field = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "select" | "number" | "date" | "url" | "image" | "boolean";
  options?: string[];
  required?: boolean;
  placeholder?: string;
};

type Row = Record<string, unknown>;

interface Props {
  title: string;
  data: Row[];
  fields: Field[];
  apiPath: string;
  onRefresh: () => void;
  statusFilterKey?: string;
  previewHref?: (row: Row) => string | null;
}

const STATUS_DOT: Record<string, string> = {
  published: "bg-emerald-400",
  active: "bg-emerald-400",
  paid: "bg-emerald-400",
  resolved: "bg-emerald-400",
  draft: "bg-zinc-400",
  pending: "bg-[#ff9f1c]",
  in_progress: "bg-sky-400",
  archived: "bg-zinc-500",
  overdue: "bg-red-400",
};

export default function CrudTable({
  title,
  data,
  fields,
  apiPath,
  onRefresh,
  statusFilterKey,
  previewHref,
}: Props) {
  const [showForm, setShowForm] = useState(false);
  const [editRow, setEditRow] = useState<Row | null>(null);
  const [form, setForm] = useState<Row>({});
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<unknown | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<unknown | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [error, setError] = useState<string | null>(null);
  const [tableError, setTableError] = useState<string | null>(null);

  useEffect(() => {
    if (!showForm) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowForm(false);
        setForm({});
        setEditRow(null);
        setError(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showForm]);

  function openNew() {
    const defaults: Row = {};
    for (const f of fields) {
      if (f.type === "select" && f.options?.length && f.required) {
        defaults[f.key] = f.options[0];
      } else if (f.type === "boolean") {
        defaults[f.key] = false;
      }
    }
    setForm(defaults);
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
      const payload: Row = { ...form };
      for (const f of fields) {
        if (f.type === "number") {
          const raw = payload[f.key];
          if (raw === "" || raw === undefined || raw === null) {
            payload[f.key] = null;
          } else {
            const parsed = Number(raw);
            payload[f.key] = Number.isFinite(parsed) ? parsed : null;
          }
        }
      }

      const res = editRow
        ? await fetch(apiPath, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch(apiPath, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

      if (!res.ok) {
        const errBody = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(errBody?.error || "Failed to save record");
      }

      close();
      onRefresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setSaving(false);
    }
  }

  async function del(row: Row) {
    setDeletingId(row.id);
    setTableError(null);
    try {
      const res = await fetch(apiPath, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: row.id }),
      });
      if (!res.ok) {
        const errData = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(errData.error || "Failed to delete record");
      }
      setConfirmDeleteId(null);
      onRefresh();
    } catch (err) {
      setTableError(err instanceof Error ? err.message : "Failed to delete record");
    } finally {
      setDeletingId(null);
    }
  }

  const filterField = useMemo(
    () => (statusFilterKey ? fields.find((f) => f.key === statusFilterKey) : undefined),
    [fields, statusFilterKey]
  );

  const filteredData = useMemo(() => {
    let rows = Array.isArray(data) ? data : [];
    if (statusFilterKey && statusFilter !== "all") {
      rows = rows.filter((r) => String(r[statusFilterKey] ?? "") === statusFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      rows = rows.filter((row) =>
        Object.values(row).some(
          (val) => val !== null && val !== undefined && String(val).toLowerCase().includes(q)
        )
      );
    }
    return rows;
  }, [data, searchQuery, statusFilter, statusFilterKey]);

  const displayFields = fields.slice(0, 5);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              aria-label={`Search ${title}`}
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-60 rounded-lg border border-white/10 bg-[#0d0f14] pl-8.5 pr-7 text-xs text-white placeholder-zinc-500 outline-none transition-colors focus:border-[#ff9f1c]/60"
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {filterField?.options && filterField.options.length > 0 && (
            <div className="flex items-center rounded-lg border border-white/10 bg-[#0d0f14] p-0.5 text-[11px]">
              <button
                type="button"
                onClick={() => setStatusFilter("all")}
                className={`rounded-md px-2.5 py-1 capitalize transition-colors ${
                  statusFilter === "all"
                    ? "bg-white/10 font-medium text-white"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                All
              </button>
              {filterField.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setStatusFilter(opt)}
                  className={`rounded-md px-2.5 py-1 capitalize transition-colors ${
                    statusFilter === opt
                      ? "bg-white/10 font-medium text-white"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {opt.replace("_", " ")}
                </button>
              ))}
            </div>
          )}

          <span className="font-mono text-[11px] tabular-nums text-zinc-500">
            {filteredData.length} {filteredData.length === 1 ? "record" : "records"}
          </span>
        </div>

        <button
          type="button"
          onClick={openNew}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#ff9f1c] px-4 text-xs font-semibold text-[#07080a] transition-colors hover:bg-[#ffb043]"
        >
          <Plus size={15} strokeWidth={2.5} />
          <span>Add {title}</span>
        </button>
      </div>

      {tableError && (
        <div
          role="alert"
          className="flex items-center justify-between gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-300"
        >
          <span className="flex items-center gap-2">
            <AlertCircle className="size-4 shrink-0" />
            {tableError}
          </span>
          <button
            type="button"
            onClick={() => setTableError(null)}
            className="text-red-200 hover:text-white"
            aria-label="Dismiss error"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main Hairline Data Table */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d0f14]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                {displayFields.map((f) => (
                  <th key={f.key} className="px-4 py-3">
                    {f.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={displayFields.length + 1} className="px-6 py-14 text-center">
                    <div className="mx-auto flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-500">
                      <FolderOpen className="size-5" />
                    </div>
                    <p className="mt-3 text-sm font-medium text-zinc-300">
                      {searchQuery || statusFilter !== "all"
                        ? "No matching records"
                        : `No ${title.toLowerCase()} yet`}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {searchQuery || statusFilter !== "all"
                        ? "Adjust your filters or search query."
                        : `Use "Add ${title}" to create the first entry.`}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredData.map((row, i) => {
                  const previewUrl = previewHref ? previewHref(row) : null;
                  return (
                    <tr
                      key={(row.id as string) ?? i}
                      className="group transition-colors hover:bg-white/[0.025]"
                    >
                      {displayFields.map((f, idx) => {
                        const val = row[f.key];
                        const isFirst = idx === 0;

                        return (
                          <td key={f.key} className="max-w-xs truncate px-4 py-3">
                            {f.type === "select" && val ? (
                              <span className="inline-flex items-center gap-1.5 text-xs capitalize text-zinc-200">
                                <span
                                  className={`size-1.5 rounded-full ${
                                    STATUS_DOT[String(val).toLowerCase()] ?? "bg-[#ff9f1c]"
                                  }`}
                                />
                                {String(val).replace("_", " ")}
                              </span>
                            ) : f.type === "boolean" ? (
                              <span className="font-mono text-[11px] text-zinc-300">
                                {val ? "Yes" : "No"}
                              </span>
                            ) : f.type === "number" ? (
                              <span className="font-mono tabular-nums text-zinc-200">
                                {val !== null && val !== undefined ? String(val) : "—"}
                              </span>
                            ) : f.type === "image" && val ? (
                              <div className="flex items-center gap-2">
                                <img
                                  src={String(val)}
                                  alt=""
                                  className="size-7 rounded border border-white/10 object-cover"
                                />
                                <span className="truncate font-mono text-[11px] text-zinc-400">
                                  {String(val)}
                                </span>
                              </div>
                            ) : isFirst ? (
                              <span className="font-medium text-white">
                                {String(val ?? "—")}
                              </span>
                            ) : (
                              <span className="text-zinc-400">{String(val ?? "—")}</span>
                            )}
                          </td>
                        );
                      })}
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {confirmDeleteId === row.id ? (
                            <>
                              <button
                                type="button"
                                onClick={() => del(row)}
                                disabled={deletingId === row.id}
                                className="inline-flex h-7 items-center gap-1 rounded-md border border-red-500/40 bg-red-500/20 px-2.5 text-[11px] font-semibold text-red-200 hover:bg-red-500/30 disabled:opacity-50"
                              >
                                {deletingId === row.id ? (
                                  <Loader2 size={12} className="animate-spin" />
                                ) : (
                                  "Confirm"
                                )}
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteId(null)}
                                className="inline-flex h-7 items-center rounded-md border border-white/10 px-2 text-[11px] text-zinc-400 hover:text-white"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              {previewUrl && (
                                <a
                                  href={previewUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Open on live site"
                                  className="flex size-7 items-center justify-center rounded-md border border-white/10 text-zinc-400 transition-colors hover:border-white/25 hover:text-white"
                                >
                                  <ExternalLink size={12} />
                                </a>
                              )}
                              <button
                                type="button"
                                onClick={() => openEdit(row)}
                                title={`Edit ${title}`}
                                className="flex size-7 items-center justify-center rounded-md border border-white/10 text-zinc-400 transition-colors hover:border-white/25 hover:text-[#ff9f1c]"
                              >
                                <Pencil size={12} />
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteId(row.id)}
                                disabled={deletingId === row.id}
                                title={`Delete ${title}`}
                                className="flex size-7 items-center justify-center rounded-md border border-white/10 text-zinc-400 transition-colors hover:border-red-500/40 hover:text-red-400 disabled:opacity-50"
                              >
                                <Trash2 size={12} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog */}
      {showForm && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="crud-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={close}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-xl border border-white/15 bg-[#0d0f14] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 id="crud-modal-title" className="font-display text-base font-bold text-white">
                {editRow ? "Edit" : "New"} {title}
              </h3>
              <button
                type="button"
                onClick={close}
                aria-label="Close modal"
                className="rounded-lg p-1 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {error && (
              <div
                role="alert"
                className="mt-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300"
              >
                <AlertCircle className="size-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={save} className="mt-4 space-y-4">
              <div className="max-h-[62vh] space-y-3.5 overflow-y-auto pr-1">
                {fields.map((f) => {
                  const inputId = `crud-field-${f.key}`;
                  return (
                    <div key={f.key}>
                      <label
                        htmlFor={inputId}
                        className="mb-1.5 block text-xs font-medium text-zinc-300"
                      >
                        {f.label}
                        {f.required && <span className="ml-1 text-[#ff9f1c]">*</span>}
                      </label>

                      {f.type === "textarea" ? (
                        <textarea
                          id={inputId}
                          rows={3}
                          required={f.required}
                          placeholder={f.placeholder}
                          value={String(form[f.key] ?? "")}
                          onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                          className="w-full resize-y rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white placeholder-zinc-600 outline-none focus:border-[#ff9f1c]"
                        />
                      ) : f.type === "select" ? (
                        <select
                          id={inputId}
                          required={f.required}
                          value={String(form[f.key] ?? "")}
                          onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                          className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
                        >
                          <option value="">Select an option...</option>
                          {f.options?.map((o) => (
                            <option key={o} value={o} className="bg-[#0d0f14] text-white">
                              {o}
                            </option>
                          ))}
                        </select>
                      ) : f.type === "boolean" ? (
                        <label className="inline-flex cursor-pointer items-center gap-2.5 text-xs text-zinc-300">
                          <input
                            id={inputId}
                            type="checkbox"
                            checked={Boolean(form[f.key])}
                            onChange={(e) => setForm({ ...form, [f.key]: e.target.checked })}
                            className="size-4 rounded border-white/20 bg-[#07080a] accent-[#ff9f1c]"
                          />
                          <span>Enabled</span>
                        </label>
                      ) : f.type === "image" ? (
                        <div className="space-y-2">
                          <input
                            id={inputId}
                            type="text"
                            required={f.required}
                            placeholder={f.placeholder ?? "/images/showcase/web-platform.jpg or https://..."}
                            value={String(form[f.key] ?? "")}
                            onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                            className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white placeholder-zinc-600 outline-none focus:border-[#ff9f1c]"
                          />
                          {Boolean(form[f.key]) && (
                            <img
                              src={String(form[f.key])}
                              alt="Preview"
                              className="h-24 w-40 rounded-lg border border-white/10 object-cover"
                            />
                          )}
                        </div>
                      ) : (
                        <input
                          id={inputId}
                          type={f.type === "url" ? "text" : f.type ?? "text"}
                          required={f.required}
                          placeholder={f.placeholder}
                          value={
                            form[f.key] === null || form[f.key] === undefined
                              ? ""
                              : String(form[f.key])
                          }
                          onChange={(e) =>
                            setForm({
                              ...form,
                              [f.key]: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white placeholder-zinc-600 outline-none focus:border-[#ff9f1c]"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-end gap-2.5 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={close}
                  className="rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff9f1c] px-4 py-2 text-xs font-semibold text-[#07080a] transition-colors hover:bg-[#ffb043] disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check size={13} strokeWidth={2.5} />
                      <span>Save Record</span>
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
