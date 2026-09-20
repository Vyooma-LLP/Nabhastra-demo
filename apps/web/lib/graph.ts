import { demoProducts } from "@/content/demo/products";
import { demoTechnologies } from "@/content/demo/technologies";
import type { Product, Technology } from "@/content/types";

/**
 * The reverse index over the content graph.
 *
 * Products already declare their edges (technologies). This function walks
 * that edge backwards so a technology page can list the systems that use it -
 * which is what lets a visitor enter from either direction.
 *
 * Everything here is a pure function over static module data, so it runs at
 * build time and ships no client JavaScript. There is no diagram: the graph is
 * felt through navigation, not drawn.
 */

export function getSystemsUsingTechnology(technologyId: string): Product[] {
  return demoProducts.filter((p) =>
    p.technologies.some((t) => t.id === technologyId),
  );
}

export function getTechnologiesForSystem(productId: string): Technology[] {
  const product = demoProducts.find((p) => p.id === productId);
  if (!product) return [];
  return product.technologies
    .map((ref) => demoTechnologies.find((t) => t.id === ref.id))
    .filter((t): t is Technology => t !== undefined);
}

/**
 * Systems that share at least one technology with this one, ranked by how
 * many technologies they share. Relatedness is derived from the graph rather
 * than hand-curated, so it cannot drift out of sync with the data.
 */
export function getRelatedSystems(productId: string, limit = 3): Product[] {
  const product = demoProducts.find((p) => p.id === productId);
  if (!product) return [];

  const technologyIds = new Set(product.technologies.map((t) => t.id));

  return demoProducts
    .filter((p) => p.id !== productId)
    .map((p) => ({
      product: p,
      shared: p.technologies.filter((t) => technologyIds.has(t.id)).length,
    }))
    .filter((entry) => entry.shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, limit)
    .map((entry) => entry.product);
}

/**
 * Dangling-edge check. Any ref pointing at an entity that does not exist is a
 * content bug that would otherwise surface as a silently missing link, so the
 * build surfaces it instead - see the graph-integrity step in the plan's
 * verification section.
 */
export function findDanglingRefs(): string[] {
  const technologyIds = new Set(demoTechnologies.map((t) => t.id));
  const problems: string[] = [];

  for (const product of demoProducts) {
    for (const ref of product.technologies) {
      if (!technologyIds.has(ref.id)) {
        problems.push(`${product.id} -> technology "${ref.id}" does not exist`);
      }
    }
  }

  return problems;
}
