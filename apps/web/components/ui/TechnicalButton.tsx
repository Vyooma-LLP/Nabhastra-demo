import Link from "next/link";
import type { ReactNode } from "react";
import { CornerFrame } from "@/components/ui/CornerFrame";

/**
 * Rebuilt 2026-09-18 from the measured pair `shield.ai components/no hover
 * colour.png` and `on hover colour change.png`, which capture the same button
 * in both states and show that the reference's button is not a colour-shift -
 * it is an INVERSION:
 *
 *   REST   a quiet raised well - a fill one step off the page, NOT an outlined
 *          box - with four corner ticks flush on its corners, and the label in
 *          the mono face, uppercase, at nav tracking.
 *   HOVER  the well floods solid signal and the ticks disappear entirely, and
 *          the label reads out of the fill.
 *
 * TWO CORRECTIONS after zooming the reference pixels (same day, and both were
 * mine to get wrong the first time):
 *
 *   NO STROKE. The rest state is a *fill* one step off the page - LEARN MORE
 *   measures ~#141414 on a black page, the footer pair ~#e2e2e2 on bone - with
 *   no border line of its own. The fill boundary IS the edge. Adding a
 *   `border` on top of the ticks drew two outlines a few pixels apart, which
 *   is what turned these into boxed pills.
 *
 *   NO STANDOFF. The ticks sit flush on the corners, sharing the fill's exact
 *   edge. See the note in CornerFrame.
 *
 * The reticle resolves into a target. That reading is the whole point: the
 * ticks are a *sighting* gesture, so they have no reason to persist once the
 * thing is acquired. The previous implementation kept the ticks constant and
 * only tinted the text, which is why it read as an ordinary link with
 * decoration rather than as an instrument.
 *
 * ARROW REMOVED. No button in any of the eleven reference captures carries one
 * - not the nav CTA, not LEARN MORE, not the footer pair. It was a Nabhastra
 * addition, and against a grammar this spare a sliding glyph is noise.
 *
 * ONE DELIBERATE DEVIATION, flagged rather than silently copied: the reference
 * sets its hovered label in white on coral, which measures ~2.3:1 against this
 * project's `--color-signal` and fails WCAG AA for a 12px label. The label
 * reads in ink here instead (~7:1). The inversion, which is the actual
 * gesture, is preserved intact; only the ink/white choice inside it differs.
 * See project/DECISIONS/2026-09-18-shield-ai-component-fidelity-pass.md.
 *
 * Vocabulary stays constrained at the call site: EXPLORE SYSTEM, VIEW
 * PLATFORM, REQUEST A BRIEFING, TALK TO NABHASTRA. Never "Get started".
 */
type Variant = "default" | "signal" | "cta";

const BASE =
  "group relative inline-flex items-center justify-center px-7 py-3.5 font-mono text-meta tracking-nav uppercase transition-colors duration-(--duration-fast) ease-(--ease-signal)";

const VARIANT: Record<Variant, string> = {
  // The standard pair: a quiet raised well at rest, signal flood on hover.
  // `bg-well` is a surface-scoped token so this is one class on both ink and
  // bone (see globals.css) rather than a variant per surface.
  default:
    "bg-well text-paper hover:bg-signal hover:text-signal-ink focus-visible:bg-signal focus-visible:text-signal-ink",
  // Same gesture, but the label already carries signal at rest - used where the
  // button is the primary action in its section.
  signal:
    "bg-well text-signal hover:bg-signal hover:text-signal-ink focus-visible:bg-signal focus-visible:text-signal-ink",
  // The header CTA, measured from `nav bar contact us.png`: a filled well in
  // dark rust with a rust hairline, a WHITE label (not coral - the label is
  // paper there, the rust is the surface), and permanent coral ticks. It
  // deepens rather than inverts on hover: it is the one button already "on",
  // so it has nowhere to resolve to.
  cta: "border border-(--color-signal-well-edge) bg-(--color-signal-well) text-paper hover:border-signal hover:bg-(--color-signal-well-hover)",
};

export function TechnicalButton({
  href,
  children,
  variant = "default",
  className = "",
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  // The CTA's ticks are permanent and coral. Everywhere else they are the
  // sighting gesture: paper, standing off the edge, and gone once acquired.
  const inner =
    variant === "cta" ? (
      <>
        <CornerFrame tone="signal" />
        <span>{children}</span>
      </>
    ) : (
      <>
        <span className="absolute inset-0 opacity-100 transition-opacity duration-(--duration-fast) ease-(--ease-signal) group-hover:opacity-0 group-focus-visible:opacity-0">
          <CornerFrame tone="paper" />
        </span>
        <span>{children}</span>
      </>
    );

  const cls = `${BASE} ${VARIANT[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" className={cls}>
      {inner}
    </button>
  );
}
