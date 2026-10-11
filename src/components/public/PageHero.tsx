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
    <section className="relative isolate overflow-hidden bg-[#050607] px-4 pb-16 pt-4 md:px-6 md:pb-20 md:pt-8">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[-30%] h-[420px] w-[80vw] max-w-4xl -translate-x-1/2 rounded-full bg-[#ff9f1c]/15 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">
          <span className="size-1.5 rounded-full bg-[#ff9f1c] shadow-[0_0_10px_#ff9f1c]" />
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
          {title}
        </h1>
        {description && <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">{description}</p>}
      </div>
    </section>
  );
}
