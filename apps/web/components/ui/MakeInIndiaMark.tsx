import Image from "next/image";

/**
 * The Make in India lion, supplied by Praneeth 2026-09-18 from
 * `project/asset-library/images/No bgr Make-in-India-logo-scaled.png` (the
 * transparent version; the other supplied file, `A0230__make-in-india.webp`,
 * is a smaller flattened copy of the same mark and is not used).
 *
 * DARK SURFACES ONLY, and this is a property of the artwork rather than a
 * preference. The lion is drawn as a dark gear-work fill inside a thick WHITE
 * keyline. On ink the keyline is what separates the mark from the page; on the
 * bone footer that keyline would vanish into the paper and the mark would read
 * as a smudge with a hole around it. So this is used on the ink sections and
 * deliberately not in the footer. If it is ever needed on paper, it needs a
 * different cut of the artwork, not a CSS filter.
 *
 * PLACED WHERE THE CLAIM IS, not everywhere. It appears twice: on `/company`,
 * beside the sentence that says Nabhastra is an Indian company building these
 * platforms, and in the homepage's closing contact block, where it sits with
 * the registered address. A credential mark earns its place next to the
 * assertion it supports; sprinkled into every section it becomes wallpaper and
 * stops being read at all.
 *
 * It is NOT a link and NOT a claim of certification by this project. It is the
 * national manufacturing initiative's mark shown alongside Nabhastra's own
 * stated indigenous-manufacture positioning (project/PRODUCT.md). The caption
 * is part of the component so the two never drift apart.
 */
export function MakeInIndiaMark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 border border-line py-3 pl-3 pr-5 ${className}`}>
      <Image
        src="/media/make-in-india.png"
        alt="Make in India"
        width={2560}
        height={1311}
        // h-16, not smaller: the lion is filled with fine gear-work, and below
        // roughly this height that detail collapses into a grey smudge inside
        // a white outline. Checked on screen at 44px, where it did exactly
        // that, before settling here.
        sizes="180px"
        className="h-16 w-auto shrink-0"
      />
      <p className="font-mono text-meta-sm tracking-nav text-paper-dim uppercase">
        Designed and built in India
      </p>
    </div>
  );
}
