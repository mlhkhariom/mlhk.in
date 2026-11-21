"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Check,
  Clock,
  CheckCircle2,
  Loader2,
  Trash2,
  RotateCcw,
  CalendarClock,
  AlertCircle,
} from "lucide-react";

type FollowUp = {
  id: string;
  note: string;
  dueDate: string | null;
  done: boolean | number | null;
  leadId: string | null;
  clientId: string | null;
  createdAt: string | null;
};

type OptionRecord = { id: string; name: string; company?: string | null };

export default function FollowUpsPage() {
  const [items, setItems] = useState<FollowUp[]>([]);
  const [leadsList, setLeadsList] = useState<OptionRecord[]>([]);
  const [clientsList, setClientsList] = useState<OptionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"pending" | "overdue" | "completed" | "all">("pending");
  const [form, setForm] = useState({ note: "", dueDate: "", leadId: "", clientId: "" });
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const todayIso = new Date().toISOString().slice(0, 10);

  const load = async () => {
    setError(null);
    try {
      const [fuRes, leadsRes, clientsRes] = await Promise.all([
        fetch("/api/admin/followups", { cache: "no-store" }),
        fetch("/api/admin/leads", { cache: "no-store" }).catch(() => null),
        fetch("/api/admin/clients", { cache: "no-store" }).catch(() => null),
      ]);
      if (!fuRes.ok) {
        const d = (await fuRes.json().catch(() => ({}))) as { error?: string };
        throw new Error(d.error || "Could not load follow-ups");
      }
      const fuData = await fuRes.json();
      setItems(Array.isArray(fuData) ? (fuData as FollowUp[]) : []);

      if (leadsRes?.ok) {
        const lData = await leadsRes.json();
        if (Array.isArray(lData)) setLeadsList(lData as OptionRecord[]);
      }
      if (clientsRes?.ok) {
        const cData = await clientsRes.json();
        if (Array.isArray(cData)) setClientsList(cData as OptionRecord[]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load follow-ups");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!form.note.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/followups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(d.error || "Failed to create follow-up");
      }
      setForm({ note: "", dueDate: "", leadId: "", clientId: "" });
      setShowForm(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save follow-up");
    } finally {
      setSaving(false);
    }
  }

  async function toggleDone(id: string, done: boolean) {
    try {
      const res = await fetch("/api/admin/followups", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, done }),
      });
      if (!res.ok) throw new Error("Failed to update follow-up");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    }
  }

  async function remove(id: string) {
    try {
      const res = await fetch("/api/admin/followups", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to delete follow-up");
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  }

  const leadNameMap = useMemo(() => new Map(leadsList.map((l) => [l.id, l.name])), [leadsList]);
  const clientNameMap = useMemo(() => new Map(clientsList.map((c) => [c.id, c.name])), [clientsList]);

  const pending = useMemo(() => items.filter((i) => !Boolean(i.done)), [items]);
  const overdue = useMemo(
    () => pending.filter((i) => Boolean(i.dueDate && i.dueDate < todayIso)),
    [pending, todayIso]
  );
  const completed = useMemo(() => items.filter((i) => Boolean(i.done)), [items]);

  const visible = useMemo(() => {
    if (filter === "pending") return pending;
    if (filter === "overdue") return overdue;
    if (filter === "completed") return completed;
    return items;
  }, [filter, pending, overdue, completed, items]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
            CRM · Activity Queue
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-white">
            Follow-ups &amp; Reminders
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Schedule lead callbacks, proposal check-ins, and renewal reminders tied to CRM records.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#ff9f1c] px-4 text-xs font-semibold text-[#07080a] transition-colors hover:bg-[#ffb043]"
        >
          <Plus size={15} strokeWidth={2.5} />
          <span>Add Follow-up</span>
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-4">
          <p className="text-xs text-zinc-400">Pending</p>
          <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-white">
            {pending.length}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-4">
          <p className="text-xs text-zinc-400">Overdue</p>
          <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-rose-400">
            {overdue.length}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-4">
          <p className="text-xs text-zinc-400">Completed</p>
          <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-emerald-400">
            {completed.length}
          </p>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-300"
        >
          <AlertCircle className="size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {showForm && (
        <form onSubmit={add} className="rounded-xl border border-white/15 bg-[#0d0f14] p-5">
          <h2 className="font-display text-sm font-semibold text-white">New Follow-up Reminder</h2>
          <div className="mt-3 space-y-3">
            <div>
              <label htmlFor="fu-note" className="mb-1 block text-xs font-medium text-zinc-300">
                Action Note <span className="text-[#ff9f1c]">*</span>
              </label>
              <textarea
                id="fu-note"
                rows={2}
                required
                placeholder="Call prospect regarding website quote or send updated GST estimate..."
                value={form.note}
                onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                className="w-full resize-none rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white placeholder-zinc-600 outline-none focus:border-[#ff9f1c]"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label htmlFor="fu-date" className="mb-1 block text-xs font-medium text-zinc-300">
                  Due Date
                </label>
                <input
                  id="fu-date"
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
                  className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
                />
              </div>
              <div>
                <label htmlFor="fu-lead" className="mb-1 block text-xs font-medium text-zinc-300">
                  Link Lead
                </label>
                <select
                  id="fu-lead"
                  value={form.leadId}
                  onChange={(e) => setForm((f) => ({ ...f, leadId: e.target.value }))}
                  className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
                >
                  <option value="">None</option>
                  {leadsList.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="fu-client" className="mb-1 block text-xs font-medium text-zinc-300">
                  Link Client
                </label>
                <select
                  id="fu-client"
                  value={form.clientId}
                  onChange={(e) => setForm((f) => ({ ...f, clientId: e.target.value }))}
                  className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
                >
                  <option value="">None</option>
                  {clientsList.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-2">
              <button
                type="submit"
                disabled={saving || !form.note.trim()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff9f1c] px-4 py-2 text-xs font-semibold text-[#07080a] hover:bg-[#ffb043] disabled:opacity-50"
              >
                {saving ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} strokeWidth={2.5} />}
                <span>Save Reminder</span>
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg border border-white/10 px-4 py-2 text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-2">
        <div className="inline-flex rounded-lg border border-white/10 bg-[#0d0f14] p-0.5 text-xs">
          {[
            { id: "pending", label: `Pending (${pending.length})` },
            { id: "overdue", label: `Overdue (${overdue.length})` },
            { id: "completed", label: `Completed (${completed.length})` },
            { id: "all", label: `All (${items.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`rounded-md px-3 py-1.5 text-xs transition-colors ${
                filter === tab.id
                  ? "bg-white/10 font-medium text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Follow-up List */}
      {loading ? (
        <div className="flex h-36 items-center justify-center rounded-xl border border-white/10 bg-[#0d0f14]">
          <Loader2 className="size-6 animate-spin text-[#ff9f1c]" />
        </div>
      ) : visible.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-12 text-center">
          <CalendarClock className="mx-auto size-7 text-zinc-600" />
          <p className="mt-3 text-sm font-medium text-zinc-300">No reminders in this view</p>
          <p className="mt-1 text-xs text-zinc-500">
            Click &ldquo;Add Follow-up&rdquo; to schedule a callback or client check-in.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.06] overflow-hidden rounded-xl border border-white/10 bg-[#0d0f14]">
          {visible.map((item) => {
            const isDone = Boolean(item.done);
            const isPastDue = !isDone && Boolean(item.dueDate && item.dueDate < todayIso);
            const linkedLead = item.leadId ? leadNameMap.get(item.leadId) : null;
            const linkedClient = item.clientId ? clientNameMap.get(item.clientId) : null;

            return (
              <div
                key={item.id}
                className="flex items-start gap-3.5 px-5 py-3.5 transition-colors hover:bg-white/[0.02]"
              >
                <button
                  type="button"
                  onClick={() => toggleDone(item.id, !isDone)}
                  title={isDone ? "Reopen reminder" : "Mark completed"}
                  className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    isDone
                      ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                      : "border-white/25 hover:border-emerald-400"
                  }`}
                >
                  {isDone && <CheckCircle2 size={13} />}
                </button>

                <div className="min-w-0 flex-1">
                  <p className={`text-xs ${isDone ? "text-zinc-500 line-through" : "font-medium text-zinc-100"}`}>
                    {item.note}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-2.5 text-[11px]">
                    {item.dueDate && (
                      <span
                        className={`inline-flex items-center gap-1 font-mono ${
                          isPastDue ? "text-rose-400" : "text-zinc-500"
                        }`}
                      >
                        <Clock size={11} />
                        {item.dueDate}
                        {isPastDue && <span className="font-semibold">· Overdue</span>}
                      </span>
                    )}
                    {linkedLead && <span className="text-[#ff9f1c]">Lead: {linkedLead}</span>}
                    {linkedClient && <span className="text-emerald-400">Client: {linkedClient}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {isDone && (
                    <button
                      type="button"
                      onClick={() => toggleDone(item.id, false)}
                      title="Reopen"
                      className="rounded-md p-1.5 text-zinc-500 hover:bg-white/5 hover:text-white"
                    >
                      <RotateCcw size={13} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    title="Delete reminder"
                    className="rounded-md p-1.5 text-zinc-500 hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 size={13} />
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
