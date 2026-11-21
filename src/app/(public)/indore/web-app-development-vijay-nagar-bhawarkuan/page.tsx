import type { Metadata } from "next";
import { buildMpSiloMetadata, getMpSiloPageOrThrow } from "@/lib/mp-silo-pages";
import { MpSiloPageView } from "@/components/public/MpSiloPageView";

const PAGE = getMpSiloPageOrThrow("/indore/web-app-development-vijay-nagar-bhawarkuan");

export async function generateMetadata(): Promise<Metadata> {
  return buildMpSiloMetadata(PAGE);
}

export default function IndoreVijayNagarBhawarkuanPage() {
  return <MpSiloPageView page={PAGE} />;
}
