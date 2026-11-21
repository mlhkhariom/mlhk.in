"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Trash2, ArrowLeft, Check, Loader2, AlertCircle } from "lucide-react";
import { calculateInvoiceTotals, formatInr } from "@/lib/erp-utils";

type Client = { id: string; name: string; company: string | null; gst: string | null };
type ProjectRow = { project: { id: string; title: string; clientId: string | null } };
type LineItem = { description: string; quantity: number; rate: number };

export default function NewInvoicePage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [clientId, setClientId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [status, setStatus] = useState("sent");
  const [gstPercent, setGstPercent] = useState(18);
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().slice(0, 10);
  });
  const [notes, setNotes] = useState("Payment due within 14 days via UPI / NEFT / IMPS to MLHK Infotech.");
  const [items, setItems] = useState<LineItem[]>([
    { description: "", quantity: 1, rate: 0 },
  ]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get("clientId");
    const p = params.get("projectId");
    if (c) setClientId(c);
    if (p) setProjectId(p);

    Promise.all([
      fetch("/api/admin/clients").then((r) => (r.ok ? r.json() : [])),
      fetch("/api/admin/projects").then((r) => (r.ok ? r.json() : [])),
    ]).then(([cl, pr]) => {
      if (Array.isArray(cl)) setClients(cl as Client[]);
      if (Array.isArray(pr)) setProjects(pr as ProjectRow[]);
    });
  }, []);

  const selectedClient = useMemo(
    () => clients.find((c) => c.id === clientId) ?? null,
    [clients, clientId]
  );

  const totals = useMemo(
    () => calculateInvoiceTotals(items, gstPercent, selectedClient?.gst),
    [items, gstPercent, selectedClient?.gst]
  );

  function addItem() {
    setItems((prev) => [...prev, { description: "", quantity: 1, rate: 0 }]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, idx) => idx !== index));
  }

  function updateItem(index: number, field: keyof LineItem, value: string | number) {
    setItems((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item))
    );
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: clientId || undefined,
          projectId: projectId || undefined,
          items,
          gstPercent,
          dueDate,
          notes,
          status,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { id?: string; error?: string };
      if (!res.ok || !data.id) {
        throw new Error(data.error || "Failed to generate GST invoice");
      }
      router.push(`/admin/erp/invoices/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not generate invoice");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={save} className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/erp/invoices"
            aria-label="Back to invoices"
            className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-[#0d0f14] text-zinc-400 hover:border-white/25 hover:text-white"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
              MLHK GSTIN · 23CHLPV2868R1CJ
            </p>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white">
              Create GST Tax Invoice
            </h1>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#ff9f1c] px-5 text-xs font-semibold text-[#07080a] hover:bg-[#ffb043] disabled:opacity-50"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} strokeWidth={2.5} />}
          <span>Generate &amp; Open Tax Invoice</span>
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-300"
        >
          <AlertCircle className="size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Client, Project & Tax Settings */}
      <div className="grid grid-cols-1 gap-4 rounded-xl border border-white/10 bg-[#0d0f14] p-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <label htmlFor="inv-client" className="mb-1.5 block text-xs font-medium text-zinc-300">
            Bill To Client
          </label>
          <select
            id="inv-client"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
          >
            <option value="">Direct / Walk-in Client</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} {c.company ? `— ${c.company}` : ""} {c.gst ? `(${c.gst})` : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="inv-project" className="mb-1.5 block text-xs font-medium text-zinc-300">
            Linked Project (Optional)
          </label>
          <select
            id="inv-project"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
          >
            <option value="">None</option>
            {projects.map((p) => (
              <option key={p.project.id} value={p.project.id}>
                {p.project.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="inv-due" className="mb-1.5 block text-xs font-medium text-zinc-300">
            Due Date
          </label>
          <input
            id="inv-due"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
          />
        </div>

        <div>
          <label htmlFor="inv-gst" className="mb-1.5 block text-xs font-medium text-zinc-300">
            GST Slab (%)
          </label>
          <select
            id="inv-gst"
            value={gstPercent}
            onChange={(e) => setGstPercent(Number(e.target.value))}
            className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 font-mono text-xs text-white outline-none focus:border-[#ff9f1c]"
          >
            <option value={0}>0% (Exempt / Export)</option>
            <option value={5}>5% GST</option>
            <option value={12}>12% GST</option>
            <option value={18}>18% GST (IT Services SAC 998314)</option>
            <option value={28}>28% GST</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="inv-status" className="mb-1.5 block text-xs font-medium text-zinc-300">
            Initial Status
          </label>
          <select
            id="inv-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
          >
            <option value="draft">Draft</option>
            <option value="sent">Sent to Client</option>
            <option value="paid">Paid Immediately</option>
          </select>
        </div>
      </div>

      {/* Line Items */}
      <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white">Line Items &amp; Deliverables</h2>
            <p className="text-[11px] text-zinc-500">
              {totals.isIntraStateMp
                ? "Intra-State MP Billing: Tax splits into CGST + SGST"
                : `Inter-State Billing (${selectedClient?.gst}): IGST applies`}
            </p>
          </div>
          <button
            type="button"
            onClick={addItem}
            className="inline-flex h-8 items-center gap-1 rounded-lg border border-white/10 px-3 text-xs font-medium text-zinc-200 hover:border-white/25 hover:text-white"
          >
            <Plus size={13} />
            <span>Add Line Item</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {items.map((item, i) => (
            <div key={i} className="grid grid-cols-12 items-center gap-2.5">
              <div className="col-span-12 sm:col-span-6">
                <input
                  required
                  placeholder="Custom Next.js Web Application & Technical SEO"
                  value={item.description}
                  onChange={(e) => updateItem(i, "description", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white placeholder-zinc-600 outline-none focus:border-[#ff9f1c]"
                />
              </div>
              <div className="col-span-3 sm:col-span-2">
                <input
                  type="number"
                  min={1}
                  required
                  aria-label="Quantity"
                  value={item.quantity}
                  onChange={(e) => updateItem(i, "quantity", Number(e.target.value))}
                  className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 font-mono text-xs text-white outline-none focus:border-[#ff9f1c]"
                />
              </div>
              <div className="col-span-5 sm:col-span-2">
                <input
                  type="number"
                  min={0}
                  required
                  aria-label="Rate in INR"
                  placeholder="Rate ₹"
                  value={item.rate || ""}
                  onChange={(e) => updateItem(i, "rate", Number(e.target.value))}
                  className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 font-mono text-xs text-white outline-none focus:border-[#ff9f1c]"
                />
              </div>
              <div className="col-span-3 sm:col-span-1 text-right font-mono text-xs tabular-nums text-zinc-300">
                {formatInr(item.quantity * item.rate)}
              </div>
              <div className="col-span-1 text-right">
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(i)}
                    aria-label="Remove line item"
                    className="rounded-md p-1.5 text-zinc-500 hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Tax Breakdown */}
        <div className="mt-6 flex flex-col items-end border-t border-white/10 pt-5">
          <div className="w-full max-w-xs space-y-2 text-xs">
            <div className="flex justify-between text-zinc-400">
              <span>Taxable Subtotal</span>
              <span className="font-mono tabular-nums text-zinc-200">
                {formatInr(totals.subtotal)}
              </span>
            </div>

            {totals.isIntraStateMp ? (
              <>
                <div className="flex justify-between text-zinc-400">
                  <span>CGST ({totals.gstPercent / 2}%)</span>
                  <span className="font-mono tabular-nums text-zinc-200">
                    {formatInr(totals.cgstAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>SGST ({totals.gstPercent / 2}%)</span>
                  <span className="font-mono tabular-nums text-zinc-200">
                    {formatInr(totals.sgstAmount)}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex justify-between text-zinc-400">
                <span>IGST ({totals.gstPercent}%)</span>
                <span className="font-mono tabular-nums text-zinc-200">
                  {formatInr(totals.igstAmount)}
                </span>
              </div>
            )}

            <div className="flex justify-between border-t border-white/10 pt-2.5 text-sm font-bold text-white">
              <span>Grand Total</span>
              <span className="font-mono tabular-nums text-[#ff9f1c]">
                {formatInr(totals.total)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Terms & Notes */}
      <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-5">
        <label htmlFor="inv-notes" className="mb-1.5 block text-xs font-medium text-zinc-300">
          Bank / UPI Instructions &amp; Notes
        </label>
        <textarea
          id="inv-notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full resize-none rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
        />
      </div>
    </form>
  );
}
