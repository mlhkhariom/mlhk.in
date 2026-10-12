import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const aiAgents = [
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

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/llms.txt",
          "/llms-full.txt",
          "/humans.txt",
          "/.well-known/security.txt",
          "/security.txt",
          "/feed.xml",
          "/sitemap.xml",
          "/api/media/",
          "/api/contact",
        ],
        disallow: [
          "/admin/",
          "/portal/",
          "/api/auth/",
          "/api/admin/",
          "/_next/",
          "/private/",
        ],
      },
      ...aiAgents.map((agent) => ({
        userAgent: agent,
        allow: [
          "/",
          "/llms.txt",
          "/llms-full.txt",
          "/humans.txt",
          "/services/",
          "/about",
          "/portfolio",
          "/subsidiaries",
          "/blog",
          "/faq",
          "/process",
          "/contact",
          "/privacy-policy",
          "/terms-of-service",
        ],
        disallow: [
          "/admin/",
          "/portal/",
          "/api/auth/",
          "/api/admin/",
        ],
      })),
    ],
    sitemap: "https://mlhk.in/sitemap.xml",
    host: "https://mlhk.in",
  };
}
