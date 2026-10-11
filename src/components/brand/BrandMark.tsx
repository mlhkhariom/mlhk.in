import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Navbar and footer mark. Uses the official round brand badge (square source),
 * so no cropping is needed and the mark stays crisp at small sizes.
 */
export function BrandMark({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <span className={cn("relative block size-10 shrink-0 overflow-hidden rounded-full ring-1 ring-[#ff9f1c]/30", className)}>
      <Image src="/brand/badge.png" alt="" fill sizes="40px" priority={priority} className="object-cover" />
    </span>
  );
}

/** Wordmark: MLHK in chrome with INFOTECH in amber, matching the logo lockup. */
export function BrandWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span className="font-display text-lg font-bold tracking-[0.12em] text-chrome">MLHK</span>
      <span className="mt-1 text-[10px] font-semibold tracking-[0.42em] text-brand">INFOTECH</span>
    </span>
  );
}
