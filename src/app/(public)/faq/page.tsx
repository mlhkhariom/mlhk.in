import type { Metadata } from "next";
import Link from "next/link";
import { buildSeo } from "@/lib/seo";
import JsonLd, { FaqJsonLd } from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { PageHero } from "@/components/public/PageHero";
import { SERVICE_DETAILS, FAQS, BRAND } from "@/lib/brand";

const GENERAL = FAQS.map((f) => ({ question: f.question, answer: f.answer }));

const BY_SERVICE = SERVICE_DETAILS.map((s) => ({
  slug: s.slug,
  name: s.name,
  faqs: s.faqs,
}));

const ALL_FAQS = [...GENERAL, ...BY_SERVICE.flatMap((s) => s.faqs)];

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: "Frequently Asked Questions",
    description:
      "Answers about MLHK Infotech's services, timelines, support, data protection and AI automation, for businesses in India.",
    path: "/faq",
  });
}

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd faqs={ALL_FAQS} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ", href: "/faq" }]} />

      <PageHero
        eyebrow="FAQ"
        title={<>Questions, <span className="text-brand">answered.</span></>}
        description="Straight answers about how we work, what things cost to start, and how we handle support and data."
      />

      <section className="bg-[#050607] px-4 pb-24 md:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-white">About MLHK Infotech</h2>
          <div className="mt-6">
            {GENERAL.map((f) => (
              <details key={f.question} className="group border-b border-white/10 py-5 first:pt-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-medium text-white marker:content-none">
                  {f.question}
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-[#ffb84d] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">{f.answer}</p>
              </details>
            ))}
          </div>

          {BY_SERVICE.map((s) => (
            <div key={s.slug} className="mt-20">
              <div className="flex items-end justify-between gap-4">
                <h2 className="font-display text-2xl font-bold text-white">{s.name}</h2>
                <Link href={`/services/${s.slug}`} className="text-sm font-semibold text-[#ffb84d] hover:text-white">Service details</Link>
              </div>
              <div className="mt-6">
                {s.faqs.map((f) => (
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
          ))}
        </div>
      </section>
    </>
  );
}
