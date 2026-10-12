/**
 * llms.txt: machine-readable site summary for AI assistants (AEO/GEO).
 * Specification: https://llmstxt.org/
 * Built from src/lib/brand.ts so it always matches the pages on the site.
 */
import { BRAND, SERVICE_LINES, CAPABILITIES, VENTURES, SERVICE_DETAILS } from "@/lib/brand";

const serviceLine = (slug: string) => SERVICE_DETAILS.find((s) => s.slug === slug);

const CONTENT = `# ${BRAND.name}

> ${BRAND.name} is a technology company in ${BRAND.location}, founded in ${BRAND.foundedYear} by ${BRAND.founder} (${BRAND.founderRole}). It builds web platforms, Android apps, enterprise systems (CRM, ERP, HRMS, billing, inventory and workflows), and AI-based operational automation for businesses across India. Tagline: "${BRAND.tagline}"

## Services
${SERVICE_LINES.map((s) => `- [${s.title}](${BRAND.url}/services/${s.slug}): ${s.description}`).join("\n")}
${CAPABILITIES.map((c) => `- [${c.title}](${BRAND.url}/${c.slug === "ai-automation" ? "ai-automation" : `services/${c.slug}`}): ${c.description}`).join("\n")}
- [How we work](${BRAND.url}/process): five delivery stages, from discovery to support.

## Company
- [About ${BRAND.name}](${BRAND.url}/about): history, founder and timeline.
- [Our ventures](${BRAND.url}/subsidiaries): ${VENTURES.map((v) => v.name).join(", ")}.
- [Portfolio](${BRAND.url}/portfolio): selected work and case studies as they are published.

## Answers
- [Frequently asked questions](${BRAND.url}/faq): services, timelines, support, data protection and AI automation.

## Blog
- [Journal](${BRAND.url}/blog): notes on building and running software for businesses.
- [RSS feed](${BRAND.url}/feed.xml): published articles.

## Contact
- [Contact page](${BRAND.url}/contact): project enquiries.
- Email: ${BRAND.email}
- Phone: ${BRAND.phoneDisplay}
- Instagram: ${BRAND.instagramUrl}
- Location: ${BRAND.location}

## Legal
- [Privacy policy](${BRAND.url}/privacy-policy): personal data handling under the Digital Personal Data Protection Act, 2023 and the DPDP Rules, 2025.
- [Terms of service](${BRAND.url}/terms-of-service): terms under the laws of India.

## Facts
- Founded: ${BRAND.foundedYear} (April), in Barnawad, Shajapur, Madhya Pradesh.
- Founder: ${BRAND.founder}.
- Service lines: ${SERVICE_LINES.length} core lines plus ${CAPABILITIES.length} capability areas.
- Ventures: ${VENTURES.length}.
- Language: English (India). Timezone: Asia/Kolkata.
- Site: ${BRAND.url}
`;

export async function GET() {
  return new Response(CONTENT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
