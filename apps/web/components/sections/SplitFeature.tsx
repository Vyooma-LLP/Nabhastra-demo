import Image from "next/image";
import type { ReactNode } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { TechnicalButton } from "@/components/ui/TechnicalButton";

/**
 * Added 2026-09-18. The reference's single most repeated section shape, captured
 * three times in `shield.ai components/` - `visual explanation from image.png`
 * (Mission Autonomy), `visual explanation 2.png` (Change the Way You See the
 * Battlefield) and `visual explanation 3.png` (Turn Manual Search into
 * Autonomous Perception). Three captures of one grammar is the strongest signal
 * in the whole folder, and this project had no equivalent: every section here
 * was a centred editorial column with a full-width list under it.
 *
 * The measured rules, in the order they matter:
 *
 *   FULL BLEED, HALF AND HALF. The media runs to the viewport edge and takes
 *   exactly half the width. It is never inset into the editorial container and
 *   never given a caption, border or radius - the image IS the column.
 *
 *   THE TEXT HALF IS MOSTLY EMPTY. In all three captures the copy occupies
 *   roughly the middle third of its half, vertically centred, with the rest
 *   deliberately void. This is the "stylish space wasting" the brief names, and
 *   it is load-bearing: the emptiness is what makes a two-sentence paragraph
 *   read as a considered statement rather than a card blurb.
 *
 *   THE MEASURE IS SHORT. Headline wraps at ~22 characters, body at ~62. Both
 *   are set well inside the half rather than filling it.
 *
 *   IT ALTERNATES. Capture 2 puts the text left, capture 3 puts it right. The
 *   `reverse` prop is what keeps a run of these from reading as a template.
 *
 * Media is required rather than optional on purpose: a split feature with an
 * empty half is not this component with a missing prop, it is a different and
 * worse layout. Sections without imagery should stay editorial.
 */
export function SplitFeature({
  label,
  index,
  heading,
  children,
  image,
  action,
  reverse = false,
}: {
  label: string;
  index?: string;
  heading: ReactNode;
  children: ReactNode;
  image: { src: string; alt: string; width?: number; height?: number };
  action?: { href: string; label: string };
  reverse?: boolean;
}) {
  return (
    <section className="border-b border-line">
      <div className="grid lg:grid-cols-2">
        {/* --- The statement -------------------------------------------- */}
        <div
          className={`flex flex-col justify-center px-6 py-(--spacing-section-sm) lg:px-16 lg:py-(--spacing-void) xl:px-24 ${
            reverse ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div className="mx-auto w-full max-w-[34rem]">
            <SectionLabel index={index}>{label}</SectionLabel>

            <EditorialHeading level="lg" className="mt-8 max-w-[22ch]">
              {heading}
            </EditorialHeading>

            <div className="mt-8 max-w-[62ch] text-lg leading-relaxed text-paper-dim text-pretty">
              {children}
            </div>

            {action ? (
              <div className="mt-12">
                <TechnicalButton href={action.href}>{action.label}</TechnicalButton>
              </div>
            ) : null}
          </div>
        </div>

        {/* --- The evidence --------------------------------------------- */}
        {/* `min-h` rather than an aspect ratio: the half must match the text
            column's height on wide viewports and stay a readable band on
            narrow ones, and an aspect ratio can do neither. */}
        <div
          className={`relative min-h-[60vw] bg-ink lg:min-h-full ${
            reverse ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width ?? 1600}
            height={image.height ?? 1200}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
