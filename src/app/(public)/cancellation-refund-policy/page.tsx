import type { Metadata } from "next";
import Link from "next/link";
import { buildSeo } from "@/lib/seo";
import { PolicyPageJsonLd } from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { PageHero } from "@/components/public/PageHero";
import { BRAND } from "@/lib/brand";
import {
  RotateCcw,
  Clock,
  ShieldCheck,
  CreditCard,
  FileCheck,
  AlertTriangle,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: "Cancellation & Refund Policy",
    description:
      "Official cancellation rules, advance payment terms, work-in-progress prorated billing, eligible refund criteria, and 5-7 business day processing timelines for MLHK Infotech services.",
    path: "/cancellation-refund-policy",
  });
}

const LAST_UPDATED = "October 2026";

const POLICY_HIGHLIGHTS = [
  {
    icon: RotateCcw,
    title: "Cancellation Rights",
    desc: "Clear contractual rules for cancelling projects prior to kickoff or during active development.",
  },
  {
    icon: Clock,
    title: "5–7 Business Days",
    desc: "Approved refunds are credited back directly to the original payment source (Card, UPI, or Bank Account).",
  },
  {
    icon: ShieldCheck,
    title: "Prorated Fairness",
    desc: "Work-in-progress is billed strictly for verified milestones and hours completed, with unutilized advance refunded.",
  },
  {
    icon: FileCheck,
    title: "Transparent Review",
    desc: "Written audit of refund requests within 2 to 3 business days by our executive billing department.",
  },
];

const SECTIONS = [
  {
    id: "scope",
    number: "01",
    heading: "Scope & Purpose of this Policy",
    content: [
      `This Cancellation & Refund Policy ("Policy") governs all bespoke software engineering, web application development, mobile app development (Android/iOS), CRM/ERP implementations, AI automation, graphic branding, and digital consulting services provided by ${BRAND.name} ("Company", "We", "Us", or "Our") via ${BRAND.url} and formal service agreements.`,
      `We maintain an open, transparent, and fair operational model. Because bespoke software development involves significant upfront engineering capacity, sprint allocation, and proprietary design architecture, this policy outlines the precise terms under which projects may be cancelled and how eligible refunds are calculated and disbursed.`,
    ],
  },
  {
    id: "project-cancellation",
    number: "02",
    heading: "Project Cancellation Procedures",
    content: [
      `- Cancellation Prior to Project Kickoff: If the Client submits a written cancellation request before sprint kickoff, technical architecture planning, or engineering resource allocation has commenced, the engagement will be terminated with minimum administrative reconciliation.`,
      `- Cancellation After Work Commences (Work-In-Progress): If a project is cancelled by the Client after active development, wireframing, or design has begun, billing is calculated on a prorated basis. The Client shall only be liable for: (a) actual engineering hours logged at the agreed hourly or daily rate; (b) completed milestones up to the written notice date; and (c) any non-cancellable third-party software, cloud server provisioning, or API licenses procured on the Client's behalf.`,
      `- Cancellation by ${BRAND.name}: We reserve the right to suspend or terminate an engagement if the Client materially breaches contract terms, fails to settle invoices past 15 days of the due date, or fails to provide required project assets or approvals for over 30 consecutive calendar days. In such cases, unutilized prepaid balances (if any) will be refunded after settling outstanding dues.`,
    ],
  },
  {
    id: "advance-payments",
    number: "03",
    heading: "Advance Payments & Discovery Retainers",
    content: [
      `Initial project advance deposits (typically 30% to 50% of the contract value, as defined in the SOW) serve to reserve dedicated technical staff, establish cloud staging environments, and author comprehensive architecture specifications.`,
      `In the event of an early cancellation before the advance deposit has been exhausted by logged engineering hours, the remaining unutilized cash balance will be refunded to the Client.`,
      `Conversely, if the verified work completed exceeds the advance deposit at the time of cancellation, the Client agrees to settle the remaining prorated balance within ten (10) calendar days of receiving the final reconciled statement.`,
    ],
  },
  {
    id: "completed-services",
    number: "04",
    heading: "Completed Services & Non-Refundable Deliverables",
    content: [
      `Due to the bespoke, intellectual nature of custom software engineering, certain deliverables and services are strictly non-refundable:`,
      `- Completed & Approved Milestones: Once a milestone deliverable (such as an approved UI/UX design prototype, backend database architecture, or functional feature sprint) has been reviewed, demonstrated, and accepted by the Client, the payment associated with that milestone is non-refundable.`,
      `- Delivered Source Code & Live Deployments: Once custom source code has been delivered, repositories transferred, or an application deployed to the Client's production hosting environment, fees for those components are non-refundable.`,
      `- Third-Party Infrastructure & Pass-Through Costs: Direct third-party fees paid on the Client's behalf (such as domain registrations, third-party server hosting, paid SMS/Email gateway credits, SSL certificates, or specialized API access subscriptions) are non-refundable under any circumstance.`,
      `- Completed Support & Maintenance Cycles: Monthly support, server monitoring, or retainer subscriptions for billing cycles that have already been fulfilled are non-refundable. Support subscriptions may be cancelled for upcoming cycles with 15 days prior written notice.`,
    ],
  },
  {
    id: "eligible-refunds",
    number: "05",
    heading: "Eligible Refund Scenarios",
    content: [
      `Refunds are strictly reviewed and disbursed under the following verified circumstances:`,
      `- Duplicate or Erroneous Transactions: Where a technical failure or gateway glitch causes a duplicate charge for the same invoice, the excess transaction amount will be refunded in full immediately upon verification.`,
      `- Inability to Kick Off Project: In the rare event that ${BRAND.name} is unable to initiate the contracted project within the agreed kickoff timeframe due to internal operational constraints, 100% of the advance fee paid for uncommenced work will be refunded promptly.`,
      `- Unutilized Prepaid Balances: Following a mutually agreed contract termination, any prepaid funds exceeding the total value of completed, documented deliverables will be refunded.`,
    ],
  },
  {
    id: "processing-timelines",
    number: "06",
    heading: "Refund Processing Timelines (5 to 7 Business Days)",
    highlight: true,
    content: [
      `All refund claims are handled in a structured, time-bound manner to guarantee accountability and compliance with payment aggregator standards:`,
      `- Acknowledgment & Review (2–3 Business Days): Upon receipt of a formal refund request via email, our billing department will review project timesheets, deliverable logs, and transaction receipts within two to three (2 to 3) business days, providing the Client with a formal reconciliation statement.`,
      `- Disbursement to Original Payment Source (5–7 Business Days): Once a refund amount is approved and confirmed in writing, the funds are electronically disbursed through our payment gateway (Razorpay, Cashfree, or Stripe) back to the ORIGINAL PAYMENT METHOD (Original Credit Card, Debit Card, UPI ID, or Bank Account) within five to seven (5 to 7) business working days.`,
      `- Bank Reflection: Depending on the Client's issuing bank, card network (Visa, Mastercard, RuPay), or UPI clearing cycles, funds may take an additional 24 to 48 hours to reflect on the Client's official account statement.`,
    ],
  },
  {
    id: "request-procedure",
    number: "07",
    heading: "How to Submit a Cancellation or Refund Request",
    content: [
      `To request a project cancellation or claim an eligible refund, the Client must submit a formal written application via email with the subject line "Cancellation / Refund Request - [Invoice Number or Project Name]" to our executive billing desk:`,
      `- Primary Billing Email: ${BRAND.email}`,
      `- Client Helpdesk Email: ${BRAND.supportEmail}`,
      `- Telephone / WhatsApp Support: ${BRAND.phoneDisplay}`,
      `To expedite the review process, your email must include:`,
      `1. Client Full Name, Company Name, and Registered Email.`,
      `2. Invoice Number, Project Title, and Statement of Work Reference.`,
      `3. Payment Transaction Reference ID (from the payment gateway receipt).`,
      `4. Date of Payment and Exact Amount Remitted.`,
      `5. Specific rationale or justification for the cancellation or refund claim.`,
      `Our billing desk will generate an official inquiry ticket and contact you within 24 to 48 business hours with next steps.`,
    ],
  },
];

export default function CancellationRefundPolicyPage() {
  return (
    <>
      <PolicyPageJsonLd
        name="Cancellation and Refund Policy"
        description="Comprehensive policy governing project cancellations, milestone payments, work in progress, completed service deliverables, and refund processing timelines at MLHK Infotech."
        path="/cancellation-refund-policy"
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Cancellation & Refund Policy", href: "/cancellation-refund-policy" },
        ]}
      />

      <PageHero
        eyebrow="Commercial Transparency"
        title={
          <>
            Cancellation & <span className="text-brand">Refund Policy.</span>
          </>
        }
        description={`Clear, fair guidelines governing project cancellation, advance payments, work-in-progress reconciliation, and our 5-7 business day refund timeline at ${BRAND.name}. Last updated: ${LAST_UPDATED}.`}
      />

      {/* Highlights Grid */}
      <section className="bg-[#050607] px-4 pt-2 pb-10 md:px-6">
        <div className="mx-auto max-w-5xl grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {POLICY_HIGHLIGHTS.map((h) => {
            const Icon = h.icon;
            return (
              <div
                key={h.title}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md transition-colors hover:border-[#ff9f1c]/30 hover:bg-white/[0.04]"
              >
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#ff9f1c]/10 text-[#ffb84d]">
                  <Icon className="size-4" strokeWidth={1.75} />
                </div>
                <h3 className="mt-3 font-display text-sm font-bold text-white">{h.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400">{h.desc}</p>
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
                      <Clock className="size-3" />
                      Strict Timeline Guarantee
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

          {/* Refund Support Desk Card */}
          <div className="rounded-3xl border border-[#ff9f1c]/30 bg-gradient-to-b from-[#ff9f1c]/[0.08] to-white/[0.01] p-6 sm:p-10 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">
                  Official Billing Desk
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-white">
                  Need Help with an Invoice or Cancellation?
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-300">
                  Our billing team assists clients with prompt transaction verifications, invoice clarifications, and refund reconciliations.
                </p>
              </div>

              <div className="flex shrink-0 flex-col gap-2.5">
                <a
                  href={`mailto:${BRAND.email}?subject=Refund%20or%20Cancellation%20Inquiry`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff9f1c] px-5 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-[#ffb84d]"
                >
                  <Mail className="size-3.5" />
                  <span>Email Billing Desk</span>
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
              <Link href="/privacy-policy" className="hover:text-[#ffb84d] transition-colors">
                Privacy Policy
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

