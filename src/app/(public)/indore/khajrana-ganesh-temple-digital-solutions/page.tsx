import type { Metadata } from "next";
import { buildMpSiloMetadata, getMpSiloPageOrThrow } from "@/lib/mp-silo-pages";
import { MpSiloPageView } from "@/components/public/MpSiloPageView";

const PAGE = getMpSiloPageOrThrow("/indore/khajrana-ganesh-temple-digital-solutions");

export async function generateMetadata(): Promise<Metadata> {
  return buildMpSiloMetadata(PAGE);
}

export default function IndoreKhajranaGaneshDigitalPage() {
  return <MpSiloPageView page={PAGE} />;
}
