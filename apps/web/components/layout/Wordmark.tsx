import Image from "next/image";
import Link from "next/link";

/**
 * REAL MARK (2026-09-18). The redrawn swept-wing SVG placeholder is gone,
 * replaced with Nabhastra's actual logo, supplied by Praneeth from
 * `project/asset-library/images/A0254__transparent-logo-1.png` and copied to
 * `public/media/nabhastra-mark.png`.
 *
 * The earlier note in this file said the only available logo "carries a grey
 * gradient background and an outlined wordmark that is barely legible". That
 * was true of the file it was looking at, and it is NOT true of these two:
 * both were checked pixel by pixel and are genuinely transparent (the mark is
 * 75% fully transparent, the full lockup 80%). The mark is a clean cutout and
 * needs no treatment on either surface.
 *
 * WHY THE MARK AND NOT THE FULL LOCKUP. `A0255__transparent-logo-full.png` is
 * also real and also transparent, but its wordmark is drawn as OUTLINED
 * letterforms in the same green as the mark. At header size those hairlines
 * either disappear into a black bar or fringe when scaled, and they cannot be
 * recoloured, tracked or made to sit on the mono/grotesk type ramp the rest of
 * the site runs on. So the mark carries the brand and the word is set in type,
 * which is also what the reference header does. The full lockup is kept in
 * `public/media/nabhastra-logo-full.png` for places that want the supplied
 * artwork whole - a share image, a print sheet, a partner deck.
 *
 * `priority` because this sits in the header on every route and is inside the
 * LCP viewport on all of them.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Nabhastra, home"
    >
      <Image
        src="/media/nabhastra-mark.png"
        alt=""
        aria-hidden
        width={400}
        height={400}
        priority
        className="h-7 w-7 shrink-0 object-contain transition-opacity duration-(--duration-fast) group-hover:opacity-80"
      />
      <span className="font-(family-name:--font-display) text-lg font-semibold tracking-[0.02em]">
        NABHASTRA
      </span>
    </Link>
  );
}
