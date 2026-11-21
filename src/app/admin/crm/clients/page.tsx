"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Mail,
  Phone,
  Building2,
  MapPin,
  Receipt,
  FolderKanban,
  MessageSquare,
  X,
  Check,
  Loader2,
  AlertCircle,
  Users,
} from "lucide-react";

type ClientRecord = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  address: string | null;
  gst: string | null;
  notes: string | null;
  createdAt: string | null;
};

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  company: "",
  address: "",
  gst: "",
  notes: "",
};

function buildWhatsAppLink(phone: string | null, name: string) {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10) return null;
  const normalized = digits.length === 10 ? `91${digits}` : digits;
  const text = encodeURIComponent(`Namaste ${name} ji, writing from MLHK Infotech regarding your project.`);
  return `https://wa.me/${normalized}?text=${text}`;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [gstFilter, setGstFilter] = useState<"all" | "gst" | "non_gst">("all");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setError(null);
    try {
      const res = await fetch("/api/admin/clients", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load clients");
      const d = await res.json();
      setClients(Array.isArray(d) ? (d as ClientRecord[]) : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load clients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!showModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showModal]);

  function openNew() {
    setEditId(null);
    setForm(EMPTY_FORM);
    setError(null);
    setShowModal(true);
  }

  function openEdit(c: ClientRecord) {
    setEditId(c.id);
    setForm({
      name: c.name ?? "",
      email: c.email ?? "",
      phone: c.phone ?? "",
      company: c.company ?? "",
      address: c.address ?? "",
      gst: c.gst ?? "",
      notes: c.notes ?? "",
    });
    setError(null);
    setShowModal(true);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const payload = editId ? { id: editId, ...form } : form;
      const res = await fetch("/api/admin/clients", {
        method: editId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(d.error || "Failed to save client");
      }
      setShowModal(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save client");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    setDeletingId(id);
    setError(null);
    try {
      const res = await fetch("/api/admin/clients", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(d.error || "Failed to delete client");
      }
      setConfirmDeleteId(null);
      setClients((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeletingId(null);
    }
  }

  const gstCount = useMemo(() => clients.filter((c) => Boolean(c.gst?.trim())).length, [clients]);
  const companyCount = useMemo(() => clients.filter((c) => Boolean(c.company?.trim())).length, [clients]);
  const contactableCount = useMemo(
    () => clients.filter((c) => Boolean(c.phone?.trim() || c.email?.trim())).length,
    [clients]
  );

  const visible = useMemo(() => {
    return clients.filter((c) => {
      if (gstFilter === "gst" && !c.gst?.trim()) return false;
      if (gstFilter === "non_gst" && c.gst?.trim()) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return [c.name, c.company, c.email, c.phone, c.gst, c.address]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q));
    });
  }, [clients, gstFilter, query]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
            CRM · Account Directory
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-white">
            Clients &amp; Organizations
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Manage billing profiles, GSTIN credentials, and direct links to projects and invoices.
          </p>
        </div>
        <button
          type="button"
          onClick={openNew}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#ff9f1c] px-4 text-xs font-semibold text-[#07080a] transition-colors hover:bg-[#ffb043]"
        >
          <Plus size={15} strokeWidth={2.5} />
          <span>Add Client</span>
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-4">
          <p className="text-xs text-zinc-400">Total Clients</p>
          <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-white">
            {clients.length}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-4">
          <p className="text-xs text-zinc-400">GST Registered (B2B)</p>
          <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-emerald-400">
            {gstCount}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-4">
          <p className="text-xs text-zinc-400">Organizations</p>
          <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-sky-400">
            {companyCount}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-4">
          <p className="text-xs text-zinc-400">Reachable Contacts</p>
          <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-[#ff9f1c]">
            {contactableCount}
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

      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            aria-label="Search clients"
            placeholder="Search by name, company, GSTIN, phone, or email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-9 w-full rounded-lg border border-white/10 bg-[#0d0f14] pl-8.5 pr-3 text-xs text-white placeholder-zinc-500 outline-none focus:border-[#ff9f1c]/60"
          />
        </div>

        <div className="flex items-center rounded-lg border border-white/10 bg-[#0d0f14] p-0.5 text-[11px]">
          {[
            { id: "all", label: "All Clients" },
            { id: "gst", label: "With GSTIN" },
            { id: "non_gst", label: "Individual / Non-GST" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setGstFilter(tab.id as "all" | "gst" | "non_gst")}
              className={`rounded-md px-2.5 py-1 transition-colors ${
                gstFilter === tab.id
                  ? "bg-white/10 font-medium text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Directory List */}
      {loading ? (
        <div className="flex h-44 items-center justify-center rounded-xl border border-white/10 bg-[#0d0f14]">
          <Loader2 className="size-6 animate-spin text-[#ff9f1c]" />
        </div>
      ) : visible.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#0d0f14] px-6 py-14 text-center">
          <Users className="mx-auto size-8 text-zinc-600" />
          <p className="mt-3 text-sm font-medium text-zinc-300">No clients match your view</p>
          <p className="mt-1 text-xs text-zinc-500">
            Convert a won lead from CRM Leads or click &ldquo;Add Client&rdquo; to register an account.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {visible.map((client) => {
            const waUrl = buildWhatsAppLink(client.phone, client.name);
            const isMpGst = Boolean(client.gst?.trim().toUpperCase().startsWith("23"));

            return (
              <div
                key={client.id}
                className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#0d0f14] p-5 transition-colors hover:border-white/20"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="truncate font-display text-base font-bold text-white">
                        {client.name}
                      </h2>
                      {client.company && (
                        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-zinc-400">
                          <Building2 className="size-3.5 text-zinc-500" />
                          <span className="truncate">{client.company}</span>
                        </p>
                      )}
                    </div>
                    {client.gst && (
                      <span
                        title={isMpGst ? "Intra-state MP (CGST + SGST)" : "Inter-state (IGST)"}
                        className="shrink-0 font-mono text-[11px] text-emerald-400"
                      >
                        GST: {client.gst.toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div className="mt-3.5 space-y-1.5 text-xs text-zinc-400">
                    {client.phone && (
                      <a
                        href={`tel:${client.phone}`}
                        className="flex items-center gap-2 hover:text-white"
                      >
                        <Phone className="size-3.5 text-zinc-500" />
                        <span className="font-mono">{client.phone}</span>
                      </a>
                    )}
                    {client.email && (
                      <a
                        href={`mailto:${client.email}`}
                        className="flex items-center gap-2 hover:text-white"
                      >
                        <Mail className="size-3.5 text-zinc-500" />
                        <span className="truncate">{client.email}</span>
                      </a>
                    )}
                    {client.address && (
                      <p className="flex items-start gap-2 text-zinc-500">
                        <MapPin className="mt-0.5 size-3.5 shrink-0" />
                        <span className="line-clamp-2">{client.address}</span>
                      </p>
                    )}
                    {client.notes && (
                      <p className="mt-2 border-t border-white/[0.06] pt-2 text-[11px] text-zinc-400 line-clamp-2">
                        {client.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Footer */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-3.5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {waUrl && (
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-7 items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 text-[11px] font-medium text-emerald-300 hover:bg-emerald-500/20"
                      >
                        <MessageSquare className="size-3" />
                        WhatsApp
                      </a>
                    )}
                    <Link
                      href={`/admin/erp/invoices/new?clientId=${client.id}`}
                      className="inline-flex h-7 items-center gap-1 rounded-md border border-white/10 px-2.5 text-[11px] text-zinc-300 hover:border-white/25 hover:text-white"
                    >
                      <Receipt className="size-3 text-[#ff9f1c]" />
                      Bill GST
                    </Link>
                    <Link
                      href="/admin/erp/projects"
                      className="inline-flex h-7 items-center gap-1 rounded-md border border-white/10 px-2.5 text-[11px] text-zinc-300 hover:border-white/25 hover:text-white"
                    >
                      <FolderKanban className="size-3 text-sky-400" />
                      Projects
                    </Link>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {confirmDeleteId === client.id ? (
                      <>
                        <button
                          type="button"
                          onClick={() => remove(client.id)}
                          disabled={deletingId === client.id}
                          className="h-7 rounded-md border border-red-500/40 bg-red-500/20 px-2.5 text-[11px] font-semibold text-red-200 hover:bg-red-500/30"
                        >
                          {deletingId === client.id ? "..." : "Confirm"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          className="h-7 rounded-md border border-white/10 px-2 text-[11px] text-zinc-400 hover:text-white"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => openEdit(client)}
                          title="Edit Client"
                          className="flex size-7 items-center justify-center rounded-md border border-white/10 text-zinc-400 hover:border-white/25 hover:text-[#ff9f1c]"
                        >
                          <Pencil size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(client.id)}
                          title="Delete Client"
                          className="flex size-7 items-center justify-center rounded-md border border-white/10 text-zinc-400 hover:border-red-500/40 hover:text-red-400"
                        >
                          <Trash2 size={12} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Client Modal */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="client-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={() => setShowModal(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-xl rounded-xl border border-white/15 bg-[#0d0f14] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 id="client-modal-title" className="font-display text-base font-bold text-white">
                {editId ? "Edit Client Profile" : "Register New Client"}
              </h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label="Close modal"
                className="rounded-lg p-1 text-zinc-400 hover:bg-white/5 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={save} className="mt-4 space-y-3.5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="client-name" className="mb-1 block text-xs font-medium text-zinc-300">
                    Full Name <span className="text-[#ff9f1c]">*</span>
                  </label>
                  <input
                    id="client-name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Rajesh Sharma"
                    className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
                  />
                </div>
                <div>
                  <label htmlFor="client-company" className="mb-1 block text-xs font-medium text-zinc-300">
                    Company / Organization
                  </label>
                  <input
                    id="client-company"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Malwa Agro Exports Pvt. Ltd."
                    className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="client-phone" className="mb-1 block text-xs font-medium text-zinc-300">
                    Phone / WhatsApp
                  </label>
                  <input
                    id="client-phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98XXX XXXXX"
                    className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
                  />
                </div>
                <div>
                  <label htmlFor="client-email" className="mb-1 block text-xs font-medium text-zinc-300">
                    Email Address
                  </label>
                  <input
                    id="client-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="billing@company.in"
                    className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="client-gst" className="mb-1 block text-xs font-medium text-zinc-300">
                  GSTIN (State code 23 = MP CGST/SGST · Other = IGST)
                </label>
                <input
                  id="client-gst"
                  value={form.gst}
                  onChange={(e) => setForm({ ...form, gst: e.target.value.toUpperCase() })}
                  placeholder="23AABCU9603R1ZM"
                  className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 font-mono text-xs uppercase text-white outline-none focus:border-[#ff9f1c]"
                />
              </div>

              <div>
                <label htmlFor="client-address" className="mb-1 block text-xs font-medium text-zinc-300">
                  Billing Address
                </label>
                <textarea
                  id="client-address"
                  rows={2}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Vijay Nagar, Indore, Madhya Pradesh 452010"
                  className="w-full resize-none rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
                />
              </div>

              <div>
                <label htmlFor="client-notes" className="mb-1 block text-xs font-medium text-zinc-300">
                  Account Notes
                </label>
                <textarea
                  id="client-notes"
                  rows={2}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="AMC details, preferred contact timings, domain renewal notes..."
                  className="w-full resize-none rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg border border-white/10 px-4 py-2 text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff9f1c] px-4 py-2 text-xs font-semibold text-[#07080a] hover:bg-[#ffb043] disabled:opacity-50"
                >
                  {saving ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} strokeWidth={2.5} />}
                  <span>{editId ? "Update Client" : "Save Client"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
