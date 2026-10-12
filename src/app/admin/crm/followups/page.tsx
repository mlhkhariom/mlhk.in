"use client";

import { useEffect, useState } from "react";
import { Plus, Check, Clock, Calendar, CheckCircle2, Loader2, Sparkles } from "lucide-react";

type FollowUp = {
  id: string;
  note: string;
  dueDate: string | null;
  done: number;
  leadId: string | null;
  clientId: string | null;
  createdAt: string | null;
};

export default function FollowUpsPage() {
  const [items, setItems] = useState<FollowUp[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ note: "", dueDate: "", leadId: "", clientId: "" });
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const res = await fetch("/api/admin/followups");
      const d = await res.json();
      setItems(Array.isArray(d) ? (d as FollowUp[]) : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!form.note) return;
    setSaving(true);
    try {
      await fetch("/api/admin/followups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setForm({ note: "", dueDate: "", leadId: "", clientId: "" });
      setShowForm(false);
      load();
    } finally {
      setSaving(false);
    }
  }

  async function markDone(id: string, done: boolean) {
    await fetch("/api/admin/followups", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, done: done ? 1 : 0 }),
    });
    load();
  }

  const pending = items.filter((i) => !i.done);
  const completed = items.filter((i) => i.done);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white">
            Client Follow-ups & Reminders
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Keep track of callbacks, proposal reviews, and milestone check-ins.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#ff9f1c] px-4 text-xs font-semibold text-black shadow-[0_0_24px_rgba(255,159,28,0.25)] transition-all hover:bg-[#ffb84d]"
        >
          <Plus size={15} strokeWidth={2.5} /> Add Follow-up
        </button>
      </div>

      {/* Add Form Card */}
      {showForm && (
        <form
          onSubmit={add}
          className="rounded-2xl border border-white/15 bg-[#0c0d11] p-5 shadow-2xl backdrop-blur-md"
        >
          <h3 className="font-display text-sm font-semibold text-white">New Follow-up Task</h3>
          <div className="mt-3 space-y-3">
            <textarea
              rows={2}
              required
              placeholder="Follow up with client regarding proposal approval..."
              value={form.note}
              onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 transition-colors focus:border-[#ff9f1c] focus:outline-none"
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[11px] font-semibold text-zinc-400">
                  Target Due Date
                </label>
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white transition-colors focus:border-[#ff9f1c] focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={saving || !form.note}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#ff9f1c] px-5 py-2 text-xs font-semibold text-black transition-all hover:bg-[#ffb84d] disabled:opacity-50"
              >
                {saving ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />} Save Task
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Pending Items Section */}
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
            <p className="mt-0.5 text-[11px] text-zinc-500">All current communications are up to date.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {pending.map((item) => {
              const isPastDue = item.dueDate ? new Date(item.dueDate) < new Date() : false;

              return (
                <div
                  key={item.id}
                  className="flex items-start gap-3.5 rounded-xl border border-white/10 bg-[#0c0d11] p-3.5 transition-colors hover:border-white/20"
                >
                  <button
                    onClick={() => markDone(item.id, true)}
                    className="mt-0.5 size-5 shrink-0 rounded-full border-2 border-white/20 transition-all hover:border-emerald-400 hover:bg-emerald-400/20"
                    title="Mark as completed"
                  />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-white">{item.note}</p>
                    {item.dueDate && (
                      <p
                        className={`mt-1.5 flex items-center gap-1 font-mono text-[11px] ${
                          isPastDue ? "text-rose-400" : "text-zinc-500"
                        }`}
                      >
                        <Clock size={11} /> {item.dueDate}
                        {isPastDue && <span className="ml-1 text-[10px] uppercase font-bold">(Overdue)</span>}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Completed Items Section */}
      {completed.length > 0 && (
        <div className="space-y-3 pt-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Completed Archive ({completed.length})
          </span>
          <div className="space-y-2">
            {completed.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3.5 rounded-xl border border-white/5 bg-white/[0.01] p-3 opacity-50"
              >
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                <p className="text-xs text-zinc-400 line-through">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
