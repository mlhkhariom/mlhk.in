"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ArrowLeft, Loader2, Check, Receipt } from "lucide-react";
import Link from "next/link";

type LineItem = { description: string; quantity: number; rate: number };
type Client = {
  id: string;
  name: string;
  company: string | null;
  gst: string | null;
  address: string | null;
};

export default function NewInvoicePage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [form, setForm] = useState({ clientId: "", gstPercent: 18, dueDate: "", notes: "" });
  const [items, setItems] = useState<LineItem[]>([{ description: "", quantity: 1, rate: 0 }]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/clients")
      .then((r) => r.json())
      .then((d: unknown) => setClients(Array.isArray(d) ? (d as Client[]) : []))
      .catch(() => setClients([]));
  }, []);

  const subtotal = items.reduce((s, i) => s + i.quantity * i.rate, 0);
  const gstAmt = Math.round((subtotal * form.gstPercent) / 100);
  const total = subtotal + gstAmt;
  const selectedClient = clients.find((c) => c.id === form.clientId);

  function updateItem(i: number, k: keyof LineItem, v: string | number) {
    setItems((arr) =>
      arr.map((item, idx) => (idx === i ? { ...item, [k]: v } : item))
    );
  }

  async function save() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error((d as { error?: string })?.error || "Failed to create invoice");
      }
      router.push("/admin/erp/invoices");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error creating invoice");
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/erp/invoices"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft size={14} /> Back to Invoices
        </Link>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0c0d11]/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md md:p-8">
        <div className="flex items-center gap-2.5 border-b border-white/10 pb-5">
          <span className="flex size-8 items-center justify-center rounded-xl border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 text-[#ffb84d]">
            <Receipt size={16} />
          </span>
          <div>
            <h1 className="font-display text-xl font-bold text-white">Generate Client Invoice</h1>
            <p className="text-xs text-zinc-400">
              Create an itemized tax invoice with automated GST and balance calculation.
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
            {error}
          </div>
        )}

        <div className="mt-6 space-y-6">
          {/* Client & Date Selector */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-zinc-300">
                Client Entity <span className="text-[#ff9f1c]">*</span>
              </label>
              <select
                value={form.clientId}
                onChange={(e) => setForm((f) => ({ ...f, clientId: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-[#121318] px-3.5 py-2.5 text-xs text-white transition-colors focus:border-[#ff9f1c] focus:outline-none focus:ring-1 focus:ring-[#ff9f1c]"
              >
                <option value="" className="bg-[#121318] text-white">Select client...</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#121318] text-white">
                    {c.name} {c.company ? `— ${c.company}` : ""}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-zinc-300">
                Settlement Due Date
              </label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white transition-colors focus:border-[#ff9f1c] focus:outline-none focus:ring-1 focus:ring-[#ff9f1c]"
              />
            </div>
          </div>

          {/* Selected Client Card */}
          {selectedClient && (
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs text-zinc-300">
              <p className="font-semibold text-white">{selectedClient.name}</p>
              {selectedClient.company && <p className="text-zinc-400">{selectedClient.company}</p>}
              {selectedClient.address && <p className="text-zinc-400">{selectedClient.address}</p>}
              {selectedClient.gst && (
                <p className="mt-1 font-mono text-[11px] text-[#ffb84d]">
                  GSTIN: {selectedClient.gst}
                </p>
              )}
            </div>
          )}

          {/* Line Items */}
          <div>
            <div className="mb-2 grid grid-cols-12 gap-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              <span className="col-span-6">Deliverable / Description</span>
              <span className="col-span-2 text-center">Qty</span>
              <span className="col-span-2 text-right">Rate (₹)</span>
              <span className="col-span-2 text-right">Amount</span>
            </div>

            <div className="space-y-2">
              {items.map((item, i) => (
                <div key={i} className="grid grid-cols-12 items-center gap-2">
                  <input
                    value={item.description}
                    onChange={(e) => updateItem(i, "description", e.target.value)}
                    placeholder="e.g. Next.js Cloudflare Edge Migration"
                    className="col-span-6 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white placeholder-zinc-500 transition-colors focus:border-[#ff9f1c] focus:outline-none"
                  />
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateItem(i, "quantity", Number(e.target.value))}
                    className="col-span-2 rounded-xl border border-white/10 bg-white/[0.04] px-2 py-2 text-center text-xs text-white transition-colors focus:border-[#ff9f1c] focus:outline-none"
                  />
                  <input
                    type="number"
                    min={0}
                    value={item.rate}
                    onChange={(e) => updateItem(i, "rate", Number(e.target.value))}
                    className="col-span-2 rounded-xl border border-white/10 bg-white/[0.04] px-2 py-2 text-right text-xs text-white transition-colors focus:border-[#ff9f1c] focus:outline-none"
                  />
                  <div className="col-span-1 text-right text-xs font-semibold text-white">
                    ₹{(item.quantity * item.rate).toLocaleString()}
                  </div>
                  <button
                    type="button"
                    onClick={() => setItems((arr) => arr.filter((_, idx) => idx !== i))}
                    className="col-span-1 flex justify-center text-zinc-500 transition-colors hover:text-red-400"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setItems((arr) => [...arr, { description: "", quantity: 1, rate: 0 }])}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#ffb84d] transition-colors hover:text-white"
            >
              <Plus size={14} /> Add Line Item
            </button>
          </div>

          {/* Totals Summary */}
          <div className="space-y-2 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span className="font-medium text-white">₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-zinc-400">
              <div className="flex items-center gap-2">
                <span>GST Tax</span>
                <select
                  value={form.gstPercent}
                  onChange={(e) => setForm((f) => ({ ...f, gstPercent: Number(e.target.value) }))}
                  className="rounded-lg border border-white/10 bg-[#121318] px-2 py-0.5 text-xs text-white focus:border-[#ff9f1c] focus:outline-none"
                >
                  {[0, 5, 12, 18, 28].map((g) => (
                    <option key={g} value={g} className="bg-[#121318] text-white">
                      {g}%
                    </option>
                  ))}
                </select>
              </div>
              <span className="font-medium text-white">₹{gstAmt.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-2 text-sm font-bold text-white">
              <span>Total Payable</span>
              <span className="text-[#ffb84d]">₹{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-zinc-300">
              Payment Terms & Bank Details
            </label>
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              placeholder="Payment terms: Net 15 days. Bank: HDFC Bank, A/C: 5020..., IFSC: HDFC000..."
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 transition-colors focus:border-[#ff9f1c] focus:outline-none focus:ring-1 focus:ring-[#ff9f1c]"
            />
          </div>

          {/* Submit */}
          <button
            onClick={save}
            disabled={saving || items.every((i) => !i.description)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#ff9f1c] px-6 py-2.5 text-xs font-semibold text-black shadow-[0_0_24px_rgba(255,159,28,0.25)] transition-all hover:bg-[#ffb84d] disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Generating...
              </>
            ) : (
              <>
                <Check size={14} strokeWidth={2.5} /> Generate Invoice
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
