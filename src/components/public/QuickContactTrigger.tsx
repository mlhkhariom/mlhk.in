"use client";

import { ArrowUpRight } from "lucide-react";
import { dispatchOpenContactModal, type OpenContactModalDetail } from "./QuickContactModal";

export function QuickContactTrigger({
  children,
  city,
  service,
  budget,
  lang,
  className,
}: OpenContactModalDetail & {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => dispatchOpenContactModal({ city, service, budget, lang })}
      className={
        className ??
        "inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#ff9f1c] px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02] hover:bg-[#ffb84d] whitespace-nowrap"
      }
    >
      <span>{children}</span>
      <ArrowUpRight className="size-4 shrink-0" />
    </button>
  );
}
