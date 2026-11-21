import type { Metadata } from "next";
import { buildMpSiloMetadata, getMpSiloPageOrThrow } from "@/lib/mp-silo-pages";
import { MpSiloPageView } from "@/components/public/MpSiloPageView";

const PAGE = getMpSiloPageOrThrow("/hi/ujjain-simhastha-2028-digital-taiyari");

export async function generateMetadata(): Promise<Metadata> {
  return buildMpSiloMetadata(PAGE);
}

export default function HindiUjjainSimhastha2028Page() {
  return <MpSiloPageView page={PAGE} />;
}
