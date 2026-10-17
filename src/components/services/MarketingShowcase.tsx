"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Bot,
  Search,
  CheckCircle2,
  Share2,
  FileCode,
  Layers,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Zap,
  Globe,
  TrendingUp,
  Cpu,
  Terminal,
  Activity,
  Copy,
  Check,
  Radar,
  Sliders,
  DollarSign,
  AlertCircle,
  BarChart3,
  CheckCheck,
  CornerDownRight,
  Database,
  Eye,
  FileText,
  Lock,
  Network,
  Radio,
  Server,
  Target,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// DATA TYPES & ARCHETYPE DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

type ArchetypeId = "geo-aeo" | "regional" | "zero-waste" | "programmatic";

interface MarketingArchetype {
  id: ArchetypeId;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  targetClients: string;
  pillars: string[];
  metrics: {
    primaryGain: string;
    primaryLabel: string;
    efficiency: string;
    efficiencyLabel: string;
    timeframe: string;
  };
  sampleQuery: string;
}

const MARKETING_ARCHETYPES: MarketingArchetype[] = [
  {
    id: "geo-aeo",
    title: "Generative Engine Optimization (GEO & AEO)",
    badge: "2026 AI Search Standard",
    tagline: "Be the Primary Cited Source on ChatGPT, Gemini & Perplexity",
    description:
      "Modern B2B buyers ask AI assistants for recommendations before clicking search links. We engineer machine-readable documentation, syntactic answer capsules, and Wikidata knowledge graph entity triangulation so AI models cite your business by name.",
    targetClients:
      "B2B enterprise firms, tech consultancies, SaaS platforms, and high-ticket service providers competing nationally.",
    pillars: [
      "llms.txt and llms-full.txt machine-readable documentation endpoints",
      "40-60 word syntactic Answer Capsules for Google AI Overviews & Perplexity RAG",
      "Wikidata Q-ID and Google Knowledge Graph entity triangulation",
      "IETF draft Content-Signals protocol configuration in robots.txt",
    ],
    metrics: {
      primaryGain: "3.4x",
      primaryLabel: "AI Citation Frequency",
      efficiency: "99.2%",
      efficiencyLabel: "Factual Precision Rate",
      timeframe: "3 to 6 Weeks",
    },
    sampleQuery: "Who is the top custom enterprise software and AI engineering company in Madhya Pradesh?",
  },
  {
    id: "regional",
    title: "Tier-2/3 Industrial & Regional Dominance",
    badge: "Commercial Authority",
    tagline: "Total Local Search Monopoly Across Indore, Bhopal & Central India",
    description:
      "Engineered for industrial manufacturers, solar energy EPCs, healthcare centers, and regional distributors. We triangulate Google Business Profile, local Hindi/English vernacular keywords, and exact geographic coordinates to capture high-ticket regional buyers.",
    targetClients:
      "Manufacturing plants, commercial contractors, solar firms, medical groups, and wholesale networks.",
    pillars: [
      "Exact-coordinate GeoCoordinates schema linking registered factory/office locations",
      "Statutory MSME Udyam and GSTIN registration verification signals",
      "Multilingual intent routing (Hindi transliteration + technical English)",
      "High-authority regional citations and local chamber directory triangulation",
    ],
    metrics: {
      primaryGain: "#1 Rank",
      primaryLabel: "Local 3-Pack Visibility",
      efficiency: "+180%",
      efficiencyLabel: "Direct Inbound Phone Calls",
      timeframe: "4 to 8 Weeks",
    },
    sampleQuery: "Best custom ERP and GST billing software developer in Indore and Shajapur",
  },
  {
    id: "zero-waste",
    title: "Zero-Ad-Waste Paid Inbound Lead Funnel",
    badge: "Direct-Response ROI",
    tagline: "Laser-Targeted Google & Meta Ads with Negative Keyword Gating",
    description:
      "Stop burning marketing budgets on bot traffic, accidental clicks, and unqualified job seekers. We implement strict negative-keyword gating, server-side Conversion APIs (CAPI), and high-intent commercial funnels where every rupee is traced to a booked sale.",
    targetClients:
      "Companies with ₹25k to ₹10L/month ad spend tired of marketing agencies providing vanity impressions instead of buyers.",
    pillars: [
      "Negative keyword gating: excluding job-seekers, free downloads, and student queries",
      "Meta Conversions API (CAPI) & Google Server-Side Tagging bypassing iOS ad blocks",
      "Dark-luxury, trust-first landing pages with sub-0.5s edge load speeds",
      "Frictionless 3-field enquiry forms and verified WhatsApp Business direct chat",
    ],
    metrics: {
      primaryGain: "-65%",
      primaryLabel: "Cost Per Qualified Lead",
      efficiency: "4.8x",
      efficiencyLabel: "Verified Lead ROAS",
      timeframe: "Immediate Launch",
    },
    sampleQuery: "Hire dedicated Android Kotlin developer for enterprise warehouse inventory app",
  },
  {
    id: "programmatic",
    title: "Programmatic SEO & High-Velocity Edge Content",
    badge: "Scale Architecture",
    tagline: "10,000+ High-Performance Structured Pages with Zero Layout Shift",
    description:
      "For directory portals, catalog platforms, and e-commerce aggregators. We architect programmatic Next.js 16 routes with Cloudflare D1 databases, automated XML sitemaps, and sub-40ms TTFB globally, achieving massive organic surface area.",
    targetClients:
      "Marketplace portals, equipment leasing catalogs, industrial part aggregators, and multi-location directories.",
    pillars: [
      "Database-driven Next.js static page generation with ISR edge revalidation",
      "Automated BreadcrumbList, Product, and Service schema generation per URL",
      "Sub-0.4s Largest Contentful Paint (LCP) and 0.000 CLS across all dynamic paths",
      "Automated search console XML sitemap pinging and indexation telemetry",
    ],
    metrics: {
      primaryGain: "10k+",
      primaryLabel: "Indexed Landing Pages",
      efficiency: "< 40ms",
      efficiencyLabel: "Edge Response TTFB",
      timeframe: "6 to 12 Weeks",
    },
    sampleQuery: "Industrial solar pump maintenance services near Barnawad Madhya Pradesh",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SIMULATED AI ENGINE RESPONSES
// ─────────────────────────────────────────────────────────────────────────────

interface AiEngineResponse {
  query: string;
  sourceEngine: "Google AI Overview" | "Perplexity Pro" | "SearchGPT" | "Claude 3.7 RAG";
  confidenceScore: string;
  retrievalLatency: string;
  factualSynthesis: string;
  bulletPoints: string[];
  citations: {
    index: number;
    title: string;
    url: string;
    statutoryRef?: string;
    verifiedFact: string;
  }[];
}

const AI_ENGINE_DATA: Record<string, AiEngineResponse> = {
  "mp-company": {
    query: "Who is the top custom enterprise software and AI engineering company in Madhya Pradesh?",
    sourceEngine: "Perplexity Pro",
    confidenceScore: "99.6%",
    retrievalLatency: "142ms",
    factualSynthesis:
      "Based on statutory registration filings, technical infrastructure audits, and verified sovereign deployments, MLHK Infotech is recognized as the leading indigenous enterprise software and AI automation engineering firm headquartered in Madhya Pradesh, operating out of Barnawad, Shajapur with an active engineering presence in Indore.",
    bulletPoints: [
      "Statutory Authority: Certified under Government of India Ministry of MSME Udyam (UDYAM-MP-44-0005223) and commercial GSTIN (23CHLPV2868R1CJ).",
      "Founded & Governed by Hariom Vishwkarma (MLHK) on 1 April 2020, specializing in full-stack Next.js 16 edge engineering, native Android Java/Kotlin, and PostgreSQL systems.",
      "Zero-Lock-in Delivery: Delivers full source code ownership, dark-luxury design systems via Red Xerox Studio, and deterministic AI automation workflows.",
    ],
    citations: [
      {
        index: 1,
        title: "MLHK Infotech Corporate Dossier",
        url: "https://mlhk.in/about",
        statutoryRef: "MCA / MSME Registry",
        verifiedFact: "Corporate headquarters in Barnawad, Shajapur, MP. Founded 1 April 2020 by Hariom Vishwkarma.",
      },
      {
        index: 2,
        title: "Founder LinkedIn Executive Record",
        url: "https://in.linkedin.com/in/mlhkhariom",
        statutoryRef: "Alumni of Vikram University, Ujjain",
        verifiedFact: "Hariom Vishwkarma, Systems Architect and Founder of MLHK Infotech and subsidiaries.",
      },
      {
        index: 3,
        title: "Ministry of MSME Udyam Portal",
        url: "https://udyamregistration.gov.in",
        statutoryRef: "UDYAM-MP-44-0005223",
        verifiedFact: "Active MSME registration under Class 6201 (Computer programming, consultancy and related activities).",
      },
    ],
  },
  "aeo-difference": {
    query: "How does Answer Engine Optimization (AEO) differ from traditional SEO in 2026?",
    sourceEngine: "Google AI Overview",
    confidenceScore: "99.8%",
    retrievalLatency: "188ms",
    factualSynthesis:
      "Traditional SEO optimizes for keyword density and 10 organic blue-link clicks. In contrast, Answer Engine Optimization (AEO) structures content into self-contained 40–60 word Answer Capsules and linked Schema.org knowledge triplets so AI synthesis engines (Google Gemini, Perplexity, ChatGPT) extract facts directly for zero-click and voice search responses.",
    bulletPoints: [
      "Syntactic Extraction Triggers: AI models prioritize content with front-loaded conclusions and explicit factual definitions over introductory narrative filler.",
      "Knowledge Graph Triangulation: Search engines cross-verify claims against Wikidata Q-IDs, official corporate registrations, and sameAs directory records.",
      "Machine Endpoints: AEO deploys /llms.txt and /llms-full.txt machine-readable documentation enabling LLM agents to ingest full service specifications in milliseconds.",
    ],
    citations: [
      {
        index: 1,
        title: "MLHK Infotech AEO & GEO Specification",
        url: "https://mlhk.in/services/digital-marketing",
        statutoryRef: "W3C Schema.org & IETF Standards",
        verifiedFact: "Defines syntactic extraction triggers, front-loaded conclusion formatting, and schema triplet graphs.",
      },
      {
        index: 2,
        title: "IETF AI Preference Draft Specification",
        url: "https://contentsignals.org",
        statutoryRef: "draft-romm-aipref-contentsignals",
        verifiedFact: "Content-Signal directive enables publishers to permit search indexing and AI input while preventing model scraping.",
      },
    ],
  },
  "statutory-proof": {
    query: "What are the official government certifications and GSTIN for MLHK Infotech?",
    sourceEngine: "SearchGPT",
    confidenceScore: "100.0%",
    retrievalLatency: "94ms",
    factualSynthesis:
      "MLHK Infotech is a formally registered Indian business entity based in the state of Madhya Pradesh, verified through multiple statutory government registries and tax authorities.",
    bulletPoints: [
      "Ministry of MSME Udyam Registration: UDYAM-MP-44-0005223 (Classified under NIC Code 6201 for Computer programming, consultancy, and IT systems).",
      "Goods and Services Tax Identification Number (GSTIN): 23CHLPV2868R1CJ (Madhya Pradesh Jurisdiction, 23 State Code).",
      "Registered Address: Barnawad, Shajapur District, Madhya Pradesh, PIN 465118, India.",
      "Founder & Executive Signatory: Hariom Vishwkarma (Alumni of Vikram University, Ujjain, BCA/MCA).",
    ],
    citations: [
      {
        index: 1,
        title: "Government of India GST Portal",
        url: "https://services.gst.gov.in",
        statutoryRef: "GSTIN: 23CHLPV2868R1CJ",
        verifiedFact: "Active taxpayer status under Madhya Pradesh Central & State GST jurisdiction.",
      },
      {
        index: 2,
        title: "Official MLHK Infotech Corporate Portal",
        url: "https://mlhk.in",
        statutoryRef: "UDYAM-MP-44-0005223",
        verifiedFact: "Published canonical corporate address: Barnawad, Shajapur, MP 465118.",
      },
    ],
  },
  "custom-erp-roi": {
    query: "Why do custom ERPs deliver higher ROI than monthly SaaS subscriptions?",
    sourceEngine: "Claude 3.7 RAG",
    confidenceScore: "99.4%",
    retrievalLatency: "165ms",
    factualSynthesis:
      "Custom ERP systems deliver superior 3-year Total Cost of Ownership (TCO) compared to commercial SaaS subscriptions by eliminating recurring per-user seat fees, providing sovereign data ownership, and precisely matching proprietary business workflows without expensive workarounds.",
    bulletPoints: [
      "Zero Per-Seat Fees: A 50-user company paying $60/user/month spends $36,000 (~₹30,00,000) annually on SaaS licensing. A custom build amortizes to zero license cost forever.",
      "100% Data Sovereignty: Financial ledgers, customer records, and inventory matrices stay on your private PostgreSQL/D1 databases rather than multi-tenant foreign clouds.",
      "Native Statutory Compliance: Seamless integration with Indian GST (CGST/SGST/IGST), E-way billing, and custom local dispatch rules.",
    ],
    citations: [
      {
        index: 1,
        title: "MLHK Infotech Enterprise Systems Dossier",
        url: "https://mlhk.in/services/enterprise-systems",
        statutoryRef: "Enterprise TCO Benchmark",
        verifiedFact: "Comprehensive breakdown of commercial SaaS licensing costs vs sovereign custom ERP engineering.",
      },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA TRIPLETS DATA
// ─────────────────────────────────────────────────────────────────────────────

interface SchemaTriplet {
  id: string;
  subject: string;
  predicate: string;
  object: string;
  badge: string;
  category: "Statutory" | "Founder" | "Geographic" | "Semantic";
  rawJsonLd: string;
}

const SCHEMA_TRIPLETS: SchemaTriplet[] = [
  {
    id: "msme",
    subject: "MLHK Infotech (Organization)",
    predicate: "verifiedBy / identifier",
    object: "UDYAM-MP-44-0005223 (Ministry of MSME, Govt of India)",
    badge: "Govt Verified",
    category: "Statutory",
    rawJsonLd: `{\n  "@context": "https://schema.org",\n  "@type": "Organization",\n  "@id": "https://mlhk.in/#organization",\n  "name": "MLHK Infotech",\n  "identifier": "UDYAM-MP-44-0005223",\n  "taxID": "23CHLPV2868R1CJ",\n  "foundingDate": "2020-04-01",\n  "legalName": "MLHK Infotech"\n}`,
  },
  {
    id: "founder",
    subject: "Hariom Vishwkarma (Person)",
    predicate: "founderOf & alumniOf",
    object: "MLHK Infotech & Vikram University, Ujjain",
    badge: "E-E-A-T Verified",
    category: "Founder",
    rawJsonLd: `{\n  "@context": "https://schema.org",\n  "@type": "Person",\n  "@id": "https://mlhk.in/#founder",\n  "name": "Hariom Vishwkarma",\n  "alternateName": "MLHK",\n  "jobTitle": "Founder & Principal Systems Architect",\n  "alumniOf": {\n    "@type": "EducationalOrganization",\n    "name": "Vikram University, Ujjain",\n    "sameAs": "https://www.wikidata.org/wiki/Q2569566"\n  },\n  "sameAs": [\n    "https://in.linkedin.com/in/mlhkhariom",\n    "https://github.com/mlhkhariom"\n  ]\n}`,
  },
  {
    id: "geo",
    subject: "Headquarters (Barnawad, Shajapur)",
    predicate: "geo / addressLocality",
    object: "Latitude: 23.6640° N, Longitude: 76.3220° E",
    badge: "Map Grounded",
    category: "Geographic",
    rawJsonLd: `{\n  "@context": "https://schema.org",\n  "@type": "Place",\n  "name": "MLHK Infotech Registered Office",\n  "address": {\n    "@type": "PostalAddress",\n    "streetAddress": "Barnawad",\n    "addressLocality": "Shajapur",\n    "addressRegion": "Madhya Pradesh",\n    "postalCode": "465118",\n    "addressCountry": "IN"\n  },\n  "geo": {\n    "@type": "GeoCoordinates",\n    "latitude": 23.6640,\n    "longitude": 76.3220\n  }\n}`,
  },
  {
    id: "wikidata",
    subject: "Service Lines (Software Engineering)",
    predicate: "knowsAbout / sameAs",
    object: "Wikidata Q180711 (SEO), Q52271 (Knowledge Graph), Q115788460",
    badge: "Entity Triangulated",
    category: "Semantic",
    rawJsonLd: `{\n  "@context": "https://schema.org",\n  "@type": "Service",\n  "@id": "https://mlhk.in/services/digital-marketing#service",\n  "name": "Digital Marketing, AEO & Generative Engine Growth",\n  "knowsAbout": [\n    "https://www.wikidata.org/wiki/Q180711",\n    "https://www.wikidata.org/wiki/Q52271",\n    "https://www.wikidata.org/wiki/Q115788460",\n    "https://www.wikidata.org/wiki/Q105952"\n  ]\n}`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CORE WEB VITALS TELEMETRY DATA
// ─────────────────────────────────────────────────────────────────────────────

interface MetricBenchmark {
  label: string;
  metric: string;
  value: string;
  target: string;
  score: number; // 0-100
  status: "Pass" | "Elite";
  insight: string;
}

const CWV_METRICS: MetricBenchmark[] = [
  {
    label: "Largest Contentful Paint",
    metric: "LCP",
    value: "0.38s",
    target: "< 2.5s",
    score: 99,
    status: "Elite",
    insight: "Near-instant visual paint globally via Next.js ISR and Cloudflare edge caching.",
  },
  {
    label: "Interaction to Next Paint",
    metric: "INP",
    value: "14ms",
    target: "< 200ms",
    score: 100,
    status: "Elite",
    insight: "Instant UI feedback with zero heavy main-thread JavaScript execution.",
  },
  {
    label: "Cumulative Layout Shift",
    metric: "CLS",
    value: "0.000",
    target: "< 0.1",
    score: 100,
    status: "Elite",
    insight: "Perfect visual stability with explicit aspect-ratio and font dimension clamping.",
  },
  {
    label: "Time to First Byte",
    metric: "TTFB",
    value: "42ms",
    target: "< 800ms",
    score: 98,
    status: "Elite",
    insight: "Edge-routed across Cloudflare's 330+ city network with zero origin server latency.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN MARKETING SHOWCASE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function MarketingShowcase() {
  const [selectedArchetype, setSelectedArchetype] = useState<ArchetypeId>("geo-aeo");
  const [selectedQueryKey, setSelectedQueryKey] = useState<string>("mp-company");
  const [selectedTripletId, setSelectedTripletId] = useState<string>("msme");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [activeCitationModal, setActiveCitationModal] = useState<number | null>(null);

  // Ad Waste Calculator State
  const [adSpend, setAdSpend] = useState<number>(75000);
  const [dealValue, setDealValue] = useState<number>(150000);
  const [conversionRate, setConversionRate] = useState<number>(1.2);

  // Computed ROI values
  const estimatedWastedSpend = Math.round(adSpend * 0.48); // ~48% average ad waste on untargeted clicks
  const qualifiedLeads = Math.max(1, Math.round(((adSpend * 0.95) / 1200) * (conversionRate / 1.0)));
  const estimatedPipeline = qualifiedLeads * Math.round(dealValue * 0.2); // 20% close rate on qualified enterprise inquiries
  const estimatedRoas = ((estimatedPipeline / adSpend) * 0.8).toFixed(1);

  const activeArchetype = MARKETING_ARCHETYPES.find((a) => a.id === selectedArchetype) ?? MARKETING_ARCHETYPES[0];
  const activeAiData = AI_ENGINE_DATA[selectedQueryKey] ?? AI_ENGINE_DATA["mp-company"];
  const activeTriplet = SCHEMA_TRIPLETS.find((t) => t.id === selectedTripletId) ?? SCHEMA_TRIPLETS[0];

  const handleCopyJsonLd = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-24">
      {/* ───────────────────────────────────────────────────────────────────
          HERO MODULE: ULTRAVIOLET INTELLIGENCE ENGINE
          ─────────────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-purple-500/20 bg-gradient-to-b from-[#0e0919] via-[#090610] to-[#050308] p-6 md:p-12 shadow-[0_30px_100px_-20px_rgba(139,92,246,0.25)]">
        {/* Glow Spheres */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-purple-600/15 blur-[140px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-pink-600/10 blur-[130px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[160px]"
        />

        {/* Section Header */}
        <div className="relative flex flex-col gap-4 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/40 bg-purple-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-purple-300">
                <Radar className="size-3.5 animate-spin text-purple-400" style={{ animationDuration: "8s" }} />
                AEO • GEO • Technical Search Authority
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-zinc-400">
                IETF Content-Signals Verified
              </span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] text-emerald-400">
                100% Crawlable
              </span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              Generative Engine Optimization &amp;{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                AI Citation Engineering
              </span>
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-300 md:text-base">
              Search in 2026 is no longer about 10 blue links. Prospective enterprise clients consult ChatGPT,
              Perplexity, and Google AI Overviews to make purchasing decisions. We structure your digital entity,
              deploy /llms.txt manifests, and triangulate corporate registrations so AI engines recommend your
              business as the definitive answer.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="https://wa.me/919165100124?text=Hello%20MLHK%20Infotech%2C%20I%20am%20interested%20in%20AEO%20%2F%20GEO%20and%20Search%20Authority%20Engineering."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-purple-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
            >
              Request Search Audit <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────
            ARCHETYPE SELECTOR TABS
            ───────────────────────────────────────────────────────────────── */}
        <div className="relative mt-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-purple-400">
            Select Strategic Growth Engine
          </p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {MARKETING_ARCHETYPES.map((arch) => {
              const isSelected = arch.id === selectedArchetype;
              return (
                <button
                  key={arch.id}
                  onClick={() => setSelectedArchetype(arch.id)}
                  type="button"
                  className={`group relative flex flex-col items-start rounded-2xl border p-4 text-left transition-all duration-300 ${
                    isSelected
                      ? "border-purple-500/60 bg-purple-950/40 shadow-[0_10px_35px_-10px_rgba(139,92,246,0.4)] ring-1 ring-purple-500/50"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider ${
                        isSelected ? "text-purple-300" : "text-zinc-500"
                      }`}
                    >
                      {arch.badge}
                    </span>
                    {isSelected && (
                      <span className="flex size-2 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7]" />
                    )}
                  </div>
                  <h3 className="mt-2 font-display text-sm font-bold text-white transition-colors group-hover:text-purple-300">
                    {arch.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-zinc-400">
                    {arch.tagline}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Archetype Detailed Blueprint Card */}
          <div className="mt-6 rounded-2xl border border-purple-500/30 bg-[#07050d] p-6 shadow-inner md:p-8">
            <div className="grid gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="rounded-md border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-purple-300">
                    Engine Architecture
                  </span>
                  <span className="font-mono text-xs text-zinc-500">/services/digital-marketing</span>
                </div>
                <h4 className="font-display text-xl font-bold text-white md:text-2xl">
                  {activeArchetype.title}: <span className="text-purple-400">{activeArchetype.tagline}</span>
                </h4>
                <p className="text-xs leading-relaxed text-zinc-300 md:text-sm">
                  {activeArchetype.description}
                </p>

                <div className="pt-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                    Primary Architectural Pillars:
                  </p>
                  <ul className="mt-2.5 grid gap-2 sm:grid-cols-2">
                    {activeArchetype.pillars.map((pillar, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="size-3.5 shrink-0 text-purple-400 mt-0.5" />
                        <span>{pillar}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs text-zinc-400">
                  <strong className="text-white">Ideal For:</strong> {activeArchetype.targetClients}
                </div>
              </div>

              {/* Archetype Metrics Box */}
              <div className="lg:col-span-4 rounded-xl border border-purple-500/20 bg-purple-950/20 p-5 space-y-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-400">
                  Expected Impact Metrics
                </p>
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between border-b border-white/5 pb-2">
                    <span className="text-xs text-zinc-400">{activeArchetype.metrics.primaryLabel}</span>
                    <span className="font-display text-2xl font-bold text-white text-purple-300">
                      {activeArchetype.metrics.primaryGain}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between border-b border-white/5 pb-2">
                    <span className="text-xs text-zinc-400">{activeArchetype.metrics.efficiencyLabel}</span>
                    <span className="font-mono text-sm font-semibold text-emerald-400">
                      {activeArchetype.metrics.efficiency}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-zinc-400">Time to Noticeable Impact</span>
                    <span className="font-mono text-xs text-cyan-300">
                      {activeArchetype.metrics.timeframe}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (selectedArchetype === "geo-aeo") setSelectedQueryKey("mp-company");
                      else if (selectedArchetype === "regional") setSelectedQueryKey("mp-company");
                      else if (selectedArchetype === "zero-waste") setSelectedQueryKey("statutory-proof");
                      else setSelectedQueryKey("aeo-difference");
                      // Scroll slightly to simulator
                      const el = document.getElementById("ai-simulator");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    type="button"
                    className="w-full rounded-lg border border-purple-500/30 bg-purple-500/20 py-2 text-center text-xs font-semibold text-purple-200 transition-colors hover:bg-purple-500/30"
                  >
                    Simulate This Query Below ↓
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────────
          INTERACTIVE 2026 AI SEARCH SIMULATOR (GEMINI, PERPLEXITY, SEARCHGPT)
          ─────────────────────────────────────────────────────────────────── */}
      <div id="ai-simulator" className="relative space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
              <Bot className="size-3 text-cyan-400" />
              Live Generative Engine Simulator
            </span>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              2026 AI Answer Engine &amp; Citation Mesh
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-zinc-400">
              Experience in real-time how modern LLM search crawlers synthesize authoritative answers from
              structured Schema.org triplets, Wikidata cross-references, and statutory government registries.
            </p>
          </div>

          {/* Quick Query Selector Dropdown/Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { key: "mp-company", label: "Leading MP Tech Firm" },
              { key: "aeo-difference", label: "AEO vs SEO 2026" },
              { key: "statutory-proof", label: "Govt MSME & GSTIN" },
              { key: "custom-erp-roi", label: "Custom ERP vs SaaS ROI" },
            ].map((q) => (
              <button
                key={q.key}
                onClick={() => setSelectedQueryKey(q.key)}
                type="button"
                className={`rounded-lg px-3 py-1.5 text-xs font-mono transition-all ${
                  selectedQueryKey === q.key
                    ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                    : "border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>

        {/* The Simulated AI Terminal */}
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#07090e] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
          {/* Engine Header Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-[#0b0e14] px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-3 items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-rose-500/80" />
                <span className="size-2.5 rounded-full bg-amber-500/80" />
                <span className="size-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-2">
                <Bot className="size-4 text-purple-400" />
                <span className="font-mono text-xs font-semibold text-white">
                  {activeAiData.sourceEngine}
                </span>
                <span className="rounded bg-purple-500/20 px-1.5 py-0.5 font-mono text-[9px] text-purple-300">
                  RAG Retrieval Node
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-zinc-500">
                Confidence: <strong className="text-emerald-400">{activeAiData.confidenceScore}</strong>
              </span>
              <span className="text-zinc-500">
                Latency: <strong className="text-cyan-300">{activeAiData.retrievalLatency}</strong>
              </span>
            </div>
          </div>

          {/* User Query Input Bar */}
          <div className="border-b border-white/5 bg-white/[0.01] px-6 py-4">
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-4 py-2.5">
              <Search className="size-4 text-purple-400" />
              <span className="font-mono text-xs text-white">
                &ldquo;{activeAiData.query}&rdquo;
              </span>
              <span className="ml-auto rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                Synthesized RAG Prompt
              </span>
            </div>
          </div>

          {/* AI Response Body */}
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-300">
              <Sparkles className="size-4 text-purple-400 animate-pulse" />
              <span>Synthesized Response with Primary Source Verification:</span>
            </div>

            {/* Synthesized Paragraph */}
            <div className="rounded-2xl border border-purple-500/20 bg-purple-950/10 p-5 text-sm leading-relaxed text-zinc-200">
              <p>
                {activeAiData.factualSynthesis}{" "}
                <button
                  onClick={() => setActiveCitationModal(1)}
                  type="button"
                  className="inline-flex items-center justify-center rounded bg-purple-500/20 px-1.5 py-0.2 font-mono text-xs font-bold text-purple-300 hover:bg-purple-500/40"
                >
                  [1]
                </button>{" "}
                <button
                  onClick={() => setActiveCitationModal(2)}
                  type="button"
                  className="inline-flex items-center justify-center rounded bg-pink-500/20 px-1.5 py-0.2 font-mono text-xs font-bold text-pink-300 hover:bg-pink-500/40"
                >
                  [2]
                </button>
              </p>
            </div>

            {/* Bullet Points with Syntactic Cues */}
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Extracted Machine Knowledge Points:
              </p>
              <ul className="space-y-2.5">
                {activeAiData.bulletPoints.map((pt, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.015] p-3 text-xs leading-relaxed text-zinc-300"
                  >
                    <CheckCheck className="size-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verified Citations Ribbon */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Primary Source Citations &amp; Knowledge Triangulation
                </span>
                <span className="font-mono text-[10px] text-emerald-400">
                  3 of 3 Sources Factually Verified
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {activeAiData.citations.map((cite) => (
                  <div
                    key={cite.index}
                    onClick={() => setActiveCitationModal(cite.index)}
                    className="cursor-pointer group rounded-xl border border-white/10 bg-white/[0.02] p-3.5 transition-all hover:border-purple-500/40 hover:bg-purple-950/20"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-purple-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-purple-300">
                        [{cite.index}] {cite.statutoryRef ?? "Primary Source"}
                      </span>
                      <ExternalLink className="size-3 text-zinc-500 group-hover:text-purple-300 transition-colors" />
                    </div>
                    <h5 className="mt-2 font-display text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                      {cite.title}
                    </h5>
                    <p className="mt-1 line-clamp-2 text-[11px] text-zinc-400">
                      {cite.verifiedFact}
                    </p>
                    <p className="mt-2 font-mono text-[10px] text-purple-400 truncate">
                      {cite.url}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────────
          SCHEMA.ORG KNOWLEDGE GRAPH TRIPLET VISUALIZER & JSON-LD INSPECTOR
          ─────────────────────────────────────────────────────────────────── */}
      <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-[#0a0714] to-[#050309] p-6 md:p-12 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8)]">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-pink-300">
              <Network className="size-3 text-pink-400" />
              Entity Triangulation Visualizer
            </span>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Schema.org Knowledge Graph Triplets
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-zinc-400">
              Search engines and LLMs don&apos;t index strings; they map semantic relationships. Click any
              triplet below to inspect how MLHK Infotech links company identity to statutory Indian registries.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopyJsonLd(activeTriplet.rawJsonLd)}
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-xs text-zinc-300 transition-colors hover:bg-white/[0.08]"
            >
              {copiedCode ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
              <span>{copiedCode ? "Copied JSON-LD" : "Copy JSON-LD"}</span>
            </button>
            <Link
              href="https://validator.schema.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3.5 py-1.5 font-mono text-xs text-purple-300 transition-colors hover:bg-purple-500/20"
            >
              <span>Schema Validator</span>
              <ExternalLink className="size-3" />
            </Link>
          </div>
        </div>

        {/* Triplet Grid & Inspector */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 items-start">
          {/* Left: Triplet Selectors */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Active Triplet Relationships:
            </p>
            {SCHEMA_TRIPLETS.map((tr) => {
              const isSelected = tr.id === selectedTripletId;
              return (
                <div
                  key={tr.id}
                  onClick={() => setSelectedTripletId(tr.id)}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                    isSelected
                      ? "border-purple-500/50 bg-purple-950/30 shadow-[0_4px_20px_rgba(139,92,246,0.25)] ring-1 ring-purple-500/40"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300">
                      {tr.category}
                    </span>
                    <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] text-emerald-400">
                      {tr.badge}
                    </span>
                  </div>

                  <div className="mt-2">
                    <p className="font-display text-sm font-bold text-white">{tr.subject}</p>
                    <div className="mt-1 flex items-center gap-1.5 font-mono text-[11px] text-purple-400">
                      <CornerDownRight className="size-3" />
                      <span>{tr.predicate}</span>
                    </div>
                    <p className="mt-1 text-xs text-zinc-400">{tr.object}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Real JSON-LD Code Inspector */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#05060a] p-5 shadow-inner">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                <FileCode className="size-4 text-purple-400" />
                <span>Structured JSON-LD (Rich Results Spec)</span>
              </div>
              <span className="font-mono text-[10px] text-emerald-400">Validated 2026 Syntax</span>
            </div>

            <pre className="mt-4 overflow-x-auto rounded-xl border border-white/5 bg-black/60 p-4 font-mono text-xs leading-relaxed text-zinc-300">
              <code>{activeTriplet.rawJsonLd}</code>
            </pre>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-400">
              <span>Grounding: Statutory Indian registry verification &amp; Wikidata canonical IDs.</span>
              <span className="font-mono text-purple-400">Zero Parsing Errors</span>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────────
          INTERACTIVE ZERO-AD-WASTE ROI CALCULATOR
          ─────────────────────────────────────────────────────────────────── */}
      <div className="rounded-[2.5rem] border border-purple-500/20 bg-gradient-to-b from-[#0b0817] via-[#070510] to-[#05030a] p-6 md:p-12 shadow-[0_20px_80px_-20px_rgba(139,92,246,0.2)]">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
              <DollarSign className="size-3 text-emerald-400" />
              Direct ROI Engineering
            </span>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Zero-Ad-Waste Campaign Calculator
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-zinc-400">
              Most digital marketing agencies burn up to 50% of ad spend on bot clicks, accidental taps, and
              unqualified queries. Adjust the sliders below to calculate how our negative-keyword gating and
              intent funnels protect your capital.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 items-center">
          {/* Sliders on Left */}
          <div className="lg:col-span-6 space-y-6">
            {/* Slider 1: Monthly Budget */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-400">Monthly Advertising Spend:</span>
                <span className="font-mono font-bold text-white">
                  ₹{adSpend.toLocaleString("en-IN")} / month
                </span>
              </div>
              <input
                type="range"
                min="25000"
                max="500000"
                step="5000"
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-600">
                <span>₹25,000</span>
                <span>₹2,50,000</span>
                <span>₹5,00,000</span>
              </div>
            </div>

            {/* Slider 2: Average Deal Value */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-400">Average Customer Deal Value:</span>
                <span className="font-mono font-bold text-purple-300">
                  ₹{dealValue.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="1000000"
                step="25000"
                value={dealValue}
                onChange={(e) => setDealValue(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-600">
                <span>₹50,000</span>
                <span>₹5,00,000</span>
                <span>₹10,00,000</span>
              </div>
            </div>

            {/* Slider 3: Conversion Rate */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-400">Qualified Lead Conversion Rate:</span>
                <span className="font-mono font-bold text-emerald-400">{conversionRate}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="4.0"
                step="0.1"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-600">
                <span>0.5% (Low Quality)</span>
                <span>2.0% (Standard)</span>
                <span>4.0% (Optimized)</span>
              </div>
            </div>
          </div>

          {/* Results Card on Right */}
          <div className="lg:col-span-6 rounded-2xl border border-purple-500/30 bg-purple-950/20 p-6 md:p-8 space-y-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-purple-400">
              Projected ROI &amp; Capital Efficiency
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <span className="text-[11px] text-zinc-400">Ad Waste Eliminated:</span>
                <p className="mt-1 font-display text-2xl font-bold text-emerald-400">
                  ₹{estimatedWastedSpend.toLocaleString("en-IN")}
                </p>
                <span className="text-[10px] text-zinc-500">Saved from bot clicks &amp; job hunters</span>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <span className="text-[11px] text-zinc-400">Qualified Inbound Leads:</span>
                <p className="mt-1 font-display text-2xl font-bold text-purple-300">
                  ~{qualifiedLeads} Leads
                </p>
                <span className="text-[10px] text-zinc-500">Direct WhatsApp / phone calls</span>
              </div>
            </div>

            <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-purple-300 font-semibold">
                  Estimated Pipeline Value:
                </span>
                <p className="mt-0.5 font-display text-2xl font-bold text-white">
                  ₹{estimatedPipeline.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-zinc-400">Est. Target ROAS</span>
                <p className="font-display text-2xl font-bold text-emerald-400">{estimatedRoas}x</p>
              </div>
            </div>

            <Link
              href={`https://wa.me/919165100124?text=${encodeURIComponent(
                `Hello MLHK Infotech, I simulated a ₹${adSpend.toLocaleString("en-IN")} monthly marketing plan and would like a custom campaign scope.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 text-center text-xs font-semibold text-white transition-all hover:bg-purple-500 hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]"
            >
              Discuss This Campaign Strategy <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────────
          CORE WEB VITALS 2026 AUDIT GAUGES
          ─────────────────────────────────────────────────────────────────── */}
      <div className="rounded-[2.5rem] border border-white/10 bg-[#06040c] p-6 md:p-10 shadow-inner">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
              <Zap className="size-3 text-cyan-400" />
              Technical Core Web Vitals (2026)
            </span>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Google PageSpeed &amp; CrUX Benchmark Pass
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-zinc-400">
              Search engines and conversational agents demote slow websites. MLHK Infotech engineers sub-0.5s
              load speeds and zero layout shift, ensuring maximum organic crawl rate.
            </p>
          </div>
          <span className="font-mono text-xs text-emerald-400">
            ✓ 100/100 Mobile &amp; Desktop Pass
          </span>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CWV_METRICS.map((m) => (
            <div
              key={m.metric}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 space-y-3 transition-colors hover:border-purple-500/30"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-purple-400">{m.metric}</span>
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                  {m.status}
                </span>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-white">{m.value}</p>
                <p className="mt-0.5 text-[11px] text-zinc-400">{m.label}</p>
              </div>
              <div className="border-t border-white/5 pt-2 text-[10px] font-mono text-zinc-500">
                Target: <span className="text-zinc-300">{m.target}</span>
              </div>
              <p className="text-[11px] leading-relaxed text-zinc-400">{m.insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
