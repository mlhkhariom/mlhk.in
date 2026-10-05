import type { Metadata } from "next";
import Link from "next/link";
import { buildSeo } from "@/lib/seo";
import Breadcrumbs from "@/components/public/Breadcrumbs";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: "Privacy Policy",
    description: "How MLHK Infotech collects, uses, and protects your personal data in compliance with the IT Act, 2000 (as amended 2026) and DPDP Act, 2023.",
    path: "/privacy-policy",
  });
}

const sections = [
  {
    heading: "1. Information We Collect",
    content:
      "We collect information you provide directly (name, email, phone, company name) through our contact form, client portal registration, and project communications. We also collect technical data (IP address, browser type, device info) automatically when you visit our website. Under the Digital Personal Data Protection Act, 2023 (DPDP Act) and the Information Technology Act, 2000 (as amended in 2026), we process data only with a lawful basis and your explicit consent.",
  },
  {
    heading: "2. Purpose of Data Collection",
    content:
      "Your data is used to: (a) respond to inquiries and provide quotations; (b) deliver services under agreed contracts; (c) send project updates and invoices; (d) comply with legal obligations under Indian law; (e) improve our website and services through anonymized analytics. We do NOT sell, rent, or trade your personal data to third parties.",
  },
  {
    heading: "3. Data Storage & Security",
    content:
      "All data is stored on Cloudflare's infrastructure (D1 Database, R2 Storage, KV) with encryption at rest and in transit. Access is restricted to authorized personnel only. We implement industry-standard security measures including HTTPS/TLS 1.3, Content Security Policy headers, rate limiting, and input sanitization as mandated under Section 43A of the IT Act, 2000 and the 2026 amendment provisions.",
  },
  {
    heading: "4. Data Retention",
    content:
      "We retain personal data only as long as necessary for the purposes outlined above. Client project data is retained for 7 years post-completion as per Indian tax and contract law requirements. You may request deletion of your data at any time by emailing Mlhkinfotech@gmail.com. Upon request, we will erase your data within 30 days unless retention is legally required.",
  },
  {
    heading: "5. Your Rights (DPDP Act, 2023)",
    content:
      "Under the Digital Personal Data Protection Act, 2023, you have the right to: (a) access your personal data; (b) correct inaccurate data; (c) erase your data; (d) restrict processing; (e) withdraw consent; (f) nominate another individual to exercise these rights on your behalf; (g) file a complaint with the Data Protection Board of India. To exercise these rights, contact us at Mlhkinfotech@gmail.com.",
  },
  {
    heading: "6. Cookies & Analytics",
    content:
      "We use Cloudflare Web Analytics for privacy-preserving, cookie-free analytics. No tracking cookies are set. Essential cookies may be used for session management in the client portal (login state). You can block all cookies in your browser settings without affecting access to public pages.",
  },
  {
    heading: "7. Third-Party Services",
    content:
      "We use the following third-party services: Cloudflare (hosting, CDN, database), Resend (email delivery), GitHub (code hosting). These processors are contractually bound to protect your data. No data is transferred outside India except to Cloudflare's global CDN edge locations for content delivery purposes.",
  },
  {
    heading: "8. Children's Privacy",
    content:
      "Our services are not directed at children under 18. We do not knowingly collect personal data from minors. If you believe a child has provided us data, contact us immediately for deletion.",
  },
  {
    heading: "9. Grievance Redressal (IT Act, 2000 — Section 43A & 2026 Rules)",
    content:
      "In accordance with the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, we have appointed a Grievance Officer. For any privacy-related complaints, contact: Grievance Officer, MLHK Infotech, Near Hanuman Temple, Barnawad, Shajapur, Madhya Pradesh 466001. Email: Mlhkinfotech@gmail.com. We will acknowledge complaints within 24 hours and resolve them within 30 days.",
  },
  {
    heading: "10. Changes to This Policy",
    content:
      "We may update this Privacy Policy periodically. Material changes will be notified via email or a prominent notice on our website. The 'Last Updated' date at the top reflects the latest revision. Continued use of our services after changes constitutes acceptance.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Last Updated: January 2026</p>

        {sections.map((s) => (
          <section key={s.heading} className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-2">{s.heading}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{s.content}</p>
          </section>
        ))}

        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-500 mb-4">
            For any privacy-related queries, contact us at{" "}
            <a href="mailto:Mlhkinfotech@gmail.com" className="text-blue-600 hover:underline">Mlhkinfotech@gmail.com</a>
          </p>
          <Link href="/" className="text-sm text-blue-600 hover:underline">← Back to Home</Link>
        </div>
      </div>
    </>
  );
}