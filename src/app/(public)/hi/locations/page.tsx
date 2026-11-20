import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Globe, Languages, Phone, ShieldCheck } from "lucide-react";
import { buildSeo } from "@/lib/seo";
import { CollectionHubJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { PageHero } from "@/components/public/PageHero";
import { BRAND } from "@/lib/brand";
import {
  LOCATION_HUBS,
  getLocationHeroVisual,
  getLocationTierBucket,
} from "@/lib/seo-locations";
import { getHindiLocationData } from "@/lib/seo-locations-hi";
import {
  LocationsDirectoryClient,
  type DirectoryCityItem,
} from "@/components/locations/LocationsDirectoryClient";
import { QuickContactTrigger } from "@/components/public/QuickContactTrigger";

export const revalidate = 3600;

const HI_LOCATIONS_FAQS = [
  {
    question: "क्या MLHK Infotech भारत के सभी Tier-1, Tier-2 और Tier-3 शहरों व गाँवों में काम करता है?",
    answer:
      "जी हाँ! हमारा मुख्यालय शाजापुर (मध्य प्रदेश) में है और ऑपरेटिंग बेस इंदौर में है, लेकिन हम पूरे भारत के सभी 28 राज्यों, 8 केंद्र शासित प्रदेशों, Tier-1 मेट्रो शहरों, Tier-2 व Tier-3 शहरों और गाँवों के लिए वेबसाइट, Android ऐप, Local SEO, Instagram/Google Ads और GST ERP बनाते हैं।",
  },
  {
    question: "छोटे शहर या कस्बे के बिज़नेस के लिए वेबसाइट बनवाने में कितना खर्च आता है?",
    answer:
      "MLHK Infotech में मोबाइल-फर्स्ट, तेज़ लोड होने वाली कस्टम बिज़नेस वेबसाइट ₹15,000 से शुरू होती है, पुरानी वेबसाइट का रीडिज़ाइन ₹8,000 से, ई-कॉमर्स ऑनलाइन दुकान ₹28,000 से और Android ऐप या GST ERP ₹45,000 से शुरू होता है।",
  },
  {
    question: "क्या हम हिंदी में बात करके और WhatsApp के ज़रिए अपना पूरा प्रोजेक्ट बनवा सकते हैं?",
    answer:
      "बिल्कुल। हमारे 70% से अधिक ग्राहक हिंदी और अंग्रेज़ी में सीधे WhatsApp (+91 91651 00124), फोन कॉल और Google Meet के माध्यम से काम करते हैं। आपको हर सप्ताह लाइव प्रीव्यू लिंक, पक्का MSME/GST बिल और 100% सोर्स कोड ओनरशिप मिलती है।",
  },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: "पूरे भारत के 38+ शहरों में बेस्ट IT, वेबसाइट, ऐप और SEO सेवाएं (हिन्दी हब)",
    description:
      "इंदौर, शाजापुर, मध्य प्रदेश, दिल्ली, मुंबई, सूरत, वाराणसी, कोटा, रतलाम, जयपुर, लखनऊ सहित सभी Tier-1, Tier-2 और Tier-3 शहरों में कम बजट में बेस्ट वेबसाइट, ऐप, SEO और GST ERP — MLHK Infotech।",
    path: "/hi/locations",
    image: "/images/showcase/studio-hub.jpg",
    locale: "hi_IN",
    alternateLanguages: {
      "hi-IN": `${BRAND.url}/hi/locations`,
      "en-IN": `${BRAND.url}/locations`,
      "x-default": `${BRAND.url}/locations`,
    },
    keywords: [
      "भारत में बेस्ट IT कंपनी",
      "वेबसाइट बनवानी है बेस्ट कंपनी",
      "कम बजट में वेबसाइट और ऐप",
      "इंदौर भोपाल उज्जैन शाजापुर वेबसाइट कंपनी",
      "Tier 2 Tier 3 city website company Hindi",
      "MLHK Infotech Hindi",
    ],
  });
}

export default function HindiLocationsIndexPage() {
  const directoryItems: DirectoryCityItem[] = LOCATION_HUBS.map((loc) => {
    const hi = getHindiLocationData(loc);
    return {
      slug: loc.slug,
      name: loc.name,
      nameHi: hi.nameHi,
      state: loc.state,
      stateHi: hi.stateHi,
      tierLabel: loc.tier,
      tierBucket: getLocationTierBucket(loc),
      summary: loc.heroSummary,
      summaryHi: hi.heroSummary,
      areasPreview: hi.topMarketsHi,
      startingPrice: loc.startingPackages[0]?.price.split("–")[0]?.trim() ?? "₹15,000",
      imageSrc: getLocationHeroVisual(loc).src,
    };
  });

  return (
    <div lang="hi-IN">
      <CollectionHubJsonLd
        path="/hi/locations"
        inLanguage="hi-IN"
        name="MLHK Infotech हिन्दी शहर हब — पूरे भारत के 38+ Tier-1, Tier-2 और Tier-3 शहर"
        description="मध्य प्रदेश और पूरे भारत के सभी प्रमुख Tier-1, Tier-2 और Tier-3 शहरों के लिए वेबसाइट, Android ऐप, Local SEO, Instagram/Google Ads और GST ERP सेवाएं।"
        items={LOCATION_HUBS.map((loc) => {
          const hi = getHindiLocationData(loc);
          return {
            name: hi.seoTitle,
            url: `${BRAND.url}/hi/locations/${loc.slug}`,
            description: hi.metaDescription,
          };
        })}
      />
      <FaqJsonLd faqs={HI_LOCATIONS_FAQS} />
      <Breadcrumbs
        items={[
          { label: "होम", href: "/" },
          { label: "शहर हब (हिन्दी)", href: "/hi/locations" },
        ]}
      />

      <PageHero
        eyebrow="38+ भारतीय शहरों के लिए हिन्दी गाइड • MSME & GST रजिस्टर्ड"
        title={
          <>
            भारत में निर्मित, <span className="text-brand">हर शहर, कस्बे और गाँव की सेवा में।</span>
          </>
        }
        description="शाजापुर मुख्यालय व इंदौर ऑपरेटिंग बेस से पूरे भारत के सभी Tier-1, Tier-2 और Tier-3 शहरों के लिए कम बजट में हाई-क्वालिटी वेबसाइट, पुरानी साइट का सुधार, Google #1 Local SEO, Instagram/Facebook Ads, Android ऐप और GST ERP।"
      />

      {/* Bilingual Bar + Trust Metrics */}
      <section className="border-t border-white/10 bg-[#070809] px-4 py-10 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#ff9f1c]/25 bg-[#ff9f1c]/[0.06] px-5 py-4">
            <div className="flex items-center gap-3 text-sm text-zinc-200">
              <Languages className="size-5 shrink-0 text-[#ffb84d]" />
              <span>
                <strong className="text-white">Prefer English?</strong> All 38+ Tier-1, Tier-2 &amp; Tier-3 city hubs are also available in English.
              </span>
            </div>
            <Link
              href="/locations"
              hrefLang="en-IN"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-[#ff9f1c]/60 hover:text-[#ffb84d] whitespace-nowrap"
            >
              Switch to English Directory <ArrowUpRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs font-medium text-zinc-400">कुल समर्पित शहर हब</p>
              <p className="mt-1.5 font-display text-2xl font-bold tabular-nums text-white">
                {LOCATION_HUBS.length} शहर × 2 भाषाएं
              </p>
              <p className="mt-1 text-xs text-zinc-400">Tier-1 मेट्रो से Tier-3 व गाँव तक</p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-400">भारत में वेबसाइट स्पीड</p>
              <p className="mt-1.5 font-display text-2xl font-bold tabular-nums text-[#ffb84d]">&lt; 30ms</p>
              <p className="mt-1 text-xs text-zinc-400">Cloudflare मुंबई, दिल्ली और बेंगलुरु एज सर्वर</p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-400">सरकारी पंजीकरण</p>
              <p className="mt-1.5 font-display text-2xl font-bold text-white">MSME व GST</p>
              <p className="mt-1 text-xs tabular-nums text-zinc-400">{BRAND.gstin}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-400">सीधा फाउंडर सपोर्ट</p>
              <p className="mt-1.5 font-display text-2xl font-bold text-white">हिन्दी व English</p>
              <p className="mt-1 text-xs tabular-nums text-zinc-400">WhatsApp {BRAND.phoneDisplay}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Filterable 38-City Hindi Directory */}
      <section className="bg-[#050607] px-4 py-20 md:px-6" aria-labelledby="hi-hubs-heading">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
              अपना शहर चुनें
            </p>
            <h2 id="hi-hubs-heading" className="mt-3 font-display text-3xl font-bold text-white text-balance md:text-4xl">
              हर Tier-1, Tier-2 और Tier-3 शहर के लिए समर्पित हिन्दी व अंग्रेज़ी पेज
            </h2>
            <p data-speakable="summary" className="mt-4 text-base leading-relaxed text-zinc-300">
              नीचे अपने शहर का नाम खोजें या श्रेणी (HQ व MP, Tier-1 मेट्रो, Tier-2 ग्रोथ, Tier-3 क्षेत्रीय) चुनें और अपने स्थानीय बाज़ार के अनुसार कीमत, सेवाएं और सवाल-जवाब देखें।
            </p>
          </div>

          <LocationsDirectoryClient items={directoryItems} lang="hi" />
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-white/10 bg-[#070809] px-4 py-20 md:px-6" aria-labelledby="hi-loc-faq">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">सामान्य प्रश्न</p>
          <h2 id="hi-loc-faq" className="mt-3 font-display text-3xl font-bold text-white">
            पूरे भारत में सेवा से जुड़े सवाल (FAQs)
          </h2>
          <div className="mt-8">
            {HI_LOCATIONS_FAQS.map((faq) => (
              <details key={faq.question} className="group border-b border-white/10 py-5 first:pt-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-medium text-white marker:content-none">
                  <span>{faq.question}</span>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-[#ffb84d] transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-zinc-300">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-white/10 bg-[#050607] px-4 py-20 text-center md:px-6">
        <div className="mx-auto max-w-2xl">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-400">
            <ShieldCheck className="size-4 text-[#ff9f1c]" />
            <span>MSME {BRAND.udyamNumber} · GSTIN {BRAND.gstin}</span>
            <Globe className="ml-2 size-4 text-[#ff9f1c]" />
            <span>भारत व विश्वव्यापी</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold text-white text-balance">
            क्या आपको अपने शहर में वेबसाइट, ऐप, SEO या Ads चाहिए?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">
            30 सेकंड का पॉपअप फॉर्म भरें या सीधे WhatsApp पर मैसेज करें — बिना किसी स्पैम के ईमानदार सलाह और पक्का एस्टीमेट पाएं।
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <QuickContactTrigger lang="hi">तुरंत फ्री कोट पाएं</QuickContactTrigger>
            <a
              href="https://wa.me/919165100124?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%87%20MLHK%20Infotech%2C%20%E0%A4%AE%E0%A5%81%E0%A4%9D%E0%A5%87%20%E0%A4%B5%E0%A5%87%E0%A4%AC%E0%A4%B8%E0%A4%BE%E0%A4%87%E0%A4%9F%20%2F%20%E0%A4%90%E0%A4%AA%20%2F%20SEO%20%E0%A4%AC%E0%A4%A8%E0%A4%B5%E0%A4%BE%E0%A4%A8%E0%A4%BE%20%E0%A4%B9%E0%A5%88"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-[#25D366]/60 hover:text-[#25D366] whitespace-nowrap"
            >
              <Phone className="size-4 text-[#ff9f1c]" />
              WhatsApp {BRAND.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
