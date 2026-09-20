import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Added 2026-09-19 to satisfy `adaptive-notch-navigation-bar` (21st.dev),
 * which imports `cn` from `@/lib/utils` - the standard shadcn convention this
 * project hadn't needed until now, since every hand-authored component here
 * builds its className with a plain template literal instead.
 *
 * Kept to exactly the shadcn-standard implementation (clsx + tailwind-merge)
 * rather than reinventing it, since any future component copy-pasted from a
 * shadcn-style registry will expect precisely this signature at precisely
 * this path.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
