"use client";

import { StackSpreadStage, type StackSpreadCard } from "@/components/ui/stack-spread";
import { demoProof } from "@/content/demo/proof";
import { useScrollContainer } from "@/lib/scroll-container";

/**
 * PROOF, as the scatter. Added 2026-09-18 on explicit direction: the proof wall
 * is rendered by `hyperiux/stack-spread` (21st.dev, MIT, vendored in
 * `components/ui/stack-spread.tsx`) and it lives on the homepage.
 *
 * The component holds a stack of cards clustered in the centre of a sticky
 * viewport and scatters them outward as the section scrolls, revealing a
 * headline underneath. Upstream ships it with eight hardcoded demo images and
 * its own copy; the only change made to that file was exporting the stage and
 * letting the text be passed in, so the layout below is ours and the motion is
 * theirs.
 *
 * TEN CARDS, NOT EIGHT. Upstream's `CARDS` array places eight items by hand in
 * viewport units. Every proof item that has a photograph gets a card here, which
 * is ten, so two more resting positions had to be authored. They are laid out as
 * a ring around the centre text rather than a grid: four across the top, one on
 * each flank, four across the bottom. The centre stays empty because the
 * headline resolves there once the scatter completes.
 *
 * It was eleven until `col conference.jpeg` was dropped on Praneeth's
 * instruction (2026-09-18); the ring was rebalanced rather than left with a gap,
 * since an odd top row would have thrown the whole arrangement off-centre.
 *
 * The order is deliberate and is NOT the order of `demoProof`. `z` is paint
 * order, and the cards nearest the front of the stack are the ones a visitor
 * sees longest while it is still clustered, so the strongest evidence is given
 * the front positions - the TechPioneer recognition, which carries its own
 * printed proof, then the Army demonstration and the ministry meeting.
 *
 * Alt text comes straight from each proof item, so the descriptions that were
 * written against the photographs in `content/demo/proof.ts` are the ones that
 * reach assistive technology here. There is no second set of captions to drift.
 *
 * Reduced motion is upstream's: it flattens the cluster rotation and drops the
 * pointer parallax, and the cards move only with scroll.
 */

/**
 * Resting positions, in viewport units, measured from the centre. `w`/`h` are
 * vw/vh. `targetSm` only supplies a sign for `x` (the component snaps small
 * screens to a two-column grid) plus the row's `y`.
 *
 * SMALL-SCREEN ROWS are bounded by ±39, not ±44. On touch layouts the component
 * fixes every card at 20vh tall, so a row centred at 44 runs from 34vh to 54vh
 * and falls off the bottom of the viewport - measured, four cards were doing
 * exactly that. The rows now sit at ±39, ±28 and ±18, which keeps every card
 * inside the frame, and the ±18 pair is split to opposite sides so the centre
 * band stays readable behind the headline.
 */
const LAYOUT: {
  target: StackSpreadCard["target"];
  targetSm: { x: number; y: number };
  stackOffset: { x: number; y: number };
  stackRotate: number;
}[] = [
  // --- top row, left to right (4) -------------------------------------------
  { target: { x: -37, y: -31, rotate: -3, scale: 0.9, w: 16, h: 23 }, targetSm: { x: -22, y: -39 }, stackOffset: { x: -14, y: -9 }, stackRotate: -17 },
  { target: { x: -13, y: -35, rotate: 2, scale: 0.85, w: 18, h: 21 }, targetSm: { x: 22, y: -39 }, stackOffset: { x: -5, y: -11 }, stackRotate: 11 },
  { target: { x: 13, y: -35, rotate: -2, scale: 0.85, w: 18, h: 21 }, targetSm: { x: -22, y: -28 }, stackOffset: { x: 4, y: -10 }, stackRotate: -5 },
  { target: { x: 37, y: -31, rotate: 3, scale: 0.9, w: 16, h: 23 }, targetSm: { x: 22, y: -28 }, stackOffset: { x: 14, y: -9 }, stackRotate: 15 },
  // --- flanks (2) -----------------------------------------------------------
  // x is 37, not 43: at 43 these two hung half off the left and right edges of
  // the viewport. Their inner edge now lands at about 30vw from centre, which
  // still clears the headline (it runs to roughly 28vw) without clipping.
  { target: { x: -37, y: 3, rotate: 2, scale: 0.9, w: 15, h: 27 }, targetSm: { x: -22, y: -18 }, stackOffset: { x: -17, y: 1 }, stackRotate: -8 },
  { target: { x: 37, y: 4, rotate: -3, scale: 0.9, w: 15, h: 27 }, targetSm: { x: 22, y: 18 }, stackOffset: { x: 18, y: 2 }, stackRotate: 7 },
  // --- bottom row, left to right (4) ----------------------------------------
  { target: { x: -34, y: 33, rotate: 3, scale: 0.9, w: 18, h: 22 }, targetSm: { x: -22, y: 28 }, stackOffset: { x: -11, y: 9 }, stackRotate: 6 },
  { target: { x: -12, y: 37, rotate: -2, scale: 0.85, w: 18, h: 20 }, targetSm: { x: 22, y: 28 }, stackOffset: { x: -3, y: 11 }, stackRotate: -4 },
  { target: { x: 11, y: 37, rotate: 2, scale: 0.85, w: 18, h: 20 }, targetSm: { x: -22, y: 39 }, stackOffset: { x: 6, y: 11 }, stackRotate: 4 },
  { target: { x: 33, y: 33, rotate: -3, scale: 0.9, w: 17, h: 22 }, targetSm: { x: 22, y: 39 }, stackOffset: { x: 14, y: 10 }, stackRotate: -9 },
];

/** Front of the stack first: strongest evidence gets the most dwell time. */
const ORDER = [
  "startup-techpioneer-recognition",
  "army-field-demonstration",
  "civil-aviation-ministry-meeting",
  "heavy-lift-airframe-unveiling",
  "ncc-drone-competition",
  "startup-arunachal-felicitation",
  "amtz-delegation",
  "startup-arunachal-front-row",
  "facility-spray-platform-review",
  "aditya-university-visit",
];

function buildCards(): StackSpreadCard[] {
  const byId = new Map(demoProof.map((p) => [p.id, p]));

  // Driven from LAYOUT rather than from ORDER, so a slot always exists for the
  // card being built. A proof id that is missing, or that has no photograph,
  // simply yields no card: the wall shrinks, it never renders a hole.
  return LAYOUT.flatMap((slot, i) => {
    const id = ORDER[i];
    const proof = id ? byId.get(id) : undefined;
    const media = proof?.media;
    if (!media) return [];

    return [
      {
        item: { src: media.src, alt: media.alt },
        target: slot.target,
        targetSm: slot.targetSm,
        stackOffset: slot.stackOffset,
        stackRotate: slot.stackRotate,
        // Later in ORDER = further back. The first entry paints on top of the
        // clustered stack, which is the card the visitor actually reads.
        z: LAYOUT.length + 1 - i,
      },
    ];
  });
}

export function ProofStackSpread() {
  const cards = buildCards();
  const scrollContainer = useScrollContainer();

  return (
    <section id="proof" aria-label="Proof">
      <StackSpreadStage
        cards={cards}
        scrollContainer={scrollContainer ?? undefined}
        headline={
          <>
            What we can <span className="opacity-60">currently</span> show.
          </>
        }
        subtitle="Photographed evidence, described as what it is. Demonstrations and institutional visits, not deployments or endorsements."
        // Paper, because the record is paper (DESIGN.md §3.3) - the same bone
        // the proof wall and the footer already use, rather than upstream's
        // #ececeb, so the section belongs to this site's surface system.
        bgColor="#f1f0eb"
        textColor="#101010"
        cardRadius={0}
        scrollLength={380}
        showScrollHint={false}
      />
    </section>
  );
}
