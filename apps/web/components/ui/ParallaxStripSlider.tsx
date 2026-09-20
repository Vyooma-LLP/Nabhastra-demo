"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

/**
 * A vertical-strip wipe + Ken-Burns zoom slider, adapted from a supplied
 * reference component (mechanics only, not a copy - same principle as
 * `ProofWall`). Two adaptations to fit this project rather than the demo:
 *
 * 1. No third typeface. The reference loads Google's "Instrument Serif" for
 *    the slide title via a runtime <link> injection. DESIGN.md §4 is a
 *    two-typeface system (Hanken Grotesk display, IBM Plex Mono technical) -
 *    a slide-in serif would be a third. The title now uses the project's own
 *    `--font-display`, and the font-loading effect is gone entirely.
 * 2. Two accent colours, not one. The reference points a single `accentColor`
 *    at every foreground element - caption, title, counter, progress bar,
 *    nav cursor - alike. DESIGN.md §3.1a splits that: coral marks interaction
 *    /active state, not body text. `textColor` (default `--color-paper`)
 *    covers the caption/title/counter; `interactionColor` (default
 *    `--color-signal`, coral) covers only the progress bar fill and the
 *    click-to-navigate cursor - the two elements that are actually state/
 *    interaction, not content.
 *
 * `showCaption` is new: the reference always renders its own chapter/title
 * block. A caller that already has its own verified headline (as this
 * project's `Hero` does) sets `showCaption={false}` to get the wipe/zoom
 * image treatment without a second, competing title system - `title` on each
 * slide still exists as a type field (for when a caller does want captions)
 * but is never fabricated by this component.
 *
 * `useGSAP` is an inline stand-in for `@gsap/react`'s hook (not installed):
 * one `gsap.context` for the component's lifetime, reverted only on unmount,
 * so a finished tween isn't rolled back to its start state on every
 * dependency change the way a naive "revert every re-render" version would.
 */

function useGSAP(
  callback: () => void | (() => void),
  options?: {
    dependencies?: unknown[];
    scope?: { current: Element | null } | Element | null;
  },
) {
  const deps = options?.dependencies ?? [];
  const scope = options?.scope;
  const ctxRef = useRef<gsap.Context | null>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useLayoutEffect(() => {
    const el =
      scope && typeof scope === "object" && "current" in scope
        ? scope.current
        : (scope as Element | null);
    ctxRef.current = gsap.context(() => {}, el ?? undefined);
    return () => {
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (!ctxRef.current) return;
    cleanupRef.current?.();
    const ret = ctxRef.current.add(callback);
    cleanupRef.current = typeof ret === "function" ? ret : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

// Strip-wipe/zoom transition timing, slowed 25% (2026-09-12, explicit
// direction) from the original 0.5/0.04/0.9/0.9 values.
const REVEAL_DURATION = 0.625;
const STRIP_STAGGER = 0.05;
const ZOOM_DURATION = 1.125;
const AUTOPLAY_INTERVAL = 5000;
const TITLE_CHAR_DURATION = 0.6;
const TITLE_CHAR_STAGGER = 0.04;
const TITLE_CHAR_Y_PERCENT = 100;
const PROGRESS_DURATION = 1.125;

/**
 * Adaptive quality tiers (2026-09-12, flicker handoff §7-9). The wipe/zoom
 * transition's cost scales with strip count - ten concurrently clip-path +
 * scale animated elements is fine on a modern desktop GPU but not a
 * reasonable assumption for a low-end phone. These tiers preserve the same
 * visual idea (strips wipe, image zooms in) at a cheaper cost rather than
 * disabling the effect outright. `hardwareConcurrency`/`deviceMemory` are
 * imperfect signals (a coarsened/approximate value, not universally
 * supported) so they're only used to pick a tier, never as a hard gate.
 */
type QualityTier = "full" | "reduced" | "lite";

const TIER_CONFIG: Record<
  QualityTier,
  { stripCount: number; zoomFrom: number; stripStagger: number; zoomDuration: number }
> = {
  full: { stripCount: 10, zoomFrom: 1.2, stripStagger: STRIP_STAGGER, zoomDuration: ZOOM_DURATION },
  reduced: { stripCount: 6, zoomFrom: 1.08, stripStagger: STRIP_STAGGER * 0.8, zoomDuration: ZOOM_DURATION * 0.85 },
  lite: { stripCount: 4, zoomFrom: 1.0, stripStagger: STRIP_STAGGER * 0.6, zoomDuration: ZOOM_DURATION * 0.7 },
};

function getPerformanceTier(): QualityTier {
  if (typeof navigator === "undefined") return "full";
  const cores = navigator.hardwareConcurrency ?? 8;
  const memory =
    "deviceMemory" in navigator
      ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory
      : undefined;

  if ((memory !== undefined && memory <= 2) || cores <= 2) return "lite";
  if ((memory !== undefined && memory <= 4) || cores <= 4) return "reduced";
  return "full";
}

function isPointInsideRect(x: number, y: number, rect: DOMRect) {
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

export type ParallaxSlide = {
  src: string;
  title: string;
  chapter?: string;
};

export interface ParallaxStripSliderProps {
  slides: ParallaxSlide[];
  className?: string;
  stripCount?: number;
  revealDuration?: number;
  stripStagger?: number;
  zoomFrom?: number;
  zoomDuration?: number;
  autoplay?: boolean;
  showProgressBar?: boolean;
  showCounter?: boolean;
  showControls?: boolean;
  /** Render the chapter/title caption block. Off by default for callers with
   *  their own headline - see the component doc comment. */
  showCaption?: boolean;
  /** Caption/title/counter text colour. Defaults to `--color-paper`. */
  textColor?: string;
  /** Progress bar fill and nav-cursor colour - interaction/active state, not
   *  content. Defaults to `--color-signal` (coral). */
  interactionColor?: string;
  backgroundColor?: string;
  /** Elements the custom cursor must visually avoid even though they don't
   *  participate in pointer hit-testing (e.g. `pointer-events-none` floating
   *  text over the slider). Tested by cached bounding-rect geometry, not
   *  `elementFromPoint`/`e.target`, precisely because these elements are
   *  deliberately invisible to the DOM event's own hit-testing. */
  cursorAvoidRefs?: React.RefObject<HTMLElement | null>[];
}

type TransitionDirection = "next" | "prev";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false)
  );
}

export function ParallaxStripSlider({
  slides,
  className = "",
  stripCount: stripCountProp,
  revealDuration = REVEAL_DURATION,
  stripStagger: stripStaggerProp,
  zoomFrom: zoomFromProp,
  zoomDuration: zoomDurationProp,
  autoplay = false,
  showProgressBar = true,
  showCounter = true,
  showControls = true,
  showCaption = true,
  textColor = "var(--color-paper)",
  interactionColor = "var(--color-signal)",
  backgroundColor = "var(--color-ink)",
  cursorAvoidRefs,
}: ParallaxStripSliderProps) {
  const [current, setCurrent] = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);
  const [caption, setCaption] = useState(0);
  const [direction, setDirection] = useState<TransitionDirection>("next");
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [tier] = useState<QualityTier>(() => getPerformanceTier());

  const stripCount = stripCountProp ?? TIER_CONFIG[tier].stripCount;
  const stripStagger = stripStaggerProp ?? TIER_CONFIG[tier].stripStagger;
  const zoomFrom = zoomFromProp ?? TIER_CONFIG[tier].zoomFrom;
  const zoomDuration = zoomDurationProp ?? TIER_CONFIG[tier].zoomDuration;

  const rootRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const counterNumRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const stripsRef = useRef<HTMLDivElement[]>([]);
  const zoomRef = useRef<HTMLDivElement[]>([]);
  const isAnimating = useRef(false);
  const isFirstCaption = useRef(true);
  const splitRef = useRef<SplitText | null>(null);

  const cursorRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const isInside = useRef(false);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const avoidRectsRef = useRef<DOMRect[]>([]);

  const total = slides.length;

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setIsCoarsePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Cached avoid-region rects (flicker handoff §2-3): the cursor asks "is the
  // pointer inside this region's bounding rect", not "did the DOM event's own
  // hit-testing land on this element" - the latter is exactly what breaks for
  // a `pointer-events-none` region, since it never appears as `e.target` in
  // the first place. Recomputed only on resize/scroll/layout change, not on
  // every mousemove, so this adds no per-frame layout cost.
  useEffect(() => {
    if (!cursorAvoidRefs?.length) {
      avoidRectsRef.current = [];
      return;
    }

    const updateRects = () => {
      avoidRectsRef.current = cursorAvoidRefs
        .map((ref) => ref.current?.getBoundingClientRect())
        .filter((rect): rect is DOMRect => Boolean(rect));
    };

    updateRects();

    const observer = new ResizeObserver(updateRects);
    for (const ref of cursorAvoidRefs) {
      if (ref.current) observer.observe(ref.current);
    }

    window.addEventListener("resize", updateRects);
    window.addEventListener("scroll", updateRects, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateRects);
      window.removeEventListener("scroll", updateRects);
    };
  }, [cursorAvoidRefs]);

  const goTo = useCallback(
    (next: number, transitionDirection: TransitionDirection) => {
      if (isAnimating.current || next === current || total < 2) return;
      isAnimating.current = true;
      setDirection(transitionDirection);
      setIncoming(next);
    },
    [current, total],
  );

  const onNext = useCallback(
    () => goTo((current + 1) % total, "next"),
    [current, total, goTo],
  );
  const onPrev = useCallback(
    () => goTo((current - 1 + total) % total, "prev"),
    [current, total, goTo],
  );

  useEffect(() => {
    if (!autoplay || total < 2) return;
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      if (!isAnimating.current) onNext();
    }, AUTOPLAY_INTERVAL);
    return () => window.clearInterval(id);
  }, [autoplay, total, onNext]);

  useGSAP(
    () => {
      if (incoming === null) return;

      const strips = stripsRef.current.slice(0, stripCount).filter(Boolean);
      const zooms = zoomRef.current.slice(0, stripCount).filter(Boolean);
      if (!strips.length) return;
      const isPrevious = direction === "prev";
      const orderedStrips = isPrevious ? [...strips].reverse() : strips;

      if (prefersReducedMotion()) {
        setCaption(incoming);
        setCurrent(incoming);
        setIncoming(null);
        isAnimating.current = false;
        return;
      }

      // `will-change` is a hint, not a free GPU layer - MDN warns permanent
      // use on many elements can raise memory pressure and hurt performance
      // more than it helps. Set it only for the duration of this transition
      // and clear it once the timeline settles.
      gsap.set(strips, { willChange: "clip-path" });
      gsap.set(zooms, { willChange: "transform" });

      const settle = () => {
        gsap.set(strips, { willChange: "auto" });
        gsap.set(zooms, { willChange: "auto" });
        setCaption(incoming);
        setCurrent(incoming);
        setIncoming(null);
        isAnimating.current = false;
      };

      const tl = gsap.timeline({ onComplete: settle });

      tl.fromTo(
        orderedStrips,
        { clipPath: isPrevious ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" },
        {
          clipPath: isPrevious ? "inset(0 0 0 0%)" : "inset(0 0% 0 0)",
          duration: revealDuration,
          ease: "power3.out",
          stagger: stripStagger,
        },
        0,
      );

      tl.fromTo(zooms, { scale: zoomFrom }, { scale: 1, duration: zoomDuration, ease: "power3.out" }, 0);

      if (progressRef.current) {
        tl.to(
          progressRef.current,
          { scaleX: (incoming + 1) / total, duration: PROGRESS_DURATION, ease: "power3.inOut" },
          0,
        );
      }

      const outgoing = [captionRef.current, titleRef.current, counterRef.current].filter(Boolean);
      if (outgoing.length) {
        tl.to(outgoing, { autoAlpha: 0, y: -2, duration: 0.35, ease: "power2.in" }, 0.15);
        tl.add(() => setCaption(incoming), 0.5);
      }
    },
    {
      dependencies: [incoming, direction, stripCount, revealDuration, stripStagger, zoomFrom, zoomDuration],
      scope: rootRef,
    },
  );

  useLayoutEffect(() => {
    splitRef.current?.revert();
    splitRef.current = null;
  }, [caption]);

  useGSAP(
    () => {
      if (isFirstCaption.current) {
        isFirstCaption.current = false;
        return;
      }
      if (!captionRef.current || !titleRef.current) return;

      gsap.set([captionRef.current, titleRef.current], { autoAlpha: 1, y: 0 });

      if (prefersReducedMotion()) {
        gsap.set([chapterRef.current, titleRef.current, counterRef.current, counterNumRef.current], {
          autoAlpha: 1,
          y: 0,
          yPercent: 0,
        });
        return;
      }

      const split = new SplitText(titleRef.current, { type: "chars" });
      splitRef.current = split;

      const tl = gsap.timeline({
        onComplete: () => {
          split.revert();
          if (splitRef.current === split) splitRef.current = null;
        },
      });

      tl.from(
        split.chars,
        { yPercent: TITLE_CHAR_Y_PERCENT, duration: TITLE_CHAR_DURATION, ease: "power2.out", stagger: TITLE_CHAR_STAGGER },
        0,
      );

      if (chapterRef.current) {
        tl.fromTo(chapterRef.current, { autoAlpha: 0, y: 0 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0);
      }
      if (counterRef.current) {
        tl.fromTo(counterRef.current, { autoAlpha: 0, y: 0 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0);
      }
      if (counterNumRef.current) {
        tl.from(counterNumRef.current, { yPercent: 110, duration: 0.55, ease: "power3.out" }, 0);
      }
    },
    { dependencies: [caption], scope: rootRef },
  );

  useGSAP(
    () => () => {
      splitRef.current?.revert();
      splitRef.current = null;
    },
    { scope: rootRef },
  );

  useEffect(() => {
    if (!showControls || isCoarsePointer || reducedMotion || tier === "lite") return;
    const cursor = cursorRef.current;
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    if (!cursor || !l1 || !l2) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.6 });
    gsap.set(l1, { transformOrigin: "100% 50%", xPercent: -50, yPercent: -50, y: -1.5, rotation: 45, x: 0 });
    gsap.set(l2, { transformOrigin: "100% 50%", xPercent: -50, yPercent: -50, y: 1.5, rotation: -45, x: 0 });

    // Per-frame position writes go through `quickSetter`, not `gsap.set`: a
    // 60px circle following the pointer at 60fps doesn't need the full
    // tween-property resolution `gsap.set` does on every call, only a direct
    // style write. The enter/exit opacity+scale transitions below stay on
    // `gsap.to` - they fire on state changes, not every frame.
    const setX = gsap.quickSetter(cursor, "x", "px");
    const setY = gsap.quickSetter(cursor, "y", "px");

    let currentSide: "left" | "right" = "right";

    const handleMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const target = e.target instanceof Element ? e.target : null;
      const isOverControls = Boolean(
        target?.closest('button, input, textarea, select, a, label, [role="button"], [contenteditable="true"]'),
      );
      const isOverAvoidRegion = avoidRectsRef.current.some((r) => isPointInsideRect(x, y, r));

      mouse.current.x = x;
      mouse.current.y = y;

      const rect = rootRef.current?.getBoundingClientRect();
      const isOut = !rect || x <= rect.left || y <= rect.top || x >= rect.right || y >= rect.bottom;

      if (isOut || isOverControls || isOverAvoidRegion) {
        if (isInside.current) {
          isInside.current = false;
          gsap.to(cursor, { opacity: 0, scale: 0.6, duration: 0.25, ease: "power3.inOut" });
        }
        return;
      }

      if (!isInside.current) {
        pos.current.x = x;
        pos.current.y = y;
        gsap.set(cursor, { x, y });
        gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.25, ease: "power3.out" });
        isInside.current = true;
      }

      const isLeft = rect ? x < rect.left + rect.width / 2 : false;
      const nextSide = isLeft ? "left" : "right";

      if (nextSide !== currentSide) {
        currentSide = nextSide;
        if (nextSide === "left") {
          gsap.to(l1, { rotation: 135, x: "-1vw", duration: 0.35, ease: "power3.inOut" });
          gsap.to(l2, { rotation: -135, x: "-1vw", duration: 0.35, ease: "power3.inOut" });
        } else {
          gsap.to(l1, { rotation: 45, x: 4, duration: 0.35, ease: "power3.inOut" });
          gsap.to(l2, { rotation: -45, x: 4, duration: 0.35, ease: "power3.inOut" });
        }
      }
    };

    // GSAP's own ticker, not a second, independent requestAnimationFrame
    // loop: this ran forever (from mount to unmount) on a raw rAF callback,
    // fighting the wipe/zoom timeline's own GSAP-driven updates for main-
    // thread time on every single frame - two separate animation schedulers
    // both touching style every tick is exactly the kind of contention that
    // shows up as jank/flicker precisely when something heavier (ten
    // clip-path + scale tweens at once) is also running. `gsap.ticker` batches
    // this into the same frame GSAP already schedules everything else on.
    const render = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.12;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.12;
      setX(pos.current.x);
      setY(pos.current.y);
    };

    window.addEventListener("mousemove", handleMove);
    gsap.ticker.add(render);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      gsap.ticker.remove(render);
    };
  }, [showControls, isCoarsePointer, reducedMotion, tier]);

  const renderStrips = (slide: ParallaxSlide) => {
    const width = 100 / stripCount;

    return Array.from({ length: stripCount }, (_, i) => (
      <div
        key={i}
        ref={(el) => {
          if (el) stripsRef.current[i] = el;
        }}
        className="absolute inset-y-0 overflow-hidden"
        style={{
          left: `${i * width}%`,
          width: `${width}%`,
          marginLeft: i === 0 ? 0 : "-0.5px",
          paddingLeft: i === 0 ? 0 : "0.5px",
        }}
      >
        <div className="absolute inset-y-0" style={{ left: `-${i * 100}%`, width: `${stripCount * 100}%` }}>
          <div
            ref={(el) => {
              if (el) zoomRef.current[i] = el;
            }}
            className="relative h-full w-full"
          >
            <img
              src={slide.src}
              alt=""
              draggable={false}
              className="absolute inset-0 h-full w-full select-none object-cover"
            />
          </div>
        </div>
      </div>
    ));
  };

  const activeSlide = slides[caption];
  const stacked = isCoarsePointer;
  const customCursorActive = showControls && !isCoarsePointer && !reducedMotion && tier !== "lite";
  if (!activeSlide) return null;

  return (
    <div
      ref={rootRef}
      style={{ backgroundColor }}
      className={`parallax-strip-slider relative h-full w-full overflow-hidden ${className}`}
    >
      <div className="absolute inset-0">
        <img
          src={slides[current]?.src}
          alt={slides[current]?.title ?? ""}
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-cover"
        />
      </div>

      {incoming !== null && (
        <div className="absolute inset-0">{renderStrips(slides[incoming]!)}</div>
      )}

      {showControls && total > 1 && (
        <div
          className="absolute inset-0 z-20"
          style={{ cursor: stacked || !customCursorActive ? "pointer" : "none" }}
          onClick={(e) => {
            if (isAnimating.current) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const isLeft = e.clientX < rect.left + rect.width / 2;
            if (isLeft) onPrev();
            else onNext();
          }}
        />
      )}

      {showProgressBar && (
        <div
          className="pointer-events-none absolute inset-x-6 top-6 z-10 h-px sm:inset-x-10 sm:top-8"
          style={{ backgroundColor: `color-mix(in oklab, ${interactionColor} 20%, transparent)` }}
        >
          <div
            ref={progressRef}
            className="h-full w-full origin-left"
            style={{ transform: `scaleX(${(caption + 1) / total})`, backgroundColor: interactionColor }}
          />
        </div>
      )}

      {showCaption ? (
        <>
          <div ref={captionRef} className="pointer-events-none absolute inset-x-0 top-0 px-6 pt-12 sm:px-10 sm:pt-16">
            <span ref={chapterRef} className="block text-xs font-medium tracking-wide" style={{ color: textColor }}>
              {activeSlide.chapter ?? `Collection ${String(caption + 1).padStart(2, "0")}`}
            </span>
          </div>

          <div
            className={`absolute inset-x-0 bottom-0 flex px-6 pb-10 sm:px-10 ${
              stacked ? "flex-col items-stretch gap-5 pb-24" : "items-end"
            }`}
          >
            <h2
              ref={titleRef}
              className={`pointer-events-none flex items-end overflow-hidden font-(family-name:--font-display) text-6xl leading-none sm:text-7xl lg:text-8xl ${
                stacked ? "order-2 w-full" : "w-1/3 shrink-0"
              }`}
              style={{ color: textColor }}
            >
              {activeSlide.title}
            </h2>

            {!stacked && <div aria-hidden className="w-1/3 shrink-0" />}

            {showCounter && (
              <span
                ref={counterRef}
                className={`pointer-events-none flex shrink-0 items-center font-mono text-xs ${
                  stacked ? "order-1 w-full justify-end" : "h-full w-1/3 justify-end py-5"
                }`}
                style={{ color: textColor, opacity: 0.7 }}
              >
                <span className="inline-block w-[2ch] overflow-hidden text-right">
                  <span ref={counterNumRef} className="inline-block">
                    {String(caption + 1).padStart(2, "0")}
                  </span>
                </span>
                <span> / {String(total).padStart(2, "0")}</span>
              </span>
            )}
          </div>
        </>
      ) : null}

      {customCursorActive && total > 1 && (
        <div ref={cursorRef} className="pointer-events-none fixed left-0 top-0 z-[100]">
          <div className="flex size-15 items-center justify-center rounded-full" style={{ backgroundColor: interactionColor }}>
            <div className="relative size-7.5">
              <span ref={line1Ref} className="absolute left-1/2 top-1/2 h-0.5 w-4" style={{ backgroundColor: "var(--color-ink)" }} />
              <span ref={line2Ref} className="absolute left-1/2 top-1/2 h-0.5 w-4" style={{ backgroundColor: "var(--color-ink)" }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
