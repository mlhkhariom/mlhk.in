"use client";

import { useEffect, useState } from "react";
import { Plus, Check, Clock, CheckCircle2, Loader2, Sparkles, Trash2, RotateCcw } from "lucide-react";

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
  const [form, setForm] = useState({ note: "", dueDate: "", leadId: "", clientId: "" });
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const leadNameMap = new Map(leadsList.map((l) => [l.id, l.name]));
  const clientNameMap = new Map(clientsList.map((c) => [c.id, c.name]));

  const pending = items.filter((i) => !Boolean(i.done));
  const completed = items.filter((i) => Boolean(i.done));

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white">
            CRM Follow-ups &amp; Reminders
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Track lead callbacks, proposal follow-ups, and active client check-ins.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#ff9f1c] px-4 text-xs font-semibold text-black shadow-[0_0_24px_rgba(255,159,28,0.25)] transition-all hover:bg-[#ffb84d]"
        >
          <Plus size={15} strokeWidth={2.5} /> Add Follow-up
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs text-rose-200">
          {error}
        </div>
      )}

      {showForm && (
        <form
          onSubmit={add}
          className="rounded-2xl border border-white/15 bg-[#0c0d11] p-5 shadow-2xl"
        >
          <h3 className="font-display text-sm font-semibold text-white">New Follow-up Task</h3>
          <div className="mt-3 space-y-3">
            <textarea
              rows={2}
              required
              placeholder="Follow up with prospect regarding website quote or proposal..."
              value={form.note}
              onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-[#ff9f1c] focus:outline-none"
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-[11px] font-semibold text-zinc-400">Due Date</label>
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white focus:border-[#ff9f1c] focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-semibold text-zinc-400">Attach Lead</label>
                <select
                  value={form.leadId}
                  onChange={(e) => setForm((f) => ({ ...f, leadId: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-[#121318] px-3 py-2 text-xs text-white focus:border-[#ff9f1c] focus:outline-none"
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
                <label className="mb-1 block text-[11px] font-semibold text-zinc-400">Attach Client</label>
                <select
                  value={form.clientId}
                  onChange={(e) => setForm((f) => ({ ...f, clientId: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-[#121318] px-3 py-2 text-xs text-white focus:border-[#ff9f1c] focus:outline-none"
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
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={saving || !form.note.trim()}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#ff9f1c] px-5 py-2 text-xs font-semibold text-black hover:bg-[#ffb84d] disabled:opacity-50"
              >
                {saving ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />} Save Task
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-zinc-400 hover:bg-white/5 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Pending Tasks */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-400">
          <span>Pending Tasks ({pending.length})</span>
        </div>

        {loading ? (
          <div className="flex h-32 items-center justify-center">
            <Loader2 className="size-6 animate-spin text-[#ff9f1c]" />
          </div>
        ) : pending.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center text-zinc-400">
            <Sparkles className="mx-auto size-6 text-[#ff9f1c]/60" />
            <p className="mt-2 text-xs font-medium text-zinc-300">No pending follow-ups</p>
            <p className="mt-0.5 text-[11px] text-zinc-500">All current callbacks and check-ins are up to date.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {pending.map((item) => {
              const isPastDue = item.dueDate ? new Date(item.dueDate) < new Date() : false;
              const linkedLead = item.leadId ? leadNameMap.get(item.leadId) : null;
              const linkedClient = item.clientId ? clientNameMap.get(item.clientId) : null;

              return (
                <div
                  key={item.id}
                  className="flex items-start gap-3.5 rounded-xl border border-white/10 bg-[#0c0d11] p-3.5 transition-colors hover:border-white/20"
                >
                  <button
                    type="button"
                    onClick={() => toggleDone(item.id, true)}
                    className="mt-0.5 size-5 shrink-0 rounded-full border-2 border-white/20 transition-all hover:border-emerald-400 hover:bg-emerald-400/20"
                    title="Mark as completed"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-white">{item.note}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-3 text-[11px]">
                      {item.dueDate && (
                        <span className={`flex items-center gap-1 font-mono ${isPastDue ? "text-rose-400" : "text-zinc-400"}`}>
                          <Clock size={11} /> {item.dueDate}
                          {isPastDue && <span className="font-bold uppercase">(Overdue)</span>}
                        </span>
                      )}
                      {linkedLead && <span className="text-[#ffb84d]">Lead: {linkedLead}</span>}
                      {linkedClient && <span className="text-emerald-400">Client: {linkedClient}</span>}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    title="Delete task"
                    className="rounded-lg p-1.5 text-zinc-500 hover:bg-rose-500/10 hover:text-rose-400"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {completed.length > 0 && (
        <div className="space-y-3 pt-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Completed Archive ({completed.length})
          </span>
          <div className="space-y-2">
            {completed.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.01] p-3"
              >
                <div className="flex items-start gap-3 opacity-60">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                  <p className="text-xs text-zinc-400 line-through">{item.note}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => toggleDone(item.id, false)}
                    title="Reopen task"
                    className="rounded-lg p-1.5 text-zinc-500 hover:bg-white/10 hover:text-white"
                  >
                    <RotateCcw size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    title="Delete task"
                    className="rounded-lg p-1.5 text-zinc-500 hover:bg-rose-500/10 hover:text-rose-400"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
