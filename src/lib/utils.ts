import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Normalize a checkbox/select value to a real boolean for D1 integer columns.
 * Accepts true/false, "true"/"false", 1/0, "1"/"0", "on" (HTML checkbox).
 */
export function toBool(value: unknown, fallback = false): boolean {
  if (value === undefined || value === null || value === "") return fallback
  if (typeof value === "boolean") return value
  if (typeof value === "number") return value !== 0
  const s = String(value).toLowerCase()
  if (s === "true" || s === "1" || s === "on" || s === "yes") return true
  if (s === "false" || s === "0" || s === "off" || s === "no") return false
  return fallback
}
