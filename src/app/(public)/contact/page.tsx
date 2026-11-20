import { Suspense } from "react";
import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  ExternalLink,
  ArrowUpRight,
  Lock,
  Scale,
  Zap,
  FileCheck2,
  Globe2,
  Calendar,
  MessageCircle,
  Code2,
  Camera,
  Briefcase,
} from "lucide-react";
import { buildSeo } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { ContactHub } from "@/components/public/ContactHub";
import { BRAND } from "@/lib/brand";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: "Contact Direct Founder & Engineering Desk",
    description:
      "Initiate your website, mobile app, SEO, or digital marketing project with MLHK Infotech. Direct access to Hariom Vishwkarma, 120-minute response SLA, mutual NDA, and verified UDYAM/GST corporate governance.",
    path: "/contact",
  });
}

interface ContactFaq {
  query: string;
  answer: string;
  keyTakeaway: string;
}

const CONTACT_FAQS: ContactFaq[] = [
  {
    query: "How Quickly Does MLHK Infotech Respond to Technical Inquiries?",
    answer:
      "All formal project inquiries submitted through our website or direct WhatsApp hotline (+91 91651 00124) are acknowledged within 120 minutes during standard IST business hours (09:00 to 20:00 IST). Inquiries receive a preliminary technical feasibility review and architectural assessment directly from Hariom Vishwkarma or a senior systems architect, rather than an automated sales bot.",
    keyTakeaway: "Guaranteed 120-minute initial review SLA during IST hours directly from senior engineering leadership.",
  },
  {
    query: "Do You Execute a Non-Disclosure Agreement (NDA) Before Project Discovery?",
    answer:
      "Yes, 100%. Before you disclose proprietary algorithms, commercial business models, database schemas, or unpublished product wireframes, MLHK Infotech executes a bilateral, statutory Non-Disclosure Agreement (NDA). All intellectual property, client datasets, and operational trade secrets remain your sole and exclusive property under Indian and international law.",
    keyTakeaway: "Standard bilateral mutual NDA executed prior to confidential wireframe or architectural review.",
  },
  {
    query: "How Are Engineering Milestones, Escrow Billing, and Payments Structured?",
    answer:
      "We operate under fixed-fee milestone disbursements or transparent agile monthly retainers. Projects typically follow a 4-phase milestone structure: (1) Architecture, Wireframes & Database Schema (30%), (2) Core Functional Frontend & Backend Staging (30%), (3) Integration, Polish & QA (30%), and (4) Production Go-Live & IP Handover (10%). Payments are settled against official GST tax invoices (GSTIN: 23CHLPV2868R1CJ).",
    keyTakeaway: "Transparent 4-phase milestone billing backed by official GST-compliant tax invoices.",
  },
  {
    query: "Can Clients Outside Madhya Pradesh or Outside India Work With MLHK Infotech?",
    answer:
      "Yes. MLHK Infotech delivers websites, mobile apps, SEO, and custom software across all Indian states (Indore, Bhopal, Delhi NCR, Mumbai, Bengaluru, Pune, Ahmedabad, Jaipur, Tier-2/3 cities) as well as clients across the US, UK, UAE, and Europe with full GST/SWIFT invoicing.",
    keyTakeaway: "Pan-India and global remote delivery with structured weekly demos and milestone sign-offs.",
  },
  {
    query: "Can We Schedule an In-Person Meeting at Your Shajapur H.Q. or Indore Hub?",
    answer:
      "Yes. Clients are welcome to visit our registered corporate headquarters in Shajapur (Barnawad, MP 465236) or arrange architecture kickoff workshops at our commercial delivery operations in Indore (AB Road / Vijay Nagar corridor). We request 48 hours advance notice to schedule meeting rooms and prepare technical briefings.",
    keyTakeaway: "In-person architectural kickoff sessions available in Indore and Shajapur with 48 hours notice.",
  },
  {
    query: "What Should We Prepare Before Our Initial Technical Discovery Call?",
    answer:
      "To maximize your 30-minute discovery call, having a brief list of target users, key requirements (payment gateways, SEO goals, existing website URL, or app features), preferred deadlines, and an estimated budget range is helpful. Even if you only have a rough idea, we help scope it clearly.",
    keyTakeaway: "Your business goal, target customers, and rough timeline are enough to start.",
  },
];

export default function ContactPage() {
  const quickContacts = [
    {
      icon: MessageCircle,
      label: "Direct WhatsApp",
      value: "+91 91651 00124",
      sub: "Instant chat in 10 seconds",
      href: "https://wa.me/919165100124?text=Hello%20MLHK%20Infotech%2C%20I%20would%20like%20to%20discuss%20a%20project.",
      accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    },
    {
      icon: Mail,
      label: "Official Email",
      value: "contact@mlhk.in",
      sub: "admin@mlhk.in / support@mlhk.in",
      href: "mailto:contact@mlhk.in",
      accent: "text-[#ffb84d] bg-[#ff9f1c]/10 border-[#ff9f1c]/30",
    },
    {
      icon: Phone,
      label: "Voice Telephone",
      value: "+91-9165100124",
      sub: "Mon–Sat, 09:00 – 20:00 IST",
      href: "tel:+919165100124",
      accent: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    },
    {
      icon: MapPin,
      label: "Headquarters & Legal Base",
      value: "Shajapur, MP 465236",
      sub: "Barnawad, Moman Barodia",
      href: BRAND.mapsUrl,
      accent: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "@id": `${BRAND.url}/contact#page`,
          url: `${BRAND.url}/contact`,
          name: "Contact MLHK Infotech Engineering Desk",
          description:
            "Connect directly with Hariom Vishwkarma and the MLHK Infotech software engineering team for web platforms, mobile apps, SEO, digital marketing, and custom ERP systems.",
          mainEntity: {
            "@id": `${BRAND.url}/#organization`,
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: CONTACT_FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.query,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${faq.answer} Key Takeaway: ${faq.keyTakeaway}`,
            },
          })),
        }}
      />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }]} />

      {/* HERO SECTION */}
      <section className="relative isolate overflow-hidden bg-[#050607] px-4 pb-12 pt-4 md:px-6 md:pb-16 md:pt-8">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-20%] h-[380px] w-[80vw] max-w-5xl -translate-x-1/2 rounded-full bg-[#ff9f1c]/12 blur-[120px]"
        />

        <div className="relative mx-auto max-w-6xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#ffb84d]">
            Registered Indian Enterprise · Direct Founder Access · 120-Min Response SLA
          </p>

          <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-[1.06] tracking-tight text-white [text-wrap:balance] md:text-5xl lg:text-6xl">
            Initiate your project with{" "}
            <span className="bg-gradient-to-r from-[#ff9f1c] via-[#ffb84d] to-amber-200 bg-clip-text text-transparent">
              MLHK Infotech.
            </span>
          </h1>

          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base md:text-lg">
            Speak directly with Hariom Vishwkarma and our lead engineers. No middlemen or scripted sales pitches — just clear architecture, honest INR pricing, mutual NDAs, and fixed-milestone delivery.
          </p>

          {/* Compact Proof Bar */}
          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-4">
            <div>
              <span className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                Response SLA
              </span>
              <span className="mt-1 block font-display text-2xl font-bold tabular-nums text-white">
                &lt; 120 <span className="font-mono text-xs text-[#ffb84d]">MIN</span>
              </span>
              <span className="mt-0.5 block text-xs text-zinc-400">Guaranteed IST review</span>
            </div>

            <div>
              <span className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                IP Protection
              </span>
              <span className="mt-1 block font-display text-2xl font-bold tabular-nums text-white">
                100% <span className="font-mono text-xs text-emerald-400">NDA</span>
              </span>
              <span className="mt-0.5 block text-xs text-zinc-400">Statutory mutual deed</span>
            </div>

            <div>
              <span className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                Communication
              </span>
              <span className="mt-1 block font-display text-2xl font-bold text-white">
                DIRECT <span className="font-mono text-xs text-cyan-400">DESK</span>
              </span>
              <span className="mt-0.5 block text-xs text-zinc-400">WhatsApp &amp; Slack channel</span>
            </div>

            <div>
              <span className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                Registrations
              </span>
              <span className="mt-1 block font-display text-2xl font-bold text-white">
                UDYAM <span className="font-mono text-xs text-[#ffb84d]">&amp; GST</span>
              </span>
              <span className="mt-0.5 block text-xs text-zinc-400">Govt. verified entity</span>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK CONTACT HOTLINES */}
      <section className="bg-[#050607] px-4 pb-14 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickContacts.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#08090c] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ff9f1c]/45"
                >
                  <div className="flex items-center justify-between">
                    <span className={`flex size-11 items-center justify-center rounded-xl border ${c.accent}`}>
                      <Icon className="size-5" />
                    </span>
                    <ArrowUpRight className="size-4 text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                  </div>

                  <div className="mt-5">
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                      {c.label}
                    </span>
                    <span className="mt-1 block font-display text-sm font-bold text-white transition-colors duration-200 group-hover:text-[#ffb84d]">
                      {c.value}
                    </span>
                    <span className="mt-0.5 block text-xs text-zinc-400">{c.sub}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* INTERACTIVE SCOPING WIZARD & FORM */}
      <section className="bg-[#050607] px-4 pb-20 md:px-6">
        <div className="mx-auto max-w-6xl">
          <Suspense
            fallback={
              <div className="rounded-3xl border border-white/10 bg-[#08090c] p-10 text-sm text-zinc-400">
                Loading interactive project scoping desk…
              </div>
            }
          >
            <ContactHub />
          </Suspense>
        </div>
      </section>

      {/* DIRECT FOUNDER DESK */}
      <section className="bg-[#050607] px-4 pb-20 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#08090c] p-8 md:p-12">
            <div className="grid items-center gap-8 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#ffb84d]">
                  Principal Architect Desk · BCA, Vikram University Ujjain
                </p>

                <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
                  Hariom Vishwkarma (MLHK)
                </h2>
                <p className="font-mono text-xs uppercase tracking-wider text-zinc-300">
                  Founder &amp; Chief Technology Officer · MLHK Infotech &amp; Red Xerox Studio
                </p>

                <p className="text-sm leading-relaxed text-zinc-300">
                  &ldquo;We deliberately operate without account managers or non-technical intermediaries.
                  When you start a project with MLHK Infotech, you collaborate directly with the engineers
                  who design your database schemas, optimize your Google ranking, and write the production code.&rdquo;
                </p>

                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  <a
                    href={BRAND.founderLinkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-xs font-semibold text-zinc-200 transition-colors duration-200 hover:border-[#ff9f1c]/50 hover:text-white"
                  >
                    <Briefcase className="size-3.5 text-sky-400" />
                    <span>LinkedIn</span>
                    <ExternalLink className="size-3 text-zinc-400" />
                  </a>

                  <a
                    href={BRAND.founderGithub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-xs font-semibold text-zinc-200 transition-colors duration-200 hover:border-[#ff9f1c]/50 hover:text-white"
                  >
                    <Code2 className="size-3.5 text-white" />
                    <span>GitHub (@mlhkhariom)</span>
                    <ExternalLink className="size-3 text-zinc-400" />
                  </a>

                  <a
                    href={BRAND.founderInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-xs font-semibold text-zinc-200 transition-colors duration-200 hover:border-[#ff9f1c]/50 hover:text-white"
                  >
                    <Camera className="size-3.5 text-pink-400" />
                    <span>Instagram (@mlhkhariom)</span>
                    <ExternalLink className="size-3 text-zinc-400" />
                  </a>

                  <a
                    href={`https://wa.me/919165100124?text=${encodeURIComponent(
                      "Hello Hariom, I would like to schedule an architectural consultation."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-300 transition-colors duration-200 hover:bg-emerald-500/20"
                  >
                    <MessageCircle className="size-3.5" />
                    <span>Direct WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="space-y-4 rounded-2xl border border-white/10 bg-black/50 p-6 lg:col-span-4">
                <span className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                  Statutory Registrations
                </span>

                <div className="space-y-3 text-xs">
                  <div className="border-b border-white/10 pb-2.5">
                    <span className="block font-mono text-[11px] text-zinc-400">MSME UDYAM REG:</span>
                    <a
                      href={BRAND.udyamVerifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 inline-flex items-center gap-1 font-mono font-bold text-[#ffb84d] hover:underline"
                    >
                      {BRAND.udyamNumber}
                      <ExternalLink className="size-3 text-zinc-400" />
                    </a>
                    <span className="block text-[11px] text-zinc-400">Govt. of India Enterprise</span>
                  </div>

                  <div className="border-b border-white/10 pb-2.5">
                    <span className="block font-mono text-[11px] text-zinc-400">GST IDENTIFICATION:</span>
                    <a
                      href={BRAND.gstVerifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 inline-flex items-center gap-1 font-mono font-bold text-emerald-400 hover:underline"
                    >
                      {BRAND.gstin}
                      <ExternalLink className="size-3 text-zinc-400" />
                    </a>
                    <span className="block text-[11px] text-zinc-400">Goods &amp; Services Tax Portal</span>
                  </div>

                  <div>
                    <span className="block font-mono text-[11px] text-zinc-400">ESTABLISHED DATE:</span>
                    <span className="mt-0.5 block font-mono font-bold text-white">
                      {BRAND.foundedDate}
                    </span>
                    <span className="block text-[11px] text-zinc-400">Active Operating Tenure: 6+ Years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DUAL OPERATING HUBS */}
      <section className="bg-[#050607] px-4 pb-20 md:px-6">
        <div className="mx-auto max-w-6xl space-y-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#ffb84d]">
              Physical Operating Footprint
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Our Registered Headquarters &amp; Tech Hubs
            </h2>
            <p className="mt-1.5 max-w-xl text-sm text-zinc-400">
              Rooted in Madhya Pradesh, engineering websites, apps, and SEO growth systems for clients across India and globally.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Shajapur HQ */}
            <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#08090c] p-7 transition-colors duration-200 hover:border-[#ff9f1c]/40">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-wider">
                  <span className="text-[#ffb84d]">Corporate Headquarters</span>
                  <span className="text-emerald-400">Registered Legal Base</span>
                </div>

                <h3 className="font-display text-xl font-bold text-white">Shajapur Headquarters</h3>
                <p className="text-sm leading-relaxed text-zinc-300">{BRAND.location}</p>

                <div className="space-y-1.5 rounded-xl border border-white/10 bg-black/50 p-4 text-xs">
                  <div className="flex justify-between gap-3 text-zinc-400">
                    <span>Coordinates:</span>
                    <span className="font-mono text-zinc-200">23.6640° N, 76.3220° E</span>
                  </div>
                  <div className="flex justify-between gap-3 text-zinc-400">
                    <span>Postal PIN Code:</span>
                    <span className="font-mono text-zinc-200">465236 (Shajapur Dist, MP)</span>
                  </div>
                  <div className="flex justify-between gap-3 text-zinc-400">
                    <span>Jurisdiction:</span>
                    <span className="font-mono text-zinc-200">Madhya Pradesh, India</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <a
                  href={BRAND.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ffb84d] transition-colors duration-200 hover:text-white"
                >
                  <MapPin className="size-3.5" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="size-3 text-zinc-400" />
                </a>
                <span className="font-mono text-[11px] text-zinc-400">Legal HQ</span>
              </div>
            </div>

            {/* Indore Tech Hub */}
            <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#08090c] p-7 transition-colors duration-200 hover:border-cyan-500/40">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-wider">
                  <span className="text-cyan-300">Technology Delivery Hub</span>
                  <span className="inline-flex items-center gap-1.5 text-cyan-400">
                    <Globe2 className="size-3.5" />
                    Commercial Sprints
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-white">Indore Tech Operations Hub</h3>
                <p className="text-sm leading-relaxed text-zinc-300">
                  AB Road / Vijay Nagar Commercial Corridor, Indore, Madhya Pradesh 452010, India.
                </p>

                <div className="space-y-1.5 rounded-xl border border-white/10 bg-black/50 p-4 text-xs">
                  <div className="flex justify-between gap-3 text-zinc-400">
                    <span>Hub Role:</span>
                    <span className="font-mono text-zinc-200">Architecture Sprints &amp; Client Demos</span>
                  </div>
                  <div className="flex justify-between gap-3 text-zinc-400">
                    <span>Meeting Access:</span>
                    <span className="font-mono text-zinc-200">By 48-hr appointment</span>
                  </div>
                  <div className="flex justify-between gap-3 text-zinc-400">
                    <span>Delivery Timezone:</span>
                    <span className="font-mono text-zinc-200">IST (UTC+05:30)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <a
                  href={`https://wa.me/919165100124?text=${encodeURIComponent(
                    "Hello MLHK team, I want to schedule an in-person meeting in Indore."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 transition-colors duration-200 hover:text-white"
                >
                  <Calendar className="size-3.5" />
                  <span>Request Indore Meeting</span>
                  <ExternalLink className="size-3 text-zinc-400" />
                </a>
                <span className="font-mono text-[11px] text-zinc-400">Commercial Hub</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENGAGEMENT GUARANTEES */}
      <section className="bg-[#050607] px-4 pb-20 md:px-6">
        <div className="mx-auto max-w-6xl space-y-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-emerald-400">
              Contractual Assurance
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Four Non-Negotiable Engagement Guarantees
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3 rounded-2xl border border-white/10 bg-[#08090c] p-5">
              <div className="flex size-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                <Lock className="size-5" />
              </div>
              <h3 className="font-display text-sm font-bold text-white">Statutory Mutual NDA</h3>
              <p className="text-xs leading-relaxed text-zinc-400">
                We sign a legally binding bilateral non-disclosure agreement before reviewing your business plans or proprietary systems.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-white/10 bg-[#08090c] p-5">
              <div className="flex size-10 items-center justify-center rounded-xl border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 text-[#ffb84d]">
                <Scale className="size-5" />
              </div>
              <h3 className="font-display text-sm font-bold text-white">Milestone Billing</h3>
              <p className="text-xs leading-relaxed text-zinc-400">
                Zero surprise bills. Payments are phased across agreed milestones and settled against official GST invoices.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-white/10 bg-[#08090c] p-5">
              <div className="flex size-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
                <FileCheck2 className="size-5" />
              </div>
              <h3 className="font-display text-sm font-bold text-white">100% Code Ownership</h3>
              <p className="text-xs leading-relaxed text-zinc-400">
                Full intellectual property handover. You own your domain, source repositories, Figma assets, and cloud accounts.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-white/10 bg-[#08090c] p-5">
              <div className="flex size-10 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-300">
                <Zap className="size-5" />
              </div>
              <h3 className="font-display text-sm font-bold text-white">Sub-120 Min Response SLA</h3>
              <p className="text-xs leading-relaxed text-zinc-400">
                Direct engineer communication via a dedicated WhatsApp or Slack channel — no waiting days for ticket replies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ONBOARDING FAQ */}
      <section className="bg-[#050607] px-4 pb-28 md:px-6">
        <div className="mx-auto max-w-6xl space-y-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#ffb84d]">
              Frequently Asked Questions
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Direct Answers to Client Onboarding Questions
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {CONTACT_FAQS.map((faq) => (
              <div
                key={faq.query}
                className="space-y-3 rounded-2xl border border-white/10 bg-[#08090c] p-6 transition-colors duration-200 hover:border-[#ff9f1c]/40"
              >
                <h3 className="flex items-start gap-2 font-display text-base font-bold text-white">
                  <span className="font-mono text-sm text-[#ff9f1c]">Q:</span>
                  <span>{faq.query}</span>
                </h3>
                <p className="pl-5 text-xs leading-relaxed text-zinc-300">{faq.answer}</p>
                <div className="mt-3 flex items-center gap-2 border-t border-white/10 pl-5 pt-3 text-xs font-medium text-emerald-400">
                  <CheckCircle2 className="size-3.5 shrink-0" />
                  <span>{faq.keyTakeaway}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
