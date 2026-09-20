import type { ReactNode } from "react";

/**
 * The small uppercase eyebrow that opens every section, with an optional
 * two-digit index. The index is what turns a list of sections into a sequence
 * the visitor can feel their way through - the "inspect, don't browse"
 * metaphor made literal in the margin.
 *
 * THE SQUARE (added 2026-09-18). In `shield.ai components/section organisation
 * and stylish space wasting.png` every small label is preceded by a solid coral
 * square roughly the height of the lowercase x - a single-pixel-scale mark that
 * does a surprising amount of work, because it is the only thing anchoring a
 * label to the column it belongs to across a very wide gutter. Unindexed labels
 * take the square; indexed ones keep their number, since both are the same
 * gesture (a mark, then a rule, then the word) and doubling them up would read
 * as clutter rather than precision.
 */
export function SectionLabel({
  index,
  children,
  className = "",
}: {
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-3 font-mono text-meta tracking-nav text-paper-dim uppercase ${className}`}
    >
      {index ? (
        <>
          <span className="text-signal">{index}</span>
          <span aria-hidden className="h-px w-8 bg-line" />
        </>
      ) : (
        <span aria-hidden className="h-1.5 w-1.5 shrink-0 bg-signal" />
      )}
      <span>{children}</span>
    </p>
  );
}
