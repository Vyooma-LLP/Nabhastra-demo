"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { RelationshipList, type RelationshipItem } from "@/components/ui/RelationshipList";

/**
 * The curtain-reveal primitive (DESIGN.md §5.4). Resting state is recognition
 * - an image plus a one-line human gloss. Activated state (hover, keyboard
 * focus, or tap on touch) is a technical panel that rises over the image like
 * a physical sheet, not a fade or a card flip. The image stays underneath
 * rather than disappearing.
 *
 * Reserved for content with a genuine visual <-> technical duality: a
 * technology or a product/system. Not for company, contact, navigation or
 * generic CTAs (DESIGN.md §5.4's allow-list) - using it everywhere would make
 * the reveal a gimmick instead of a signal.
 *
 * This component is deliberately data-only: it renders exactly what its props
 * supply and derives no meaning from filenames or IDs. `image: null` (or
 * omitted) renders the same honest "imagery pending" empty state SystemCard
 * uses - an unresolved asset slot, never a guessed one. `technical: []` (or
 * omitted) reads as "technical detail pending", not a fabricated attribute
 * list. Callers own the content-truth decision of what goes in each slot.
 *
 * Accessibility: the trigger is a real <button aria-expanded>, and the
 * revealed panel is a sibling <div>, never nested inside it - a link inside a
 * button (or vice versa) is forbidden per the project's own component rules.
 *
 * The panel toggles `aria-hidden` + `tabIndex={-1}` on its own links while
 * closed, not `inert`: testing the actual keyboard path (not just assuming
 * the attribute works) showed Chromium does not reliably honour a
 * dynamically-toggled `inert` for sequential Tab navigation, even though the
 * element stays programmatically focusable underneath - tabbing from the
 * trigger button landed on <body> instead of the revealed Explore link.
 * `aria-hidden`/`tabIndex` is the older, well-supported mechanism for exactly
 * this "hidden until disclosed" case and has no such quirk.
 *
 * Reduced motion needs no special case here: the global
 * `prefers-reduced-motion` rule in globals.css already collapses the
 * clip-path transition to near-zero duration, leaving the same toggle with no
 * animation - a usable static version, not a broken one.
 */

export type RevealCardTechnicalAttribute = { label: string; value: string };

export interface RevealCardProps {
  title: string;
  /** 1-2 line human-readable gloss shown on the resting (image) layer */
  summary: string;
  /** null/omitted = unresolved asset slot - renders "imagery pending", never a guess */
  image?: { src: string; alt: string; width?: number; height?: number } | null;
  /** 2-4 technical attributes shown on the revealed layer. Omit if not yet confirmed. */
  technical?: RevealCardTechnicalAttribute[];
  /** systems/technologies this connects to, rendered via RelationshipList (brand green) */
  related?: RelationshipItem[];
  relatedLabel?: string;
  href?: string;
  ctaLabel?: string;
  className?: string;
}

export function RevealCard({
  title,
  summary,
  image,
  technical = [],
  related,
  relatedLabel = "Connects to",
  href,
  ctaLabel = "Explore",
  className = "",
}: RevealCardProps) {
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tapped, setTapped] = useState(false);
  const open = hover || focused || tapped;
  const panelId = useId();

  return (
    // onMouseEnter/Leave and onFocus/Blur live on the *container*, not just
    // the trigger button: React's onFocus/onBlur bubble like native
    // focusin/focusout, so focus moving from the button to the revealed
    // panel's own "Explore" link (a sibling, not a descendant, of the button)
    // still counts as "still inside this card" and keeps it open. Putting
    // these handlers on the button alone closes the panel the instant focus
    // leaves it, making the Explore link inside unreachable by keyboard -
    // caught by testing the actual keyboard path, not just hover.
    <div
      className={`group/reveal relative overflow-hidden border border-line ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setTapped((t) => !t)}
        className="block w-full text-left focus:outline-none"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width ?? 1200}
              height={image.height ?? 1500}
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              className="h-full w-full object-cover transition-transform duration-(--duration-reveal) ease-(--ease-signal) group-hover/reveal:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center font-mono text-meta-sm tracking-nav text-paper-dim uppercase">
              Imagery pending
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="font-(family-name:--font-display) text-xl leading-tight font-normal text-balance">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-paper-dim text-pretty">{summary}</p>
        </div>
      </button>

      {/* The revealed technical panel: a sibling of the trigger, never nested
          inside it. inset(100% 0 0 0) -> inset(0 0 0 0) is the "rising sheet"
          motion. `aria-hidden` (not `inert` - see the component doc comment)
          keeps it out of assistive tech while closed; its own links carry
          `tabIndex={-1}` while closed via `focusable={open}` below. */}
      <div
        id={panelId}
        aria-hidden={!open}
        className="on-paper absolute inset-0 flex flex-col p-5 transition-[clip-path] duration-(--duration-reveal) ease-(--ease-signal)"
        style={{ clipPath: open ? "inset(0 0 0 0)" : "inset(100% 0 0 0)" }}
      >
        <h3 className="font-(family-name:--font-display) text-xl leading-tight font-normal text-balance">
          {title}
        </h3>
        <div className="mt-1 border-t border-line" />

        {technical.length > 0 ? (
          <dl className="mt-4 space-y-3">
            {technical.map((attr) => (
              <div key={attr.label}>
                <dt className="font-mono text-meta-sm font-semibold tracking-nav uppercase">
                  {attr.label}
                </dt>
                <dd className="mt-0.5 text-base leading-tight">{attr.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="mt-4 font-mono text-meta-sm tracking-nav text-paper-dim uppercase">
            Technical detail pending
          </p>
        )}

        {related && related.length > 0 ? (
          <div className="mt-auto pt-4">
            <RelationshipList label={relatedLabel} items={related} focusable={open} />
          </div>
        ) : null}

        {href ? (
          <Link
            href={href}
            tabIndex={open ? undefined : -1}
            className="mt-4 inline-flex items-center gap-2 font-mono text-meta tracking-nav text-signal uppercase transition-colors duration-(--duration-fast) hover:text-signal-bright"
          >
            {ctaLabel}
            <span aria-hidden>&#8594;</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
