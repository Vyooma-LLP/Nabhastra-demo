/**
 * The four L-shaped corner ticks. They are the recognisable frame gesture of
 * the reference grammar: never a full box, never a radius.
 *
 * Re-measured 2026-09-18 against `shield.ai components/`, which resolved three
 * things the earlier implementation had collapsed into one:
 *
 *   1. TONE is not a synonym for "active". On a nav item the ticks stay
 *      paper-white while the *label* turns coral (`nab bar section on hovering
 *      cursour.png`) - the bracket marks the target, the colour marks the
 *      state, and they are deliberately different channels. Coral ticks are
 *      reserved for the header CTA (`nav bar contact us.png`), where they are
 *      permanent rather than a hover response. On bone surfaces the ticks go
 *      dark (`footer section.png`) with no extra tone: `paper` resolves through
 *      `--color-paper`, which `.on-paper` already flips to ink.
 *   2. Arm length is 12px, not 10px.
 *
 * CORRECTED AGAIN, same day: an earlier pass in this session gave the ticks a
 * standoff from the button edge, on the belief that "a reticle sits around its
 * target, not on it". Zooming the actual pixels killed that idea. In all three
 * button captures - LEARN MORE in `no hover colour.png`, CONTACT US in `nav bar
 * contact us.png`, and the footer pair in `footer section.png` - the ticks sit
 * FLUSH on the corners, overlapping the fill, sharing its exact edge. The
 * standoff produced a second outline a few pixels outside the first, which read
 * as a boxed pill rather than a bracketed target. There is no gap. Ever.
 *
 * Renders into a positioned ancestor. Purely decorative, so it is hidden from
 * assistive technology - the state it marks is always also conveyed by text,
 * colour and aria attributes on the element itself.
 */
type Tone = "paper" | "signal";

const TONE: Record<Tone, string> = {
  paper: "border-paper/70",
  signal: "border-signal",
};

export function CornerFrame({
  className = "",
  tone = "paper",
}: {
  className?: string;
  tone?: Tone;
}) {
  const arm = "absolute h-(--bracket) w-(--bracket) transition-colors duration-(--duration-fast)";
  const color = TONE[tone];

  return (
    <span aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <span className={`${arm} top-0 left-0 border-t border-l ${color}`} />
      <span className={`${arm} top-0 right-0 border-t border-r ${color}`} />
      <span className={`${arm} bottom-0 left-0 border-b border-l ${color}`} />
      <span className={`${arm} right-0 bottom-0 border-r border-b ${color}`} />
    </span>
  );
}
