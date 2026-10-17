import { BRAND } from "@/lib/brand";

export const dynamic = "force-static";
export const revalidate = 86400; // 24 hours

const AI_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "Google-Extended",
  "ClaudeBot",
  "Anthropic-ai",
  "Claude-Web",
  "PerplexityBot",
  "Applebot",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "FacebookBot",
  "Bytespider",
  "cohere-ai",
  "Diffbot",
  "Amazonbot",
  "Omgilibot",
];

export async function GET() {
  const content = `# MLHK Infotech — Enterprise Robots Specification
# Content Signals (IETF draft-romm-aipref-contentsignals): https://contentsignals.org/
# Policy Preferences: Allow search indexing and AI input/RAG/citations, restrict foundational model training.

User-agent: *
Content-Signal: ai-train=no, search=yes, ai-input=yes
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /humans.txt
Allow: /.well-known/security.txt
Allow: /.well-known/api-catalog
Allow: /security.txt
Allow: /feed.xml
Allow: /sitemap.xml
Allow: /api/media/
Allow: /api/contact
Disallow: /admin/
Disallow: /portal/
Disallow: /api/auth/
Disallow: /api/admin/
Disallow: /_next/
Disallow: /private/

${AI_AGENTS.map(
  (agent) => `User-agent: ${agent}
Content-Signal: ai-train=no, search=yes, ai-input=yes
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /humans.txt
Allow: /services/
Allow: /about
Allow: /portfolio
Allow: /subsidiaries
Allow: /blog
Allow: /faq
Allow: /process
Allow: /contact
Allow: /privacy-policy
Allow: /terms-and-conditions
Allow: /terms-of-service
Allow: /cancellation-refund-policy
Disallow: /admin/
Disallow: /portal/
Disallow: /api/auth/
Disallow: /api/admin/`
).join("\n\n")}

Host: ${BRAND.url}
Sitemap: ${BRAND.url}/sitemap.xml
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Content-Signal": "ai-train=no, search=yes, ai-input=yes",
    },
  });
}
