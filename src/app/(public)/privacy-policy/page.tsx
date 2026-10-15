import type { Metadata } from "next";
import Link from "next/link";
import { buildSeo } from "@/lib/seo";
import { PolicyPageJsonLd } from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { PageHero } from "@/components/public/PageHero";
import { BRAND } from "@/lib/brand";
import {
  ShieldCheck,
  Lock,
  CreditCard,
  Database,
  EyeOff,
  UserCheck,
  FileCheck,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: "Privacy Policy",
    description:
      "How MLHK Infotech collects, uses, stores, and protects customer personal and project data under the Digital Personal Data Protection Act, 2023 (DPDP Act) and PCI-DSS payment gateway security standards.",
    path: "/privacy-policy",
  });
}

const LAST_UPDATED = "October 2026";

const PRIVACY_PILLARS = [
  {
    icon: Lock,
    title: "Zero Payment Storage",
    desc: "Card, net banking, and UPI credentials are handled exclusively by PCI-DSS compliant RBI-authorized gateways. We never store CVVs or PINs.",
  },
  {
    icon: Database,
    title: "DPDP Act, 2023 Compliant",
    desc: "Strict adherence to India's Digital Personal Data Protection Act, 2023 and DPDP Rules, 2025 for lawful processing and user rights.",
  },
  {
    icon: EyeOff,
    title: "No Data Brokering",
    desc: "We never sell, rent, monetize, or trade client personal or project information to third-party advertisers or external marketing lists.",
  },
  {
    icon: ShieldCheck,
    title: "Edge-Encrypted Systems",
    desc: "All transit communications protected with TLS 1.3 cryptographic encryption and isolated database access controls.",
  },
];

const SECTIONS = [
  {
    id: "identity",
    number: "01",
    heading: "Identity of the Data Fiduciary",
    content: [
      `${BRAND.name} (operating via ${BRAND.url}) is a registered technology enterprise based in ${BRAND.location}, with operational presence in Indore, Madhya Pradesh, India.`,
      `In the context of the Digital Personal Data Protection Act, 2023 ("DPDP Act") and the DPDP Rules, 2025, ${BRAND.name} acts as a "Data Fiduciary" regarding personal data submitted to us through our website, communication channels, client onboarding workflows, and project execution pipelines.`,
      `This Privacy Policy explains how we collect, process, store, disclose, and safeguard your personal and enterprise data, and your rights concerning that data.`,
    ],
  },
  {
    id: "data-collection",
    number: "02",
    heading: "Personal & Project Data We Collect",
    content: [
      `We only collect personal information that is necessary to fulfill your technical inquiries, provide project consultations, deliver custom software, issue tax invoices, and administer your client portal workspace. The categories of data we collect include:`,
      `- Customer Contact & Identity Details: Full name, business email address, phone number (mobile/WhatsApp), designation, organization name, and billing address provided when submitting inquiries, booking consultations, or registering for client accounts.`,
      `- Project Information & Technical Assets: Business requirements, functional specifications, system architectures, API access keys, credentials, or third-party tokens provided by you to enable custom software integration, testing, and deployment.`,
      `- Payment-Related Transactional Data: Invoice numbers, payment transaction reference IDs, transaction dates, currency, amount paid, payment method type (e.g. UPI, Net Banking, Credit/Debit Card), and fulfillment status.`,
      `- Automated Technical & Security Signals: Internet Protocol (IP) addresses, browser type, device telemetry, and security access logs collected automatically by our edge security infrastructure (Cloudflare) to defend against DDoS attacks, automated bots, and unauthorized penetration attempts.`,
    ],
  },
  {
    id: "payment-security",
    number: "03",
    heading: "Payment Processing & Gateway Provider Security (Critical Clause)",
    highlight: true,
    content: [
      `All online financial transactions, including Credit Card, Debit Card, Net Banking, Unified Payments Interface (UPI), and Wallet payments, are routed through authorized, Reserve Bank of India (RBI) regulated, and PCI-DSS (Payment Card Industry Data Security Standard) Level 1 certified third-party Payment Aggregators and Payment Gateway providers (such as Razorpay, Cashfree, or Stripe).`,
      `EXPLICIT DISCLAIMER REGARDING SENSITIVE PAYMENT INSTRUMENTS: ${BRAND.name} does NOT capture, collect, process, store, or view your sensitive payment credentials (such as 16-digit credit/debit card numbers, CVV/CVC verification codes, card expiration dates, net banking passwords, or UPI MPINs) on our servers or databases.`,
      `When you remit payment for an invoice or project milestone, your payment credentials are transmitted directly and securely from your browser or UPI client to the encrypted gateway provider via bank-grade TLS 1.3 cryptographic protocols. ${BRAND.name} receives only an anonymized transaction confirmation, timestamp, and gateway reference ID from the payment provider to mark your invoice as paid.`,
    ],
  },
  {
    id: "purpose-processing",
    number: "04",
    heading: "Purposes & Lawful Grounds for Processing",
    content: [
      `We collect and process your personal information strictly for legitimate commercial and legal purposes, including:`,
      `- Scoping, developing, delivering, testing, and maintaining contracted web applications, mobile apps, enterprise software, and AI automation systems.`,
      `- Communicating milestone progress, delivery schedules, technical updates, and responding to support tickets.`,
      `- Generating GST-compliant tax invoices, payment receipts, accounting ledgers, and financial records as mandated by Indian taxation statutes.`,
      `- Authenticating authorized client users into the secure MLHK Client Workspace Portal (/portal/*).`,
      `- Complying with statutory directives, judicial orders, and legal obligations under Indian law.`,
      `We process your data primarily on the basis of contractual necessity (to perform our obligations under an agreed proposal) or your explicit consent. We never sell, lease, or monetize your personal information to third parties.`,
    ],
  },
  {
    id: "storage-security",
    number: "05",
    heading: "Data Storage, Encryption & Security Architecture",
    content: [
      `We implement defense-in-depth security measures to protect personal and project data from unauthorized access, alteration, disclosure, or accidental destruction:`,
      `- Edge Infrastructure: Hosted on global, SOC 2 compliant Cloudflare edge infrastructure featuring TLS 1.3 end-to-end transport encryption, Web Application Firewalls (WAF), and automated DDoS mitigation.`,
      `- Access Controls & Least Privilege: Access to client data, database environments, and server configurations is restricted to authorized engineers on a strict need-to-know basis, protected with multi-factor authentication (MFA) and encrypted session tokens.`,
      `- Data Sanitization: All user-submitted inputs are sanitized and parameterized before database operations to prevent SQL injection, cross-site scripting (XSS), and data leakage.`,
      `- Breach Notification Protocol: In the unlikely event of a verified personal data breach, ${BRAND.name} will notify the Data Protection Board of India and affected individuals in accordance with the timelines and mechanisms mandated under the DPDP Rules, 2025.`,
    ],
  },
  {
    id: "retention-erasure",
    number: "06",
    heading: "Data Retention & Disposal",
    content: [
      `We retain personal data only for as long as necessary to accomplish the specific business purposes for which it was collected, or to satisfy legal, tax, accounting, or regulatory requirements:`,
      `- Active Project Records: Retained throughout the duration of the active software development and warranty cycle.`,
      `- Financial & Tax Records: Tax invoices, payment vouchers, and transaction records are retained for a minimum statutory period of eight (8) years to comply with the Goods and Services Tax (GST) Act and Income Tax Act, 1961.`,
      `- Pre-Contractual Inquiries: Contact inquiries that do not materialize into active engagements are periodically reviewed and securely purged within twelve (12) months.`,
      `- Source Code & Repositories: Stored on private, encrypted repositories and transferred to client custody upon final settlement.`,
    ],
  },
  {
    id: "cookies-analytics",
    number: "07",
    heading: "Cookies & Analytics Transparency",
    content: [
      `Our public website employs a privacy-first architecture:`,
      `- No Advertising Trackers: We do not deploy third-party advertising cookies, retargeting pixels, or intrusive tracking scripts.`,
      `- Essential Authentication Cookies: When accessing the MLHK Client Portal (/portal/*) or Administrative Console (/admin/*), secure HTTP-only cookies are utilized strictly to maintain your authenticated session.`,
      `- Privacy-Centric Analytics: We may utilize cookie-free, privacy-preserving performance metrics (such as Cloudflare Web Analytics) that process aggregated site telemetry without tracking individual browsing histories across the web.`,
    ],
  },
  {
    id: "user-rights",
    number: "08",
    heading: "Your Rights as a Data Principal (DPDP Act, 2023)",
    content: [
      `Under the Digital Personal Data Protection Act, 2023 and DPDP Rules, 2025, you are entitled to exercise the following rights regarding your personal data processed by us:`,
      `- Right to Access: You may request a summary of the personal data being processed by us and the processing activities undertaken.`,
      `- Right to Correction & Erasure: You may request the correction of inaccurate data, completion of incomplete data, or erasure of personal data that is no longer necessary for the purpose it was gathered.`,
      `- Right of Grievance Redressal: You have the right to register grievances with our appointed Data Grievance Officer regarding any perceived non-compliance.`,
      `- Right to Nominate: You may nominate an authorized individual to exercise your privacy rights in the event of death or incapacity.`,
      `To exercise any of these rights, please submit a written request to our Grievance Officer at ${BRAND.email}. We will acknowledge your request within 48 hours and provide a substantive response within statutory timelines.`,
    ],
  },
  {
    id: "grievance-contact",
    number: "09",
    heading: "Grievance Officer & Official Privacy Contact",
    content: [
      `In compliance with Section 10 of the DPDP Act, 2023, ${BRAND.name} has appointed a designated Data Grievance Officer to address questions, concerns, and legal notices regarding data protection:`,
      `- Officer Name: Hariom Vishwkarma`,
      `- Designation: Founder & Data Grievance Officer, ${BRAND.name}`,
      `- Registered Address: Barnawad, Moman Barodia, Shajapur, Madhya Pradesh 465236, India`,
      `- Operating Hub: Indore, Madhya Pradesh, India`,
      `- Direct Email: ${BRAND.email} (CC: ${BRAND.supportEmail})`,
      `- Phone: ${BRAND.phoneDisplay}`,
      `If you are not satisfied with the resolution provided by our Grievance Officer, you retain the legal right to file a complaint before the Data Protection Board of India.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PolicyPageJsonLd
        name="Privacy Policy"
        description="Comprehensive privacy policy detailing how client personal information, contact records, project information, and payment gateway transaction references are collected, processed, and safeguarded by MLHK Infotech."
        path="/privacy-policy"
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy", href: "/privacy-policy" },
        ]}
      />

      <PageHero
        eyebrow="Data Governance & Protection"
        title={
          <>
            Privacy <span className="text-brand">Policy.</span>
          </>
        }
        description={`Our commitment to protecting your personal information, project assets, and transaction security under the DPDP Act, 2023 and PCI-DSS payment gateway guidelines. Last updated: ${LAST_UPDATED}.`}
      />

      {/* Privacy Pillars Grid */}
      <section className="bg-[#050607] px-4 pt-2 pb-10 md:px-6">
        <div className="mx-auto max-w-5xl grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRIVACY_PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md transition-colors hover:border-[#ff9f1c]/30 hover:bg-white/[0.04]"
              >
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#ff9f1c]/10 text-[#ffb84d]">
                  <Icon className="size-4" strokeWidth={1.75} />
                </div>
                <h3 className="mt-3 font-display text-sm font-bold text-white">{p.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="bg-[#050607] px-4 pb-24 md:px-6">
        <div className="mx-auto max-w-4xl space-y-6">
          {SECTIONS.map((s) => {
            const isHighlight = s.highlight;
            return (
              <article
                key={s.id}
                id={s.id}
                className={`rounded-3xl border p-6 sm:p-8 backdrop-blur-md transition-all duration-300 ${
                  isHighlight
                    ? "border-[#ff9f1c]/40 bg-gradient-to-b from-[#ff9f1c]/[0.08] to-white/[0.02] shadow-[0_8px_32px_-8px_rgba(255,159,28,0.2)]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.03]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold text-[#ffb84d] tracking-widest">
                    {s.number}
                  </span>
                  <span className="h-px flex-1 bg-white/10" />
                  {isHighlight && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#ffb84d]">
                      <CreditCard className="size-3" />
                      Payment Security
                    </span>
                  )}
                </div>

                <h2 className="mt-3 font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {s.heading}
                </h2>

                <div className="mt-4 space-y-3.5">
                  {s.content.map((p, idx) => (
                    <p
                      key={idx}
                      className={`text-sm leading-relaxed ${
                        isHighlight && idx === 1
                          ? "font-semibold text-zinc-100"
                          : "text-zinc-300"
                      }`}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </article>
            );
          })}

          {/* Grievance Desk Card */}
          <div className="rounded-3xl border border-[#ff9f1c]/30 bg-gradient-to-b from-[#ff9f1c]/[0.08] to-white/[0.01] p-6 sm:p-10 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">
                  Statutory Privacy Desk
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-white">
                  Exercise Your DPDP Data Rights
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-300">
                  To request a summary of your personal data, update contact records, or raise a privacy grievance, contact our designated Data Grievance Officer.
                </p>
              </div>

              <div className="flex shrink-0 flex-col gap-2.5">
                <a
                  href={`mailto:${BRAND.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff9f1c] px-5 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-[#ffb84d]"
                >
                  <Mail className="size-3.5" />
                  <span>Contact Grievance Officer</span>
                </a>
                <Link
                  href="/terms-and-conditions"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2.5 text-xs font-semibold text-zinc-200 transition-colors hover:border-white/25 hover:text-white"
                >
                  <span>Terms & Conditions</span>
                  <ArrowRight className="size-3 text-[#ff9f1c]" />
                </Link>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-white/10 pt-6 sm:grid-cols-3 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-[#ff9f1c] shrink-0" />
                <span>{BRAND.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-4 text-[#ff9f1c] shrink-0" />
                <span>{BRAND.phoneDisplay}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-[#ff9f1c] shrink-0" />
                <span className="truncate">{BRAND.city}, Madhya Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-zinc-500">
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/terms-and-conditions" className="hover:text-[#ffb84d] transition-colors">
                Terms & Conditions
              </Link>
              <span>•</span>
              <Link href="/cancellation-refund-policy" className="hover:text-[#ffb84d] transition-colors">
                Cancellation & Refund Policy
              </Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-[#ffb84d] transition-colors">
                Contact Desk
              </Link>
            </div>
            <Link href="/" className="inline-flex items-center gap-1.5 font-medium text-[#ffb84d] hover:text-white transition-colors">
              <span>← Back to Homepage</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
