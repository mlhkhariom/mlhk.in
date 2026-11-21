/**
 * Pure ERP, Finance, Security & RBAC utilities for the MLHK Infotech Admin Console.
 * Kept framework-agnostic so every rule can be fast unit-tested via `node:test`.
 */

export type AdminRole = "super_admin" | "admin" | "manager" | "employee" | "client";

export interface InvoiceLineInput {
  description: string;
  quantity: number;
  rate: number;
}

export interface InvoiceTotals {
  subtotal: number;
  gstPercent: number;
  gstAmount: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  isIntraStateMp: boolean;
  total: number;
}

export interface ErpFinancialSummary {
  paidRevenue: number;
  pendingReceivables: number;
  overdueReceivables: number;
  draftValue: number;
  totalExpenses: number;
  netCashflow: number;
  collectionRate: number;
}

export interface ExpenseCategoryBreakdown {
  category: string;
  amount: number;
  sharePercent: number;
}

export const EXPENSE_CATEGORIES = [
  "Cloud & Hosting",
  "Domains & SSL",
  "Software & SaaS",
  "Marketing & Ads",
  "Team & Payroll",
  "Office & Utilities",
  "Travel & Client Ops",
  "Other",
] as const;

export const ALLOWED_ADMIN_ROLES: readonly AdminRole[] = [
  "super_admin",
  "admin",
  "manager",
  "employee",
  "client",
];

/**
 * Compute Indian GST breakdown for an invoice.
 * MLHK Infotech is registered in Madhya Pradesh (State Code 23 — GSTIN 23CHLPV2868R1CJ).
 * When client GSTIN starts with "23" (or is omitted for local B2C MP billing), tax splits
 * evenly into CGST + SGST; otherwise it applies as IGST.
 */
export function calculateInvoiceTotals(
  items: InvoiceLineInput[],
  gstPercentRaw: number,
  clientGst?: string | null,
): InvoiceTotals {
  const safePercent = Number.isFinite(gstPercentRaw)
    ? Math.max(0, Math.min(28, Math.round(gstPercentRaw)))
    : 18;

  const subtotal = items.reduce((sum, item) => {
    const qty = Number.isFinite(item.quantity) && item.quantity > 0 ? item.quantity : 0;
    const rate = Number.isFinite(item.rate) && item.rate >= 0 ? item.rate : 0;
    return sum + Math.round(qty * rate);
  }, 0);

  const gstAmount = Math.round((subtotal * safePercent) / 100);
  const normalizedGst = (clientGst ?? "").trim().toUpperCase();
  const isIntraStateMp = !normalizedGst || normalizedGst.startsWith("23");

  const cgstAmount = isIntraStateMp ? Math.floor(gstAmount / 2) : 0;
  const sgstAmount = isIntraStateMp ? gstAmount - cgstAmount : 0;
  const igstAmount = isIntraStateMp ? 0 : gstAmount;

  return {
    subtotal,
    gstPercent: safePercent,
    gstAmount,
    cgstAmount,
    sgstAmount,
    igstAmount,
    isIntraStateMp,
    total: subtotal + gstAmount,
  };
}

/** Validate invoice line items before writing to D1. */
export function validateInvoiceItems(
  items: unknown,
): { ok: true; items: InvoiceLineInput[] } | { ok: false; error: string } {
  if (!Array.isArray(items) || items.length === 0) {
    return { ok: false, error: "At least one invoice line item is required." };
  }

  const normalized: InvoiceLineInput[] = [];
  for (let i = 0; i < items.length; i++) {
    const raw = items[i] as Record<string, unknown> | null;
    if (!raw || typeof raw !== "object") {
      return { ok: false, error: `Line item ${i + 1} is invalid.` };
    }
    const description = typeof raw.description === "string" ? raw.description.trim() : "";
    const quantity = Number(raw.quantity);
    const rate = Number(raw.rate);

    if (!description) {
      return { ok: false, error: `Line item ${i + 1} needs a deliverable description.` };
    }
    if (!Number.isFinite(quantity) || quantity <= 0 || quantity > 10000) {
      return { ok: false, error: `Line item ${i + 1} quantity must be between 1 and 10,000.` };
    }
    if (!Number.isFinite(rate) || rate < 0 || rate > 100_000_000) {
      return { ok: false, error: `Line item ${i + 1} rate must be a valid non-negative INR amount.` };
    }

    normalized.push({
      description: description.slice(0, 300),
      quantity: Math.round(quantity),
      rate: Math.round(rate),
    });
  }

  return { ok: true, items: normalized };
}

/** Compute ERP financial summary across invoices and operational expenses. */
export function computeErpFinancialSummary(
  invoiceList: Array<{ status?: string | null; total?: number | null; dueDate?: string | null }>,
  expenseList: Array<{ amount?: number | null }>,
  todayIso: string = new Date().toISOString().slice(0, 10),
): ErpFinancialSummary {
  let paidRevenue = 0;
  let pendingReceivables = 0;
  let overdueReceivables = 0;
  let draftValue = 0;

  for (const inv of invoiceList) {
    const amount = Number(inv.total ?? 0);
    if (!Number.isFinite(amount) || amount <= 0) continue;
    const status = (inv.status ?? "draft").toLowerCase();

    if (status === "paid") {
      paidRevenue += amount;
    } else if (status === "overdue") {
      overdueReceivables += amount;
    } else if (status === "sent") {
      if (inv.dueDate && inv.dueDate < todayIso) {
        overdueReceivables += amount;
      } else {
        pendingReceivables += amount;
      }
    } else if (status === "draft") {
      draftValue += amount;
    }
  }

  const totalExpenses = expenseList.reduce((sum, exp) => {
    const amt = Number(exp.amount ?? 0);
    return sum + (Number.isFinite(amt) && amt > 0 ? amt : 0);
  }, 0);

  const billed = paidRevenue + pendingReceivables + overdueReceivables;
  const collectionRate = billed > 0 ? Math.round((paidRevenue / billed) * 100) : 0;

  return {
    paidRevenue,
    pendingReceivables,
    overdueReceivables,
    draftValue,
    totalExpenses,
    netCashflow: paidRevenue - totalExpenses,
    collectionRate,
  };
}

/** Aggregate operational expenses by category sorted highest first. */
export function aggregateExpensesByCategory(
  expenseList: Array<{ category?: string | null; amount?: number | null }>,
): ExpenseCategoryBreakdown[] {
  const totals = new Map<string, number>();
  let grandTotal = 0;

  for (const exp of expenseList) {
    const amt = Number(exp.amount ?? 0);
    if (!Number.isFinite(amt) || amt <= 0) continue;
    const cat = (exp.category ?? "").trim() || "Uncategorized";
    totals.set(cat, (totals.get(cat) ?? 0) + amt);
    grandTotal += amt;
  }

  return Array.from(totals.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([category, amount]) => ({
      category,
      amount,
      sharePercent: grandTotal > 0 ? Math.round((amount / grandTotal) * 100) : 0,
    }));
}

/** Compute project task completion percentage cleanly. */
export function computeProjectProgress(
  taskList: Array<{ status?: string | null }>,
): { total: number; done: number; inProgress: number; percent: number } {
  const total = taskList.length;
  const done = taskList.filter((t) => t.status === "done").length;
  const inProgress = taskList.filter((t) => t.status === "in_progress" || t.status === "review").length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  return { total, done, inProgress, percent };
}

/** Format Indian Rupee amounts using en-IN grouping (e.g. ₹1,45,000). */
export function formatInr(amount: number | null | undefined): string {
  const val = Number(amount ?? 0);
  if (!Number.isFinite(val)) return "₹0";
  const sign = val < 0 ? "-" : "";
  return `${sign}₹${Math.abs(Math.round(val)).toLocaleString("en-IN")}`;
}

/**
 * Validate URLs entered in CMS Menus, Portfolio, Subsidiaries, or Media.
 * Blocks `javascript:`, `data:`, `vbscript:`, and protocol-relative open redirects (`//evil.com`).
 */
export function isSafeAdminUrl(raw: string | null | undefined): boolean {
  if (!raw || !raw.trim()) return true;
  const value = raw.trim();
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  if (value.startsWith("#")) return true;
  try {
    const parsed = new URL(value);
    return (
      parsed.protocol === "https:" ||
      parsed.protocol === "http:" ||
      parsed.protocol === "mailto:" ||
      parsed.protocol === "tel:"
    );
  } catch {
    return false;
  }
}

/**
 * Validate Origin header on cookie-authenticated admin mutations (POST/PATCH/PUT/DELETE)
 * to block cross-site request forgery while allowing production (`mlhk.in`), local dev,
 * and preview proxy hosts matching the request's Host / X-Forwarded-Host header.
 */
export function isTrustedAdminOrigin(
  originHeader: string | null,
  hostHeader: string | null,
  forwardedHostHeader?: string | null,
): boolean {
  if (!originHeader) return true; // Non-browser / same-origin server fetches omit Origin
  let originHost: string;
  try {
    originHost = new URL(originHeader).host.toLowerCase();
  } catch {
    return false;
  }

  const candidates = new Set<string>(["mlhk.in", "www.mlhk.in", "localhost:3000", "127.0.0.1:3000"]);
  for (const h of [hostHeader, forwardedHostHeader]) {
    if (h) {
      h.split(",").forEach((part) => {
        const cleaned = part.trim().toLowerCase();
        if (cleaned) candidates.add(cleaned);
      });
    }
  }

  return candidates.has(originHost);
}

/**
 * Guard RBAC role updates so admins cannot lock themselves out or remove the last super_admin,
 * and non-super-admins cannot grant or revoke `super_admin`.
 */
export function validateRoleChange(params: {
  actorId: string;
  actorRole: AdminRole;
  targetId: string;
  targetCurrentRole: AdminRole;
  nextRole: AdminRole;
  superAdminCount: number;
}): { ok: true } | { ok: false; error: string } {
  const { actorId, actorRole, targetId, targetCurrentRole, nextRole, superAdminCount } = params;

  if (!ALLOWED_ADMIN_ROLES.includes(nextRole)) {
    return { ok: false, error: "Invalid role specified." };
  }

  if (actorRole !== "super_admin" && actorRole !== "admin") {
    return { ok: false, error: "Only administrators can change team roles." };
  }

  if (actorRole !== "super_admin" && (targetCurrentRole === "super_admin" || nextRole === "super_admin")) {
    return { ok: false, error: "Only a Super Admin can modify or assign the Super Admin role." };
  }

  if (actorId === targetId && nextRole !== targetCurrentRole) {
    return { ok: false, error: "You cannot change your own role from this console." };
  }

  if (targetCurrentRole === "super_admin" && nextRole !== "super_admin" && superAdminCount <= 1) {
    return { ok: false, error: "At least one Super Admin account must remain active." };
  }

  return { ok: true };
}
