/**
 * humans.txt: Standard author and craft credits file.
 * Specification: https://humanstxt.org/
 */
import { BRAND } from "@/lib/brand";

export const dynamic = "force-static";
export const revalidate = 86400;

const HUMANS_TXT = `/* TEAM */
  Founder & Lead Architect: ${BRAND.founder}
  Title: ${BRAND.founderRole}
  Contact: ${BRAND.email}
  Location: ${BRAND.location}
  Operational Base: ${BRAND.operatingBase}
  Instagram: ${BRAND.instagramUrl}
  GitHub: ${BRAND.githubUrl}

/* SITE */
  Standards: HTML5, CSS3, ES2024, TypeScript
  Framework: Next.js 16 (App Router), React 19
  Styling: Tailwind CSS v4, tw-animate-css
  Motion & Visuals: GSAP (GreenSock), Three.js / React Three Fiber
  Backend & Edge: Cloudflare Workers, Cloudflare D1 (SQL), Cloudflare KV, Cloudflare R2
  Authentication: Better-Auth with Argon2id Password Hashing & Edge Session Management
  Typography: Geist Sans, Unbounded Display
  Color Palette: Void Obsidian (#050607), Pure Black (#000000), MLHK Amber Glow (#ff9f1c, #ffb84d)
  Language: English (India) [en-IN]
  Encoding: UTF-8

/* THANKS */
  Next.js & Vercel Team
  Cloudflare & OpenNext Authors
  GreenSock (GSAP)
  The Global Open Source Engineering Community

/* COLOPHON */
  Built with pride in Barnawad, Shajapur & Indore, Madhya Pradesh, India.
  "Innovate. Integrate. Elevate."
`;

export async function GET() {
  return new Response(HUMANS_TXT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
