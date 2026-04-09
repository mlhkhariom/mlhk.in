"use client";
import { useEffect, useState } from "react";
import { Plus, Check, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type FollowUp = { id: string; note: string; dueDate: string | null; done: number; leadId: string | null; clientId: string | null; createdAt: string | null };

export default function FollowUpsPage() {
  const [items, setItems] = useState<FollowUp[]>([]);
  const [form, setForm] = useState({ note: "", dueDate: "", leadId: "", clientId: "" });
  const [showForm, setShowForm] = useState(false);

  const load = async () => { const d = await fetch("/api/admin/followups").then(r => r.json()); setItems(d as FollowUp[]); };
  useEffect(() => { load(); }, []);

  async function add() {
    await fetch("/api/admin/followups", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setForm({ note: "", dueDate: "", leadId: "", clientId: "" });
    setShowForm(false);
    load();
  }

  async function markDone(id: string, done: boolean) {
    await fetch("/api/admin/followups", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, done: done ? 1 : 0 }) });
    load();
  }

  const pending = items.filter(i => !i.done);
  const done = items.filter(i => i.done);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Follow-ups</h1>
        <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus size={15} /> Add Follow-up
        </button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardContent className="p-5 space-y-3">
            <textarea rows={3} placeholder="Note / Task *" value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
              className="border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 block mb-1">Due Date</label>
                <input type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))}
                  className="border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={add} disabled={!form.note} className="bg-blue-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">Save</button>
              <button onClick={() => setShowForm(false)} className="text-sm text-gray-500">Cancel</button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2 mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Pending ({pending.length})</h2>
        {pending.length === 0 && <p className="text-gray-400 text-sm">No pending follow-ups 🎉</p>}
        {pending.map(item => (
          <div key={item.id} className="flex items-start gap-3 bg-white border rounded-xl px-4 py-3">
            <button onClick={() => markDone(item.id, true)} className="mt-0.5 w-5 h-5 rounded-full border-2 border-gray-300 hover:border-green-500 shrink-0 transition-colors" />
            <div className="flex-1">
              <p className="text-sm text-gray-800">{item.note}</p>
              {item.dueDate && (
                <p className={`text-xs mt-1 flex items-center gap-1 ${new Date(item.dueDate) < new Date() ? "text-red-500" : "text-gray-400"}`}>
                  <Clock size={11} /> {item.dueDate}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {done.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Completed ({done.length})</h2>
          {done.map(item => (
            <div key={item.id} className="flex items-start gap-3 bg-gray-50 border rounded-xl px-4 py-3 opacity-60">
              <Check size={18} className="text-green-500 mt-0.5 shrink-0" />
              <p className="text-sm text-gray-500 line-through">{item.note}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
