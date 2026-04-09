"use client";
import { useEffect, useState } from "react";
import { Plus, X, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Row = { ticket: { id: string; title: string; description: string | null; status: string | null; priority: string | null; createdAt: string | null }; clientName: string | null };

const statusColor: Record<string, string> = { open: "bg-red-50 text-red-600", in_progress: "bg-yellow-50 text-yellow-600", resolved: "bg-green-50 text-green-600", closed: "bg-gray-100 text-gray-500" };
const priorityColor: Record<string, string> = { low: "bg-gray-100 text-gray-500", medium: "bg-blue-50 text-blue-600", high: "bg-orange-50 text-orange-600", urgent: "bg-red-50 text-red-600" };

export default function TicketsPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", priority: "medium" });

  const load = async () => { const d = await fetch("/api/admin/tickets").then(r => r.json()); setRows(d as Row[]); };
  useEffect(() => { load(); }, []);

  async function create() {
    await fetch("/api/admin/tickets", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setShowForm(false);
    setForm({ title: "", description: "", priority: "medium" });
    load();
  }

  async function updateStatus(id: string, status: string) {
    await fetch("/api/admin/tickets", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
        <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"><Plus size={15} /> New Ticket</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">New Ticket</h3>
              <button onClick={() => setShowForm(false)}><X size={18} className="text-gray-400" /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Title *" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                className="border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <textarea rows={3} placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              <select value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}
                className="border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                {["low", "medium", "high", "urgent"].map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={create} disabled={!form.title} className="bg-blue-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1"><Check size={14} /> Create</button>
              <button onClick={() => setShowForm(false)} className="text-sm text-gray-500">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <Card><CardContent className="p-0">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>{["Title", "Client", "Priority", "Status", "Created", "Update Status"].map(h => <th key={h} className="px-5 py-3 text-left font-medium">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.length === 0 ? <tr><td colSpan={6} className="px-5 py-8 text-center text-gray-400">No tickets</td></tr>
              : rows.map(({ ticket, clientName }) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-900 max-w-xs truncate">{ticket.title}</td>
                  <td className="px-5 py-3 text-gray-500">{clientName ?? "—"}</td>
                  <td className="px-5 py-3"><span className={`text-xs px-2 py-0.5 rounded ${priorityColor[ticket.priority ?? "medium"]}`}>{ticket.priority}</span></td>
                  <td className="px-5 py-3"><span className={`text-xs px-2 py-0.5 rounded ${statusColor[ticket.status ?? "open"]}`}>{ticket.status}</span></td>
                  <td className="px-5 py-3 text-gray-400 text-xs">{ticket.createdAt?.slice(0, 10)}</td>
                  <td className="px-5 py-3">
                    <select value={ticket.status ?? "open"} onChange={e => updateStatus(ticket.id, e.target.value)}
                      className="text-xs border rounded px-2 py-1 focus:outline-none">
                      {["open", "in_progress", "resolved", "closed"].map(s => <option key={s} value={s}>{s}</option>)}
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
