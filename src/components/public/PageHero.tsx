import type { ReactNode } from "react";

/** Shared inner-page header: clean unboxed eyebrow, balanced display title, and crisp lede. */
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
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-30%] h-[320px] w-[80vw] max-w-4xl -translate-x-1/2 rounded-full bg-[#ff9f1c]/14 blur-[100px] sm:h-[420px] sm:blur-[120px]"
      />
      <div className="relative mx-auto max-w-6xl">
        <p className="text-xs font-semibold tracking-wide text-[#ffb84d]">
          {eyebrow}
        </p>
        <h1 className="mt-3.5 max-w-4xl text-balance font-display text-3xl font-bold leading-[1.08] tracking-tight text-white sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:mt-5 sm:text-base md:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
