"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Ticket as TicketIcon,
  MessageSquare,
  Send,
  Trash2,
  X,
  Check,
  Loader2,
  AlertCircle,
} from "lucide-react";

type TicketRow = {
  ticket: {
    id: string;
    title: string;
    description: string | null;
    status: string;
    priority: string;
    clientId: string | null;
    createdAt: string | null;
  };
  clientName: string | null;
  clientCompany: string | null;
  messageCount: number;
};

type TicketMessage = {
  id: string;
  ticketId: string;
  message: string;
  createdAt: string | null;
  senderName: string | null;
  senderRole: string | null;
};

type ClientOption = { id: string; name: string; company: string | null };

const STATUSES = ["open", "in_progress", "resolved", "closed"] as const;
const PRIORITIES = ["low", "medium", "high", "urgent"] as const;

const PRIORITY_TONE: Record<string, string> = {
  urgent: "text-rose-400",
  high: "text-[#ff9f1c]",
  medium: "text-sky-400",
  low: "text-zinc-400",
};

const STATUS_DOT: Record<string, string> = {
  open: "bg-rose-400",
  in_progress: "bg-[#ff9f1c]",
  resolved: "bg-emerald-400",
  closed: "bg-zinc-500",
};

export default function TicketsPage() {
  const [rows, setRows] = useState<TicketRow[]>([]);
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingThread, setLoadingThread] = useState(false);

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", priority: "medium", clientId: "" });
  const [creating, setCreating] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadTickets = async (keepSelected = true) => {
    setError(null);
    try {
      const [tRes, cRes] = await Promise.all([
        fetch("/api/admin/tickets", { cache: "no-store" }),
        fetch("/api/admin/clients", { cache: "no-store" }).catch(() => null),
      ]);
      if (!tRes.ok) throw new Error("Failed to load tickets");
      const list = (await tRes.json()) as TicketRow[];
      const safeList = Array.isArray(list) ? list : [];
      setRows(safeList);
      if (cRes?.ok) {
        const cl = await cRes.json();
        if (Array.isArray(cl)) setClients(cl as ClientOption[]);
      }
      setSelectedId((prev) => {
        if (keepSelected && prev && safeList.some((r) => r.ticket.id === prev)) return prev;
        return safeList[0]?.ticket.id ?? null;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load support tickets");
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (ticketId: string) => {
    setLoadingThread(true);
    try {
      const res = await fetch(`/api/admin/tickets/${ticketId}/messages`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load ticket conversation");
      const data = await res.json();
      setMessages(Array.isArray(data) ? (data as TicketMessage[]) : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load conversation");
    } finally {
      setLoadingThread(false);
    }
  };

  useEffect(() => {
    loadTickets(false);
  }, []);

  useEffect(() => {
    if (selectedId) {
      loadMessages(selectedId);
    } else {
      setMessages([]);
    }
  }, [selectedId]);

  useEffect(() => {
    if (!showCreate) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowCreate(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showCreate]);

  const selectedRow = useMemo(
    () => rows.find((r) => r.ticket.id === selectedId) ?? null,
    [rows, selectedId]
  );

  const visible = useMemo(() => {
    return rows.filter((r) => {
      if (statusFilter !== "all" && r.ticket.status !== statusFilter) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return [r.ticket.title, r.ticket.description, r.clientName, r.clientCompany]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q));
    });
  }, [rows, statusFilter, query]);

  const counts = useMemo(
    () => ({
      open: rows.filter((r) => r.ticket.status === "open").length,
      inProgress: rows.filter((r) => r.ticket.status === "in_progress").length,
      urgent: rows.filter(
        (r) => r.ticket.priority === "urgent" && r.ticket.status !== "resolved" && r.ticket.status !== "closed"
      ).length,
      resolved: rows.filter((r) => r.ticket.status === "resolved" || r.ticket.status === "closed").length,
    }),
    [rows]
  );

  async function createTicket(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return;
    setCreating(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          description: form.description.trim() || undefined,
          priority: form.priority,
          clientId: form.clientId || undefined,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { id?: string; error?: string };
      if (!res.ok) throw new Error(data.error || "Failed to create ticket");
      setForm({ title: "", description: "", priority: "medium", clientId: "" });
      setShowCreate(false);
      await loadTickets(true);
      if (data.id) setSelectedId(data.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create ticket");
    } finally {
      setCreating(false);
    }
  }

  async function patchTicket(id: string, patch: { status?: string; priority?: string }) {
    setRows((prev) =>
      prev.map((r) =>
        r.ticket.id === id ? { ...r, ticket: { ...r.ticket, ...patch } } : r
      )
    );
    const res = await fetch("/api/admin/tickets", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...patch }),
    });
    if (!res.ok) {
      setError("Failed to update ticket");
      loadTickets(true);
    }
  }

  async function deleteTicket(id: string) {
    const res = await fetch("/api/admin/tickets", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setConfirmDeleteId(null);
      await loadTickets(false);
    } else {
      setError("Failed to delete ticket");
    }
  }

  async function sendReply(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedId || !replyText.trim()) return;
    setSendingReply(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/tickets/${selectedId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: replyText.trim() }),
      });
      const data = (await res.json().catch(() => ({}))) as { entry?: TicketMessage; error?: string };
      if (!res.ok || !data.entry) throw new Error(data.error || "Failed to send reply");
      setMessages((prev) => [...prev, data.entry!]);
      setRows((prev) =>
        prev.map((r) =>
          r.ticket.id === selectedId ? { ...r, messageCount: r.messageCount + 1 } : r
        )
      );
      setReplyText("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reply failed");
    } finally {
      setSendingReply(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
            ERP · Client Support Operations
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-white">
            Support Desk
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Manage client bug reports, hosting requests, and live support threads stored in D1.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreate(true)}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#ff9f1c] px-4 text-xs font-semibold text-[#07080a] hover:bg-[#ffb043]"
        >
          <Plus size={15} strokeWidth={2.5} />
          <span>New Ticket</span>
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-4">
          <p className="text-xs text-zinc-400">Open</p>
          <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-rose-400">
            {counts.open}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-4">
          <p className="text-xs text-zinc-400">In Progress</p>
          <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-[#ff9f1c]">
            {counts.inProgress}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-4">
          <p className="text-xs text-zinc-400">Active Urgent</p>
          <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-white">
            {counts.urgent}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-4">
          <p className="text-xs text-zinc-400">Resolved / Closed</p>
          <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-emerald-400">
            {counts.resolved}
          </p>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-center justify-between gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-300"
        >
          <span className="flex items-center gap-2">
            <AlertCircle className="size-4 shrink-0" />
            {error}
          </span>
          <button type="button" onClick={() => setError(null)} aria-label="Dismiss error">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Search & Status Filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            aria-label="Search tickets"
            placeholder="Search subject, client, or issue..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-9 w-full rounded-lg border border-white/10 bg-[#0d0f14] pl-8.5 pr-3 text-xs text-white placeholder-zinc-500 outline-none focus:border-[#ff9f1c]/60"
          />
        </div>
        <div className="flex flex-wrap items-center rounded-lg border border-white/10 bg-[#0d0f14] p-0.5 text-[11px]">
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className={`rounded-md px-2.5 py-1 ${
              statusFilter === "all" ? "bg-white/10 font-medium text-white" : "text-zinc-400"
            }`}
          >
            All ({rows.length})
          </button>
          {STATUSES.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`rounded-md px-2.5 py-1 capitalize ${
                statusFilter === st ? "bg-white/10 font-medium text-white" : "text-zinc-400"
              }`}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Master-Detail Split Workspace */}
      {loading ? (
        <div className="flex h-52 items-center justify-center rounded-xl border border-white/10 bg-[#0d0f14]">
          <Loader2 className="size-6 animate-spin text-[#ff9f1c]" />
        </div>
      ) : rows.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#0d0f14] px-6 py-16 text-center">
          <TicketIcon className="mx-auto size-8 text-zinc-600" />
          <p className="mt-3 text-sm font-medium text-zinc-300">No support tickets yet</p>
          <p className="mt-1 text-xs text-zinc-500">
            Click &ldquo;New Ticket&rdquo; to open a client support thread.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Ticket Queue List */}
          <div className="divide-y divide-white/[0.06] overflow-hidden rounded-xl border border-white/10 bg-[#0d0f14] lg:col-span-5">
            {visible.length === 0 ? (
              <p className="p-8 text-center text-xs text-zinc-500">No matching tickets.</p>
            ) : (
              visible.map((row) => {
                const active = row.ticket.id === selectedId;
                return (
                  <button
                    key={row.ticket.id}
                    type="button"
                    onClick={() => setSelectedId(row.ticket.id)}
                    className={`w-full p-4 text-left transition-colors ${
                      active ? "bg-white/[0.05]" : "hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-white">{row.ticket.title}</p>
                      <span
                        className={`shrink-0 font-mono text-[10px] uppercase ${
                          PRIORITY_TONE[row.ticket.priority] ?? "text-zinc-400"
                        }`}
                      >
                        {row.ticket.priority}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-1 text-[11px] text-zinc-400">
                      {row.ticket.description || "No initial description provided."}
                    </p>
                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-zinc-500">
                      <span className="inline-flex items-center gap-1.5 capitalize">
                        <span
                          className={`size-1.5 rounded-full ${
                            STATUS_DOT[row.ticket.status] ?? "bg-zinc-400"
                          }`}
                        />
                        {row.ticket.status.replace("_", " ")}
                        {row.clientCompany || row.clientName
                          ? ` · ${row.clientCompany || row.clientName}`
                          : ""}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono">
                        <MessageSquare className="size-3" />
                        {row.messageCount}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Right Live Conversation Thread Panel */}
          <div className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0d0f14] lg:col-span-7">
            {selectedRow ? (
              <>
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 p-5">
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-base font-bold text-white">
                      {selectedRow.ticket.title}
                    </h2>
                    <p className="mt-1 text-xs text-zinc-400">
                      {selectedRow.clientCompany || selectedRow.clientName || "General Support"} ·
                      Opened {(selectedRow.ticket.createdAt ?? "").slice(0, 10) || "today"}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      aria-label="Ticket priority"
                      value={selectedRow.ticket.priority}
                      onChange={(e) =>
                        patchTicket(selectedRow.ticket.id, { priority: e.target.value })
                      }
                      className="h-8 rounded-lg border border-white/10 bg-[#07080a] px-2.5 text-xs capitalize text-white outline-none focus:border-[#ff9f1c]"
                    >
                      {PRIORITIES.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>

                    <select
                      aria-label="Ticket status"
                      value={selectedRow.ticket.status}
                      onChange={(e) =>
                        patchTicket(selectedRow.ticket.id, { status: e.target.value })
                      }
                      className="h-8 rounded-lg border border-white/10 bg-[#07080a] px-2.5 text-xs capitalize text-white outline-none focus:border-[#ff9f1c]"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s.replace("_", " ")}
                        </option>
                      ))}
                    </select>

                    {confirmDeleteId === selectedRow.ticket.id ? (
                      <>
                        <button
                          type="button"
                          onClick={() => deleteTicket(selectedRow.ticket.id)}
                          className="h-8 rounded-lg border border-red-500/40 bg-red-500/20 px-2.5 text-xs font-semibold text-red-200"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          className="h-8 rounded-lg border border-white/10 px-2 text-xs text-zinc-400"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(selectedRow.ticket.id)}
                        title="Delete ticket"
                        className="flex size-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:border-red-500/40 hover:text-red-400"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Initial Brief + Messages */}
                <div className="flex-1 space-y-3 overflow-y-auto p-5 max-h-[420px]">
                  {selectedRow.ticket.description && (
                    <div className="rounded-lg border border-white/10 bg-[#07080a] p-4">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                        Initial Issue Brief
                      </p>
                      <p className="mt-1.5 whitespace-pre-wrap text-xs leading-relaxed text-zinc-200">
                        {selectedRow.ticket.description}
                      </p>
                    </div>
                  )}

                  {loadingThread ? (
                    <div className="py-8 text-center">
                      <Loader2 className="mx-auto size-4 animate-spin text-[#ff9f1c]" />
                    </div>
                  ) : messages.length === 0 ? (
                    <p className="py-6 text-center text-xs text-zinc-500">
                      No replies yet. Post an engineering update below.
                    </p>
                  ) : (
                    messages.map((m) => (
                      <div
                        key={m.id}
                        className="rounded-lg border border-white/10 bg-white/[0.03] p-3.5"
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-white">
                            {m.senderName || "MLHK Support"}{" "}
                            {m.senderRole && (
                              <span className="font-mono text-[10px] font-normal uppercase text-[#ff9f1c]">
                                · {m.senderRole.replace("_", " ")}
                              </span>
                            )}
                          </span>
                          <span className="font-mono text-[10px] text-zinc-500">
                            {(m.createdAt ?? "").slice(0, 16).replace("T", " ")}
                          </span>
                        </div>
                        <p className="mt-1.5 whitespace-pre-wrap text-xs leading-relaxed text-zinc-200">
                          {m.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                {/* Live Reply Composer */}
                <form
                  onSubmit={sendReply}
                  className="flex items-center gap-2 border-t border-white/10 bg-[#07080a] p-3.5"
                >
                  <input
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a resolution update or internal note..."
                    className="h-9 flex-1 rounded-lg border border-white/10 bg-[#0d0f14] px-3 text-xs text-white placeholder-zinc-500 outline-none focus:border-[#ff9f1c]"
                  />
                  <button
                    type="submit"
                    disabled={sendingReply || !replyText.trim()}
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#ff9f1c] px-4 text-xs font-semibold text-[#07080a] hover:bg-[#ffb043] disabled:opacity-50"
                  >
                    {sendingReply ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      <Send size={13} />
                    )}
                    <span>Send Reply</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center p-12 text-xs text-zinc-500">
                Select a ticket from the queue to inspect its thread.
              </div>
            )}
          </div>
        </div>
      )}

      {/* New Ticket Modal */}
      {showCreate && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ticket-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={() => setShowCreate(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-lg rounded-xl border border-white/15 bg-[#0d0f14] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 id="ticket-modal-title" className="font-display text-base font-bold text-white">
                Open Support Ticket
              </h2>
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                aria-label="Close modal"
                className="rounded-lg p-1 text-zinc-400 hover:bg-white/5 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={createTicket} className="mt-4 space-y-3.5">
              <div>
                <label htmlFor="tkt-title" className="mb-1 block text-xs font-medium text-zinc-300">
                  Subject <span className="text-[#ff9f1c]">*</span>
                </label>
                <input
                  id="tkt-title"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="SSL renewal or checkout webhook issue"
                  className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="tkt-client" className="mb-1 block text-xs font-medium text-zinc-300">
                    Client Account
                  </label>
                  <select
                    id="tkt-client"
                    value={form.clientId}
                    onChange={(e) => setForm({ ...form, clientId: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
                  >
                    <option value="">General / Unassigned</option>
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} {c.company ? `(${c.company})` : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="tkt-priority" className="mb-1 block text-xs font-medium text-zinc-300">
                    Priority
                  </label>
                  <select
                    id="tkt-priority"
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs capitalize text-white outline-none focus:border-[#ff9f1c]"
                  >
                    {PRIORITIES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="tkt-desc" className="mb-1 block text-xs font-medium text-zinc-300">
                  Issue Description
                </label>
                <textarea
                  id="tkt-desc"
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Steps to reproduce, affected URL, or client request details..."
                  className="w-full resize-none rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="rounded-lg border border-white/10 px-4 py-2 text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff9f1c] px-4 py-2 text-xs font-semibold text-[#07080a] hover:bg-[#ffb043] disabled:opacity-50"
                >
                  {creating ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} strokeWidth={2.5} />}
                  <span>Create Ticket</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
