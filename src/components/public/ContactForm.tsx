"use client";

import { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const honeypot = new FormData(e.currentTarget as HTMLFormElement).get("website");
    const payload = { ...form, website: typeof honeypot === "string" ? honeypot : "" };
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

  if (status === "done") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-[#ff9f1c]/30 bg-gradient-to-b from-[#ff9f1c]/10 to-transparent p-12 text-center" role="status">
        <CheckCircle className="size-12 text-[#ffb84d] mb-4" />
        <h3 className="font-display text-2xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-zinc-400 max-w-md">Thank you for reaching out. We review every enquiry personally and will reply with a scope, timeline, and next steps shortly.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      noValidate={false}
      toolname="submit_contact_inquiry"
      tooldescription="Submit a consultation or software development inquiry to MLHK Infotech"
      toolautosubmit="true"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
            Your Name <span className="text-[#ff9f1c]" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            toolparamdescription="Your full name or organization contact person"
            required
            type="text"
            placeholder="e.g. Rahul Sharma"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-[#ff9f1c]/50 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-[#ff9f1c]/40"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
            Email Address <span className="text-[#ff9f1c]" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            toolparamdescription="Corporate or personal email address for replies"
            required
            type="email"
            placeholder="e.g. rahul@company.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-[#ff9f1c]/50 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-[#ff9f1c]/40"
          />
        </div>

        <div>
          <label htmlFor="contact-phone" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
            Phone Number
          </label>
          <input
            id="contact-phone"
            name="phone"
            toolparamdescription="Contact phone or WhatsApp number with country code"
            type="tel"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-[#ff9f1c]/50 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-[#ff9f1c]/40"
          />
        </div>

        <div>
          <label htmlFor="contact-company" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
            Company Name
          </label>
          <input
            id="contact-company"
            name="company"
            toolparamdescription="Organization or startup name"
            type="text"
            placeholder="Your organization"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-[#ff9f1c]/50 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-[#ff9f1c]/40"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
          Project Details <span className="text-[#ff9f1c]" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          toolparamdescription="Detailed project requirements, goals, budget, or timelines"
          required
          rows={5}
          placeholder="Describe your requirements, goals, timeline, and any specific technologies..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-[#ff9f1c]/50 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-[#ff9f1c]/40"
        />
      </div>

      {/* Honeypot — hidden from real users, catches automated bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      {status === "error" && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300" role="alert">
          Something went wrong while sending your message. Please try again or reach out directly via WhatsApp or email.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#ff9f1c] px-8 py-3.5 text-sm font-semibold text-black transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] hover:bg-[#ffb84d] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
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
