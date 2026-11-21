"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Search,
  Plus,
  Mail,
  Phone,
  Building,
  MessageSquare,
  CalendarPlus,
  UserCheck,
  Trash2,
  Loader2,
  Check,
  X,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  RefreshCw,
} from "lucide-react";
import {
  LEAD_SOURCES,
  LEAD_STATUSES,
  buildAdminWhatsAppReplyUrl,
  computePipelineMetrics,
  filterCrmLeads,
  parseLeadNotes,
  type CrmLeadRecord,
} from "@/lib/crm-utils";

const STATUS_STYLE: Record<string, { bg: string; text: string; dot: string; border: string; label: string }> = {
  new: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    dot: "bg-blue-400",
    border: "border-blue-500/30",
    label: "New",
  },
  contacted: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    dot: "bg-amber-400",
    border: "border-amber-500/30",
    label: "Contacted",
  },
  proposal: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    dot: "bg-purple-400",
    border: "border-purple-500/30",
    label: "Proposal",
  },
  won: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
    border: "border-emerald-500/30",
    label: "Won",
  },
  lost: {
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    dot: "bg-rose-400",
    border: "border-rose-500/30",
    label: "Lost",
  },
};

export function LeadsWorkspace({
  initialLeads,
  dbWarning,
}: {
  initialLeads: CrmLeadRecord[];
  dbWarning?: string | null;
}) {
  const router = useRouter();
  const [leads, setLeads] = useState<CrmLeadRecord[]>(initialLeads);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(initialLeads[0]?.id ?? null);

  const [busyId, setBusyId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState("");

  const [followUpLeadId, setFollowUpLeadId] = useState<string | null>(null);
  const [followUpNote, setFollowUpNote] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    source: "manual",
    notes: "",
  });

  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const notify = (type: "success" | "error", text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast((cur) => (cur?.text === text ? null : cur)), 3800);
  };

  const metrics = useMemo(() => computePipelineMetrics(leads), [leads]);
  const visibleLeads = useMemo(
    () => filterCrmLeads(leads, { query, status: statusFilter, source: sourceFilter }),
    [leads, query, statusFilter, sourceFilter],
  );

  async function refreshLeads() {
    setRefreshing(true);
    try {
      const res = await fetch("/api/admin/leads", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to reload leads");
      const data = (await res.json()) as CrmLeadRecord[];
      if (Array.isArray(data)) setLeads(data);
    } catch (err) {
      notify("error", err instanceof Error ? err.message : "Could not refresh leads");
    } finally {
      setRefreshing(false);
    }
  }

  async function updateLeadStatus(id: string, status: string) {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(d.error || "Status update failed");
      }
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
      notify("success", `Lead moved to ${status}.`);
      router.refresh();
    } catch (err) {
      notify("error", err instanceof Error ? err.message : "Failed to update lead status");
    } finally {
      setBusyId(null);
    }
  }

  async function saveNotes(id: string) {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: notesDraft }),
      });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(d.error || "Failed to save notes");
      }
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, notes: notesDraft } : l)));
      setEditingNotesId(null);
      notify("success", "CRM notes saved.");
    } catch (err) {
      notify("error", err instanceof Error ? err.message : "Could not save notes");
    } finally {
      setBusyId(null);
    }
  }

  async function convertToClient(id: string) {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/leads/${id}/convert`, { method: "POST" });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(d.error || "Conversion failed");
      }
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: "won" } : l)));
      notify("success", "Lead converted to Client and marked Won!");
      router.refresh();
    } catch (err) {
      notify("error", err instanceof Error ? err.message : "Failed to convert lead");
    } finally {
      setBusyId(null);
    }
  }

  async function scheduleFollowUp(e: React.FormEvent, leadId: string) {
    e.preventDefault();
    if (!followUpNote.trim()) return;
    setBusyId(leadId);
    try {
      const res = await fetch("/api/admin/followups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId,
          note: followUpNote.trim(),
          dueDate: followUpDate || undefined,
        }),
      });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(d.error || "Failed to add follow-up");
      }
      setFollowUpLeadId(null);
      setFollowUpNote("");
      setFollowUpDate("");
      notify("success", "Follow-up scheduled in CRM Reminders.");
    } catch (err) {
      notify("error", err instanceof Error ? err.message : "Failed to schedule follow-up");
    } finally {
      setBusyId(null);
    }
  }

  async function deleteLead(id: string) {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(d.error || "Delete failed");
      }
      setLeads((prev) => prev.filter((l) => l.id !== id));
      setConfirmDeleteId(null);
      if (expandedId === id) setExpandedId(null);
      notify("success", "Lead deleted.");
    } catch (err) {
      notify("error", err instanceof Error ? err.message : "Could not delete lead");
    } finally {
      setBusyId(null);
    }
  }

  async function createLead(e: React.FormEvent) {
    e.preventDefault();
    if (!newLead.name.trim()) return;
    setCreating(true);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLead),
      });
      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        lead?: CrmLeadRecord;
        error?: string;
      };
      if (!res.ok || !data.lead) {
        throw new Error(data.error || "Failed to create lead");
      }
      setLeads((prev) => [data.lead!, ...prev]);
      setExpandedId(data.lead.id);
      setNewLead({ name: "", phone: "", email: "", company: "", source: "manual", notes: "" });
      setShowAddModal(false);
      notify("success", "New lead added to CRM.");
    } catch (err) {
      notify("error", err instanceof Error ? err.message : "Failed to add lead");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
            CRM · Sales Pipeline
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-white">
            Leads Pipeline
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Website popup inquiries, contact forms, and manual phone/WhatsApp leads synced in real time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={refreshLeads}
            disabled={refreshing}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-[#0d0f14] px-3.5 text-xs font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white disabled:opacity-50"
          >
            <RefreshCw className={`size-3.5 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#ff9f1c] px-4 text-xs font-semibold text-[#07080a] transition-colors hover:bg-[#ffb043]"
          >
            <Plus size={15} strokeWidth={2.5} /> Add Lead
          </button>
        </div>
      </div>

      {dbWarning && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-200">
          {dbWarning}
        </div>
      )}

      {toast && (
        <div
          className={`flex items-center justify-between rounded-xl border px-4 py-3 text-xs font-medium ${
            toast.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
              : "border-rose-500/30 bg-rose-500/10 text-rose-200"
          }`}
        >
          <span>{toast.text}</span>
          <button type="button" onClick={() => setToast(null)} className="text-current opacity-70 hover:opacity-100">
            <X className="size-3.5" />
          </button>
        </div>
      )}

      {/* Pipeline KPI Strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {[
          { label: "Total Leads", value: metrics.total, tone: "text-white", filter: "all" },
          { label: "New Inbox", value: metrics.newCount, tone: "text-blue-400", filter: "new" },
          { label: "Contacted", value: metrics.contactedCount, tone: "text-amber-400", filter: "contacted" },
          { label: "Proposal", value: metrics.proposalCount, tone: "text-purple-400", filter: "proposal" },
          { label: "Won", value: metrics.wonCount, tone: "text-emerald-400", filter: "won" },
          { label: "Win Rate", value: `${metrics.conversionRate}%`, tone: "text-[#ffb84d]", filter: null },
        ].map((kpi) => (
          <button
            key={kpi.label}
            type="button"
            disabled={kpi.filter === null}
            onClick={() => kpi.filter !== null && setStatusFilter(kpi.filter)}
            className={`rounded-xl border p-4 text-left transition-colors ${
              kpi.filter && statusFilter === kpi.filter
                ? "border-[#ff9f1c]/50 bg-[#ff9f1c]/[0.08]"
                : "border-white/10 bg-[#0d0f14] hover:border-white/20"
            }`}
          >
            <p className="text-[11px] font-medium text-zinc-400">{kpi.label}</p>
            <p className={`mt-1.5 font-mono text-2xl font-bold tabular-nums ${kpi.tone}`}>
              {kpi.value}
            </p>
          </button>
        ))}
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-[#0d0f14] p-3.5 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-zinc-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, phone, email, city, service, or REF ID..."
            className="h-9 w-full rounded-lg border border-white/10 bg-[#07080a] pl-8.5 pr-3 text-xs text-white placeholder:text-zinc-500 focus:border-[#ff9f1c] focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
            className="h-9 rounded-xl border border-white/10 bg-[#121318] px-3 text-xs text-white focus:border-[#ff9f1c] focus:outline-none"
          >
            <option value="all">All Statuses</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_STYLE[s]?.label ?? s}
              </option>
            ))}
          </select>
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            aria-label="Filter by source"
            className="h-9 rounded-xl border border-white/10 bg-[#121318] px-3 text-xs text-white focus:border-[#ff9f1c] focus:outline-none"
          >
            <option value="all">All Sources</option>
            {LEAD_SOURCES.map((src) => (
              <option key={src} value={src}>
                {src}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Leads List */}
      <div className="space-y-3">
        {visibleLeads.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#0c0d11]/80 px-6 py-14 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-zinc-500">
              <Users className="size-6" />
            </div>
            <p className="mt-3 font-medium text-zinc-300">No matching leads found</p>
            <p className="mt-1 text-xs text-zinc-500">
              Website Contact Now popup inquiries and contact form submissions appear here in real time.
            </p>
          </div>
        ) : (
          visibleLeads.map((lead) => {
            const s = STATUS_STYLE[lead.status ?? "new"] || STATUS_STYLE.new;
            const parsed = parseLeadNotes(lead.notes);
            const isExpanded = expandedId === lead.id;
            const waReplyUrl = buildAdminWhatsAppReplyUrl(lead);
            const isBusy = busyId === lead.id;

            return (
              <div
                key={lead.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0d11]/90 transition-colors hover:border-white/20"
              >
                {/* Summary Row */}
                <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : lead.id)}
                        className="flex items-center gap-1.5 text-left font-display text-base font-bold text-white hover:text-[#ffb84d]"
                      >
                        <span>{lead.name}</span>
                        {isExpanded ? <ChevronUp className="size-4 text-zinc-400" /> : <ChevronDown className="size-4 text-zinc-400" />}
                      </button>

                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${s.border} ${s.bg} ${s.text}`}>
                        <span className={`size-1.5 rounded-full ${s.dot}`} />
                        {s.label}
                      </span>

                      <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] text-zinc-400">
                        {lead.source ?? "website"}
                      </span>

                      {parsed.referenceId && (
                        <span className="font-mono text-[11px] text-[#ffb84d]">
                          {parsed.referenceId}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
                      {lead.phone && (
                        <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-1 hover:text-white">
                          <Phone className="size-3 text-zinc-500" />
                          {lead.phone}
                        </a>
                      )}
                      {lead.email && (
                        <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1 hover:text-white">
                          <Mail className="size-3 text-zinc-500" />
                          {lead.email}
                        </a>
                      )}
                      {lead.company && (
                        <span className="inline-flex items-center gap-1">
                          <Building className="size-3 text-zinc-500" />
                          {lead.company}
                        </span>
                      )}
                      {parsed.city && (
                        <span className="text-zinc-300">City: {parsed.city}</span>
                      )}
                      {parsed.service && (
                        <span className="text-[#ffb84d]">{parsed.service}</span>
                      )}
                      {parsed.budget && (
                        <span className="font-mono text-zinc-300">{parsed.budget}</span>
                      )}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    {waReplyUrl && (
                      <a
                        href={waReplyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 text-xs font-medium text-emerald-300 transition-colors hover:bg-emerald-500/20"
                      >
                        <MessageSquare className="size-3.5" />
                        WhatsApp
                      </a>
                    )}

                    <select
                      disabled={isBusy}
                      value={lead.status ?? "new"}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                      className="h-8 cursor-pointer rounded-lg border border-white/10 bg-[#121318] px-2.5 text-xs text-white focus:border-[#ff9f1c] focus:outline-none disabled:opacity-50"
                    >
                      {LEAD_STATUSES.map((st) => (
                        <option key={st} value={st} className="bg-[#121318] text-white">
                          {STATUS_STYLE[st]?.label ?? st}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : lead.id)}
                      className="h-8 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 text-xs font-medium text-zinc-300 hover:bg-white/10 hover:text-white"
                    >
                      {isExpanded ? "Hide" : "Details"}
                    </button>
                  </div>
                </div>

                {/* Expanded CRM Workspace Details */}
                {isExpanded && (
                  <div className="space-y-4 border-t border-white/10 bg-[#08090c] p-4 sm:p-5">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                      {/* Parsed Inquiry Context */}
                      <div className="space-y-3 lg:col-span-7">
                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-400">
                          {lead.createdAt && (
                            <span className="font-mono">Captured: {lead.createdAt.slice(0, 16).replace("T", " ")}</span>
                          )}
                          {parsed.sourcePage && (
                            <a
                              href={parsed.sourcePage}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[#ffb84d] hover:underline"
                            >
                              Page: {parsed.sourcePage}
                              <ExternalLink className="size-3" />
                            </a>
                          )}
                        </div>

                        {editingNotesId === lead.id ? (
                          <div className="space-y-2">
                            <textarea
                              rows={4}
                              value={notesDraft}
                              onChange={(e) => setNotesDraft(e.target.value)}
                              className="w-full rounded-xl border border-white/15 bg-white/[0.04] p-3 text-xs text-white focus:border-[#ff9f1c] focus:outline-none"
                            />
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                disabled={isBusy}
                                onClick={() => saveNotes(lead.id)}
                                className="inline-flex items-center gap-1 rounded-lg bg-[#ff9f1c] px-3 py-1.5 text-xs font-semibold text-black hover:bg-[#ffb84d]"
                              >
                                {isBusy ? <Loader2 className="size-3 animate-spin" /> : <Check className="size-3" />}
                                Save Notes
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingNotesId(null)}
                                className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-zinc-400 hover:text-white"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                            <div className="flex items-center justify-between">
                              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                                Inquiry Brief &amp; Internal Notes
                              </p>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingNotesId(lead.id);
                                  setNotesDraft(lead.notes ?? "");
                                }}
                                className="text-xs font-medium text-[#ffb84d] hover:underline"
                              >
                                Edit Notes
                              </button>
                            </div>
                            <p className="mt-2 whitespace-pre-wrap text-xs leading-relaxed text-zinc-200">
                              {parsed.message || lead.notes || "No notes recorded yet."}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* CRM Actions Column */}
                      <div className="flex flex-col justify-between gap-3 lg:col-span-5">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setFollowUpLeadId(followUpLeadId === lead.id ? null : lead.id);
                              setFollowUpNote(`Follow up with ${lead.name}${parsed.service ? ` on ${parsed.service}` : ""}`);
                            }}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-zinc-200 hover:border-[#ff9f1c]/40 hover:text-white"
                          >
                            <CalendarPlus className="size-3.5 text-[#ffb84d]" />
                            Schedule Follow-up
                          </button>

                          {lead.status !== "won" && (
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => convertToClient(lead.id)}
                              className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-300 hover:bg-emerald-500/20 disabled:opacity-50"
                            >
                              <UserCheck className="size-3.5" />
                              Convert to Client
                            </button>
                          )}

                          {confirmDeleteId === lead.id ? (
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                type="button"
                                disabled={isBusy}
                                onClick={() => deleteLead(lead.id)}
                                className="rounded-xl border border-rose-500/40 bg-rose-500/20 px-3 py-2 text-xs font-semibold text-rose-200 hover:bg-rose-500/30"
                              >
                                Confirm Delete
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteId(null)}
                                className="rounded-xl border border-white/10 px-2.5 py-2 text-xs text-zinc-400"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(lead.id)}
                              className="inline-flex items-center gap-1.5 rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-xs font-medium text-rose-300 hover:bg-rose-500/20"
                            >
                              <Trash2 className="size-3.5" />
                              Delete
                            </button>
                          )}
                        </div>

                        {followUpLeadId === lead.id && (
                          <form
                            onSubmit={(e) => scheduleFollowUp(e, lead.id)}
                            className="space-y-2.5 rounded-xl border border-[#ff9f1c]/30 bg-[#ff9f1c]/[0.05] p-3"
                          >
                            <input
                              required
                              value={followUpNote}
                              onChange={(e) => setFollowUpNote(e.target.value)}
                              placeholder="Callback or proposal reminder..."
                              className="w-full rounded-lg border border-white/10 bg-[#0b0c10] px-3 py-2 text-xs text-white focus:border-[#ff9f1c] focus:outline-none"
                            />
                            <div className="flex items-center gap-2">
                              <input
                                type="date"
                                value={followUpDate}
                                onChange={(e) => setFollowUpDate(e.target.value)}
                                className="flex-1 rounded-lg border border-white/10 bg-[#0b0c10] px-2.5 py-1.5 text-xs text-white focus:border-[#ff9f1c] focus:outline-none"
                              />
                              <button
                                type="submit"
                                disabled={isBusy}
                                className="rounded-lg bg-[#ff9f1c] px-3 py-1.5 text-xs font-semibold text-black hover:bg-[#ffb84d]"
                              >
                                Save
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Add Manual Lead Modal */}
      {showAddModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAddModal(false);
          }}
        >
          <div className="w-full max-w-lg rounded-2xl border border-white/15 bg-[#0c0d11] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="font-display text-lg font-bold text-white">Add Manual CRM Lead</h2>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-white/10 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>
            <form onSubmit={createLead} className="mt-4 space-y-3.5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-300">Name *</label>
                  <input
                    required
                    value={newLead.name}
                    onChange={(e) => setNewLead((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Client / Prospect Name"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white focus:border-[#ff9f1c] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-300">Phone / WhatsApp</label>
                  <input
                    value={newLead.phone}
                    onChange={(e) => setNewLead((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="+91 98XXX XXXXX"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white focus:border-[#ff9f1c] focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-300">Email</label>
                  <input
                    type="email"
                    value={newLead.email}
                    onChange={(e) => setNewLead((f) => ({ ...f, email: e.target.value }))}
                    placeholder="client@company.in"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white focus:border-[#ff9f1c] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-300">Company / Shop</label>
                  <input
                    value={newLead.company}
                    onChange={(e) => setNewLead((f) => ({ ...f, company: e.target.value }))}
                    placeholder="Business name"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white focus:border-[#ff9f1c] focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-300">Lead Source</label>
                <select
                  value={newLead.source}
                  onChange={(e) => setNewLead((f) => ({ ...f, source: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-[#121318] px-3 py-2 text-xs text-white focus:border-[#ff9f1c] focus:outline-none"
                >
                  {LEAD_SOURCES.map((src) => (
                    <option key={src} value={src}>
                      {src}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-300">Requirement Notes</label>
                <textarea
                  rows={3}
                  value={newLead.notes}
                  onChange={(e) => setNewLead((f) => ({ ...f, notes: e.target.value }))}
                  placeholder="Service requested, city, budget estimate..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white focus:border-[#ff9f1c] focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#ff9f1c] px-5 py-2 text-xs font-semibold text-black hover:bg-[#ffb84d] disabled:opacity-50"
                >
                  {creating ? <Loader2 className="size-3.5 animate-spin" /> : <Check className="size-3.5" />}
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
