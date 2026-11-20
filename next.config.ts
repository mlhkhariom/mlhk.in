import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/**
 * Security & Discovery headers.
 *
 * Note on CSP: Next.js hydration requires inline scripts, so `script-src` keeps
 * `'unsafe-inline'`. Primary XSS defences are admin auth, `src/lib/sanitize.ts`,
 * and sandboxed SVG delivery on `/api/media/*`.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Vary", value: "Accept" },
  {
    key: "Link",
    value:
      '</.well-known/api-catalog>; rel="api-catalog", </llms.txt>; rel="describedby"; type="text/plain", </llms-full.txt>; rel="service-doc"; type="text/plain", </sitemap.xml>; rel="sitemap"; type="application/xml"',
  },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://cloudflareinsights.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const noIndexHeaders = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/terms-of-service",
        destination: "/terms-and-conditions",
        permanent: true,
      },
      {
        source: "/ai-automation",
        destination: "/services/ai-automation",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/admin/:path*", headers: noIndexHeaders },
      { source: "/portal/:path*", headers: noIndexHeaders },
      { source: "/login", headers: noIndexHeaders },
      { source: "/register", headers: noIndexHeaders },
      { source: "/api/:path*", headers: noIndexHeaders },
    ];
  },
};

export default nextConfig;

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
initOpenNextCloudflareForDev();
