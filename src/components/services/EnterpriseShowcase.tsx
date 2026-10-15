"use client";

import { useState } from "react";
import {
  Building2,
  FileText,
  Calculator,
  Shield,
  Users,
  CheckCircle2,
  XCircle,
  QrCode,
  DollarSign,
  ArrowRight,
} from "lucide-react";

export function EnterpriseShowcase() {
  const [activeTab, setActiveTab] = useState<"invoicing" | "rbac" | "kanban">("invoicing");
  const [baseAmount, setBaseAmount] = useState<number>(100000);
  const [isInterState, setIsInterState] = useState<boolean>(false);
  const [clientName, setClientName] = useState<string>("National Enterprise Ltd");
  const [activeRole, setActiveRole] = useState<"md" | "accounts" | "lead" | "field">("accounts");

  // Calculations
  const cgst = isInterState ? 0 : baseAmount * 0.09;
  const sgst = isInterState ? 0 : baseAmount * 0.09;
  const igst = isInterState ? baseAmount * 0.18 : 0;
  const totalAmount = baseAmount + cgst + sgst + igst;

  return (
    <div className="space-y-20">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#0a0c10] via-[#07080a] to-[#050607] p-6 md:p-10 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9)]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#ff9f1c]/10 blur-[120px]"
        />

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
                <Building2 className="size-3 text-[#ff9f1c]" />
                Sovereign Enterprise Architecture
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-zinc-400 font-mono">
                Zero Per-User SaaS Fees
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Automated GST Invoicing Engine &amp; RBAC Security
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-zinc-400">
              Interactive simulator demonstrating automated tax-compliant billing, granular employee
              role permissions, and custom operational pipelines tailored to Indian enterprise law.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "invoicing", label: "GST Billing Engine" },
              { id: "rbac", label: "Role Permissions (RBAC)" },
              { id: "kanban", label: "Kanban Pipeline" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id as typeof activeTab)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                  activeTab === t.id
                    ? "border-[#ff9f1c]/60 bg-[#ff9f1c]/15 text-[#ffb84d]"
                    : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: GST BILLING SIMULATOR */}
        {activeTab === "invoicing" && (
          <div className="mt-8 grid gap-8 lg:grid-cols-12 items-center">
            {/* Input Controls */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                  Recipient Enterprise Name
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs text-white focus:border-[#ff9f1c] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                  Base Project Value (₹)
                </label>
                <input
                  type="number"
                  value={baseAmount}
                  onChange={(e) => setBaseAmount(Number(e.target.value) || 0)}
                  className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs text-white font-mono focus:border-[#ff9f1c] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-2">
                  Tax Jurisdiction
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsInterState(false)}
                    className={`rounded-xl border p-2.5 text-xs font-medium text-left ${
                      !isInterState
                        ? "border-[#ff9f1c]/60 bg-[#ff9f1c]/15 text-[#ffb84d]"
                        : "border-white/10 bg-white/[0.02] text-zinc-400"
                    }`}
                  >
                    <span className="font-bold block">Intra-State (MP)</span>
                    <span className="text-[10px] font-mono text-zinc-400">CGST 9% + SGST 9%</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsInterState(true)}
                    className={`rounded-xl border p-2.5 text-xs font-medium text-left ${
                      isInterState
                        ? "border-[#ff9f1c]/60 bg-[#ff9f1c]/15 text-[#ffb84d]"
                        : "border-white/10 bg-white/[0.02] text-zinc-400"
                    }`}
                  >
                    <span className="font-bold block">Inter-State</span>
                    <span className="text-[10px] font-mono text-zinc-400">IGST 18%</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Generated Invoice Preview Card */}
            <div className="lg:col-span-7 rounded-2xl border border-white/15 bg-[#07080a] p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="font-display text-base font-bold text-white">TAX INVOICE</span>
                  <span className="text-[10px] font-mono text-zinc-400 block">
                    GSTIN: 23CHLPV2868R1CJ • MLHK Infotech
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-[#ffb84d]">
                    #MLHK-INV-2026-0412
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 block">SAC: 998314</span>
                </div>
              </div>

              <div className="text-xs space-y-2 border-b border-white/10 pb-4">
                <div className="flex justify-between text-zinc-400">
                  <span>Billed To:</span>
                  <span className="font-semibold text-white">{clientName || "Client"}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Service Description:</span>
                  <span className="text-zinc-200">Custom ERP &amp; Automation Architecture</span>
                </div>
              </div>

              {/* Amount Breakdown */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Base Taxable Value:</span>
                  <span className="text-white">₹{baseAmount.toLocaleString("en-IN")}</span>
                </div>

                {!isInterState ? (
                  <>
                    <div className="flex justify-between text-zinc-400">
                      <span>Central GST (CGST 9%):</span>
                      <span className="text-emerald-400">+₹{cgst.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>State GST (SGST 9%):</span>
                      <span className="text-emerald-400">+₹{sgst.toLocaleString("en-IN")}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between text-zinc-400">
                    <span>Integrated GST (IGST 18%):</span>
                    <span className="text-emerald-400">+₹{igst.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-white/10 flex justify-between items-center text-sm font-bold">
                  <span className="text-white">Grand Total Payable:</span>
                  <span className="text-[#ff9f1c] text-base">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-white/5 bg-black/40 p-3 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <span>Payment Mode: UPI Instant / NEFT Bank Mandate</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="size-3" /> QR Validated
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RBAC MATRIX */}
        {activeTab === "rbac" && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "md", label: "Managing Director" },
                { id: "accounts", label: "Finance / Accounts" },
                { id: "lead", label: "Project Manager" },
                { id: "field", label: "Field Technician" },
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setActiveRole(r.id as typeof activeRole)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                    activeRole === r.id
                      ? "border-[#ff9f1c]/60 bg-[#ff9f1c]/15 text-[#ffb84d]"
                      : "border-white/10 bg-white/[0.02] text-zinc-400"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.01]">
              <div className="grid grid-cols-12 border-b border-white/10 bg-white/[0.04] p-3.5 text-xs font-semibold uppercase text-zinc-400 font-mono">
                <div className="col-span-8">System Operation / Permission</div>
                <div className="col-span-4 text-right">Access Status</div>
              </div>

              <div className="divide-y divide-white/5 text-xs">
                {[
                  {
                    perm: "View Corporate P&L and Balance Sheet",
                    roles: ["md", "accounts"],
                  },
                  {
                    perm: "Generate & Dispatch Statutory GST Invoices",
                    roles: ["md", "accounts"],
                  },
                  {
                    perm: "Edit Client Contracts & Project Scopes",
                    roles: ["md", "lead"],
                  },
                  {
                    perm: "Submit Field Inspection Reports & Photos",
                    roles: ["md", "lead", "field"],
                  },
                  {
                    perm: "Export Entire Database Snapshot (Disaster Recovery)",
                    roles: ["md"],
                  },
                ].map((p) => {
                  const hasAccess = p.roles.includes(activeRole);
                  return (
                    <div
                      key={p.perm}
                      className="grid grid-cols-12 p-3.5 items-center hover:bg-white/[0.02]"
                    >
                      <div className="col-span-8 text-zinc-300 font-medium">{p.perm}</div>
                      <div className="col-span-4 text-right">
                        {hasAccess ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-mono text-[11px]">
                            <CheckCircle2 className="size-3.5" /> Granted
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-zinc-600 font-mono text-[11px]">
                            <XCircle className="size-3.5" /> Restricted
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: KANBAN PIPELINE */}
        {activeTab === "kanban" && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { stage: "New Inquiry", count: 4, val: "₹3.8L", color: "border-blue-500/30" },
              { stage: "Technical Discovery", count: 2, val: "₹5.4L", color: "border-amber-500/30" },
              { stage: "Proposal Dispatched", count: 3, val: "₹7.2L", color: "border-purple-500/30" },
              { stage: "Contract Closed", count: 6, val: "₹14.6L", color: "border-emerald-500/30" },
            ].map((col) => (
              <div key={col.stage} className={`rounded-2xl border ${col.color} bg-white/[0.02] p-4`}>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-xs font-bold text-white">{col.stage}</span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-mono text-zinc-300">
                    {col.count}
                  </span>
                </div>
                <div className="mt-3 text-[11px] font-mono text-[#ffb84d]">Value: {col.val}</div>
                <div className="mt-3 rounded-xl border border-white/5 bg-black/40 p-3 text-xs space-y-1">
                  <span className="font-semibold text-white block">Enterprise CRM System</span>
                  <span className="text-[10px] text-zinc-500 block">Indore Commercial Hub</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
