import Image from "next/image";
import Link from "next/link";
import { getHeadlineSpecs, getPrimarySpecVersion, specContextLabel } from "@/lib/spec";
import type { Product } from "@/content/types";

/**
 * The only place `Media.isPlaceholder` reaches the UI (added 2026-09-19,
 * draft-review pass). A stock photo standing in for a real product shot
 * needs to read as temporary to whoever's reviewing the draft, not just in
 * a code comment - same "isolate uncertainty in the UI, not just the
 * comment" principle `StatusBadge` already applies to content status. Sits
 * above BOTH card layers (z-20) since the photo it's calling out is hidden
 * behind the text panel until hover - a reviewer shouldn't have to hover to
 * find out an image is a placeholder.
 */
function PlaceholderBadge() {
  return (
    <span className="absolute right-3 top-3 z-20 bg-ink/80 px-2 py-1 font-mono text-meta-sm tracking-nav text-paper uppercase">
      Placeholder image
    </span>
  );
}

/**
 * The dossier card. Hover mechanic replaced 2026-09-19 with the one measured
 * directly off shield.ai's own live site (`.peek-block`, inspected via its
 * computed styles, not guessed from a screen recording): a full-bleed photo
 * sits behind an opaque panel that fully covers it at rest; on hover, the
 * panel slides straight up and OUT of the card (`translateY(-100%)`) while
 * the photo beneath it scales from 1.0 to 1.1 - both over the same
 * `0.5s cubic-bezier(0.25, 1, 0.5, 1)`, confirmed from shield.ai's own
 * transition property. On mouse-leave the panel slides back down over the
 * photo, image scale returns to 1.0.
 *
 * This replaces the previous "wake in place" hover (aircraft lifted slightly,
 * spec values brightened, a CTA faded in, everything staying visible at
 * once). That design is superseded, on request, by shield.ai's actual
 * mechanic: the panel doesn't just intensify, it leaves entirely, so hovering
 * shows the photograph and nothing else - the specs, tagline and CTA are all
 * inside the panel that slides away, exactly like shield.ai's logo/copy/link
 * block disappearing to reveal its photo.
 *
 * The "recessed ink well" treatment for imageless products (DESIGN.md §5.1)
 * still applies when there's no photo to reveal - the well replaces the
 * photo layer entirely rather than trying to slide away a caption over
 * nothing.
 */
export function SystemCard({ product }: { product: Product }) {
  const specs = getHeadlineSpecs(product, 3);
  const primary = getPrimarySpecVersion(product);
  const context = primary ? specContextLabel(primary) : undefined;
  const image = product.media.find((m) => m.type === "image");

  return (
    <Link
      href={`/systems/${product.id}`}
      className="group relative block h-full overflow-hidden border border-line focus:outline-none transition-colors duration-(--duration-reveal) ease-(--ease-signal) hover:border-signal focus-visible:border-signal"
      aria-label={`${product.name} — ${product.tagline ?? "system"}`}
    >
      {image?.isPlaceholder ? <PlaceholderBadge /> : null}

      {/* --- The photo, full-bleed behind the panel -------------------- */}
      <div className="absolute inset-0 bg-ink">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width ?? 1536}
            height={image.height ?? 1024}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="h-full w-full scale-100 object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 group-focus-visible:scale-110"
          />
        ) : (
          /* Honest empty state. No borrowed airframe from another product. */
          <div className="flex h-full min-h-40 items-center justify-center px-6 text-center font-mono text-meta-sm tracking-nav text-paper-dim uppercase">
            Imagery pending
          </div>
        )}
      </div>

      {/* --- The panel: covers the photo at rest, slides away on hover - */}
      <div className="on-paper relative flex h-full flex-col p-6 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full">
        {/* --- Identification ------------------------------------------- */}
        <header>
          <h3 className="font-(family-name:--font-display) text-3xl leading-none font-semibold tracking-[-0.02em]">
            {product.name}
          </h3>
          {product.tagline ? (
            <p className="mt-2 font-mono text-meta-sm tracking-nav text-paper-dim uppercase">
              {product.tagline}
            </p>
          ) : null}
        </header>

        {/* --- Headline figures ----------------------------------------- */}
        <dl className="mt-6 flex-1">
          {specs.map((spec) => (
            <div key={spec.label} className="border-t border-line py-2.5">
              <dt className="font-mono text-meta-sm font-semibold tracking-nav uppercase">
                {spec.label}
              </dt>
              <dd className="mt-0.5 text-lg leading-tight text-paper-dim">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>

        {context ? (
          // Lower-weight than a moment ago: `context` repeats near-verbatim
          // on nearly every card (most products share "provisional" status),
          // and at full text-paper-dim opacity it read as noise competing
          // with the actual spec values above it rather than a quiet footnote.
          <p className="mt-1 font-mono text-meta-sm tracking-meta text-paper-dim uppercase opacity-50">
            {context}
          </p>
        ) : null}

        {/* --- Call to action --------------------------------------------- */}
        <p
          aria-hidden
          className="mt-4 flex items-center gap-2 border-t border-line pt-3 font-mono text-meta tracking-nav uppercase"
        >
          Explore system
          <span>&#8594;</span>
        </p>
      </div>
    </Link>
  );
}
