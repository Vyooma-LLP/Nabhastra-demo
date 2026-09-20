"use client";

import { useRef } from "react";
import GatewayFlow from "@/components/ui/gateway-flow";
import { FrameSequence } from "@/components/ui/frame-sequence";
import { TechnicalButton } from "@/components/ui/TechnicalButton";
import { useScrollContainer } from "@/lib/scroll-container";

/**
 * WORLD -> AIRCRAFT. The first step of the inspection sequence.
 *
 * HERO VISUAL REPLACED (2026-09-19, explicit direction). The photograph
 * (`hero-dome-loop.jpeg`) and the `ParallaxStripSlider` strip-wipe are both
 * gone, replaced by `mengto/gateway-flow` from 21st.dev - a 2D canvas
 * animation of particle streams converging through a gateway, vendored in
 * `components/ui/gateway-flow.tsx`.
 *
 * None of the old hero's isolation apparatus (`contain-paint`/`isolate`/
 * `transform-gpu` container, cursor-avoid refs, opt-in pointer-events) is
 * needed for GatewayFlow: it renders into a sandboxed iframe with its own
 * document, event loop and paint scope, has no custom cursor and no
 * click-to-advance.
 *
 * HOURGLASS QUADRANTS (2026-09-20, explicit direction). The hourglass
 * converges to a point at the section's centre, leaving its top-left and
 * bottom-right quadrants empty over plain background. Company copy sits in
 * the top-left quadrant (paired with the headline); a scroll-scrubbed drone
 * exploded-view frame sequence sits in the bottom-right.
 *
 * SCROLL RULES (2026-09-20, explicit direction, verbatim):
 *   1. "the hero section should scroll only after the drone frame[s] are
 *      ended" - the whole section (hourglass, headline, copy, buttons)
 *      holds in place until the drone's full scroll-space is exhausted.
 *   2. "while the drone's frames are changing only the drone should be
 *      affected with the scroll, rest all should not be flickering."
 *   3. "on scroll drone frames move, on click the regular existing
 *      hourglass wave animation should be there" - GatewayFlow's
 *      click-to-ripple stays live throughout.
 *
 * WHY THIS IS A `sticky` STAGE, NOT A GSAP PIN (root-caused 2026-09-20 by
 * directly comparing two configurations of the same `FrameSequence`
 * mechanism: pinning this whole section via GSAP `pin` - which also
 * contains `GatewayFlow`, a sandboxed cross-document iframe running its own
 * independent animation loop - flickered badly; pinning a dedicated section
 * containing ONLY the canvas did not). Cross-document iframes almost always
 * get their own GPU compositing layer; a GSAP pin writes a new `transform`
 * on the pinned element every scroll tick, forcing the browser to
 * reposition/recomposite every layer inside it, including the iframe's -
 * confirmed by testing `visibility: hidden` on the iframe (still flickered,
 * since it's still in the layout tree with a layer allocated) versus fully
 * removing it from the pinned subtree (didn't flicker). Rule 1 requires
 * holding the WHOLE section - iframe included - so a JS-driven transform
 * pin can't satisfy rule 1 and rule 2 at once; it's the wrong tool, not a
 * misconfiguration.
 *
 * The fix: the outer `<section>` below is a tall "scroll space"
 * (`h-[calc(100vh+var(--drone-scroll-distance))]`), and
 * `FrameSequence`'s `pin={false}` means it only reads that section's scroll
 * progress to drive the frame index - it never touches any element's CSS.
 * The inner `<div class="sticky top-0 h-screen">` is the actual visual
 * stage (hourglass, headline, copy, buttons, drone box, all of it) - plain
 * CSS `position: sticky`, held in place by the browser's own layout/
 * compositor natively, with nothing rewriting `transform` on any tick. The
 * iframe is never forced through a recompositing cascade, satisfying rule
 * 2; sticky doesn't touch pointer events, so GatewayFlow's click-to-ripple
 * is untouched, satisfying rule 3.
 *
 * `pointer-events-none` survives on the iframe wrapper alone, for one reason:
 * upstream's canvas listens for `click` to spawn a ripple, and a full-bleed
 * iframe swallowing pointer events over the whole hero would make the headline
 * unselectable and the buttons the only live thing on it.
 *
 * The scrim stays. The animation is bright at the centre and the headline sits
 * on top of it, so the copy needs the same top-and-bottom darkening it always
 * had.
 */

const DRONE_SCROLL_DISTANCE = 3000;

/**
 * Per-frame crop of the source frame to the drone's OWN bounding box in
 * THAT frame, with a 1.2x margin (explicit direction, 2026-09-20: "let the
 * canvas have some more than enough room after the drone is exploded...
 * exploded drone needs 1x space of canvas, you create a canvas of size
 * 1.2x"). Measured directly, not eyeballed: every one of the 51 source
 * frames (3840x2160) was decoded and its own non-black pixel bounding box
 * computed independently.
 *
 * NOT a single fixed crop (tried first, reverted - explicit direction,
 * 2026-09-20: "the canvas is not perfect and a lot of extra room is
 * there"). A single window has to be sized to fit every frame's bounding
 * box AT ONCE, including whichever single frame is the widest (frame 30)
 * AND whichever is the tallest (frame 48) - two DIFFERENT frames - so every
 * other frame in the sequence necessarily shows more empty margin than its
 * own content needs, which is exactly the "extra room" flagged. Cropping
 * each frame to ITS OWN bounding box instead - recentred per frame - keeps
 * the drone filling the same proportion of the box on every single frame,
 * whether newly assembled (frame 1, compact) or mid-explosion (widest at
 * frame 30, tallest at frame 48).
 *
 * Margin tightened from 1.2x to ~1.1215x (explicit direction, 2026-09-20:
 * "increase the size of drone by 7%") - each crop shrunk by /1.07 around
 * its own unchanged centre, which scales the drawn drone up 7% within the
 * same box without moving or resizing the box itself.
 */
const DRONE_FRAME_CROPS: Array<{ x: number; y: number; width: number; height: number }> = [
  { x: 0.1559, y: 0.2507, width: 0.6618, height: 0.5343 },
  { x: 0.1576, y: 0.2506, width: 0.6571, height: 0.5348 },
  { x: 0.1612, y: 0.2506, width: 0.6487, height: 0.5348 },
  { x: 0.1665, y: 0.2506, width: 0.637, height: 0.5353 },
  { x: 0.1739, y: 0.2507, width: 0.6355, height: 0.5358 },
  { x: 0.1842, y: 0.2501, width: 0.6323, height: 0.5374 },
  { x: 0.1984, y: 0.25, width: 0.6259, height: 0.5379 },
  { x: 0.2172, y: 0.2495, width: 0.615, height: 0.539 },
  { x: 0.2413, y: 0.2483, width: 0.5993, height: 0.5447 },
  { x: 0.2713, y: 0.2454, width: 0.5771, height: 0.5545 },
  { x: 0.2794, y: 0.2421, width: 0.5786, height: 0.5649 },
  { x: 0.2681, y: 0.2388, width: 0.599, height: 0.5758 },
  { x: 0.2568, y: 0.2349, width: 0.6183, height: 0.5867 },
  { x: 0.2461, y: 0.2306, width: 0.6358, height: 0.5987 },
  { x: 0.2362, y: 0.2262, width: 0.6501, height: 0.6095 },
  { x: 0.2272, y: 0.2224, width: 0.6612, height: 0.6199 },
  { x: 0.2201, y: 0.2182, width: 0.6674, height: 0.6298 },
  { x: 0.2151, y: 0.215, width: 0.6685, height: 0.6376 },
  { x: 0.2124, y: 0.2114, width: 0.6638, height: 0.6454 },
  { x: 0.2136, y: 0.2077, width: 0.6521, height: 0.6521 },
  { x: 0.2186, y: 0.2042, width: 0.6326, height: 0.6579 },
  { x: 0.2282, y: 0.2013, width: 0.6054, height: 0.6615 },
  { x: 0.242, y: 0.1983, width: 0.5765, height: 0.6646 },
  { x: 0.2616, y: 0.1929, width: 0.5408, height: 0.6693 },
  { x: 0.2837, y: 0.1862, width: 0.5403, height: 0.6828 },
  { x: 0.2689, y: 0.1794, width: 0.5745, height: 0.6952 },
  { x: 0.2463, y: 0.1734, width: 0.6364, height: 0.7056 },
  { x: 0.2196, y: 0.1673, width: 0.7059, height: 0.7144 },
  { x: 0.1748, y: 0.1623, width: 0.7734, height: 0.7212 },
  { x: 0.1423, y: 0.1584, width: 0.8052, height: 0.7253 },
  { x: 0.1265, y: 0.1555, width: 0.7993, height: 0.7274 },
  { x: 0.1335, y: 0.1537, width: 0.7515, height: 0.7274 },
  { x: 0.1689, y: 0.1533, width: 0.6761, height: 0.7259 },
  { x: 0.2303, y: 0.1534, width: 0.6443, height: 0.7233 },
  { x: 0.296, y: 0.1474, width: 0.5987, height: 0.7331 },
  { x: 0.264, y: 0.1403, width: 0.6472, height: 0.7436 },
  { x: 0.2371, y: 0.1333, width: 0.6805, height: 0.7529 },
  { x: 0.2169, y: 0.1264, width: 0.6971, height: 0.7617 },
  { x: 0.2056, y: 0.1194, width: 0.696, height: 0.7694 },
  { x: 0.203, y: 0.1131, width: 0.6784, height: 0.7763 },
  { x: 0.209, y: 0.1077, width: 0.6457, height: 0.782 },
  { x: 0.2271, y: 0.1032, width: 0.5999, height: 0.7861 },
  { x: 0.2562, y: 0.1003, width: 0.5879, height: 0.7887 },
  { x: 0.2626, y: 0.0993, width: 0.6049, height: 0.7907 },
  { x: 0.2297, y: 0.0992, width: 0.6501, height: 0.7918 },
  { x: 0.2032, y: 0.0992, width: 0.7053, height: 0.7923 },
  { x: 0.1689, y: 0.0924, width: 0.7573, height: 0.7996 },
  { x: 0.1337, y: 0.0913, width: 0.7812, height: 0.8007 },
  { x: 0.1246, y: 0.0958, width: 0.7536, height: 0.796 },
  { x: 0.1488, y: 0.1056, width: 0.6718, height: 0.785 },
  { x: 0.2058, y: 0.1204, width: 0.6288, height: 0.769 },
];

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const scrollContainer = useScrollContainer();

  return (
    <section
      ref={heroRef}
      className="relative border-b border-line"
      style={{ height: `calc(100vh + ${DRONE_SCROLL_DISTANCE}px)` }}
    >
      <div className="sticky top-0 flex h-screen items-stretch overflow-hidden">
        {/* NOT `pointer-events-none`. Upstream's canvas listens for `click` and
            spawns an expanding ripple that pushes the particles aside - the
            interaction the component is partly there for. A wrapper that eats
            pointer events kills it silently, which is exactly what happened on
            the first pass. Everything layered ON TOP of this is what has to let
            clicks through, not this. */}
        <div aria-hidden className="absolute inset-0 isolate">
          {/* EXACTLY upstream's own demo usage, no props:
                <GatewayFlow className="h-full w-full" />
              Every knob was tried and every knob is gone. Tuning density,
              opacity, brightness and speed changed what the effect IS, and what
              it is supposed to be is the hourglass in the component's own
              preview. Leave it alone. */}
          {/* Rotated -15deg anticlockwise (explicit direction, 2026-09-20),
              shifted up 15%, down 7%, then down 1% more (explicit
              direction, 2026-09-20) - net -7%. Oversized 40% before
              rotating so the rotated/shifted box still covers every corner
              of the section. */}
          <div className="absolute -inset-[20%] -translate-y-[7%] rotate-[-15deg]">
            <GatewayFlow className="h-full w-full" />
          </div>

          {/* Scrim: part of the same visual surface as the animation, not the
              floating chrome, so it lives inside this wrapper.
              `pointer-events-none` so clicks fall through to the canvas. */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, color-mix(in oklab, var(--color-ink) 70%, transparent) 0%, color-mix(in oklab, var(--color-ink) 20%, transparent) 30%, color-mix(in oklab, var(--color-ink) 20%, transparent) 70%, color-mix(in oklab, var(--color-ink) 75%, transparent) 100%)",
            }}
          />
        </div>

        {/* Drone exploded-view frame sequence, bottom-right quadrant of the
            hourglass (mirrors the headline+copy block occupying the top-left).
            Frame-based, not 3D: 51 pre-rendered frames (every other frame of a
            102-frame exploded-view render) scrubbed by the outer section's
            scroll progress. `pin={false}` on `FrameSequence` - this stage is
            already held still by the `sticky` wrapper above, so nothing here
            is pinned or transformed by GSAP.
            `pointer-events-none` and `z-10` - it sits above the hourglass
            canvas/scrim but below the text content (`z-30`), and never
            intercepts clicks. Shifted left 25% (explicit direction,
            2026-09-20), then right 15% and up 20% (explicit direction,
            2026-09-20), then up 5% more (explicit direction, 2026-09-20) -
            net -10% x, -25% y.
            BLACK BACKGROUND (reverted 2026-09-20 - white was requested only
            to see the box's edges clearly while tightening its size,
            explicit direction: "strip of the white colour and put back the
            old black"). Frames render on pure black, same as this hero's
            background, so `mix-blend-screen` on the canvas drops the black
            and leaves only the drone - no `keyOutBlack`/`bg-white` needed
            for this.
            TIGHTENED, PER FRAME (explicit direction, 2026-09-20: "the
            canvas is not perfect and a lot of extra room is there" - a
            single fixed crop was tried first and rejected for exactly this
            reason). Width kept from the previous size pass (48.875vh/
            546.25px base, lg 60.375vh/661.25px); height now derived from
            the MEAN aspect ratio of the drone's own bounding box across all
            51 frames (~1.74, measured - almost exactly the source frame's
            own 16:9), the best single fixed box shape for a sequence whose
            individual frames vary in aspect ratio as the drone reconfigures
            (`DRONE_FRAME_CROPS` recentres and rescales per frame, but the
            CSS box itself can't reshape frame to frame without visual
            jank, so it targets the average). No `scale-[1.4]` anymore -
            that was compensating for how little of the UNCROPPED frame the
            drone used to occupy; the per-frame crop already does that job
            precisely, frame by frame. */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-6 bottom-28 z-10 h-[28.09vh] w-[48.875vh] max-w-[546.25px] -translate-x-[10%] -translate-y-[25%] overflow-hidden sm:bottom-32 lg:right-10 lg:h-[34.7vh] lg:w-[60.375vh] lg:max-w-[661.25px]"
        >
          <FrameSequence
            basePath="/media/drone-sequence/frame_"
            frameCount={51}
            triggerRef={heroRef}
            pin={false}
            end="bottom bottom"
            scrollContainer={scrollContainer ?? undefined}
            frameCrops={DRONE_FRAME_CROPS}
            className="h-full w-full mix-blend-screen"
          />
        </div>

        {/* Content. Layout (2026-09-20, per explicit direction): headline and
            company copy both anchored to the top-left quadrant of the
            hourglass (paired, not split across the row - the drone frames now
            occupy the opposing bottom-right quadrant), with the two calls to
            action on a second row pinned to the section's bottom edge. */}
        {/* `pointer-events-none` on the wrapper, `pointer-events-auto` back on
            the things that are actually interactive. The wrapper stretches over
            the whole section, so without this it would swallow every click
            before the canvas underneath ever sees one - the empty middle
            included. The text opts back in so it stays selectable. */}
        <div className="pointer-events-none relative z-30 mx-auto flex w-full max-w-(--container-editorial) flex-col justify-between px-6 py-16 lg:py-20">
          {/* Shifted up 12%, then up 8% more (explicit direction,
              2026-09-20) - net -20%. */}
          <div className="flex max-w-[38ch] -translate-y-[20%] flex-col gap-6">
            <h1 className="pointer-events-auto font-(family-name:--font-display) text-4xl leading-[1.05] font-normal text-balance sm:text-5xl lg:text-6xl">
              Engineering systems for the air.
            </h1>

            {/* `text-balance`, not `text-pretty`: this is a short block where
                even line lengths matter more than widow control - `text-pretty`
                was leaving "and built in India." orphaned on its own line. */}
            <p className="pointer-events-auto text-lg leading-relaxed text-paper-dim text-balance">
              Nabhastra designs aerial platforms, sensing and mission technology
              for surveillance, mapping, agriculture and logistics — engineered
              and built in India.
            </p>
          </div>

          {/* Shifted up 7%, then up 8% more (explicit direction,
              2026-09-20) - net -15%. */}
          <div className="mt-auto flex -translate-y-[15%] flex-col gap-4 pt-16 sm:flex-row sm:items-center sm:justify-between">
            <TechnicalButton
              href="/systems"
              variant="signal"
              className="pointer-events-auto"
            >
              Explore systems
            </TechnicalButton>
            <TechnicalButton href="/technology" className="pointer-events-auto">
              See the technology
            </TechnicalButton>
          </div>
        </div>
      </div>
    </section>
  );
}
