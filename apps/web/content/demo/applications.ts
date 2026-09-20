import type { Application } from "@/content/types";

/**
 * Operational domains Nabhastra's products serve - the useful half of the
 * removed Missions entity, kept as catalog copy rather than a competing
 * top-level IA item. See the `Application` doc comment in content/types.ts.
 *
 * Sourced from the legacy `/faqs` page's stated industries served (defense,
 * agriculture, infrastructure, mining, disaster management, enterprise -
 * project/PRODUCT.md §3) rather than the three-item taxonomy the old
 * `MissionSection` used, since Disaster Management is real, distinct legacy
 * positioning that taxonomy never included.
 */
export const demoApplications: Application[] = [
  {
    id: "security-surveillance",
    name: "Security & Surveillance",
    summary: "Persistent aerial observation, perimeter security and target identification.",
  },
  {
    id: "agriculture",
    name: "Agriculture",
    summary: "Precision spray coverage and crop monitoring at scale.",
  },
  {
    id: "mapping-infrastructure",
    name: "Mapping & Infrastructure",
    summary: "High-density LiDAR terrain mapping and infrastructure survey.",
  },
  {
    id: "disaster-management",
    name: "Disaster Management",
    summary: "Situational awareness, resupply and response in disaster and remote-area operations.",
  },
];
