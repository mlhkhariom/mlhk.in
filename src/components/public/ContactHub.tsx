"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Send,
  CheckCircle2,
  Loader2,
  Copy,
  Check,
  ShieldCheck,
  Clock,
  Smartphone,
  Globe,
  Database,
  Cpu,
  TrendingUp,
  Wrench,
  MessageCircle,
  AlertCircle,
} from "lucide-react";
import {
  validateContactSubmission,
  buildWhatsAppInquiryUrl,
} from "@/lib/contact-utils";

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
    label: "Web & E-Commerce",
    category: "Next.js & Storefronts",
    icon: Globe,
    description: "Fast business websites, online stores with Razorpay/UPI, and high-converting landing pages.",
  },
  {
    id: "website-redesign",
    label: "Website Redesign & Speed Fix",
    category: "Existing Site Upgrade",
    icon: Wrench,
    description: "Fix slow websites, redesign outdated UI, solve broken mobile layouts, and pass Core Web Vitals.",
  },
  {
    id: "seo-marketing",
    label: "SEO, Insta & Google Ads",
    category: "Local & Pan-India Growth",
    icon: TrendingUp,
    description: "Google top ranking, GMB local pack dominance, Instagram/Facebook reels ads, and lead generation.",
  },
  {
    id: "mobile-app-development",
    label: "Mobile Apps (Android & iOS)",
    category: "Native & Cross-Platform",
    icon: Smartphone,
    description: "Play Store & App Store apps built for Indian 4G networks with offline sync and UPI checkout.",
  },
  {
    id: "enterprise-systems",
    label: "Custom ERP, CRM & Billing",
    category: "Business Software",
    icon: Database,
    description: "Indian GST invoicing, multi-branch inventory, staff attendance, and automated operations portals.",
  },
  {
    id: "ai-automation",
    label: "WhatsApp & AI Automation",
    category: "24/7 Lead & Ops Bots",
    icon: Cpu,
    description: "Official WhatsApp Business flows, instant inquiry replies, CRM routing, and invoice automation.",
  },
];

const TIMELINE_OPTIONS = [
  { id: "urgent", label: "Fast Track", time: "7 – 14 Days", note: "Quick launch or urgent site fix" },
  { id: "standard", label: "Standard Build", time: "3 – 6 Weeks", note: "Complete custom design & SEO" },
  { id: "strategic", label: "Growth Partner", time: "Monthly Retainer", note: "Ongoing SEO, ads & engineering" },
];

const BUDGET_OPTIONS = [
  { id: "starter", label: "₹8k – ₹25k", tier: "Starter / Fix", desc: "Business website, redesign, speed fix, or local SEO" },
  { id: "growth", label: "₹25k – ₹75k", tier: "Growth Web / Store", desc: "E-commerce store, SEO growth engine, or lead funnels" },
  { id: "app", label: "₹75k – ₹2.5L", tier: "Full App / ERP", desc: "Android/iOS app, custom CRM, or multi-branch portal" },
  { id: "enterprise", label: "₹2.5L+", tier: "Enterprise Suite", desc: "Multi-platform cloud infrastructure & dedicated team" },
];

function resolveServiceParam(param: string | null): string | null {
  if (!param) return null;
  const normalized = param.toLowerCase();
  if (SERVICE_OPTIONS.some((s) => s.id === normalized)) return normalized;
  if (normalized.includes("seo") || normalized.includes("market") || normalized.includes("ad")) {
    return "seo-marketing";
  }
  if (normalized.includes("fix") || normalized.includes("redesign") || normalized.includes("edit")) {
    return "website-redesign";
  }
  if (normalized.includes("app") || normalized.includes("mobile") || normalized.includes("android")) {
    return "mobile-app-development";
  }
  if (normalized.includes("erp") || normalized.includes("crm") || normalized.includes("billing")) {
    return "enterprise-systems";
  }
  if (normalized.includes("ai") || normalized.includes("bot") || normalized.includes("whatsapp")) {
    return "ai-automation";
  }
  return null;
}

export function ContactHub() {
  const searchParams = useSearchParams();

  const [selectedService, setSelectedService] = useState<string>("web-development");
  const [selectedTimeline, setSelectedTimeline] = useState<string>("standard");
  const [selectedBudget, setSelectedBudget] = useState<string>("starter");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorField, setErrorField] = useState<"name" | "email" | "phone" | "message" | undefined>(undefined);
  const [referenceId, setReferenceId] = useState<string>("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const serviceParam = searchParams.get("service");
  const projectParam = searchParams.get("project");
  const budgetParam = searchParams.get("budget");

  useEffect(() => {
    const matchedService = resolveServiceParam(serviceParam);
    if (matchedService) {
      setSelectedService(matchedService);
    }
    if (budgetParam && BUDGET_OPTIONS.some((b) => b.id === budgetParam)) {
      setSelectedBudget(budgetParam);
    }
    if (projectParam) {
      setForm((prev) =>
        prev.message.trim()
          ? prev
          : {
              ...prev,
              message: `Interested in a build similar to "${projectParam}". Please share estimated timeline and pricing.`,
            }
      );
    }
  }, [serviceParam, projectParam, budgetParam]);

  const activeServiceObj =
    SERVICE_OPTIONS.find((s) => s.id === selectedService) ?? SERVICE_OPTIONS[0];
  const activeTimelineObj =
    TIMELINE_OPTIONS.find((t) => t.id === selectedTimeline) ?? TIMELINE_OPTIONS[1];
  const activeBudgetObj =
    BUDGET_OPTIONS.find((b) => b.id === selectedBudget) ?? BUDGET_OPTIONS[0];

  const whatsappUrl = buildWhatsAppInquiryUrl({
    serviceLabel: `${activeServiceObj.label} (${activeServiceObj.category})`,
    timelineLabel: `${activeTimelineObj.label} (${activeTimelineObj.time})`,
    budgetLabel: `${activeBudgetObj.label} (${activeBudgetObj.tier})`,
    name: form.name,
    company: form.company,
    message: form.message,
    referenceId: referenceId || undefined,
  });

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText("support@mlhk.in");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setErrorField(undefined);

    const honeypot = new FormData(e.currentTarget).get("website");
    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      message: form.message,
      service: `${activeServiceObj.label} (${activeServiceObj.category})`,
      timeline: `${activeTimelineObj.label} (${activeTimelineObj.time})`,
      budget: `${activeBudgetObj.label} (${activeBudgetObj.tier})`,
      sourcePage: typeof window !== "undefined" ? window.location.pathname : "/contact",
      website: typeof honeypot === "string" ? honeypot : "",
    };

    const checked = validateContactSubmission(payload);
    if (!checked.ok) {
      setStatus("error");
      setErrorMessage(checked.error);
      setErrorField(checked.field);
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as
        | { success?: boolean; referenceId?: string; error?: string; field?: "name" | "email" | "phone" | "message" }
        | null;

      if (res.ok && data?.success) {
        setReferenceId(data.referenceId ?? "");
        setStatus("done");
        if (typeof window !== "undefined") {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "generate_lead",
            lead_source: "contact_page_wizard",
            service_selected: activeServiceObj.label,
            budget_range: activeBudgetObj.label,
          });
          window.gtag?.("event", "generate_lead", {
            lead_source: "contact_page_wizard",
            service_selected: activeServiceObj.label,
            budget_range: activeBudgetObj.label,
            send_to: "G-7LWCNB06R4",
          });
        }
      } else {
        setStatus("error");
        setErrorMessage(
          data?.error ??
            "Could not dispatch your inquiry right now. Please try again or reach us on WhatsApp (+91 91651 00124)."
        );
        setErrorField(data?.field);
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Network error while submitting your inquiry. Please check your connection or message us directly on WhatsApp (+91 91651 00124)."
      );
    }
  }

  return (
    <div className="space-y-12">
      {/* 1. INTERACTIVE SCOPING WIZARD */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#08090c] p-6 md:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-[#ff9f1c]/10 blur-[120px]"
        />

        <div className="relative flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#ffb84d]">
              01 · Interactive Project Scoping
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Configure your scope in 30 seconds.
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm text-zinc-400">
              Select your service, timeline, and budget range. We use these exact choices to prepare your fixed-cost quote and delivery roadmap.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400">
            <Clock className="size-4 shrink-0" />
            <span>120-min IST response SLA</span>
          </div>
        </div>

        {/* Step 1: Discipline */}
        <fieldset className="relative mt-8 space-y-3">
          <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-300">
            Step 1 — What do you need built or improved?
          </legend>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_OPTIONS.map((svc) => {
              const Icon = svc.icon;
              const isSelected = selectedService === svc.id;
              return (
                <button
                  key={svc.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedService(svc.id)}
                  className={`flex min-h-[96px] items-start gap-3.5 rounded-2xl border p-4 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-[#ff9f1c] bg-[#ff9f1c]/10"
                      : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]"
                  }`}
                >
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl border transition-colors duration-200 ${
                      isSelected
                        ? "border-[#ff9f1c]/50 bg-[#ff9f1c]/20 text-[#ffb84d]"
                        : "border-white/10 bg-white/[0.04] text-zinc-300"
                    }`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-sm font-semibold text-white">{svc.label}</span>
                    <span className="mt-0.5 block font-mono text-[11px] text-[#ffb84d]">
                      {svc.category}
                    </span>
                    <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                      {svc.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Step 2 & 3: Timeline & Budget */}
        <div className="relative mt-8 grid gap-8 lg:grid-cols-12">
          <fieldset className="space-y-3 lg:col-span-5">
            <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-300">
              Step 2 — Target timeline
            </legend>
            <div className="space-y-2.5">
              {TIMELINE_OPTIONS.map((tl) => {
                const isSelected = selectedTimeline === tl.id;
                return (
                  <button
                    key={tl.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedTimeline(tl.id)}
                    className={`flex min-h-[58px] w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                      isSelected
                        ? "border-[#ff9f1c] bg-[#ff9f1c]/10 text-white"
                        : "border-white/10 bg-white/[0.02] text-zinc-300 hover:border-white/25 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div>
                      <span className="block text-sm font-semibold text-white">{tl.label}</span>
                      <span className="text-xs text-zinc-400">{tl.note}</span>
                    </div>
                    <span className="rounded-lg border border-white/10 bg-black/50 px-2.5 py-1 font-mono text-xs text-[#ffb84d]">
                      {tl.time}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="space-y-3 lg:col-span-7">
            <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-300">
              Step 3 — Estimated budget bracket (INR)
            </legend>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {BUDGET_OPTIONS.map((bg) => {
                const isSelected = selectedBudget === bg.id;
                return (
                  <button
                    key={bg.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedBudget(bg.id)}
                    className={`flex min-h-[82px] flex-col justify-between rounded-xl border p-3.5 text-left transition-all duration-200 ${
                      isSelected
                        ? "border-[#ff9f1c] bg-[#ff9f1c]/10 text-white"
                        : "border-white/10 bg-white/[0.02] text-zinc-300 hover:border-white/25 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-sm font-bold text-white">{bg.label}</span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#ffb84d]">
                        {bg.tier}
                      </span>
                    </div>
                    <span className="mt-2 text-xs leading-snug text-zinc-400">{bg.desc}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        {/* Live Scope Summary & Instant Routing */}
        <div className="relative mt-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/50 p-5 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <span className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400">
              Selected scope summary
            </span>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white">
              <strong className="text-[#ffb84d]">{activeServiceObj.label}</strong>
              <span className="text-zinc-500">·</span>
              <span className="text-zinc-300">
                {activeTimelineObj.label} ({activeTimelineObj.time})
              </span>
              <span className="text-zinc-500">·</span>
              <span className="font-mono text-emerald-400">{activeBudgetObj.label}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-5 py-2.5 text-xs font-semibold text-emerald-300 transition-colors duration-200 hover:bg-emerald-500/25"
            >
              <MessageCircle className="size-4" />
              <span>Send Scope on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-zinc-200 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white"
            >
              {copiedEmail ? (
                <>
                  <Check className="size-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied support@mlhk.in</span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. HIGH-CONVERSION PROJECT SUBMISSION FORM */}
      <div className="rounded-3xl border border-white/10 bg-[#08090c] p-6 md:p-10">
        <div className="mb-8 border-b border-white/10 pb-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#ffb84d]">
            02 · Direct Engineering Desk Submission
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">
            Submit your project requirements.
          </h2>
          <p className="mt-1.5 max-w-2xl text-sm text-zinc-400">
            Routed directly to Hariom Vishwkarma and our engineering desk. Every inquiry receives a clear milestone plan and fixed-price estimate in INR.
          </p>
        </div>

        {status === "done" ? (
          <div
            className="flex flex-col items-center justify-center rounded-2xl border border-emerald-500/35 bg-emerald-500/[0.06] px-6 py-12 text-center"
            role="status"
            aria-live="polite"
          >
            <CheckCircle2 className="mb-4 size-12 text-emerald-400" />
            <h3 className="font-display text-2xl font-bold text-white">
              Inquiry received by engineering desk
            </h3>
            {referenceId && (
              <p className="mt-3 rounded-lg border border-emerald-500/30 bg-black/50 px-3.5 py-1.5 font-mono text-xs text-emerald-300">
                Reference ID: <strong>{referenceId}</strong>
              </p>
            )}
            <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-300">
              Thank you, <strong className="text-white">{form.name}</strong>. We have logged your brief for{" "}
              <strong className="text-[#ffb84d]">{activeServiceObj.label}</strong> ({activeBudgetObj.label}) and will reply within 120 minutes during IST business hours.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-xs font-semibold text-black transition-colors duration-200 hover:bg-emerald-400"
              >
                <MessageCircle className="size-4" />
                <span>Fast-Track on WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setReferenceId("");
                  setForm({ name: "", email: "", phone: "", company: "", message: "" });
                }}
                className="inline-flex min-h-[44px] items-center rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-zinc-200 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white"
              >
                Submit another inquiry
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Attached Scope Banner */}
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#ff9f1c]/30 bg-[#ff9f1c]/[0.06] px-4 py-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono uppercase tracking-wider text-zinc-300">Attached Scope:</span>
                <span className="font-semibold text-white">{activeServiceObj.label}</span>
                <span className="text-zinc-500">·</span>
                <span className="font-mono text-[#ffb84d]">{activeBudgetObj.label}</span>
                <span className="text-zinc-500">·</span>
                <span className="text-zinc-300">{activeTimelineObj.time}</span>
              </div>
              <span className="font-mono text-[11px] text-zinc-400">Included automatically</span>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-300"
                >
                  Your Full Name <span className="text-[#ff9f1c]">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  required
                  type="text"
                  autoComplete="name"
                  aria-invalid={errorField === "name"}
                  placeholder="e.g. Rahul Sharma"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`w-full rounded-xl border bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-zinc-500 transition-colors duration-200 focus:bg-white/[0.06] focus:outline-none focus:ring-2 ${
                    errorField === "name"
                      ? "border-rose-500/70 focus:border-rose-400 focus:ring-rose-500/30"
                      : "border-white/15 focus:border-[#ff9f1c]/70 focus:ring-[#ff9f1c]/30"
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-300"
                >
                  Email Address <span className="text-[#ff9f1c]">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  required
                  type="email"
                  autoComplete="email"
                  aria-invalid={errorField === "email"}
                  placeholder="e.g. rahul@business.in"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`w-full rounded-xl border bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-zinc-500 transition-colors duration-200 focus:bg-white/[0.06] focus:outline-none focus:ring-2 ${
                    errorField === "email"
                      ? "border-rose-500/70 focus:border-rose-400 focus:ring-rose-500/30"
                      : "border-white/15 focus:border-[#ff9f1c]/70 focus:ring-[#ff9f1c]/30"
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-phone"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-300"
                >
                  Phone / WhatsApp Number
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  aria-invalid={errorField === "phone"}
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={`w-full rounded-xl border bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-zinc-500 transition-colors duration-200 focus:bg-white/[0.06] focus:outline-none focus:ring-2 ${
                    errorField === "phone"
                      ? "border-rose-500/70 focus:border-rose-400 focus:ring-rose-500/30"
                      : "border-white/15 focus:border-[#ff9f1c]/70 focus:ring-[#ff9f1c]/30"
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-company"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-300"
                >
                  Business / Company Name
                </label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="e.g. Sharma Hardware & Traders, Indore"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-zinc-500 transition-colors duration-200 focus:border-[#ff9f1c]/70 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[#ff9f1c]/30"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-300"
              >
                Project Brief, City / Location &amp; Goals
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                placeholder="Tell us what you want to build or fix, your city/market, and any existing website URL..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full resize-none rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-zinc-500 transition-colors duration-200 focus:border-[#ff9f1c]/70 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[#ff9f1c]/30"
              />
            </div>

            {/* Honeypot anti-spam trap */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            {status === "error" && errorMessage && (
              <div
                className="flex items-start gap-2.5 rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-xs text-rose-200"
                role="alert"
              >
                <AlertCircle className="mt-0.5 size-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <ShieldCheck className="size-4 shrink-0 text-emerald-400" />
                <span>100% Mutual NDA available · No spam calls</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-6 py-3 text-sm font-semibold text-emerald-300 transition-colors duration-200 hover:bg-emerald-500/20"
                >
                  <MessageCircle className="size-4" />
                  <span>Send via WhatsApp</span>
                </a>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[#ff9f1c] px-8 py-3 text-sm font-semibold text-black transition-all duration-200 hover:bg-[#ffb84d] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>Submitting...</span>
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
