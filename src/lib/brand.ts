/**
 * Verified brand facts. Sourced from the brief, the logo badge, and existing
 * site content. Anything not listed here must not be shown on the site.
 */

export const BRAND = {
  name: "MLHK Infotech",
  shortName: "MLHK",
  tagline: "Innovate. Integrate. Elevate.",
  alternateTagline: "We Build Digital Power.",
  motto: "Ideas | Solutions | Growth",
  founder: "Hariom Vishwkarma",
  founderAlias: "MLHK",
  founderRole: "Founder & CEO",
  founderBio:
    "Enterprise System Architect, AI Automation Engineer, UI/UX Designer, and Independent Music Artist. Combining business strategy, rigorous software engineering, and bespoke visual design.",
  foundedYear: 2020,
  foundedMonthIso: "2020-04",
  foundedDate: "1 April 2020",
  udyamNumber: "UDYAM-MP-44-0005223",
  gstin: "23CHLPV2868R1CJ",
  university: "Vikram University, Ujjain",
  location: "Barnawad, Moman Barodia, Shajapur, Madhya Pradesh 465236, India",
  operatingBase: "Indore, Madhya Pradesh, India",
  serviceArea: "India and international enquiries",
  addressLine: "Barnawad, Moman Barodia, Shajapur",
  postalCode: "465236",
  mapsUrl: "https://maps.app.goo.gl/3oCmvy35ZmdjJi5P7?g_st=ac",
  googleMapsUrl: "https://maps.app.goo.gl/3oCmvy35ZmdjJi5P7?g_st=ac",
  geoLatitude: "23.6640",
  geoLongitude: "76.3220",
  supportEmail: "support@mlhk.in",
  city: "Shajapur",
  email: "admin@mlhk.in",
  phoneDisplay: "+91-9165100124",
  phoneE164: "+919165100124",
  instagramHandle: "mlhkinfotech",
  instagramUrl: "https://www.instagram.com/mlhkinfotech/",
  founderInstagram: "https://www.instagram.com/mlhkhariom/",
  founderGithub: "https://github.com/mlhkhariom",
  founderLinkedin: "https://in.linkedin.com/in/mlhkhariom/",
  founderTwitter: "https://x.com/mlhkhariom",
  companyLinkedin: "https://in.linkedin.com/company/mlhkinfotech",
  crunchbaseUrl: "https://www.crunchbase.com/organization/mlhk-infotech",
  f6sUrl: "https://www.f6s.com/company/mlhkinfotech",
  githubCompanyUrl: "https://github.com/mlhkinfotech",
  xTwitterUrl: "https://x.com/mlhkinfotech",
  universityUrl: "https://vikramuniv.ac.in",
  udyamVerifyUrl: "https://udyamregistration.gov.in",
  gstVerifyUrl: "https://services.gst.gov.in/services/searchtp",
  url: "https://mlhk.in",
  githubUrl: "https://github.com/mlhkhariom",
} as const;

/** The five service lines printed on the official brand badge. */
export const SERVICE_LINES = [
  {
    id: "web",
    slug: "web-development",
    title: "Web Development",
    description:
      "Business websites, web applications, SaaS products and internal dashboards, built to load fast and scale with traffic.",
    points: ["Business websites", "SaaS products", "Admin dashboards", "High-traffic portals"],
  },
  {
    id: "mobile",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    description:
      "Android applications from small tools to enterprise scale, with admin panels, analytics and an API-first architecture.",
    points: ["Android apps", "Admin panels", "Analytics", "Secure API architecture"],
  },
  {
    id: "marketing",
    slug: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Campaigns and search visibility that connect your product to the customers who need it, tracked against real outcomes.",
    points: ["Search visibility", "Campaign setup", "Performance tracking", "Content strategy"],
  },
  {
    id: "branding",
    slug: "graphics-and-branding",
    title: "Graphics & Branding",
    description:
      "Logos, identity systems and UI design in a consistent brand language, from the first mark to the last screen.",
    points: ["Logo & identity", "UI / UX design", "Design systems", "Brand guidelines"],
  },
  {
    id: "support",
    slug: "support-and-maintenance",
    title: "Support & Maintenance",
    description:
      "Ongoing hosting, updates, monitoring and fixes after launch, so your systems stay running.",
    points: ["Monitoring", "Security updates", "Bug fixes", "Technical support"],
  },
] as const;

/** Capability areas from the company brief that go beyond the badge. */
export const CAPABILITIES = [
  {
    id: "cybersecurity",
    slug: "cybersecurity",
    title: "Cybersecurity & IT Infrastructure",
    description:
      "Network security, IT infrastructure, Linux server administration and secure deployment for businesses that run their own systems.",
  },
  {
    id: "enterprise",
    slug: "enterprise-systems",
    title: "Enterprise Systems",
    description: "CRM, ERP, HRMS, billing, inventory and workflow systems built around how your business runs.",
  },
  {
    id: "ai",
    slug: "ai-automation",
    title: "AI & Automation",
    description:
      "Operational automation, process workflows, data pipelines and smart dashboards that surface decisions, not just data.",
  },
] as const;

export const TECH_STACK: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Java", "Python", "JavaScript", "PHP", "SQL", "Bash"] },
  { group: "Frontend", items: ["HTML5", "CSS3", "Tailwind", "Bootstrap", "React", "Motion design"] },
  { group: "Backend & APIs", items: ["Laravel", "Node.js", "Flask", "REST APIs", "Auth", "RBAC"] },
  { group: "Mobile", items: ["Android (Java)", "Scalable architecture"] },
  { group: "Databases", items: ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "Firebase"] },
  { group: "AI & Data", items: ["NumPy", "Pandas", "Scikit-learn", "Keras", "Analytics", "BI"] },
  { group: "DevOps", items: ["Docker", "Linux", "Git", "GitHub", "CI/CD", "Cloud"] },
];

export const WHY_MLHK = [
  {
    title: "We pick the right tool, not our favourite tool",
    detail:
      "Some shops only know React, so every problem becomes a React problem. We have shipped production work in PHP, Java, Python, Node, and plain HTML. The tech decision comes after we understand the project, not before.",
  },
  {
    title: "Design is part of the build, not a separate invoice",
    detail:
      "You will not get a generic Bootstrap template from us. Every interface we ship is drawn around the actual data and real user flows — because a billing dashboard and a food delivery app need completely different thinking.",
  },
  {
    title: "You talk to the person who writes the code",
    detail:
      "There is no account manager sitting between you and the engineer. Hariom leads every project directly. When you call or WhatsApp, the person picking up is the same person pushing the deploy.",
  },
  {
    title: "We have done this from a small town, and that matters",
    detail:
      "Operating from Shajapur taught us how to do more with less. We do not charge metro-city overhead. Our clients in Indore, Bhopal, and across MP get enterprise-grade work at budgets that actually make sense for Indian businesses.",
  },
  {
    title: "The system keeps working after the project ends",
    detail:
      "We have seen too many agencies deliver a website and vanish. Every system we build comes with monitoring, a documented handover, and our number on speed dial for when something breaks at midnight.",
  },
];

export interface TimelineMilestone {
  year: string;
  tag: string;
  title: string;
  event: string;
  highlights: readonly string[];
}

/** Company ventures, as recorded in verified company facts and ecosystem structure. */
export const VENTURES = [
  {
    name: "IKSC India",
    domain: "iksc.in",
    sector: "E-commerce & Retail Infrastructure",
    description:
      "India Ka Shopping Centre — indigenous digital retail infrastructure, dynamic product catalogs, and vendor order workflows.",
    badge: "E-Commerce",
  },
  {
    name: "Red Xerox Studio",
    domain: "Creative Wing",
    sector: "Creative Branding & Visual Media",
    description:
      "High-impact creative identity studio delivering corporate brand marks, packaging guidelines, print media, and custom UI/UX design systems.",
    badge: "Creative Lab",
  },
  {
    name: "Erotix Green Energy",
    domain: "Clean-Tech",
    sector: "Solar EPC & Renewable Tech",
    description:
      "Technology and operational digital tracking for solar EPC installations, piling, module mounting structures, and electrical commissioning.",
    badge: "Clean Energy",
  },
  {
    name: "RX Media",
    domain: "rxmedia / FreeCinema",
    sector: "Digital Media & Streaming Tech",
    description:
      "Next-generation media tech lab exploring high-efficiency video playback architectures, HLS/DASH media streaming, and content workflows.",
    badge: "Media Lab",
  },
  {
    name: "TET News",
    domain: "TETnews.com",
    sector: "Employment & Educational Journalism",
    description:
      "Digital career portal and news platform delivering government vacancy alerts, examination updates, and youth educational resources.",
    badge: "Information",
  },
] as const;

export const TIMELINE: readonly TimelineMilestone[] = [
  {
    year: "2020",
    tag: "Genesis & Foundation",
    title: "Established in Barnawad, Shajapur",
    event:
      "MLHK Infotech was founded on 1 April 2020 by Hariom Vishwkarma while studying Computer Applications at Vikram University, Ujjain. Established to deliver bespoke software, website engineering, and digital consulting to businesses across Madhya Pradesh.",
    highlights: [
      "Grassroots IT consulting for Tier-2/3 Indian businesses",
      "Custom web platforms built on PHP, Java, and MySQL",
      "Laying the foundations of 100% in-house software execution",
    ],
  },
  {
    year: "2021",
    tag: "Mobile & Core Systems",
    title: "Android Architecture & Custom Databases",
    event:
      "Expanded engineering capabilities into native Android applications (Java) and modular API backends. Began crafting administrative dashboards, inventory trackers, and bespoke digital branding for regional enterprises.",
    highlights: [
      "Native Android app releases with role-based admin panels",
      "API-first backend development with token authentication",
      "Creative studio workflows under Red Xerox Studio",
    ],
  },
  {
    year: "2022",
    tag: "MSME Formalization",
    title: "Udyam Registration & Brand Ecosystem",
    event:
      "Formally registered with the Ministry of MSME, Government of India (UDYAM-MP-44-0005223) under software publishing and computer consultancy. Launched multi-sector venture projects including IKSC India e-commerce and TET News publishing.",
    highlights: [
      "Official Government of India MSME Udyam Certification",
      "IKSC India (iksc.in) e-commerce infrastructure deployment",
      "TET News (TETnews.com) job & education alert portal",
    ],
  },
  {
    year: "2023",
    tag: "Enterprise Engineering",
    title: "CRM/ERP Systems & Clean-Tech Operations",
    event:
      "Engineered full enterprise suites: custom CRM pipelines, GST billing, and inventory tracking. Partnered on digital project management for renewable energy infrastructure with Erotix Green Energy, and prototyped high-efficiency streaming players (RX Media).",
    highlights: [
      "Custom ERP & billing workflows eliminating foreign vendor software",
      "Solar EPC field operations tracking with Erotix Green Energy",
      "Cloudflare Workers & streaming video player prototyping",
    ],
  },
  {
    year: "2024",
    tag: "Statewide Expansion",
    title: "GST Formalization & Indore Operations Hub",
    event:
      "Received official GSTIN certification (23CHLPV2868R1CJ) as an Electronic Commerce Operator and IT consultancy. Established an active commercial operations office in Indore, MP to oversee pan-India delivery, server hardening, and cybersecurity implementations.",
    highlights: [
      "Official GSTIN tax compliance & commercial entity setup",
      "Active operations established in Indore commercial hub",
      "Server hardening, Ubuntu VPS infrastructure, and Linux administration",
    ],
  },
  {
    year: "2025",
    tag: "AI & Cloud Automation",
    title: "Autonomous Agents & WhatsApp Ecosystem",
    event:
      "Pioneered operational AI automation combining n8n pipelines, PostgreSQL state machines, and the WhatsApp Business Cloud API. Published the @mlhkinfotech/types TypeScript ecosystem contracts for enterprise automation.",
    highlights: [
      "Production WhatsApp Cloud API conversational bots",
      "Autonomous n8n workflows connecting forms, CRM, and databases",
      "@mlhkinfotech/types TypeScript shared contract library",
    ],
  },
  {
    year: "2026",
    tag: "Sovereign Cloud Platform",
    title: "Global Edge Infrastructure & National Pride",
    event:
      "Architected and deployed the unified MLHK Cloud Platform (mlhk.in) on Cloudflare's 330+ city Global Edge network. Proudly championing Make in India and Atmanirbhar Bharat by delivering zero-vendor-lockin software from Bharat to the world.",
    highlights: [
      "Full-stack Next.js 16 + Cloudflare Workers with 100% ISR caching",
      "Unified CMS, CRM pipeline, Invoicing/ERP, and Client Portal",
      "Built with Pride in Bharat 🇮🇳 • Deployed Globally",
    ],
  },
] as const;

export const FAQS = [
  {
    question: "What does MLHK Infotech actually build?",
    answer:
      "Websites, web apps, Android apps, admin dashboards, CRM and ERP systems, billing tools, and AI-based automation. If your business runs on software or needs software to run better, that is what we do. We have built everything from a single-page portfolio site for a local studio to a full invoicing and client management platform.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "A straightforward business website usually takes 2 to 4 weeks. An Android app with a backend and admin panel is more like 6 to 10 weeks. Large systems like CRM or ERP are scoped in phases — you get working software early and we keep building on top of it. We will give you a realistic timeline upfront, not a sales pitch.",
  },
  {
    question: "I am based in another city. Can you still work with me?",
    answer:
      "Yes, most of our clients are not in Shajapur. We work with businesses across Indore, Bhopal, Ujjain, Ahmedabad, and beyond. Everything happens over WhatsApp, Google Meet, and screen shares. You get regular updates, and you do not need to visit an office for anything.",
  },
  {
    question: "What happens after the project is delivered?",
    answer:
      "We do not disappear after launch. Every project includes a handover document, and we offer ongoing support and maintenance — server monitoring, security patches, bug fixes, and feature updates. If something breaks at 11 PM, you can call us directly.",
  },
  {
    question: "How much does a website or app cost?",
    answer:
      "It depends on what you need. A business website starts around ₹15,000-25,000. A web app with user login, dashboard, and database is in the ₹40,000-80,000 range. Enterprise systems are priced based on scope. We never charge by the hour or pad estimates — you get a fixed quote based on exactly what we are building.",
  },
  {
    question: "Do you use templates or build from scratch?",
    answer:
      "From scratch, always. We do not reskin WordPress themes or drag-and-drop builders. Your website is coded line by line, which means it loads faster, ranks better on Google, and does not look like five other businesses in your industry.",
  },
  {
    question: "Will I own the code and the design?",
    answer:
      "100 percent. Once the project is paid for, the source code, design files, database, and every asset belongs to you. There is no vendor lock-in and no monthly hostage fee. You can take it to another developer tomorrow if you want — though we would rather you stayed.",
  },
  {
    question: "Can you help with Google ranking and SEO?",
    answer:
      "Every website we build is already optimised for search engines — fast load times, clean HTML, proper meta tags, structured data, and mobile-first design. If you need ongoing SEO work like keyword targeting, content strategy, or Google Ads, we offer that as part of our digital marketing service.",
  },
  {
    question: "I already have a website but it is slow or outdated. Can you fix it?",
    answer:
      "Yes. We regularly take over existing websites and rebuild or optimise them. Sometimes it is a full redesign, sometimes it is fixing the slow database queries or moving to better hosting. We will look at what you have and tell you honestly whether it needs a fix or a fresh start.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "It depends on the project. For websites we often use Next.js, React, or plain HTML/CSS depending on what the project needs. Backend can be Node.js, Laravel (PHP), Flask (Python), or Java. Mobile is native Android. Databases include MySQL, PostgreSQL, SQLite, and MongoDB. We pick what fits your problem, not what is trending on Twitter.",
  },
  {
    question: "Is MLHK Infotech a registered company?",
    answer:
      "Yes. We are registered with the Ministry of MSME, Government of India under Udyam number UDYAM-MP-44-0005223. We also have an active GST registration (23CHLPV2868R1CJ). You can verify both on the official government portals — the links are on our About page.",
  },
  {
    question: "How do I get started?",
    answer:
      "Just message us on WhatsApp at +91-9165100124 or send a mail to admin@mlhk.in. Tell us roughly what you need — a website, an app, a dashboard, whatever it is. We will have a quick call, understand your requirements, and send you a clear proposal with timeline and cost. No pressure, no spam follow-ups.",
  },
] as const;

/** Detailed service pages. Each entry drives its /services/[slug] page, sitemap and structured data. */
export type ServiceDetail = {
  slug: string;
  audience: string;
  name: string;
  summary: string;
  intro: string;
  deliverables: string[];
  process: { step: string; text: string }[];
  faqs: { question: string; answer: string }[];
};

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: "web-development",
    audience: "Businesses that need a website or web platform that brings in enquiries, handles customers, or runs internal operations.",
    name: "Web Development",
    summary: "Business websites, web applications, SaaS products and internal dashboards.",
    intro:
      "We build web platforms that load quickly, rank in search and hold up under real traffic. From a marketing site to a multi-tenant SaaS product, every build starts with the business outcome and works backwards to the code.",
    deliverables: [
      "Business and marketing websites with structured data and fast load times",
      "Web applications and SaaS products with authentication and role-based access",
      "Internal dashboards and admin panels for operations teams",
      "High-traffic portals designed for caching, queueing and graceful scaling",
    ],
    process: [
      { step: "Scope", text: "Define users, pages or screens, and the success measure before design starts." },
      { step: "Design", text: "Wireframes and a component system that your team can extend later." },
      { step: "Build", text: "Working increments reviewed with you each week, with tests on critical paths." },
      { step: "Launch", text: "Security review, performance budget check and a monitored rollout." },
    ],
    faqs: [
      { question: "Which technologies do you use for websites?", answer: "We use the stack that fits the problem: React and Next.js for interactive products, PHP or Laravel for content-heavy and CMS-driven sites, and Node.js or Python for APIs." },
      { question: "Will my website be found on Google?", answer: "Every site ships with clean metadata, a sitemap, structured data and fast pages, which are the technical basics for search. Ranking also depends on content and competition, which we can plan with you." },
    ],
  },
  {
    slug: "mobile-app-development",
    audience: "Teams that need an Android app for customers, field staff or internal operations, with an admin panel and reporting.",
    name: "Mobile App Development",
    summary: "Android applications for small teams and enterprises, with admin panels and analytics.",
    intro:
      "We build Android applications from a first working version to enterprise scale. Each app ships with an API-first architecture, role-based admin access and the analytics needed to see how people use it.",
    deliverables: [
      "Android applications written in Java with scalable, modular architecture",
      "Admin panels for managing users, content and operations",
      "Analytics dashboards showing usage, retention and funnel drop-off",
      "Secure REST APIs with authentication and token handling",
    ],
    process: [
      { step: "Discover", text: "Map the user journeys and the data the app depends on." },
      { step: "Prototype", text: "Clickable screens tested with real users before engineering starts." },
      { step: "Build", text: "Feature-complete builds on a schedule, with device testing on target phones." },
      { step: "Release", text: "Store submission support, crash monitoring and a post-release fix window." },
    ],
    faqs: [
      { question: "Do you build iOS apps too?", answer: "We build Android applications. For iOS requirements we scope the work first and tell you whether it fits our current capability." },
      { question: "Can the app connect to our existing system?", answer: "Yes. We build secure APIs and integrate with existing databases, CRMs and ERP systems, subject to access to those systems." },
    ],
  },
  {
    slug: "digital-marketing",
    audience: "Businesses that want measurable search visibility and campaigns, with reporting tied to enquiries.",
    name: "Digital Marketing",
    summary: "Search visibility, campaign setup and performance tracking tied to real outcomes.",
    intro:
      "Digital marketing works when the website, the tracking and the content are built to support it. We set up the measurement first, then the campaigns, so every rupee spent can be traced to a result.",
    deliverables: [
      "Search engine optimisation: technical audit, on-page structure and content plan",
      "Answer-engine optimisation: structured data and content that AI assistants can cite",
      "Campaign setup and conversion tracking across search and social channels",
      "Monthly reporting on leads, enquiries and cost per enquiry",
    ],
    process: [
      { step: "Audit", text: "Review the site, tracking and competitors before proposing any spend." },
      { step: "Measure", text: "Set up analytics and conversion events so results are attributable." },
      { step: "Run", text: "Launch campaigns and content with weekly reviews of what works." },
      { step: "Report", text: "Monthly reporting against the targets agreed at the start." },
    ],
    faqs: [
      { question: "How quickly will I see results from SEO?", answer: "Technical fixes can show within weeks. Organic growth from content typically takes several months, and we agree realistic milestones at the start." },
      { question: "Do you guarantee rankings?", answer: "No. Anyone who guarantees a search ranking cannot control Google. We commit to the work, the measurement and the reporting." },
    ],
  },
  {
    slug: "graphics-and-branding",
    audience: "Businesses building or refreshing a brand, a product interface or a consistent set of marketing assets.",
    name: "Graphics & Branding",
    summary: "Logos, identity systems and UI design in one consistent brand language.",
    intro:
      "A brand is the set of decisions that make your business recognisable on every screen and document. We design identities and interfaces together, so the website, the app and the print material all speak the same way.",
    deliverables: [
      "Logo design and mark development with variations for light and dark backgrounds",
      "Brand guidelines covering colour, typography, spacing and voice",
      "UI and UX design for web and mobile products",
      "Design systems: reusable components that keep product teams consistent",
    ],
    process: [
      { step: "Brief", text: "Understand the audience, the competitors and what the brand must communicate." },
      { step: "Explore", text: "Several directions developed and reviewed before one is refined." },
      { step: "Refine", text: "Final assets delivered in every format the business needs." },
      { step: "Govern", text: "Guidelines handed over so the brand stays consistent after we leave." },
    ],
    faqs: [
      { question: "What files will I receive?", answer: "Vector source files, raster exports in standard sizes, and the brand guidelines. You own the final assets once the project is paid." },
      { question: "Can you design only the UI without a full brand?", answer: "Yes. UI and UX design can be scoped on its own, using the existing brand if you have one." },
    ],
  },
  {
    slug: "support-and-maintenance",
    audience: "Businesses running a live website, app or internal system that needs monitoring, updates and fixes.",
    name: "Support & Maintenance",
    summary: "Monitoring, security updates and fixes after launch, so systems keep running.",
    intro:
      "Launching is the start of running a system. Our support plans keep your website, app or internal system monitored, patched and responsive, with a named contact and a clear response window.",
    deliverables: [
      "Uptime and error monitoring with alerts to our team",
      "Security updates for frameworks, libraries and server components",
      "Bug fixes and small feature changes under an agreed monthly allowance",
      "Technical support by email and phone during business hours",
    ],
    process: [
      { step: "Onboard", text: "Access, runbooks and monitoring set up before the handover." },
      { step: "Monitor", text: "Continuous checks on uptime, errors and performance." },
      { step: "Patch", text: "Scheduled updates with a rollback plan for every change." },
      { step: "Review", text: "Monthly summary of incidents, changes and recommendations." },
    ],
    faqs: [
      { question: "Is support available outside office hours?", answer: "Support hours and response times are set out in your support plan, so you know exactly when and how to reach us before you sign." },
      { question: "Do you take over systems built by other teams?", answer: "Yes, after a short audit of the codebase, infrastructure and documentation to agree what is in scope." },
    ],
  },
  {
    slug: "cybersecurity",
    audience: "Organisations that run their own servers, networks or deployments and want them reviewed and hardened.",
    name: "Cybersecurity & IT Infrastructure",
    summary: "Network security, IT infrastructure, Linux server administration and secure deployment.",
    intro:
      "Your systems are only as dependable as the network, servers and deployment behind them. We help businesses secure and run that infrastructure, from the server and network layer to the applications that sit on top.",
    deliverables: [
      "Network and server security review, with findings and a prioritised fix list",
      "Linux server administration, including hardening, updates and access control",
      "Secure deployment with HTTPS, reverse proxies and certificate management",
      "Security configuration checks for Windows and Linux systems against agreed benchmarks",
    ],
    process: [
      { step: "Authorise", text: "Written scope and permission are agreed before any system is accessed." },
      { step: "Assess", text: "We review configuration, access, exposure and update status." },
      { step: "Fix", text: "Changes are applied in agreed windows, with a rollback plan for each one." },
      { step: "Report", text: "Findings, changes made and the remaining risks are written down for your team." },
    ],
    faqs: [
      { question: "Do you provide penetration testing or security certification?", answer: "We do not claim certification or accreditation. Any security testing is carried out only under a written scope agreed in advance, and we describe its limits in the report." },
      { question: "Will my systems be fully protected after your work?", answer: "No security work can guarantee full protection. We reduce risk in the agreed scope and tell you what remains, so decisions are based on facts." },
    ],
  },
  {
    slug: "enterprise-systems",
    audience: "Organisations that run sales, operations, people or billing on spreadsheets and need one system of record.",
    name: "Enterprise Systems",
    summary: "CRM, ERP, HRMS, billing, inventory and workflow systems.",
    intro:
      "Enterprise systems replace spreadsheets and disconnected tools with one place where sales, operations, people and money are tracked. We design them around how your business actually runs, not around a generic template.",
    deliverables: [
      "CRM systems for leads, accounts, follow-ups and pipeline reporting",
      "ERP modules for projects, purchasing, inventory and finance",
      "HRMS for attendance, leave, payroll inputs and performance records",
      "Billing, invoicing and workflow automation with role-based approvals",
    ],
    process: [
      { step: "Map", text: "Document current workflows, approvals and the reports leaders rely on." },
      { step: "Design", text: "Data model and screens agreed before development begins." },
      { step: "Build", text: "Modules delivered in phases so the business gains value early." },
      { step: "Migrate", text: "Data import, parallel running and staff training before cut-over." },
    ],
    faqs: [
      { question: "Can the system be customised for our processes?", answer: "Yes. Enterprise systems are built to your workflows. We keep standard features where they fit and customise where your process differs." },
      { question: "How do you handle access control?", answer: "Role-based access with audit logs for sensitive actions. Permissions are defined with you during the design phase." },
    ],
  },
  {
    slug: "ai-automation",
    audience: "Businesses with repeated manual workflows, data entry or reporting that take time from skilled staff.",
    name: "AI & Automation",
    summary: "Operational automation, process workflows, data pipelines and smart dashboards.",
    intro:
      "AI is useful when it removes repeated work and surfaces decisions faster. We start with the process that costs the most time, automate the steps that are predictable, and keep a person in the loop wherever a decision carries risk.",
    deliverables: [
      "Workflow automation connecting forms, email, spreadsheets, CRMs and databases",
      "Data pipelines that clean, validate and store operational data reliably",
      "Analytics dashboards and reporting built on top of those pipelines",
      "Machine learning models for forecasting and classification where the data supports them",
      "Monitoring and admin tooling that flags exceptions for human review",
    ],
    process: [
      { step: "Find", text: "Rank processes by time spent, error rate and value of the outcome." },
      { step: "Prototype", text: "Automate one workflow end to end and measure the result." },
      { step: "Scale", text: "Extend the approach to adjacent workflows with shared pipelines." },
      { step: "Govern", text: "Logging, review queues and clear ownership for every automated step." },
    ],
    faqs: [
      { question: "What data do I need before automation can start?", answer: "Less than most people expect. We need access to the systems where the work happens and a sample of past records. We assess data quality in the first phase." },
      { question: "Will automation replace my staff?", answer: "We design automation to remove repetitive tasks so people spend time on exceptions and decisions. Staffing changes are your decision, and we do not recommend removing human review from high-risk steps." },
      { question: "How do you keep AI outputs reliable?", answer: "We validate inputs, log every automated decision, route low-confidence cases to a person, and measure accuracy against the process you agreed to improve." },
    ],
  },
];
