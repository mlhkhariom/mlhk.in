"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Receipt, Loader2, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

type Row = {
  invoice: {
    id: string;
    invoiceNumber: string;
    total: number | null;
    status: string | null;
    dueDate: string | null;
    createdAt: string | null;
  };
  clientName: string | null;
};

const statusStyles: Record<string, { bg: string; text: string; border: string }> = {
  draft: {
    bg: "bg-zinc-500/10",
    text: "text-zinc-400",
    border: "border-zinc-500/20",
  },
  sent: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/20",
  },
  paid: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
  },
  overdue: {
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    border: "border-rose-500/20",
  },
  cancelled: {
    bg: "bg-zinc-800/40",
    text: "text-zinc-500",
    border: "border-zinc-800",
  },
};

export default function InvoicesPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const load = async () => {
    try {
      const res = await fetch("/api/admin/invoices");
      const d = await res.json();
      setRows(Array.isArray(d) ? d : []);
    } catch {
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: string, status: string) {
    setUpdatingId(id);
    try {
      await fetch("/api/admin/invoices", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      load();
    } finally {
      setUpdatingId(null);
    }
  }

  const totalPaid = rows
    .filter((r) => r.invoice.status === "paid")
    .reduce((s, r) => s + (r.invoice.total ?? 0), 0);

  const totalPending = rows
    .filter((r) => r.invoice.status === "sent")
    .reduce((s, r) => s + (r.invoice.total ?? 0), 0);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white">
            Client Invoices & Billing
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Manage billable deliverables, milestones, and invoice settlement statuses.
          </p>
        </div>
        <Link
          href="/admin/erp/invoices/new"
          className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#ff9f1c] px-4 text-xs font-semibold text-black shadow-[0_0_24px_rgba(255,159,28,0.25)] transition-all hover:bg-[#ffb84d] hover:shadow-[0_0_32px_rgba(255,159,28,0.35)]"
        >
          <Plus size={15} strokeWidth={2.5} /> Generate Invoice
        </Link>
      </div>

      {/* Financial Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#0c0d11]/80 p-5 backdrop-blur-md">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider">Total Invoices</span>
            <Receipt className="size-4 text-zinc-500" />
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-white">{rows.length}</p>
          <span className="mt-1 block text-[11px] text-zinc-500">Across all clients</span>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-5 backdrop-blur-md">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-medium uppercase tracking-wider">Paid Settlements</span>
            <CheckCircle2 className="size-4 text-emerald-400" />
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-emerald-400">
            ₹{totalPaid.toLocaleString()}
          </p>
          <span className="mt-1 block text-[11px] text-emerald-500/70">Cleared revenue</span>
        </div>

        <div className="rounded-2xl border border-[#ff9f1c]/20 bg-[#ff9f1c]/[0.03] p-5 backdrop-blur-md">
          <div className="flex items-center justify-between text-[#ffb84d]">
            <span className="text-xs font-medium uppercase tracking-wider">Pending Receivables</span>
            <Clock className="size-4 text-[#ffb84d]" />
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-[#ffb84d]">
            ₹{totalPending.toLocaleString()}
          </p>
          <span className="mt-1 block text-[11px] text-[#ffb84d]/70">Awaiting client payment</span>
        </div>
      </div>

      {/* Main Invoices Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0d11]/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                <th className="px-5 py-3.5">Invoice #</th>
                <th className="px-5 py-3.5">Client</th>
                <th className="px-5 py-3.5">Total Amount</th>
                <th className="px-5 py-3.5">Due Date</th>
                <th className="px-5 py-3.5">Status</th>
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
                      <Receipt className="size-6" />
                    </div>
                    <p className="mt-3 font-medium text-zinc-300">No invoices issued yet</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Generate your first invoice to track client receivables.
                    </p>
                  </td>
                </tr>
              ) : (
                rows.map(({ invoice, clientName }) => {
                  const s = statusStyles[invoice.status ?? "draft"] || statusStyles.draft;
                  return (
                    <tr key={invoice.id} className="group transition-colors hover:bg-white/[0.03]">
                      <td className="px-5 py-3.5 font-mono text-xs font-semibold text-white">
                        {invoice.invoiceNumber}
                      </td>
                      <td className="px-5 py-3.5 font-medium text-zinc-300">
                        {clientName ?? "—"}
                      </td>
                      <td className="px-5 py-3.5 font-semibold text-white">
                        ₹{(invoice.total ?? 0).toLocaleString()}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-zinc-400">
                        {invoice.dueDate ?? "—"}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide ${s.border} ${s.bg} ${s.text}`}
                        >
                          {invoice.status ?? "draft"}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="relative inline-flex items-center">
                          <select
                            disabled={updatingId === invoice.id}
                            value={invoice.status ?? "draft"}
                            onChange={(e) => updateStatus(invoice.id, e.target.value)}
                            className="h-7 cursor-pointer rounded-lg border border-white/10 bg-[#121318] px-2 py-0 text-xs text-white transition-colors focus:border-[#ff9f1c] focus:outline-none disabled:opacity-50"
                          >
                            {["draft", "sent", "paid", "overdue", "cancelled"].map((st) => (
                              <option key={st} value={st} className="bg-[#121318] text-white">
                                {st}
                              </option>
                            ))}
                          </select>
                          {updatingId === invoice.id && (
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
