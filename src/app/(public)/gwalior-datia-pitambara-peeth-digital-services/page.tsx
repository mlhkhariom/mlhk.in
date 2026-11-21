import type { Metadata } from "next";
import { buildMpSiloMetadata, getMpSiloPageOrThrow } from "@/lib/mp-silo-pages";
import { MpSiloPageView } from "@/components/public/MpSiloPageView";

const PAGE = getMpSiloPageOrThrow("/gwalior-datia-pitambara-peeth-digital-services");

export async function generateMetadata(): Promise<Metadata> {
  return buildMpSiloMetadata(PAGE);
}

export default function GwaliorDatiaPitambaraPage() {
  return <MpSiloPageView page={PAGE} />;
}
