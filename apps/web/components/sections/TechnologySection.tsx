import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { TechnicalButton } from "@/components/ui/TechnicalButton";
import { demoTechnologies } from "@/content/demo/technologies";
import { getSystemsUsingTechnology } from "@/lib/graph";

/**
 * SYSTEM -> TECHNOLOGY. Step three, in full, on `/technology`.
 *
 * This is the graph made walkable rather than drawn: each capability names the
 * platforms that carry it, derived from the edges in content/demo/products.ts
 * rather than hand-listed, so it cannot fall out of sync with the data.
 *
 * The `mode` prop is gone (2026-09-18). It existed to fix a real duplication
 * bug found in the 2026-09-09 audit - this list rendered verbatim on both the
 * homepage and `/technology` - by capping the homepage copy to three rows. The
 * homepage now carries a `SplitFeature` statement instead of a shortened list,
 * which removes the duplication at its source rather than trimming it. One
 * rendering of this list survives, so there is no longer a mode to choose
 * between. See app/page.tsx.
 */
export function TechnologySection() {
  const technologies = demoTechnologies;

  return (
    <section
      id="technology"
      className="border-b border-line py-(--spacing-section-sm) lg:py-(--spacing-section)"
    >
      <div className="mx-auto max-w-(--container-editorial) px-6">
        <div className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,5fr)] lg:items-end">
          <div>
            <SectionLabel>Technology</SectionLabel>
            <EditorialHeading level="lg" className="mt-5 max-w-[18ch]">
              What the aircraft can do is decided on the ground.
            </EditorialHeading>
          </div>
          <p className="max-w-[52ch] text-lg leading-relaxed text-paper-dim text-pretty lg:pb-2">
            Control, sensing and communications are developed as a stack rather
            than bought as parts. That is what makes a platform repairable at
            unit level and reconfigurable between roles.
          </p>
        </div>

        <ul className="border-t border-line">
          {technologies.map((tech) => {
            const systems = getSystemsUsingTechnology(tech.id);
            return (
              <li key={tech.id} id={tech.id} className="border-b border-line">
                <div className="grid gap-4 py-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,5fr)_minmax(0,2fr)] lg:gap-10">
                  <h3 className="font-(family-name:--font-display) text-xl leading-tight font-normal text-balance">
                    {tech.name}
                  </h3>

                  <p className="text-base leading-relaxed text-paper-dim text-pretty">
                    {tech.summary}
                  </p>

                  <div className="flex flex-wrap content-start gap-x-4 gap-y-1">
                    <span className="w-full font-mono text-meta-sm tracking-nav text-paper-dim uppercase">
                      Carried by
                    </span>
                    {systems.length > 0 ? (
                      systems.map((system) => (
                        <Link
                          key={system.id}
                          href={`/systems/${system.id}`}
                          data-rel={system.id}
                          className="font-mono text-meta tracking-nav uppercase transition-colors duration-(--duration-fast) hover:text-brand"
                        >
                          {system.name}
                        </Link>
                      ))
                    ) : (
                      // Not a bug: a capability can be real and documented
                      // before any published system references it yet
                      // (e.g. indigenous avionics). An empty "Carried by"
                      // row with nothing after it read as a missing-data
                      // glitch rather than this deliberately honest state.
                      <span className="font-mono text-meta tracking-nav text-paper-dim uppercase opacity-60">
                        Not yet linked to a published system
                      </span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-12">
          <TechnicalButton href="/systems">Explore systems</TechnicalButton>
        </div>
      </div>
    </section>
  );
}
