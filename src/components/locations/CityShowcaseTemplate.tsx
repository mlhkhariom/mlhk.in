import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Globe,
  Languages,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { BRAND, CAPABILITIES, SERVICE_LINES } from "@/lib/brand";
import {
  getLocationHeroVisual,
  getLocationHub,
  getLocationTierBucket,
  type LocationHub,
} from "@/lib/seo-locations";
import { getHindiLocationData } from "@/lib/seo-locations-hi";
import { SOLUTION_PAGES } from "@/lib/seo-solutions";
import { ShowcaseImage } from "@/components/ui/ShowcaseImage";
import { QuickContactTrigger } from "@/components/public/QuickContactTrigger";

interface CityShowcaseTemplateProps {
  loc: LocationHub;
  lang: "en" | "hi";
}

const DELIVERY_STEPS_EN = [
  {
    step: "01",
    title: "30-Min Scope & Fixed INR Proposal",
    body: "Share your requirement via popup or WhatsApp. Within 24 hours you receive an exact milestone timeline and fixed INR quote — zero hidden agency retainers.",
  },
  {
    step: "02",
    title: "Custom Architecture & Design Preview",
    body: "We design a clean, conversion-first interface tailored to your city and industry, and send you a live preview URL on day 5 to review on your own phone.",
  },
  {
    step: "03",
    title: "Edge Build, Local SEO & CRM Integration",
    body: "Clean Next.js / Android engineering, Cloudflare India Edge deployment (<30ms), Schema.org JSON-LD, WhatsApp lead sync, and Google Search Console verification.",
  },
  {
    step: "04",
    title: "Launch, GST Invoice & 100% Ownership",
    body: "Full source code, domain, and admin dashboard handed over to you with MSME & GST invoicing plus 30 days of complimentary launch support.",
  },
] as const;

const DELIVERY_STEPS_HI = [
  {
    step: "01",
    title: "30-मिनट चर्चा और पक्का INR कोटेशन",
    body: "पॉपअप फॉर्म या WhatsApp पर अपनी ज़रूरत बताएं। 24 घंटे के अंदर आपको साफ टाइमलाइन और फिक्स्ड कीमत (₹ में) मिल जाती है — कोई छिपा शुल्क नहीं।",
  },
  {
    step: "02",
    title: "कस्टम डिज़ाइन और लाइव मोबाइल प्रीव्यू",
    body: "हम आपके शहर और बिज़नेस के हिसाब से आधुनिक डिज़ाइन बनाकर 5वें दिन आपको लाइव प्रीव्यू लिंक भेजते हैं ताकि आप अपने फोन पर देख सकें।",
  },
  {
    step: "03",
    title: "हाई-स्पीड डेवलपमेंट, Local SEO और CRM सेटअप",
    body: "Cloudflare इंडिया एज सर्वर (<30ms स्पीड), Google Maps व Local Schema SEO, और सीधी WhatsApp व एडमिन CRM लीड कनेक्टिविटी।",
  },
  {
    step: "04",
    title: "लॉन्च, GST बिल और 100% मालिकाना हक",
    body: "पूरा सोर्स कोड, डोमेन और एडमिन पैनल आपका होता है — आधिकारिक MSME व GST बिल और 30 दिन फ्री लॉन्च सपोर्ट के साथ।",
  },
] as const;

export function CityShowcaseTemplate({ loc, lang }: CityShowcaseTemplateProps) {
  const isHi = lang === "hi";
  const hi = getHindiLocationData(loc);
  const visual = getLocationHeroVisual(loc);
  const tierBucket = getLocationTierBucket(loc);

  const nearbyLocations = loc.nearbySlugs
    .map((s) => getLocationHub(s))
    .filter((item): item is LocationHub => Boolean(item));

  const allServices = [
    ...SERVICE_LINES.map((s) => ({ title: s.title, slug: s.slug, description: s.description })),
    ...CAPABILITIES.map((c) => ({ title: c.title, slug: c.slug, description: c.description })),
  ];

  const cityDisplay = isHi ? hi.nameHi : loc.name;
  const stateDisplay = isHi ? hi.stateHi : loc.state;
  const packages = isHi ? hi.packagesHi : loc.startingPackages;
  const faqs = isHi ? hi.faqsHi : loc.faqs;
  const steps = isHi ? DELIVERY_STEPS_HI : DELIVERY_STEPS_EN;
  const whatsappText = isHi
    ? `नमस्ते MLHK Infotech, मुझे ${hi.nameHi} (${hi.stateHi}) में वेबसाइट / ऐप / SEO या डिजिटल मार्केटिंग के लिए जानकारी चाहिए।`
    : `Hi MLHK Infotech, I am looking for IT, website, app, or digital marketing services in ${loc.name}, ${loc.state}.`;

  return (
    <div lang={isHi ? "hi-IN" : "en-IN"}>
      {/* Hero Section with Bespoke City Showcase Visual + Language Switcher */}
      <section className="relative overflow-hidden bg-[#050607] px-4 pb-20 pt-20 md:px-6 md:pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-36 left-1/2 h-96 w-[46rem] -translate-x-1/2 rounded-full bg-[#ff9f1c]/12 blur-[140px]"
        />
        <div className="relative mx-auto max-w-6xl">
          {/* Top Bilingual Language Switcher Bar */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
              <span className="font-semibold uppercase tracking-[0.18em] text-[#ffb84d]">
                {tierBucket}
              </span>
              <span className="text-zinc-600">•</span>
              <span>
                {cityDisplay}, {stateDisplay}
              </span>
            </div>

            <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.03] p-1 text-xs">
              <Languages className="ml-2 size-3.5 text-[#ffb84d]" aria-hidden />
              <Link
                href={`/locations/${loc.slug}`}
                hrefLang="en-IN"
                className={`rounded-full px-3 py-1 font-semibold transition-colors ${
                  !isHi
                    ? "bg-[#ff9f1c] text-black"
                    : "text-zinc-300 hover:text-white"
                }`}
              >
                English
              </Link>
              <Link
                href={`/hi/locations/${loc.slug}`}
                hrefLang="hi-IN"
                className={`rounded-full px-3 py-1 font-semibold transition-colors ${
                  isHi
                    ? "bg-[#ff9f1c] text-black"
                    : "text-zinc-300 hover:text-white"
                }`}
              >
                हिन्दी
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Hero Copy */}
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
                {isHi ? hi.heroEyebrow : loc.heroEyebrow}
              </p>
              <h1 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-white text-balance md:text-5xl">
                {isHi ? hi.heroHeadline : loc.heroHeadline}{" "}
                <span className="text-brand">{isHi ? hi.heroHighlight : loc.heroHighlight}</span>
              </h1>
              <p
                data-speakable="summary"
                className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg"
              >
                {isHi ? hi.heroSummary : loc.heroSummary}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <QuickContactTrigger city={loc.name} lang={lang}>
                  {isHi
                    ? `${hi.nameHi} के लिए फ्री कोट पाएं`
                    : `Get Free Quote for ${loc.name}`}
                </QuickContactTrigger>

                <a
                  href={`https://wa.me/919165100124?text=${encodeURIComponent(whatsappText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-[#25D366]/60 hover:text-[#25D366] whitespace-nowrap"
                >
                  <Phone className="size-4 text-[#ff9f1c]" />
                  {isHi ? `WhatsApp ${BRAND.phoneDisplay}` : `WhatsApp ${BRAND.phoneDisplay}`}
                </a>
              </div>
            </div>

            {/* Bespoke Industry-Matched Showcase Visual */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-[#0a0b0e] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)]">
                <div className="relative aspect-[4/3] w-full">
                  <ShowcaseImage
                    src={visual.src}
                    alt={`${cityDisplay} — ${visual.caption}`}
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050607] via-[#050607]/25 to-transparent" />
                </div>
                <div className="border-t border-white/10 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ffb84d]">
                    {isHi ? `${hi.nameHi} डिजिटल ग्रोथ हब` : `${loc.name} Engineering Hub`}
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {isHi ? hi.localEconomyHi : visual.caption}
                  </p>
                  <p className="mt-2 text-xs tabular-nums text-zinc-400">
                    {isHi
                      ? `शुरुआती पैकेज ${packages[0]?.price ?? "₹15,000"} · MSME & GST रजिस्टर्ड`
                      : `Starting ${packages[0]?.price ?? "₹15,000"} · 100% Source Code Ownership`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Grounded Regional Trust & Edge Strip */}
          <div className="mt-12 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <Zap className="mt-0.5 size-4 shrink-0 text-[#ff9f1c]" />
              <div>
                <p className="text-xs font-semibold text-white">
                  {isHi ? "लोकल एज सुपर-फास्ट स्पीड" : "Local Edge Performance"}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                  {isHi
                    ? `${hi.nameHi} में Cloudflare इंडिया एज सर्वर से 1 सेकंड से कम लोडिंग स्पीड`
                    : loc.localEdgePop}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#ff9f1c]" />
              <div>
                <p className="text-xs font-semibold text-white">
                  {isHi ? "सरकारी MSME और GST रजिस्टर्ड" : "MSME & GST Compliant"}
                </p>
                <p className="mt-1 text-xs tabular-nums text-zinc-400">
                  Udyam {BRAND.udyamNumber} · GST {BRAND.gstin}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[#ff9f1c]" />
              <div>
                <p className="text-xs font-semibold text-white">
                  {isHi ? "सीधे फाउंडर की निगरानी" : "Direct Founder Oversight"}
                </p>
                <p className="mt-1 text-xs text-zinc-400">
                  {isHi
                    ? `${BRAND.founder} के नेतृत्व में · 100% कोड आपका`
                    : `Led by ${BRAND.founder} · 100% Code Ownership`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Problem vs. MLHK Infotech Real Solution */}
      <section className="border-t border-white/10 bg-[#070809] px-4 py-20 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-[#0b0c10] p-7 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                {isHi ? `${hi.nameHi} के बिज़नेस की असली समस्या` : `Why Businesses in ${loc.name} Struggle Online`}
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold text-white">
                {isHi
                  ? "महंगी एजेंसियाँ, धीमी वेबसाइट और ज़ीरो Google रैंकिंग"
                  : `Overpriced Templates, Slow Loading & Missed Local Leads`}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                {isHi
                  ? hi.localPainPointHi
                  : `Most local agencies in ${loc.name} sell recycled WordPress themes on slow overseas hosting, charge inflated agency retainers, and ignore technical SEO, Local Schema, and WhatsApp lead tracking — leaving businesses invisible when nearby customers search on Google.`}
              </p>
              <p className="mt-4 text-xs leading-relaxed text-zinc-400">
                {isHi
                  ? `प्रमुख क्षेत्र: ${hi.topMarketsHi}`
                  : `Key active markets: ${loc.areasCovered.slice(0, 6).join(" · ")}`}
              </p>
            </div>

            <div className="rounded-3xl border border-[#ff9f1c]/30 bg-gradient-to-br from-[#ff9f1c]/[0.08] via-[#0b0c10] to-[#0b0c10] p-7 md:p-8">
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#ffb84d]">
                <Sparkles className="size-3.5" />
                {isHi ? `MLHK Infotech ${hi.nameHi} की कैसे मदद करता है` : `How MLHK Infotech Solves This in ${loc.name}`}
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold text-white">
                {isHi
                  ? "कम खर्च में मेट्रो-ग्रेड इंजीनियरिंग + सीधा CRM व SEO"
                  : `Direct In-House Engineering, Fast Edge Hosting & Real Local ROI`}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-200">
                {isHi ? hi.mlhkSolutionHi : loc.whyMlhkHere[0]}
              </p>
              <div className="mt-6">
                <QuickContactTrigger city={loc.name} lang={lang}>
                  {isHi ? "अपने प्रोजेक्ट का प्लान समझें" : "Discuss Your Project Scope"}
                </QuickContactTrigger>
              </div>
            </div>
          </div>

          {/* Regional Industry Solutions */}
          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
                {isHi ? `${hi.nameHi} के लिए विशेष` : `Built for ${loc.name}`}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-white text-balance">
                {isHi
                  ? `${hi.nameHi} में MLHK Infotech के साथ बिज़नेस कैसे बढ़ता है`
                  : `How Businesses in ${loc.name} Grow With MLHK Infotech`}
              </h2>
              <ul className="mt-6 space-y-4">
                {(isHi
                  ? [
                      `${hi.localEconomyHi} के लिए पूरी तरह कस्टम-कोडेड वेबसाइट, ऐप और SEO सिस्टम।`,
                      "बड़े महानगरों की एजेंसियों से 40–60% कम बजट, लेकिन वही लेटेस्ट Next.js, TypeScript और Cloudflare टेक्नोलॉजी।",
                      `भारत सरकार के MSME (${BRAND.udyamNumber}) और GSTIN (${BRAND.gstin}) के साथ पक्का टैक्स बिल और 100% सोर्स कोड ओनरशिप।`,
                    ]
                  : loc.whyMlhkHere
                ).map((reason) => (
                  <li key={reason} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#ff9f1c]" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 lg:col-span-7">
              {loc.localIndustries.map((ind, idx) => (
                <div key={ind.name} className="rounded-2xl border border-white/10 bg-[#0a0b0e] p-6">
                  <p className="text-xs font-semibold tabular-nums text-[#ffb84d]">
                    0{idx + 1}. {isHi ? "स्थानीय उद्योग फोकस" : "Industry Focus"}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-bold text-white">{ind.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">{ind.solution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transparent INR Pricing Packages with Pre-filled Popup Quote Buttons */}
      <section className="border-t border-white/10 bg-[#050607] px-4 py-20 md:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
            {isHi ? "पारदर्शी भारतीय कीमत (INR)" : "Transparent INR Pricing"}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white text-balance">
            {isHi
              ? `${hi.nameHi} के लिए कम बजट, हाई-क्वालिटी पैकेज`
              : `Low-Cost, High-Quality Packages for ${loc.name}`}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300">
            {isHi
              ? "कोई छिपा चार्ज नहीं, कोई मंथली बंधन नहीं। हर प्रोजेक्ट इन-हाउस बनता है और GST इनवॉइस के साथ डिलीवर होता है।"
              : "Fixed upfront estimates with zero agency bloat and zero monthly hostage fees. Every deliverable is engineered in-house and backed by GST invoicing."}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0a0b0e] p-6 transition-colors hover:border-[#ff9f1c]/45"
              >
                <div>
                  <p className="text-xs tabular-nums text-zinc-400">{pkg.timeline}</p>
                  <h3 className="mt-2 font-display text-lg font-bold text-white">{pkg.name}</h3>
                  <p className="mt-3 font-display text-xl font-bold tabular-nums text-[#ffb84d]">
                    {pkg.price}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-zinc-300">{pkg.summary}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <QuickContactTrigger
                    city={loc.name}
                    service={pkg.name}
                    budget={pkg.price}
                    lang={lang}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white transition-colors hover:text-[#ffb84d]"
                  >
                    {isHi ? "इस पैकेज का कोट लें" : "Request exact quote"}
                  </QuickContactTrigger>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Delivery Roadmap */}
      <section className="border-t border-white/10 bg-[#070809] px-4 py-20 md:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
            {isHi ? "काम करने का तरीका" : "How We Deliver Remotely & Locally"}
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold text-white md:text-3xl">
            {isHi
              ? `${hi.nameHi} से लेकर पूरे भारत में 4 आसान चरणों में डिलीवरी`
              : `From First Message to Live Launch in ${loc.name} — 4 Clear Steps`}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.step} className="rounded-2xl border border-white/10 bg-[#0a0b0e] p-6">
                <p className="font-mono text-xs font-semibold text-[#ffb84d]">STEP {s.step}</p>
                <h3 className="mt-3 font-display text-base font-bold text-white">{s.title}</h3>
                <p className="mt-2.5 text-xs leading-relaxed text-zinc-400">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas, Industrial Belts, Tehsils & Villages Served */}
      <section className="border-t border-white/10 bg-[#050607] px-4 py-20 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
                {isHi ? "लोकल और आसपास की कवरेज" : "Local & Nearby Coverage"}
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold text-white md:text-3xl">
                {isHi
                  ? `${hi.nameHi} के सभी प्रमुख बाज़ार, इंडस्ट्रियल एरिया, तहसील और गाँव`
                  : `Areas, Industrial Belts & Nearby Towns Served Around ${loc.name}`}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                {isHi
                  ? `आपका बिज़नेस ${hi.topMarketsHi} या किसी भी नजदीकी कस्बे व गाँव में हो — हमारी टीम सीधे WhatsApp, फोन कॉल और Google Meet पर हिंदी व अंग्रेज़ी में पूरा प्रोजेक्ट डिलीवर करती है।`
                  : `Whether your business operates in a commercial hub, industrial estate, district headquarters, or rural town near ${loc.name}, our team collaborates smoothly via WhatsApp, calls, and Google Meet.`}
              </p>
            </div>
            <div className="lg:col-span-7">
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {loc.areasCovered.map((area) => (
                  <li
                    key={area}
                    className="flex items-center gap-2.5 border-b border-white/10 py-2.5 text-sm text-zinc-200"
                  >
                    <MapPin className="size-3.5 shrink-0 text-[#ff9f1c]" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Complete 8 Engineering Lines + Solution Guides + E-E-A-T Verification */}
      <section className="border-t border-white/10 bg-[#070809] px-4 py-20 md:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
            {isHi ? `${hi.nameHi} में उपलब्ध सभी सेवाएं` : `Complete Stack in ${loc.name}`}
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold text-white md:text-3xl">
            {isHi
              ? `वेबसाइट, ऐप, SEO, Ads और सॉफ्टवेयर — एक ही छत के नीचे`
              : `All 8 Engineering Lines & Specialized Solutions in ${loc.name}`}
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {allServices.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="group rounded-xl border border-white/10 bg-[#0a0b0e] p-5 transition-colors hover:border-[#ff9f1c]/45"
              >
                <h3 className="font-display text-sm font-bold text-white transition-colors group-hover:text-[#ffb84d]">
                  {svc.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-zinc-400">
                  {svc.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
              {isHi ? "प्रमुख समाधान गाइड (Solution Guides)" : "Popular Problem-Solving Guides"}
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5 text-sm">
              {SOLUTION_PAGES.map((sol) => (
                <Link
                  key={sol.slug}
                  href={`/solutions/${sol.slug}`}
                  className="inline-flex items-center gap-1 text-zinc-300 transition-colors hover:text-[#ffb84d]"
                >
                  <span>{sol.shortTitle}</span>
                  <ArrowUpRight className="size-3.5 text-[#ff9f1c]" />
                </Link>
              ))}
            </div>
          </div>

          {/* E-E-A-T Founder & Registration Verification Box */}
          <div className="mt-12 rounded-2xl border border-white/10 bg-[#0a0b0e] p-6 md:p-7">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#ffb84d]">
                  <ShieldCheck className="size-4" />
                  {isHi
                    ? "सत्यापित भारतीय IT कंपनी (E-E-A-T प्रमाणित)"
                    : "Verified Indian Software Enterprise · E-E-A-T"}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  {isHi
                    ? `MLHK Infotech की स्थापना 1 अप्रैल 2020 को ${BRAND.founder} (${BRAND.university} पूर्व छात्र) द्वारा की गई थी। यह भारत सरकार के MSME (${BRAND.udyamNumber}) और GSTIN (${BRAND.gstin}) के साथ रजिस्टर्ड है और शाजापुर मुख्यालय व इंदौर ऑपरेटिंग बेस से ${hi.nameHi} सहित पूरे भारत में सेवाएं देती है।`
                    : `Founded on 1 April 2020 by ${BRAND.founder} (${BRAND.university}), MLHK Infotech is registered under Ministry of MSME (${BRAND.udyamNumber}) and GSTIN (${BRAND.gstin}) — delivering sovereign Indian engineering from Shajapur HQ & Indore to ${loc.name} and all 28 Indian states.`}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-zinc-200 hover:border-[#ff9f1c]/50 hover:text-[#ffb84d]"
                >
                  {isHi ? "हमारी कंपनी के बारे में" : "Verify Credentials"} <ArrowUpRight className="size-3.5" />
                </Link>
                <Link
                  href={isHi ? `/locations/${loc.slug}` : `/hi/locations/${loc.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#ff9f1c]/35 bg-[#ff9f1c]/10 px-4 py-2 text-xs font-semibold text-[#ffb84d] hover:bg-[#ff9f1c]/20"
                >
                  <Globe className="size-3.5" />
                  {isHi ? "Read in English" : "हिन्दी में पढ़ें"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local FAQs (matches FAQPage JSON-LD 1:1) */}
      <section className="border-t border-white/10 bg-[#050607] px-4 py-20 md:px-6" aria-labelledby="loc-faq">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
            {isHi ? "अक्सर पूछे जाने वाले सवाल" : "Questions"}
          </p>
          <h2 id="loc-faq" className="mt-3 font-display text-3xl font-bold text-white">
            {isHi ? `${hi.nameHi} — सामान्य प्रश्न (FAQs)` : `Frequently Asked Questions — ${loc.name}`}
          </h2>
          <div className="mt-8">
            {faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-white/10 py-5 first:pt-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-medium text-white marker:content-none">
                  <span>{faq.question}</span>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-[#ffb84d] transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-zinc-300">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Regional Hubs Cross-Link */}
      {nearbyLocations.length > 0 && (
        <section className="border-t border-white/10 bg-[#070809] px-4 py-14 md:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                {isHi ? "अन्य प्रमुख शहर और राज्यों के हब" : "Also Serving Nearby & National Hubs"}
              </p>
              <Link
                href={isHi ? "/hi/locations" : "/locations"}
                className="text-xs font-semibold text-[#ffb84d] hover:underline"
              >
                {isHi ? "सभी 38+ भारतीय शहर देखें →" : "View all 38+ Tier-1, 2 & 3 cities →"}
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5 text-sm">
              {nearbyLocations.map((near) => {
                const nearHi = getHindiLocationData(near);
                return (
                  <Link
                    key={near.slug}
                    href={isHi ? `/hi/locations/${near.slug}` : `/locations/${near.slug}`}
                    className="text-zinc-300 transition-colors hover:text-[#ffb84d]"
                  >
                    {isHi ? `${nearHi.nameHi} IT व वेबसाइट सेवाएं` : `IT & Web Services in ${near.name}`}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
