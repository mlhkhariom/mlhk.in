"use client";
import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setStatus(res.ok ? "done" : "error");
  }

  if (status === "done") return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <CheckCircle size={48} className="text-green-500 mb-4" />
      <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
      <p className="text-gray-500">We'll get back to you within 24 hours.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input required placeholder="Your Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
          className="border rounded-lg px-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input required type="email" placeholder="Email Address *" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
          className="border rounded-lg px-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
          className="border rounded-lg px-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input placeholder="Company Name" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })}
          className="border rounded-lg px-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <textarea required rows={5} placeholder="Tell us about your project *" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
        className="border rounded-lg px-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
      {status === "error" && <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>}
      <button type="submit" disabled={status === "loading"}
        className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2 disabled:opacity-60">
        <Send size={16} /> {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
