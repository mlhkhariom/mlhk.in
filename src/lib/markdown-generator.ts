/**
 * Markdown for Agents Generator (IETF / Cloudflare / llmstxt standard)
 * Delivers clean, formatting-stripped, machine-readable text directly to AI agents
 * when requests include `Accept: text/markdown`.
 */

import { BRAND, SERVICE_LINES, TECH_STACK, VENTURES, FAQS, TIMELINE } from "@/lib/brand";
import { EXTENDED_SERVICE_DATA } from "@/lib/service-details-extended";

export function generatePageMarkdown(rawPath: string, origin: string = BRAND.url): string {
  // Normalize path
  const pathname = rawPath.split("?")[0].replace(/\/+$/, "") || "/";

  // Match /services/[slug]
  if (pathname.startsWith("/services/")) {
    const slug = pathname.replace("/services/", "");
    const service = EXTENDED_SERVICE_DATA[slug];
    if (service) {
      return generateServiceMarkdown(slug, service, origin);
    }
  }

  // Route matches
  switch (pathname) {
    case "/":
      return generateHomeMarkdown(origin);
    case "/services":
      return generateServicesCatalogMarkdown(origin);
    case "/about":
      return generateAboutMarkdown(origin);
    case "/portfolio":
      return generatePortfolioMarkdown(origin);
    case "/contact":
      return generateContactMarkdown(origin);
    case "/subsidiaries":
      return generateSubsidiariesMarkdown(origin);
    case "/faq":
      return generateFaqMarkdown(origin);
    case "/process":
      return generateProcessMarkdown(origin);
    case "/privacy-policy":
      return generatePrivacyPolicyMarkdown(origin);
    case "/terms-and-conditions":
    case "/terms-of-service":
      return generateTermsMarkdown(origin);
    case "/cancellation-refund-policy":
      return generateRefundPolicyMarkdown(origin);
    default:
      return generateGenericMarkdown(pathname, origin);
  }
}

function generateHomeMarkdown(origin: string): string {
  return `---
title: ${BRAND.name} — Web, Mobile, AI and Enterprise Software Systems
description: ${BRAND.name} builds web platforms, native Android apps, CRM/ERP systems and AI automation. Founded in ${BRAND.foundedYear} by ${BRAND.founder} in Shajapur & Indore, MP.
url: ${origin}
canonical: ${BRAND.url}
entity: ${BRAND.name}
founder: ${BRAND.founder} (${BRAND.founderRole})
msme_udyam: ${BRAND.udyamNumber}
gstin: ${BRAND.gstin}
operating_base: ${BRAND.operatingBase}
headquarters: ${BRAND.location}
---

# ${BRAND.name}

> "${BRAND.tagline}"

${BRAND.name} is a high-performance software engineering and digital systems company founded in April 2020 by ${BRAND.founder}. Operating from ${BRAND.operatingBase} and headquartered in ${BRAND.city}, Madhya Pradesh, we build mission-critical web platforms, native mobile applications, custom ERP & CRM suites, and autonomous AI workflow pipelines.

- **Founder & CEO**: ${BRAND.founder} (${BRAND.founderAlias})
- **Government MSME Udyam**: \`${BRAND.udyamNumber}\` (Micro Enterprise, Government of India)
- **GSTIN**: \`${BRAND.gstin}\` (Registered Taxpayer in Madhya Pradesh)
- **Official Website**: ${BRAND.url}
- **Direct WhatsApp / Call**: ${BRAND.phoneDisplay} (${BRAND.phoneE164})
- **Official Email**: ${BRAND.email} (Support: ${BRAND.supportEmail})

---

## Core Engineering Services

${SERVICE_LINES.map(
  (s, idx) => `### ${idx + 1}. [${s.title}](${origin}/services/${s.slug})
- **Summary**: ${s.description}
- **Key Capabilities**: ${s.points.join(" • ")}
- **Showroom Link**: ${origin}/services/${s.slug}`
).join("\n\n")}

---

## Architectural & Technology Stack

${TECH_STACK.map((t) => `- **${t.group}**: ${t.items.join(", ")}`).join("\n")}

- **Engineering Principles**: 100% Parameterized SQL (Drizzle ORM), Zero-Trust Edge Security (Cloudflare Tunnels, 0 Inbound Open Ports), 14ms Global TTFB, Android 15 Target SDK 35 compliance, Offline-first SQLite persistence.

---

## Venture Ecosystem & Subsidiaries

${VENTURES.map(
  (v) => `- **${v.name}** (${v.sector}): ${v.description} ([Learn More](${origin}/subsidiaries))`
).join("\n")}

---

## Generative Engine & Answer Capsules (AEO)

${FAQS.slice(0, 5)
  .map(
    (f) => `### Q: ${f.question}
**A**: ${f.answer}`
  )
  .join("\n\n")}

---

## Structured Data Triplet (JSON-LD)

\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "${BRAND.name}",
  "url": "${BRAND.url}",
  "foundingDate": "${BRAND.foundedMonthIso}",
  "founder": {
    "@type": "Person",
    "name": "${BRAND.founder}",
    "jobTitle": "${BRAND.founderRole}"
  },
  "taxID": "${BRAND.gstin}",
  "vatID": "${BRAND.udyamNumber}",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "${BRAND.addressLine}",
    "addressLocality": "${BRAND.city}",
    "addressRegion": "Madhya Pradesh",
    "postalCode": "${BRAND.postalCode}",
    "addressCountry": "IN"
  },
  "telephone": "${BRAND.phoneE164}",
  "email": "${BRAND.email}"
}
\`\`\`
`;
}

function generateServiceMarkdown(
  slug: string,
  service: typeof EXTENDED_SERVICE_DATA[string],
  origin: string
): string {
  const line = SERVICE_LINES.find((s) => s.slug === slug);
  const title = line?.title || service.heroBadge;

  return `---
title: ${title} — ${BRAND.name}
description: ${service.subheading}
url: ${origin}/services/${slug}
canonical: ${BRAND.url}/services/${slug}
service_tag: ${service.theme.tag}
provider: ${BRAND.name} (${BRAND.founder})
msme_udyam: ${BRAND.udyamNumber}
gstin: ${BRAND.gstin}
---

# ${title}

> ${service.subheading}

${service.philosophyText.join("\n\n")}

---

## Key Performance Telemetry

${service.stats.map((s) => `- **${s.label} (${s.value})**: ${s.detail}`).join("\n")}

---

## Architecture & Engineering Pillars

${service.pillars
  .map(
    (p, idx) => `### Pillar 0${idx + 1}: ${p.title}
*Tagline: ${p.tagline}*

${p.description}

**Technical Specifications**:
${p.specs.map((spec) => `- ${spec}`).join("\n")}`
  )
  .join("\n\n")}

---

## Production Deliverables & Assets

${service.deliverables
  .map(
    (d) => `### ${d.title} (${d.format})
- **Description**: ${d.description}
- **Category Badge**: ${d.badge}`
  )
  .join("\n\n")}

---

## Technology Stack & Industry Standards

${service.tools
  .map(
    (tool) => `- **[${tool.name}](${tool.url || "#"})** (${tool.category}): ${tool.description}`
  )
  .join("\n")}

---

## Answer Engine & AEO Capsules (Direct Answers)

${service.aeoCapsules
  .map(
    (c) => `### Q: ${c.query}
**Direct Answer**: ${c.answer}

> **Key Takeaway**: ${c.keyTakeaway}`
  )
  .join("\n\n")}

---

## Comparison: Generic Agency Approach vs MLHK Engineering Standard

${service.comparison
  .map(
    (comp) => `### Aspect: ${comp.aspect}
- **Generic Agency Setup**: ${comp.genericApproach}
- **MLHK Engineering Standard**: ${comp.mlhkApproach}`
  )
  .join("\n\n")}

---

## Execution Timeline & Milestones

${service.timeline
  .map(
    (t) => `### ${t.phase} (${t.timeline}): ${t.title}
${t.description}
- **Outputs**: ${t.outputs.join(", ")}`
  )
  .join("\n\n")}

---

## Frequently Asked Questions

${service.extendedFaqs
  .map(
    (faq) => `### Q: ${faq.question}
**A**: ${faq.answer}`
  )
  .join("\n\n")}

---

## Consultation & Commercial Engagements

- **Entity**: ${BRAND.name} (MSME: \`${BRAND.udyamNumber}\` • GSTIN: \`${BRAND.gstin}\`)
- **Direct Engineer Helpline**: ${BRAND.phoneDisplay} ([WhatsApp Instant Chat](https://wa.me/919165100124?text=Hello%20MLHK%20Infotech%2C%20inquiry%20regarding%20${encodeURIComponent(
    title
  )}))
- **Email**: ${BRAND.email}

\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "${title}",
  "serviceType": "${service.heroBadge}",
  "provider": {
    "@type": "ProfessionalService",
    "name": "${BRAND.name}",
    "url": "${BRAND.url}"
  },
  "url": "${BRAND.url}/services/${slug}",
  "areaServed": "IN"
}
\`\`\`
`;
}

function generateServicesCatalogMarkdown(origin: string): string {
  return `---
title: Bespoke Digital Engineering Services — ${BRAND.name}
description: Explore MLHK Infotech's comprehensive catalog of 8 specialized engineering showrooms: Web, Mobile, AI Automation, Enterprise ERP/CRM, Cybersecurity, and 24/7 DevOps Support.
url: ${origin}/services
canonical: ${BRAND.url}/services
provider: ${BRAND.name}
---

# Digital Engineering Services Catalog

${BRAND.name} delivers 8 bespoke, specialized engineering domains built on industrial standards, sub-50ms latency, zero open-port infrastructure, and verified Indian statutory compliance (GST & MSME).

${SERVICE_LINES.map(
  (s, i) => `## ${i + 1}. [${s.title}](${origin}/services/${s.slug})
- **Summary**: ${s.description}
- **Deliverables**: ${s.points.join(" • ")}
- **Direct Showroom Link**: ${origin}/services/${s.slug}`
).join("\n\n")}

---

## Book a Technical Discovery Session
- Direct Helpline: ${BRAND.phoneDisplay}
- WhatsApp: [Instant Chat](https://wa.me/919165100124)
- Email: ${BRAND.email}
`;
}

function generateAboutMarkdown(origin: string): string {
  return `---
title: About ${BRAND.name} — Founder, Origins & Mission
description: Founded in April 2020 by Hariom Vishwkarma in Barnawad, Shajapur MP. Discover our history, MSME Udyam accreditation, technical values, and national alignment.
url: ${origin}/about
canonical: ${BRAND.url}/about
---

# About ${BRAND.name}

> "Innovate. Integrate. Elevate. We Build Digital Power."

Founded on 1 April 2020 in Barnawad, Shajapur district, Madhya Pradesh by ${BRAND.founder}, ${BRAND.name} is a premier Indian technology enterprise operating across Shajapur, Indore, and pan-India.

## Verified Credentials
- **Founder & CEO**: ${BRAND.founder} (${BRAND.founderAlias})
- **Academic Background**: ${BRAND.university}
- **MSME Registration**: \`${BRAND.udyamNumber}\`
- **GSTIN**: \`${BRAND.gstin}\`
- **Headquarters**: ${BRAND.location}
- **Operating Base**: ${BRAND.operatingBase}

## Company Milestones & Timeline (2020–2026)
${TIMELINE.map((t) => `- **${t.year} (${t.title})**: ${t.event}`).join("\n")}

## National Mission & Pride
Built with Pride in Bharat 🇮🇳. Supporting Digital India, Make in India, and Atmanirbhar Bharat by creating world-class software engineering capacity beyond metro centers.
`;
}

function generatePortfolioMarkdown(origin: string): string {
  return `---
title: Selected Work & Portfolio — ${BRAND.name}
description: Delivered web platforms, native Android apps, custom enterprise systems, and automated pipelines engineered by MLHK Infotech.
url: ${origin}/portfolio
canonical: ${BRAND.url}/portfolio
---

# Selected Work & Production Platforms

${BRAND.name} has shipped over 20+ production systems across ecommerce, healthcare, manufacturing, enterprise ERP, and creative design.

- **Explore Live Deployments**: Visit ${origin}/portfolio for interactive case studies.
- **Request NDA Protected Case Studies**: Email ${BRAND.email} or WhatsApp ${BRAND.phoneDisplay}.
`;
}

function generateContactMarkdown(origin: string): string {
  return `---
title: Contact & Technical Enquiries — ${BRAND.name}
description: Get in touch with Hariom Vishwkarma and the MLHK Infotech software engineering desk. Based in Shajapur & Indore, Madhya Pradesh.
url: ${origin}/contact
canonical: ${BRAND.url}/contact
---

# Contact & Technical Discovery

Reach out to schedule an architecture scoping consultation with senior engineers.

- **Founder & CEO**: ${BRAND.founder}
- **Telephone / WhatsApp**: [${BRAND.phoneDisplay}](https://wa.me/919165100124)
- **Primary Business Email**: [${BRAND.email}](mailto:${BRAND.email})
- **Technical Support Email**: [${BRAND.supportEmail}](mailto:${BRAND.supportEmail})
- **Operational Office**: ${BRAND.operatingBase}
- **Registered Address**: ${BRAND.location}
- **Hours of Operation**: Monday to Saturday, 09:30 AM to 07:00 PM IST (24/7 SLA on-call for active retainers)
`;
}

function generateSubsidiariesMarkdown(origin: string): string {
  return `---
title: Subsidiaries & Venture Ecosystem — ${BRAND.name}
description: Brands and ventures founded or managed within the MLHK Infotech operational ecosystem.
url: ${origin}/subsidiaries
canonical: ${BRAND.url}/subsidiaries
---

# MLHK Venture Ecosystem & Subsidiaries

${VENTURES.map(
  (v, idx) => `## ${idx + 1}. ${v.name}
- **Sector**: ${v.sector}
- **Overview**: ${v.description}
- **Domain**: ${v.domain} • **Badge**: ${v.badge}`
).join("\n\n")}
`;
}

function generateFaqMarkdown(origin: string): string {
  return `---
title: Frequently Asked Questions (FAQ) — ${BRAND.name}
description: Authoritative answers regarding development timelines, Indian GST billing, Cloudflare serverless hosting costs, and security standards.
url: ${origin}/faq
canonical: ${BRAND.url}/faq
---

# Frequently Asked Questions

${FAQS.map(
  (f, i) => `### ${i + 1}. ${f.question}
${f.answer}`
).join("\n\n")}
`;
}

function generateProcessMarkdown(origin: string): string {
  return `---
title: Engineering & Delivery Methodology — ${BRAND.name}
description: Our 5-step software development lifecycle from initial discovery and prototyping to hardened deployment and 24/7 telemetry.
url: ${origin}/process
canonical: ${BRAND.url}/process
---

# Our 5-Stage Engineering Methodology

1. **Stage 1: Discovery & Scoping**: Detailed functional requirements, schema mapping, and API contract design.
2. **Stage 2: Ergonomic Prototyping**: High-fidelity clickable wireframes and OKLCH design token systems.
3. **Stage 3: Agile Engineering**: Weekly software releases with strict TypeScript compilation and 100% parameterized queries.
4. **Stage 4: Hardened Launch**: Zero open-port Cloudflare Tunnel deployment, A+ SSL Labs verification, and OWASP Top 10 scans.
5. **Stage 5: 24/7 Telemetry & SLA**: 60-second synthetic uptime checks and automated disaster recovery.
`;
}

function generatePrivacyPolicyMarkdown(origin: string): string {
  return `---
title: Privacy Policy — ${BRAND.name}
description: Privacy policies governing user data, compliance with India's Digital Personal Data Protection Act (DPDP Act) 2023 and DPDP Rules 2025.
url: ${origin}/privacy-policy
canonical: ${BRAND.url}/privacy-policy
---

# Privacy Policy

**Effective Date**: April 2020  
**Last Updated**: October 2026  
**Governing Body**: ${BRAND.name} (Founder: ${BRAND.founder}, Shajapur MP)

${BRAND.name} adheres strictly to India's **Digital Personal Data Protection Act, 2023 (DPDP Act)** and **DPDP Rules, 2025**. We do not sell, rent, or trade client personal or transactional data. All database storage is encrypted at rest using AES-256 and in transit via TLS 1.3.

- **Data Protection Officer Contact**: \`${BRAND.email}\`
- **Registered Address**: ${BRAND.location}
`;
}

function generateTermsMarkdown(origin: string): string {
  return `---
title: Terms & Conditions — ${BRAND.name}
description: Commercial terms, milestone payment structures, software governance, and dispute jurisdiction under Indian law.
url: ${origin}/terms-and-conditions
canonical: ${BRAND.url}/terms-and-conditions
---

# Terms & Conditions

**Legal Entity**: ${BRAND.name} (MSME: \`${BRAND.udyamNumber}\`, GSTIN: \`${BRAND.gstin}\`)  
**Jurisdiction**: Courts of Shajapur and High Court of Madhya Pradesh (Indore Bench), India.

All software development agreements are governed by signed milestone deliverables. Code repositories are transferred upon final invoice settlement. Source code is provided with standard commercial licenses ensuring full client data sovereignty.
`;
}

function generateRefundPolicyMarkdown(origin: string): string {
  return `---
title: Cancellation & Refund Policy — ${BRAND.name}
description: Transparent milestone cancellation policies and 5-7 business day refund protocols.
url: ${origin}/cancellation-refund-policy
canonical: ${BRAND.url}/cancellation-refund-policy
---

# Cancellation & Refund Policy

${BRAND.name} maintains transparent, milestone-governed refund policies:
- Milestone advances for uninitiated phases are refunded within 5–7 business days to the original payment source.
- Delivered and accepted code deliverables under completed milestone sign-offs are non-refundable.
- For refund queries, contact \`${BRAND.supportEmail}\` or \`${BRAND.email}\`.
`;
}

function generateGenericMarkdown(pathname: string, origin: string): string {
  return `---
title: ${BRAND.name} — Digital Systems & Software Engineering
description: Machine-readable page context for ${pathname} on ${BRAND.name}.
url: ${origin}${pathname}
canonical: ${BRAND.url}${pathname}
provider: ${BRAND.name}
---

# ${BRAND.name} — ${pathname}

> Machine-readable specification for ${pathname}

- **Organization**: ${BRAND.name} (${BRAND.founder})
- **Official URL**: ${BRAND.url}
- **MSME Udyam**: \`${BRAND.udyamNumber}\` • **GSTIN**: \`${BRAND.gstin}\`
- **Helpline**: ${BRAND.phoneDisplay} • **Email**: ${BRAND.email}

For the complete catalog of services and technical specifications, explore:
- [Services Index](${origin}/services)
- [LLMs Standard Spec](${origin}/llms.txt)
- [Full Extended Dossier](${origin}/llms-full.txt)
`;
}
