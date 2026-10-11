"use client";

/**
 * Guard: skip heavy motion when the user has requested reduced motion.
 * Returns true if the user prefers reduced motion (i.e. we should skip animations).
 */
export function useReducedMotion() {
  return typeof window === "undefined"
    ? false
    : window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Debounce a handler so repeated rapid calls (wheel/touch) don't burn frames.
 */
export function debounce<F extends (...args: unknown[]) => void>(
  fn: F,
  delay: number,
): (...args: Parameters<F>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<F>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}
