import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { TechnicalButton } from "@/components/ui/TechnicalButton";
import { demoProof } from "@/content/demo/proof";

/**
 * TECHNOLOGY -> PROOF. Step four.
 *
 * A light surface, per project/DESIGN.md §3.3 - evidence is the record, and
 * the record is paper. Renders by evidence density, not by taxonomy
 * (project/DECISIONS/2026-09-09-visual-system-implementation.md §8): only
 * populated categories appear, and in "full" mode a quiet line closes out what
 * is still being validated. No empty shelves, no padding.
 *
 * `mode` fixes a duplication bug found in the 2026-09-09 fidelity audit: this
 * component previously rendered verbatim, in full, on both the homepage and
 * `/company`. "teaser" now shows one highlight and points to the full evidence
 * page; "full" (the /company page itself) shows everything.
 */
export function ProofSection({
  mode = "full",
  index,
}: {
  mode?: "teaser" | "full";
  index?: string;
}) {
  const items = mode === "teaser" ? demoProof.slice(0, 1) : demoProof;

  return (
    <section
      id="proof"
      className="on-paper border-b border-line py-(--spacing-section-sm) lg:py-(--spacing-section)"
    >
      <div className="mx-auto max-w-(--container-editorial) px-6">
        {index ? <SectionLabel index={index}>Proof</SectionLabel> : null}
        <EditorialHeading level="lg" className="mt-5 max-w-[20ch]">
          What we can currently show, and only that.
        </EditorialHeading>

        <ul
          className={`mt-12 grid gap-px border border-line bg-line ${
            mode === "full" ? "sm:grid-cols-2" : "sm:grid-cols-1"
          }`}
        >
          {items.map((item, i) => (
            <li
              key={item.id}
              className={`on-paper flex flex-col gap-4 p-8 ${
                // An odd item count leaves the final row's second cell
                // unoccupied - nothing paints there except the `<ul>`'s own
                // `bg-line`, showing through as a flat, seemingly-broken
                // rectangle beside the last card. Spanning the lone survivor
                // removes the empty cell instead of leaving it unexplained.
                mode === "full" && i === items.length - 1 && items.length % 2 === 1
                  ? "sm:col-span-2"
                  : ""
              }`}
            >
              {item.media ? (
                <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                  <Image
                    src={item.media.src}
                    alt={item.media.alt}
                    width={item.media.width ?? 1600}
                    height={item.media.height ?? 1200}
                    sizes="(min-width: 640px) 40vw, 90vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : null}

              <p className="font-mono text-meta-sm tracking-nav uppercase opacity-60">
                {CATEGORY_LABEL[item.category] ?? item.category}
              </p>
              <h3 className="font-(family-name:--font-display) text-xl font-normal">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed opacity-80 text-pretty">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>

        {mode === "full" ? (
          <p className="mt-8 max-w-[60ch] font-mono text-meta-sm tracking-nav uppercase opacity-60">
            Additional field validation, deployment history and certifications
            are currently being confirmed for publication.
          </p>
        ) : (
          <div className="mt-8">
            <TechnicalButton href="/company">
              See the full record
            </TechnicalButton>
          </div>
        )}
      </div>
    </section>
  );
}

const CATEGORY_LABEL: Record<string, string> = {
  "field-validation": "Field validation",
  institutional: "Institutional collaboration",
  deployment: "Deployment",
  "r-and-d": "R&D",
  customer: "Customer / partner",
  certification: "Certification / compliance",
};
