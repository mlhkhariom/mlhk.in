"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Row = { invoice: { id: string; invoiceNumber: string; total: number | null; status: string | null; dueDate: string | null; createdAt: string | null }; clientName: string | null };

const statusColor: Record<string, string> = { draft: "bg-gray-100 text-gray-600", sent: "bg-blue-50 text-blue-600", paid: "bg-green-50 text-green-600", overdue: "bg-red-50 text-red-600", cancelled: "bg-gray-50 text-gray-400" };

export default function InvoicesPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const load = async () => { const d = await fetch("/api/admin/invoices").then(r => r.json()); setRows(d as Row[]); };
  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: string) {
    await fetch("/api/admin/invoices", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    load();
  }

  const totalPaid = rows.filter(r => r.invoice.status === "paid").reduce((s, r) => s + (r.invoice.total ?? 0), 0);
  const totalPending = rows.filter(r => r.invoice.status === "sent").reduce((s, r) => s + (r.invoice.total ?? 0), 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
        <Link href="/admin/erp/invoices/new" className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"><Plus size={15} /> New Invoice</Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[["Total Invoices", rows.length, ""], ["Paid", `₹${totalPaid.toLocaleString()}`, "text-green-600"], ["Pending", `₹${totalPending.toLocaleString()}`, "text-orange-500"]].map(([l, v, c]) => (
          <Card key={l as string}><CardContent className="p-4"><p className="text-xs text-gray-500">{l}</p><p className={`text-2xl font-bold mt-1 ${c}`}>{v}</p></CardContent></Card>
        ))}
      </div>

      <Card><CardContent className="p-0">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>{["Invoice #", "Client", "Total", "Due Date", "Status", "Action"].map(h => <th key={h} className="px-5 py-3 text-left font-medium">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.length === 0 ? <tr><td colSpan={6} className="px-5 py-8 text-center text-gray-400">No invoices yet</td></tr>
              : rows.map(({ invoice, clientName }) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-mono text-xs font-medium">{invoice.invoiceNumber}</td>
                  <td className="px-5 py-3 text-gray-700">{clientName ?? "—"}</td>
                  <td className="px-5 py-3 font-semibold">₹{(invoice.total ?? 0).toLocaleString()}</td>
                  <td className="px-5 py-3 text-gray-500 text-xs">{invoice.dueDate ?? "—"}</td>
                  <td className="px-5 py-3"><span className={`text-xs px-2 py-0.5 rounded ${statusColor[invoice.status ?? "draft"]}`}>{invoice.status}</span></td>
                  <td className="px-5 py-3">
                    <select value={invoice.status ?? "draft"} onChange={e => updateStatus(invoice.id, e.target.value)}
                      className="text-xs border rounded px-2 py-1 focus:outline-none">
                      {["draft", "sent", "paid", "overdue", "cancelled"].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </CardContent></Card>
    </div>
  );
}
