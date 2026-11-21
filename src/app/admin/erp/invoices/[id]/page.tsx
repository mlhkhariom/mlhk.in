"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Printer,
  CheckCircle2,
  Send,
  Trash2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { calculateInvoiceTotals, formatInr } from "@/lib/erp-utils";

type InvoiceDetailResponse = {
  invoice: {
    id: string;
    invoiceNumber: string;
    status: string;
    subtotal: number;
    gstPercent: number;
    total: number;
    dueDate: string | null;
    paidAt: string | null;
    notes: string | null;
    createdAt: string | null;
  };
  client: {
    id: string;
    name: string;
    company: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    gst: string | null;
  } | null;
  project: {
    id: string;
    title: string;
  } | null;
  items: Array<{
    id: string;
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }>;
};

export default function InvoiceDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params?.id;
  const [data, setData] = useState<InvoiceDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    if (!id) return;
    setError(null);
    try {
      const res = await fetch(`/api/admin/invoices/${id}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Invoice not found");
      const json = (await res.json()) as InvoiceDetailResponse;
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load invoice");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const totals = useMemo(() => {
    if (!data) return null;
    return calculateInvoiceTotals(
      data.items.map((i) => ({
        description: i.description,
        quantity: Number(i.quantity ?? 1),
        rate: Number(i.rate ?? 0),
      })),
      Number(data.invoice.gstPercent ?? 18),
      data.client?.gst
    );
  }, [data]);

  async function setStatus(status: string) {
    if (!id) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/invoices/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Status update failed");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setUpdating(false);
    }
  }

  async function deleteInvoice() {
    if (!id) return;
    setUpdating(true);
    const res = await fetch(`/api/admin/invoices/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/erp/invoices");
    } else {
      setError("Failed to delete invoice");
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="size-6 animate-spin text-[#ff9f1c]" />
      </div>
    );
  }

  if (error || !data || !totals) {
    return (
      <div className="mx-auto max-w-2xl rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center text-xs text-red-200">
        <AlertCircle className="mx-auto size-6 text-red-400" />
        <p className="mt-2 font-medium">{error || "Invoice unavailable"}</p>
        <Link
          href="/admin/erp/invoices"
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-white hover:bg-white/10"
        >
          <ArrowLeft size={13} /> Back to Invoices
        </Link>
      </div>
    );
  }

  const { invoice, client, project, items } = data;

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      {/* Control Toolbar (hidden when printing) */}
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link
          href="/admin/erp/invoices"
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-[#0d0f14] px-3 text-xs text-zinc-300 hover:border-white/25 hover:text-white"
        >
          <ArrowLeft size={14} />
          <span>All Invoices</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {invoice.status !== "sent" && invoice.status !== "paid" && (
            <button
              type="button"
              disabled={updating}
              onClick={() => setStatus("sent")}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-[#0d0f14] px-3 text-xs text-zinc-200 hover:border-white/25"
            >
              <Send size={13} className="text-sky-400" />
              <span>Mark Sent</span>
            </button>
          )}
          {invoice.status !== "paid" && (
            <button
              type="button"
              disabled={updating}
              onClick={() => setStatus("paid")}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 text-xs font-medium text-emerald-300 hover:bg-emerald-500/20"
            >
              <CheckCircle2 size={13} />
              <span>Mark Paid</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#ff9f1c] px-4 text-xs font-semibold text-[#07080a] hover:bg-[#ffb043]"
          >
            <Printer size={14} />
            <span>Print / Save PDF</span>
          </button>
          {confirmDelete ? (
            <>
              <button
                type="button"
                disabled={updating}
                onClick={deleteInvoice}
                className="h-9 rounded-lg border border-red-500/40 bg-red-500/20 px-3 text-xs font-semibold text-red-200"
              >
                Confirm Delete
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="h-9 rounded-lg border border-white/10 px-2.5 text-xs text-zinc-400"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              aria-label="Delete invoice"
              className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-[#0d0f14] text-zinc-400 hover:border-red-500/40 hover:text-red-400"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Printable Indian GST Tax Invoice Sheet */}
      <article className="rounded-xl border border-white/10 bg-[#0d0f14] p-7 text-zinc-100 md:p-10 print:rounded-none print:border-0 print:bg-white print:p-6 print:text-black">
        {/* Top Seller & Invoice Number */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-6 sm:flex-row print:border-zinc-300">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff9f1c] print:text-amber-700">
              Tax Invoice
            </p>
            <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-white print:text-black">
              MLHK Infotech
            </h1>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-400 print:text-zinc-700">
              Shajapur HQ &amp; Indore Studio, Madhya Pradesh, India
              <br />
              Phone: +91 91651 00124 · Email: support@mlhk.in · https://mlhk.in
            </p>
            <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-zinc-300 print:text-zinc-800">
              <span>GSTIN: 23CHLPV2868R1CJ</span>
              <span>UDYAM: UDYAM-MP-44-0005223</span>
              <span>SAC: 998314</span>
            </div>
          </div>

          <div className="sm:text-right">
            <p className="font-mono text-lg font-bold text-white print:text-black">
              {invoice.invoiceNumber}
            </p>
            <p className="mt-1 font-mono text-xs uppercase text-[#ff9f1c] print:text-zinc-800">
              Status: {invoice.status}
            </p>
            <div className="mt-3 space-y-1 font-mono text-[11px] text-zinc-400 print:text-zinc-700">
              <p>Issued: {(invoice.createdAt ?? "").slice(0, 10) || "—"}</p>
              <p>Due Date: {invoice.dueDate || "On Receipt"}</p>
              {invoice.paidAt && <p>Paid On: {invoice.paidAt.slice(0, 10)}</p>}
            </div>
          </div>
        </div>

        {/* Bill To & Project Info */}
        <div className="mt-6 grid grid-cols-1 gap-6 border-b border-white/10 pb-6 sm:grid-cols-2 print:border-zinc-300">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-500 print:text-zinc-600">
              Billed To
            </p>
            <p className="mt-1.5 text-sm font-semibold text-white print:text-black">
              {client?.company || client?.name || "Direct Client"}
            </p>
            {client?.company && client?.name && (
              <p className="text-xs text-zinc-300 print:text-zinc-700">Attn: {client.name}</p>
            )}
            {client?.address && (
              <p className="mt-1 text-xs leading-relaxed text-zinc-400 print:text-zinc-700">
                {client.address}
              </p>
            )}
            <div className="mt-2 space-y-0.5 font-mono text-[11px] text-zinc-400 print:text-zinc-700">
              {client?.gst && <p>Client GSTIN: {client.gst.toUpperCase()}</p>}
              {client?.phone && <p>Phone: {client.phone}</p>}
              {client?.email && <p>Email: {client.email}</p>}
            </div>
          </div>

          <div className="sm:text-right">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-500 print:text-zinc-600">
              Engagement Reference
            </p>
            <p className="mt-1.5 text-sm font-semibold text-white print:text-black">
              {project?.title || "IT Services & Digital Engineering"}
            </p>
            <p className="mt-1 text-xs text-zinc-400 print:text-zinc-700">
              Place of Supply:{" "}
              {totals.isIntraStateMp ? "Madhya Pradesh (23) — Intra-State" : "Inter-State (IGST)"}
            </p>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 font-mono text-[10px] uppercase tracking-wider text-zinc-500 print:border-zinc-300 print:text-zinc-700">
                <th className="py-2.5 pr-3">#</th>
                <th className="py-2.5 pr-4">Deliverable / Service Description</th>
                <th className="px-3 py-2.5 text-right">Qty</th>
                <th className="px-3 py-2.5 text-right">Rate (INR)</th>
                <th className="py-2.5 pl-3 text-right">Amount (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] print:divide-zinc-200">
              {items.map((item, idx) => (
                <tr key={item.id}>
                  <td className="py-3 pr-3 font-mono text-zinc-500">{idx + 1}</td>
                  <td className="py-3 pr-4 font-medium text-zinc-100 print:text-black">
                    {item.description}
                  </td>
                  <td className="px-3 py-3 text-right font-mono tabular-nums text-zinc-300 print:text-zinc-800">
                    {item.quantity}
                  </td>
                  <td className="px-3 py-3 text-right font-mono tabular-nums text-zinc-300 print:text-zinc-800">
                    {formatInr(item.rate)}
                  </td>
                  <td className="py-3 pl-3 text-right font-mono font-semibold tabular-nums text-white print:text-black">
                    {formatInr(item.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tax Summary */}
        <div className="mt-6 flex justify-end border-t border-white/10 pt-5 print:border-zinc-300">
          <div className="w-full max-w-xs space-y-2 text-xs">
            <div className="flex justify-between text-zinc-400 print:text-zinc-700">
              <span>Taxable Subtotal</span>
              <span className="font-mono tabular-nums text-zinc-100 print:text-black">
                {formatInr(totals.subtotal)}
              </span>
            </div>
            {totals.isIntraStateMp ? (
              <>
                <div className="flex justify-between text-zinc-400 print:text-zinc-700">
                  <span>CGST ({totals.gstPercent / 2}%)</span>
                  <span className="font-mono tabular-nums text-zinc-100 print:text-black">
                    {formatInr(totals.cgstAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400 print:text-zinc-700">
                  <span>SGST ({totals.gstPercent / 2}%)</span>
                  <span className="font-mono tabular-nums text-zinc-100 print:text-black">
                    {formatInr(totals.sgstAmount)}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex justify-between text-zinc-400 print:text-zinc-700">
                <span>IGST ({totals.gstPercent}%)</span>
                <span className="font-mono tabular-nums text-zinc-100 print:text-black">
                  {formatInr(totals.igstAmount)}
                </span>
              </div>
            )}
            <div className="flex justify-between border-t border-white/15 pt-2.5 text-base font-bold text-white print:border-zinc-400 print:text-black">
              <span>Total Payable</span>
              <span className="font-mono tabular-nums text-[#ff9f1c] print:text-black">
                {formatInr(totals.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Notes & Signatory */}
        <div className="mt-8 grid grid-cols-1 gap-6 border-t border-white/10 pt-6 sm:grid-cols-2 print:border-zinc-300">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Terms &amp; Payment Instructions
            </p>
            <p className="mt-1.5 whitespace-pre-wrap text-xs leading-relaxed text-zinc-400 print:text-zinc-700">
              {invoice.notes ||
                "Thank you for your business. Payments are accepted via NEFT/IMPS/UPI to MLHK Infotech."}
            </p>
          </div>
          <div className="sm:text-right">
            <p className="text-xs font-semibold text-white print:text-black">For MLHK Infotech</p>
            <p className="mt-8 text-xs text-zinc-400 print:text-zinc-700">
              Hariom Vishwkarma · Authorized Signatory
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
