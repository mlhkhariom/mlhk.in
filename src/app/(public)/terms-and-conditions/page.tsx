import type { Metadata } from "next";
import Link from "next/link";
import { buildSeo } from "@/lib/seo";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { PageHero } from "@/components/public/PageHero";
import { BRAND, SERVICE_LINES } from "@/lib/brand";
import {
  FileText,
  CreditCard,
  Clock,
  UserCheck,
  ShieldAlert,
  Scale,
  Sparkles,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: "Terms & Conditions",
    description:
      "Commercial terms, scope of services, pricing, payment milestones, delivery timelines, intellectual property, and dispute resolution governing MLHK Infotech engagements.",
    path: "/terms-and-conditions",
  });
}

const LAST_UPDATED = "October 2026";

const HIGHLIGHTS = [
  {
    icon: FileText,
    title: "Clear Project Scopes",
    desc: "Every engagement is governed by a documented Scope of Work (SOW), deliverables, and milestones.",
  },
  {
    icon: CreditCard,
    title: "Transparent INR Pricing",
    desc: "Structured milestone billing with zero hidden fees. Taxes (GST) transparently charged as per statutory norms.",
  },
  {
    icon: Clock,
    title: "Milestone Timelines",
    desc: "Predetermined sprint delivery schedules paired with timely reviews and structured acceptance periods.",
  },
  {
    icon: Scale,
    title: "100% IP Ownership",
    desc: "Full proprietary source code and bespoke deliverables transfer to the client upon complete final payment.",
  },
];

const SECTIONS = [
  {
    id: "acceptance",
    number: "01",
    heading: "Acceptance & Contractual Relationship",
    content: [
      `These Terms & Conditions ("Terms") constitute a legally binding agreement between you (whether an individual or an enterprise entity, referred to as "Client", "Customer", or "You") and ${BRAND.name} ("Company", "We", "Us", or "Our"), regarding your access to and use of ${BRAND.url} as well as any software engineering, design, or consulting services provided by us.`,
      `By accessing our website, submitting an inquiry, approving a proposal, paying an advance deposit, or commissioning a project, you acknowledge that you have read, understood, and agreed to be bound by these Terms, in conjunction with our Privacy Policy and Cancellation & Refund Policy. These terms comply with the Information Technology Act, 2000, and the Indian Contract Act, 1872.`,
    ],
  },
  {
    id: "services-scope",
    number: "02",
    heading: "Scope of Services & Custom Engagements",
    content: [
      `${BRAND.name} is an enterprise IT and digital solutions provider offering specialized services including: ${SERVICE_LINES.map((s) => s.title).join(", ")}, Enterprise Systems (CRM, ERP, HRMS), and AI & Workflow Automation.`,
      `Each custom software, mobile app, or design engagement is governed by an individual written Proposal, Statement of Work (SOW), or Service Contract that details the explicit features, deliverables, technology stack, schedules, and fee structures.`,
      `Any requests for features, technical additions, or revisions not explicitly outlined in the agreed SOW shall be deemed as "Out of Scope" and will require a formal Change Request (CR) with mutually agreed revisions to the pricing and delivery timeline.`,
    ],
  },
  {
    id: "pricing-taxes",
    number: "03",
    heading: "Pricing, Currency & Quotations",
    content: [
      `All pricing quotations issued by ${BRAND.name} are provided in Indian Rupees (INR - ₹) for domestic clients, or designated convertible currencies (such as USD or EUR) for international accounts, as specified on the formal invoice or proposal.`,
      `Written quotations remain valid for a period of 30 calendar days from the date of issuance, after which ${BRAND.name} reserves the right to amend pricing based on resource availability or revised project parameters.`,
      `Unless expressly stated otherwise in writing, all quoted fees are exclusive of statutory taxes. Applicable Goods and Services Tax (GST @ 18%) or relevant indirect taxes will be levied on all taxable supplies in accordance with Government of India regulations.`,
    ],
  },
  {
    id: "payment-terms",
    number: "04",
    heading: "Payment Terms, Invoicing & Milestones",
    content: [
      `Unless an alternative schedule is executed in a custom SOW, projects are billed on a structured milestone basis:`,
      `- Project Kickoff / Advance Deposit: An initial booking deposit (typically 30% to 50% of the total contract value) is required prior to sprint commencement, architecture design, and developer capacity reservation.`,
      `- Milestone Interim Payments: Tied to the delivery and demonstration of agreed functional modules (e.g. wireframe sign-off, alpha release, beta staging deployment).`,
      `- Final Balance Payment: Due upon completion of User Acceptance Testing (UAT) and prior to live production deployment, domain transfer, or source code repository handover.`,
      `Invoices issued by ${BRAND.name} are payable within 7 to 15 calendar days of receipt. Payments may be remitted via authorized online payment gateways (Credit/Debit Card, Net Banking, UPI), or direct Bank NEFT/RTGS transfers.`,
      `Failure to settle invoices within the stipulated window may result in a formal notice, a late surcharge of 1.5% per month on the overdue balance, and the temporary pausing of development, staging access, or server support until the account is brought into good standing.`,
    ],
  },
  {
    id: "delivery-timelines",
    number: "05",
    heading: "Delivery Timelines & Milestone Handover",
    content: [
      `${BRAND.name} uses agile sprint delivery to ship projects within estimated calendar schedules outlined in the SOW. Target delivery dates represent good-faith operational estimates.`,
      `Project timelines are directly dependent upon timely client cooperation. Delivery dates shall be automatically extended in the event of: (a) delays in receiving required client assets, content, technical credentials, or third-party API keys; (b) delays in milestone reviews and sign-offs; or (c) scope modifications requested during development.`,
      `${BRAND.name} shall not be held liable for delivery delays stemming from third-party vendor downtime, Cloud host outages, payment gateway verification delays, or force majeure events.`,
    ],
  },
  {
    id: "customer-responsibilities",
    number: "06",
    heading: "Customer Responsibilities & Obligations",
    content: [
      `To ensure timely and successful project execution, the Client agrees to:`,
      `- Provide clear, accurate business requirements, high-resolution media, textual content, branding guidelines, and necessary third-party integrations promptly.`,
      `- Designate a primary single point of contact authorized to make project decisions, grant technical approvals, and sign off on milestone completions.`,
      `- Test and review submitted milestone deliverables within 5 to 7 business days of deployment on the staging environment. If no revisions or objections are submitted within 10 business days, the milestone deliverable shall be deemed accepted.`,
      `- Warrant that all materials, designs, data, and trademarks provided to ${BRAND.name} are owned by the Client or licensed with full authority, and do not infringe on any third party's legal rights.`,
    ],
  },
  {
    id: "intellectual-property",
    number: "07",
    heading: "Intellectual Property Rights & Source Code Ownership",
    content: [
      `- Custom Work Product: Upon receipt of 100% full and final payment of all invoices associated with the project, all bespoke proprietary rights, copyright, and source code authored specifically for the Client shall be assigned to the Client.`,
      `- Background Technology & Open Source: ${BRAND.name} retains ownership of all pre-existing proprietary tools, design systems, algorithms, frameworks, and reusable code modules developed prior to or independently of the engagement. The Client is granted an irrevocable, perpetual, worldwide, non-exclusive license to use such background code solely as an integrated part of the delivered system.`,
      `- Client Materials: All confidential data, trademarks, trade secrets, and content provided by the Client remain the exclusive intellectual property of the Client.`,
      `- Portfolio Attribution: Unless explicitly prohibited under a signed Non-Disclosure Agreement (NDA), ${BRAND.name} reserves the right to display project screenshots, brief descriptions, and the Client's brand mark in our public portfolio and case studies as an example of work shipped.`,
    ],
  },
  {
    id: "warranty-acceptance",
    number: "08",
    heading: "User Acceptance Testing & Warranty",
    content: [
      `Following deployment of the completed deliverable to a staging or production environment, the Client shall have a 14-calendar-day User Acceptance Testing (UAT) window to verify that the software functions in conformity with the approved specifications.`,
      `${BRAND.name} will promptly remediate, free of charge, any verifiable bug, functional error, or discrepancy from the SOW reported during this 14-day warranty window.`,
      `This warranty does not cover issues resulting from: (a) unauthorized modifications to the source code by the Client or third parties; (b) incompatibilities introduced by external third-party API changes; (c) server or hosting failures outside our control; or (d) feature additions requested after project sign-off. Ongoing maintenance beyond the warranty window is governed by a separate Support & Maintenance plan.`,
    ],
  },
  {
    id: "limitation-liability",
    number: "09",
    heading: "Limitation of Liability",
    content: [
      `To the maximum extent permitted by applicable Indian law, neither ${BRAND.name}, its founder, employees, nor contractors shall be liable to the Client or any third party for any indirect, incidental, punitive, special, or consequential damages (including loss of business profits, revenue, data, goodwill, or operational interruptions), even if advised of the possibility of such damages.`,
      `In all circumstances, the total aggregate liability of ${BRAND.name} arising out of or related to any engagement, whether in contract, tort (including negligence), or otherwise, shall strictly be capped at and limited to the total service fees actually paid by the Client to ${BRAND.name} under the specific Statement of Work during the three (3) months immediately preceding the event giving rise to liability.`,
    ],
  },
  {
    id: "confidentiality",
    number: "10",
    heading: "Confidentiality & Data Protection",
    content: [
      `Each party agrees to maintain strict confidentiality regarding all proprietary information, software architectures, financial data, and business strategies disclosed by the other party during the engagement.`,
      `Personal data and project credentials are processed and secured in strict compliance with the Digital Personal Data Protection Act, 2023 ("DPDP Act") and our Privacy Policy. Neither party shall disclose confidential information to any third party without prior written consent, except where required by a court of competent jurisdiction.`,
    ],
  },
  {
    id: "dispute-resolution",
    number: "11",
    heading: "Dispute Resolution, Governing Law & Jurisdiction",
    content: [
      `These Terms, along with all proposals and contracts entered into by ${BRAND.name}, shall be governed by, interpreted, and construed in accordance with the substantive laws of the Republic of India.`,
      `In the event of any controversy, claim, or dispute arising out of or relating to these Terms or a project, the parties shall first attempt in good faith to resolve the matter through amicable executive negotiation within thirty (30) calendar days.`,
      `If the dispute cannot be resolved through mutual discussion, it shall be referred to and finally resolved by binding arbitration under the Arbitration and Conciliation Act, 1996, by a sole arbitrator mutually appointed by the parties. The seat and legal place of arbitration shall be Shajapur, Madhya Pradesh, India, and the proceedings shall be conducted in English or Hindi.`,
      `Subject to the arbitration clause above, the competent courts located in Shajapur, Madhya Pradesh, India shall have exclusive territorial and subject-matter jurisdiction over all legal proceedings arising out of or in connection with these Terms.`,
    ],
  },
  {
    id: "modifications",
    number: "12",
    heading: "Modifications & Severability",
    content: [
      `${BRAND.name} reserves the right to modify or update these Terms periodically to reflect evolving business practices, service capabilities, or regulatory mandates. The "Last updated" date at the top of this document indicates the effective revision date.`,
      `If any provision of these Terms is deemed unlawful, void, or for any reason unenforceable by a court of competent jurisdiction, that provision shall be deemed severable and shall not affect the validity and enforceability of the remaining provisions.`,
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Terms & Conditions" },
        ]}
      />

      <PageHero
        eyebrow="Commercial & Legal Governance"
        title={
          <>
            Terms & <span className="text-brand">Conditions.</span>
          </>
        }
        description={`The contractual framework governing services, project delivery, payments, intellectual property, and mutual responsibilities at ${BRAND.name}. Last updated: ${LAST_UPDATED}.`}
      />

      {/* Highlights Grid */}
      <section className="bg-[#050607] px-4 pt-2 pb-10 md:px-6">
        <div className="mx-auto max-w-5xl grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h) => {
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
          {SECTIONS.map((s) => (
            <article
              key={s.id}
              id={s.id}
              className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-white/15 hover:bg-white/[0.03]"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold text-[#ffb84d] tracking-widest">
                  {s.number}
                </span>
                <span className="h-px flex-1 bg-white/10" />
              </div>

              <h2 className="mt-3 font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
                {s.heading}
              </h2>

              <div className="mt-4 space-y-3.5">
                {s.content.map((p, idx) => (
                  <p key={idx} className="text-sm leading-relaxed text-zinc-300">
                    {p}
                  </p>
                ))}
              </div>
            </article>
          ))}

          {/* Quick Legal Contact Desk Card */}
          <div className="rounded-3xl border border-[#ff9f1c]/30 bg-gradient-to-b from-[#ff9f1c]/[0.08] to-white/[0.01] p-6 sm:p-10 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">
                  Official Legal Desk
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-white">
                  Have questions about our contract terms?
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-300">
                  We are committed to clear, fair, and professional partnerships. Reach out to our executive desk for specific Statement of Work queries or custom master service agreements.
                </p>
              </div>

              <div className="flex shrink-0 flex-col gap-2.5">
                <a
                  href={`mailto:${BRAND.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff9f1c] px-5 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-[#ffb84d]"
                >
                  <Mail className="size-3.5" />
                  <span>Email Legal Desk</span>
                </a>
                <Link
                  href="/cancellation-refund-policy"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2.5 text-xs font-semibold text-zinc-200 transition-colors hover:border-white/25 hover:text-white"
                >
                  <span>Refund Policy</span>
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
              <Link href="/privacy-policy" className="hover:text-[#ffb84d] transition-colors">
                Privacy Policy
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

