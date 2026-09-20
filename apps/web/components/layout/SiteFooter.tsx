import Link from "next/link";
import { MessageCircle } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { Wordmark } from "@/components/layout/Wordmark";
import { TechnicalButton } from "@/components/ui/TechnicalButton";

/**
 * Real accounts, confirmed live on nabhastra.co.in/contact (2026-09-19) -
 * not placeholders. WhatsApp carries a pre-filled greeting, matching the
 * legacy site's own `wa.me` link text exactly.
 *
 * Instagram/LinkedIn glyphs are hand-authored inline SVGs, not `lucide-react`
 * imports: brand marks were dropped from lucide's own icon set, and this
 * project has no other icon package installed. `MessageCircle` (a generic
 * chat bubble, not a WhatsApp-specific mark) stands in for WhatsApp for the
 * same reason.
 */
function InstagramGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.4 8.65 22 11 22 14.2V21h-4v-6c0-1.43-.03-3.27-2-3.27-2 0-2.3 1.56-2.3 3.17V21h-4V9Z" />
    </svg>
  );
}

const SOCIAL_LINKS: {
  name: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
  { name: "Instagram", href: "https://www.instagram.com/nabhastra/", icon: InstagramGlyph },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/nabhastra", icon: LinkedInGlyph },
  {
    name: "WhatsApp",
    href: "https://wa.me/919815968889?text=Hello%2C%20I%20reached%20out%20via%20the%20WhatsApp%20link%20on%20your%20website%20Nabhastra.co.in.%20Looking%20forward%20to%20connecting",
    icon: MessageCircle,
  },
];

/**
 * Rebuilt 2026-09-18 from `shield.ai components/footer section.png`, which
 * shows a footer doing four things this one was not:
 *
 *   1. IT FLIPS SURFACE. The whole page is black and the footer is bone. That
 *      is the single strongest gesture in the capture and the cheapest to
 *      miss: a dark footer under a dark page is a section, a bone footer is an
 *      ending. This project already owns the mechanism (`.on-paper`, see
 *      globals.css) and simply was not using it here.
 *   2. IT SETS LINKS AS TECHNICAL LABELS. Every column entry is mono,
 *      uppercase, tracked - not body-face sentence case. Column heads sit in
 *      full ink, entries sit dim and resolve to ink on hover.
 *   3. IT CARRIES THE ACTIONS, as a pair of bracketed buttons side by side.
 *      The ticks go dark here with no variant prop: `CornerFrame`'s paper tone
 *      resolves through `--color-paper`, which `.on-paper` flips to ink.
 *   4. IT SIGNS OFF WITH A GHOST. An oversized wordmark bleeds off the bottom
 *      edge in a barely-darker tint of the surface, clipped rather than
 *      shrunk. It is the last thing on the page and it is not a link, not a
 *      logo lockup, and not legible as a heading - it is a watermark.
 *
 * The ghost is `aria-hidden` and sized in `vw` so it always bleeds off both
 * sides regardless of viewport, and the container clips it. It must never
 * become a scroll surface, hence `overflow-hidden` on the footer rather than
 * a width guess on the text.
 */
const COLUMNS: { label: string; links: { name: string; href: string }[] }[] = [
  {
    label: "Systems",
    links: [
      { name: "Rudra", href: "/systems/rudra" },
      { name: "Drishti", href: "/systems/drishti" },
      { name: "Akshay", href: "/systems/akshay" },
      { name: "Gajraj", href: "/systems/gajraj" },
    ],
  },
  {
    label: "Company",
    links: [
      { name: "Products", href: "/our-products" },
      { name: "Technology", href: "/technology" },
      { name: "Company", href: "/company" },
      { name: "FAQs", href: "/faqs" },
    ],
  },
  {
    label: "Contact",
    links: [
      { name: "Request a briefing", href: "/contact" },
      { name: "nabhastra@gmail.com", href: "mailto:nabhastra@gmail.com" },
      { name: "+91 98159 68889", href: "tel:+919815968889" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="on-paper relative isolate overflow-hidden">
      <div className="mx-auto max-w-(--container-editorial) px-6 pt-20 pb-16">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* --- Identity, position, actions ----------------------------- */}
          <div>
            <Wordmark />

            <p className="mt-8 max-w-[34ch] text-base leading-relaxed text-paper-dim text-pretty">
              Indigenous aerial platforms, sensing and mission technology,
              engineered and built in India.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <TechnicalButton href="/contact">Request a briefing</TechnicalButton>
              <TechnicalButton href="/systems">Explore systems</TechnicalButton>
            </div>

            <ul className="mt-8 flex gap-4">
              {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="flex size-9 items-center justify-center border border-line text-paper-dim transition-colors duration-(--duration-fast) hover:border-signal hover:text-paper"
                  >
                    <Icon className="size-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* --- The index ----------------------------------------------- */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.label}>
                <p className="font-mono text-meta tracking-nav uppercase">{col.label}</p>
                <ul className="mt-6 flex flex-col gap-4">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-mono text-meta tracking-nav text-paper-dim uppercase transition-colors duration-(--duration-fast) hover:text-paper"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <p className="mt-20 font-mono text-meta-sm tracking-nav text-paper-dim uppercase">
          © {new Date().getFullYear()} Nabhastra Private Limited. All rights
          reserved.
        </p>
      </div>

      {/* --- The ghost --------------------------------------------------- */}
      <div className="mx-auto max-w-(--container-editorial) px-6">
        <GhostWordmark />
      </div>
    </footer>
  );
}

/**
 * The oversized wordmark that signs off the page: set to the editorial column
 * exactly, and clipped only along the bottom.
 *
 * Done as SVG geometry rather than a `vw` font-size because a `vw` size cannot
 * land on a container width - it is a guess against the viewport, and at 22vw
 * it overflowed and cut the N and the final A off the sides.
 *
 * ALIGNED TO THE COLUMN, NOT BLED TO THE VIEWPORT (2026-09-18, second pass).
 * The reference runs its own ghost the full width of the page - measured, its
 * ink starts 1px from the left edge and ends 1px from the right. Copied
 * literally, that fails here for a reason specific to this word: "NABHASTRA"
 * ends in an A, whose widest point is its base, so the bottom clip cuts the
 * final glyph exactly at the corner of the viewport and the whole thing reads
 * as a rendering bug rather than a watermark. "Shield AI®" has no such letter
 * in that position. So the ghost sits in the same editorial column as
 * everything above it instead: its N lines up with the footer wordmark, its
 * final A with the last link column, and nothing touches a viewport edge. The
 * gesture survives, the accident does not.
 *
 * The numbers come from measuring the real face (Hanken Grotesk 600) rather
 * than eyeballing:
 *
 *   width / font-size = 5.4541     cap-height / font-size = 0.7110
 *
 * So for a 1000-unit-wide viewBox the font-size is 1000 / 5.4541 = 183.4 and
 * the baseline sits at 183.4 x 0.711 = 130.4. `textLength` pins the advance to
 * exactly 1000 units and `lengthAdjust="spacing"` absorbs the difference in
 * tracking rather than distorting the glyphs, so it stays exact even if the
 * font is swapped or falls back.
 *
 * The viewBox is 107 units tall against a 130.4-unit cap, so the bottom ~18% of
 * the letterforms falls outside it and is clipped by SVG itself. No overflow
 * trickery, no negative offsets, nothing to drift. 18% rather than the earlier
 * 23%: enough that the word still runs off the bottom of the page, little
 * enough that every letter stays unmistakably whole.
 */
function GhostWordmark() {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 1000 107"
      preserveAspectRatio="xMidYMin meet"
      className="pointer-events-none block w-full text-surface-paper-dim select-none"
    >
      <text
        x="0"
        y="130.4"
        textLength="1000"
        lengthAdjust="spacing"
        fill="currentColor"
        fontSize="183.4"
        fontWeight="600"
        // Not a `fontFamily` attribute: presentation attributes do not resolve
        // `var()`, so the token has to arrive through CSS.
        className="font-(family-name:--font-display)"
      >
        NABHASTRA
      </text>
    </svg>
  );
}
