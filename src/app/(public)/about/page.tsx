import type { Metadata } from "next";
import Link from "next/link";
import { buildSeo } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({ title: "About", description: "A bootstrapped IT firm building enterprise-grade digital systems from Shajapur, MP.", path: "/about" });
}

const timeline = [
  { year: "2020", event: "Founded MLHK Infotech in Barnawad, Shajapur during the pandemic digital boom" },
  { year: "2021", event: "Launched first SaaS products and expanded to mobile app development" },
  { year: "2022", event: "Founded IKSC India (e-commerce) and Red Xerox Studio (creative)" },
  { year: "2023", event: "Launched Erotix Green Energy (solar), RX Media, and TET News" },
  { year: "2024", event: "Expanded into AI automation, CIS benchmark auditing, and cloud consulting" },
  { year: "2025+", event: "Building enterprise-grade digital ecosystems for businesses across India" },
];

export default function AboutPage() {
  return (
    <>
    <JsonLd data={{
      "@type": "AboutPage",
      name: "About MLHK Infotech",
      description: "A bootstrapped IT firm building enterprise-grade digital systems from Shajapur, Madhya Pradesh, India.",
      mainEntity: {
        "@type": "Organization",
        name: "MLHK Infotech",
        foundingDate: "2020-04",
        founder: { "@type": "Person", name: "Hariom Vishwkarma", jobTitle: "Founder & CEO" },
        address: { "@type": "PostalAddress", addressLocality: "Barnawad, Shajapur", addressRegion: "Madhya Pradesh", addressCountry: "IN" },
      },
    }} />
    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About MLHK Infotech</h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          A bootstrapped IT firm building enterprise-grade digital systems from Shajapur, Madhya Pradesh.
        </p>
      </div>

      {/* Founder */}
      <div className="bg-blue-50 rounded-2xl p-8 mb-14 flex flex-col md:flex-row gap-8 items-center">
        <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center text-3xl font-bold text-blue-600 shrink-0">HV</div>
        <div>
          <p className="text-xs text-blue-500 font-semibold uppercase tracking-wide mb-1">Founder & CEO</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Hariom Vishwkarma</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Technology entrepreneur and system architect based in Shajapur, MP. Started MLHK Infotech in April 2020 while studying Computer Applications at Vikram University, Ujjain. Experienced in full-lifecycle product development — UI/UX, automation, SaaS, and scaling. Also founder of IKSC India.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {["Java", "Python (AI)", "SQL", "Node.js", "Android", "IBM Cloud", "System Architecture"].map(s => (
              <span key={s} className="text-xs bg-white border text-gray-600 px-2 py-1 rounded-md">{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed">
          MLHK Infotech focuses on building complete digital ecosystems — not just websites or apps, but end-to-end systems that automate, scale, and grow businesses. We operate with a "Zero Waste" efficiency philosophy, ensuring every solution directly contributes to business outcomes.
        </p>
      </div>

      {/* Timeline */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Journey</h2>
        <div className="relative border-l-2 border-blue-200 pl-8 space-y-8">
          {timeline.map(({ year, event }) => (
            <div key={year} className="relative">
              <div className="absolute -left-[2.6rem] w-5 h-5 rounded-full bg-blue-600 border-4 border-white" />
              <p className="text-blue-600 font-bold text-sm mb-1">{year}</p>
              <p className="text-gray-600 text-sm">{event}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Link href="/contact" className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Work With Us
        </Link>
      </div>

      {/* Internal links */}
      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-4 justify-center">
        <Link href="/services" className="text-sm text-blue-600 hover:underline">Explore Our Services →</Link>
        <Link href="/portfolio" className="text-sm text-blue-600 hover:underline">View Portfolio →</Link>
        <Link href="/blog" className="text-sm text-blue-600 hover:underline">Read Our Blog →</Link>
      </div>
    </div>
    </>
  );
}
