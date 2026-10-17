"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bot,
  Zap,
  Play,
  RotateCcw,
  CheckCircle2,
  MessageSquare,
  Database,
  Send,
  Layers,
  ArrowRight,
  Cpu,
  Terminal,
  Activity,
  FileCode,
  FileText,
  Scan,
  Check,
  Copy,
  Clock,
  Sparkles,
  ExternalLink,
  Workflow,
  Network,
  Share2,
  CheckCheck,
  Smartphone,
  ShieldCheck,
  CornerDownRight,
  GitFork,
  Radio,
  Sliders,
  AlertCircle,
  Eye,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// DATA TYPES & DAG DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

type DagNodeId = "webhook" | "ocr" | "llm" | "db" | "dispatch" | "alert";

interface DagNode {
  id: DagNodeId;
  stepNumber: number;
  title: string;
  badge: string;
  latency: string;
  description: string;
  inputs: string;
  outputs: string;
  samplePayload: string;
}

const DAG_NODES: DagNode[] = [
  {
    id: "webhook",
    stepNumber: 1,
    title: "Inbound Event & Webhook Ingest",
    badge: "12ms Ingestion",
    latency: "12ms",
    description: "Captures raw HTTP POST payload from Meta WhatsApp Cloud API or website enterprise form.",
    inputs: "HTTP POST request with bearer signature verification",
    outputs: "Sanitized JSON payload with sender phone, timestamp, and message body",
    samplePayload: `{\n  "event": "messages.received",\n  "sender": "+9198260XXXXX",\n  "senderName": "Rajesh Sharma",\n  "city": "Indore, MP",\n  "message": "Looking for custom ERP with GST billing for our 3 warehouses."\n}`,
  },
  {
    id: "ocr",
    stepNumber: 2,
    title: "Document Vision & OCR Processing",
    badge: "Multimodal Vision",
    latency: "240ms",
    description: "Extracts tabular parameters from attached purchase orders, tax invoices, or handwritten challans.",
    inputs: "PDF / Image buffer (PNG, JPEG)",
    outputs: "Normalized text tokens with bounding coordinates and key-value pairs",
    samplePayload: `{\n  "documentType": "PurchaseOrder_PDF",\n  "poNumber": "PO-2026-9912",\n  "estimatedBudget": "₹6,50,000",\n  "skuCount": 42,\n  "deliveryDeadline": "45 Days"\n}`,
  },
  {
    id: "llm",
    stepNumber: 3,
    title: "LLM Intent & Commercial Scorer",
    badge: "Deterministic RAG",
    latency: "380ms",
    description: "Gemini / Claude engine extracts buyer intent, budget tier, and priority routing.",
    inputs: "Parsed conversation transcript + MLHK Infotech service catalog embeddings",
    outputs: "Structured classification schema with confidence score",
    samplePayload: `{\n  "serviceCategory": "Enterprise Systems (Custom ERP)",\n  "intent": "High Commercial Intent",\n  "buyerTier": "Enterprise B2B",\n  "budgetQualification": "₹5L - ₹10L",\n  "confidenceScore": 0.994\n}`,
  },
  {
    id: "db",
    stepNumber: 4,
    title: "PostgreSQL CRM State Sync",
    badge: "ACID Transaction",
    latency: "28ms",
    description: "Upserts lead into PostgreSQL relational tables, records lead origin, and generates quote draft.",
    inputs: "Classified enterprise entity payload",
    outputs: "Unique lead UUID, pipeline deal ID, and assigned architect",
    samplePayload: `{\n  "status": "UPSERT_SUCCESS",\n  "leadId": "lead_9f81a7",\n  "pipelineStage": "Technical Scoping",\n  "assignedArchitect": "Hariom Vishwkarma",\n  "autoQuoteGenerated": true\n}`,
  },
  {
    id: "dispatch",
    stepNumber: 5,
    title: "Autonomous WhatsApp Response Dispatch",
    badge: "Sub-Second Delivery",
    latency: "85ms",
    description: "Dispatches personalized WhatsApp template with scoping options and direct architect calendar link.",
    inputs: "Contextual response tokens from RAG engine",
    outputs: "WhatsApp Cloud API 200 OK message delivery confirmation",
    samplePayload: `{\n  "whatsappMessageId": "wamid.HBgLOTE5...",\n  "deliveryStatus": "delivered",\n  "responseTemplate": "enterprise_scoping_v2",\n  "responseLatencyMs": 745\n}`,
  },
  {
    id: "alert",
    stepNumber: 6,
    title: "Executive Desk Notification (Slack/Telegram)",
    badge: "Priority Notification",
    latency: "45ms",
    description: "Alerts Hariom Vishwkarma and the core engineering desk with instant lead telemetry.",
    inputs: "Lead summary card + direct WhatsApp call link",
    outputs: "Instant bot message broadcast to internal engineering channels",
    samplePayload: `{\n  "channel": "#executive-leads",\n  "summary": "High-Intent Enterprise ERP Lead: Rajesh Sharma (Indore, ₹6.5L)",\n  "priority": "HIGH_P1"\n}`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CHATBOT SIMULATION DATA
// ─────────────────────────────────────────────────────────────────────────────

interface ChatPreset {
  key: string;
  label: string;
  userMessage: string;
  botReply: {
    text: string;
    actionButtons: string[];
    extractedFacts: string[];
  };
}

const CHAT_PRESETS: ChatPreset[] = [
  {
    key: "erp",
    label: "Custom ERP & GST Invoicing",
    userMessage: "Hello MLHK team, we operate 3 industrial warehouses across Indore and Dewas. Can you build a custom ERP with automated GST billing and zero per-user fees?",
    botReply: {
      text: "Namaste! Yes, absolutely. MLHK Infotech engineers sovereign, private ERP systems with 100% data ownership and zero recurring seat licenses.\n\nOur engine handles automated 15-digit GSTIN tax math (CGST 9% + SGST 9% or IGST 18%), HSN/SAC code mapping, multi-branch inventory row-locking via PostgreSQL, and pixel-perfect PDF invoices with embedded UPI payment QR codes.",
      actionButtons: [
        "View Live GST Billing Demo",
        "Schedule Technical Scoping Call",
        "Download ERP Architecture PDF",
      ],
      extractedFacts: [
        "Company Intent: Custom ERP & Warehouse Inventory",
        "Jurisdiction: Madhya Pradesh (Indore & Dewas)",
        "Zero-SaaS Requirement: Confirmed",
      ],
    },
  },
  {
    key: "android",
    label: "Native Android App (Offline)",
    userMessage: "We need an Android app for field inspectors working in rural MP with poor internet. Need offline SQLite and barcode scanning.",
    botReply: {
      text: "Understood. We engineer native Android applications in Kotlin and Java using Room SQLite with 256-bit AES SQLCipher encryption.\n\nAll inspections, barcode scans (via CameraX 1.4+), and signatures are saved instantly on-device in under 8ms. When connectivity returns, Android WorkManager automatically batches and syncs delta records to your private server.",
      actionButtons: [
        "View Mobile App Hardware Demo",
        "Request Play Store Scoping",
        "Book Direct WhatsApp Call",
      ],
      extractedFacts: [
        "Platform: Native Android (Kotlin)",
        "Core Feature: Offline Room SQLite + SQLCipher",
        "Hardware: CameraX Barcode Scanner",
      ],
    },
  },
  {
    key: "aeo",
    label: "AEO / GEO Search Authority",
    userMessage: "How do you get our B2B company cited as the primary answer when clients ask ChatGPT and Perplexity?",
    botReply: {
      text: "We implement 2026 Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO).\n\nWe structure your digital footprint into verified Schema.org triplets, deploy /llms.txt manifests, and triangulate corporate entity registrations across Wikidata and Government MSME/GSTIN registries so AI search crawlers cite your brand with 100% factual confidence.",
      actionButtons: [
        "Simulate AI Citation Mesh",
        "Request Free GEO Audit",
        "View Schema Triplet Graph",
      ],
      extractedFacts: [
        "Goal: ChatGPT & Perplexity Citations",
        "Strategy: Schema.org Triangulation + llms.txt",
        "Standard: 2026 GEO & AEO Architecture",
      ],
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DOCUMENT OCR SIMULATION DATA
// ─────────────────────────────────────────────────────────────────────────────

interface OcrDoc {
  key: string;
  title: string;
  type: string;
  rawSample: string;
  extractedParams: {
    field: string;
    value: string;
    confidence: string;
  }[];
}

const OCR_DOCS: OcrDoc[] = [
  {
    key: "tax-invoice",
    title: "B2B Tax Invoice (PDF)",
    type: "Vendor Commercial Invoice",
    rawSample: "TAX INVOICE #MLHK/26-27/INV-0419\nDate: 17-Oct-2026\nSupplier GSTIN: 23CHLPV2868R1CJ (MLHK Infotech, MP)\nRecipient: Central Logistics Ltd (GSTIN: 23ABCDE1234F1Z5)\nSAC: 998314 - IT Software Development\nTaxable Val: INR 1,50,000.00\nCGST 9%: INR 13,500.00 | SGST 9%: INR 13,500.00\nTotal: INR 1,77,000.00\nUPI: mlhkhariom@okaxis",
    extractedParams: [
      { field: "supplier_gstin", value: "23CHLPV2868R1CJ", confidence: "99.9%" },
      { field: "sac_code", value: "998314", confidence: "99.8%" },
      { field: "taxable_amount", value: "₹1,50,000.00", confidence: "100.0%" },
      { field: "cgst_amount", value: "₹13,500.00", confidence: "100.0%" },
      { field: "sgst_amount", value: "₹13,500.00", confidence: "100.0%" },
      { field: "grand_total", value: "₹1,77,000.00", confidence: "100.0%" },
    ],
  },
  {
    key: "challan",
    title: "Handwritten Warehouse Challan",
    type: "Field Dispatch Record",
    rawSample: "DISPATCH CHALLAN - MALWA DEPOT\nDate: 16/10/26 | Vehicle: MP-44-GA-1234\nItem: Solar Pump Inverter 5HP (Qty: 25 Units)\nBatch: BATCH-SP-2026-X\nRecipient: Erotix Green Energy Depot Shajapur\nReceived by: S. Verma (Signature Verified)",
    extractedParams: [
      { field: "vehicle_number", value: "MP-44-GA-1234", confidence: "98.5%" },
      { field: "item_sku", value: "SOLAR-INV-5HP", confidence: "99.2%" },
      { field: "dispatched_quantity", value: "25 Units", confidence: "99.7%" },
      { field: "depot_location", value: "Shajapur, MP", confidence: "99.4%" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function AiAutomationShowcase() {
  const [activeTab, setActiveTab] = useState<"dag" | "whatsapp" | "ocr">("dag");

  // DAG State
  const [selectedNodeId, setSelectedNodeId] = useState<DagNodeId>("webhook");
  const [isExecutingDag, setIsExecutingDag] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1, 2, 3, 4, 5, 6]);

  // WhatsApp State
  const [selectedChatPresetKey, setSelectedChatPresetKey] = useState<string>("erp");
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // OCR State
  const [selectedDocKey, setSelectedDocKey] = useState<string>("tax-invoice");
  const [isScanningOcr, setIsScanningOcr] = useState<boolean>(false);

  const activeNode = DAG_NODES.find((n) => n.id === selectedNodeId) ?? DAG_NODES[0];
  const activeChatPreset = CHAT_PRESETS.find((c) => c.key === selectedChatPresetKey) ?? CHAT_PRESETS[0];
  const activeOcrDoc = OCR_DOCS.find((d) => d.key === selectedDocKey) ?? OCR_DOCS[0];

  // DAG Execution Simulator
  const handleExecuteDag = () => {
    setIsExecutingDag(true);
    setCompletedSteps([]);
    let current = 1;
    const interval = setInterval(() => {
      setCompletedSteps((prev) => [...prev, current]);
      current += 1;
      if (current > 6) {
        clearInterval(interval);
        setIsExecutingDag(false);
      }
    }, 400);
  };

  // OCR Simulator
  const handleTriggerOcr = (docKey: string) => {
    setSelectedDocKey(docKey);
    setIsScanningOcr(true);
    setTimeout(() => {
      setIsScanningOcr(false);
    }, 800);
  };

  return (
    <div className="space-y-24">
      {/* ───────────────────────────────────────────────────────────────────
          HERO MODULE: QUANTUM BIOLUMINESCENT AUTOMATION PIPELINE
          ─────────────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-emerald-500/25 bg-gradient-to-b from-[#04100c] via-[#030907] to-[#010504] p-6 md:p-12 shadow-[0_30px_100px_-20px_rgba(16,185,129,0.25)]">
        {/* Glow Spheres */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/15 blur-[140px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[130px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-teal-500/5 blur-[160px]"
        />

        {/* Section Header */}
        <div className="relative flex flex-col gap-4 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                <Bot className="size-3.5 text-emerald-400" />
                Autonomous Multi-Agent Systems
              </span>
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-[11px] text-cyan-300">
                n8n Webhook DAGs
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-zinc-400">
                WhatsApp Cloud API
              </span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              Autonomous AI Agents, Workflows &amp;{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Document Vision
              </span>
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-300 md:text-base">
              Replace manual data entry, slow email handoffs, and delayed customer replies with event-driven
              multi-node pipelines. We connect your databases, WhatsApp Business accounts, and OCR document models
              into 24/7 deterministic agents that execute in milliseconds without human fatigue.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="https://wa.me/919165100124?text=Hello%20MLHK%20Infotech%2C%20I%20am%20interested%20in%20autonomous%20AI%20automation%20and%20n8n%20workflow%20engineering."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
            >
              Architect Your Automation <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────
            SHOWCASE INTERACTIVE MODE SELECTOR
            ───────────────────────────────────────────────────────────────── */}
        <div className="mt-8">
          <div className="flex flex-wrap items-center gap-2.5 border-b border-white/10 pb-4">
            {[
              { id: "dag", label: "Multi-Node DAG Workflow Simulator", icon: Workflow },
              { id: "whatsapp", label: "Autonomous WhatsApp AI Chatbot", icon: Smartphone },
              { id: "ocr", label: "Document Vision & Invoice Extraction", icon: Scan },
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
                      ? "border-emerald-500/60 bg-emerald-600/20 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] ring-1 ring-emerald-500/50"
                      : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon className={`size-3.5 ${isSelected ? "text-emerald-400" : "text-zinc-500"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* ─────────────────────────────────────────────────────────────
              TAB 1: MULTI-NODE DAG WORKFLOW SIMULATOR
              ───────────────────────────────────────────────────────────── */}
          {activeTab === "dag" && (
            <div className="mt-8 space-y-8">
              {/* DAG Trigger Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#060b09] p-5 shadow-inner">
                <div>
                  <h4 className="font-display text-base font-bold text-white">
                    Event-Driven Directed Acyclic Graph (DAG) Trace
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Click any node in the pipeline below to inspect its live JSON input/output schema.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleExecuteDag}
                  disabled={isExecutingDag}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] disabled:opacity-50"
                >
                  {isExecutingDag ? (
                    <>
                      <RotateCcw className="size-3.5 animate-spin" />
                      Tracing Pipeline Nodes...
                    </>
                  ) : (
                    <>
                      <Play className="size-3.5 fill-current" />
                      Execute Live Pipeline Simulation
                    </>
                  )}
                </button>
              </div>

              {/* Visual Nodes Ribbon */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
                {DAG_NODES.map((node) => {
                  const isSelected = node.id === selectedNodeId;
                  const isFinished = completedSteps.includes(node.stepNumber);
                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`cursor-pointer group relative flex flex-col justify-between rounded-2xl border p-4 transition-all ${
                        isSelected
                          ? "border-emerald-500/70 bg-emerald-950/40 shadow-[0_8px_30px_rgba(16,185,129,0.3)] ring-1 ring-emerald-500/50"
                          : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] text-zinc-500">Node {node.stepNumber}</span>
                          {isFinished ? (
                            <span className="flex size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                          ) : (
                            <span className="size-2 rounded-full bg-zinc-700" />
                          )}
                        </div>
                        <h5 className="mt-2 font-display text-xs font-bold text-white transition-colors group-hover:text-emerald-300">
                          {node.title}
                        </h5>
                        <p className="mt-1 line-clamp-2 text-[10px] text-zinc-400 leading-relaxed">
                          {node.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-zinc-500">Latency:</span>
                        <span className="text-emerald-400 font-bold">{node.latency}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Node Inspector Details Box */}
              <div className="grid gap-8 lg:grid-cols-12 items-start rounded-2xl border border-white/10 bg-[#050907] p-6 shadow-inner">
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300">
                      Node {activeNode.stepNumber} Inspector
                    </span>
                    <span className="font-mono text-xs text-zinc-500">{activeNode.badge}</span>
                  </div>
                  <h4 className="font-display text-xl font-bold text-white">
                    {activeNode.title}
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {activeNode.description}
                  </p>

                  <div className="space-y-2.5 text-xs">
                    <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                      <span className="text-[10px] uppercase font-mono text-zinc-500">Input Signature:</span>
                      <p className="mt-0.5 text-zinc-300 font-mono text-[11px]">{activeNode.inputs}</p>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                      <span className="text-[10px] uppercase font-mono text-zinc-500">Output Contract:</span>
                      <p className="mt-0.5 text-emerald-300 font-mono text-[11px]">{activeNode.outputs}</p>
                    </div>
                  </div>
                </div>

                {/* JSON Payload Preview */}
                <div className="lg:col-span-7 rounded-xl border border-white/10 bg-black/70 p-4 shadow-inner">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-xs font-mono">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <FileCode className="size-4 text-emerald-400" />
                      <span>Live Node JSON Payload</span>
                    </div>
                    <span className="text-emerald-400 text-[10px]">Validated Schema</span>
                  </div>

                  <pre className="mt-3 overflow-x-auto p-2 font-mono text-xs text-zinc-300 leading-relaxed">
                    <code>{activeNode.samplePayload}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TAB 2: AUTONOMOUS WHATSAPP AI CHATBOT PREVIEW
              ───────────────────────────────────────────────────────────── */}
          {activeTab === "whatsapp" && (
            <div className="mt-8 grid gap-8 lg:grid-cols-12 items-start">
              {/* Left Column: Preset Queries */}
              <div className="lg:col-span-5 space-y-4 rounded-2xl border border-white/10 bg-[#060a08] p-5 shadow-inner">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                    Simulate Customer Inquiries
                  </span>
                  <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] text-emerald-300">
                    WhatsApp Cloud Webhook
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  Click a test query below to observe how the AI agent retrieves real technical specs and
                  answers instantly on WhatsApp with zero human intervention.
                </p>

                <div className="space-y-3 pt-2">
                  {CHAT_PRESETS.map((preset) => {
                    const isSelected = preset.key === selectedChatPresetKey;
                    return (
                      <button
                        key={preset.key}
                        onClick={() => {
                          setSelectedChatPresetKey(preset.key);
                          setIsTyping(true);
                          setTimeout(() => setIsTyping(false), 500);
                        }}
                        type="button"
                        className={`w-full text-left rounded-xl border p-3.5 transition-all ${
                          isSelected
                            ? "border-emerald-500/60 bg-emerald-950/30 ring-1 ring-emerald-500/40"
                            : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                        }`}
                      >
                        <span className="text-xs font-display font-bold text-white block">
                          {preset.label}
                        </span>
                        <p className="mt-1 line-clamp-2 text-[11px] text-zinc-400 font-sans">
                          &ldquo;{preset.userMessage}&rdquo;
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Extracted Metadata Card */}
                <div className="rounded-xl border border-white/5 bg-black/40 p-4 space-y-2 pt-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                    Autonomous Context Extraction:
                  </span>
                  <ul className="space-y-1 text-xs text-zinc-300 font-mono">
                    {activeChatPreset.botReply.extractedFacts.map((fact, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCheck className="size-3 text-cyan-400" />
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: WhatsApp Phone Glass Screen */}
              <div className="lg:col-span-7 flex justify-center">
                <div className="w-full max-w-md rounded-[2.5rem] border-4 border-zinc-800 bg-[#0d1418] p-4 shadow-2xl relative overflow-hidden">
                  {/* WhatsApp App Bar */}
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-emerald-600 flex items-center justify-center font-display font-bold text-white text-xs">
                        MLHK
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white">MLHK Infotech</span>
                          <CheckCircle2 className="size-3.5 text-emerald-400 fill-emerald-400/20" />
                        </div>
                        <span className="text-[10px] text-emerald-400 font-mono">
                          {isTyping ? "typing..." : "Verified Business • Autonomous Agent"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Chat Message Stream */}
                  <div className="py-4 space-y-4 min-h-[380px] flex flex-col justify-end text-xs">
                    {/* Timestamp */}
                    <div className="text-center">
                      <span className="rounded bg-black/40 px-2 py-0.5 text-[9px] font-mono text-zinc-500">
                        TODAY
                      </span>
                    </div>

                    {/* Inbound User Message */}
                    <div className="flex justify-end">
                      <div className="max-w-[85%] rounded-2xl rounded-tr-none bg-[#005c4b] p-3 text-white shadow">
                        <p className="leading-relaxed">{activeChatPreset.userMessage}</p>
                        <div className="mt-1 flex items-center justify-end gap-1 text-[9px] text-emerald-200/80 font-mono">
                          <span>10:41 AM</span>
                          <CheckCheck className="size-3 text-cyan-300" />
                        </div>
                      </div>
                    </div>

                    {/* Autonomous Bot Reply */}
                    <div className="flex justify-start">
                      <div className="max-w-[88%] rounded-2xl rounded-tl-none bg-[#202c33] p-3.5 text-zinc-200 shadow space-y-2">
                        <p className="whitespace-pre-line leading-relaxed text-[11px]">
                          {activeChatPreset.botReply.text}
                        </p>

                        {/* Interactive Buttons */}
                        <div className="pt-2 border-t border-zinc-700/60 space-y-1.5">
                          {activeChatPreset.botReply.actionButtons.map((btn, i) => (
                            <button
                              key={i}
                              type="button"
                              className="w-full rounded-lg bg-[#0b141a] py-1.5 text-center text-[11px] font-semibold text-emerald-400 hover:bg-[#111b21] transition-colors"
                            >
                              {btn}
                            </button>
                          ))}
                        </div>

                        <div className="mt-1 flex items-center justify-end gap-1 text-[9px] text-zinc-400 font-mono">
                          <span>10:41 AM</span>
                          <span>• Synthesized in 420ms</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Input Box Simulation */}
                  <div className="border-t border-zinc-800 pt-3 flex items-center gap-2">
                    <div className="flex-1 rounded-full bg-[#202c33] px-4 py-2 text-xs text-zinc-400">
                      Message MLHK Infotech...
                    </div>
                    <div className="size-8 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                      <Send className="size-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TAB 3: DOCUMENT VISION & INVOICE OCR
              ───────────────────────────────────────────────────────────── */}
          {activeTab === "ocr" && (
            <div className="mt-8 grid gap-8 lg:grid-cols-12 items-start">
              <div className="lg:col-span-5 space-y-4 rounded-2xl border border-white/10 bg-[#060b09] p-5 shadow-inner">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                    Select Test Document
                  </span>
                  <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] text-emerald-300">
                    Multimodal OCR
                  </span>
                </div>

                <div className="space-y-3">
                  {OCR_DOCS.map((doc) => {
                    const isSelected = doc.key === selectedDocKey;
                    return (
                      <div
                        key={doc.key}
                        onClick={() => handleTriggerOcr(doc.key)}
                        className={`cursor-pointer rounded-xl border p-3.5 transition-all ${
                          isSelected
                            ? "border-emerald-500/60 bg-emerald-950/30 ring-1 ring-emerald-500/40"
                            : "border-white/10 bg-white/[0.02] hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-display text-xs font-bold text-white">{doc.title}</span>
                          <span className="font-mono text-[9px] text-zinc-500">{doc.type}</span>
                        </div>
                        <p className="mt-1 line-clamp-2 text-[10px] text-zinc-400 font-mono">
                          {doc.rawSample.slice(0, 70)}...
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Raw OCR Stream Box */}
                <div className="rounded-xl border border-white/10 bg-black/60 p-3.5 space-y-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Raw OCR Scan Preview:</span>
                  <pre className="overflow-x-auto font-mono text-[11px] text-zinc-300 leading-relaxed whitespace-pre-wrap">
                    {activeOcrDoc.rawSample}
                  </pre>
                </div>
              </div>

              {/* Extracted Structured Parameters */}
              <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#050806] p-6 shadow-inner space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Scan className="size-4 text-emerald-400" />
                    <span className="font-display text-sm font-bold text-white">
                      Extracted Structured Parameters
                    </span>
                  </div>
                  <span className="font-mono text-xs text-emerald-400">
                    {isScanningOcr ? "Extracting..." : "Extraction Complete (0 Regressions)"}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {activeOcrDoc.extractedParams.map((param, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs font-mono"
                    >
                      <span className="text-zinc-400">{param.field}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-white">{param.value}</span>
                        <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                          {param.confidence}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-right">
                  <Link
                    href={`https://wa.me/919165100124?text=${encodeURIComponent(
                      `Hello MLHK Infotech, I want to automate our ${activeOcrDoc.title} data entry with your OCR & AI agents.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-white transition-colors"
                  >
                    Automate This Document Workflow <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
