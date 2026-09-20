import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { SystemsGrid } from "@/components/sections/SystemsGrid";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { ProofStackSpread } from "@/components/sections/ProofStackSpread";
import { CTASection } from "@/components/sections/CTASection";

/**
 * Homepage spine is the inspection sequence, not an arbitrary section list:
 *
 *   WORLD -> AIRCRAFT -> SYSTEM -> TECHNOLOGY -> PROOF -> CONTACT
 *
 * The Mission step was removed (2026-09-12, explicit direction) along with
 * the rest of the Missions content model - see lib/graph.ts and
 * project/PRODUCT.md. See project/DESIGN.md §2 for the original sequence.
 * Each section is indexed (01-04) so the sequence is felt while scrolling,
 * not just implied by source order.
 *
 * TECHNOLOGY step presentation (2026-09-18): the sequence is unchanged, but
 * step 03 is now a `SplitFeature` statement rather than a capped copy of the
 * `/technology` capability list. The reference uses that split shape three
 * separate times (see SplitFeature's doc comment) and never uses the homepage
 * to preview a list it will show in full one click later. The capability list
 * still exists, in one place, on `/technology`.
 */
export default function HomePage() {
  return (
    <SiteHeader>
      <main>
        <Hero />
        <SystemsGrid />
        <SplitFeature
          index="02"
          label="Technology"
          heading="What the aircraft can do is decided on the ground."
          image={{
            // PROVISIONAL MAPPING - flagged for Praneeth in the 2026-09-18
            // decision record. Chosen because this step is about sensing and
            // the control stack, and Drishti is the sensing platform, so it is
            // an argued mapping rather than the first available render. Swap it
            // if a better technology-specific frame exists.
            src: "/media/drishti-sensor-platform.png",
            alt: "Drishti sensor platform, the sensing hardware developed in the Nabhastra stack",
          }}
          action={{ href: "/technology", label: "See the technology" }}
        >
          Control, sensing and communications are developed as a stack rather
          than bought as parts. That is what makes a platform repairable at unit
          level and reconfigurable between roles.
        </SplitFeature>

        {/* PROOF, on the homepage, rendered by the 21st.dev `stack-spread`
            component (2026-09-18, explicit direction). It was previously capped
            to a single teaser item by the 2026-09-09 audit, which was right when
            the record held two items; it now holds eleven photographs and they
            all belong here. See ProofStackSpread. */}
        <ProofStackSpread />
        <CTASection />
      </main>
      <SiteFooter />
    </SiteHeader>
  );
}
