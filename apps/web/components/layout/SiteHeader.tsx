"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  NotchNav,
  type NotchItemData,
} from "@/components/ui/adaptive-notch-navigation-bar";
import { Wordmark } from "@/components/layout/Wordmark";
import { ScrollContainerContext } from "@/lib/scroll-container";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * The nav bar is `adaptive-notch-navigation-bar` (21st.dev), vendored into
 * `components/ui/` with the additions documented at that file's own top -
 * one type-only fix and two additive props needed to use it as the real page
 * shell rather than the floating-chrome mode this previously ran in (see git
 * history for that version and why it existed: gaps between the three pills
 * showed the real page through them, because chrome mode has no shared
 * backdrop for the vendored wing SVGs to visually connect against - the
 * demo's own seamless look only ever came from the shell owning the whole
 * page, one fill, top to bottom).
 *
 * `SiteHeader` now wraps every route's content as `NotchNav`'s `children`,
 * which makes `NotchNav`'s own internal viewport - not the browser window -
 * the thing that scrolls. `ScrollContainerContext` hands that viewport's ref
 * down to anything that needs real scroll position (the homepage's
 * `ProofStackSpread` scroll-scatter animation, in particular - see its own
 * comment for the `useScroll({ container })` wiring on the other end).
 *
 * White, deliberately: rendering inside `.dark` engages the component's own
 * `dark:bg-zinc-200` branch (see globals.css's `@custom-variant dark`), so the
 * bar is white on every machine rather than depending on the visitor's OS
 * colour-scheme preference. Left as upstream ships it - all three pieces
 * (logo / center menu / right action) are filled `bg-zinc-950 dark:bg-zinc-200`
 * pills with their wing SVGs intact, and the outer `fixed inset-0` canvas is
 * left unrecoloured too, so the same fill shows through the gaps between
 * pills and the whole bar reads as one connected shape - exactly upstream's
 * own demo, not a recoloured variant of it.
 *
 * `activeId` is derived from the current route (longest-prefix match, so
 * `/our-products#kamikaze-racer` still marks Products); `onActiveChange`
 * pushes the route. Nav is deliberately just Home/Products/Technology/Company
 * - `/systems/[id]` dossiers are still real routes, reached via Products, but
 * are not a top-level nav item.
 */

const NAV_ITEMS: NotchItemData[] = [
  { id: "/", label: "Home" },
  { id: "/our-products", label: "Products" },
  { id: "/technology", label: "Technology" },
  { id: "/company", label: "Company" },
];

export function SiteHeader({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // `/` is a literal prefix of every route, so it needs an exact match
  // (otherwise Home would light up on every page, including `/faqs`, which
  // isn't nested under any of the other three items either).
  const activeId =
    NAV_ITEMS.filter((item) =>
      item.id === "/" ? pathname === "/" : pathname.startsWith(item.id),
    ).sort((a, b) => b.id.length - a.id.length)[0]?.id ?? "";

  // LENIS (2026-09-20, root-caused via A/B/C/D isolation test on the Hero's
  // scroll-scrubbed drone sequence - all four combinations of
  // iframe-on/off x mix-blend-mode-on/off flickered identically under real
  // trackpad scrolling, which ruled both out and pointed at the pin/scroll
  // path itself). Compared directly against a reference build that DOES
  // scroll-scrub a GSAP-pinned canvas cleanly: the difference wasn't the
  // canvas, the iframe, or the blend mode - it's that the reference build
  // wraps its scroll root in Lenis and feeds Lenis's eased output to
  // `ScrollTrigger.update`, instead of letting ScrollTrigger listen to raw
  // native `scroll` events directly.
  //
  // That distinction matters specifically for a GSAP `pin`: `scrub` (a
  // number, already set on `FrameSequence`'s tween) only smooths the
  // ANIMATED VALUE driven by scroll progress. It does nothing for the pin's
  // own positional correction - ScrollTrigger repositions a pinned element
  // synchronously, on every raw scroll event, to keep it glued to the
  // scrollbar without perceptible lag. A trackpad's native momentum
  // scrolling delivers that raw input in uneven bursts, and this project's
  // real scroller (`scrollContainerRef`, `NotchNav`'s internal
  // `overflow-y-auto` div) had nothing smoothing it before this - unlike a
  // plain `window` scroll, which browsers already apply some native
  // momentum easing to. Every burst was driving an immediate pin-transform
  // correction, which is what was actually flickering - not the iframe, not
  // the blend mode, both already ruled out by direct A/B/C/D testing.
  //
  // Lenis intercepts wheel/touch input on `wrapper` and drives its scroll
  // position with its own easing, instead of native `overflow-y-auto`
  // handling it directly. `content` is the single child that actually holds
  // the page's scrollable height; Lenis needs a distinct wrapper/content
  // pair when the scroller isn't `window`. `lenis.on("scroll",
  // ScrollTrigger.update)` and driving `lenis.raf` off `gsap.ticker` is
  // upstream's own integration pattern (`SmoothScroll.tsx` there), not
  // invented here - same two lines, same reasoning: one clock (GSAP's
  // ticker) drives both the smoothing and the scroll-linked animations, so
  // they can never fall out of sync with each other.
  useEffect(() => {
    const wrapper = scrollContainerRef.current;
    const content = wrapper?.firstElementChild;
    if (!wrapper || !(content instanceof HTMLElement)) return;

    const lenis = new Lenis({
      wrapper,
      content,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="dark relative">
      <NotchNav
        items={NAV_ITEMS}
        activeId={activeId}
        position="top"
        onActiveChange={(id) => router.push(id)}
        logo={<Wordmark />}
        rightContent={
          // `flex h-9 items-center` matches `NotchItem`'s own box (`h-9
          // ... items-center`, adaptive-notch-navigation-bar.tsx) exactly.
          // Both this aside and the center header are top-anchored and
          // `items-start`, so without a matching height here the plain
          // link's shorter auto-height box centers its text well above the
          // nav buttons' centre instead of level with them.
          <Link
            href="/contact"
            className="flex h-9 items-center text-sm font-medium whitespace-nowrap"
          >
            Request a briefing
          </Link>
        }
        contentViewportRef={scrollContainerRef}
        // `pb-0` cancels upstream's own `pb-3`: that padding renders in
        // `bg-background` (this site's near-black ink), invisible in
        // upstream's own dark-on-dark demo but a stray black bar under this
        // site's light `SiteFooter`. `pt-17.5` (the nav's own top clearance)
        // is left untouched.
        contentClassName="flex-col items-stretch justify-start px-0 sm:px-0 md:px-0 pb-0"
      >
        <ScrollContainerContext.Provider value={scrollContainerRef}>
          <div className="w-full">{children}</div>
        </ScrollContainerContext.Provider>
      </NotchNav>
    </div>
  );
}
