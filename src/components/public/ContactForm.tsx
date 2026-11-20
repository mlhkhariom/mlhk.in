"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { validateContactSubmission } from "@/lib/contact-utils";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [referenceId, setReferenceId] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    const honeypot = new FormData(e.currentTarget).get("website");
    const payload = {
      ...form,
      sourcePage: typeof window !== "undefined" ? window.location.pathname : "/contact",
      website: typeof honeypot === "string" ? honeypot : "",
    };

    const checked = validateContactSubmission(payload);
    if (!checked.ok) {
      setStatus("error");
      setErrorMessage(checked.error);
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
        | { success?: boolean; referenceId?: string; error?: string }
        | null;

      if (res.ok && data?.success) {
        setReferenceId(data.referenceId ?? "");
        setStatus("done");
      } else {
        setStatus("error");
        setErrorMessage(
          data?.error ?? "Could not send your message. Please try again or reach us on WhatsApp."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error while sending your message. Please try again shortly.");
    }
  }

  if (status === "done") {
    return (
      <div
        className="flex flex-col items-center justify-center rounded-2xl border border-[#ff9f1c]/35 bg-[#ff9f1c]/[0.06] p-10 text-center"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="mb-4 size-12 text-[#ffb84d]" />
        <h3 className="font-display text-2xl font-bold text-white">Message Sent!</h3>
        {referenceId && (
          <p className="mt-2 rounded-lg border border-white/15 bg-black/50 px-3 py-1 font-mono text-xs text-[#ffb84d]">
            Ref: {referenceId}
          </p>
        )}
        <p className="mt-3 max-w-md text-sm text-zinc-300">
          Thank you for reaching out. We review every inquiry personally and will reply with a clear scope, timeline, and estimate shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setReferenceId("");
            setForm({ name: "", email: "", phone: "", company: "", message: "" });
          }}
          className="mt-6 inline-flex min-h-[44px] items-center rounded-full border border-white/15 bg-white/[0.04] px-5 py-2 text-xs font-semibold text-zinc-200 transition-colors duration-200 hover:bg-white/[0.08]"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="quick-contact-name"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-300"
          >
            Your Name <span className="text-[#ff9f1c]" aria-hidden="true">*</span>
          </label>
          <input
            id="quick-contact-name"
            name="name"
            required
            type="text"
            placeholder="e.g. Rahul Sharma"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-zinc-500 transition-colors duration-200 focus:border-[#ff9f1c]/60 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[#ff9f1c]/35"
          />
        </div>

        <div>
          <label
            htmlFor="quick-contact-email"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-300"
          >
            Email Address <span className="text-[#ff9f1c]" aria-hidden="true">*</span>
          </label>
          <input
            id="quick-contact-email"
            name="email"
            required
            type="email"
            placeholder="e.g. rahul@company.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-zinc-500 transition-colors duration-200 focus:border-[#ff9f1c]/60 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[#ff9f1c]/35"
          />
        </div>

        <div>
          <label
            htmlFor="quick-contact-phone"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-300"
          >
            Phone Number
          </label>
          <input
            id="quick-contact-phone"
            name="phone"
            type="tel"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-zinc-500 transition-colors duration-200 focus:border-[#ff9f1c]/60 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[#ff9f1c]/35"
          />
        </div>

        <div>
          <label
            htmlFor="quick-contact-company"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-300"
          >
            Company Name
          </label>
          <input
            id="quick-contact-company"
            name="company"
            type="text"
            placeholder="Your organization"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-zinc-500 transition-colors duration-200 focus:border-[#ff9f1c]/60 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[#ff9f1c]/35"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="quick-contact-message"
          className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-300"
        >
          Project Details <span className="text-[#ff9f1c]" aria-hidden="true">*</span>
        </label>
        <textarea
          id="quick-contact-message"
          name="message"
          required
          rows={4}
          placeholder="Describe your requirements, goals, timeline, and budget..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full resize-none rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-zinc-500 transition-colors duration-200 focus:border-[#ff9f1c]/60 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[#ff9f1c]/35"
        />
      </div>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      {status === "error" && (
        <div
          className="flex items-start gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-200"
          role="alert"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-rose-400" />
          <span>{errorMessage || "Something went wrong while sending your message."}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex min-h-[46px] items-center justify-center gap-2.5 rounded-full bg-[#ff9f1c] px-8 py-3 text-sm font-semibold text-black transition-all duration-200 hover:bg-[#ffb84d] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send className="size-4" />
            <span>Send Message</span>
          </>
        )}
      </button>
    </form>
  );
}
