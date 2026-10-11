"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/components/home/utils";

gsap.registerPlugin(ScrollTrigger);

type AnimatedCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
};

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) {
      setDisplay(value);
      return;
    }

    const ctx = gsap.context(() => {
      const state: { current: number } = { current: 0 };
      gsap.to(state, {
        current: value,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => {
          setDisplay(state.current);
        },
        scrollTrigger: {
          trigger: el,
          start: "top 78%",
          once: true,
          markers: false,
        },
      });
    });
    return () => ctx.revert();
  }, [value, reduced]);

  const format = (n: number): string => {
    if (decimals <= 0) return Math.round(n).toLocaleString();
    return n.toFixed(decimals);
  };

  return (
    <span
      ref={ref}
      className={cn("tabular-nums", className)}
      aria-label={`${prefix}${format(value)}${suffix}`}
    >
      {prefix}{format(display)}{suffix}
    </span>
  );
}
