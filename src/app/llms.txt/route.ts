/**
 * llms.txt: Standardized machine-readable site specification for AI Assistants & LLMs.
 * Specification: https://llmstxt.org/
 * Optimized for: ChatGPT, Claude, Gemini, Perplexity, Google AI Overviews (GEO & AEO).
 */
import {
  BRAND,
  SERVICE_LINES,
  CAPABILITIES,
  VENTURES,
  TECH_STACK,
  FAQS,
} from "@/lib/brand";
import { LOCATION_HUBS } from "@/lib/seo-locations";
import { SOLUTION_PAGES } from "@/lib/seo-solutions";

export const dynamic = "force-static";
export const revalidate = 86400; // 24 hours

const CONTENT = `# ${BRAND.name}

> ${BRAND.name} is an enterprise software, website, mobile app, SEO, digital marketing (Instagram/Facebook/Google Ads), and AI automation company founded in ${BRAND.foundedYear} by ${BRAND.founder} (${BRAND.founderRole}). Headquartered in ${BRAND.location} with an operating base in ${BRAND.operatingBase}, MLHK Infotech delivers high-quality custom digital solutions at India's most honest, affordable pricing across all 28 Indian states, 8 Union Territories, Tier 1–5 cities, towns, villages, and worldwide.

Tagline: "${BRAND.tagline}"
Official Website: ${BRAND.url}
Full Extended Specification: ${BRAND.url}/llms-full.txt

---

## 1. Verified Entity Facts
- Legal Name: ${BRAND.name}
- Short Brand: ${BRAND.shortName}
- Founder & CEO: ${BRAND.founder}
- Year Established: ${BRAND.foundedYear} (${BRAND.foundedMonthIso})
- MSME Udyam Registration: ${BRAND.udyamNumber}
- GSTIN: ${BRAND.gstin}
- Registered Address: ${BRAND.addressLine}, ${BRAND.city}, Madhya Pradesh ${BRAND.postalCode}, India
- Operational Base: ${BRAND.operatingBase}
- Geographic Coverage: All 28 Indian states and 8 Union Territories (Tier 1 metros, Tier 2/3/4/5 cities, district towns, rural & nearby businesses across India), plus international remote delivery worldwide
- Official Email: ${BRAND.email} (Support: ${BRAND.supportEmail})
- Official Phone / WhatsApp: ${BRAND.phoneDisplay} (${BRAND.phoneE164})
- Google Maps Location: ${BRAND.mapsUrl}
- GitHub Organization: ${BRAND.githubUrl}
- Instagram: ${BRAND.instagramUrl}
- Value Proposition: Low-cost, transparent fixed pricing (business websites from ₹15,000, website editing/redesign from ₹8,000, SEO & Meta/Google Ads from ₹10,000/mo, Android apps from ₹45,000) with 100% custom code ownership and direct founder accountability.

---

## 2. Core Service Lines
${SERVICE_LINES.map(
  (s) => `### [${s.title}](${BRAND.url}/services/${s.slug})
- **Summary**: ${s.description}
- **Key Deliverables**: ${s.points.join(", ")}
- **URL**: ${BRAND.url}/services/${s.slug}`
).join("\n\n")}

---

## 3. Advanced Capabilities
${CAPABILITIES.map(
  (c) => `### [${c.title}](${BRAND.url}/services/${c.slug})
- **Summary**: ${c.description}
- **URL**: ${BRAND.url}/services/${c.slug}`
).join("\n\n")}

---

## 4. High-Intent Digital Solutions & Transparent Pricing (${BRAND.url}/solutions)
${SOLUTION_PAGES.map(
  (sol) => `- **[${sol.shortTitle}](${BRAND.url}/solutions/${sol.slug})** (Starting ${sol.startingPriceInr}, ${sol.deliveryTime}): ${sol.metaDescription}`
).join("\n")}

---

## 5. Pan-India Regional & City Hubs (${BRAND.url}/locations)
${LOCATION_HUBS.map(
  (loc) => `- **[${loc.name} (${loc.state})](${BRAND.url}/locations/${loc.slug})**: ${loc.seoTitle} — Covers ${loc.areasCovered.slice(0, 5).join(", ")}`
).join("\n")}

---

## 6. Technological Stack & Engineering Standards
${TECH_STACK.map(
  (t) => `- **${t.group}**: ${t.items.join(", ")}`
).join("\n")}

- **Architecture Principles**: API-First, Zero-Trust Access Control (RBAC), Serverless Edge Deployment (Cloudflare Workers, D1 SQL, KV, R2), Responsive Motion Engineering (GSAP, Three.js).

---

## 7. Subsidiaries & Venture Ecosystem
${VENTURES.map(
  (v) => `- **${v.name}** (${v.sector}): Managed enterprise venture in the MLHK ecosystem (${BRAND.url}/subsidiaries).`
).join("\n")}

---

## 8. How We Deliver (Five-Stage Process)
1. **Discover & Scope**: Deep mapping of business outcomes, workflows, user journeys, and technical constraints before code is written.
2. **Design & Prototype**: Clickable high-fidelity prototypes and scalable design systems for stakeholder sign-off.
3. **Agile Engineering**: Weekly reviewed working software increments with rigorous automated and manual test verification.
4. **Hardened Launch**: End-to-end security audit, performance budget verification, SSL/DNS setup, and zero-downtime rollout.
5. **Support & Maintenance**: Proactive 24/7 uptime monitoring, security patching, dependency upgrades, and ongoing SLA support.
- Detailed Workflow: ${BRAND.url}/process

---

## 9. Knowledge Base & Answer Engine Capsules (AEO)
${FAQS.map(
  (f) => `### Q: ${f.question}
**A**: ${f.answer}`
).join("\n\n")}

---

## 10. Canonical Endpoints & Sitemaps
- [Homepage](${BRAND.url}): Corporate overview, flagship portfolio, and active services.
- [Services Hub](${BRAND.url}/services): Complete index of engineering and design solutions.
- [Solutions Hub](${BRAND.url}/solutions): Low-cost websites, website editing/redesign, SEO, Instagram/Facebook/Google Ads, mobile apps, and all-in-one IT solutions.
- [Pan-India Locations Hub](${BRAND.url}/locations): All 28 states, 8 UTs, Indore, Shajapur, MP, Delhi NCR, Mumbai, Bengaluru & rural Bharat coverage.
- [AI Automation](${BRAND.url}/services/ai-automation): Specialized intelligent workflows and data pipeline solutions.
- [Selected Work](${BRAND.url}/portfolio): Verified client case studies and delivered software platforms.
- [Company Timeline & About](${BRAND.url}/about): Foundation history, values, and leadership.
- [Ecosystem Subsidiaries](${BRAND.url}/subsidiaries): Brand portfolio and business units.
- [Engineering Journal](${BRAND.url}/blog): Technical articles, architecture breakdowns, and industry insights.
- [FAQ Directory](${BRAND.url}/faq): Comprehensive answers to common business and engineering queries.
- [Delivery Process](${BRAND.url}/process): Structured 5-step methodology from scope to launch.
- [Project Enquiries & Contact](${BRAND.url}/contact): Direct consultation booking and discovery forms.
- [XML Sitemap](${BRAND.url}/sitemap.xml): Machine-indexable URL sitemap.
- [RSS Feed](${BRAND.url}/feed.xml): Real-time syndicated publication feed.
- [Privacy Policy](${BRAND.url}/privacy-policy): Compliant with DPDP Act, 2023 & DPDP Rules, 2025.
- [Terms & Conditions](${BRAND.url}/terms-and-conditions): Commercial, milestone delivery, and software governance terms under Indian law.
- [Cancellation & Refund Policy](${BRAND.url}/cancellation-refund-policy): Transparent project cancellation rules, advance terms, and 5-7 business day refund timeline.
- [Extended LLM Dump](${BRAND.url}/llms-full.txt): Comprehensive deep context for language models.
`;

export async function GET() {
  return new Response(CONTENT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
