"use client";

import { useRef, useEffect, useId } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "./utils";

gsap.registerPlugin(ScrollTrigger);

type AnimatedTextProps = {
  text: string;
  className?: string;
  split?: "words" | "chars";
  revealFrom?: "top" | "bottom" | "left" | "right";
  duration?: number;
  delay?: number;
  stagger?: number;
  once?: boolean;
  onReveal?: () => void;
};

function getFromVars(revealFrom: string): Record<string, unknown> {
  switch (revealFrom) {
    case "top":
      return { y: -60, opacity: 0 };
    case "left":
      return { x: -60, opacity: 0 };
    case "right":
      return { x: 60, opacity: 0 };
    default:
      return { y: 60, opacity: 0 };
  }
}

export function AnimatedText({
  text,
  className = "",
  split = "words",
  revealFrom = "bottom",
  duration = 0.7,
  delay = 0,
  stagger = 0.04,
  once = true,
  onReveal,
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const reduce = useReducedMotion();

  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll<HTMLElement>("[data-index]");
      const fromVars = getFromVars(revealFrom);
      const toVars: Record<string, unknown> = {
        y: 0,
        x: 0,
        opacity: 1,
        ease: "power3.out",
        duration,
        stagger,
        delay,
      };

      gsap.set(targets, fromVars);

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once,
        onEnter: () => {
          const tl = gsap.timeline();
          tl.to(targets, toVars);
          if (onReveal) tl.eventCallback("onComplete", onReveal);
        },
      });

      return () => st.kill();
    }, ref);

    return () => ctx.revert();
  }, [reduce, revealFrom, duration, delay, stagger, once, onReveal]);

  return (
    <div
      ref={ref}
      className={cn("inline", className)}
      style={{ whiteSpace: "normal" }}
    >
      {words.map((word, wIndex) => {
        const chars = split === "words" ? word.split("") : [word];
        const isSpace = word === "";
        return (
          <span
            key={`${id}-word-${wIndex}`}
            className="inline-block mr-1 last:mr-0 overflow-hidden leading-none"
          >
            {isSpace ? "\u00A0" : null}
            {chars.map((char, cIndex) => (
              <span
                key={`${id}-char-${wIndex}-${cIndex}`}
                data-index={wIndex * 1000 + cIndex}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        );
      })}
    </div>
  );
}

