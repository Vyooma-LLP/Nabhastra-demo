import type { Technology } from "@/content/types";

/**
 * The far end of the `TechnologyRef` edges already declared on each product.
 *
 * Every id here must match a ref in products.ts, and every summary is a
 * restatement of something the legacy page actually says - no capability has
 * been added, generalised or upgraded. Where the source describes a feature
 * without evidence of it working, the status stays "provisional".
 */
export const demoTechnologies: Technology[] = [
  {
    id: "vtol",
    name: "Vertical take-off and landing",
    summary:
      "Fixed-wing cruise efficiency combined with rotary lift, so a platform can launch and recover without a runway or a catapult.",
    description:
      "AKSHAY carries four lift rotors on a 2.2 m fixed wing. The aircraft takes off vertically, transitions to wing-borne flight for the cruise, and returns to hover for recovery. The operational consequence is that the launch and recovery footprint is a clearing rather than a prepared strip.",
    status: "provisional",
    evidence: [
      {
        source: "research/references/legacy-site-content/page-vtol-drone.md",
        note: "Airframe card: 2.2 m wingspan, 380 KV motor, 6S 22000 mAh.",
        capturedAt: "2026-09-09",
      },
    ],
  },
  {
    id: "ai-tracking",
    name: "Onboard detection and adaptive-lock tracking",
    summary:
      "Object detection and classification computed on the aircraft, with a track that holds a designated subject as it moves through the frame.",
    description:
      "The DRISHTI pages describe onboard detection and classification of people, vehicles and unattended objects, an adaptive lock that follows a designated target, and alerting in real time. Detection accuracy figures appear on the legacy pages but are not independently verified by this project and are therefore not repeated as specifications.",
    status: "provisional",
    evidence: [
      {
        source: "research/references/legacy-site-content/page-drishti-drone.md",
        capturedAt: "2026-09-09",
      },
      {
        source:
          "research/references/legacy-site-content/page-surveillance-drone.md",
        note: "MK I and MK II descriptions.",
        capturedAt: "2026-09-09",
      },
    ],
  },
  {
    id: "gsm-rf-control",
    name: "GSM primary with RF fallback",
    summary:
      "A cellular command link as the primary control path, falling back to a direct radio link where coverage stops.",
    description:
      "RUDRA is described as taking its command link over a SIM-based GSM connection, through a VPN-encrypted tunnel, with a frequency-hopping RF link as fallback. Using cellular as the primary path decouples range from line of sight wherever a network reaches.",
    status: "provisional",
    evidence: [
      {
        source: "research/references/legacy-site-content/page-rudra.md",
        note: "Connectivity: GSM (SIM based) + RF fallback.",
        capturedAt: "2026-09-09",
      },
    ],
  },
  {
    id: "hibernation-mode",
    name: "Hibernation with remote wake",
    summary:
      "A 72-hour standby state the aircraft can be woken from remotely, so a system can be emplaced long before it is needed.",
    description:
      "RUDRA is described as holding a sleep or standby state for up to 72 hours and waking on a GSM command. The consequence for an operator is that emplacement and use are separated in time.",
    status: "provisional",
    evidence: [
      {
        source: "research/references/legacy-site-content/page-rudra.md",
        note: "Hibernation: 72 hours sleep / standby mode.",
        capturedAt: "2026-09-09",
      },
    ],
  },
  {
    id: "indigenous-avionics",
    name: "Indigenous flight controller and avionics",
    summary:
      "Flight controller, firmware and ground control software developed in-house, with encrypted boot and black-box logging.",
    description:
      "The RUDRA page states that the flight controller, firmware, avionics and ground control station are indigenous, and that the software chain carries encrypted boot and black-box logging. Owning the stack is what makes unit-level repair and a sub-30-minute mean time to repair a credible claim rather than an aspiration.",
    status: "provisional",
    evidence: [
      {
        source: "research/references/legacy-site-content/page-rudra.md",
        note: "Indigenous FC, firmware and avionics; MTTR under 30 min.",
        capturedAt: "2026-09-09",
      },
    ],
  },
  {
    id: "agri-spray-fc",
    name: "Agricultural spray flight control",
    summary:
      "Flight control tuned for spray work: metered flow, terrain following, and autonomous coverage of a mapped block.",
    description:
      "The GAJRAJ family runs a spray-specific flight controller with manual and autonomous modes, a dual pump delivering 9 L/min through a flow meter, and centrifugal nozzles. GAJRAJ 30 and 50 add terrain and obstacle sensing. Metered flow tied to ground speed is what turns a tank capacity into a per-acre coverage figure.",
    status: "provisional",
    evidence: [
      {
        source:
          "research/references/legacy-site-content/page-agricultural-drone.md",
        capturedAt: "2026-09-09",
      },
    ],
  },
  {
    id: "fiber-optic-tether",
    name: "Fiber-optic tethered command and power link",
    summary:
      "A physical fiber-optic tether carrying command, video and power, in place of a radio link that jamming or interception can reach.",
    description:
      "KITE and KITE II run their command-and-control, HD/4K video, and power over a fiber-optic tether rather than RF, which the source material describes as immune to jamming, hacking and eavesdropping and reliable in EMI-heavy environments. The tradeoff for that immunity is a tether length limit rather than a radio range limit.",
    status: "provisional",
    evidence: [
      {
        source: "research/references/legacy-site-content/page-kamikaze-racer-drones.md",
        capturedAt: "2026-09-09",
      },
      {
        source: "apps/web/public/media/kite-i.png",
        note: "Spec-sheet infographic: tether type, tether length, comms and video fields.",
        capturedAt: "2026-09-12",
      },
    ],
  },
  {
    id: "lidar-mapping",
    name: "High-density LiDAR terrain mapping",
    summary:
      "An onboard LiDAR scanner producing dense 3D point clouds of terrain and objects, rather than photographic imagery alone.",
    description:
      "The LiDAR survey platform carries a scanner rated up to 128 channels and 5.2 million points per second, outputting range, intensity, reflectivity and near-infrared data for high-accuracy 3D terrain and object mapping. It is deployable UAV-mounted, backpack-portable, or vehicle-mounted.",
    status: "provisional",
    evidence: [
      {
        source: "research/references/legacy-site-content/page-surveillance-drone.md",
        note: "LiDAR Survey Drone section.",
        capturedAt: "2026-09-09",
      },
    ],
  },
];

export function getTechnologyById(id: string): Technology | undefined {
  return demoTechnologies.find((t) => t.id === id);
}
