"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  X,
  MessageSquare,
  Send,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Phone,
  ArrowUpRight,
  Sparkles,
  Mail,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import { buildWhatsAppInquiryUrl } from "@/lib/contact-utils";
import { trackMlhkEvent } from "@/components/analytics/GoogleTagManager";

export interface OpenContactModalDetail {
  city?: string;
  service?: string;
  budget?: string;
  lang?: "en" | "hi";
}

export const OPEN_CONTACT_MODAL_EVENT = "mlhk:open-contact-modal";

export function dispatchOpenContactModal(detail: OpenContactModalDetail = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<OpenContactModalDetail>(OPEN_CONTACT_MODAL_EVENT, { detail }));
}

const QUICK_SERVICE_CHIPS = [
  { value: "Custom Business Website", en: "Website", hi: "वेबसाइट" },
  { value: "SEO & Instagram / Google Ads", en: "SEO & Ads", hi: "SEO / एड्स" },
  { value: "Android / Mobile App", en: "Mobile App", hi: "मोबाइल ऐप" },
  { value: "Temple / Trust / Booking Portal", en: "Temple / Portal", hi: "मंदिर / बुकिंग पोर्टल" },
  { value: "Custom CRM / GST ERP", en: "CRM / ERP", hi: "CRM / ERP" },
  { value: "Website Redesign / Speed Fix", en: "Redesign / Fix", hi: "रीडिज़ाइन" },
] as const;

const BUDGET_OPTIONS = [
  { value: "Under ₹20,000", en: "Under ₹20k", hi: "₹20k से कम" },
  { value: "₹20,000 – ₹50,000", en: "₹20k – ₹50k", hi: "₹20k – ₹50k" },
  { value: "₹50,000 – ₹1,20,000", en: "₹50k – ₹1.2L", hi: "₹50k – ₹1.2L" },
  { value: "₹1,20,000+", en: "₹1.2L+ Enterprise", hi: "₹1.2L+ एंटरप्राइज" },
  { value: "Monthly Retainer (SEO/Ads)", en: "Monthly SEO/Ads", hi: "मासिक SEO/एड्स" },
] as const;

export function QuickContactModal() {
  const pathname = usePathname();
  const isHindiRoute = pathname?.startsWith("/hi");
  const isContactPage = pathname === "/contact";
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "hi">(isHindiRoute ? "hi" : "en");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    service: "Custom Business Website",
    budget: "₹20,000 – ₹50,000",
    message: "",
    website: "", // honeypot
  });

  useEffect(() => {
    setLang(pathname?.startsWith("/hi") ? "hi" : "en");
  }, [pathname]);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<OpenContactModalDetail>).detail || {};
      setLang(detail.lang ?? (pathname?.startsWith("/hi") ? "hi" : "en"));
      setForm((prev) => ({
        ...prev,
        city: detail.city ?? prev.city,
        service: detail.service ?? prev.service,
        budget: detail.budget ?? prev.budget,
      }));
      setError(null);
      setReferenceId(null);
      setOpen(true);
      trackMlhkEvent("open_contact_modal", {
        source_page: pathname || "/",
        city: detail.city || "global",
      });
    };
    window.addEventListener(OPEN_CONTACT_MODAL_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CONTACT_MODAL_EVENT, onOpen);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 80);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          city: form.city,
          service: form.service,
          budget: form.budget,
          timeline: "Quick Callback Requested",
          message: form.message || `Quick quote request for ${form.service} from ${pathname || "/"}`,
          sourcePage: pathname || "/",
          website: form.website,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        referenceId?: string;
        error?: string;
      };
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Unable to submit right now. Please try again or WhatsApp us.");
      }
      setReferenceId(data.referenceId || "MLHK-SAVED");
      trackMlhkEvent("generate_lead", {
        lead_source: "quick_contact_popup",
        service_selected: form.service,
        city: form.city || "unspecified",
        budget_range: form.budget,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  function resetAndClose() {
    setOpen(false);
    setTimeout(() => {
      setReferenceId(null);
      setError(null);
      setForm((prev) => ({ ...prev, name: "", phone: "", email: "", message: "" }));
    }, 200);
  }

  const hi = lang === "hi";
  const waUrl = buildWhatsAppInquiryUrl({
    serviceLabel: form.service,
    timelineLabel: form.city ? `City: ${form.city}` : "Quick Callback",
    budgetLabel: form.budget,
    name: form.name,
    message: form.message,
    referenceId: referenceId ?? undefined,
  });

  return (
    <>
      {/* Sleek Compact Floating Sticky Contact Trigger (hidden on /contact page) */}
      {!isContactPage && (
        <div className="fixed bottom-4 right-4 z-40 sm:bottom-5 sm:right-5">
          <button
            type="button"
            data-testid="quick-contact-fab"
            onClick={() => {
              setReferenceId(null);
              setError(null);
              setOpen(true);
              trackMlhkEvent("open_contact_modal", {
                source_page: pathname || "/",
                trigger: "sticky_button",
              });
            }}
            className="mlhk-sheen group inline-flex min-h-[40px] items-center gap-2 rounded-full border border-[#ff9f1c]/55 bg-[#0b0d14]/95 px-3.5 py-2 text-xs font-semibold text-white shadow-[0_12px_32px_-8px_rgba(255,159,28,0.45)] transition-transform duration-200 hover:-translate-y-0.5 hover:border-[#ffb84d] hover:bg-[#111521] active:scale-[0.97]"
            aria-label={hi ? "तुरंत संपर्क करें — फ्री कोट पाएं" : "Contact Now — Fast Quote"}
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-[#ff9f1c] text-black transition-transform duration-200 group-hover:scale-105">
              <MessageSquare className="size-3.5" />
            </span>
            <span className={hi ? "tracking-normal" : "tracking-wide"}>
              {hi ? "संपर्क करें" : "Contact Now"}
            </span>
          </button>
        </div>
      )}

      {/* Fast High-Converting Contact Popup Dialog */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-contact-title"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3.5 backdrop-blur-md sm:p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) resetAndClose();
          }}
        >
          <div className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-[1.5rem] border border-white/15 bg-[#090d16] p-5 shadow-[0_32px_90px_-20px_rgba(0,0,0,0.95)] sm:p-6">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff9f1c]/70 to-transparent"
            />

            {/* Header Row */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="flex items-center gap-1.5 text-[11px] font-semibold text-[#ffb84d]">
                  <ShieldCheck className="size-3.5 shrink-0" />
                  <span>
                    {hi
                      ? "MSME & GST रजिस्टर्ड · सीधा फाउंडर रिस्पॉन्स"
                      : "Direct Founder Desk · MSME & GST Registered"}
                  </span>
                </p>
                <h2 id="quick-contact-title" className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
                  {hi ? "25 सेकंड में फ्री प्रोजेक्ट कोट" : "Get a Fast INR Quote"}
                </h2>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-0.5 text-[11px] font-semibold">
                  <button
                    type="button"
                    onClick={() => setLang("en")}
                    className={`rounded-full px-2.5 py-0.5 transition-colors ${
                      lang === "en" ? "bg-[#ff9f1c] text-black" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang("hi")}
                    className={`rounded-full px-2.5 py-0.5 transition-colors ${
                      lang === "hi" ? "bg-[#ff9f1c] text-black" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    हिन्दी
                  </button>
                </div>
                <button
                  type="button"
                  onClick={resetAndClose}
                  aria-label="Close contact form"
                  className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {referenceId ? (
              <div className="mt-5 space-y-4 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.06] p-5 text-center">
                <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="size-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                    {hi ? "आपकी इंक्वायरी CRM में सेव हो गई है" : "Inquiry Saved in MLHK CRM"}
                  </p>
                  <p className="mt-1 font-mono text-base font-bold text-white">{referenceId}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-300">
                    {hi
                      ? `धन्यवाद ${form.name} जी! हमारी टीम 2 घंटे के अंदर आपसे WhatsApp या कॉल पर संपर्क करेगी।`
                      : `Thank you ${form.name}! Our engineering desk has logged your inquiry and will reply within 2 business hours.`}
                  </p>
                </div>
                <div className="flex flex-col justify-center gap-2.5 sm:flex-row">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff9f1c] px-4 py-2 text-xs font-semibold text-black hover:bg-[#ffb84d]"
                  >
                    <Phone className="size-3.5" />
                    <span>{hi ? "WhatsApp पर तुरंत चैट करें" : "Continue on WhatsApp"}</span>
                    <ArrowUpRight className="size-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-zinc-200 hover:bg-white/5"
                  >
                    {hi ? "बंद करें" : "Done"}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
                {error && (
                  <div className="rounded-xl border border-red-500/35 bg-red-500/10 px-3.5 py-2.5 text-xs text-red-200">
                    {error}
                  </div>
                )}

                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
                  className="hidden"
                  aria-hidden="true"
                />

                {/* 1-Tap Service Selector for Rapid Form Completion */}
                <div>
                  <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium text-zinc-300">
                    <Sparkles className="size-3 text-[#ffb84d]" />
                    {hi ? "क्या बनवाना है? (1 क्लिक में चुनें)" : "What do you need? (1-tap select)"}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_SERVICE_CHIPS.map((chip) => {
                      const active = form.service === chip.value;
                      return (
                        <button
                          key={chip.value}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, service: chip.value }))}
                          className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${
                            active
                              ? "border-[#ff9f1c] bg-[#ff9f1c]/15 text-[#ffb84d]"
                              : "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/25 hover:text-white"
                          }`}
                        >
                          {hi ? chip.hi : chip.en}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="qc-name" className="mb-1 block text-[11px] font-medium text-zinc-300">
                      {hi ? "आपका नाम *" : "Full Name *"}
                    </label>
                    <input
                      ref={nameInputRef}
                      id="qc-name"
                      name="name"
                      autoComplete="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder={hi ? "जैसे: राजेश शर्मा" : "e.g. Rajesh Sharma"}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-[#ff9f1c] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="qc-phone" className="mb-1 block text-[11px] font-medium text-zinc-300">
                      {hi ? "मोबाइल / WhatsApp *" : "Phone / WhatsApp *"}
                    </label>
                    <input
                      id="qc-phone"
                      name="phone"
                      autoComplete="tel"
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="+91 98XXX XXXXX"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-[#ff9f1c] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="qc-email" className="mb-1 block text-[11px] font-medium text-zinc-300">
                      {hi ? "ईमेल आईडी *" : "Email Address *"}
                    </label>
                    <input
                      id="qc-email"
                      name="email"
                      autoComplete="email"
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="you@business.in"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-[#ff9f1c] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="qc-city" className="mb-1 block text-[11px] font-medium text-zinc-300">
                      {hi ? "शहर / कस्बा" : "City / Town"}
                    </label>
                    <input
                      id="qc-city"
                      name="city"
                      autoComplete="address-level2"
                      value={form.city}
                      onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                      placeholder={hi ? "इंदौर, उज्जैन, नलखेड़ा, भोपाल..." : "Indore, Ujjain, Bhopal..."}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-[#ff9f1c] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="qc-budget" className="mb-1 block text-[11px] font-medium text-zinc-300">
                      {hi ? "अनुमानित बजट" : "Budget Range"}
                    </label>
                    <select
                      id="qc-budget"
                      name="budget"
                      value={form.budget}
                      onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
                      className="w-full rounded-xl border border-white/10 bg-[#121622] px-3 py-2 text-sm text-white focus:border-[#ff9f1c] focus:outline-none"
                    >
                      {BUDGET_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-[#121622] text-white">
                          {hi ? opt.hi : opt.en}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="qc-message" className="mb-1 block text-[11px] font-medium text-zinc-300">
                      {hi ? "संक्षिप्त जानकारी (वैकल्पिक)" : "Quick Note (Optional)"}
                    </label>
                    <input
                      id="qc-message"
                      name="message"
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder={hi ? "वेबसाइट, SEO या ऐप की जानकारी..." : "Goal, timeline, or website URL..."}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-[#ff9f1c] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-white/10 pt-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-zinc-400">
                    <span className="inline-flex items-center gap-1">
                      <Phone className="size-3 text-[#ffb84d]" />
                      {BRAND.phoneDisplay}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Mail className="size-3 text-[#ffb84d]" />
                      {BRAND.supportEmail}
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="mlhk-sheen inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full bg-[#ff9f1c] px-5 py-2 text-xs font-semibold text-black transition-transform hover:scale-[1.02] hover:bg-[#ffb84d] disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="size-3.5 animate-spin" />
                        <span>{hi ? "भेज रहे हैं..." : "Sending..."}</span>
                      </>
                    ) : (
                      <>
                        <Send className="size-3.5" />
                        <span>{hi ? "फ्री कोट मंगवाएं" : "Send Quote Request"}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
