import type { Metadata } from "next";
import { buildSeo } from "@/lib/seo";
import TermsAndConditionsPage from "../terms-and-conditions/page";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: "Terms & Conditions",
    description:
      "Commercial terms, scope of services, pricing, payment milestones, delivery timelines, intellectual property, and dispute resolution governing MLHK Infotech engagements.",
    path: "/terms-and-conditions",
  });
}

export default function TermsOfServiceAlias() {
  return <TermsAndConditionsPage />;
}
