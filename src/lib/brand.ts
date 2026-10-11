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
  location: "Barnawad, Shajapur, Madhya Pradesh, India",
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
    title: "Web Development",
    description:
      "Business websites, web applications, SaaS products and internal dashboards, built to load fast and scale with traffic.",
    points: ["Business websites", "SaaS products", "Admin dashboards", "High-traffic portals"],
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    description:
      "Android applications from small tools to enterprise scale, with admin panels, analytics and an API-first architecture.",
    points: ["Android apps", "Admin panels", "Analytics", "Secure API architecture"],
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    description:
      "Campaigns and search visibility that connect your product to the customers who need it, tracked against real outcomes.",
    points: ["Search visibility", "Campaign setup", "Performance tracking", "Content strategy"],
  },
  {
    id: "branding",
    title: "Graphics & Branding",
    description:
      "Logos, identity systems and UI design in a consistent brand language, from the first mark to the last screen.",
    points: ["Logo & identity", "UI / UX design", "Design systems", "Brand guidelines"],
  },
  {
    id: "support",
    title: "Support & Maintenance",
    description:
      "Ongoing hosting, updates, security monitoring and fixes after launch, so your systems stay running.",
    points: ["Monitoring", "Security updates", "Bug fixes", "Technical support"],
  },
] as const;

/** Capability areas from the company brief that go beyond the badge. */
export const CAPABILITIES = [
  {
    id: "enterprise",
    title: "Enterprise Systems",
    description: "CRM, ERP, HRMS, billing, inventory and workflow systems built around how your business runs.",
  },
  {
    id: "ai",
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
  { name: "Hariom Vishwkarma Institute of Technology", sector: "Education" },
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
