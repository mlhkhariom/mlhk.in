import test from "node:test";
import assert from "node:assert/strict";
import {
  aggregateExpensesByCategory,
  calculateInvoiceTotals,
  computeErpFinancialSummary,
  computeProjectProgress,
  formatInr,
  isSafeAdminUrl,
  isTrustedAdminOrigin,
  validateInvoiceItems,
  validateRoleChange,
} from "./erp-utils";

test("calculateInvoiceTotals splits CGST+SGST for Madhya Pradesh (23) and IGST for out-of-state GSTINs", () => {
  const mp = calculateInvoiceTotals(
    [
      { description: "Custom Next.js Site", quantity: 1, rate: 25000 },
      { description: "Local SEO Setup", quantity: 2, rate: 5000 },
    ],
    18,
    "23ABCDE1234F1Z5",
  );
  assert.equal(mp.subtotal, 35000);
  assert.equal(mp.gstAmount, 6300);
  assert.equal(mp.isIntraStateMp, true);
  assert.equal(mp.cgstAmount, 3150);
  assert.equal(mp.sgstAmount, 3150);
  assert.equal(mp.igstAmount, 0);
  assert.equal(mp.total, 41300);

  const mh = calculateInvoiceTotals(
    [{ description: "Android App Sprint", quantity: 1, rate: 50000 }],
    18,
    "27AAACM3025E1ZZ",
  );
  assert.equal(mh.isIntraStateMp, false);
  assert.equal(mh.cgstAmount, 0);
  assert.equal(mh.sgstAmount, 0);
  assert.equal(mh.igstAmount, 9000);
  assert.equal(mh.total, 59000);
});

test("validateInvoiceItems rejects empty, missing description, or negative rate payloads", () => {
  assert.equal(validateInvoiceItems([]).ok, false);
  assert.equal(validateInvoiceItems([{ description: "   ", quantity: 1, rate: 500 }]).ok, false);
  assert.equal(validateInvoiceItems([{ description: "Design", quantity: 0, rate: 500 }]).ok, false);
  assert.equal(validateInvoiceItems([{ description: "Design", quantity: 1, rate: -100 }]).ok, false);

  const valid = validateInvoiceItems([{ description: "  Web Build  ", quantity: 2, rate: 15000 }]);
  assert.equal(valid.ok, true);
  if (valid.ok) {
    assert.equal(valid.items[0].description, "Web Build");
    assert.equal(valid.items[0].quantity, 2);
  }
});

test("computeErpFinancialSummary computes revenue, overdue detection, expenses, net cashflow, and collection rate", () => {
  const summary = computeErpFinancialSummary(
    [
      { status: "paid", total: 100000, dueDate: "2026-10-01" },
      { status: "sent", total: 40000, dueDate: "2026-12-15" },
      { status: "sent", total: 20000, dueDate: "2026-10-10" }, // past due -> overdue
      { status: "draft", total: 15000, dueDate: "2026-12-20" },
    ],
    [{ amount: 25000 }, { amount: 15000 }],
    "2026-11-20",
  );

  assert.equal(summary.paidRevenue, 100000);
  assert.equal(summary.pendingReceivables, 40000);
  assert.equal(summary.overdueReceivables, 20000);
  assert.equal(summary.draftValue, 15000);
  assert.equal(summary.totalExpenses, 40000);
  assert.equal(summary.netCashflow, 60000);
  assert.equal(summary.collectionRate, 63);
});

test("aggregateExpensesByCategory and computeProjectProgress return sorted deterministic metrics", () => {
  const breakdown = aggregateExpensesByCategory([
    { category: "Cloud & Hosting", amount: 6000 },
    { category: "Marketing & Ads", amount: 14000 },
    { category: "Cloud & Hosting", amount: 4000 },
  ]);
  assert.equal(breakdown[0].category, "Marketing & Ads");
  assert.equal(breakdown[0].amount, 14000);
  assert.equal(breakdown[1].category, "Cloud & Hosting");
  assert.equal(breakdown[1].amount, 10000);

  const progress = computeProjectProgress([
    { status: "done" },
    { status: "done" },
    { status: "in_progress" },
    { status: "todo" },
  ]);
  assert.equal(progress.percent, 50);
  assert.equal(progress.done, 2);
  assert.equal(formatInr(145000), "₹1,45,000");
  assert.equal(formatInr(-2500), "-₹2,500");
});

test("isSafeAdminUrl blocks javascript/data/protocol-relative payloads while permitting safe links", () => {
  assert.equal(isSafeAdminUrl("/services/web-development"), true);
  assert.equal(isSafeAdminUrl("https://mlhk.in/blog"), true);
  assert.equal(isSafeAdminUrl("mailto:support@mlhk.in"), true);
  assert.equal(isSafeAdminUrl("javascript:alert(1)"), false);
  assert.equal(isSafeAdminUrl("data:text/html,<script>alert(1)</script>"), false);
  assert.equal(isSafeAdminUrl("//evil.example.com/phish"), false);
});

test("isTrustedAdminOrigin allows matching host or trusted apex and blocks cross-site origins", () => {
  assert.equal(isTrustedAdminOrigin(null, "mlhk.in"), true);
  assert.equal(isTrustedAdminOrigin("https://mlhk.in", "mlhk.in"), true);
  assert.equal(isTrustedAdminOrigin("http://localhost:3000", "localhost:3000"), true);
  assert.equal(
    isTrustedAdminOrigin("https://preview-123.run.app", "localhost:3000", "preview-123.run.app"),
    true,
  );
  assert.equal(isTrustedAdminOrigin("https://attacker.evil", "mlhk.in"), false);
  assert.equal(isTrustedAdminOrigin("not-a-url", "mlhk.in"), false);
});

test("validateRoleChange prevents self-demotion, last super_admin removal, and privilege escalation", () => {
  assert.equal(
    validateRoleChange({
      actorId: "u1",
      actorRole: "super_admin",
      targetId: "u1",
      targetCurrentRole: "super_admin",
      nextRole: "admin",
      superAdminCount: 2,
    }).ok,
    false,
  );
  assert.equal(
    validateRoleChange({
      actorId: "u1",
      actorRole: "super_admin",
      targetId: "u2",
      targetCurrentRole: "super_admin",
      nextRole: "admin",
      superAdminCount: 1,
    }).ok,
    false,
  );
  assert.equal(
    validateRoleChange({
      actorId: "u2",
      actorRole: "admin",
      targetId: "u3",
      targetCurrentRole: "employee",
      nextRole: "super_admin",
      superAdminCount: 1,
    }).ok,
    false,
  );
  assert.equal(
    validateRoleChange({
      actorId: "u1",
      actorRole: "super_admin",
      targetId: "u3",
      targetCurrentRole: "client",
      nextRole: "manager",
      superAdminCount: 1,
    }).ok,
    true,
  );
});
