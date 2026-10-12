/**
 * Verified brand facts. Sourced from the brief, the logo badge, and existing
 * site content. Anything not listed here must not be shown on the site.
 */

export const BRAND = {
  name: "MLHK Infotech",
  shortName: "MLHK",
  tagline: "Innovate. Integrate. Elevate.",
  founder: "Hariom Vishwkarma",
  founderRole: "Founder & CEO",
  foundedYear: 2020,
  foundedMonthIso: "2020-04",
  location: "Barnawad, Moman Barodia, Shajapur, Madhya Pradesh 465236, India",
  operatingBase: "Indore, Madhya Pradesh, India",
  serviceArea: "India and international enquiries",
  addressLine: "Barnawad, Moman Barodia, Shajapur",
  postalCode: "465236",
  mapsUrl: "https://maps.app.goo.gl/3oCmvy35ZmdjJi5P7?g_st=ac",
  supportEmail: "support@mlhk.in",
  city: "Shajapur",
  email: "admin@mlhk.in",
  phoneDisplay: "+91-9165100124",
  phoneE164: "+919165100124",
  instagramHandle: "mlhkinfotech",
  instagramUrl: "https://www.instagram.com/mlhkinfotech/",
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
  "Not language-dependent",
  "Not design-limited",
  "Enterprise-level execution",
  "AI and automation ready",
  "A founder who understands business and delivery",
];

/** Company ventures, as recorded in the existing about page. */
export const VENTURES = [
  { name: "IKSC India", sector: "E-commerce" },
  { name: "Red Xerox Studio", sector: "Creative" },
  { name: "Erotix Green Energy", sector: "Solar energy" },
  { name: "RX Media", sector: "Media" },
  { name: "TET News", sector: "Journalism" },
] as const;

export const TIMELINE = [
  { year: "2020", event: "Founded MLHK Infotech in Barnawad, Shajapur during the digital boom of the pandemic." },
  { year: "2021", event: "Launched first SaaS products and expanded into mobile app development." },
  { year: "2022", event: "Founded IKSC India (e-commerce) and Red Xerox Studio (creative)." },
  { year: "2023", event: "Launched Erotix Green Energy (solar), RX Media and TET News." },
  { year: "2024", event: "Expanded into AI automation, CIS benchmark auditing and cloud consulting." },
  { year: "2025", event: "Building complete digital ecosystems for businesses across India." },
] as const;

export const FAQS = [
  {
    question: "What does MLHK Infotech build?",
    answer:
      "We build web platforms, Android apps, SaaS products, CRM and ERP systems, and AI-driven automation. We also handle design, digital marketing and ongoing support.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "A focused website or internal tool can launch in a few weeks. Larger CRM, ERP or mobile projects are scoped in phases, so you see working software early and at a predictable cost.",
  },
  {
    question: "Do you work with businesses outside Shajapur?",
    answer:
      "Yes. We work with clients across India. Most of our delivery happens remotely with regular reviews, so location is not a constraint.",
  },
  {
    question: "Do you provide support after launch?",
    answer:
      "Yes. Our Support & Maintenance service covers monitoring, security updates, bug fixes and technical support after your system goes live.",
  },
] as const;

/** Detailed service pages. Each entry drives its /services/[slug] page, sitemap and structured data. */
export type ServiceDetail = {
  slug: string;
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
