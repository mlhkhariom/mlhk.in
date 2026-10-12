"use client";

import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";
import { Receipt } from "lucide-react";

export default function ExpensesPage() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);

  const load = async () => {
    try {
      const d = await fetch("/api/admin/expenses").then((r) => r.json());
      setData(Array.isArray(d) ? (d as Record<string, unknown>[]) : []);
    } catch {
      setData([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const total = data.reduce((s, e) => s + (Number(e.amount) || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white">
            Operational Expenses
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Track infrastructure, software licenses, domain renewals, and office overheads.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 self-start rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-400 sm:self-auto">
          <Receipt size={14} /> Total Outflow: ₹{total.toLocaleString()}
        </div>
      </div>

      <CrudTable
        title="Expense"
        data={data}
        apiPath="/api/admin/expenses"
        onRefresh={load}
        fields={[
          { key: "title", label: "Expense Title", required: true },
          { key: "amount", label: "Amount (₹)", type: "number", required: true },
          { key: "category", label: "Category" },
          { key: "date", label: "Date (YYYY-MM-DD)", type: "text" },
        ]}
      />
    </div>
  );
}
