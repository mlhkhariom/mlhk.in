import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  CheckCircle2,
  MapPin,
  Languages,
  BookOpen,
  ShieldCheck,
  Mail,
  Phone,
  Layers,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import { BASE_URL } from "@/lib/seo-utils";
import type { MpSiloPageData } from "@/lib/mp-silo-pages";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { QuickContactTrigger } from "@/components/public/QuickContactTrigger";
import {
  BreadcrumbJsonLd,
  FaqJsonLd,
  LocationServiceJsonLd,
} from "@/components/seo/JsonLd";

export function MpSiloPageView({ page }: { page: MpSiloPageData }) {
  const hi = page.lang === "hi";

  const breadcrumbItems = [
    { label: hi ? "होम" : "Home", href: "/" },
    { label: hi ? "मध्य प्रदेश हब" : "MP Hubs", href: "/locations/madhya-pradesh" },
    { label: page.city, href: page.path },
  ];

  const packagesForSchema = page.pillars.map((p) => ({
    name: p.title,
    price: p.startingPrice,
    summary: p.detail,
  }));

  return (
    <article
      lang={hi ? "hi-IN" : "en-IN"}
      className="relative min-h-screen bg-[#050607] text-zinc-100"
    >
      {/* Structured Data: WebPage + Service + GeoCoordinates + OfferCatalog + Speakable + FAQ + Breadcrumbs */}
      <LocationServiceJsonLd
        slug={page.path.replace(/^\//, "")}
        path={page.path}
        pageTitle={`${page.seoTitle} | ${BRAND.name}`}
        name={page.city}
        state={page.state}
        regionType="City"
        description={page.seoDescription}
        lat={page.lat}
        lng={page.lng}
        areasCovered={page.landmarks}
        packages={packagesForSchema}
        inLanguage={hi ? ["hi-IN", "en-IN"] : ["en-IN", "hi-IN"]}
      />
      <FaqJsonLd faqs={page.aeoFaqs} />
      <BreadcrumbJsonLd
        items={breadcrumbItems.map((b) => ({
          name: b.label,
          url: `${BASE_URL}${b.href}`,
        }))}
      />

      <Breadcrumbs items={breadcrumbItems} />

      {/* 1. Editorial Hero & 1200x630 Banner Visual */}
      <section className="relative overflow-hidden bg-[#050607] px-4 pb-16 pt-10 md:px-6 md:pt-14">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[440px] w-[860px] max-w-full -translate-x-1/2 rounded-full bg-[#ff9f1c]/[0.08] blur-[140px]"
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
              {page.eyebrow}
            </p>
            {page.alternatePath && (
              <Link
                href={page.alternatePath}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-zinc-200 transition-colors hover:border-[#ff9f1c]/50 hover:text-[#ffb84d]"
              >
                <Languages className="size-3.5 text-[#ffb84d]" />
                <span>{hi ? "Read in English" : "हिन्दी में पढ़ें"}</span>
              </Link>
            )}
          </div>

          <h1 className="mt-4 max-w-4xl font-display text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl">
            {page.h1} <span className="text-brand">{page.h1Highlight}</span>
          </h1>

          <p
            data-speakable="summary"
            className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-300 md:text-lg"
          >
            {page.introSummary}
          </p>

          {/* Primary Action Row */}
          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <QuickContactTrigger
              city={page.city}
              service={page.ctaServiceDefault}
              lang={page.lang}
              className="mlhk-sheen inline-flex min-h-[46px] items-center gap-2.5 rounded-full bg-[#ff9f1c] px-6 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-[1.02] hover:bg-[#ffb84d]"
            >
              <span>{hi ? "फ्री प्रोजेक्ट कोट पाएं" : "Get Fixed INR Quote"}</span>
              <ArrowUpRight className="size-4" />
            </QuickContactTrigger>

            <a
              href={`https://wa.me/919165100124?text=${encodeURIComponent(
                hi
                  ? `नमस्ते MLHK Infotech, मुझे ${page.city} में वेबसाइट/ऐप/SEO के बारे में जानकारी चाहिए।`
                  : `Hello MLHK Infotech, I need website, app or SEO services for ${page.city}.`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-zinc-100 transition-colors hover:border-emerald-400/50 hover:text-emerald-300"
            >
              <Phone className="size-4 text-emerald-400" />
              <span>{hi ? "WhatsApp पर बात करें" : "WhatsApp Direct"}</span>
            </a>

            <span className="text-xs text-zinc-400">
              {BRAND.tagline} · <strong className="text-zinc-200">{BRAND.digitalTagline}</strong>
            </span>
          </div>

          {/* 1200x630 Banner Visual with Brand+City Alt & Figcaption */}
          <figure className="mt-10 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#090d16]">
            <div className="relative aspect-[1200/630] w-full overflow-hidden bg-[#090d16]">
              <Image
                src={page.bannerImage}
                alt={page.bannerAlt}
                width={1200}
                height={630}
                priority
                referrerPolicy="no-referrer"
                sizes="(max-width: 768px) 100vw, 1152px"
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090d16]/75 via-transparent to-transparent"
              />
            </div>
            <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-[#080b12] px-5 py-3 text-xs text-zinc-300">
              <span>{page.bannerCaption}</span>
              <span className="font-mono text-[11px] text-[#ffb84d]">MLHK Infotech · support@mlhk.in</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 2. Authentic Local Narrative & Covered Landmarks */}
      <section className="border-t border-white/10 bg-[#07090e] px-4 py-16 md:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-8">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
              {hi ? "स्थानीय बाज़ार और ज़मीनी समझ" : "Local Market Ground Reality"}
            </p>
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
              {hi
                ? `${page.city} में डिजिटल सफलता के लिए सटीक स्थानीय रणनीति`
                : `Why ${page.city} Organizations Partner with MLHK Infotech`}
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-zinc-300 md:text-base">
              {page.localNarrative.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-[#0b0e17] p-6 lg:col-span-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ffb84d]">
              <MapPin className="size-4 shrink-0" />
              <span>{hi ? "कवर किए जाने वाले प्रमुख क्षेत्र" : "Key Landmarks & Corridors"}</span>
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-zinc-200">
              {page.landmarks.map((lm) => (
                <li key={lm} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#ff9f1c]" />
                  <span>{lm}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-white/10 pt-4 text-xs text-zinc-400">
              <p className="font-medium text-zinc-200">
                {hi ? "प्रत्यक्ष मुख्यालय एवं संचालन" : "Direct MP Operations"}
              </p>
              <p className="mt-1">Shajapur HQ &amp; Indore Studio · {BRAND.udyamNumber}</p>
              <p className="mt-0.5 font-mono text-[#ffb84d]">GSTIN: {BRAND.gstin}</p>
            </div>
          </aside>
        </div>
      </section>

      {/* 3. Visual Showcase Cards (800x500 WebP with Figcaption) */}
      <section className="border-t border-white/10 bg-[#050607] px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            {page.featureCards.map((card) => (
              <div
                key={card.title}
                className="mlhk-card-hover flex flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b0d14]"
              >
                <figure className="relative overflow-hidden bg-[#090d16]">
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      width={800}
                      height={500}
                      referrerPolicy="no-referrer"
                      sizes="(max-width: 768px) 100vw, 560px"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="border-t border-white/10 bg-[#080b12] px-5 py-2.5 text-[11px] text-zinc-400">
                    {card.caption}
                  </figcaption>
                </figure>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-bold text-white">{card.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-zinc-300">{card.summary}</p>
                  <div className="mt-auto pt-5">
                    <Link
                      href={card.serviceHref}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ffb84d] hover:underline"
                    >
                      <span>{card.serviceLabel}</span>
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Three Core Service Pillars & Full Tech Stack Note */}
      <section className="border-t border-white/10 bg-[#07090e] px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
              {hi ? "पारदर्शी पैकेज और सेवाएं" : "Transparent Solutions & Pricing"}
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">
              {hi
                ? `${page.city} के लिए संपूर्ण IT, वेबसाइट, ऐप और SEO पैकेज`
                : `End-to-End Engineering & Digital Growth for ${page.city}`}
            </h2>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {page.pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="mlhk-card-hover flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0b0e17] p-6"
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-[#ffb84d]">{pillar.number}</span>
                    <span className="font-mono font-semibold text-emerald-400">
                      {pillar.startingPrice}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold text-white">{pillar.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-zinc-300">{pillar.detail}</p>
                  <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs text-zinc-300">
                    {pillar.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-[#ff9f1c]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <QuickContactTrigger
                    city={page.city}
                    service={page.ctaServiceDefault}
                    lang={page.lang}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ffb84d] hover:text-white"
                  >
                    <span>{hi ? "इस सेवा का कोट लें" : "Request Fixed Proposal"}</span>
                    <ArrowUpRight className="size-3.5" />
                  </QuickContactTrigger>
                </div>
              </div>
            ))}
          </div>

          {/* Full Spectrum Tech Stack Callout */}
          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#090d16] p-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <Layers className="mt-0.5 size-5 shrink-0 text-[#ffb84d]" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ffb84d]">
                  {hi ? "पारंपरिक, क्लासिक और आधुनिक टेक्नोलॉजी" : "Traditional, Classic & Modern Engineering"}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-300 md:text-sm">
                  {page.techStackNote}
                </p>
              </div>
            </div>
            <Link
              href="/services"
              className="shrink-0 text-xs font-semibold text-[#ffb84d] hover:underline"
            >
              {hi ? "सभी सेवाएं देखें →" : "Explore All Services →"}
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Crisp 40-55 Word AEO / Voice Search / GRO Q&A Section */}
      <section className="border-t border-white/10 bg-[#050607] px-4 py-16 md:px-6" aria-labelledby="silo-aeo-heading">
        <div className="mx-auto max-w-4xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
            {hi ? "अक्सर पूछे जाने वाले सवाल (AEO & Voice Search)" : "Direct Answers · AEO & Voice Search"}
          </p>
          <h2 id="silo-aeo-heading" className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">
            {hi ? `${page.city} डिजिटल सेवाओं से जुड़े प्रमुख प्रश्न` : `Key Questions Answered for ${page.city}`}
          </h2>

          <div className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/10 bg-[#090c14] px-6">
            {page.aeoFaqs.map((faq) => (
              <details key={faq.question} open className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-white marker:content-none">
                  <span>{faq.question}</span>
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-white/15 text-sm text-[#ffb84d] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 6. E-E-A-T Author & Brand Authority Box + Internal Silo Interlinking Mesh */}
      <section className="border-t border-white/10 bg-[#07090e] px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl space-y-10">
          {/* Author & Brand Trust Box */}
          <div className="rounded-2xl border border-[#ff9f1c]/25 bg-[#0b0e17] p-6 md:p-7">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1.5">
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#ffb84d]">
                  <ShieldCheck className="size-4" />
                  <span>{hi ? "प्रमाणित विशेषज्ञता व ब्रांड ट्रस्ट (E-E-A-T)" : "Verified E-E-A-T Authority"}</span>
                </p>
                <p className="text-sm font-semibold text-white md:text-base">
                  Written by MLHK Digital Strategy Team, Indore (MP) · Led by {BRAND.founder} ({BRAND.founderAlias})
                </p>
                <p className="text-xs leading-relaxed text-zinc-400">
                  {BRAND.name} · {BRAND.tagline} · {BRAND.digitalTagline} · MSME {BRAND.udyamNumber} · GSTIN {BRAND.gstin}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <a
                  href={`mailto:${BRAND.supportEmail}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-semibold text-zinc-100 hover:border-[#ff9f1c]/50 hover:text-[#ffb84d]"
                >
                  <Mail className="size-3.5 text-[#ffb84d]" />
                  <span>{BRAND.supportEmail}</span>
                </a>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-semibold text-zinc-200 hover:text-white"
                >
                  <span>{hi ? "हमारे बारे में जानें" : "About MLHK & Founder"}</span>
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Connected MP Silo & Related Blog Mesh */}
          <div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
                  {hi ? "जुड़े हुए मध्य प्रदेश डिजिटल हब" : "Connected Madhya Pradesh Silo Network"}
                </p>
                <h2 className="mt-1.5 font-display text-xl font-bold text-white md:text-2xl">
                  {hi ? "अन्य शहर, मंदिर कॉरिडोर और उपयोगी गाइड" : "Explore Connected MP Cities, Temples & Deep Guides"}
                </h2>
              </div>
              <Link
                href={page.relatedBlogHref}
                className="inline-flex items-center gap-2 rounded-full border border-[#ff9f1c]/35 bg-[#ff9f1c]/10 px-4 py-2 text-xs font-semibold text-[#ffb84d] hover:bg-[#ff9f1c]/20"
              >
                <BookOpen className="size-3.5" />
                <span>{page.relatedBlogLabel}</span>
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>

            <div className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {page.relatedSiloLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="mlhk-card-hover group flex flex-col justify-between rounded-xl border border-white/10 bg-[#0b0d14] p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-semibold text-white group-hover:text-[#ffb84d]">
                      {item.label}
                    </span>
                    <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-zinc-500 group-hover:text-[#ffb84d]" />
                  </div>
                  <p className="mt-1.5 text-xs text-zinc-400">{item.note}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
