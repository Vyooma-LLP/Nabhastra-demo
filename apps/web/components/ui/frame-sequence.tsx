"use client";

/**
 * Scroll-scrubbed image-sequence canvas.
 *
 * MECHANICS PORTED FROM the proven production implementation
 * (`CombinedDroneSequence`, VyoomaHeroPage, 2026-09-20 - explicit direction:
 * "checkout how the drone scroll sequence was built, apply that directly
 * here"):
 *
 *   - GSAP + ScrollTrigger drives a plain proxy object's `frame` value from
 *     0 to `frameCount - 1` (`ease: "none"`), NOT framer-motion/`useScroll` -
 *     reuses the GSAP dependency this project already has (same reasoning as
 *     `ProofWall`: no second animation library for one component).
 *   - Canvas is DPR-scaled and draws each frame CONTAIN-fit (letterboxed),
 *     matching upstream - not cover-fit. Upstream's apparent "fill" look
 *     comes from a CSS `scale-[1.85]` on the `<canvas>` element itself, left
 *     to the caller via `className` rather than baked in here, since it
 *     depends on the frame's own padding/subject size.
 *   - Preload is hybrid: first 5 frames eager, the rest in batches of 10 via
 *     `requestIdleCallback` (falls back to `setTimeout`) - proven not to
 *     block the main thread or flood the network with the full frame count
 *     at once.
 *
 * ONE DELIBERATE FIX over upstream: `resizeCanvas` there calls
 * `context.scale(dpr, dpr)` on every resize without resetting the existing
 * transform first, so the DPR scale compounds across repeated resizes. This
 * uses `context.setTransform(dpr, 0, 0, dpr, 0, 0)` instead, which replaces
 * rather than compounds.
 *
 * ONE REQUIRED ADAPTATION: this project's real scroll viewport is
 * `NotchNav`'s internal div (`overflow-y-auto`), not `window` - see
 * `lib/scroll-container.ts`. GSAP `ScrollTrigger` defaults to `window`
 * exactly like `framer-motion`'s `useScroll` does, so the caller's
 * `useScrollContainer()` ref is forwarded here as `scrollTrigger.scroller`.
 * That scroller is Lenis-smoothed (see `SiteHeader.tsx`) rather than raw
 * native scroll events, which upstream doesn't need since it has no custom
 * scroller to begin with.
 *
 * ROOT CAUSE FOUND (2026-09-20), by direct comparison of two configurations
 * of this exact component: pinning `Hero`'s whole section via GSAP `pin`
 * (which also contains `GatewayFlow`, a sandboxed cross-document `<iframe>`
 * running its own independent animation loop) flickered badly. Pinning a
 * dedicated section containing ONLY the canvas did not. Cross-document
 * iframes almost always get their own GPU compositing layer; GSAP's pin
 * writes a new `transform` on the pinned element every scroll tick, forcing
 * the browser to reposition/recomposite every layer inside it - including
 * the iframe's separate surface - even when the iframe was hidden via
 * `visibility: hidden` (which keeps it in the layout tree and its layer
 * allocated; it only stops fully when the iframe isn't in the pinned
 * subtree at all).
 *
 * `pin` PROP (2026-09-20, explicit direction: hold the WHOLE Hero - hourglass
 * included - still until the drone's frames finish, with zero flicker, and
 * the hourglass's click-to-ripple still working). GSAP's transform-writing
 * pin can't hold an iframe-containing composition still without causing
 * exactly the flicker above - it's the wrong tool for that, not a
 * configuration problem. `pin={false}` (the mode `Hero` uses) skips GSAP
 * pinning entirely: `ScrollTrigger` here only reads `triggerRef`'s scroll
 * progress to drive the frame index, and touches no CSS properties on
 * anything. The caller holds its own composition still with plain CSS
 * `position: sticky` instead (see `Hero.tsx`) - handled natively by the
 * browser's layout/compositor, so nothing rewrites `transform` on any tick
 * and the iframe's layer is never forced through that recompositing
 * cascade. Sticky doesn't touch pointer events either, so the iframe's
 * click-to-ripple interaction is completely unaffected.
 *
 * `pin={true}` (default, unchanged) keeps the original GSAP-pin behaviour,
 * for a trigger whose subtree contains nothing but this canvas (no iframe,
 * nothing else animating) - `pinRef`, when given, is the element GSAP
 * actually transforms, if different from `triggerRef`'s element.
 */

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Pixels with all three channels below this are keyed to transparent when `keyOutBlack` is on. */
const BLACK_KEY_THRESHOLD = 24;

interface FrameSequenceProps {
  /** e.g. "/media/drone-sequence/frame_" */
  basePath: string;
  frameCount: number;
  /** Zero-pad width for the frame number in the filename. */
  pad?: number;
  extension?: string;
  className?: string;
  /** Read for scroll-progress timing (start/end). Also the pin target, unless `pinRef` is given. */
  triggerRef: RefObject<HTMLElement | null>;
  /**
   * Whether GSAP should pin anything at all. `true` (default): pins
   * `pinRef ?? triggerRef`'s element via a JS-driven transform - only safe
   * when that element's subtree contains nothing else independently
   * GPU-composited (no iframe). `false`: no pin, no transform writes at
   * all - `ScrollTrigger` only reads scroll progress to drive the frame
   * index; the caller is responsible for visually holding its own
   * composition still (e.g. CSS `position: sticky`).
   */
  pin?: boolean;
  /** The element GSAP actually pins/transforms when `pin` is true. Defaults to `triggerRef`'s element if omitted. Ignored when `pin={false}`. */
  pinRef?: RefObject<HTMLElement | null>;
  scrollContainer?: RefObject<HTMLDivElement | null>;
  /** Extra scroll distance (px) the pin holds for, used when `end` is omitted. Upstream: 3000. */
  scrollDistance?: number;
  /** ScrollTrigger `end` value override, e.g. "bottom bottom" for a tall spacer element. Takes precedence over `scrollDistance`. */
  end?: string;
  /**
   * Keys near-black pixels in each frame to real transparency (alpha 0)
   * after drawing, instead of relying on `mix-blend-screen` against a black
   * backdrop. Needed whenever the caller wants a background behind the
   * canvas OTHER than black (e.g. white) - the frames' background is
   * opaque black image data, not transparency, so no CSS change alone
   * shows through it. Off by default (matches the source frames' own
   * black-on-black look via `mix-blend-screen`, unaffected).
   */
  keyOutBlack?: boolean;
  /**
   * Crops the SOURCE frame before contain-fitting it into the canvas, as
   * fractions (0-1) of the frame's native pixel size: `{ x, y, width,
   * height }`, top-left origin. Use this to make the canvas hug the
   * subject tightly instead of the source frame's own (often much larger)
   * empty margin - e.g. a 3840x2160 render where the subject only ever
   * occupies a fraction of that frame. Omit for the uncropped full frame.
   */
  sourceCrop?: { x: number; y: number; width: number; height: number };
  /**
   * Same shape as `sourceCrop`, but one entry per frame index - each frame
   * gets its OWN crop instead of one fixed window for the whole sequence.
   * Takes precedence over `sourceCrop` when given. A single fixed
   * `sourceCrop` has to be sized to fit every frame's bounding box at once,
   * including whichever single frame happens to be the widest AND whichever
   * happens to be the tallest (usually different frames) - every other
   * frame then shows visibly more margin than its own content needs. A
   * per-frame crop, each independently sized to that one frame's own
   * bounding box (plus margin) and recentred on it, keeps the subject
   * filling the same proportion of the box on every single frame.
   */
  frameCrops?: Array<{ x: number; y: number; width: number; height: number }>;
}

export function FrameSequence({
  basePath,
  frameCount,
  pad = 4,
  extension = "webp",
  className,
  triggerRef,
  pin = true,
  pinRef,
  scrollContainer,
  scrollDistance = 3000,
  end,
  keyOutBlack = false,
  sourceCrop,
  frameCrops,
}: FrameSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const pinTarget = pin ? (pinRef?.current ?? trigger) : null;
    const canvas = canvasRef.current;
    if (!trigger || !canvas) return;
    if (pin && !pinTarget) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const images: HTMLImageElement[] = [];
    const frameUrl = (index: number) =>
      `${basePath}${String(index + 1).padStart(pad, "0")}.${extension}`;

    let cw = 0;
    let ch = 0;
    let resizeTimer: ReturnType<typeof setTimeout>;
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      cw = parent.clientWidth;
      ch = parent.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeCanvas();

    for (let i = 0; i < Math.min(5, frameCount); i += 1) {
      const img = new window.Image();
      img.src = frameUrl(i);
      images[i] = img;
    }

    let currentLoadIndex = 5;
    const loadNextBatch = () => {
      if (currentLoadIndex >= frameCount) return;
      const batchSize = 10;
      for (let i = 0; i < batchSize && currentLoadIndex < frameCount; i += 1) {
        const img = new window.Image();
        img.src = frameUrl(currentLoadIndex);
        images[currentLoadIndex] = img;
        currentLoadIndex += 1;
      }
      if (currentLoadIndex < frameCount) {
        if ("requestIdleCallback" in window) {
          requestIdleCallback(loadNextBatch);
        } else {
          setTimeout(loadNextBatch, 50);
        }
      }
    };
    if (frameCount > 5) {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(loadNextBatch);
      } else {
        setTimeout(loadNextBatch, 50);
      }
    }

    const proxy = { frame: 0 };
    let lastRenderedFrame = -1;

    const render = () => {
      const currentFrameIndex = Math.round(proxy.frame);

      if (currentFrameIndex === lastRenderedFrame && cw > 0 && ch > 0) return;

      const img = images[currentFrameIndex];
      if (!img || !img.complete) return;

      lastRenderedFrame = currentFrameIndex;
      context.clearRect(0, 0, cw, ch);

      const crop = frameCrops?.[currentFrameIndex] ?? sourceCrop;
      const sx = crop ? crop.x * img.width : 0;
      const sy = crop ? crop.y * img.height : 0;
      const sWidth = crop ? crop.width * img.width : img.width;
      const sHeight = crop ? crop.height * img.height : img.height;

      const hRatio = cw / sWidth;
      const vRatio = ch / sHeight;
      const ratio = Math.min(hRatio, vRatio);
      const drawWidth = sWidth * ratio;
      const drawHeight = sHeight * ratio;
      const dx = (cw - drawWidth) / 2;
      const dy = (ch - drawHeight) / 2;

      context.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, drawWidth, drawHeight);

      // Frames are rendered with an opaque black background baked into the
      // image data - not transparency - so no CSS trick changes what shows
      // behind the drone. Key near-black pixels out to real alpha=0 here,
      // once per frame CHANGE only (this whole function is gated above on
      // `currentFrameIndex === lastRenderedFrame`), so a caller can put any
      // background colour behind the canvas instead of relying on
      // `mix-blend-screen` against a black backdrop.
      //
      // BUG FIXED (2026-09-20): `getImageData`/`putImageData` read/write the
      // canvas's raw BACKING-STORE pixels and ignore the `setTransform(dpr,
      // ...)` applied for `drawImage` - passing the CSS-space `dx`/`dy`/
      // `drawWidth`/`drawHeight` here (unscaled by `dpr`) only touched a
      // quarter of the actually-drawn region on a 2x-DPR screen, leaving
      // the rest un-keyed and producing the misaligned white/black block
      // artifacts seen on screen. Operating on the FULL backing store
      // (`canvas.width`/`canvas.height`, already in device pixels) avoids
      // the coordinate space mismatch entirely - the untouched area outside
      // the drawn image is already fully transparent from `clearRect`
      // above, so keying it too is a correctness no-op, not a bug.
      if (keyOutBlack) {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i] ?? 0;
          const g = data[i + 1] ?? 0;
          const b = data[i + 2] ?? 0;
          if (r < BLACK_KEY_THRESHOLD && g < BLACK_KEY_THRESHOLD && b < BLACK_KEY_THRESHOLD) {
            data[i + 3] = 0;
          }
        }
        context.putImageData(imageData, 0, 0);
      }
    };

    if (images[0]) images[0].onload = render;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        scroller: scrollContainer?.current ?? window,
        scrub: 0.35,
        start: "top top",
        end: end ?? `+=${scrollDistance}`,
        ...(pinTarget
          ? {
              pin: pinTarget,
              // When `pinRef` names a DIFFERENT, `position: absolute`
              // element than `trigger`, it already contributes zero height
              // to normal flow, so there's no flow-height to preserve with
              // a spacer. Only the trigger-is-the-pin-target case (a
              // normal-flow section) wants GSAP's default spacer.
              pinSpacing: pinTarget === trigger,
              pinType: "transform" as const,
              anticipatePin: 1,
            }
          : {}),
      },
    });
    tl.to(proxy, { frame: frameCount - 1, ease: "none", onUpdate: render });

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resizeCanvas();
        lastRenderedFrame = -1;
        render();
      }, 150);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [basePath, frameCount, pad, extension, triggerRef, pin, pinRef, scrollContainer, scrollDistance, end, keyOutBlack, sourceCrop, frameCrops]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
