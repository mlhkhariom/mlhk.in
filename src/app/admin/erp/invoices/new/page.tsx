"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

type LineItem = { description: string; quantity: number; rate: number };
type Client = { id: string; name: string; company: string | null; gst: string | null; address: string | null };

export default function NewInvoicePage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [form, setForm] = useState({ clientId: "", gstPercent: 18, dueDate: "", notes: "" });
  const [items, setItems] = useState<LineItem[]>([{ description: "", quantity: 1, rate: 0 }]);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetch("/api/admin/clients").then(r => r.json()).then((d: unknown) => setClients(d as Client[])); }, []);

  const subtotal = items.reduce((s, i) => s + i.quantity * i.rate, 0);
  const gstAmt = Math.round(subtotal * form.gstPercent / 100);
  const total = subtotal + gstAmt;
  const selectedClient = clients.find(c => c.id === form.clientId);

  function updateItem(i: number, k: keyof LineItem, v: string | number) {
    setItems(arr => arr.map((item, idx) => idx === i ? { ...item, [k]: v } : item));
  }

  async function save() {
    setSaving(true);
    const res = await fetch("/api/admin/invoices", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, items }) });
    const data = await res.json() as { id: string };
    router.push("/admin/erp/invoices");
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/erp/invoices" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"><ArrowLeft size={16} /> Invoices</Link>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Invoice</h1>

      <div className="space-y-6">
        {/* Client + Settings */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Client</label>
            <select value={form.clientId} onChange={e => setForm(f => ({ ...f, clientId: e.target.value }))}
              className="border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select client...</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.name}{c.company ? ` — ${c.company}` : ""}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Due Date</label>
            <input type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))}
              className="border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        {selectedClient && (
          <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
            <p className="font-medium text-gray-900">{selectedClient.name}</p>
            {selectedClient.company && <p>{selectedClient.company}</p>}
            {selectedClient.address && <p>{selectedClient.address}</p>}
            {selectedClient.gst && <p className="font-mono text-xs mt-1">GST: {selectedClient.gst}</p>}
          </div>
        )}

        {/* Line Items */}
        <div>
          <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 uppercase mb-2 px-1">
            <span className="col-span-6">Description</span><span className="col-span-2 text-center">Qty</span><span className="col-span-2 text-right">Rate (₹)</span><span className="col-span-2 text-right">Amount</span>
          </div>
          <div className="space-y-2">
            {items.map((item, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-center">
                <input value={item.description} onChange={e => updateItem(i, "description", e.target.value)} placeholder="Service description"
                  className="col-span-6 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="number" min={1} value={item.quantity} onChange={e => updateItem(i, "quantity", Number(e.target.value))}
                  className="col-span-2 border rounded-lg px-2 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="number" min={0} value={item.rate} onChange={e => updateItem(i, "rate", Number(e.target.value))}
                  className="col-span-2 border rounded-lg px-2 py-2 text-sm text-right focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <div className="col-span-1 text-right text-sm font-medium text-gray-700">₹{(item.quantity * item.rate).toLocaleString()}</div>
                <button onClick={() => setItems(arr => arr.filter((_, idx) => idx !== i))} className="col-span-1 text-red-400 hover:text-red-600 flex justify-center">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => setItems(arr => [...arr, { description: "", quantity: 1, rate: 0 }])}
            className="mt-3 flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800">
            <Plus size={14} /> Add Line Item
          </button>
        </div>

        {/* Totals */}
        <div className="border-t pt-4 space-y-2 text-sm">
          <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
          <div className="flex justify-between items-center text-gray-600">
            <div className="flex items-center gap-2">
              <span>GST</span>
              <select value={form.gstPercent} onChange={e => setForm(f => ({ ...f, gstPercent: Number(e.target.value) }))}
                className="border rounded px-2 py-0.5 text-xs focus:outline-none">
                {[0, 5, 12, 18, 28].map(g => <option key={g} value={g}>{g}%</option>)}
              </select>
            </div>
            <span>₹{gstAmt.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold text-gray-900 text-base border-t pt-2"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600 block mb-1">Notes</label>
          <textarea rows={2} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Payment terms, bank details..."
            className="border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
        </div>

        <button onClick={save} disabled={saving || items.every(i => !i.description)}
          className="bg-blue-600 text-white text-sm px-8 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50">
          {saving ? "Creating..." : "Create Invoice"}
        </button>
      </div>
    </div>
  );
}
