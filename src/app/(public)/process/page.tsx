import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buildSeo } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/public/Breadcrumbs";
import { PageHero } from "@/components/public/PageHero";
import { BRAND } from "@/lib/brand";

const STEPS = [
  {
    step: "Discover",
    text: "We map the users, workflows, data and the outcome you want. Scope and success measures are written down before design begins.",
  },
  {
    step: "Design",
    text: "Screens, data model and integrations are agreed with you. Changes are cheap at this stage and expensive later, so we settle them early.",
  },
  {
    step: "Build",
    text: "Work is delivered in working increments that you can test. Critical paths have automated tests, and each increment is reviewed with you.",
  },
  {
    step: "Launch",
    text: "Before go-live we run a security review, check access controls and performance, and plan the rollout and data migration where needed.",
  },
  {
    step: "Support",
    text: "After launch we monitor uptime and errors, apply security updates and handle fixes under the support plan you choose.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: "How We Work",
    description:
      "Our five-step delivery process for web, mobile, enterprise and AI projects: discover, design, build, launch and support.",
    path: "/process",
  });
}

export default function ProcessPage() {
  return (
    <>
      <JsonLd
        data={{
          "@type": "HowTo",
          name: `How ${BRAND.name} delivers a project`,
          description: "Five stages from discovery to ongoing support.",
          step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.step, text: s.text })),
        }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "How we work" }]} />

      <PageHero
        eyebrow="Process"
        title={<>Five steps from idea to a system you <span className="text-brand">can depend on.</span></>}
        description="Every project follows the same stages, so you always know what has been decided, what is being built and what comes next."
      />

      <section className="bg-[#050607] px-4 pb-24 md:px-6">
        <ol className="mx-auto max-w-4xl">
          {STEPS.map((s, i) => (
            <li key={s.step} className="grid grid-cols-[3rem_1fr] gap-6 border-t border-white/10 py-10 md:grid-cols-[4rem_1fr]">
              <span className="font-display text-sm font-bold text-[#ff9f1c] tabular-nums">0{i + 1}</span>
              <div>
                <h2 className="font-display text-2xl font-bold text-white">{s.step}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mx-auto mt-10 max-w-4xl rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-8">
          <p className="font-display text-lg font-bold text-white">Want a plan before you commit?</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Tell us what you need. We reply with a proposed scope, the stages above and a timeline.
          </p>
          <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#ffb84d] hover:text-white">
            Start a conversation <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
