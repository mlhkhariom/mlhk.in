"use client";

import { useEffect, useState } from "react";
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
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import { buildWhatsAppInquiryUrl } from "@/lib/contact-utils";

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

const SERVICE_OPTIONS = [
  { value: "Custom Business Website", en: "Business Website (₹15k+)", hi: "नई बिज़नेस वेबसाइट (₹15k+)" },
  { value: "Website Redesign / Speed Fix", en: "Site Redesign / Fix (₹8k+)", hi: "पुरानी वेबसाइट सुधार (₹8k+)" },
  { value: "E-Commerce / Online Store", en: "Online Store / E-Com (₹28k+)", hi: "ऑनलाइन दुकान / ई-कॉमर्स (₹28k+)" },
  { value: "Android / Mobile App", en: "Android / Mobile App (₹45k+)", hi: "Android / मोबाइल ऐप (₹45k+)" },
  { value: "SEO & Instagram / Google Ads", en: "Google SEO & Meta Ads", hi: "Google SEO व Insta/FB एड्स" },
  { value: "Custom CRM / GST ERP", en: "Custom CRM / GST ERP", hi: "कस्टम CRM / GST ERP सॉफ्टवेयर" },
  { value: "AI & WhatsApp Automation", en: "AI & WhatsApp Automation", hi: "AI व WhatsApp ऑटोमेशन" },
] as const;

const BUDGET_OPTIONS = [
  { value: "Under ₹20,000", en: "Under ₹20,000", hi: "₹20,000 से कम" },
  { value: "₹20,000 – ₹50,000", en: "₹20,000 – ₹50,000", hi: "₹20,000 – ₹50,000" },
  { value: "₹50,000 – ₹1,20,000", en: "₹50,000 – ₹1,20,000", hi: "₹50,000 – ₹1,20,000" },
  { value: "₹1,20,000+", en: "₹1,20,000+ (Enterprise)", hi: "₹1,20,000+ (एंटरप्राइज)" },
  { value: "Monthly Retainer (SEO/Ads)", en: "Monthly Growth (SEO / Ads)", hi: "मासिक SEO / एड्स प्लान" },
] as const;

export function QuickContactModal() {
  const pathname = usePathname();
  const isHindiRoute = pathname?.startsWith("/hi");
  const isContactPage = pathname === "/contact";

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
    return () => {
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
          message: form.message || `Quick quote request from ${pathname || "/"}`,
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
      {/* Global Floating Quick Quote Trigger (hidden on /contact page) */}
      {!isContactPage && (
        <div className="fixed bottom-5 right-4 z-40 sm:bottom-6 sm:right-6">
          <button
            type="button"
            data-testid="quick-contact-fab"
            onClick={() => {
              setReferenceId(null);
              setError(null);
              setOpen(true);
            }}
            className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-[#ff9f1c] px-5 py-3 text-sm font-semibold text-black shadow-[0_14px_38px_-10px_rgba(255,159,28,0.65)] transition-transform duration-200 hover:scale-[1.03] hover:bg-[#ffb84d] active:scale-[0.98]"
            aria-label={hi ? "तुरंत संपर्क करें — फ्री कोट पाएं" : "Contact Now — Get a Fast Quote"}
          >
            <MessageSquare className="size-4 shrink-0" />
            <span>{hi ? "संपर्क करें · फ्री कोट" : "Contact Now"}</span>
          </button>
        </div>
      )}

      {/* Modal Overlay */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-contact-title"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) resetAndClose();
          }}
        >
          <div className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[1.75rem] border border-white/15 bg-[#0b0c10] p-6 shadow-[0_32px_90px_-20px_rgba(0,0,0,0.95)] sm:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff9f1c]/65 to-transparent"
            />

            {/* Header Row */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="flex items-center gap-1.5 text-xs font-semibold text-[#ffb84d]">
                  <ShieldCheck className="size-3.5 shrink-0" />
                  <span>
                    {hi
                      ? `MSME & GST रजिस्टर्ड · सीधा फाउंडर रिस्पॉन्स`
                      : `Direct Founder Desk · MSME & GST Registered`}
                  </span>
                </p>
                <h2 id="quick-contact-title" className="mt-1.5 font-display text-2xl font-bold text-white">
                  {hi ? "30 सेकंड में फ्री प्रोजेक्ट कोट पाएं" : "Get a Fixed INR Quote in 30 Seconds"}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-0.5 text-[11px] font-semibold">
                  <button
                    type="button"
                    onClick={() => setLang("en")}
                    className={`rounded-full px-2.5 py-1 transition-colors ${
                      lang === "en" ? "bg-[#ff9f1c] text-black" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang("hi")}
                    className={`rounded-full px-2.5 py-1 transition-colors ${
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
                  className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {referenceId ? (
              <div className="mt-6 space-y-5 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.06] p-6 text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="size-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    {hi ? "आपकी इंक्वायरी सेव हो गई है" : "Inquiry Logged in MLHK CRM"}
                  </p>
                  <p className="mt-1 font-mono text-lg font-bold text-white">{referenceId}</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                    {hi
                      ? `धन्यवाद ${form.name} जी! हमारी टीम 2 घंटे के अंदर आपसे WhatsApp या कॉल पर संपर्क करेगी।`
                      : `Thank you ${form.name}! Our engineering desk has recorded your inquiry and will reach out within 2 business hours.`}
                  </p>
                </div>
                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff9f1c] px-5 py-2.5 text-xs font-semibold text-black hover:bg-[#ffb84d]"
                  >
                    <Phone className="size-3.5" />
                    <span>{hi ? "WhatsApp पर तुरंत चैट करें" : "Continue on WhatsApp"}</span>
                    <ArrowUpRight className="size-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="rounded-full border border-white/15 px-5 py-2.5 text-xs font-semibold text-zinc-200 hover:bg-white/5"
                  >
                    {hi ? "बंद करें" : "Done"}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                {error && (
                  <div className="rounded-xl border border-red-500/35 bg-red-500/10 px-4 py-3 text-xs text-red-200">
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

                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="qc-name" className="mb-1 block text-xs font-medium text-zinc-300">
                      {hi ? "आपका नाम *" : "Full Name *"}
                    </label>
                    <input
                      id="qc-name"
                      name="name"
                      autoComplete="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder={hi ? "जैसे: राजेश शर्मा" : "e.g. Rajesh Sharma"}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-[#ff9f1c] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="qc-phone" className="mb-1 block text-xs font-medium text-zinc-300">
                      {hi ? "मोबाइल / WhatsApp नंबर *" : "Phone / WhatsApp *"}
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
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-[#ff9f1c] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="qc-email" className="mb-1 block text-xs font-medium text-zinc-300">
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
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-[#ff9f1c] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="qc-city" className="mb-1 block text-xs font-medium text-zinc-300">
                      {hi ? "आपका शहर / जिला" : "Your City / Town"}
                    </label>
                    <input
                      id="qc-city"
                      name="city"
                      autoComplete="address-level2"
                      value={form.city}
                      onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                      placeholder={hi ? "जैसे: इंदौर, भोपाल, जयपुर..." : "e.g. Indore, Delhi, Jaipur..."}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-[#ff9f1c] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="qc-service" className="mb-1 block text-xs font-medium text-zinc-300">
                      {hi ? "क्या बनवाना है?" : "Service Needed"}
                    </label>
                    <select
                      id="qc-service"
                      name="service"
                      value={form.service}
                      onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
                      className="w-full rounded-xl border border-white/10 bg-[#12141a] px-3.5 py-2.5 text-sm text-white focus:border-[#ff9f1c] focus:outline-none"
                    >
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-[#12141a] text-white">
                          {hi ? opt.hi : opt.en}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="qc-budget" className="mb-1 block text-xs font-medium text-zinc-300">
                      {hi ? "अनुमानित बजट" : "Estimated Budget"}
                    </label>
                    <select
                      id="qc-budget"
                      name="budget"
                      value={form.budget}
                      onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
                      className="w-full rounded-xl border border-white/10 bg-[#12141a] px-3.5 py-2.5 text-sm text-white focus:border-[#ff9f1c] focus:outline-none"
                    >
                      {BUDGET_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-[#12141a] text-white">
                          {hi ? opt.hi : opt.en}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="qc-message" className="mb-1 block text-xs font-medium text-zinc-300">
                    {hi ? "अपने काम के बारे में संक्षेप में लिखें" : "Brief Requirement (Optional)"}
                  </label>
                  <textarea
                    id="qc-message"
                    name="message"
                    rows={2}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder={
                      hi
                        ? "जैसे: मेरी दुकान/बिज़नेस के लिए वेबसाइट और Google SEO चाहिए..."
                        : "Tell us what you want to build, fix, or rank on Google..."
                    }
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-[#ff9f1c] focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[11px] text-zinc-400">
                    {hi
                      ? `सीधा कॉल/WhatsApp: ${BRAND.phoneDisplay}`
                      : `Direct call / WhatsApp: ${BRAND.phoneDisplay}`}
                  </p>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#ff9f1c] px-6 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-[1.02] hover:bg-[#ffb84d] disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        <span>{hi ? "भेज रहे हैं..." : "Sending..."}</span>
                      </>
                    ) : (
                      <>
                        <Send className="size-4" />
                        <span>{hi ? "फ्री कोट मंगवाएं" : "Request Free Proposal"}</span>
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
