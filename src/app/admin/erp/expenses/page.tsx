"use client";
import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";

export default function ExpensesPage() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const load = async () => { const d = await fetch("/api/admin/expenses").then(r => r.json()); setData(d as Record<string, unknown>[]); };
  useEffect(() => { load(); }, []);
  const total = data.reduce((s, e) => s + (Number(e.amount) || 0), 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
        <div className="bg-red-50 text-red-600 text-sm font-semibold px-4 py-2 rounded-lg">Total: ₹{total.toLocaleString()}</div>
      </div>
      <CrudTable title="Expense" data={data} apiPath="/api/admin/expenses" onRefresh={load}
        fields={[
          { key: "title", label: "Title", required: true },
          { key: "amount", label: "Amount (₹)", type: "number", required: true },
          { key: "category", label: "Category" },
          { key: "date", label: "Date", type: "text" },
        ]} />
    </div>
  );
}
