import type { ReactNode } from "react";

/** Shared inner-page header: eyebrow, display title and lede, on the brand background. */
export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#050607] px-4 pb-12 pt-3 sm:pb-16 sm:pt-4 md:px-6 md:pb-20 md:pt-8">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[-30%] h-[320px] sm:h-[420px] w-[80vw] max-w-4xl -translate-x-1/2 rounded-full bg-[#ff9f1c]/15 blur-[100px] sm:blur-[120px]" />
      <div className="relative mx-auto max-w-6xl">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3 py-1 sm:px-3.5 sm:py-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#ffb84d]">
          <span className="size-1.5 rounded-full bg-[#ff9f1c] shadow-[0_0_10px_#ff9f1c]" />
          {eyebrow}
        </p>
        <h1 className="mt-4 sm:mt-6 max-w-4xl font-display text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && <p className="mt-4 sm:mt-6 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base md:text-lg">{description}</p>}
      </div>
    </section>
  );
}
