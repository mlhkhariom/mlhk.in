"use client";

import { useState } from "react";
import Link from "next/link";
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
  Database,
  Lock,
  Download,
  Printer,
  Sparkles,
  Server,
  Layers,
  Terminal,
  Activity,
  Check,
  Copy,
  Clock,
  ExternalLink,
  Kanban,
  FileSpreadsheet,
  AlertTriangle,
  RefreshCw,
  Sliders,
  TrendingUp,
  Receipt,
  UserCheck,
  ShieldCheck,
  ShieldAlert,
  ArrowUpRight,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// SAC CODE DEFINITIONS & STATE CODES
// ─────────────────────────────────────────────────────────────────────────────

interface SacCodeOption {
  code: string;
  name: string;
  rate: number;
}

const SAC_CODES: SacCodeOption[] = [
  { code: "998314", name: "IT Design & Custom Software Development", rate: 18 },
  { code: "998313", name: "IT Consulting, ERP Scoping & Support Services", rate: 18 },
  { code: "998315", name: "Hosting, Cloud Infrastructure & Edge Deployment", rate: 18 },
  { code: "998319", name: "Other Information Technology Services n.e.c.", rate: 18 },
];

const STATE_CODES: Record<string, string> = {
  "23": "Madhya Pradesh (Home State - CGST + SGST)",
  "27": "Maharashtra (Inter-State - IGST)",
  "07": "Delhi (Inter-State - IGST)",
  "29": "Karnataka (Inter-State - IGST)",
  "24": "Gujarat (Inter-State - IGST)",
  "09": "Uttar Pradesh (Inter-State - IGST)",
  "08": "Rajasthan (Inter-State - IGST)",
};

// ─────────────────────────────────────────────────────────────────────────────
// RBAC MODULE DATA
// ─────────────────────────────────────────────────────────────────────────────

type RoleKey = "superadmin" | "branch_gm" | "cfo" | "operator";

interface RoleDef {
  key: RoleKey;
  title: string;
  badge: string;
  description: string;
  color: string;
  permissions: {
    financialLedgers: boolean;
    invoiceCreation: boolean;
    clientPii: boolean;
    payrollCompensation: boolean;
    inventoryTransfer: boolean;
    auditLogs: boolean;
    apiKeyMigration: boolean;
    systemConfig: boolean;
  };
}

const ROLES: RoleDef[] = [
  {
    key: "superadmin",
    title: "Managing Director / Superadmin",
    badge: "Executive Clearance",
    description: "Full sovereign oversight, master data governance, server configuration, and statutory sign-offs.",
    color: "text-blue-400 border-blue-500/40 bg-blue-500/10",
    permissions: {
      financialLedgers: true,
      invoiceCreation: true,
      clientPii: true,
      payrollCompensation: true,
      inventoryTransfer: true,
      auditLogs: true,
      apiKeyMigration: true,
      systemConfig: true,
    },
  },
  {
    key: "branch_gm",
    title: "Branch General Manager",
    badge: "Operational Clearance",
    description: "Multi-branch staff governance, customer order processing, inventory allocation, and local pipeline.",
    color: "text-cyan-400 border-cyan-500/40 bg-cyan-500/10",
    permissions: {
      financialLedgers: false,
      invoiceCreation: true,
      clientPii: true,
      payrollCompensation: false,
      inventoryTransfer: true,
      auditLogs: true,
      apiKeyMigration: false,
      systemConfig: false,
    },
  },
  {
    key: "cfo",
    title: "Chief Accountant / CFO",
    badge: "Financial Clearance",
    description: "General ledger reconciliation, GST return JSON exports, vendor payments, and tax filings.",
    color: "text-amber-400 border-amber-500/40 bg-amber-500/10",
    permissions: {
      financialLedgers: true,
      invoiceCreation: true,
      clientPii: false,
      payrollCompensation: true,
      inventoryTransfer: false,
      auditLogs: true,
      apiKeyMigration: false,
      systemConfig: false,
    },
  },
  {
    key: "operator",
    title: "Field Billing Operator",
    badge: "Restricted Clearance",
    description: "Front-desk point-of-sale invoicing, dispatch barcode scanning, and receipt printing with zero PII access.",
    color: "text-zinc-400 border-zinc-500/40 bg-zinc-500/10",
    permissions: {
      financialLedgers: false,
      invoiceCreation: true,
      clientPii: false,
      payrollCompensation: false,
      inventoryTransfer: false,
      auditLogs: false,
      apiKeyMigration: false,
      systemConfig: false,
    },
  },
];

const MODULE_LABELS: Record<string, { label: string; desc: string }> = {
  financialLedgers: { label: "Financial Ledgers & P&L", desc: "Access to balance sheets, gross profit margins, and bank accounts." },
  invoiceCreation: { label: "Tax Invoice Generation", desc: "Create, validate, and issue GST compliant B2B tax invoices." },
  clientPii: { label: "Confidential Client PII", desc: "View unmasked phone numbers, director contracts, and credit terms." },
  payrollCompensation: { label: "Payroll & Salaries", desc: "Employee compensation breakdown, provident fund, and bonuses." },
  inventoryTransfer: { label: "Multi-Branch Transfers", desc: "Initiate stock movements between regional warehouse hubs." },
  auditLogs: { label: "Tamper-Proof Audit Trail", desc: "Inspect user timestamps, IP addresses, and changed database records." },
  apiKeyMigration: { label: "Database & API Secrets", desc: "Run SQL migrations and generate external webhook API tokens." },
  systemConfig: { label: "Master System Settings", desc: "Configure company GSTIN, tax brackets, and RBAC policies." },
};

// ─────────────────────────────────────────────────────────────────────────────
// KANBAN DEAL DATA
// ─────────────────────────────────────────────────────────────────────────────

interface KanbanDeal {
  id: string;
  client: string;
  sector: string;
  value: number;
  location: string;
  stage: "discovery" | "scoping" | "quotation" | "execution" | "delivered";
}

const INITIAL_DEALS: KanbanDeal[] = [
  {
    id: "DL-101",
    client: "Central Agro-Tech Logistics",
    sector: "Cold Chain Inventory ERP",
    value: 650000,
    location: "Indore, MP",
    stage: "execution",
  },
  {
    id: "DL-102",
    client: "Malwa Solar EPC Consortium",
    sector: "Multi-Branch Billing & CRM",
    value: 480000,
    location: "Shajapur & Ujjain, MP",
    stage: "delivered",
  },
  {
    id: "DL-103",
    client: "Apex Medisurge Laboratories",
    sector: "NABL Sample Tracking LIMS",
    value: 820000,
    location: "Bhopal, MP",
    stage: "quotation",
  },
  {
    id: "DL-104",
    client: "Sovereign Engineering Works",
    sector: "Job-Work Machine Hour Billing",
    value: 350000,
    location: "Dewas Industrial Area",
    stage: "scoping",
  },
  {
    id: "DL-105",
    client: "Vedic Organics Exports Ltd",
    sector: "Custom Export Invoice & E-Way Bill",
    value: 520000,
    location: "Indore SEZ",
    stage: "discovery",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN ENTERPRISE SHOWCASE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function EnterpriseShowcase() {
  const [activeTab, setActiveTab] = useState<"invoicing" | "rbac" | "kanban" | "acid">("invoicing");

  // Invoicing Engine State
  const [baseAmount, setBaseAmount] = useState<number>(150000);
  const [buyerName, setBuyerName] = useState<string>("National Logistics Infrastructure Ltd");
  const [buyerGstin, setBuyerGstin] = useState<string>("23ABCDE1234F1Z5");
  const [selectedSac, setSelectedSac] = useState<string>("998314");
  const [isReverseCharge, setIsReverseCharge] = useState<boolean>(false);
  const [isCopiedQr, setIsCopiedQr] = useState<boolean>(false);
  const [invoiceDownloaded, setInvoiceDownloaded] = useState<boolean>(false);

  // RBAC State
  const [selectedRoleKey, setSelectedRoleKey] = useState<RoleKey>("superadmin");

  // Kanban State
  const [deals, setDeals] = useState<KanbanDeal[]>(INITIAL_DEALS);

  // ACID Simulator State
  const [isSimulatingAcid, setIsSimulatingAcid] = useState<boolean>(false);
  const [acidLog, setAcidLog] = useState<string[]>([]);
  const [inventoryCount, setInventoryCount] = useState<number>(100);

  // GST Calculation Logic
  const stateCodePrefix = buyerGstin.slice(0, 2);
  const isInterState = stateCodePrefix !== "23" && stateCodePrefix.length === 2;
  const currentSac = SAC_CODES.find((s) => s.code === selectedSac) ?? SAC_CODES[0];

  const cgstAmount = isInterState ? 0 : Math.round(baseAmount * 0.09);
  const sgstAmount = isInterState ? 0 : Math.round(baseAmount * 0.09);
  const igstAmount = isInterState ? Math.round(baseAmount * 0.18) : 0;
  const totalTaxAmount = cgstAmount + sgstAmount + igstAmount;
  const grandTotal = baseAmount + (isReverseCharge ? 0 : totalTaxAmount);

  const upiPayload = `upi://pay?pa=mlhkhariom@okaxis&pn=MLHK%20Infotech&mc=7372&tid=INV20260419&tr=INV-0419&am=${grandTotal}&cu=INR&tn=Tax%20Invoice%20Payment`;

  // Kanban Movement
  const moveDealNext = (dealId: string) => {
    const stageOrder: KanbanDeal["stage"][] = ["discovery", "scoping", "quotation", "execution", "delivered"];
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id === dealId) {
          const currentIndex = stageOrder.indexOf(d.stage);
          const nextIndex = Math.min(currentIndex + 1, stageOrder.length - 1);
          return { ...d, stage: stageOrder[nextIndex] };
        }
        return d;
      })
    );
  };

  // ACID Simulation Handler
  const runAcidSimulation = () => {
    setIsSimulatingAcid(true);
    setAcidLog([
      "[10:35:01.102] 5 simultaneous branches checkout item SKU-ERP-9988...",
      "[10:35:01.118] BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;",
      "[10:35:01.130] SELECT stock_qty FROM inventory WHERE sku = 'SKU-ERP-9988' FOR UPDATE;",
      "[10:35:01.144] [Row Lock Acquired] Branch 1 deducts 10 units (100 -> 90). Commit OK.",
      "[10:35:01.159] [Row Lock Transferred] Branch 2 deducts 15 units (90 -> 75). Commit OK.",
      "[10:35:01.171] [Row Lock Transferred] Branch 3 deducts 20 units (75 -> 55). Commit OK.",
      "[10:35:01.185] [Row Lock Transferred] Branch 4 deducts 5 units (55 -> 50). Commit OK.",
      "[10:35:01.198] [Row Lock Transferred] Branch 5 deducts 25 units (50 -> 25). Commit OK.",
      "[10:35:01.210] COMMIT; 5 transactions synchronized in 108ms. Phantom reads: 0. Race conditions: 0.",
    ]);
    setInventoryCount(25);
    setTimeout(() => {
      setIsSimulatingAcid(false);
    }, 1200);
  };

  const activeRole = ROLES.find((r) => r.key === selectedRoleKey) ?? ROLES[0];
  const totalPipelineValue = deals.reduce((acc, d) => acc + d.value, 0);

  return (
    <div className="space-y-24">
      {/* ───────────────────────────────────────────────────────────────────
          HERO MODULE: COBALT EXECUTIVE COMMAND CENTER
          ─────────────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-blue-500/25 bg-gradient-to-b from-[#060c1d] via-[#040815] to-[#02050b] p-6 md:p-12 shadow-[0_30px_100px_-20px_rgba(59,130,246,0.3)]">
        {/* Glow Spheres */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-600/15 blur-[140px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-indigo-600/15 blur-[130px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-[160px]"
        />

        {/* Section Header */}
        <div className="relative flex flex-col gap-4 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/40 bg-blue-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-300">
                <Building2 className="size-3.5 text-blue-400" />
                Sovereign Enterprise Architecture
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-[11px] text-amber-300">
                GSTIN: 23CHLPV2868R1CJ
              </span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] text-emerald-400">
                Zero Per-Seat SaaS Taxes
              </span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              Custom ERP, Indian GST Billing &amp;{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300 bg-clip-text text-transparent">
                ACID Concurrency
              </span>
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-300 md:text-base">
              Commercial SaaS solutions charge ₹4,000–₹10,000 per user every month, lock your financial records in
              foreign servers, and fail to support Indian GST workflows. MLHK Infotech engineers sovereign, private
              enterprise systems: unlimited users, 100% data ownership, automated HSN/SAC billing, and PostgreSQL
              transactional rigor.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="https://wa.me/919165100124?text=Hello%20MLHK%20Infotech%2C%20I%20am%20interested%20in%20custom%20ERP%20%2F%20CRM%20development%20and%20Indian%20GST%20billing."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
            >
              Consult Systems Architect <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────
            SHOWCASE INTERACTIVE MODE SELECTOR
            ───────────────────────────────────────────────────────────────── */}
        <div className="mt-8">
          <div className="flex flex-wrap items-center gap-2.5 border-b border-white/10 pb-4">
            {[
              { id: "invoicing", label: "Indian GST Tax Invoicing Engine", icon: Receipt },
              { id: "rbac", label: "Role-Based Access Control (RBAC)", icon: ShieldCheck },
              { id: "kanban", label: "Commercial Pipeline (Kanban)", icon: Kanban },
              { id: "acid", label: "PostgreSQL ACID Concurrency", icon: Database },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  type="button"
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-medium transition-all ${
                    isSelected
                      ? "border-blue-500/60 bg-blue-600/20 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] ring-1 ring-blue-500/50"
                      : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon className={`size-3.5 ${isSelected ? "text-blue-400" : "text-zinc-500"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* ─────────────────────────────────────────────────────────────
              TAB 1: LIVE INDIAN GST TAX INVOICE GENERATOR & PREVIEW
              ───────────────────────────────────────────────────────────── */}
          {activeTab === "invoicing" && (
            <div className="mt-8 grid gap-8 lg:grid-cols-12 items-start">
              {/* Left Column: Interactive Form Controls */}
              <div className="lg:col-span-5 space-y-4 rounded-2xl border border-white/10 bg-[#060912] p-5 md:p-6 shadow-inner">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-400">
                    B2B Tax Invoice Parameters
                  </span>
                  <span className="rounded bg-blue-500/10 px-2 py-0.5 font-mono text-[9px] text-blue-300">
                    Live Math Engine
                  </span>
                </div>

                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                    Buyer Entity Corporate Name
                  </label>
                  <input
                    type="text"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs text-white focus:border-blue-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                      Buyer 15-Digit GSTIN
                    </label>
                    <span className="font-mono text-[10px] text-zinc-400">
                      {STATE_CODES[stateCodePrefix] ?? "Other Jurisdiction"}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={buyerGstin}
                    onChange={(e) => setBuyerGstin(e.target.value.toUpperCase())}
                    maxLength={15}
                    className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs text-white focus:border-blue-500 focus:outline-none font-mono tracking-wider"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                    Select Service Accounting Code (SAC)
                  </label>
                  <select
                    value={selectedSac}
                    onChange={(e) => setSelectedSac(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-[#0b101d] px-3.5 py-2 text-xs text-white focus:border-blue-500 focus:outline-none font-mono"
                  >
                    {SAC_CODES.map((s) => (
                      <option key={s.code} value={s.code}>
                        SAC {s.code} — {s.name} ({s.rate}% GST)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                      Taxable Value (Base Price)
                    </span>
                    <span className="font-mono font-bold text-white">
                      ₹{baseAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="25000"
                    max="1000000"
                    step="25000"
                    value={baseAmount}
                    onChange={(e) => setBaseAmount(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-zinc-600 mt-1">
                    <span>₹25,000</span>
                    <span>₹5,00,000</span>
                    <span>₹10,00,000</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-zinc-300 font-medium">Reverse Charge Mechanism (RCM)</span>
                    <p className="text-[10px] text-zinc-500">Tax payable directly by recipient under Sec 9(3)</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsReverseCharge(!isReverseCharge)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      isReverseCharge ? "bg-blue-600" : "bg-zinc-700"
                    }`}
                  >
                    <span
                      className={`inline-block size-4 transform rounded-full bg-white transition duration-200 ease-in-out ${
                        isReverseCharge ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div className="rounded-xl border border-blue-500/20 bg-blue-950/20 p-3.5 text-xs text-zinc-300 space-y-1.5 font-mono">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Tax Type:</span>
                    <span className="text-white font-bold">
                      {isInterState ? "Inter-State (IGST 18%)" : "Intra-State (CGST 9% + SGST 9%)"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Tax Subtotal:</span>
                    <span className="text-amber-300 font-bold">₹{totalTaxAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-1">
                    <span className="text-white font-semibold">Grand Total:</span>
                    <span className="text-emerald-400 font-bold text-sm">
                      ₹{grandTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual B2B Tax Invoice Document */}
              <div className="lg:col-span-7 space-y-4">
                <div className="rounded-2xl border border-white/15 bg-white/[0.02] p-6 shadow-2xl relative overflow-hidden text-zinc-200 font-sans">
                  {/* Subtle Stamp Watermark */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute right-12 top-28 -rotate-12 rounded-xl border-4 border-emerald-500/20 px-6 py-2 font-mono text-xl font-black uppercase text-emerald-500/20"
                  >
                    ORIGINAL FOR RECIPIENT
                  </div>

                  {/* Document Header */}
                  <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-lg font-bold tracking-tight text-white">
                          MLHK INFOTECH
                        </span>
                        <span className="rounded bg-blue-500/20 px-2 py-0.5 font-mono text-[9px] text-blue-300">
                          TAX INVOICE
                        </span>
                      </div>
                      <p className="mt-1 font-mono text-[10px] text-zinc-400 leading-relaxed">
                        Barnawad, Shajapur District, Madhya Pradesh — 465118<br />
                        GSTIN: <strong className="text-white">23CHLPV2868R1CJ</strong><br />
                        MSME Udyam: <strong className="text-zinc-300">UDYAM-MP-44-0005223</strong><br />
                        Email: info@mlhk.in • Phone: +91 91651 00124
                      </p>
                    </div>

                    <div className="text-left sm:text-right font-mono text-xs">
                      <p className="text-zinc-500">Invoice No:</p>
                      <p className="font-bold text-white">MLHK/26-27/INV-0419</p>
                      <p className="mt-1 text-zinc-500">Invoice Date:</p>
                      <p className="text-zinc-300">17-Oct-2026</p>
                      <p className="mt-1 text-zinc-500">State Code:</p>
                      <p className="text-blue-400 font-bold">23 (Madhya Pradesh)</p>
                    </div>
                  </div>

                  {/* Billed To / Shipped To Box */}
                  <div className="mt-4 grid gap-4 rounded-xl border border-white/10 bg-black/40 p-3.5 sm:grid-cols-2 font-mono text-[11px]">
                    <div>
                      <span className="text-zinc-500 uppercase">Details of Receiver (Billed To):</span>
                      <p className="mt-1 font-bold text-white">{buyerName}</p>
                      <p className="text-zinc-400">GSTIN / UIN: {buyerGstin}</p>
                      <p className="text-zinc-500">Place of Supply: {STATE_CODES[stateCodePrefix] ?? "India"}</p>
                    </div>
                    <div>
                      <span className="text-zinc-500 uppercase">Statutory Tax Conditions:</span>
                      <p className="mt-1 text-zinc-300">
                        Reverse Charge: <strong className="text-white">{isReverseCharge ? "YES" : "NO"}</strong>
                      </p>
                      <p className="text-zinc-300">
                        Supply Category: <strong className="text-white">{isInterState ? "Inter-State (IGST)" : "Intra-State (CGST+SGST)"}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Itemized Table */}
                  <div className="mt-5 overflow-x-auto">
                    <table className="w-full text-left font-mono text-xs">
                      <thead>
                        <tr className="border-b border-white/10 text-[10px] uppercase text-zinc-500">
                          <th className="pb-2">Description of Service</th>
                          <th className="pb-2">SAC</th>
                          <th className="pb-2 text-right">Taxable Val</th>
                          <th className="pb-2 text-right">Rate</th>
                          <th className="pb-2 text-right">Tax Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-[11px]">
                        <tr>
                          <td className="py-3 text-white">
                            {currentSac.name}
                            <span className="block text-[10px] text-zinc-500">
                              Production code release, Drizzle ORM schema, &amp; Cloudflare Worker bindings
                            </span>
                          </td>
                          <td className="py-3 text-zinc-300">{selectedSac}</td>
                          <td className="py-3 text-right text-white">₹{baseAmount.toLocaleString("en-IN")}</td>
                          <td className="py-3 text-right text-zinc-300">18.00%</td>
                          <td className="py-3 text-right text-amber-300">
                            ₹{totalTaxAmount.toLocaleString("en-IN")}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Breakdown & Totals */}
                  <div className="mt-4 border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
                    {/* B2B Instant QR */}
                    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/60 p-2.5">
                      <div className="rounded bg-white p-1">
                        <QrCode className="size-12 text-black" />
                      </div>
                      <div className="text-[10px]">
                        <p className="font-bold text-white">Instant B2B UPI Payment</p>
                        <p className="text-zinc-400">Scan via BHIM / GPay / PhonePe</p>
                        <p className="text-blue-400 font-mono">mlhkhariom@okaxis</p>
                      </div>
                    </div>

                    {/* Numerical Tax Breakdown */}
                    <div className="w-full sm:w-64 space-y-1 text-xs">
                      <div className="flex justify-between text-zinc-400">
                        <span>Taxable Amount:</span>
                        <span className="text-white">₹{baseAmount.toLocaleString("en-IN")}</span>
                      </div>
                      {!isInterState && (
                        <>
                          <div className="flex justify-between text-zinc-400">
                            <span>CGST @ 9%:</span>
                            <span className="text-zinc-300">₹{cgstAmount.toLocaleString("en-IN")}</span>
                          </div>
                          <div className="flex justify-between text-zinc-400">
                            <span>SGST @ 9%:</span>
                            <span className="text-zinc-300">₹{sgstAmount.toLocaleString("en-IN")}</span>
                          </div>
                        </>
                      )}
                      {isInterState && (
                        <div className="flex justify-between text-zinc-400">
                          <span>IGST @ 18%:</span>
                          <span className="text-zinc-300">₹{igstAmount.toLocaleString("en-IN")}</span>
                        </div>
                      )}
                      <div className="border-t border-white/10 pt-1.5 flex justify-between text-sm font-bold">
                        <span className="text-white">Total Invoice:</span>
                        <span className="text-emerald-400">₹{grandTotal.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="mt-5 border-t border-white/10 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="font-mono text-[10px] text-zinc-500">
                      Authorised Signatory: Hariom Vishwkarma (Founder)
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setInvoiceDownloaded(true);
                          setTimeout(() => setInvoiceDownloaded(false), 2500);
                        }}
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] text-white hover:bg-white/[0.08] transition-colors"
                      >
                        {invoiceDownloaded ? <Check className="size-3.5 text-emerald-400" /> : <Download className="size-3.5" />}
                        <span>{invoiceDownloaded ? "PDF Generated" : "Download Tax Invoice PDF"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TAB 2: GRANULAR ROLE-BASED ACCESS CONTROL (RBAC)
              ───────────────────────────────────────────────────────────── */}
          {activeTab === "rbac" && (
            <div className="mt-8 space-y-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {ROLES.map((role) => {
                  const isSelected = role.key === selectedRoleKey;
                  return (
                    <button
                      key={role.key}
                      onClick={() => setSelectedRoleKey(role.key)}
                      type="button"
                      className={`group relative flex flex-col items-start rounded-2xl border p-4 text-left transition-all ${
                        isSelected
                          ? "border-blue-500/60 bg-blue-950/40 shadow-[0_10px_35px_-10px_rgba(59,130,246,0.4)] ring-1 ring-blue-500/50"
                          : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex w-full items-center justify-between">
                        <span className={`rounded px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${role.color}`}>
                          {role.badge}
                        </span>
                        {isSelected && <span className="size-2 rounded-full bg-blue-400 shadow-[0_0_8px_#3b82f6]" />}
                      </div>
                      <h4 className="mt-2.5 font-display text-sm font-bold text-white transition-colors group-hover:text-blue-300">
                        {role.title}
                      </h4>
                      <p className="mt-1 line-clamp-2 text-[11px] text-zinc-400">
                        {role.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Permission Matrix Grid */}
              <div className="rounded-2xl border border-white/10 bg-[#060810] p-6 shadow-inner">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h4 className="font-display text-lg font-bold text-white">
                      Effective Clearance Matrix for: <span className="text-blue-400">{activeRole.title}</span>
                    </h4>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Granular API route guards &amp; PostgreSQL row-level security (RLS) policies.
                    </p>
                  </div>
                  <span className="font-mono text-xs text-emerald-400">
                    Better-Auth + RBAC Middleware Active
                  </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {Object.entries(MODULE_LABELS).map(([key, info]) => {
                    const isGranted = activeRole.permissions[key as keyof typeof activeRole.permissions];
                    return (
                      <div
                        key={key}
                        className={`rounded-xl border p-4 transition-all ${
                          isGranted
                            ? "border-emerald-500/30 bg-emerald-950/15"
                            : "border-rose-500/20 bg-rose-950/10 opacity-75"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-display text-xs font-bold text-white">{info.label}</span>
                          {isGranted ? (
                            <span className="flex items-center gap-1 rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
                              <CheckCircle2 className="size-3" /> ALLOWED
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 rounded bg-rose-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-rose-400">
                              <XCircle className="size-3" /> BLOCKED
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-[11px] text-zinc-400 leading-relaxed">{info.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TAB 3: COMMERCIAL PIPELINE & WEIGHTED REVENUE KANBAN
              ───────────────────────────────────────────────────────────── */}
          {activeTab === "kanban" && (
            <div className="mt-8 space-y-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4">
                <div>
                  <h4 className="font-display text-lg font-bold text-white">
                    Active Enterprise Lead Pipeline &amp; Weighted Forecasting
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Click &quot;Advance Stage&quot; on any card to simulate pipeline velocity and auto-calculate weighted cashflow.
                  </p>
                </div>
                <div className="flex items-center gap-3 font-mono text-xs">
                  <span className="text-zinc-500">Total Pipeline Value:</span>
                  <span className="font-display text-lg font-bold text-emerald-400">
                    ₹{totalPipelineValue.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* 5 Column Kanban Board */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  { id: "discovery", title: "1. Discovery", badge: "New Inbound" },
                  { id: "scoping", title: "2. Technical Scope", badge: "Architecture" },
                  { id: "quotation", title: "3. GST Quotation", badge: "Commercials" },
                  { id: "execution", title: "4. Development", badge: "Under Sprint" },
                  { id: "delivered", title: "5. Delivered", badge: "Paid & Invoiced" },
                ].map((col) => {
                  const stageDeals = deals.filter((d) => d.stage === col.id);
                  const stageValue = stageDeals.reduce((acc, d) => acc + d.value, 0);
                  return (
                    <div
                      key={col.id}
                      className="rounded-2xl border border-white/10 bg-[#060810] p-4 space-y-3 flex flex-col justify-between min-h-[380px]"
                    >
                      <div>
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                          <h5 className="font-display text-xs font-bold text-white">{col.title}</h5>
                          <span className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[9px] text-zinc-400">
                            {stageDeals.length}
                          </span>
                        </div>
                        <p className="mt-1 font-mono text-[10px] text-blue-400">
                          ₹{stageValue.toLocaleString("en-IN")}
                        </p>

                        <div className="mt-3 space-y-3">
                          {stageDeals.map((deal) => (
                            <div
                              key={deal.id}
                              className="rounded-xl border border-white/10 bg-white/[0.03] p-3 space-y-2 hover:border-blue-500/40 transition-colors"
                            >
                              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                                <span>{deal.id}</span>
                                <span className="text-zinc-400">{deal.location}</span>
                              </div>
                              <h6 className="font-display text-xs font-bold text-white">{deal.client}</h6>
                              <p className="text-[10px] text-zinc-400">{deal.sector}</p>
                              <div className="pt-1 flex items-center justify-between text-xs font-mono">
                                <span className="font-bold text-emerald-400">
                                  ₹{deal.value.toLocaleString("en-IN")}
                                </span>
                                {deal.stage !== "delivered" && (
                                  <button
                                    onClick={() => moveDealNext(deal.id)}
                                    type="button"
                                    className="rounded bg-blue-500/20 px-2 py-0.5 text-[9px] font-semibold text-blue-300 hover:bg-blue-500/40 transition-colors"
                                  >
                                    Advance →
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/5 text-center text-[10px] font-mono text-zinc-600">
                        {col.badge}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TAB 4: POSTGRESQL ACID CONCURRENCY & ROW-LOCKING
              ───────────────────────────────────────────────────────────── */}
          {activeTab === "acid" && (
            <div className="mt-8 grid gap-8 lg:grid-cols-12 items-start">
              <div className="lg:col-span-5 space-y-4 rounded-2xl border border-white/10 bg-[#060810] p-6 shadow-inner">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-400">
                    ACID Isolation Engine
                  </span>
                  <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] text-emerald-400">
                    PostgreSQL 16 Serializable
                  </span>
                </div>

                <h4 className="font-display text-lg font-bold text-white">
                  Multi-Branch Stock Protection: Row Locks (`FOR UPDATE`)
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  When 5 branch operators sell the exact same SKU in Indore, Bhopal, and Shajapur at the exact same
                  millisecond, naive databases suffer race conditions and oversell inventory.
                </p>

                <div className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-400">Shared Warehouse SKU:</span>
                    <span className="text-white font-bold">SKU-ERP-9988</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-400">Current Stock Balance:</span>
                    <span className="text-emerald-400 font-bold text-sm">{inventoryCount} Units</span>
                  </div>
                </div>

                <button
                  onClick={runAcidSimulation}
                  disabled={isSimulatingAcid}
                  type="button"
                  className="w-full rounded-xl bg-blue-600 py-3 text-center text-xs font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] disabled:opacity-50"
                >
                  {isSimulatingAcid ? "Locking Rows & Synchronizing..." : "Simulate 5 Concurrent Branch Checkouts"}
                </button>
              </div>

              {/* Log Output on Right */}
              <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#05060c] p-5 shadow-inner">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Terminal className="size-4 text-blue-400" />
                    <span>PostgreSQL Connection Pool Trace</span>
                  </div>
                  <span className="text-emerald-400">0 Deadlocks</span>
                </div>

                <pre className="mt-4 overflow-x-auto rounded-xl border border-white/5 bg-black/70 p-4 font-mono text-xs leading-relaxed text-zinc-300 min-h-[220px]">
                  {acidLog.length === 0 ? (
                    <span className="text-zinc-600">// Click &apos;Simulate 5 Concurrent Branch Checkouts&apos; to view live database trace...</span>
                  ) : (
                    acidLog.map((log, i) => <div key={i} className="py-0.5">{log}</div>)
                  )}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
