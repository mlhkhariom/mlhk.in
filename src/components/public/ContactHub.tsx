"use client";

import { useState } from "react";
import {
  Send,
  CheckCircle,
  Loader2,
  Copy,
  Check,
  Sparkles,
  Zap,
  ShieldCheck,
  Clock,
  ArrowRight,
  Sliders,
  Layers,
  Calendar,
  IndianRupee,
  Smartphone,
  Globe,
  Database,
  Cpu,
  Shield,
  Palette,
  ExternalLink,
} from "lucide-react";
import { BRAND } from "@/lib/brand";

// ─────────────────────────────────────────────────────────────────────────────
// SCOPING CONFIGURATIONS
// ─────────────────────────────────────────────────────────────────────────────

interface ServiceOption {
  id: string;
  label: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: "web-development",
    label: "Web Engineering",
    category: "Full-Stack & Edge",
    icon: Globe,
    description: "Next.js 16, Cloudflare Edge, React 19, sub-50ms TTFB websites & SaaS.",
  },
  {
    id: "mobile-app-development",
    label: "Native Mobile Apps",
    category: "Android & iOS",
    icon: Smartphone,
    description: "Native Kotlin, Android 15 SDK 35, 16KB aligned, Room SQLite offline-first.",
  },
  {
    id: "graphics-and-branding",
    label: "Brand & Design System",
    category: "Red Xerox Studio",
    icon: Palette,
    description: "Mathematical vector logos, Figma design tokens, 40+ page brand bibles.",
  },
  {
    id: "enterprise-systems",
    label: "Custom ERP & CRM",
    category: "Enterprise Billing",
    icon: Database,
    description: "Indian GST billing, multi-branch inventory, granular RBAC Postgres systems.",
  },
  {
    id: "ai-automation",
    label: "AI Automation & Agents",
    category: "Workflow Engines",
    icon: Cpu,
    description: "n8n deterministic DAGs, WhatsApp Business API bots, automated document OCR.",
  },
  {
    id: "cybersecurity-devops",
    label: "Cybersecurity & DevOps",
    category: "Zero-Trust Infra",
    icon: Shield,
    description: "Zero open ports, Cloudflare Tunnels, Linux systemd sandboxing, 24/7 SLA.",
  },
];

const TIMELINE_OPTIONS = [
  { id: "urgent", label: "Rapid Sprint", time: "< 3 Weeks", note: "Fast-track execution" },
  { id: "standard", label: "Standard Build", time: "1 – 2 Months", note: "Balanced engineering" },
  { id: "strategic", label: "Strategic Retainer", time: "3+ Months", note: "Continuous architecture" },
];

const BUDGET_OPTIONS = [
  { id: "mvp", label: "₹50k – ₹1.5L", tier: "Focused Sprint", desc: "For lean MVPs and single-discipline projects" },
  { id: "growth", label: "₹1.5L – ₹5L", tier: "Full Platform", desc: "Production web/mobile systems with backends" },
  { id: "enterprise", label: "₹5L – ₹15L", tier: "Enterprise Suite", desc: "Custom ERP, high-traffic apps, multi-branch" },
  { id: "scale", label: "₹15L+", tier: "Custom Architecture", desc: "Multi-platform digital infrastructure & retainers" },
];

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.824L.057 23.486a.5.5 0 0 0 .613.635l5.799-1.525A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.867 9.867 0 0 1-5.031-1.376l-.36-.214-3.733.981.998-3.648-.235-.374A9.867 9.867 0 0 1 2.118 12C2.118 6.527 6.527 2.118 12 2.118S21.882 6.527 21.882 12 17.473 21.882 12 21.882z" />
    </svg>
  );
}

export function ContactHub() {
  // Scoping State
  const [selectedService, setSelectedService] = useState<string>("web-development");
  const [selectedTimeline, setSelectedTimeline] = useState<string>("standard");
  const [selectedBudget, setSelectedBudget] = useState<string>("growth");

  // Form State
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const activeServiceObj =
    SERVICE_OPTIONS.find((s) => s.id === selectedService) ?? SERVICE_OPTIONS[0];
  const activeTimelineObj =
    TIMELINE_OPTIONS.find((t) => t.id === selectedTimeline) ?? TIMELINE_OPTIONS[1];
  const activeBudgetObj =
    BUDGET_OPTIONS.find((b) => b.id === selectedBudget) ?? BUDGET_OPTIONS[1];

  // Pre-filled WhatsApp link based on interactive choices
  const whatsappText = `Hello Hariom & MLHK Infotech team,
I want to discuss an enterprise project:
• Service: ${activeServiceObj.label} (${activeServiceObj.category})
• Timeline: ${activeTimelineObj.label} (${activeTimelineObj.time})
• Budget: ${activeBudgetObj.label} (${activeBudgetObj.tier})
• Client: ${form.name || "Prospective Client"}${form.company ? ` (${form.company})` : ""}
${form.message ? `• Brief: ${form.message}` : ""}`;

  const whatsappUrl = `https://wa.me/919165100124?text=${encodeURIComponent(whatsappText)}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("contact@mlhk.in");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const honeypot = new FormData(e.currentTarget as HTMLFormElement).get("website");

    // Format rich message payload for CRM storage without schema migration
    const enrichedMessage = `
[INTERACTIVE SCOPE DETAILS]
Discipline: ${activeServiceObj.label} (${activeServiceObj.category})
Target Timeline: ${activeTimelineObj.label} (${activeTimelineObj.time})
Budget Bracket: ${activeBudgetObj.label} (${activeBudgetObj.tier})

[CLIENT MESSAGE]
${form.message || "No custom message provided. Requested discovery review based on selected scope."}
`.trim();

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      message: enrichedMessage,
      website: typeof honeypot === "string" ? honeypot : "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="space-y-16">
      {/* ─────────────────────────────────────────────────────────────
          1. INTERACTIVE SCOPING WIZARD (STEP 1, 2, 3)
          ───────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-[#0a0d14] via-[#07090d] to-[#040507] p-6 md:p-10 shadow-[0_30px_90px_-25px_rgba(0,0,0,0.95)]">
        {/* Ambient Warm Amber Glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#ff9f1c]/10 blur-[130px]"
        />

        <div className="flex flex-col gap-3 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
              <Sliders className="size-3.5 text-[#ff9f1c]" />
              Project Scoping Assistant
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Configure Your Project Scope in 30 Seconds
            </h3>
            <p className="mt-1 text-xs text-zinc-400 max-w-2xl">
              Select your required technical discipline, timeline, and investment tier. We will tailor
              your architecture blueprint and response proposal accordingly.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-mono font-semibold text-emerald-400">
              <Clock className="size-3" />
              120-Min SLA Response
            </span>
          </div>
        </div>

        {/* Step 1: Service Discipline */}
        <div className="mt-8 space-y-3">
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Step 1: Primary Engineering Discipline
          </label>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_OPTIONS.map((svc) => {
              const Icon = svc.icon;
              const isSelected = selectedService === svc.id;
              return (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => setSelectedService(svc.id)}
                  className={`flex items-start gap-3.5 rounded-2xl border p-4 text-left transition-all duration-300 ${
                    isSelected
                      ? "border-[#ff9f1c]/60 bg-[#ff9f1c]/10 shadow-[0_0_25px_rgba(255,159,28,0.2)]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl border ${
                      isSelected
                        ? "border-[#ff9f1c]/40 bg-[#ff9f1c]/20 text-[#ffb84d]"
                        : "border-white/10 bg-white/[0.04] text-zinc-400"
                    }`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-bold text-white">{svc.label}</span>
                    <span className="block text-[10px] font-mono text-[#ffb84d]">{svc.category}</span>
                    <p className="mt-1 text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                      {svc.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2 & 3: Timeline & Budget */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          {/* Timeline Selector */}
          <div className="lg:col-span-5 space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Step 2: Desired Execution Velocity
            </label>
            <div className="space-y-2.5">
              {TIMELINE_OPTIONS.map((tl) => {
                const isSelected = selectedTimeline === tl.id;
                return (
                  <button
                    key={tl.id}
                    type="button"
                    onClick={() => setSelectedTimeline(tl.id)}
                    className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left transition-all ${
                      isSelected
                        ? "border-[#ff9f1c]/60 bg-[#ff9f1c]/10 text-white"
                        : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold text-white block">{tl.label}</span>
                      <span className="text-[10px] text-zinc-400">{tl.note}</span>
                    </div>
                    <span className="rounded-lg border border-white/10 bg-black/40 px-2.5 py-1 text-[11px] font-mono text-[#ffb84d]">
                      {tl.time}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget Selector */}
          <div className="lg:col-span-7 space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Step 3: Estimated Capital Allocation Bracket
            </label>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {BUDGET_OPTIONS.map((bg) => {
                const isSelected = selectedBudget === bg.id;
                return (
                  <button
                    key={bg.id}
                    type="button"
                    onClick={() => setSelectedBudget(bg.id)}
                    className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all ${
                      isSelected
                        ? "border-[#ff9f1c]/60 bg-[#ff9f1c]/10 text-white shadow-[0_0_20px_rgba(255,159,28,0.15)]"
                        : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{bg.label}</span>
                      <span className="text-[9px] font-mono uppercase text-[#ffb84d]">{bg.tier}</span>
                    </div>
                    <span className="mt-2 text-[10px] text-zinc-400 leading-tight">{bg.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Scope Summary & Instant Routing Bar */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.05] via-white/[0.02] to-transparent p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                Live Technical Scope Formulation:
              </span>
              <p className="text-xs font-medium text-white flex flex-wrap items-center gap-2">
                <span className="font-bold text-[#ffb84d]">{activeServiceObj.label}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-300">{activeTimelineObj.label} ({activeTimelineObj.time})</span>
                <span className="text-zinc-600">•</span>
                <span className="text-emerald-400 font-mono">{activeBudgetObj.label}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-5 py-2.5 text-xs font-semibold text-emerald-300 transition-all hover:bg-emerald-500/25 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                <WhatsAppGlyph className="size-4" />
                <span>Instant WhatsApp Scope (10s)</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-zinc-300 transition-all hover:bg-white/[0.08] hover:text-white"
              >
                {copiedEmail ? (
                  <>
                    <Check className="size-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied contact@mlhk.in</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Copy Official Email</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. UPGRADED HIGH-CONVERSION FORM
          ───────────────────────────────────────────────────────────── */}
      <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/[0.04] via-white/[0.01] to-[#040507] p-6 md:p-12 shadow-2xl">
        <div className="border-b border-white/10 pb-6 mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#ffb84d]">
            <Sparkles className="size-3.5" />
            <span>Formal Project Specification Submission</span>
          </div>
          <h3 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">
            Submit Your Project Requirements
          </h3>
          <p className="mt-1 text-xs text-zinc-400 max-w-xl">
            Your inquiry is routed directly to Hariom Vishwkarma and the lead engineering team. Every
            proposal includes a milestone roadmap, tech stack selection, and fixed-cost estimate.
          </p>
        </div>

        {status === "done" ? (
          <div
            className="flex flex-col items-center justify-center rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-emerald-500/10 to-transparent p-12 text-center"
            role="status"
          >
            <CheckCircle className="size-14 text-emerald-400 mb-4 animate-bounce" />
            <h4 className="font-display text-2xl font-bold text-white mb-2">
              Inquiry Dispatched to Engineering Desk
            </h4>
            <p className="text-zinc-400 max-w-md text-sm leading-relaxed">
              Thank you, <strong className="text-white">{form.name}</strong>. Hariom Vishwkarma and our
              technical team will review your scope for{" "}
              <strong className="text-[#ffb84d]">{activeServiceObj.label}</strong> and reply with a
              structured delivery roadmap within 120 minutes.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-xs font-semibold text-black hover:bg-emerald-400 transition-all"
              >
                <WhatsAppGlyph className="size-4" />
                <span>Follow-up on WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="rounded-full border border-white/10 bg-white/[0.05] px-5 py-2.5 text-xs font-semibold text-zinc-300 hover:text-white"
              >
                Submit Another Inquiry
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" noValidate={false}>
            {/* Active Scope Summary Banner */}
            <div className="flex items-center justify-between rounded-xl border border-[#ff9f1c]/30 bg-[#ff9f1c]/5 px-4 py-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#ff9f1c] animate-pulse" />
                <span className="text-zinc-300">Selected Scope:</span>
                <span className="font-bold text-white">{activeServiceObj.label}</span>
                <span className="text-zinc-500">|</span>
                <span className="font-mono text-[#ffb84d]">{activeBudgetObj.label}</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase hidden sm:inline">
                Auto-Attached to Submission
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
                >
                  Your Full Name <span className="text-[#ff9f1c]">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  required
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-[#ff9f1c]/60 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[#ff9f1c]/30"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
                >
                  Corporate / Personal Email <span className="text-[#ff9f1c]">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  required
                  type="email"
                  placeholder="e.g. rahul@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-[#ff9f1c]/60 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[#ff9f1c]/30"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-phone"
                  className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
                >
                  Direct Phone / WhatsApp Number
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-[#ff9f1c]/60 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[#ff9f1c]/30"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-company"
                  className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
                >
                  Company / Organization Name
                </label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  placeholder="e.g. Acme Technologies Pvt Ltd"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-[#ff9f1c]/60 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[#ff9f1c]/30"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
              >
                Project Objectives, Architecture Requirements &amp; Target Constraints
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Share your goals, current bottlenecks, target audience, preferred tech stack, or integrations needed..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-[#ff9f1c]/60 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[#ff9f1c]/30"
              />
            </div>

            {/* Honeypot field for bot suppression */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            {status === "error" && (
              <div
                className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-300"
                role="alert"
              >
                Failed to dispatch inquiry. Please check your connection or reach out directly on
                WhatsApp (+91 91651 00124) or email (contact@mlhk.in).
              </div>
            )}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-2">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <ShieldCheck className="size-4 text-emerald-400" />
                <span>100% Mutual NDA Protected • Zero Spam Guarantee</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-6 py-3.5 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-all"
                >
                  <WhatsAppGlyph className="size-4" />
                  <span>Send via WhatsApp</span>
                </a>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff9f1c] px-8 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#ffb84d] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 shadow-[0_0_30px_rgba(255,159,28,0.3)]"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="size-4" />
                      <span>Submit Project Proposal</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

