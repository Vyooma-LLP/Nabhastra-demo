import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StatusBadge } from "@/components/content/StatusBadge";
import { SpecTable } from "@/components/content/SpecTable";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { TechnicalButton } from "@/components/ui/TechnicalButton";
import { RelationshipList } from "@/components/ui/RelationshipList";
import { demoProducts, getProductById } from "@/content/demo/products";
import { getTechnologiesForSystem, getRelatedSystems } from "@/lib/graph";

// SSG: product content changes rarely, so each system page is built once
// at build time rather than rendered per-request.
export function generateStaticParams() {
  return demoProducts.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return {};

  return {
    title: `${product.name} — ${product.tagline ?? "System"}`,
    description: product.description,
    openGraph: {
      title: `${product.name} — Nabhastra`,
      description: product.description,
    },
  };
}

/**
 * The full Shield-AI-grammar product structure: identification, capabilities,
 * technology, specifications, evidence, relationship cluster, related
 * systems, contact. See project/DESIGN.md and the plan's Phase C for the
 * section order and its rationale.
 *
 * The relationship cluster is what turns this page into a graph node rather
 * than a leaf - every technology and related system listed is a live link,
 * derived from lib/graph.ts rather than hand-curated. The Mission section/
 * relationship (present here through 2026-09-11) was removed 2026-09-12
 * along with the rest of the Missions content model - see project/PRODUCT.md
 * and lib/graph.ts, which now derives "related systems" from shared
 * technology rather than shared mission.
 */
export default async function SystemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const technologies = getTechnologiesForSystem(product.id);
  const related = getRelatedSystems(product.id);
  const heroImage = product.media.find((m) => m.type === "image");
  const multipleSpecSheets =
    product.variants.reduce((n, v) => n + v.specVersions.length, 0) > 1;

  return (
    <SiteHeader>
      <main>
        {/* -------- Identification ------------------------------------- */}
        <section className="relative overflow-hidden border-b border-line">
          <div className="mx-auto grid max-w-(--container-editorial) items-center gap-12 px-6 py-(--spacing-section-sm) lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <p className="font-mono text-meta tracking-nav text-signal uppercase">
                  System
                </p>
                {product.contentStatus !== "verified" ? (
                  <>
                    <span aria-hidden className="text-paper-dim">
                      &middot;
                    </span>
                    <StatusBadge status={product.contentStatus} />
                  </>
                ) : null}
              </div>
              <EditorialHeading as="h1" level="xl">
                {product.name}
              </EditorialHeading>
              {product.tagline ? (
                <p className="mt-3 font-mono text-meta tracking-nav text-signal uppercase">
                  {product.tagline}
                </p>
              ) : null}
              <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-paper-dim text-pretty">
                {product.description}
              </p>
              <div className="mt-10">
                <TechnicalButton href="#specifications" variant="signal">
                  View specifications
                </TechnicalButton>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden bg-ink">
              {heroImage?.isPlaceholder ? (
                <span className="absolute right-3 top-3 z-10 bg-ink/80 px-2 py-1 font-mono text-meta-sm tracking-nav text-paper uppercase">
                  Placeholder image
                </span>
              ) : null}
              {heroImage ? (
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  width={heroImage.width ?? 1536}
                  height={heroImage.height ?? 1024}
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-full w-full object-cover"
                />
              ) : null}

              {/* Scrim: the render's hard rectangular edge sat directly on the
                  ink page, which read as a pasted-in box rather than a
                  dossier plate. A short inward fade on the outer edges ties
                  it to the surface without dimming the aircraft itself. */}
              {heroImage ? (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to right, var(--color-ink) 0%, transparent 12%, transparent 88%, var(--color-ink) 100%), linear-gradient(to bottom, var(--color-ink) 0%, transparent 10%, transparent 90%, var(--color-ink) 100%)",
                    opacity: 0.55,
                  }}
                />
              ) : (
                <div className="flex h-full items-center justify-center px-6 text-center font-mono text-meta tracking-nav text-paper-dim uppercase">
                  Imagery pending
                </div>
              )}
            </div>
          </div>
        </section>

        {/* -------- Specifications ---------------------------------------- */}
        <section id="specifications" className="border-b border-line py-(--spacing-section-sm)">
          <div className="mx-auto max-w-(--container-editorial) px-6">
            <SectionLabel index="01">Specifications</SectionLabel>

            {multipleSpecSheets ? (
              <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-paper-dim">
                More than one spec sheet exists for {product.name} in the
                published record, and they disagree. Each is shown below as it
                was published rather than merged into a single best guess.
              </p>
            ) : null}

            <div className="mt-10 space-y-12">
              {product.variants.map((variant) => (
                <div key={variant.id}>
                  {product.variants.length > 1 ? (
                    <h3 className="mb-4 font-(family-name:--font-display) text-xl font-normal">
                      {variant.name}
                    </h3>
                  ) : null}
                  <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                    {variant.specVersions.map((sv) => (
                      <SpecTable key={sv.id} specVersion={sv} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -------- Relationship cluster ----------------------------------- */}
        <section className="border-b border-line py-(--spacing-section-sm)">
          <div className="mx-auto max-w-(--container-editorial) px-6">
            <SectionLabel index="02">Connected systems</SectionLabel>
            <div className="mt-8 grid gap-10 lg:grid-cols-2">
              <RelationshipList
                label="Technology"
                items={technologies.map((t) => ({
                  id: t.id,
                  name: t.name,
                  href: `/technology#${t.id}`,
                }))}
                emptyNote="No technology capabilities recorded yet."
              />
              <RelationshipList
                label="Related systems"
                items={related.map((r) => ({
                  id: r.id,
                  name: r.name,
                  href: `/systems/${r.id}`,
                  note: r.tagline,
                }))}
                emptyNote="No related systems sharing this technology yet."
              />
            </div>
          </div>
        </section>

        {/* -------- Evidence ------------------------------------------------ */}
        <section className="on-paper py-(--spacing-section-sm)">
          <div className="mx-auto max-w-(--container-editorial) px-6">
            <SectionLabel index="03">Evidence</SectionLabel>
            <ul className="mt-8 space-y-3 border-t border-line pt-6">
              {product.evidence.map((e, i) => (
                <li key={i} className="font-mono text-meta-sm leading-relaxed opacity-70">
                  <span className="underline decoration-line">{e.source}</span>
                  {e.note ? ` — ${e.note}` : ""} · captured {e.capturedAt}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[60ch] text-sm leading-relaxed opacity-70">
              No customer testimonials are shown for this system. The legacy
              site&apos;s three testimonials are reused verbatim across
              multiple unrelated pages and are unverified — see
              project/PRODUCT.md §4. They will not render here until the
              client confirms authenticity.
            </p>
          </div>
        </section>

        {/* -------- Contact ------------------------------------------------ */}
        <section className="border-t border-line py-(--spacing-section-sm)">
          <div className="mx-auto max-w-(--container-editorial) px-6">
            <EditorialHeading level="md">
              Request a briefing on {product.name}.
            </EditorialHeading>
            <div className="mt-8">
              <TechnicalButton
                href={`mailto:nabhastra@gmail.com?subject=${encodeURIComponent(
                  `Briefing request — ${product.name}`,
                )}`}
                variant="signal"
              >
                Request a briefing
              </TechnicalButton>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </SiteHeader>
  );
}
