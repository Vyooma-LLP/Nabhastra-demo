import type {
  ContentStatus,
  Product,
  SpecValue,
  SpecVersion,
} from "@/content/types";

/**
 * Helpers for reading the Product -> Variant -> SpecVersion hierarchy without
 * ever collapsing a conflict.
 *
 * The rule these encode: when several spec versions disagree, a *summary*
 * surface (a card, a hero figure) may show one of them, but it must say which
 * one it is showing. A *detail* surface shows all of them. Nothing anywhere
 * merges them into an average or a best guess.
 */

/** The version a summary surface should quote: current, and not superseded. */
export function getPrimarySpecVersion(
  product: Product,
): SpecVersion | undefined {
  const variant = product.variants[0];
  if (!variant) return undefined;

  const live = variant.specVersions.filter(
    (v) => v.status !== "deprecated" && !v.effectiveUntil,
  );

  return live[0] ?? variant.specVersions[0];
}

/** The two or three figures a dossier card leads with. */
export function getHeadlineSpecs(product: Product, count = 3): SpecValue[] {
  return getPrimarySpecVersion(product)?.values.slice(0, count) ?? [];
}

/**
 * Provenance as editorial metadata rather than a warning badge
 * (project/DESIGN.md §9). Verified content says nothing at all - the absence
 * of a caption is what "confirmed" looks like.
 */
export function specContextLabel(version: SpecVersion): string | undefined {
  if (version.effectiveUntil) {
    return `Legacy spec — superseded ${version.effectiveUntil}`;
  }

  const BY_STATUS: Record<ContentStatus, string | undefined> = {
    verified: undefined,
    provisional: "Current published spec — awaiting confirmation",
    conflicting: "One of several published specs",
    unknown: "Unconfirmed",
    deprecated: "Superseded",
  };

  return BY_STATUS[version.status];
}

/** How many distinct spec sheets exist for a product, across all variants. */
export function countSpecVersions(product: Product): number {
  return product.variants.reduce((n, v) => n + v.specVersions.length, 0);
}
