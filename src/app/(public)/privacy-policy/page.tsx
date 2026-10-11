import type { Metadata } from "next";
import Link from "next/link";
import { buildSeo } from "@/lib/seo";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { PageHero } from "@/components/public/PageHero";
import { BRAND } from "@/lib/brand";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: "Privacy Policy",
    description:
      "How MLHK Infotech collects, uses, stores and protects personal data under the Digital Personal Data Protection Act, 2023 and the DPDP Rules, 2025.",
    path: "/privacy-policy",
  });
}

const LAST_UPDATED = "October 2026";

const sections: { heading: string; body: string[] }[] = [
  {
    heading: "1. Who we are",
    body: [
      `${BRAND.name} (${BRAND.url}) is a technology company based in ${BRAND.location}. We act as a Data Fiduciary under the Digital Personal Data Protection Act, 2023 ("DPDP Act") for personal data we collect through this website and our contact channels.`,
    ],
  },
  {
    heading: "2. Personal data we collect",
    body: [
      "Information you give us: name, email address, phone number, company name and the content of your project enquiry, when you use the contact form or write to us.",
      "Project and account information: details needed to scope, deliver and support a project, and client portal details where you have an account.",
      "Technical information: basic device and usage information needed to keep the website secure and working. We use privacy-friendly analytics that do not set tracking cookies (see section 7).",
    ],
  },
  {
    heading: "3. Purpose and lawful basis",
    body: [
      "We process personal data only for the purposes you agreed to: responding to your enquiry, preparing a proposal, delivering and supporting a contracted project, issuing invoices, and meeting legal obligations.",
      "Where we rely on your consent, we ask for it in a clear notice that states the specific purpose. Where the DPDP Act allows processing for a legitimate use or a legal obligation without consent, we rely on that instead and tell you so.",
      "We do not sell personal data.",
    ],
  },
  {
    heading: "4. Notice and consent",
    body: [
      "Under the DPDP Rules, 2025, notices must be clear, specific to each purpose, and available in English or any language listed in the Eighth Schedule of the Constitution on request.",
      "You can withdraw consent at any time by writing to the contact address in section 10. Withdrawing consent does not affect processing already completed before the withdrawal.",
    ],
  },
  {
    heading: "5. Storage, security and sharing",
    body: [
      "We store data on Cloudflare infrastructure (databases and object storage) and send transactional email through Resend. Both are processors acting on our instructions.",
      "We apply access controls so only authorised staff can view personal data, and we sanitise submitted input before storing it.",
      "We will notify the Data Protection Board of India and affected individuals of a personal data breach as required by the DPDP Rules, 2025, including the intimation timelines in those rules.",
      "Where we transfer personal data outside India, we do so only as permitted by the DPDP Act and the rules made under it.",
    ],
  },
  {
    heading: "6. Retention and erasure",
    body: [
      "We keep personal data only as long as the purpose requires, or as a law requires. Enquiry records are reviewed periodically and erased when no longer needed.",
      "Where a law requires us to keep records, such as financial or contract records, we keep them for the period that law specifies.",
    ],
  },
  {
    heading: "7. Cookies and analytics",
    body: [
      "Our public website uses Cloudflare Web Analytics, which does not set tracking cookies. If you use the client portal, a session cookie keeps you signed in. You can block cookies in your browser; public pages will still work.",
    ],
  },
  {
    heading: "8. Your rights",
    body: [
      "Under the DPDP Act, 2023 you may ask us for: access to your personal data; correction or updating of inaccurate data; erasure of data that is no longer needed; and withdrawal of consent.",
      "You may also nominate another person to exercise these rights on your behalf.",
      "We respond to requests about your rights within 90 days, as required by the DPDP Rules, 2025, and usually much sooner.",
    ],
  },
  {
    heading: "9. Children",
    body: [
      "Our services are for businesses and adults. Where we ever process personal data of a child, we will obtain verifiable consent from a parent or guardian as required by the DPDP Act and the rules.",
      "If you believe a child's data was given to us, contact us and we will delete it.",
    ],
  },
  {
    heading: "10. Grievance officer and contact",
    body: [
      `Grievance Officer, ${BRAND.name}, ${BRAND.location}.`,
      `Email: ${BRAND.email}. Phone: ${BRAND.phoneDisplay}.`,
      "We acknowledge privacy grievances and respond within 90 days, as required by the DPDP Rules, 2025.",
      "If you are not satisfied with our response, you may complain to the Data Protection Board of India.",
    ],
  },
  {
    heading: "11. Changes to this policy",
    body: [
      "We update this policy when our practices or the law change. The date at the top shows the latest revision. Material changes will be announced on this website.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <PageHero
        eyebrow="Legal"
        title={<>Privacy <span className="text-brand">policy.</span></>}
        description={`How we handle personal data under the Digital Personal Data Protection Act, 2023 and the DPDP Rules, 2025. Last updated: ${LAST_UPDATED}.`}
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
            Questions about this policy:{" "}
            <a href={`mailto:${BRAND.email}`} className="text-[#ffb84d] hover:text-white">{BRAND.email}</a>
          </p>
          <Link href="/" className="mt-4 inline-block text-sm font-semibold text-[#ffb84d] hover:text-white">← Back to home</Link>
        </div>
      </div>
    </>
  );
}
