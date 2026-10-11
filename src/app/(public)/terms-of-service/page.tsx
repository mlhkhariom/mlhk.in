import type { Metadata } from "next";
import Link from "next/link";
import { buildSeo } from "@/lib/seo";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { PageHero } from "@/components/public/PageHero";
import { BRAND, SERVICE_LINES } from "@/lib/brand";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: "Terms of Service",
    description: "Terms governing use of the MLHK Infotech website and services, under the laws of India.",
    path: "/terms-of-service",
  });
}

const LAST_UPDATED = "October 2026";

const sections: { heading: string; body: string[] }[] = [
  {
    heading: "1. Acceptance",
    body: [
      `By using ${BRAND.url} or engaging ${BRAND.name} for services, you agree to these terms. If you do not agree, please do not use the website or our services.`,
    ],
  },
  {
    heading: "2. Services",
    body: [
      `${BRAND.name} provides ${SERVICE_LINES.map((s) => s.title.toLowerCase()).join(", ")}, along with enterprise systems and AI automation.`,
      "The scope, deliverables, timelines and fees for each engagement are set out in a separate written proposal or agreement. Where that agreement conflicts with these terms, the agreement prevails for that engagement.",
    ],
  },
  {
    heading: "3. Website content and intellectual property",
    body: [
      `The text, design, logos and other content on this website belong to ${BRAND.name} unless stated otherwise. You may read and share pages for personal or business reference, but not copy or reuse the content commercially without written permission.`,
      "Ownership of custom work for a client is governed by the project agreement. Unless the agreement says otherwise, ownership passes on full payment.",
    ],
  },
  {
    heading: "4. Acceptable use",
    body: [
      "You agree to give accurate information when you contact us, not to attempt unauthorised access to our systems, and not to upload or send malicious content.",
      "We may restrict access to anyone who breaches these obligations.",
    ],
  },
  {
    heading: "5. Third-party links and services",
    body: [
      "This website links to third-party sites, including social platforms and client websites. We are not responsible for their content or practices.",
    ],
  },
  {
    heading: "6. Fees and payment",
    body: [
      "Fees, payment milestones, taxes and late-payment terms are stated in each project agreement or invoice. Nothing on this website is an offer or a price quotation.",
    ],
  },
  {
    heading: "7. Limitation of liability",
    body: [
      "To the extent permitted by law, we are not liable for indirect or consequential loss arising from use of this website. Our liability for any engagement is limited as set out in the relevant agreement.",
    ],
  },
  {
    heading: "8. Personal data",
    body: [
      "We process personal data as described in our Privacy Policy, which follows the Digital Personal Data Protection Act, 2023 and the DPDP Rules, 2025.",
    ],
  },
  {
    heading: "9. Disputes and governing law",
    body: [
      "These terms are governed by the laws of India. Parties should first try to resolve any dispute by good-faith discussion.",
      `Courts at ${BRAND.city}, Madhya Pradesh have jurisdiction over disputes not resolved this way, unless a project agreement sets a different forum.`,
    ],
  },
  {
    heading: "10. Changes",
    body: [
      "We may update these terms. The date at the top shows the latest revision. Continued use after an update means you accept the revised terms.",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]} />
      <PageHero
        eyebrow="Legal"
        title={<>Terms of <span className="text-brand">service.</span></>}
        description={`The terms that apply when you use our website and engage ${BRAND.name}. Last updated: ${LAST_UPDATED}.`}
      />
      <div className="mx-auto max-w-3xl bg-[#050607] px-4 pb-24 md:px-6">
        {sections.map((s) => (
          <section key={s.heading} className="border-t border-white/10 py-8">
            <h2 className="font-display text-lg font-bold text-white">{s.heading}</h2>
            <div className="mt-3 space-y-3">
              {s.body.map((p) => (
                <p key={p} className="text-sm leading-relaxed text-zinc-400">{p}</p>
              ))}
            </div>
          </section>
        ))}
        <div className="mt-6 border-t border-white/10 pt-8">
          <p className="text-sm text-zinc-500">
            Questions:{" "}
            <a href={`mailto:${BRAND.email}`} className="text-[#ffb84d] hover:text-white">{BRAND.email}</a>
          </p>
          <Link href="/" className="mt-4 inline-block text-sm font-semibold text-[#ffb84d] hover:text-white">← Back to home</Link>
        </div>
      </div>
    </>
  );
}
