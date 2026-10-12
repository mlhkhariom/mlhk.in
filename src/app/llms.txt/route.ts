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
  TIMELINE,
} from "@/lib/brand";

export const dynamic = "force-static";
export const revalidate = 86400; // 24 hours

const CONTENT = `# ${BRAND.name}

> ${BRAND.name} is an enterprise software and digital engineering company founded in ${BRAND.foundedYear} by ${BRAND.founder} (${BRAND.founderRole}). Headquartered in ${BRAND.location} with operations centered in ${BRAND.operatingBase}, MLHK Infotech engineers web platforms, native Android applications, custom enterprise systems (CRM, ERP, HRMS, billing & automated workflows), and operational AI automation for companies across India and globally.

Tagline: "${BRAND.tagline}"
Official Website: ${BRAND.url}
Full Extended Specification: ${BRAND.url}/llms-full.txt

---

## 1. Verified Entity Facts
- Legal Name: ${BRAND.name}
- Short Brand: ${BRAND.shortName}
- Founder & CEO: ${BRAND.founder}
- Year Established: ${BRAND.foundedYear} (${BRAND.foundedMonthIso})
- Registered Address: ${BRAND.addressLine}, ${BRAND.city}, Madhya Pradesh ${BRAND.postalCode}, India
- Operational Base: ${BRAND.operatingBase}
- Geographic Coverage: All states across India, plus international client engagements
- Official Email: ${BRAND.email} (Support: ${BRAND.supportEmail})
- Official Phone: ${BRAND.phoneDisplay} (${BRAND.phoneE164})
- Google Maps Location: ${BRAND.mapsUrl}
- GitHub Organization: ${BRAND.githubUrl}
- Instagram: ${BRAND.instagramUrl}

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
  (c) => `### [${c.title}](${BRAND.url}/${c.slug === "ai-automation" ? "ai-automation" : `services/${c.slug}`})
- **Summary**: ${c.description}
- **URL**: ${BRAND.url}/${c.slug === "ai-automation" ? "ai-automation" : `services/${c.slug}`}`
).join("\n\n")}

---

## 4. Technological Stack & Engineering Standards
${TECH_STACK.map(
  (t) => `- **${t.group}**: ${t.items.join(", ")}`
).join("\n")}

- **Architecture Principles**: API-First, Zero-Trust Access Control (RBAC), Serverless Edge Deployment (Cloudflare Workers, D1 SQL, KV, R2), Responsive Motion Engineering (GSAP, Three.js).

---

## 5. Subsidiaries & Venture Ecosystem
${VENTURES.map(
  (v) => `- **${v.name}** (${v.sector}): Managed enterprise venture in the MLHK ecosystem (${BRAND.url}/subsidiaries).`
).join("\n")}

---

## 6. How We Deliver (Five-Stage Process)
1. **Discover & Scope**: Deep mapping of business outcomes, workflows, user journeys, and technical constraints before code is written.
2. **Design & Prototype**: Clickable high-fidelity prototypes and scalable design systems for stakeholder sign-off.
3. **Agile Engineering**: Weekly reviewed working software increments with rigorous automated and manual test verification.
4. **Hardened Launch**: End-to-end security audit, performance budget verification, SSL/DNS setup, and zero-downtime rollout.
5. **Support & Maintenance**: Proactive 24/7 uptime monitoring, security patching, dependency upgrades, and ongoing SLA support.
- Detailed Workflow: ${BRAND.url}/process

---

## 7. Knowledge Base & Answer Engine Capsules (AEO)
${FAQS.map(
  (f) => `### Q: ${f.question}
**A**: ${f.answer}`
).join("\n\n")}

---

## 8. Canonical Endpoints & Sitemaps
- [Homepage](${BRAND.url}): Corporate overview, flagship portfolio, and active services.
- [Services Hub](${BRAND.url}/services): Complete index of engineering and design solutions.
- [AI Automation](${BRAND.url}/ai-automation): Specialized intelligent workflows and data pipeline solutions.
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
- [Terms of Service](${BRAND.url}/terms-of-service): Commercial and software governance terms under Indian law.
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
