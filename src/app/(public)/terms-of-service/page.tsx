import type { Metadata } from "next";
import Link from "next/link";
import { buildSeo } from "@/lib/seo";
import Breadcrumbs from "@/components/public/Breadcrumbs";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: "Terms of Service",
    description: "Terms and conditions governing the use of MLHK Infotech's website and services, compliant with Indian IT Act 2000 (2026 amendment).",
    path: "/terms-of-service",
  });
}

const sections = [
  {
    heading: "1. Acceptance of Terms",
    content:
      "By accessing or using mlhk.in and any services provided by MLHK Infotech, you agree to be bound by these Terms of Service. If you do not agree, do not use our services. These terms are governed by the Information Technology Act, 2000 (as amended in 2026), the Indian Contract Act, 1872, and applicable Indian laws.",
  },
  {
    heading: "2. Services Provided",
    content:
      "MLHK Infotech provides web development, mobile app development, SaaS solutions, CRM/ERP systems, AI automation, cybersecurity consulting, and digital marketing services. Specific deliverables, timelines, and pricing are defined in individual project agreements/contracts signed between the parties.",
  },
  {
    heading: "3. Intellectual Property Rights",
    content:
      "All content on this website (text, images, code, designs, logos) is the property of MLHK Infotech unless otherwise stated. Upon full payment, clients receive ownership of custom-developed project deliverables. MLHK Infotech retains the right to showcase completed projects in its portfolio unless a non-disclosure agreement specifies otherwise.",
  },
  {
    heading: "4. User Responsibilities",
    content:
      "Users must: (a) provide accurate information when using our services; (b) not engage in unauthorized access, hacking, or disruption of our systems; (c) not upload malicious content; (d) comply with all applicable Indian laws including the IT Act, 2000 and 2026 amendments. Violation of these terms may result in immediate termination of access and legal action under Sections 43, 66, 67, and 70 of the IT Act.",
  },
  {
    heading: "5. Limitation of Liability",
    content:
      "To the maximum extent permitted by Indian law, MLHK Infotech shall not be liable for indirect, incidental, special, or consequential damages arising from the use of our website or services. Our total liability shall not exceed the amount paid by the client for the specific service in question.",
  },
  {
    heading: "6. Payment Terms",
    content:
      "Project payments are structured as per individual agreements. Typically: 30% advance, 40% mid-project, 30% on delivery. Invoices are issued with GST as applicable. Late payments attract 18% annual interest. Work may be suspended for accounts overdue beyond 30 days.",
  },
  {
    heading: "7. Data Protection & Privacy",
    content:
      "We process personal data in accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and IT Act, 2000. Please refer to our Privacy Policy for detailed information on data collection, storage, and your rights.",
  },
  {
    heading: "8. Dispute Resolution",
    content:
      "Any disputes arising from these terms shall first be attempted through mutual negotiation. If unresolved within 30 days, disputes shall be referred to arbitration under the Arbitration and Conciliation Act, 1996. The arbitration shall be conducted in Hindi or English, with the seat at Shajapur, Madhya Pradesh. Courts at Shajapur shall have exclusive jurisdiction.",
  },
  {
    heading: "9. Governing Law",
    content:
      "These terms are governed by the laws of India, including but not limited to the Information Technology Act, 2000 (as amended 2026), Indian Contract Act, 1872, Consumer Protection Act, 2019, and Digital Personal Data Protection Act, 2023.",
  },
  {
    heading: "10. Changes to Terms",
    content:
      "We reserve the right to modify these terms at any time. Changes take effect upon posting on this page. Continued use of our services after modifications constitutes acceptance of the revised terms.",
  },
];

export default function TermsOfServicePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]} />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-8">Last Updated: January 2026</p>

        {sections.map((s) => (
          <section key={s.heading} className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-2">{s.heading}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{s.content}</p>
          </section>
        ))}

        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-500 mb-4">
            Questions about these terms? Contact us at{" "}
            <a href="mailto:Mlhkinfotech@gmail.com" className="text-blue-600 hover:underline">Mlhkinfotech@gmail.com</a>
          </p>
          <Link href="/" className="text-sm text-blue-600 hover:underline">← Back to Home</Link>
        </div>
      </div>
    </>
  );
}