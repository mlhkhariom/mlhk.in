import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buildSeo } from "@/lib/seo";
import JsonLd, { FaqJsonLd } from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { PageHero } from "@/components/public/PageHero";
import { SERVICE_DETAILS, BRAND } from "@/lib/brand";

const found = SERVICE_DETAILS.find((s) => s.slug === "ai-automation");
if (!found) throw new Error("AI automation service data is missing from src/lib/brand.ts");
const service: NonNullable<typeof found> = found;

const USE_CASES = [
  {
    title: "Operational workflows",
    text: "Route enquiries, approvals and handoffs between forms, email, spreadsheets and your CRM, so nothing waits in someone's inbox.",
  },
  {
    title: "Data pipelines",
    text: "Collect records from several systems, validate them against rules, and store one clean dataset that reports can trust.",
  },
  {
    title: "Smart dashboards",
    text: "Turn operational data into dashboards that flag exceptions, such as stalled orders or overdue invoices, not just totals.",
  },
  {
    title: "Monitoring and admin tooling",
    text: "Watch systems and processes for anomalies, and give administrators queues for the cases that need a human decision.",
  },
];

const PRINCIPLES = [
  "Human review for any step with financial, legal or customer-facing impact.",
  "Every automated decision is logged, so it can be audited and explained.",
  "Low-confidence cases are routed to a person instead of being guessed.",
  "Accuracy is measured against the process you agreed to improve, not against a demo.",
];

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: "AI & Automation",
    description:
      "AI-based operational automation, process workflows, data pipelines and smart dashboards for Indian businesses. Human review built in.",
    path: "/ai-automation",
  });
}

export default function AiAutomationPage() {
  return (
    <>
      <JsonLd
        data={{
          "@type": "Service",
          name: "AI & Automation",
          description: service.summary,
          url: `${BRAND.url}/ai-automation`,
          provider: { "@type": "Organization", name: BRAND.name, url: BRAND.url },
          areaServed: { "@type": "Country", name: "India" },
          serviceType: "AI-based operational automation",
        }}
      />
      <FaqJsonLd faqs={service.faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "AI & Automation" }]} />

      <PageHero
        eyebrow="AI & Automation"
        title={<>Remove the repetitive work. <span className="text-brand">Keep the judgement.</span></>}
        description={service.intro}
      />

      <section className="bg-[#050607] px-4 pb-24 md:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">Where it helps</p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {USE_CASES.map((u) => (
              <li key={u.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-7">
                <h2 className="font-display text-xl font-bold text-white">{u.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{u.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#070809] px-4 py-24 md:px-6">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">How we work</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white md:text-4xl">Start with one process. Measure it. Then extend.</h2>
          </div>
          <ol className="space-y-6 md:col-span-7">
            {service.process.map((p, i) => (
              <li key={p.step} className="flex gap-5">
                <span className="font-display text-xs font-bold text-[#ff9f1c] tabular-nums">0{i + 1}</span>
                <div>
                  <p className="font-display text-base font-bold text-white">{p.step}</p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-400">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#050607] px-4 py-24 md:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">Our principles</p>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 md:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <li key={p} className="bg-[#050607] p-7 text-sm leading-relaxed text-zinc-300">{p}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#070809] px-4 py-24 md:px-6" aria-labelledby="ai-faq">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">Questions</p>
          <h2 id="ai-faq" className="mt-4 font-display text-3xl font-bold text-white">About AI and automation</h2>
          <div className="mt-10">
            {service.faqs.map((f) => (
              <details key={f.question} className="group border-b border-white/10 py-5 first:pt-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-medium text-white marker:content-none">
                  {f.question}
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-[#ffb84d] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#050607] px-4 py-24 text-center md:px-6">
        <Link href="/contact" className="group inline-flex items-center gap-3 rounded-full bg-[#ff9f1c] py-3 pl-7 pr-2 text-sm font-semibold text-black transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] active:scale-[0.98]">
          Discuss an automation project
          <span className="flex size-9 items-center justify-center rounded-full bg-black/10 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px">
            <ArrowUpRight className="size-4" />
          </span>
        </Link>
      </section>
    </>
  );
}
