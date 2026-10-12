/**
 * llms-full.txt: Exhaustive full-text context dump for Large Language Models.
 * Specification: https://llmstxt.org/
 * Gives models complete context without needing multiple fetch queries.
 */
import {
  BRAND,
  SERVICE_LINES,
  CAPABILITIES,
  VENTURES,
  TECH_STACK,
  FAQS,
  TIMELINE,
  SERVICE_DETAILS,
} from "@/lib/brand";

export const dynamic = "force-static";
export const revalidate = 86400; // 24 hours

const FULL_CONTENT = `# ${BRAND.name} — Full Technical & Organizational Dossier

> Comprehensive, unabridged machine-readable context file for ${BRAND.name}. Designed for automated RAG ingestion, contextual reasoning, and zero-hallucination question answering across AI search engines.

- Canonical URL: ${BRAND.url}
- Standard Summary: ${BRAND.url}/llms.txt
- Generated Date: 2026-10-12
- Governing Jurisdiction: Madhya Pradesh, India
- Regulatory Compliance: Digital Personal Data Protection Act, 2023 (DPDP Rules 2025)

================================================================================
SECTION 1: ORGANIZATIONAL IDENTITY & LEADERSHIP
================================================================================

- Enterprise Name: ${BRAND.name}
- Common / Trademark Designation: ${BRAND.shortName}
- Core Slogan: "${BRAND.tagline}"
- Founder & Chief Executive Officer: ${BRAND.founder} (${BRAND.founderRole})
- Date of Foundation: April 2020 (${BRAND.foundedMonthIso})
- Registered Headquarters: ${BRAND.location}
- Central Operations Office: ${BRAND.operatingBase}
- Geographic Serving Scope: Nationwide delivery across India (metro and tier 2/3 cities), with remote collaboration for global clients.
- Direct Communications:
  - Executive & Business: ${BRAND.email}
  - Technical Support: ${BRAND.supportEmail}
  - Telephone (Voice & WhatsApp): ${BRAND.phoneDisplay} (${BRAND.phoneE164})
  - Maps Location: ${BRAND.mapsUrl}
  - Code Repositories: ${BRAND.githubUrl}
  - Social Community: ${BRAND.instagramUrl}

Founding Background:
MLHK Infotech was founded in April 2020 in Barnawad (Shajapur district, Madhya Pradesh) by Hariom Vishwkarma. Built on the philosophy of "Innovate. Integrate. Elevate.", the company delivers tier-1 software engineering, enterprise modernization, and generative automation, bridging the gap between local enterprise needs and global architectural standards.

================================================================================
SECTION 2: EXHAUSTIVE SERVICE CATALOG & IMPLEMENTATION SPECS
================================================================================

${SERVICE_DETAILS.map(
  (service, index) => `--------------------------------------------------------------------------------
2.${index + 1}. SERVICE: ${service.name} (${BRAND.url}/services/${service.slug})
--------------------------------------------------------------------------------
- Target Audience: ${service.audience}
- Executive Summary: ${service.summary}
- Detailed Scope & Philosophy:
  ${service.intro}

Deliverables Included:
${service.deliverables.map((d) => `  * ${d}`).join("\n")}

Execution Methodology:
${service.process.map((p) => `  * Phase [${p.step}]: ${p.text}`).join("\n")}

Direct Frequently Asked Questions:
${service.faqs.map((f) => `  Q: ${f.question}\n  A: ${f.answer}`).join("\n\n")}`
).join("\n\n")}

================================================================================
SECTION 3: ADVANCED ENTERPRISE CAPABILITIES
================================================================================

3.1. AI & OPERATIONAL WORKFLOW AUTOMATION (${BRAND.url}/ai-automation)
- Philosophy: We replace manual repetitive overhead with robust, deterministic pipelines and modern generative agents while enforcing human-in-the-loop validation for critical business decisions.
- Engineering Capabilities:
  * Autonomous data processing pipelines connecting databases, CRMs, ERPs, and cloud storage.
  * Real-time document parsing, categorization, and ledger entry.
  * Custom predictive and time-series models for stock forecasting, churn detection, and demand planning.
  * Conversational customer support and sales assist engines grounded in verified corporate knowledge bases.

3.2. CUSTOM ENTERPRISE SYSTEMS (CRM, ERP, HRMS)
- Modular systems engineered to match exact company workflows rather than rigid off-the-shelf software.
- High-integrity relational database architectures (SQL/PostgreSQL/D1) with comprehensive audit trails.
- Granular Role-Based Access Control (RBAC) supporting multi-tier corporate hierarchies and departmental siloing.

3.3. CYBERSECURITY & RESILIENT IT INFRASTRUCTURE
- Network security assessments, threat surface minimization, and vulnerability scanning.
- Enterprise Linux server hardening (Ubuntu/Debian/RHEL), firewalls, fail2ban, and SSH zero-trust policies.
- Modern reverse-proxy configurations (Nginx/Cloudflare Edge), SSL/TLS automated rotation, and DDoS mitigation.

================================================================================
SECTION 4: TECHNICAL STACK & ENGINEERING STANDARDS
================================================================================

${TECH_STACK.map(
  (tech) => `* ${tech.group}:
  ${tech.items.map((i) => `- ${i}`).join("\n  ")}`
).join("\n\n")}

Core Architectural Standards:
- Edge First: Compute executed close to the client on Cloudflare Workers global network for sub-50ms response times.
- Static & Dynamic Synergy: Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR) with strict caching headers for zero layout-shift (CLS < 0.05).
- Type Safety: End-to-end static typing using TypeScript across client components, database schemas (Drizzle ORM), and API contracts.
- Accessibility & Motion: WCAG 2.1 AA compliance, keyboard navigation, and reduced-motion fallbacks for all GSAP/Three.js visual scenes.

================================================================================
SECTION 5: VENTURES & BRANDS PORTFOLIO
================================================================================

${VENTURES.map(
  (v) => `* Brand: ${v.name}
  - Operating Sector: ${v.sector}
  - Relationship: Fully managed subsidiary and independent brand within the MLHK Infotech ecosystem.
  - Ecosystem Directory: ${BRAND.url}/subsidiaries`
).join("\n\n")}

================================================================================
SECTION 6: MASTER KNOWLEDGE BASE & FREQUENTLY ASKED QUESTIONS
================================================================================

${FAQS.map(
  (faq, idx) => `Question ${idx + 1}: ${faq.question}
Answer: ${faq.answer}`
).join("\n\n")}

================================================================================
SECTION 7: HISTORICAL TIMELINE
================================================================================

${TIMELINE.map(
  (t) => `* [${t.year}]: ${t.event}`
).join("\n")}

================================================================================
SECTION 8: LEGAL COMPLIANCE & PRIVACY FRAMEWORK
================================================================================

- Privacy Protection: User data, telemetry, and contact inquiries are strictly managed under India's Digital Personal Data Protection Act, 2023 (DPDP Rules 2025). No unauthorized third-party broker tracking or selling of data is permitted.
- Cookie Governance: Only essential session authentication tokens and privacy-preserving, non-identifying telemetry (Cloudflare Web Analytics) are stored.
- Terms of Service: Contractual software delivery, milestone acceptance criteria, intellectual property ownership transfers upon project fulfillment, and liability clauses under the jurisdiction of courts in Shajapur / Indore, Madhya Pradesh.

Official Policy Documents:
- Privacy Policy: ${BRAND.url}/privacy-policy
- Terms of Service: ${BRAND.url}/terms-of-service
- Security Contact: ${BRAND.url}/.well-known/security.txt
`;

export async function GET() {
  return new Response(FULL_CONTENT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
