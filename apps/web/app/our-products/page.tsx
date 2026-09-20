import type { Metadata } from "next";
import type { ComponentType, SVGProps } from "react";
import { Radar, Sprout, Map as MapIcon, LifeBuoy } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { TechnicalButton } from "@/components/ui/TechnicalButton";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { SystemCard } from "@/components/content/SystemCard";
import { productFamilies } from "@/content/demo/productFamilies";
import { demoApplications } from "@/content/demo/applications";
import { getProductById } from "@/content/demo/products";

/**
 * Keyed by `Application.id` (content/demo/applications.ts) rather than by
 * index, so reordering or adding an application can't silently shift the
 * icons onto the wrong domains. An unmapped id renders no icon rather than a
 * wrong one.
 */
const APPLICATION_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "security-surveillance": Radar,
  agriculture: Sprout,
  "mapping-infrastructure": MapIcon,
  "disaster-management": LifeBuoy,
};

export const metadata: Metadata = {
  title: "Products",
  description:
    "Nabhastra's product catalog: kamikaze/racer, surveillance, logistic, VTOL/fixed-wing and agricultural drone families.",
};

/**
 * The catalog/discovery layer, distinct from `/systems` (the engineering
 * dossier layer) - see project/DECISIONS/2026-09-12-products-section-
 * handoff-for-chatgpt.md and its reply for why these are two different
 * lenses over the same `demoProducts` records rather than duplicate IA.
 *
 * Structure matches the live site's actual `/our-products` page (confirmed
 * from `research/references/legacy-site-content/navigation-menu.md` and
 * `page-our-products.md`): five product families, each a group of tiles
 * rather than one flat grid. Each tile is the same `SystemCard` used on
 * `/systems` and links into that product's engineering dossier - the
 * families page doesn't duplicate specifications, it discovers into them.
 *
 * Applications is presentation copy, not a graph entity - see the
 * `Application` type doc comment in content/types.ts for why the old
 * Missions model isn't back in a different shape.
 */
export default function OurProductsPage() {
  return (
    <SiteHeader>
      <main>
        <section className="border-b border-line py-(--spacing-section-sm)">
          <div className="mx-auto max-w-(--container-editorial) px-6">
            <SectionLabel>Products</SectionLabel>
            <EditorialHeading as="h1" level="xl" className="mt-5 max-w-[20ch]">
              What Nabhastra offers, by family.
            </EditorialHeading>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-paper-dim text-pretty">
              Five product families, organized the way the catalog actually
              ships. Open any platform to see its full engineering dossier on{" "}
              <span className="text-paper">Systems</span>.
            </p>
          </div>
        </section>

        {productFamilies.map((family, i) => {
          const products = family.productIds
            .map((id) => getProductById(id))
            .filter((p): p is NonNullable<typeof p> => Boolean(p));
          if (!products.length) return null;

          return (
            <section
              key={family.id}
              id={family.id}
              className="scroll-mt-20 border-b border-line py-(--spacing-section-sm)"
            >
              <div className="mx-auto max-w-(--container-editorial) px-6">
                <SectionLabel index={String(i + 1).padStart(2, "0")}>
                  {family.name}
                </SectionLabel>
                <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-paper-dim text-pretty">
                  {family.description}
                </p>

                {/* A family with 1-3 products used to keep `lg:grid-cols-4`
                    regardless of count: capping only the list's max-width
                    (an earlier pass here) still divided that narrower width
                    into 4 equal tracks, crushing a lone card into a sliver.
                    Both the column COUNT and the max-width need to match the
                    actual item count, or a 4-column grid with 1-3 populated
                    tracks either stretches into dead space or squeezes into
                    slivers. */}
                <ul
                  className={`mt-10 grid gap-6 sm:grid-cols-2 ${
                    {
                      1: "lg:max-w-xs lg:grid-cols-1",
                      2: "lg:max-w-2xl lg:grid-cols-2",
                      3: "lg:max-w-5xl lg:grid-cols-3",
                    }[products.length as 1 | 2 | 3] ?? "lg:grid-cols-4"
                  }`}
                >
                  {products.map((product) => (
                    <li key={product.id}>
                      <SystemCard product={product} />
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}

        <section className="on-paper border-b border-line py-(--spacing-section-sm)">
          <div className="mx-auto max-w-(--container-editorial) px-6">
            <SectionLabel index={String(productFamilies.length + 1).padStart(2, "0")}>
              Applications
            </SectionLabel>
            <p className="mt-5 max-w-[60ch] text-lg leading-relaxed opacity-80 text-pretty">
              The operational problems these families are built to serve.
            </p>
            <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {demoApplications.map((application) => (
                <div
                  key={application.id}
                  id={application.id}
                  className="scroll-mt-20 border-t border-line pt-4"
                >
                  <dt className="flex items-center gap-3 font-(family-name:--font-display) text-xl font-normal">
                    {(() => {
                      // Icon per domain - the section was four identical text
                      // blocks, indistinguishable from every other list on the
                      // site despite being the page's closing summary.
                      const Icon = APPLICATION_ICONS[application.id];
                      return Icon ? (
                        <Icon aria-hidden className="size-5 shrink-0 text-signal" />
                      ) : null;
                    })()}
                    {application.name}
                  </dt>
                  <dd className="mt-2 text-base leading-relaxed opacity-80 text-pretty">
                    {application.summary}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Agriculture, expanded. One application gets a full-bleed statement
            rather than a definition-list row, because spray work is the one
            domain where the operational picture (what the aircraft is actually
            doing over a field) explains the product better than a spec line.

            IMAGE CAVEAT, flagged for Praneeth in the 2026-09-18 asset note: the
            frame below is the supplied `agri drone spraying.webp`. It shows a
            spray platform in operation, but it is NOT a Nabhastra airframe -
            the aircraft in it is a third-party agricultural multirotor. The alt
            text therefore describes a spray drone generically and never names
            it as ours. Nabhastra's own `gajraj-field-photo.webp` would satisfy
            this project's "no borrowed airframe from another product" rule
            (see SystemCard's empty state) and is a one-line swap here. */}
        <SplitFeature
          index={String(productFamilies.length + 2).padStart(2, "0")}
          label="Agriculture"
          heading="Coverage is the unit that matters over a field."
          image={{
            src: "/media/agri-drone-spraying.webp",
            alt: "An agricultural spray drone in flight low over a green cereal crop, releasing two fine mist plumes from its boom nozzles.",
            width: 1200,
            height: 600,
          }}
          action={{ href: "/systems/gajraj", label: "View Gajraj" }}
        >
          Precision spray coverage and crop monitoring at scale. Gajraj is a
          three-SKU agricultural line whose variants differ by tank capacity and
          the coverage that follows from it, rather than by airframe.
        </SplitFeature>

        <section className="py-(--spacing-section-sm)">
          <div className="mx-auto max-w-(--container-editorial) px-6">
            <EditorialHeading level="md" className="max-w-[24ch]">
              Talk to Nabhastra about a product family.
            </EditorialHeading>
            <div className="mt-8">
              <TechnicalButton href="/contact" variant="signal">
                Contact Nabhastra
              </TechnicalButton>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </SiteHeader>
  );
}
