import type { Metadata } from "next";
import { buildMpSiloMetadata, getMpSiloPageOrThrow } from "@/lib/mp-silo-pages";
import { MpSiloPageView } from "@/components/public/MpSiloPageView";

const PAGE = getMpSiloPageOrThrow("/maa-baglamukhi-nalkheda-shajapur-digital-portal");

export async function generateMetadata(): Promise<Metadata> {
  return buildMpSiloMetadata(PAGE);
}

export default function MaaBaglamukhiNalkhedaShajapurPage() {
  return <MpSiloPageView page={PAGE} />;
}
