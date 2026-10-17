import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ArrowUpRight,
  Award,
  Building2,
  UserCheck,
  Lock,
  Scale,
  Zap,
  Sparkles,
  MessageSquare,
  FileCheck2,
  Globe2,
  Calendar,
} from "lucide-react";
import { buildSeo } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { ContactHub } from "@/components/public/ContactHub";
import { BRAND } from "@/lib/brand";

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.824L.057 23.486a.5.5 0 0 0 .613.635l5.799-1.525A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.867 9.867 0 0 1-5.031-1.376l-.36-.214-3.733.981.998-3.648-.235-.374A9.867 9.867 0 0 1 2.118 12C2.118 6.527 6.527 2.118 12 2.118S21.882 6.527 21.882 12 17.473 21.882 12 21.882z" />
    </svg>
  );
}

function LinkedInGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function GitHubGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: "Contact MLHK Infotech | Direct Founder & Engineering Desk",
    description:
      "Initiate your enterprise project with MLHK Infotech. Direct access to Hariom Vishwkarma, 120-minute response SLA, 100% mutual NDA, and verified Indian corporate governance.",
    path: "/contact",
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT AEO / FAQ DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

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
      "We operate under fixed-fee milestone disbursements or transparent agile monthly retainers. Projects typically follow a 4-phase milestone structure: (1) Architecture, Wireframes & Database Schema (30%), (2) Core Functional Frontend & Backend Staging (30%), (3) Integration, Hardware Sensors, Polish & QA (30%), and (4) Production Go-Live & IP Handover (10%). Payments are settled against official GST tax invoices (GSTIN: 23CHLPV2868R1CJ).",
    keyTakeaway: "Transparent 4-phase milestone escrow billing backed by official GST-compliant tax invoices.",
  },
  {
    query: "Can International Clients Outside India Engage MLHK Infotech?",
    answer:
      "Yes. MLHK Infotech actively engineers software systems for clients across North America, Europe, the United Kingdom, the United Arab Emirates, and Southeast Asia. We support international wire transfers (SWIFT / IBAN), institutional escrow, and adjust sprint sync schedules to accommodate US, UK, and European time zones with native English communication.",
    keyTakeaway: "Full global delivery capability with SWIFT wire settlement and time-zone aligned sprint syncs.",
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
      "To maximize the value of your 30-minute discovery call, having a brief list of target users, key functional requirements (e.g., must-have integrations, payment gateways, offline needs), preferred deadlines, and an estimated budget range is helpful. If you have existing Figma wireframes, API documentation, or reference applications, share them under NDA for a rapid turnaround.",
    keyTakeaway: "User persona goals, must-have features, target timeline, and existing wireframes under NDA.",
  },
];

export default function ContactPage() {
  const quickContacts = [
    {
      icon: WhatsAppGlyph,
      label: "Direct WhatsApp",
      value: "+91 91651 00124",
      sub: "Instant chat in 10 seconds",
      href: "https://wa.me/919165100124?text=Hello%20MLHK%20Infotech%2C%20I%20am%20looking%20to%20discuss%20an%20enterprise%20project.",
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
      {/* ─────────────────────────────────────────────────────────────
          SCHEMA.ORG STRUCTURED DATA
          ───────────────────────────────────────────────────────────── */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "@id": `${BRAND.url}/contact#page`,
          url: `${BRAND.url}/contact`,
          name: `Contact MLHK Infotech Engineering Desk`,
          description:
            "Connect directly with Hariom Vishwkarma and the MLHK Infotech software engineering team for web platforms, mobile apps, ERP systems, and AI automation.",
          mainEntity: {
            "@type": "ProfessionalService",
            "@id": `${BRAND.url}/#organization`,
            name: BRAND.name,
            alternateName: [BRAND.shortName, "Red Xerox Studio"],
            url: BRAND.url,
            telephone: BRAND.phoneE164,
            email: BRAND.email,
            founder: {
              "@type": "Person",
              name: BRAND.founder,
              jobTitle: "Founder & Chief Systems Architect",
              sameAs: [
                BRAND.founderLinkedin,
                BRAND.founderGithub,
                BRAND.founderInstagram,
              ],
            },
            address: {
              "@type": "PostalAddress",
              streetAddress: BRAND.addressLine,
              addressLocality: BRAND.city,
              addressRegion: "Madhya Pradesh",
              postalCode: BRAND.postalCode,
              addressCountry: "IN",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: BRAND.phoneE164,
              contactType: "customer service",
              email: BRAND.email,
              availableLanguage: ["English", "Hindi"],
              areaServed: ["IN", "Worldwide"],
            },
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

      {/* ─────────────────────────────────────────────────────────────
          HERO SECTION (LUXURY GOLD & TITANIUM)
          ───────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#050607] px-4 pb-12 pt-4 md:px-6 md:pb-20 md:pt-8">
        {/* Ambient Atmospheric Mesh */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-20%] h-[420px] w-[85vw] max-w-5xl -translate-x-1/2 rounded-full bg-[#ff9f1c]/15 blur-[120px]"
        />

        <div className="relative mx-auto max-w-6xl">
          {/* Eyebrow Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">
              <span className="size-1.5 rounded-full bg-[#ff9f1c] shadow-[0_0_10px_#ff9f1c]" />
              🇮🇳 Registered Indian Enterprise
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-mono text-zinc-300">
              Direct Founder Access • No Middlemen
            </span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-mono text-emerald-400">
              120-Min Response SLA
            </span>
          </div>

          <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.06] tracking-tight text-white md:text-5xl lg:text-6xl">
            Initiate Your Project With{" "}
            <span className="bg-gradient-to-r from-[#ff9f1c] via-[#ffb84d] to-amber-200 bg-clip-text text-transparent">
              MLHK Infotech.
            </span>
          </h1>

          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base md:text-lg">
            Direct access to Hariom Vishwkarma and senior software architects. No junior account manager
            filters, no automated corporate runarounds — just transparent technical strategy,
            enforceable mutual NDAs, and fixed-milestone execution.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-left">
              <span className="text-[10px] font-mono uppercase text-zinc-500 block">Response SLA</span>
              <span className="mt-1 font-display text-2xl font-bold text-white block">
                &lt; 120 <span className="text-xs font-mono text-[#ffb84d]">MIN</span>
              </span>
              <span className="mt-0.5 text-[10px] text-zinc-400">Guaranteed IST review</span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-left">
              <span className="text-[10px] font-mono uppercase text-zinc-500 block">IP Protection</span>
              <span className="mt-1 font-display text-2xl font-bold text-white block">
                100% <span className="text-xs font-mono text-emerald-400">NDA</span>
              </span>
              <span className="mt-0.5 text-[10px] text-zinc-400">Statutory mutual deed</span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-left">
              <span className="text-[10px] font-mono uppercase text-zinc-500 block">Engineering Team</span>
              <span className="mt-1 font-display text-2xl font-bold text-white block">
                DIRECT <span className="text-xs font-mono text-cyan-400">SLACK</span>
              </span>
              <span className="mt-0.5 text-[10px] text-zinc-400">Dedicated WhatsApp/Slack</span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-left">
              <span className="text-[10px] font-mono uppercase text-zinc-500 block">Gov Registrations</span>
              <span className="mt-1 font-display text-2xl font-bold text-white block">
                UDYAM <span className="text-xs font-mono text-[#ffb84d]">&amp; GST</span>
              </span>
              <span className="mt-0.5 text-[10px] text-zinc-400">Statutory verified entity</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          QUICK CONTACT METHOD HOTLINE CARDS
          ───────────────────────────────────────────────────────────── */}
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
                  className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#ff9f1c]/40 hover:shadow-[0_20px_50px_-20px_rgba(255,159,28,0.25)]"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex size-11 items-center justify-center rounded-xl border ${c.accent}`}
                    >
                      <Icon className="size-5" />
                    </span>
                    <ArrowUpRight className="size-4 text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                  </div>

                  <div className="mt-5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                      {c.label}
                    </span>
                    <span className="mt-1 font-display text-sm font-bold text-white group-hover:text-[#ffb84d] transition-colors block">
                      {c.value}
                    </span>
                    <span className="mt-0.5 text-[11px] text-zinc-400 block">{c.sub}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          INTERACTIVE SCOPING WIZARD & PRODUCTION FORM (CONTACT HUB)
          ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#050607] px-4 pb-24 md:px-6">
        <div className="mx-auto max-w-6xl">
          <ContactHub />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          DIRECT FOUNDER DESK (HARIOM VISHWKARMA / MLHK)
          ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#050607] px-4 pb-24 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-[#0b0e14] via-[#08090d] to-[#040507] p-8 md:p-12 shadow-2xl">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#ff9f1c]/10 blur-[120px]"
            />

            <div className="grid gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
                    <UserCheck className="size-3 text-[#ff9f1c]" />
                    Principal Architect Desk
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-mono text-zinc-400">
                    BCA • Vikram University Ujjain
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
                  Hariom Vishwkarma (MLHK)
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider text-[#ffb84d]">
                  Founder &amp; Chief Technology Officer • MLHK Infotech &amp; Red Xerox Studio
                </p>

                <p className="text-sm leading-relaxed text-zinc-300">
                  &ldquo;We deliberately operate without account managers or non-technical intermediaries.
                  When you initiate a project with MLHK Infotech, you collaborate directly with the software
                  architects who design your database schemas, engineer your serverless edge routes, and
                  commit the code. That direct accountability is why our systems load in milliseconds and
                  never collapse under production spikes.&rdquo;
                </p>

                {/* Verified Founder Social Footprint */}
                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  <a
                    href={BRAND.founderLinkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-semibold text-zinc-300 hover:border-[#ff9f1c]/50 hover:text-white transition-all"
                  >
                    <LinkedInGlyph className="size-3.5 text-[#0077b5]" />
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="size-3 text-zinc-500" />
                  </a>

                  <a
                    href={BRAND.founderGithub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-semibold text-zinc-300 hover:border-[#ff9f1c]/50 hover:text-white transition-all"
                  >
                    <GitHubGlyph className="size-3.5 text-white" />
                    <span>GitHub (@mlhkhariom)</span>
                    <ExternalLink className="size-3 text-zinc-500" />
                  </a>

                  <a
                    href={BRAND.founderInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-semibold text-zinc-300 hover:border-[#ff9f1c]/50 hover:text-white transition-all"
                  >
                    <InstagramGlyph className="size-3.5 text-pink-400" />
                    <span>Instagram (@mlhkhariom)</span>
                    <ExternalLink className="size-3 text-zinc-500" />
                  </a>

                  <a
                    href={`https://wa.me/919165100124?text=${encodeURIComponent(
                      "Hello Hariom, I would like to schedule an architectural consultation."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-all"
                  >
                    <WhatsAppGlyph className="size-3.5" />
                    <span>Direct WhatsApp Chat</span>
                  </a>
                </div>
              </div>

              {/* Verified Credentials Box */}
              <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-black/50 p-6 space-y-4">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">
                  Statutory Registrations:
                </span>

                <div className="space-y-3 text-xs">
                  <div className="border-b border-white/5 pb-2.5">
                    <span className="text-[10px] text-zinc-400 block font-mono">MSME UDYAM REG:</span>
                    <a
                      href={BRAND.udyamVerifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono font-bold text-[#ffb84d] hover:underline inline-flex items-center gap-1 mt-0.5"
                    >
                      {BRAND.udyamNumber}
                      <ExternalLink className="size-3 text-zinc-500" />
                    </a>
                    <span className="text-[10px] text-zinc-500 block">Govt. of India Enterprise</span>
                  </div>

                  <div className="border-b border-white/5 pb-2.5">
                    <span className="text-[10px] text-zinc-400 block font-mono">GST IDENTIFICATION:</span>
                    <a
                      href={BRAND.gstVerifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono font-bold text-emerald-400 hover:underline inline-flex items-center gap-1 mt-0.5"
                    >
                      {BRAND.gstin}
                      <ExternalLink className="size-3 text-zinc-500" />
                    </a>
                    <span className="text-[10px] text-zinc-500 block">Goods and Services Tax Portal</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-zinc-400 block font-mono">ESTABLISHED DATE:</span>
                    <span className="font-mono font-bold text-white block mt-0.5">
                      {BRAND.foundedDate}
                    </span>
                    <span className="text-[10px] text-zinc-500 block">Active Operating Tenure: 6+ Years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          DUAL OPERATING HUBS (SHAJAPUR HEADQUARTERS & INDORE HUB)
          ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#050607] px-4 pb-24 md:px-6">
        <div className="mx-auto max-w-6xl space-y-8">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
              <Building2 className="size-3.5" />
              Physical Operating Footprint
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Our Registered Headquarters &amp; Tech Hubs
            </h3>
            <p className="mt-1 text-xs text-zinc-400 max-w-xl">
              Rooted in Madhya Pradesh, engineering digital power for clients across India and globally.
              Visit our offices for in-person sprint kickoffs or legal verification.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* 1. Shajapur HQ */}
            <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-7 transition-all hover:border-[#ff9f1c]/40">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#ff9f1c]/15 px-3 py-1 text-[10px] font-mono font-semibold text-[#ffb84d] border border-[#ff9f1c]/30">
                    Corporate Headquarters
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                    Registered Legal Base
                  </span>
                </div>

                <h4 className="font-display text-xl font-bold text-white">
                  Shajapur Headquarters
                </h4>
                <p className="text-xs leading-relaxed text-zinc-400">
                  {BRAND.location}
                </p>

                <div className="rounded-xl border border-white/5 bg-black/40 p-3.5 space-y-1.5 text-xs">
                  <div className="flex justify-between text-zinc-400 text-[11px]">
                    <span>Coordinates:</span>
                    <span className="font-mono text-zinc-200">23.6640° N, 76.3220° E</span>
                  </div>
                  <div className="flex justify-between text-zinc-400 text-[11px]">
                    <span>Postal PIN Code:</span>
                    <span className="font-mono text-zinc-200">465236 (Shajapur Dist, MP)</span>
                  </div>
                  <div className="flex justify-between text-zinc-400 text-[11px]">
                    <span>Legal Jurisdiction:</span>
                    <span className="font-mono text-zinc-200">State of Madhya Pradesh, India</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <a
                  href={BRAND.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ffb84d] hover:text-white transition-colors"
                >
                  <MapPin className="size-3.5" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="size-3 text-zinc-500" />
                </a>
                <span className="text-[10px] font-mono text-zinc-500">Legal HQ</span>
              </div>
            </div>

            {/* 2. Indore Tech Operations Hub */}
            <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-7 transition-all hover:border-cyan-500/40">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-[10px] font-mono font-semibold text-cyan-300 border border-cyan-500/30">
                    Technology Delivery Hub
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400">
                    <Globe2 className="size-3" />
                    Commercial Sprints
                  </span>
                </div>

                <h4 className="font-display text-xl font-bold text-white">
                  Indore Tech Operations Hub
                </h4>
                <p className="text-xs leading-relaxed text-zinc-400">
                  AB Road / Vijay Nagar Commercial Corridor, Indore, Madhya Pradesh 452010, India.
                </p>

                <div className="rounded-xl border border-white/5 bg-black/40 p-3.5 space-y-1.5 text-xs">
                  <div className="flex justify-between text-zinc-400 text-[11px]">
                    <span>Hub Role:</span>
                    <span className="font-mono text-zinc-200">Architecture Sprints &amp; Client Demos</span>
                  </div>
                  <div className="flex justify-between text-zinc-400 text-[11px]">
                    <span>Client Meeting Access:</span>
                    <span className="font-mono text-zinc-200">By 48-hr appointment</span>
                  </div>
                  <div className="flex justify-between text-zinc-400 text-[11px]">
                    <span>Delivery Timezone:</span>
                    <span className="font-mono text-zinc-200">IST (UTC+05:30)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <a
                  href={`https://wa.me/919165100124?text=${encodeURIComponent(
                    "Hello MLHK team, I want to schedule an in-person meeting in Indore."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-white transition-colors"
                >
                  <Calendar className="size-3.5" />
                  <span>Request Indore Meeting</span>
                  <ExternalLink className="size-3 text-zinc-500" />
                </a>
                <span className="text-[10px] font-mono text-zinc-500">Commercial Hub</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          ENTERPRISE ENGAGEMENT & TRUST GUARANTEES
          ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#050607] px-4 pb-24 md:px-6">
        <div className="mx-auto max-w-6xl space-y-8">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
              <ShieldCheck className="size-3.5" />
              Contractual Assurance
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Four Non-Negotiable Engagement Guarantees
            </h3>
            <p className="mt-1 text-xs text-zinc-400 max-w-xl">
              Every partnership is protected by statutory Indian contract law and transparent delivery milestones.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Lock className="size-5" />
              </div>
              <h4 className="font-display text-sm font-bold text-white">Statutory Mutual NDA</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We sign a legally binding bilateral non-disclosure agreement before reviewing your secret
                algorithms, business plans, or client data.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#ff9f1c]/10 text-[#ffb84d] border border-[#ff9f1c]/30">
                <Scale className="size-5" />
              </div>
              <h4 className="font-display text-sm font-bold text-white">Milestone Escrow Billing</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Zero surprise bills. Payments are phased across agreed deliverables and only disbursed once
                you verify the functional staging build.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <FileCheck2 className="size-5" />
              </div>
              <h4 className="font-display text-sm font-bold text-white">100% Code Sovereignty</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Full intellectual property transfer deed. You own all Git repositories, Figma design tokens,
                and production deployment keys.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
                <Zap className="size-5" />
              </div>
              <h4 className="font-display text-sm font-bold text-white">Sub-120 Min Response SLA</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Direct engineer communication via a dedicated Slack or WhatsApp channel. No bureaucracy
                or waiting days for ticket replies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2026 AEO / GEO FAQ ANSWER CAPSULES
          ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#050607] px-4 pb-28 md:px-6">
        <div className="mx-auto max-w-6xl space-y-8">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
              <MessageSquare className="size-3.5" />
              Frequently Asked Questions
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Direct Answers to Client Onboarding Questions
            </h3>
            <p className="mt-1 text-xs text-zinc-400 max-w-xl">
              Transparent terms, legal protections, and onboarding protocols explained upfront.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {CONTACT_FAQS.map((faq) => (
              <div
                key={faq.query}
                className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-6 space-y-3 transition-all hover:border-[#ff9f1c]/40"
              >
                <h4 className="font-display text-base font-bold text-white flex items-start gap-2">
                  <span className="text-[#ff9f1c] font-mono text-sm">Q:</span>
                  <span>{faq.query}</span>
                </h4>
                <p className="text-xs leading-relaxed text-zinc-300 pl-5">
                  {faq.answer}
                </p>
                <div className="mt-3 pl-5 pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
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
