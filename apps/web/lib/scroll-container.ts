"use client";

import { createContext, useContext, type RefObject } from "react";

/**
 * `SiteHeader` renders `NotchNav` as the real page shell (see its own doc
 * comment), which makes `NotchNav`'s own internal viewport - not `window` -
 * the thing that actually scrolls. Anything downstream that tracks scroll
 * position (framer's `useScroll` defaults to `window`) needs a ref to that
 * viewport instead. `SiteHeader` provides it; `useScrollContainer` reads it.
 *
 * `null` (the default, outside `SiteHeader`) means "track `window`" to every
 * consumer - that's what `framer-motion`'s `useScroll` does when its
 * `container` option is left unset.
 */
export const ScrollContainerContext =
  createContext<RefObject<HTMLDivElement | null> | null>(null);

export function useScrollContainer() {
  return useContext(ScrollContainerContext);
}
