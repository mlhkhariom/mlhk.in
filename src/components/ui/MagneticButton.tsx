"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Button as ButtonPrimitive } from "@base-ui/react/button";

type ButtonProps = Omit<React.ComponentProps<typeof ButtonPrimitive>, "ref">;
import { useReducedMotion } from "@/components/home/utils";

interface MagneticButtonProps extends Omit<ButtonProps, "className" | "variant" | "size"> {
  label: string;
  icon?: React.ReactNode;
  arrowSide?: "start" | "end";
  href?: string;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link";
  size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";
}

/**
 * Magnetic call-to-action button with a glowing underline reveal and a
 * magnetized icon that tilts toward the pointer. Uses motion values outside
 * the React render cycle so it stays 60fps on hover.
 */
export function MagneticButton({
  label,
  icon,
  arrowSide = "end",
  href,
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: MagneticButtonProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const max = 6;
      const dx = ((x - cx) / cx) * max;
      const dy = ((y - cy) / cy) * max;
      el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
    };

    const onLeave = () => {
      el.style.transform = "translate3d(0, 0, 0)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  const content = (
    <>
      {children ?? (
        <>
          <span
            className={cn(
              "relative inline-flex items-center justify-center overflow-hidden",
              size === "lg" ? "text-base" : "text-sm",
            )}
          >
            {label}
          </span>
          {icon && (
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span className="magnetic-arrow transition-transform duration-200">
                {icon}
              </span>
            </span>
          )}
        </>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(
          "group/button relative inline-flex items-center gap-2 outline-none",
          className,
        )}
        style={{ willChange: "transform" }}
      >
        <div
          aria-hidden
          className="absolute inset-0 translate-y-[110%] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 opacity-0 blur-sm transition-all duration-300 group-hover/button:translate-y-[60%] group-hover/button:opacity-60"
        />
        {content}
        <span
          className={cn(
            "absolute bottom-0 left-1/2 h-[1.5px] w-0 -translate-x-1/2 bg-gradient-to-r from-blue-400 to-cyan-300 transition-all duration-500 ease-out group-hover/button:w-full",
            size === "lg" && "h-0.5",
          )}
          aria-hidden
        />
      </a>
    );
  }

  return (
    <div ref={ref} className="inline-flex">
    <Button
      variant={variant}
      size={size}
      {...props}
      className={cn(
        "group/button relative overflow-visible outline-none",
        // keep the base button's own transition; this is just the magnetic transform
        "!transition-none",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 translate-y-[110%] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 opacity-0 blur-sm transition-all duration-300 group-hover/button:translate-y-[60%] group-hover/button:opacity-60"
      />
      {content}
      <span
        className={cn(
          "absolute bottom-0 left-1/2 h-[1.5px] w-0 -translate-x-1/2 bg-gradient-to-r from-blue-400 to-cyan-300 transition-all duration-500 ease-out group-hover/button:w-full",
          size === "lg" && "h-0.5",
        )}
        aria-hidden
      />
    </Button>
    </div>
  );
}
