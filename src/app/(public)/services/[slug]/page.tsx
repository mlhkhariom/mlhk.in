import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { buildSeo } from "@/lib/seo";
import JsonLd, { FaqJsonLd } from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { PageHero } from "@/components/public/PageHero";
import { SERVICE_DETAILS, BRAND } from "@/lib/brand";

export function generateStaticParams() {
  return SERVICE_DETAILS.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

async function findService(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const service = SERVICE_DETAILS.find((s) => s.slug === slug);
  if (!service) notFound();
  return service;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const service = await findService(params);
  return buildSeo({
    title: `${service.name} in India`,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const service = await findService(params);

  return (
    <>
      <JsonLd
        data={{
          "@type": "Service",
          "@id": `${BRAND.url}/services/${service.slug}#service`,
          name: service.name,
          description: service.summary,
          url: `${BRAND.url}/services/${service.slug}`,
          serviceType: service.name,
          provider: {
            "@type": "Organization",
            "@id": `${BRAND.url}/#organization`,
            name: BRAND.name,
            url: BRAND.url,
          },
          areaServed: [
            { "@type": "Country", name: "India" },
            { "@type": "AdministrativeArea", name: "Madhya Pradesh" },
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${service.name} Capabilities & Deliverables`,
            itemListElement: service.deliverables.map((d) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: d,
              },
            })),
          },
        }}
      />
      <FaqJsonLd faqs={service.faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name, href: `/services/${service.slug}` },
        ]}
      />

      <PageHero eyebrow="Service" title={service.name} description={service.intro} />

      <section className="bg-[#050607] px-4 pt-2 md:px-6">
        <div className="mx-auto max-w-6xl rounded-[1.75rem] border border-[#ff9f1c]/20 bg-[#ff9f1c]/[0.04] p-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">Who this is for</p>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-zinc-200">{service.audience}</p>
        </div>
      </section>

      <section className="bg-[#050607] px-4 pb-24 md:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-12">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-8 md:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">What you get</p>
            <ul className="mt-6 space-y-4">
              {service.deliverables.map((d) => (
                <li key={d} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                  <Check className="mt-0.5 size-4 shrink-0 text-[#ffb84d]" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">How we deliver</p>
            <ol className="mt-6 space-y-6">
              {service.process.map((p, i) => (
                <li key={p.step} className="flex gap-4">
                  <span className="font-display text-xs font-bold text-[#ff9f1c] tabular-nums">0{i + 1}</span>
                  <div>
                    <p className="font-display text-base font-bold text-white">{p.step}</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">{p.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#070809] px-4 py-24 md:px-6" aria-labelledby="service-faq">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">Questions</p>
          <h2 id="service-faq" className="mt-4 font-display text-3xl font-bold text-white">About {service.name.toLowerCase()}</h2>
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
          Discuss {service.name.toLowerCase()}
          <span className="flex size-9 items-center justify-center rounded-full bg-black/10 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px">
            <ArrowUpRight className="size-4" />
          </span>
        </Link>
      </section>
    </>
  );
}
