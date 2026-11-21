import type { Metadata } from "next";
import { buildMpSiloMetadata, getMpSiloPageOrThrow } from "@/lib/mp-silo-pages";
import { MpSiloPageView } from "@/components/public/MpSiloPageView";

const PAGE = getMpSiloPageOrThrow("/hi/maa-baglamukhi-nalkheda-havan-pujan-website-seo");

export async function generateMetadata(): Promise<Metadata> {
  return buildMpSiloMetadata(PAGE);
}

export default function HindiMaaBaglamukhiNalkhedaPage() {
  return <MpSiloPageView page={PAGE} />;
}
