"use client";

import { useEffect, useState } from "react";
import { Plus, X, Check, Ticket, Loader2, Sparkles } from "lucide-react";

type Row = {
  ticket: {
    id: string;
    title: string;
    description: string | null;
    status: string | null;
    priority: string | null;
    createdAt: string | null;
  };
  clientName: string | null;
};

const statusStyles: Record<string, { bg: string; text: string; border: string }> = {
  open: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20" },
  in_progress: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
  resolved: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  closed: { bg: "bg-zinc-500/10", text: "text-zinc-500", border: "border-zinc-500/20" },
};

const priorityStyles: Record<string, { bg: string; text: string; border: string }> = {
  low: { bg: "bg-zinc-500/10", text: "text-zinc-400", border: "border-zinc-500/20" },
  medium: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
  high: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
  urgent: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20" },
};

export default function TicketsPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", priority: "medium" });
  const [saving, setSaving] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const load = async () => {
    try {
      const d = await fetch("/api/admin/tickets").then((r) => r.json());
      setRows(Array.isArray(d) ? (d as Row[]) : []);
    } catch {
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title) return;
    setSaving(true);
    try {
      await fetch("/api/admin/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setShowForm(false);
      setForm({ title: "", description: "", priority: "medium" });
      load();
    } finally {
      setSaving(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    setUpdatingId(id);
    try {
      await fetch("/api/admin/tickets", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      load();
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white">
            Support & Issue Tickets
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Escalations, client bug tickets, and SLA resolution tracking.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#ff9f1c] px-4 text-xs font-semibold text-black shadow-[0_0_24px_rgba(255,159,28,0.25)] transition-all hover:bg-[#ffb84d]"
        >
          <Plus size={15} strokeWidth={2.5} /> New Ticket
        </button>
      </div>

      {/* Modal Dialog */}
      {showForm && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div onClick={() => setShowForm(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md" />
          <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white/15 bg-[#0c0d11] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 text-[#ffb84d]">
                  <Ticket size={14} />
                </span>
                <h3 className="font-display text-base font-bold text-white">Open Support Ticket</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg p-1 text-zinc-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={create} className="mt-4 space-y-3.5">
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-300">
                  Ticket Subject <span className="text-[#ff9f1c]">*</span>
                </label>
                <input
                  required
                  placeholder="e.g. SSL renewal cert error on subdomain"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:border-[#ff9f1c] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-300">
                  Detailed Issue Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide error logs, reproduction steps or details..."
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:border-[#ff9f1c] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-300">
                  Severity / Priority
                </label>
                <select
                  value={form.priority}
                  onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-[#121318] px-3.5 py-2 text-xs text-white focus:border-[#ff9f1c] focus:outline-none"
                >
                  {["low", "medium", "high", "urgent"].map((p) => (
                    <option key={p} value={p} className="bg-[#121318] text-white">
                      {p.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || !form.title}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#ff9f1c] px-5 py-2 text-xs font-semibold text-black shadow-md hover:bg-[#ffb84d] disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Check size={13} strokeWidth={2.5} />
                  )}{" "}
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Table Card */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0d11]/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                <th className="px-5 py-3.5">Ticket Subject</th>
                <th className="px-5 py-3.5">Client / Contact</th>
                <th className="px-5 py-3.5">Priority</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Created Date</th>
                <th className="px-5 py-3.5 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-14 text-center">
                    <Loader2 className="mx-auto size-6 animate-spin text-[#ff9f1c]" />
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-14 text-center">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-zinc-500">
                      <Ticket className="size-6" />
                    </div>
                    <p className="mt-3 font-medium text-zinc-300">No support tickets</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      All systems and client requests are in good standing.
                    </p>
                  </td>
                </tr>
              ) : (
                rows.map(({ ticket, clientName }) => {
                  const s = statusStyles[ticket.status ?? "open"] || statusStyles.open;
                  const p = priorityStyles[ticket.priority ?? "medium"] || priorityStyles.medium;

                  return (
                    <tr key={ticket.id} className="group transition-colors hover:bg-white/[0.03]">
                      <td className="max-w-xs truncate px-5 py-3.5 font-medium text-white">
                        {ticket.title}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-zinc-400">
                        {clientName ?? "Internal"}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${p.border} ${p.bg} ${p.text}`}
                        >
                          {ticket.priority ?? "medium"}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide ${s.border} ${s.bg} ${s.text}`}
                        >
                          {ticket.status ?? "open"}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-zinc-500">
                        {ticket.createdAt ? ticket.createdAt.slice(0, 10) : "—"}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="relative inline-flex items-center">
                          <select
                            disabled={updatingId === ticket.id}
                            value={ticket.status ?? "open"}
                            onChange={(e) => updateStatus(ticket.id, e.target.value)}
                            className="h-7 cursor-pointer rounded-lg border border-white/10 bg-[#121318] px-2 py-0 text-xs text-white transition-colors focus:border-[#ff9f1c] focus:outline-none disabled:opacity-50"
                          >
                            {["open", "in_progress", "resolved", "closed"].map((st) => (
                              <option key={st} value={st} className="bg-[#121318] text-white">
                                {st}
                              </option>
                            ))}
                          </select>
                          {updatingId === ticket.id && (
                            <Loader2 className="absolute right-2 size-3 animate-spin text-[#ff9f1c]" />
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
    </div>
  );
}
