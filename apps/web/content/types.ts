/**
 * Canonical content model for Nabhastra 2.0.
 *
 * This is the "quarantine boundary" for uncertainty: components read these
 * types and never know or care whether the data behind them is verified,
 * demo, or disputed. When the client answers an open question, only the
 * data in content/demo (or a future content/verified) changes - never a
 * component, never a page.
 *
 * See project/PRODUCT.md for the source facts and project/DECISIONS/ for
 * why specific products carry the status they do.
 */

/** How trustworthy a piece of content is, independent of what it says. */
export type ContentStatus =
  | "verified" // confirmed against a client-approved source
  | "provisional" // strong current evidence, awaiting client confirmation
  | "unknown" // no evidence either way - render as explicit placeholder
  | "conflicting" // two+ sources disagree - model both, do not silently pick one
  | "deprecated"; // superseded by a newer verified/provisional value

/** Where a product actually is in its real-world lifecycle. */
export type ProductLifecycleStatus =
  | "production"
  | "prototype"
  | "rd"
  | "concept"
  | "retired"
  | "unknown";

export interface Evidence {
  /** Where this fact came from - a repo-relative path or an external URL. */
  source: string;
  note?: string;
  /** ISO date this evidence was captured/observed, not when the fact became true. */
  capturedAt: string;
}

export interface SpecValue {
  label: string;
  /** Kept as a string - units and qualifiers (e.g. "≥", "one-way") vary too much to type strictly. */
  value: string;
}

/**
 * One version of a spec sheet for a variant. Conflicting sources (e.g. the
 * two different AKSHAY range/endurance/payload numbers) become two
 * SpecVersion entries, not a merged "best guess" - see the `conflicting`
 * ContentStatus.
 */
export interface SpecVersion {
  id: string;
  values: SpecValue[];
  /** ISO date, if known. */
  effectiveFrom?: string;
  /** Omit if this is the current version. */
  effectiveUntil?: string;
  status: ContentStatus;
  evidence: Evidence[];
  note?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  specVersions: SpecVersion[];
}

export interface TechnologyRef {
  id: string;
  name: string;
  status: ContentStatus;
}

/**
 * How an asset was made. The build directive forbids passing AI-generated
 * imagery off as photography, so origin travels with the asset rather than
 * living in someone's memory. Nothing in the UI reads this yet; it exists so
 * the client can be shown exactly what is a render and what was photographed.
 */
export type MediaOrigin =
  | "photograph" // a camera pointed at a real thing
  | "render" // CG/product visualisation supplied by the client
  | "diagram" // drawn by this project
  | "unknown";

export interface Media {
  type: "image" | "video";
  src: string;
  alt: string;
  /** True until a real, cleared-for-web asset replaces it. */
  isPlaceholder: boolean;
  origin?: MediaOrigin;
  /** Repo-relative path the asset was lifted from, for traceability. */
  provenance?: string;
  width?: number;
  height?: number;
}

export interface Product {
  id: string;
  name: string;
  tagline?: string;
  description?: string;
  lifecycleStatus: ProductLifecycleStatus;
  contentStatus: ContentStatus;
  variants: ProductVariant[];
  technologies: TechnologyRef[];
  media: Media[];
  evidence: Evidence[];
}

/**
 * Testimonials are never rendered unless status is "verified" with client
 * sign-off - see project/PRODUCT.md §4 on the three reused, unverified
 * legacy testimonials. The type exists so the schema is ready; the demo
 * data intentionally ships zero verified testimonials.
 */
export interface Testimonial {
  id: string;
  quote: string;
  attributedName: string;
  attributedRole?: string;
  status: ContentStatus;
  evidence: Evidence[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: ContentStatus;
  evidence: Evidence[];
}

/**
 * A catalog grouping for the Products page - "what does Nabhastra offer,
 * organized the way the actual catalog is structured" (project/DECISIONS/
 * 2026-09-12-products-section-handoff-for-chatgpt.md and its ChatGPT reply).
 * Deliberately NOT a `Product` field: family membership is editorial/catalog
 * organization (which of five categories a product is shown under on
 * `/our-products`), not an intrinsic engineering fact the way `technologies`
 * or `variants` are - a product can exist independently of which catalog
 * page currently lists it. `productIds` are plain references into
 * `demoProducts`, resolved by the page itself; this is not wired into
 * `lib/graph.ts` and does not need `findDanglingRefs` coverage the way
 * `TechnologyRef` does, since there's exactly one place this list is used.
 */
export interface ProductFamily {
  id: string;
  name: string;
  description: string;
  productIds: string[];
}

/**
 * An operational domain a product serves - the useful half of the old
 * `Mission` entity, kept as catalog copy rather than restored as a first-class
 * graph node with its own routes and reverse-index functions. See the handoff
 * doc above for why: Missions used to compete with Systems/Products as a
 * separate top-level IA item; Applications is presentation copy surfaced
 * inside the Products page instead, with no product refs to keep in sync and
 * nothing for `findDanglingRefs` to check.
 */
export interface Application {
  id: string;
  name: string;
  summary: string;
}

/* ------------------------------------------------------------------------ *
 * Graph entities
 *
 * Products already carry TechnologyRef[], which is half a graph: edges with
 * no node on the far end. This is the far end. Together with lib/graph.ts it
 * lets a visitor travel system -> technology and back again, and lets systems
 * relate to each other by shared technology.
 * ------------------------------------------------------------------------ */

export interface Technology {
  id: string;
  name: string;
  /** One line, plain language, no capability claim beyond the evidence. */
  summary: string;
  description?: string;
  status: ContentStatus;
  evidence: Evidence[];
}

/**
 * Proof is categorised so that absence is legible in the data model. The
 * public UI deliberately renders only categories that hold real evidence -
 * a wall of empty shelves reads as "no proof", which is a worse claim than
 * saying nothing. See project/DECISIONS/.
 */
export type ProofCategory =
  | "field-validation"
  | "institutional"
  | "deployment"
  | "r-and-d"
  | "customer"
  | "certification";

export interface ProofItem {
  id: string;
  category: ProofCategory;
  title: string;
  detail: string;
  status: ContentStatus;
  media?: Media;
  evidence: Evidence[];
}
