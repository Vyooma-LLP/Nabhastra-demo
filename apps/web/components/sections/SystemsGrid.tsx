import { SectionLabel } from "@/components/ui/SectionLabel";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { TechnicalButton } from "@/components/ui/TechnicalButton";
import { SystemCard } from "@/components/content/SystemCard";
import { demoProducts } from "@/content/demo/products";

/**
 * AIRCRAFT -> SYSTEM. Step two of the inspection sequence.
 *
 * Deliberately not the three-column SaaS card grid that Master Spec §7 forbids
 * and that the Phase 2 placeholder shipped: these are portrait dossiers on an
 * asymmetric editorial grid, and the row is intentionally not full-width.
 */
export function SystemsGrid() {
  return (
    <section
      id="systems"
      className="border-b border-line py-(--spacing-section-sm) lg:py-(--spacing-section)"
    >
      <div className="mx-auto max-w-(--container-editorial) px-6">
        <div className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,5fr)] lg:items-end">
          <div>
            <SectionLabel index="01">Systems</SectionLabel>
            <EditorialHeading level="lg" className="mt-5 max-w-[18ch]">
              Platforms built around the mission, not the airframe.
            </EditorialHeading>
          </div>
          <p className="max-w-[52ch] text-lg leading-relaxed text-paper-dim text-pretty lg:pb-2">
            Each platform is a system: an airframe, the sensing it carries, the
            control stack that flies it, and the mission it was shaped for. Open
            one to see how those parts connect.
          </p>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {demoProducts.map((product) => (
            <li key={product.id}>
              <SystemCard product={product} />
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <TechnicalButton href="/systems">All systems</TechnicalButton>
        </div>
      </div>
    </section>
  );
}
