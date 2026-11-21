"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Receipt,
  Search,
  Printer,
  Trash2,
  Loader2,
  AlertCircle,
  X,
} from "lucide-react";
import { computeErpFinancialSummary, formatInr } from "@/lib/erp-utils";

type InvoiceRow = {
  invoice: {
    id: string;
    invoiceNumber: string;
    status: string;
    subtotal: number;
    gstPercent: number;
    total: number;
    dueDate: string | null;
    paidAt: string | null;
    createdAt: string | null;
  };
  clientName: string | null;
  clientCompany: string | null;
  clientGst: string | null;
  projectTitle: string | null;
};

const STATUSES = ["draft", "sent", "paid", "overdue", "cancelled"] as const;

const STATUS_DOT: Record<string, string> = {
  draft: "bg-zinc-400",
  sent: "bg-sky-400",
  paid: "bg-emerald-400",
  overdue: "bg-rose-400",
  cancelled: "bg-zinc-600",
};

export default function InvoicesPage() {
  const [rows, setRows] = useState<InvoiceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setError(null);
    try {
      const res = await fetch("/api/admin/invoices", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load invoices");
      const d = await res.json();
      setRows(Array.isArray(d) ? (d as InvoiceRow[]) : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load invoices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: string, status: string) {
    setRows((prev) =>
      prev.map((r) => (r.invoice.id === id ? { ...r, invoice: { ...r.invoice, status } } : r))
    );
    const res = await fetch("/api/admin/invoices", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) {
      setError("Failed to update invoice status");
      load();
    }
  }

  async function removeInvoice(id: string) {
    setError(null);
    const res = await fetch("/api/admin/invoices", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) {
      setError("Failed to delete invoice");
      return;
    }
    setConfirmDeleteId(null);
    setRows((prev) => prev.filter((r) => r.invoice.id !== id));
  }

  const summary = useMemo(
    () =>
      computeErpFinancialSummary(
        rows.map((r) => r.invoice),
        []
      ),
    [rows]
  );

  const visible = useMemo(() => {
    return rows.filter((r) => {
      if (statusFilter !== "all" && r.invoice.status !== statusFilter) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return [r.invoice.invoiceNumber, r.clientName, r.clientCompany, r.clientGst, r.projectTitle]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q));
    });
  }, [rows, statusFilter, query]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
            ERP · Finance &amp; GST Billing
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-white">
            GST Invoices
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Generate Indian GST-compliant invoices, track receivables, and open print-ready PDF views.
          </p>
        </div>

        <Link
          href="/admin/erp/invoices/new"
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#ff9f1c] px-4 text-xs font-semibold text-[#07080a] transition-colors hover:bg-[#ffb043]"
        >
          <Plus size={15} strokeWidth={2.5} />
          <span>New GST Invoice</span>
        </Link>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-4">
          <p className="text-xs text-zinc-400">Paid Revenue</p>
          <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-emerald-400">
            {formatInr(summary.paidRevenue)}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-4">
          <p className="text-xs text-zinc-400">Pending Remittance</p>
          <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-sky-400">
            {formatInr(summary.pendingReceivables)}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-4">
          <p className="text-xs text-zinc-400">Overdue</p>
          <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-rose-400">
            {formatInr(summary.overdueReceivables)}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-4">
          <p className="text-xs text-zinc-400">Collection Rate</p>
          <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-[#ff9f1c]">
            {summary.collectionRate}%
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

      {/* Search & Status Tabs */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            aria-label="Search invoices"
            placeholder="Search invoice #, client, GSTIN, or project..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-9 w-full rounded-lg border border-white/10 bg-[#0d0f14] pl-8.5 pr-3 text-xs text-white placeholder-zinc-500 outline-none focus:border-[#ff9f1c]/60"
          />
        </div>

        <div className="flex flex-wrap items-center rounded-lg border border-white/10 bg-[#0d0f14] p-0.5 text-[11px]">
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className={`rounded-md px-2.5 py-1 transition-colors ${
              statusFilter === "all"
                ? "bg-white/10 font-medium text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            All ({rows.length})
          </button>
          {STATUSES.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`rounded-md px-2.5 py-1 capitalize transition-colors ${
                statusFilter === st
                  ? "bg-white/10 font-medium text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Ledger Table */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d0f14]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                <th className="px-4 py-3">Invoice #</th>
                <th className="px-4 py-3">Client / Project</th>
                <th className="px-4 py-3 text-right">Subtotal</th>
                <th className="px-4 py-3 text-right">GST</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3">Due Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <Loader2 className="mx-auto size-5 animate-spin text-[#ff9f1c]" />
                  </td>
                </tr>
              ) : visible.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-14 text-center">
                    <Receipt className="mx-auto size-7 text-zinc-600" />
                    <p className="mt-3 text-sm font-medium text-zinc-300">No invoices found</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Click &ldquo;New GST Invoice&rdquo; to issue a tax invoice.
                    </p>
                  </td>
                </tr>
              ) : (
                visible.map(({ invoice, clientName, clientCompany, clientGst, projectTitle }) => (
                  <tr key={invoice.id} className="transition-colors hover:bg-white/[0.02]">
                    <td className="px-4 py-3.5">
                      <Link
                        href={`/admin/erp/invoices/${invoice.id}`}
                        className="font-mono font-semibold text-[#ff9f1c] hover:underline"
                      >
                        {invoice.invoiceNumber}
                      </Link>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="font-medium text-white">
                        {clientCompany || clientName || "Direct Client"}
                      </p>
                      <p className="text-[11px] text-zinc-500">
                        {projectTitle || (clientGst ? `GSTIN: ${clientGst}` : "Standard Billing")}
                      </p>
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono tabular-nums text-zinc-400">
                      {formatInr(invoice.subtotal)}
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono tabular-nums text-zinc-400">
                      {invoice.gstPercent}%
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono font-semibold tabular-nums text-white">
                      {formatInr(invoice.total)}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[11px] text-zinc-400">
                      {invoice.dueDate || "—"}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="inline-flex items-center gap-1.5">
                        <span
                          className={`size-1.5 rounded-full ${
                            STATUS_DOT[invoice.status] ?? "bg-zinc-400"
                          }`}
                        />
                        <select
                          aria-label={`Status for ${invoice.invoiceNumber}`}
                          value={invoice.status}
                          onChange={(e) => updateStatus(invoice.id, e.target.value)}
                          className="rounded-md border border-white/10 bg-[#07080a] px-2 py-1 text-[11px] capitalize text-zinc-200 outline-none focus:border-[#ff9f1c]"
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s} className="bg-[#0d0f14] text-white">
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {confirmDeleteId === invoice.id ? (
                          <>
                            <button
                              type="button"
                              onClick={() => removeInvoice(invoice.id)}
                              className="h-7 rounded-md border border-red-500/40 bg-red-500/20 px-2.5 text-[11px] font-semibold text-red-200"
                            >
                              Confirm
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(null)}
                              className="h-7 rounded-md border border-white/10 px-2 text-[11px] text-zinc-400"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <Link
                              href={`/admin/erp/invoices/${invoice.id}`}
                              title="View / Print GST Tax Invoice"
                              className="inline-flex h-7 items-center gap-1 rounded-md border border-white/10 px-2.5 text-[11px] text-zinc-300 hover:border-white/25 hover:text-white"
                            >
                              <Printer size={12} />
                              <span>Print</span>
                            </Link>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(invoice.id)}
                              title="Delete Invoice"
                              className="flex size-7 items-center justify-center rounded-md border border-white/10 text-zinc-400 hover:border-red-500/40 hover:text-red-400"
                            >
                              <Trash2 size={12} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
