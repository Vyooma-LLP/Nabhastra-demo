"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * The header's two surfaces, measured 2026-09-18.
 *
 * `shield.ai components/nav bar as a floating transparent section.png` shows
 * the bar over the hero with NO background and NO bottom rule - the wordmark,
 * the nav and the CTA float directly on the video, and the only thing holding
 * them legible is the hero's own top scrim. `footer section.png`, captured
 * further down the same page, shows the identical bar sitting on solid black
 * with its rule restored.
 *
 * So the bar is not translucent and it is not opaque: it is transparent AT REST
 * and commits to a surface ONCE THE PAGE HAS MOVED. That distinction matters
 * more than it looks - a permanently opaque bar (what this shipped with) puts a
 * black band across the top of every hero and throws away the full-bleed
 * opening the hero exists to give.
 *
 * This is the only reason the header needs a client boundary. It is kept to
 * this wrapper so the navigation itself - and the content arrays it maps over -
 * stay server-rendered and out of the bundle.
 *
 * The listener is passive and rAF-coalesced, and it only ever flips a boolean,
 * so a fast scroll costs one class change rather than a render per frame.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      // 8px, not 0: sub-pixel scroll restoration and elastic overscroll both
      // land a hair off zero, and a bar that flickers its background on a
      // rubber-band bounce is worse than one that commits slightly late.
      setSettled(window.scrollY > 8);
    };

    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== 0) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      data-settled={settled ? "" : undefined}
      className={`fixed inset-x-0 top-0 z-(--z-nav) isolate transition-[background-color,border-color] duration-(--duration-fast) ease-(--ease-signal) ${
        settled
          ? "border-b border-line bg-ink"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      {children}
    </header>
  );
}
