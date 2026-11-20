export type CaseStudyCategory =
  | "E-Commerce & Retail"
  | "Enterprise & Field Ops"
  | "Publishing & Media"
  | "Branding & UI";

export interface ArchitectureNode {
  layer: string;
  tech: string;
  role: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: CaseStudyCategory;
  period: string;
  location: string;
  image: string;
  imageAlt: string;
  url: string;
  external: boolean;
  challenge: string;
  solution: string;
  outcomes: {
    metric: string;
    label: string;
  }[];
  architecture: ArchitectureNode[];
  stack: string[];
  clientQuote: {
    text: string;
    author: string;
    role: string;
  };
}

export const CASE_STUDY_CATEGORIES: readonly ("All Work" | CaseStudyCategory)[] = [
  "All Work",
  "E-Commerce & Retail",
  "Enterprise & Field Ops",
  "Publishing & Media",
  "Branding & UI",
] as const;

export const VERIFIED_CASE_STUDIES: readonly CaseStudy[] = [
  {
    id: "case-iksc",
    slug: "iksc-india",
    title: "IKSC India (iksc.in)",
    subtitle: "India Ka Shopping Centre — Tier-2 & Tier-3 Retail Commerce",
    category: "E-Commerce & Retail",
    period: "2022 – Active",
    location: "Madhya Pradesh & Pan-India",
    image: "/images/showcase/case-iksc.jpg",
    imageAlt: "IKSC India dark obsidian and warm amber e-commerce storefront on laptop and smartphone",
    url: "https://iksc.in",
    external: true,
    challenge:
      "Shoppers in Tier-2 and Tier-3 towns abandoned heavy e-commerce templates on 3G/4G mobile connections and preferred confirming bulk or local orders directly on WhatsApp.",
    solution:
      "Engineered a lean Next.js & MySQL retail platform with instant category filters, real-time stock tracking, Razorpay UPI checkout, and one-tap WhatsApp order dispatch.",
    outcomes: [
      { metric: "< 0.9s", label: "Mobile 4G First Paint" },
      { metric: "1-Tap", label: "WhatsApp Order Dispatch" },
      { metric: "100%", label: "Custom Owned Codebase" },
    ],
    architecture: [
      { layer: "Storefront", tech: "Next.js + Edge Cache", role: "Sub-second catalog browsing on mobile networks" },
      { layer: "Commerce DB", tech: "MySQL + REST API", role: "Live SKU counts, category pricing & order ledger" },
      { layer: "Checkout", tech: "Razorpay UPI + WhatsApp", role: "Dual online payment & direct WhatsApp confirmation" },
    ],
    stack: ["Next.js", "MySQL", "Razorpay UPI", "WhatsApp API", "SEO Schema"],
    clientQuote: {
      text: "Customers from smaller towns browse fast on mobile and place orders straight on WhatsApp without calling five times to confirm stock.",
      author: "Retail Operations Desk",
      role: "IKSC India Venture",
    },
  },
  {
    id: "case-erotix",
    slug: "erotix-green-energy",
    title: "Erotix Green Energy",
    subtitle: "Solar EPC Field Operations & Offline Contractor Portal",
    category: "Enterprise & Field Ops",
    period: "2023 – Active",
    location: "Central India Solar Sites",
    image: "/images/showcase/case-erotix.jpg",
    imageAlt: "Utility-scale solar photovoltaic installation in Madhya Pradesh during golden hour",
    url: "/subsidiaries",
    external: false,
    challenge:
      "Ground-mounted solar EPC sites across rural Madhya Pradesh had zero reliable cell reception, forcing engineers to log piling, MMS alignment, and commissioning on paper registers.",
    solution:
      "Built an offline-first Android field operations app backed by local SQLite syncing automatically to a central contractor REST dashboard whenever connectivity returns.",
    outcomes: [
      { metric: "100%", label: "Offline Field Sync" },
      { metric: "0", label: "Lost Daily Site Logs" },
      { metric: "Real-Time", label: "EPC Stage Visibility" },
    ],
    architecture: [
      { layer: "Field App", tech: "Native Android (Java)", role: "Offline piling, MMS & electrical stage capture" },
      { layer: "Local Storage", tech: "SQLite Sync Queue", role: "Zero data loss in zero-signal rural solar parks" },
      { layer: "HQ Console", tech: "REST API + Role Admin", role: "Consolidated contractor progress & PDF daily reports" },
    ],
    stack: ["Android (Java)", "Offline SQLite", "REST API", "Field Reporting", "RBAC"],
    clientQuote: {
      text: "Replacing paper registers with an app that actually works in remote solar fields gave our site supervisors daily clarity across every array.",
      author: "Field Operations Team",
      role: "Erotix Green Energy EPC",
    },
  },
  {
    id: "case-ailaptopwala",
    slug: "ai-laptop-wala",
    title: "AI Laptop Wala (ailaptopwala.com)",
    subtitle: "Refurbished Hardware Catalog, Serial Tracking & Repair Desk",
    category: "E-Commerce & Retail",
    period: "2024 – Active",
    location: "Indore & Pan-India Buyers",
    image: "/images/showcase/case-ailaptop.jpg",
    imageAlt: "Precision business laptops and diagnostic workstation on brushed dark aluminum",
    url: "https://ailaptopwala.com",
    external: true,
    challenge:
      "Refurbished laptop buyers needed confidence in warranty authenticity, while technicians juggled repair tickets and serial numbers manually across spreadsheets.",
    solution:
      "Delivered an SEO-structured hardware storefront integrated with serial-number warranty verification, diagnostic ticketing, and instant WhatsApp repair booking hooks.",
    outcomes: [
      { metric: "Instant", label: "Serial Warranty Lookup" },
      { metric: "Automated", label: "WhatsApp Repair Alerts" },
      { metric: "Rich SEO", label: "Product Schema Ready" },
    ],
    architecture: [
      { layer: "Catalog UI", tech: "SEO-First Web Portal", role: "Fast laptop spec filtering & local search landing pages" },
      { layer: "Asset Ledger", tech: "Serial & Warranty DB", role: "Tracks device history, warranty dates & service tickets" },
      { layer: "Customer Loop", tech: "WhatsApp Webhooks", role: "Instant booking confirmations & diagnostic status pings" },
    ],
    stack: ["Inventory Tracker", "Serial Tracking", "WhatsApp Hooks", "Structured SEO"],
    clientQuote: {
      text: "Buyers verify laptop warranty details right on the site and book diagnostics in seconds — our support calls dropped while qualified leads rose.",
      author: "Store Management",
      role: "AI Laptop Wala",
    },
  },
  {
    id: "case-tetnews",
    slug: "tet-news",
    title: "TET News (TETnews.com)",
    subtitle: "High-Concurrency Exam & Career Updates Publishing Engine",
    category: "Publishing & Media",
    period: "2022 – Active",
    location: "Madhya Pradesh & North India",
    image: "/images/showcase/seo-growth.jpg",
    imageAlt: "Organic search growth and high-concurrency publishing analytics command screen",
    url: "/subsidiaries",
    external: false,
    challenge:
      "State exam notifications and government job result releases create 20x sudden traffic spikes within minutes that crash shared-hosting WordPress blogs.",
    solution:
      "Architected an edge-cached publishing system with clean RSS syndication, fast mobile article templates, and automated Telegram & notification alert pipelines.",
    outcomes: [
      { metric: "< 50ms", label: "Edge Cached TTFB" },
      { metric: "Zero", label: "Result-Day Downtime" },
      { metric: "Auto", label: "RSS & Alert Dispatch" },
    ],
    architecture: [
      { layer: "Edge CDN", tech: "Cloudflare Cache Rules", role: "Absorbs exam-result surge traffic at Mumbai/Delhi PoPs" },
      { layer: "Publishing Core", tech: "PHP / Laravel CMS", role: "Fast editorial posting with automated NewsArticle schema" },
      { layer: "Distribution", tech: "RSS + Alert Pipelines", role: "Instant syndication to student channels & Google Discover" },
    ],
    stack: ["Cloudflare Edge", "PHP / Laravel", "High Concurrency", "RSS Syndication"],
    clientQuote: {
      text: "Even on peak recruitment result mornings, pages stay instant on budget Android phones without server timeouts.",
      author: "Editorial Desk",
      role: "TET News Publishing",
    },
  },
  {
    id: "case-gudamrit",
    slug: "gud-amrit",
    title: "Gud Amrit (gudamrit.in)",
    subtitle: "Organic Agri-Food D2C Storefront & B2B Wholesale Ordering",
    category: "E-Commerce & Retail",
    period: "2024 – Active",
    location: "Malwa Region & National D2C",
    image: "/images/showcase/mobile-app.jpg",
    imageAlt: "Mobile UPI checkout and D2C ordering interface built for Indian consumer brands",
    url: "https://gudamrit.in",
    external: true,
    challenge:
      "Regional organic jaggery producers struggle to communicate chemical-free purity and capture bulk distributor inquiries online without losing trust to generic templates.",
    solution:
      "Designed a warm, story-led D2C storefront highlighting farm origin transparency, lab batch test certificates, and direct wholesale WhatsApp inquiry capture.",
    outcomes: [
      { metric: "B2B + D2C", label: "Dual Ordering Flow" },
      { metric: "Verified", label: "Batch Lab Proof UI" },
      { metric: "Fast", label: "Mobile-First Checkout" },
    ],
    architecture: [
      { layer: "Brand Storefront", tech: "Custom Responsive UI", role: "Origin storytelling & lab purity certification viewer" },
      { layer: "Lead Routing", tech: "WhatsApp B2B Inquiry", role: "Captures bulk mandi & retail distributor quotes directly" },
      { layer: "SEO Layer", tech: "Local + Product Schema", role: "Ranks for organic jaggery & regional wholesale searches" },
    ],
    stack: ["D2C Storefront", "Batch Certificates", "B2B WhatsApp Flow", "Local SEO"],
    clientQuote: {
      text: "Distributors immediately trust our quality when they see lab certificates and farm origin details laid out cleanly on mobile.",
      author: "Founder Desk",
      role: "Gud Amrit Organic",
    },
  },
  {
    id: "case-redxerox",
    slug: "red-xerox-studio",
    title: "Red Xerox Studio",
    subtitle: "Identity Systems, Packaging & Dark-Luxury UI Design Wing",
    category: "Branding & UI",
    period: "2021 – Active",
    location: "Shajapur & Indore",
    image: "/images/showcase/erp-dashboard.jpg",
    imageAlt: "Precision dark-luxury UI design system and enterprise workstation interface",
    url: "/services/graphics-and-branding",
    external: false,
    challenge:
      "Growing Indian businesses often launch with mismatched Canva logos, low-contrast websites, and generic print packaging that undermine pricing power.",
    solution:
      "Operates as MLHK Infotech's dedicated brand & UI design wing crafting mathematical vector marks, dark-luxury design systems, typography scales, and packaging files.",
    outcomes: [
      { metric: "100%", label: "Vector Source Ownership" },
      { metric: "Unified", label: "Web + Print Brand Kit" },
      { metric: "Zero", label: "Stock Template Clones" },
    ],
    architecture: [
      { layer: "Brand Identity", tech: "Vector Marks & Grids", role: "Scalable marks tested across dark, light & print media" },
      { layer: "UI Tokens", tech: "Figma Component Kits", role: "Consistent typography, contrast & interaction specs" },
      { layer: "Engineering Handoff", tech: "Tailwind & CSS Tokens", role: "Pixel-accurate transfer straight into production code" },
    ],
    stack: ["Figma Systems", "Vector Branding", "UI / UX Architecture", "Print Packaging"],
    clientQuote: {
      text: "Having branding and software engineering under one roof means the live website matches the brand identity down to every pixel.",
      author: "Design & Brand Practice",
      role: "Red Xerox Studio (MLHK Wing)",
    },
  },
] as const;

export function filterCaseStudies(category: "All Work" | CaseStudyCategory): readonly CaseStudy[] {
  if (category === "All Work") return VERIFIED_CASE_STUDIES;
  return VERIFIED_CASE_STUDIES.filter((item) => item.category === category);
}
