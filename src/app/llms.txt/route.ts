/**
 * llms.txt — Machine-readable site description for AI agents (AEO/GEO).
 * Follows the llms.txt specification: https://llmstxt.org/
 */

const CONTENT = `# MLHK Infotech

> MLHK Infotech is an enterprise-grade IT & Digital Solutions company based in Barnawad, Shajapur, Madhya Pradesh, India. Founded in April 2020 by Hariom Vishwkarma, we provide web development, mobile apps, SaaS, CRM/ERP, AI automation, cybersecurity, and digital marketing services.

## About
- [About Us](https://mlhk.in/about): Company history, mission, and founder details. Founded 2020, bootstrapped from Shajapur, MP.
- [Services](https://mlhk.in/services): Complete technology solutions — Web, Mobile, SaaS, CRM/ERP, AI Automation, Cybersecurity, Digital Marketing.
- [Portfolio](https://mlhk.in/portfolio): Projects built for clients across India.

## Blog
- [Blog](https://mlhk.in/blog): Insights on technology, business, and digital transformation.
- [RSS Feed](https://mlhk.in/feed.xml): RSS 2.0 feed of published blog posts.

## Brands & Subsidiaries
- [Our Brands](https://mlhk.in/subsidiaries): Ecosystem of ventures — Erotix Green Energy (solar), IKSC India (e-commerce), Red Xerox Studio (creative), RX Media (media), TET News (journalism).

## Contact
- [Contact Us](https://mlhk.in/contact): Project inquiries, support. Email: Mlhkinfotech@gmail.com. Location: Barnawad, Shajapur, MP, India.

## Legal
- [Privacy Policy](https://mlhk.in/privacy-policy): Data handling per DPDP Act 2023 and IT Act 2000 (2026 amendment).
- [Terms of Service](https://mlhk.in/terms-of-service): Service terms governed by Indian law.

## Technical Details
- Website: Next.js 16 + Cloudflare Workers + D1 Database + R2 Storage
- Domain: https://mlhk.in
- Language: English (India)
- Timezone: Asia/Kolkata (IST, UTC+5:30)

## FAQ
- What services does MLHK Infotech offer? Web development, mobile apps, SaaS, CRM/ERP, AI automation, cybersecurity, digital marketing.
- Where is MLHK Infotech located? Barnawad, Shajapur, Madhya Pradesh, India.
- When was MLHK Infotech founded? April 2020 by Hariom Vishwkarma.
- How to contact MLHK Infotech? Email Mlhkinfotech@gmail.com or use the contact form at https://mlhk.in/contact.
- What brands does MLHK Infotech operate? Erotix Green Energy, IKSC India, Red Xerox Studio, RX Media, TET News.
`;

export async function GET() {
  return new Response(CONTENT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}