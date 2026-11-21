"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Check,
  Loader2,
  AlertCircle,
  IndianRupee,
} from "lucide-react";
import {
  EXPENSE_CATEGORIES,
  aggregateExpensesByCategory,
  computeErpFinancialSummary,
  formatInr,
} from "@/lib/erp-utils";

type ExpenseRow = {
  id: string;
  title: string;
  amount: number;
  category: string | null;
  projectId: string | null;
  projectTitle: string | null;
  date: string | null;
};

type ProjectOption = { project: { id: string; title: string } };
type InvoiceRow = { invoice: { status: string; total: number; dueDate: string | null } };

const EMPTY_FORM = {
  title: "",
  amount: "",
  category: EXPENSE_CATEGORIES[0] as string,
  projectId: "",
  date: new Date().toISOString().slice(0, 10),
};

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<ExpenseRow[]>([]);
  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
  const [projects, setProjects] = useState<ProjectOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setError(null);
    try {
      const [eRes, iRes, pRes] = await Promise.all([
        fetch("/api/admin/expenses", { cache: "no-store" }),
        fetch("/api/admin/invoices", { cache: "no-store" }).catch(() => null),
        fetch("/api/admin/projects", { cache: "no-store" }).catch(() => null),
      ]);
      if (!eRes.ok) throw new Error("Failed to load expenses");
      const eData = await eRes.json();
      setExpenses(Array.isArray(eData) ? (eData as ExpenseRow[]) : []);
      if (iRes?.ok) {
        const iData = await iRes.json();
        if (Array.isArray(iData)) setInvoices(iData as InvoiceRow[]);
      }
      if (pRes?.ok) {
        const pData = await pRes.json();
        if (Array.isArray(pData)) setProjects(pData as ProjectOption[]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!showModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showModal]);

  const finance = useMemo(
    () =>
      computeErpFinancialSummary(
        invoices.map((r) => r.invoice),
        expenses
      ),
    [invoices, expenses]
  );

  const breakdown = useMemo(() => aggregateExpensesByCategory(expenses), [expenses]);

  const visible = useMemo(() => {
    return expenses.filter((e) => {
      if (catFilter !== "all" && (e.category || "Other") !== catFilter) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return [e.title, e.category, e.projectTitle, e.date]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q));
    });
  }, [expenses, catFilter, query]);

  function openNew() {
    setEditId(null);
    setForm({ ...EMPTY_FORM, date: new Date().toISOString().slice(0, 10) });
    setShowModal(true);
  }

  function openEdit(row: ExpenseRow) {
    setEditId(row.id);
    setForm({
      title: row.title,
      amount: String(row.amount),
      category: row.category || "Other",
      projectId: row.projectId || "",
      date: row.date || new Date().toISOString().slice(0, 10),
    });
    setShowModal(true);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        ...(editId ? { id: editId } : {}),
        title: form.title.trim(),
        amount: Number(form.amount),
        category: form.category,
        projectId: form.projectId || null,
        date: form.date,
      };
      const res = await fetch("/api/admin/expenses", {
        method: editId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(d.error || "Failed to save expense");
      }
      setShowModal(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save expense");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    const res = await fetch("/api/admin/expenses", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setConfirmDeleteId(null);
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    } else {
      setError("Failed to delete expense");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
            ERP · Finance &amp; Cashflow
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-white">
            Expenses &amp; Cashflow Ledger
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Track cloud hosting, domain renewals, payroll, ads, and project-linked costs against paid revenue.
          </p>
        </div>

        <button
          type="button"
          onClick={openNew}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#ff9f1c] px-4 text-xs font-semibold text-[#07080a] hover:bg-[#ffb043]"
        >
          <Plus size={15} strokeWidth={2.5} />
          <span>Log Expense</span>
        </button>
      </div>

      {/* Cashflow Summary Strip */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-4">
          <p className="text-xs text-zinc-400">Paid Revenue (Inflow)</p>
          <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-emerald-400">
            {formatInr(finance.paidRevenue)}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-4">
          <p className="text-xs text-zinc-400">Total Operational Spend</p>
          <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-rose-400">
            {formatInr(finance.totalExpenses)}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-4">
          <p className="text-xs text-zinc-400">Net Cashflow</p>
          <p
            className={`mt-1.5 font-mono text-2xl font-bold tabular-nums ${
              finance.netCashflow >= 0 ? "text-white" : "text-rose-400"
            }`}
          >
            {formatInr(finance.netCashflow)}
          </p>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-center justify-between gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-300"
        >
          <span className="flex items-center gap-2">
            <AlertCircle className="size-4 shrink-0" />
            {error}
          </span>
          <button type="button" onClick={() => setError(null)} aria-label="Dismiss error">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main Split: 8-Col Ledger + 4-Col Category Breakdown */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-8">
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                aria-label="Search expenses"
                placeholder="Search title, category, or linked project..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-9 w-full rounded-lg border border-white/10 bg-[#0d0f14] pl-8.5 pr-3 text-xs text-white placeholder-zinc-500 outline-none focus:border-[#ff9f1c]/60"
              />
            </div>
            <select
              aria-label="Filter by category"
              value={catFilter}
              onChange={(e) => setCatFilter(e.target.value)}
              className="h-9 rounded-lg border border-white/10 bg-[#0d0f14] px-3 text-xs text-white outline-none focus:border-[#ff9f1c]"
            >
              <option value="all">All Categories</option>
              {EXPENSE_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d0f14]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-right">Amount</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <Loader2 className="mx-auto size-5 animate-spin text-[#ff9f1c]" />
                      </td>
                    </tr>
                  ) : visible.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-14 text-center">
                        <IndianRupee className="mx-auto size-7 text-zinc-600" />
                        <p className="mt-3 text-sm font-medium text-zinc-300">No expenses logged</p>
                        <p className="mt-1 text-xs text-zinc-500">
                          Click &ldquo;Log Expense&rdquo; to record an operational or project cost.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    visible.map((row) => (
                      <tr key={row.id} className="transition-colors hover:bg-white/[0.02]">
                        <td className="px-4 py-3">
                          <p className="font-medium text-white">{row.title}</p>
                          {row.projectTitle && (
                            <p className="text-[11px] text-zinc-500">Project: {row.projectTitle}</p>
                          )}
                        </td>
                        <td className="px-4 py-3 text-zinc-300">{row.category || "Other"}</td>
                        <td className="px-4 py-3 font-mono text-[11px] text-zinc-400">
                          {row.date || "—"}
                        </td>
                        <td className="px-4 py-3 text-right font-mono font-semibold tabular-nums text-white">
                          {formatInr(row.amount)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {confirmDeleteId === row.id ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() => remove(row.id)}
                                  className="h-7 rounded-md border border-red-500/40 bg-red-500/20 px-2.5 text-[11px] font-semibold text-red-200"
                                >
                                  Confirm
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteId(null)}
                                  className="h-7 rounded-md border border-white/10 px-2 text-[11px] text-zinc-400"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  onClick={() => openEdit(row)}
                                  title="Edit expense"
                                  className="flex size-7 items-center justify-center rounded-md border border-white/10 text-zinc-400 hover:border-white/25 hover:text-[#ff9f1c]"
                                >
                                  <Pencil size={12} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteId(row.id)}
                                  title="Delete expense"
                                  className="flex size-7 items-center justify-center rounded-md border border-white/10 text-zinc-400 hover:border-red-500/40 hover:text-red-400"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Category Spend Breakdown */}
        <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-5 lg:col-span-4">
          <h2 className="text-sm font-semibold text-white">Spend by Category</h2>
          <p className="mt-0.5 text-xs text-zinc-500">Share of total logged operational spend</p>

          <div className="mt-5 space-y-4">
            {breakdown.length === 0 ? (
              <p className="py-8 text-center text-xs text-zinc-500">No spend breakdown yet.</p>
            ) : (
              breakdown.map((item) => (
                <div key={item.category}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-300">{item.category}</span>
                    <span className="font-mono tabular-nums text-zinc-200">
                      {formatInr(item.amount)}{" "}
                      <span className="text-zinc-500">({item.sharePercent}%)</span>
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      style={{ width: `${item.sharePercent}%` }}
                      className="h-full rounded-full bg-[#ff9f1c]"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add / Edit Expense Modal */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="expense-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={() => setShowModal(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-md rounded-xl border border-white/15 bg-[#0d0f14] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 id="expense-modal-title" className="font-display text-base font-bold text-white">
                {editId ? "Edit Expense" : "Log Operational Expense"}
              </h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label="Close modal"
                className="rounded-lg p-1 text-zinc-400 hover:bg-white/5 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={save} className="mt-4 space-y-3.5">
              <div>
                <label htmlFor="exp-title" className="mb-1 block text-xs font-medium text-zinc-300">
                  Expense Title <span className="text-[#ff9f1c]">*</span>
                </label>
                <input
                  id="exp-title"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Cloudflare Pro / Domain Renewal"
                  className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="exp-amount" className="mb-1 block text-xs font-medium text-zinc-300">
                    Amount (INR) <span className="text-[#ff9f1c]">*</span>
                  </label>
                  <input
                    id="exp-amount"
                    type="number"
                    min={1}
                    required
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    placeholder="2500"
                    className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 font-mono text-xs text-white outline-none focus:border-[#ff9f1c]"
                  />
                </div>
                <div>
                  <label htmlFor="exp-date" className="mb-1 block text-xs font-medium text-zinc-300">
                    Date
                  </label>
                  <input
                    id="exp-date"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="exp-cat" className="mb-1 block text-xs font-medium text-zinc-300">
                  Category
                </label>
                <select
                  id="exp-cat"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
                >
                  {EXPENSE_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="exp-proj" className="mb-1 block text-xs font-medium text-zinc-300">
                  Linked Project (Optional)
                </label>
                <select
                  id="exp-proj"
                  value={form.projectId}
                  onChange={(e) => setForm({ ...form, projectId: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-[#07080a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff9f1c]"
                >
                  <option value="">General Company Overhead</option>
                  {projects.map((p) => (
                    <option key={p.project.id} value={p.project.id}>
                      {p.project.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg border border-white/10 px-4 py-2 text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff9f1c] px-4 py-2 text-xs font-semibold text-[#07080a] hover:bg-[#ffb043] disabled:opacity-50"
                >
                  {saving ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} strokeWidth={2.5} />}
                  <span>{editId ? "Update Expense" : "Save Expense"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
