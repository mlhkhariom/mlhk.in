import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  ShieldCheck,
  Cpu,
  Globe,
  Building2,
  Sparkles,
  MapPin,
  Calendar,
  Code2,
  Layers,
  Smartphone,
  Bot,
  Zap,
  Music,
  ExternalLink,
  CheckCircle2,
  FileCheck,
  Terminal,
  Server,
  Database,
  Lock,
  GraduationCap,
} from "lucide-react";
import { buildSeo } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { PageHero } from "@/components/public/PageHero";
import { BRAND, TIMELINE, VENTURES, TECH_STACK, WHY_MLHK } from "@/lib/brand";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: "About MLHK Infotech & Founder Hariom Vishwkarma (MLHK)",
    description:
      "Founded on 1 April 2020 in Barnawad, Shajapur with an operating base in Indore, MP. Discover MLHK Infotech's journey, verified milestones, venture ecosystem, and founder Hariom Vishwkarma.",
    path: "/about",
  });
}

function SocialGlyph({
  href,
  icon: Icon,
  label,
  handle,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  handle: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-zinc-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ff9f1c]/50 hover:bg-[#ff9f1c]/10 hover:text-white"
    >
      <Icon className="size-3.5 text-[#ffb84d]" />
      <span className="font-medium">{label}</span>
      <span className="text-zinc-500 group-hover:text-zinc-300">{handle}</span>
      <ExternalLink className="size-3 text-zinc-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ffb84d]" />
    </a>
  );
}

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "@id": `${BRAND.url}/about#page`,
          url: `${BRAND.url}/about`,
          name: `About ${BRAND.name} & Founder ${BRAND.founder}`,
          description:
            "MLHK Infotech is an indigenous enterprise technology and software engineering company founded on 1 April 2020 by Hariom Vishwkarma (MLHK). Registered with MSME (UDYAM-MP-44-0005223) and GSTIN (23CHLPV2868R1CJ).",
          mainEntity: {
            "@id": `${BRAND.url}/#organization`,
          },
          about: {
            "@type": "Person",
            "@id": `${BRAND.url}/about#hariom-vishwkarma`,
            name: BRAND.founder,
            alternateName: BRAND.founderAlias,
            jobTitle: BRAND.founderRole,
            description: BRAND.founderBio,
            url: `${BRAND.url}/about`,
            image: `${BRAND.url}/brand/mark.png`,
            alumniOf: {
              "@type": "EducationalOrganization",
              name: BRAND.university,
            },
            sameAs: [
              BRAND.founderGithub,
              BRAND.founderLinkedin,
              BRAND.founderInstagram,
              BRAND.founderTwitter,
            ],
            knowsAbout: [
              "Full-Stack Web Engineering",
              "Android App Architecture",
              "Enterprise Resource Planning (ERP)",
              "Customer Relationship Management (CRM)",
              "Artificial Intelligence & LLM Workflows",
              "Cloudflare Serverless Architecture",
              "Cybersecurity & IT Infrastructure",
            ],
          },
          citation: [
            {
              "@type": "CreativeWork",
              name: "Government of India Ministry of MSME Udyam Registration (UDYAM-MP-44-0005223)",
              url: BRAND.udyamVerifyUrl,
            },
            {
              "@type": "CreativeWork",
              name: "Goods and Services Tax Network (GSTIN: 23CHLPV2868R1CJ)",
              url: BRAND.gstVerifyUrl,
            },
            {
              "@type": "CreativeWork",
              name: "Vikram University, Ujjain (Alma Mater of Hariom Vishwkarma)",
              url: BRAND.universityUrl,
            },
            {
              "@type": "CreativeWork",
              name: "Crunchbase Verified Entity Profile for MLHK Infotech",
              url: BRAND.crunchbaseUrl,
            },
            {
              "@type": "CreativeWork",
              name: "F6S Verified Startup Profile for MLHK Infotech",
              url: BRAND.f6sUrl,
            },
            {
              "@type": "CreativeWork",
              name: "Founder & System Architect LinkedIn Profile (Hariom Vishwkarma)",
              url: BRAND.founderLinkedin,
            },
            {
              "@type": "CreativeWork",
              name: "Company LinkedIn Authority Profile (MLHK Infotech)",
              url: BRAND.companyLinkedin,
            },
          ],
        }}
      />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]} />

      <PageHero
        eyebrow="Company Dossier • Established 2020"
        title={
          <>
            Engineered in Bharat. <span className="text-brand">Deployed for the World.</span>
          </>
        }
        description="Founded on 1 April 2020 in Barnawad, Shajapur with an operating base in Indore, Madhya Pradesh. MLHK Infotech builds sovereign digital systems, scalable enterprise applications, and operational AI automation for companies across India and worldwide."
      />

      {/* Verified Corporate & Regulatory Badges Strip */}
      <section className="border-y border-white/10 bg-[#050607]/80 px-4 py-6 md:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Commencement Date
            </span>
            <span className="mt-1 font-display text-sm font-bold text-white">
              {BRAND.foundedDate}
            </span>
            <span className="text-[11px] text-zinc-500">6+ Years Active Execution</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              MSME / Udyam Reg.
            </span>
            <span className="mt-1 font-mono text-xs font-semibold text-[#ffb84d]">
              {BRAND.udyamNumber}
            </span>
            <span className="text-[11px] text-zinc-500">Govt. of India Certified</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              GST Registration
            </span>
            <span className="mt-1 font-mono text-xs font-semibold text-emerald-400">
              {BRAND.gstin}
            </span>
            <span className="text-[11px] text-zinc-500">E-Commerce &amp; IT Services</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Geographic Base
            </span>
            <span className="mt-1 font-display text-sm font-bold text-white">
              Shajapur &amp; Indore, MP
            </span>
            <span className="text-[11px] text-zinc-500">Registered HQ + Operations</span>
          </div>

          <div className="flex flex-col col-span-2 sm:col-span-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Global Deployment
            </span>
            <span className="mt-1 flex items-center gap-1.5 font-display text-sm font-bold text-[#ffb84d]">
              <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              Cloudflare Edge
            </span>
            <span className="text-[11px] text-zinc-500">330+ Global Data Centers</span>
          </div>
        </div>
      </section>

      <section className="bg-[#050607] px-4 py-20 md:px-6">
        {/* SECTION 1: FOUNDER & SYSTEM ARCHITECT DOSSIER */}
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.05] via-[#07080a] to-[#050607] p-8 md:p-12 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#ff9f1c]/10 blur-[130px]"
            />

            <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Left Column: Founder Persona & Background */}
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
                    <span className="size-1.5 rounded-full bg-[#ff9f1c] shadow-[0_0_8px_#ff9f1c]" />
                    Leadership &amp; Architecture
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-400">
                    Est. 1 April 2020
                  </span>
                </div>

                <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                  {BRAND.founder}{" "}
                  <span className="text-[#ffb84d] font-normal text-2xl md:text-3xl">
                    ({BRAND.founderAlias})
                  </span>
                </h2>

                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-zinc-400">
                  {BRAND.founderRole} • Enterprise System Architect • AI Automation Engineer
                </p>

                <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-300 md:text-base">
                  <p>
                    Hariom Vishwkarma, widely known as <strong>MLHK</strong>, is a technology
                    entrepreneur, systems architect, and generative automation engineer originating
                    from Shajapur, Madhya Pradesh. He founded MLHK Infotech on 1 April 2020 while
                    pursuing Computer Applications at <strong>Vikram University, Ujjain</strong>.
                  </p>
                  <p>
                    Driven by the conviction that world-class enterprise software should not be the
                    exclusive privilege of metropolitan agencies or expensive foreign SaaS vendors,
                    he structured MLHK Infotech as an indigenous, 100% in-house engineering lab.
                    His approach bridges three distinct disciplines:
                  </p>
                </div>

                {/* The 3 Core Pillars */}
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ffb84d]">
                      01 • Business
                    </p>
                    <p className="mt-1 text-xs text-zinc-300 font-medium">Business Thinking</p>
                    <p className="mt-1 text-[11px] text-zinc-500">
                      ROI-driven scope, direct outcomes, zero vanity features.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ffb84d]">
                      02 • Code
                    </p>
                    <p className="mt-1 text-xs text-zinc-300 font-medium">Tech Execution</p>
                    <p className="mt-1 text-[11px] text-zinc-500">
                      API-first, type-safe, resilient edge-deployed code.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ffb84d]">
                      03 • Craft
                    </p>
                    <p className="mt-1 text-xs text-zinc-300 font-medium">Design Sense</p>
                    <p className="mt-1 text-[11px] text-zinc-500">
                      Controlled dark-luxury UI, micro-motion, and bespoke marks.
                    </p>
                  </div>
                </div>

                {/* Verified GitHub & Social Links */}
                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-3">
                    Verified Founder Profiles &amp; Direct Channels
                  </p>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <SocialGlyph
                      href={BRAND.founderGithub}
                      icon={Terminal}
                      label="GitHub"
                      handle="@mlhkhariom"
                    />
                    <SocialGlyph
                      href={BRAND.founderLinkedin}
                      icon={Globe}
                      label="LinkedIn"
                      handle="in/mlhkhariom"
                    />
                    <SocialGlyph
                      href={BRAND.founderInstagram}
                      icon={Sparkles}
                      label="Instagram"
                      handle="@mlhkhariom"
                    />
                    <SocialGlyph
                      href={BRAND.founderTwitter}
                      icon={Zap}
                      label="X / Twitter"
                      handle="@mlhkhariom"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Technical Specializations & Accolades */}
              <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-black/40 p-6 lg:col-span-5">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffb84d]">
                      Technical Specializations
                    </span>
                    <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-zinc-400 font-mono">
                      Full-Stack Architect
                    </span>
                  </div>

                  <ul className="mt-5 space-y-4 text-xs text-zinc-300">
                    <li className="flex items-start gap-3">
                      <Smartphone className="size-4 text-[#ff9f1c] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-medium">
                          Mobile &amp; Native Android Engineering
                        </strong>
                        <span className="text-zinc-400 text-[11px] leading-relaxed">
                          Java Android architecture, offline synchronization, API-first token auth,
                          and enterprise management dashboards.
                        </span>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <Cpu className="size-4 text-[#ff9f1c] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-medium">
                          Custom CRM &amp; ERP Workflow Systems
                        </strong>
                        <span className="text-zinc-400 text-[11px] leading-relaxed">
                          End-to-end operational software: pipeline lead tracking, GST invoice
                          generators, inventory trackers, and role-based permissions.
                        </span>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <Bot className="size-4 text-[#ff9f1c] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-medium">
                          AI Automation &amp; WhatsApp Business Cloud
                        </strong>
                        <span className="text-zinc-400 text-[11px] leading-relaxed">
                          n8n pipelines, PostgreSQL state machines, conversational bots, and the
                          published <code>@mlhkinfotech/types</code> ecosystem.
                        </span>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <Server className="size-4 text-[#ff9f1c] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-medium">
                          Cloudflare Edge &amp; High-Throughput Web
                        </strong>
                        <span className="text-zinc-400 text-[11px] leading-relaxed">
                          Next.js 16 Turbopack, Cloudflare Workers runtime, D1 SQLite databases, and
                          zero-layout-shift motion engineering.
                        </span>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <Music className="size-4 text-[#ff9f1c] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-medium">
                          Creative Media &amp; Independent Music Artist
                        </strong>
                        <span className="text-zinc-400 text-[11px] leading-relaxed">
                          Independent audio and visual media production, UI branding systems, and
                          experimental digital storytelling.
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Verified Execution Credo Card */}
                <div className="mt-6 rounded-xl border border-[#ff9f1c]/20 bg-[#ff9f1c]/[0.04] p-4 text-xs">
                  <div className="flex items-center gap-2 text-[#ffb84d] font-semibold">
                    <ShieldCheck className="size-4" />
                    <span>The MLHK Engineering Credo</span>
                  </div>
                  <p className="mt-2 text-zinc-300 leading-relaxed text-[11px]">
                    &ldquo;Not language-dependent. Not design-limited. Every piece of software we
                    ship must pay for itself by automating labour, eliminating leaks, or capturing
                    revenue.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: NATIONAL MISSION & PRIDE IN BHARAT */}
        <div className="mx-auto mt-14 max-w-6xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.04] via-[#08090b] to-[#050607] p-8 md:p-12">
            {/* Subtle Tricolor Accent Line on Top */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#FF9933] via-white to-[#138808] opacity-85"
            />

            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs font-medium text-zinc-300">
                  <span className="text-sm">🇮🇳</span>
                  <span>Make in India • Digital India • Atmanirbhar Bharat</span>
                </div>

                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
                  Sovereign Digital Infrastructure Crafted in Bharat.
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-zinc-300 md:text-base">
                  For years, Indian enterprises and MSMEs have been trapped by proprietary overseas
                  software billed in foreign currency with rigid templates and third-party vendor
                  lock-in. MLHK Infotech was founded to offer a sovereign alternative: robust,
                  custom-engineered software built from Shajapur and Indore that belongs entirely to
                  the business.
                </p>

                <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                  We prove every day that tier-2 and tier-3 Indian engineers can architect software
                  that rivals Silicon Valley standards—fast, secure, and fully aligned with Indian
                  regulatory standards including the <strong>DPDP Act 2023</strong> and GST
                  invoicing protocols.
                </p>
              </div>

              {/* 4 Sovereign Pillars */}
              <div className="grid grid-cols-2 gap-3 shrink-0 sm:grid-cols-2 lg:w-96">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="font-display text-2xl font-bold text-[#ffb84d]">100%</p>
                  <p className="mt-1 text-xs font-semibold text-white">In-House Code</p>
                  <p className="mt-1 text-[11px] text-zinc-500">
                    Zero outsourced code, direct architect oversight.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="font-display text-2xl font-bold text-white">Tier-2/3</p>
                  <p className="mt-1 text-xs font-semibold text-white">Grassroots Power</p>
                  <p className="mt-1 text-[11px] text-zinc-500">
                    Engineered from Shajapur &amp; Indore, MP.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="font-display text-2xl font-bold text-emerald-400">Zero Lock-in</p>
                  <p className="mt-1 text-xs font-semibold text-white">Complete IP Transfer</p>
                  <p className="mt-1 text-[11px] text-zinc-500">
                    Client owns 100% of the deliverable code.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="font-display text-2xl font-bold text-[#ff9f1c]">Global</p>
                  <p className="mt-1 text-xs font-semibold text-white">Edge Distribution</p>
                  <p className="mt-1 text-[11px] text-zinc-500">
                    Sub-50ms speeds across 330+ edge locations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: THE COMPREHENSIVE 2020 → 2026 EVOLUTION (OUR JOURNEY) */}
        <div className="mx-auto mt-20 max-w-6xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">
                Detailed Historical Timeline
              </p>
              <h3 className="mt-2 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
                The 2020 → 2026 Evolution.
              </h3>
            </div>
            <p className="max-w-md text-xs text-zinc-400 md:text-right">
              From grassroots IT beginnings in Barnawad, Shajapur to an enterprise-grade cloud
              platform deployed on global edge networks.
            </p>
          </div>

          <div className="relative mt-12">
            {/* Timeline Vertical Guide Line */}
            <div
              aria-hidden
              className="absolute bottom-4 left-4 top-4 hidden w-px bg-gradient-to-b from-[#ff9f1c] via-white/20 to-emerald-500 md:block md:left-8"
            />

            <ol className="space-y-8 md:space-y-10">
              {TIMELINE.map((m, idx) => (
                <li
                  key={m.year}
                  className="group relative flex flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-6 transition-all duration-500 hover:border-[#ff9f1c]/40 hover:bg-white/[0.04] md:ml-16 md:p-8"
                >
                  {/* Indicator Dot on the vertical line */}
                  <span
                    aria-hidden
                    className="absolute -left-16 top-9 hidden size-4 -translate-x-1/2 rounded-full border-2 border-[#ff9f1c] bg-[#050607] shadow-[0_0_12px_#ff9f1c] group-hover:scale-125 transition-transform md:block"
                  />

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <time
                        dateTime={m.year}
                        className="font-display text-3xl font-bold text-[#ffb84d]"
                      >
                        {m.year}
                      </time>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-0.5 text-xs font-medium text-zinc-300">
                        {m.tag}
                      </span>
                    </div>

                    <span className="font-mono text-xs text-zinc-500">
                      Phase 0{idx + 1}
                    </span>
                  </div>

                  <h4 className="font-display text-xl font-bold text-white transition-colors group-hover:text-[#ffb84d]">
                    {m.title}
                  </h4>

                  <p className="text-sm leading-relaxed text-zinc-300">{m.event}</p>

                  {m.highlights && m.highlights.length > 0 && (
                    <div className="mt-2 pt-4 border-t border-white/5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 mb-2">
                        Key Deliverables &amp; Milestones:
                      </p>
                      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3 text-xs text-zinc-400">
                        {m.highlights.map((h) => (
                          <li key={h} className="flex items-center gap-2">
                            <CheckCircle2 className="size-3.5 text-[#ff9f1c] shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* SECTION 4: THE VENTURE ECOSYSTEM */}
        <div className="mx-auto mt-20 max-w-6xl">
          <div className="border-b border-white/10 pb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">
              Associated Ventures &amp; Platforms
            </p>
            <h3 className="mt-2 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              The MLHK Venture Ecosystem.
            </h3>
            <p className="mt-2 text-sm text-zinc-400">
              Specialized brand arms and platforms architected, managed, and digitally powered by
              MLHK Infotech.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VENTURES.map((v) => (
              <div
                key={v.name}
                className="group relative flex flex-col justify-between rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#ff9f1c]/40 hover:bg-white/[0.04]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#ffb84d]">
                      {v.badge}
                    </span>
                    <span className="font-mono text-[11px] text-zinc-500">{v.domain}</span>
                  </div>

                  <h4 className="mt-5 font-display text-xl font-bold text-white transition-colors group-hover:text-[#ffb84d]">
                    {v.name}
                  </h4>

                  <p className="mt-1 text-xs font-medium text-zinc-400">{v.sector}</p>

                  <p className="mt-3 text-xs leading-relaxed text-zinc-400">{v.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
                  <span>Powered by MLHK Core</span>
                  <Link
                    href="/subsidiaries"
                    className="inline-flex items-center gap-1 font-semibold text-[#ffb84d] hover:underline"
                  >
                    View Details <ArrowUpRight className="size-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: TECHNICAL STACK & ARCHITECTURAL STANDARDS */}
        <div className="mx-auto mt-20 max-w-6xl">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-8 md:p-10">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">
                  Engineering Arsenal
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">
                  Technologies We Build With.
                </h3>
              </div>
              <p className="text-xs text-zinc-500">Production-tested across enterprise environments.</p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TECH_STACK.map((group) => (
                <div
                  key={group.group}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffb84d]">
                    {group.group}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-zinc-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 6: ENTERPRISE COMMITMENTS (HOW WE WORK) */}
        <div className="mx-auto mt-20 max-w-6xl">
          <div className="border-b border-white/10 pb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">
              Operating Commitments
            </p>
            <h3 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">
              Why Businesses Rely on MLHK.
            </h3>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <span className="font-display text-xl font-bold text-[#ff9f1c]">01</span>
              <h4 className="mt-3 font-display text-base font-bold text-white">
                Scope Before Code
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Workflows, data models, and delivery milestones are agreed in advance. No unexpected
                scope creep or billing surprises.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <span className="font-display text-xl font-bold text-[#ff9f1c]">02</span>
              <h4 className="mt-3 font-display text-base font-bold text-white">
                No Vendor Lock-In
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                You receive 100% intellectual property rights, unencumbered source code, and clean
                documentation upon final settlement.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <span className="font-display text-xl font-bold text-[#ff9f1c]">03</span>
              <h4 className="mt-3 font-display text-base font-bold text-white">
                Founder Accountability
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Every project is architected with direct oversight from Hariom Vishwkarma. No
                subcontracting to faceless junior pools.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <span className="font-display text-xl font-bold text-[#ff9f1c]">04</span>
              <h4 className="mt-3 font-display text-base font-bold text-white">
                Post-Launch Stewardship
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                We stay with systems after rollout. Continuous security updates, database
                optimizations, and server monitoring.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 6.5: PRIMARY SOURCES & VERIFIABLE CITATIONS (WIKIPEDIA AUTHORITY MESH) */}
        <div className="mx-auto mt-20 max-w-6xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">
                Verifiable Entity Network • Primary Sources
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                Statutory Citations &amp; Authority Nodes
              </h3>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-zinc-400">
              Structured in accordance with encyclopedic citation standards. Every operational credential,
              founding record, and corporate filing is anchored directly to its public source of truth.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {/* Citation 1: MSME */}
            <a
              href={BRAND.udyamVerifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ff9f1c]/40 hover:bg-white/[0.04]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-[#ffb84d]">[1]</span>
                  <ExternalLink className="size-3 text-zinc-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ffb84d]" />
                </div>
                <h4 className="mt-2.5 font-display text-sm font-semibold text-white group-hover:text-[#ffb84d] transition-colors">
                  Ministry of MSME, Govt. of India
                </h4>
                <p className="mt-1 text-xs text-zinc-400">
                  Udyam Registration: <span className="font-mono text-zinc-300">{BRAND.udyamNumber}</span>
                </p>
              </div>
              <span className="mt-3 text-[10px] uppercase tracking-wider text-zinc-500 group-hover:text-zinc-400">
                Official National Register ↗
              </span>
            </a>

            {/* Citation 2: GSTIN */}
            <a
              href={BRAND.gstVerifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ff9f1c]/40 hover:bg-white/[0.04]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-[#ffb84d]">[2]</span>
                  <ExternalLink className="size-3 text-zinc-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ffb84d]" />
                </div>
                <h4 className="mt-2.5 font-display text-sm font-semibold text-white group-hover:text-[#ffb84d] transition-colors">
                  GST System / Commercial Tax
                </h4>
                <p className="mt-1 text-xs text-zinc-400">
                  Active GSTIN: <span className="font-mono text-zinc-300">{BRAND.gstin}</span>
                </p>
              </div>
              <span className="mt-3 text-[10px] uppercase tracking-wider text-zinc-500 group-hover:text-zinc-400">
                Taxpayer Search Portal ↗
              </span>
            </a>

            {/* Citation 3: Vikram University */}
            <a
              href={BRAND.universityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ff9f1c]/40 hover:bg-white/[0.04]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-[#ffb84d]">[3]</span>
                  <ExternalLink className="size-3 text-zinc-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ffb84d]" />
                </div>
                <h4 className="mt-2.5 font-display text-sm font-semibold text-white group-hover:text-[#ffb84d] transition-colors">
                  Vikram University, Ujjain
                </h4>
                <p className="mt-1 text-xs text-zinc-400">
                  Academic Alma Mater of Founder Hariom Vishwkarma (BCA / Computer Applications).
                </p>
              </div>
              <span className="mt-3 text-[10px] uppercase tracking-wider text-zinc-500 group-hover:text-zinc-400">
                Official University Portal ↗
              </span>
            </a>

            {/* Citation 4: Founder LinkedIn */}
            <a
              href={BRAND.founderLinkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ff9f1c]/40 hover:bg-white/[0.04]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-[#ffb84d]">[4]</span>
                  <ExternalLink className="size-3 text-zinc-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ffb84d]" />
                </div>
                <h4 className="mt-2.5 font-display text-sm font-semibold text-white group-hover:text-[#ffb84d] transition-colors">
                  Founder LinkedIn Authority Node
                </h4>
                <p className="mt-1 text-xs text-zinc-400">
                  <span className="font-mono text-zinc-300">in.linkedin.com/in/mlhkhariom</span> — verified profile &amp; architecture leadership.
                </p>
              </div>
              <span className="mt-3 text-[10px] uppercase tracking-wider text-zinc-500 group-hover:text-zinc-400">
                Professional Network ↗
              </span>
            </a>

            {/* Citation 5: Company LinkedIn */}
            <a
              href={BRAND.companyLinkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ff9f1c]/40 hover:bg-white/[0.04]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-[#ffb84d]">[5]</span>
                  <ExternalLink className="size-3 text-zinc-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ffb84d]" />
                </div>
                <h4 className="mt-2.5 font-display text-sm font-semibold text-white group-hover:text-[#ffb84d] transition-colors">
                  MLHK Infotech Corporate LinkedIn
                </h4>
                <p className="mt-1 text-xs text-zinc-400">
                  Enterprise organization entity listing and corporate updates.
                </p>
              </div>
              <span className="mt-3 text-[10px] uppercase tracking-wider text-zinc-500 group-hover:text-zinc-400">
                Corporate Page ↗
              </span>
            </a>

            {/* Citation 6: Crunchbase */}
            <a
              href={BRAND.crunchbaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ff9f1c]/40 hover:bg-white/[0.04]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-[#ffb84d]">[6]</span>
                  <ExternalLink className="size-3 text-zinc-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ffb84d]" />
                </div>
                <h4 className="mt-2.5 font-display text-sm font-semibold text-white group-hover:text-[#ffb84d] transition-colors">
                  Crunchbase Venture Profile
                </h4>
                <p className="mt-1 text-xs text-zinc-400">
                  Indexed company entry, industry categorization, and executive personnel registry.
                </p>
              </div>
              <span className="mt-3 text-[10px] uppercase tracking-wider text-zinc-500 group-hover:text-zinc-400">
                Global Venture Graph ↗
              </span>
            </a>

            {/* Citation 7: F6S */}
            <a
              href={BRAND.f6sUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ff9f1c]/40 hover:bg-white/[0.04]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-[#ffb84d]">[7]</span>
                  <ExternalLink className="size-3 text-zinc-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ffb84d]" />
                </div>
                <h4 className="mt-2.5 font-display text-sm font-semibold text-white group-hover:text-[#ffb84d] transition-colors">
                  F6S Technology Directory
                </h4>
                <p className="mt-1 text-xs text-zinc-400">
                  Startup and tech founder community listing with service offerings.
                </p>
              </div>
              <span className="mt-3 text-[10px] uppercase tracking-wider text-zinc-500 group-hover:text-zinc-400">
                Innovation Network ↗
              </span>
            </a>

            {/* Citation 8: Google Maps Geolocation */}
            <a
              href={BRAND.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ff9f1c]/40 hover:bg-white/[0.04]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-[#ffb84d]">[8]</span>
                  <ExternalLink className="size-3 text-zinc-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ffb84d]" />
                </div>
                <h4 className="mt-2.5 font-display text-sm font-semibold text-white group-hover:text-[#ffb84d] transition-colors">
                  Google Maps Geolocation Node
                </h4>
                <p className="mt-1 text-xs text-zinc-400">
                  Coordinates: <span className="font-mono text-zinc-300">{BRAND.geoLatitude}° N, {BRAND.geoLongitude}° E</span> (Barnawad, Shajapur HQ).
                </p>
              </div>
              <span className="mt-3 text-[10px] uppercase tracking-wider text-zinc-500 group-hover:text-zinc-400">
                Verified Map Pin ↗
              </span>
            </a>
          </div>
        </div>

        {/* SECTION 7: EXECUTIVE CTA & ENGAGEMENT DESK */}
        <div className="mx-auto mt-20 max-w-6xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-r from-white/[0.06] via-[#0b0c0e] to-white/[0.02] p-8 md:p-12 text-center shadow-[0_24px_80px_-24px_rgba(255,159,28,0.25)]">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
              Direct Engagement
            </span>

            <h3 className="mt-4 font-display text-3xl font-bold text-white md:text-4xl">
              Ready to Engineer Your System?
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-300">
              Whether you need an enterprise CRM/ERP platform, native Android app, high-throughput
              web application, or autonomous AI automation, let&apos;s build software that earns its
              keep.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-[#ff9f1c] py-3.5 pl-7 pr-2.5 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-[#ffb84d]"
              >
                Schedule Technical Consultation
                <span className="flex size-8 items-center justify-center rounded-full bg-black/10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="size-4" />
                </span>
              </Link>

              <a
                href="https://wa.me/919165100124"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-[#25D366] hover:bg-[#25D366]/10 hover:text-[#25D366]"
              >
                <span>Direct WhatsApp Chat</span>
                <ArrowUpRight className="size-4" />
              </a>
            </div>

            <p className="mt-6 text-xs text-zinc-500">
              Registered HQ: {BRAND.location} • Operations: {BRAND.operatingBase}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
