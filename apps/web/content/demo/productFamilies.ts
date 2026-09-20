import type { ProductFamily } from "@/content/types";

/**
 * The five categories the live site's `/our-products` page groups its
 * catalog into, per `research/references/legacy-site-content/
 * navigation-menu.md` (the parent nav item and its five child category
 * pages) and `page-our-products.md` ("Our Featured Projects" tile list).
 * `productIds` reference `demoProducts` in `content/demo/products.ts` - see
 * that file for the underlying engineering facts. This grouping is presented,
 * not engineered: see the `ProductFamily` doc comment in content/types.ts.
 */
export const productFamilies: ProductFamily[] = [
  {
    id: "kamikaze-racer",
    name: "Kamikaze / Racer Drones",
    description:
      "Tactical strike, loitering-munition and FPV training platforms, from the fully autonomous RUDRA to the fiber-optic tethered KITE line and the FPV/ARJUN trainers.",
    productIds: ["rudra", "kite-i", "kite-ii", "fpv-5", "fpv-10", "arjun"],
  },
  {
    id: "surveillance",
    name: "Surveillance Drones",
    description:
      "AI-assisted aerial observation and LiDAR-based survey platforms for persistent monitoring and high-density terrain mapping.",
    productIds: ["drishti", "lidar-survey"],
  },
  {
    id: "logistics",
    name: "Logistic Drones",
    description:
      "Heavy-payload delivery for resupply, disaster relief and remote-area logistics.",
    productIds: ["airawat"],
  },
  {
    id: "vtol-fixed-wing",
    name: "VTOL / Fixed Wing / Loitering Munition",
    description:
      "Runway-independent, long-range fixed-wing platforms that launch and recover vertically.",
    productIds: ["akshay"],
  },
  {
    id: "agricultural",
    name: "Agricultural Drones",
    description:
      "The GAJRAJ precision-spray family, sized by tank capacity and per-acre coverage.",
    productIds: ["gajraj"],
  },
];

export function getProductFamilyById(id: string): ProductFamily | undefined {
  return productFamilies.find((f) => f.id === id);
}
