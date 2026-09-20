import type { Product } from "@/content/types";

/**
 * Demo/provisional content layer. Every fact here traces to project/PRODUCT.md
 * and research/references/legacy-site-content/ - nothing invented. Status
 * fields are deliberately conservative: "provisional" (not "verified") until
 * the client confirms current specs, per the build rule agreed with the
 * client's review (see conversation log, 2026-09-09).
 */
export const demoProducts: Product[] = [
  {
    id: "rudra",
    name: "RUDRA",
    tagline: "Autonomous surveillance cum kamikaze drone system",
    description:
      "Indigenous, next-generation autonomous tactical drone engineered for surveillance, precision payload delivery and kamikaze strike missions.",
    lifecycleStatus: "unknown",
    contentStatus: "provisional",
    variants: [
      {
        id: "rudra-standard",
        name: "RUDRA",
        specVersions: [
          {
            id: "rudra-v1",
            status: "provisional",
            values: [
              { label: "Endurance", value: "25 min" },
              { label: "Range", value: "≥5 km" },
              { label: "Ceiling", value: "16,000 ft" },
              { label: "Max AUW", value: "≤4.5 kg" },
              { label: "Payload", value: "≥1.2 kg" },
              { label: "Wind resistance", value: "≥15 m/s" },
              { label: "Speed", value: "15-45 km/h (70 km/h dive)" },
              { label: "Acoustic signature", value: "<60 dBA at 25 m" },
            ],
            evidence: [
              {
                source: "research/references/legacy-site-content/page-rudra.md",
                capturedAt: "2026-09-09",
              },
            ],
          },
        ],
      },
    ],
    technologies: [
      { id: "gsm-rf-control", name: "GSM primary + RF fallback control", status: "provisional" },
      { id: "hibernation-mode", name: "72-hour GSM wake hibernation", status: "provisional" },
    ],
    media: [
      {
        type: "image",
        src: "/media/rudra-loitering.jpeg",
        alt: "A quadrotor aircraft carrying an underslung cylindrical payload, photographed on wet tarmac at night.",
        isPlaceholder: false,
        origin: "render",
        provenance:
          "nabhastra present/wp-content/uploads/2026/05/edbedfd7-7499-42a3-86f7-7297623199e4.jpeg",
        width: 1600,
        height: 900,
      },
    ],
    evidence: [
      {
        source: "research/references/legacy-site-content/page-rudra.md",
        capturedAt: "2026-09-09",
      },
    ],
  },
  {
    id: "drishti",
    name: "DRISHTI",
    tagline: "AI-powered surveillance drone",
    description:
      "AI powered surveillance drone built for real-time intelligence, autonomous missions and precise target identification.",
    lifecycleStatus: "unknown",
    contentStatus: "conflicting",
    variants: [
      {
        id: "drishti-main",
        name: "DRISHTI (product page spec table)",
        specVersions: [
          {
            id: "drishti-main-v1",
            status: "conflicting",
            note:
              "Does not agree with the MK I / MK II variants below (different batteries, no shared altitude/speed figures). Client confirmation needed - see project/PRODUCT.md §2, Q3.",
            values: [
              { label: "Max payload", value: "1.5 kg" },
              { label: "Max speed", value: "60 km/h" },
              { label: "Max altitude", value: "5000 m" },
              { label: "Max range", value: "10 km (LOS)" },
              { label: "Weight", value: "≤4.5 kg" },
              { label: "Battery", value: "6S Li-Po, 6,000 mAh" },
            ],
            evidence: [
              {
                source: "research/references/legacy-site-content/page-drishti-drone.md",
                capturedAt: "2026-09-09",
              },
            ],
          },
        ],
      },
      {
        id: "drishti-mk1",
        name: "DRISHTI MK I",
        specVersions: [
          {
            id: "drishti-mk1-v1",
            status: "conflicting",
            values: [
              { label: "Frame", value: "650 mm" },
              { label: "Motor", value: "4010 380KV" },
              { label: "Battery", value: "6S 15,000 mAh" },
              { label: "Flight time", value: "up to 45 min" },
            ],
            evidence: [
              {
                source: "research/references/legacy-site-content/page-surveillance-drone.md",
                capturedAt: "2026-09-09",
              },
            ],
          },
        ],
      },
      {
        id: "drishti-mk2",
        name: "DRISHTI MK II",
        specVersions: [
          {
            id: "drishti-mk2-v1",
            status: "conflicting",
            values: [
              { label: "Frame", value: "850 mm" },
              { label: "Motor", value: "340 KV" },
              { label: "Battery", value: "12S 22,000 mAh solid-state" },
              { label: "Flight time", value: "up to 60 min" },
            ],
            evidence: [
              {
                source: "research/references/legacy-site-content/page-surveillance-drone.md",
                capturedAt: "2026-09-09",
              },
            ],
          },
        ],
      },
    ],
    technologies: [
      { id: "ai-tracking", name: "AI object detection & adaptive-lock tracking", status: "provisional" },
    ],
    media: [
      {
        type: "image",
        src: "/media/isr-platform-front-green.jpeg",
        alt: "A Nabhastra-branded hexarotor aircraft seen head-on, carrying a gimballed camera beneath the fuselage.",
        isPlaceholder: false,
        origin: "render",
        provenance:
          "nabhastra present/wp-content/uploads/2026/05/aa581c5c-b9ee-43ed-8df7-ed939bd4c58a.jpeg",
        width: 1536,
        height: 1024,
      },
      {
        type: "image",
        src: "/media/drishti-sensor-platform.png",
        alt: "A hexarotor aircraft with a gimballed sensor payload, shown beside its handheld ground controller.",
        isPlaceholder: false,
        origin: "render",
        provenance:
          "nabhastra present/wp-content/uploads/2026/06/3d7478f3-5cf2-460d-8acf-20400dbd6792.png",
        width: 1536,
        height: 1024,
      },
      {
        // Wired 2026-09-19 (reconciliation doc §3/§12, doubt #14): a navy
        // colorway of the SAME NABHASTRA-branded hexarotor as the two images
        // above, not a different or unconfirmed airframe - safe to add as a
        // third real angle rather than leave orphaned in public/media.
        type: "image",
        src: "/media/isr-platform-front.jpeg",
        alt: "The same Nabhastra-branded hexarotor aircraft in a navy colorway, seen head-on against a dark studio background.",
        isPlaceholder: false,
        origin: "render",
        provenance: "project/asset-library/images (A0006)",
        width: 1536,
        height: 1024,
      },
    ],
    evidence: [
      {
        source: "project/PRODUCT.md",
        note: "Q3 - DRISHTI spec conflict, awaiting client confirmation",
        capturedAt: "2026-09-09",
      },
    ],
  },
  {
    id: "akshay",
    name: "AKSHAY",
    tagline: "VTOL drone",
    description: "Versatile, reliable, mission-ready VTOL platform.",
    lifecycleStatus: "unknown",
    contentStatus: "conflicting",
    variants: [
      {
        id: "akshay-vtol",
        name: "AKSHAY VTOL",
        specVersions: [
          {
            id: "akshay-legacy",
            status: "deprecated",
            note: "Legacy CMS spec sheet (/vtol-drone-old) - likely superseded, per council review.",
            values: [
              { label: "Range", value: "up to 40 km" },
              { label: "Endurance", value: "3 hours" },
              { label: "Payload", value: "2 kg" },
            ],
            effectiveUntil: "2026-09-09",
            evidence: [
              {
                source: "research/references/legacy-site-content/page-vtol-drone-old.md",
                capturedAt: "2026-09-09",
              },
            ],
          },
          {
            id: "akshay-current-page",
            status: "conflicting",
            values: [
              { label: "Range", value: "up to 80 km one-way" },
              { label: "Endurance", value: "3 hours" },
              { label: "Payload", value: "2-4 kg" },
            ],
            evidence: [
              {
                source: "research/references/legacy-site-content/page-vtol-drone.md",
                capturedAt: "2026-09-09",
              },
            ],
          },
          {
            id: "akshay-public-claim",
            status: "provisional",
            note:
              "From current public company communication (LinkedIn), not yet client-confirmed as the canonical spec. See project/PRODUCT.md Q2.",
            values: [
              { label: "Range", value: "80+ km" },
              { label: "Endurance", value: "4 hours" },
              { label: "Payload", value: "4 kg" },
              { label: "Navigation", value: "GNSS-denied capable (claimed)" },
            ],
            evidence: [
              {
                source: "external: company LinkedIn post, 2026",
                note: "Cited by client-side review, not independently verified by this project",
                capturedAt: "2026-09-09",
              },
            ],
          },
          {
            // Companion-hardware spec, added 2026-09-19: the legacy
            // `/vtol-drone` page carries this camera-payload table alongside
            // the airframe numbers above; PRODUCT.md transcribed it but
            // products.ts never modeled it (reconciliation doc §7/§12,
            // doubt #10). Same page, same variant - a separate SpecVersion
            // rather than a new field, so it renders as its own table
            // (SpecTable.tsx) instead of being merged into the airframe
            // numbers it isn't part of.
            id: "akshay-camera-payload",
            status: "provisional",
            note: "Camera payload (companion hardware, not the airframe spec above).",
            values: [
              { label: "Sensor", value: "1/2.7\" CMOS" },
              { label: "Resolution", value: "48MP" },
              { label: "Video", value: "4K @ 30fps" },
              { label: "Photo", value: "8000 x 6000" },
              { label: "Optical zoom", value: "30x" },
              { label: "Gimbal", value: "3-axis" },
              { label: "FOV", value: "63.7°" },
              { label: "Ingress protection", value: "IP44" },
              { label: "Weight", value: "≤240g" },
            ],
            evidence: [
              {
                source: "research/references/legacy-site-content/page-vtol-drone.md",
                capturedAt: "2026-09-09",
              },
            ],
          },
          {
            id: "akshay-gcs",
            status: "provisional",
            note: "Ground control station (companion hardware, not the airframe spec above).",
            values: [
              { label: "Display", value: "5.5\" FHD Android" },
              { label: "Processor", value: "Octa-core" },
              { label: "Memory", value: "4GB RAM / 64GB ROM" },
              { label: "Battery", value: "10,000 mAh (up to 8 hrs)" },
              { label: "Comms", value: "2.4GHz & 5.8GHz, up to 20km LOS" },
              { label: "I/O", value: "USB-C, HDMI, TF card" },
              { label: "Ingress protection", value: "IP54" },
              { label: "Operating range", value: "-20°C to +60°C" },
            ],
            evidence: [
              {
                source: "research/references/legacy-site-content/page-vtol-drone.md",
                capturedAt: "2026-09-09",
              },
            ],
          },
        ],
      },
    ],
    technologies: [{ id: "vtol", name: "Vertical take-off and landing", status: "provisional" }],
    media: [
      {
        type: "image",
        src: "/media/akshay-vtol.png",
        alt: "AKSHAY, a carbon-fibre fixed-wing aircraft with four lift rotors on outrigger booms, marked NABHASTRA along the wing.",
        isPlaceholder: false,
        origin: "render",
        provenance:
          "nabhastra present/wp-content/uploads/2026/06/a794ede4-e311-4f03-8de4-84de1fd68b8e.png",
        width: 1610,
        height: 977,
      },
    ],
    evidence: [
      {
        source: "project/PRODUCT.md",
        note: "Q2 - AKSHAY spec conflict, awaiting client confirmation",
        capturedAt: "2026-09-09",
      },
    ],
  },
  {
    id: "gajraj",
    name: "GAJRAJ",
    tagline: "Pesticide spray (agricultural) drone family",
    description: "Three-SKU agricultural spray drone line, differing by tank capacity and coverage.",
    lifecycleStatus: "unknown",
    contentStatus: "provisional",
    variants: [
      {
        id: "gajraj-20",
        name: "GAJRAJ 20",
        specVersions: [
          {
            id: "gajraj-20-v1",
            status: "provisional",
            values: [
              { label: "Propeller", value: "36in foldable carbon fibre" },
              { label: "Motor", value: "X9+ motors, 110 KV" },
              { label: "Tank", value: "20 L, 2 centrifugal nozzles" },
              { label: "Battery", value: "14S 20,000 mAh Li-Po" },
              { label: "Coverage per charge", value: "40-50L spray (4-5 acre)" },
              { label: "Flight time", value: "12-15 min" },
            ],
            evidence: [
              {
                source: "research/references/legacy-site-content/page-agricultural-drone.md",
                capturedAt: "2026-09-09",
              },
            ],
          },
        ],
      },
      {
        id: "gajraj-30",
        name: "GAJRAJ 30",
        specVersions: [
          {
            id: "gajraj-30-v1",
            status: "provisional",
            values: [
              { label: "Propeller", value: "43in foldable carbon fibre" },
              { label: "Motor", value: "X11+ motors, 95 KV" },
              { label: "Tank", value: "30 L, 2 centrifugal nozzles" },
              { label: "Battery", value: "14S 30,000 mAh Li-Po" },
              { label: "Coverage per charge", value: "60-70L spray (6-7 acre)" },
              { label: "Flight time", value: "12-15 min" },
            ],
            evidence: [
              {
                source: "research/references/legacy-site-content/page-agricultural-drone.md",
                capturedAt: "2026-09-09",
              },
            ],
          },
        ],
      },
      {
        id: "gajraj-50",
        name: "GAJRAJ 50",
        specVersions: [
          {
            id: "gajraj-50-v1",
            status: "provisional",
            values: [
              { label: "Propeller", value: "56in foldable carbon fibre" },
              { label: "Motor", value: "X13 motors, 45 KV" },
              { label: "Tank", value: "50 L, 4 centrifugal nozzles" },
              { label: "Battery", value: "18S 30,000 mAh Li-Po" },
              { label: "Coverage per charge", value: "100L spray (10 acre)" },
              { label: "Flight time", value: "15-20 min" },
            ],
            evidence: [
              {
                source: "research/references/legacy-site-content/page-agricultural-drone.md",
                capturedAt: "2026-09-09",
              },
            ],
          },
        ],
      },
    ],
    technologies: [{ id: "agri-spray-fc", name: "Agri-spray-specific flight controller", status: "provisional" }],
    media: [
      {
        type: "image",
        src: "/media/gajraj-field-photo.webp",
        alt: "A white agricultural spray drone on eight X13 motors, photographed unstaged in a field with its tank and boom arms visible.",
        isPlaceholder: false,
        origin: "photograph",
        provenance: "project/asset-library/images/A0238__rsw_1200cg_true.webp",
        width: 1200,
        height: 900,
      },
      {
        type: "image",
        src: "/media/gajraj-studio-render.png",
        alt: "The same white agricultural spray drone against a plain white studio background, product-detail view.",
        isPlaceholder: false,
        origin: "photograph",
        provenance: "project/asset-library/images/A0164__drone-image white bg.png",
        width: 1536,
        height: 1024,
      },
    ],
    evidence: [
      {
        source: "research/references/legacy-site-content/page-agricultural-drone.md",
        capturedAt: "2026-09-09",
      },
      {
        source: "research/references/asset-placement-audit.md",
        note:
          "Field photograph shows an X13-motor sprayer, matching GAJRAJ 50's recorded motor spec - the strongest available image evidence for this family. No source confirms which of the three GAJRAJ SKUs (20/30/50) is pictured, so the image is attached at the family level rather than to one specific tank size.",
        capturedAt: "2026-09-12",
      },
    ],
  },
  {
    id: "airawat",
    name: "AIRAWAT",
    tagline: "Logistic drone",
    description:
      "A robust logistic drone designed for the toughest terrains and operational conditions, built to deliver critical supplies and equipment with speed and precision.",
    lifecycleStatus: "unknown",
    contentStatus: "provisional",
    variants: [
      {
        id: "airawat-standard",
        name: "AIRAWAT",
        specVersions: [
          {
            id: "airawat-v1",
            status: "provisional",
            values: [
              { label: "Payload capacity", value: "20 / 30 / 50 kg" },
              { label: "Endurance", value: "30 min" },
              { label: "Range", value: "20 km" },
              { label: "Operations", value: "Day & night" },
              { label: "Frame", value: "54in prop, X13 motor 95 KV" },
              { label: "Battery", value: "18S 22,000 mAh" },
              { label: "Flight time", value: "30 min" },
            ],
            note:
              "Excludes the generic 1.5kg/60km-h/5000m spec block also present on this page - that block is repeated identically across RUDRA, GAJRAJ, DRISHTI and AKSHAY pages and is copy-pasted Elementor filler, not AIRAWAT's real spec. See project/PRODUCT.md §4.2.",
            evidence: [
              {
                source: "research/references/legacy-site-content/page-logistic-drone.md",
                capturedAt: "2026-09-09",
              },
            ],
          },
          {
            // Companion-hardware spec, added 2026-09-19 - same rationale as
            // AKSHAY's camera/GCS tables above (reconciliation doc §7/§12,
            // doubt #10): the legacy `/logistic-drone` page's G30 GCS table
            // was transcribed into PRODUCT.md but never modeled here.
            id: "airawat-g30-gcs",
            status: "provisional",
            note: "G30 ground control station (companion hardware, shared across the range).",
            values: [
              { label: "Display", value: "7.0\" 1920x1200" },
              { label: "OS", value: "Android 10" },
              { label: "Processor", value: "Octa-core, 2.0GHz" },
              { label: "Memory", value: "4GB RAM / 64GB ROM" },
              { label: "Connectivity", value: "4G, WiFi, Bluetooth" },
              { label: "Battery", value: "10,000 mAh, hot-swappable" },
              { label: "Operating time", value: "Up to 8 hrs" },
              { label: "Ingress protection", value: "IP67" },
              { label: "Operating range", value: "-20°C to +60°C" },
            ],
            evidence: [
              {
                source: "research/references/legacy-site-content/page-logistic-drone.md",
                capturedAt: "2026-09-09",
              },
            ],
          },
        ],
      },
    ],
    technologies: [],
    media: [
      {
        type: "image",
        src: "/media/airawat-logistics.png",
        alt: "A black hexarotor cargo drone with an underslung cage payload, photographed against a dark background with green rim lighting.",
        isPlaceholder: false,
        origin: "render",
        provenance: "apps/web/public/media/airawat-logistics.png",
        width: 1402,
        height: 1122,
      },
    ],
    evidence: [
      {
        source: "research/references/legacy-site-content/page-logistic-drone.md",
        capturedAt: "2026-09-09",
      },
    ],
  },
  {
    id: "lidar-survey",
    name: "LiDAR Survey Drone",
    tagline: "LiDAR survey platform",
    description:
      "A 15-inch-class multi-rotor UAV carrying a high-resolution LiDAR payload for 3D terrain and object mapping, deployable UAV-mounted, backpack-portable, or vehicle-mounted.",
    lifecycleStatus: "unknown",
    contentStatus: "provisional",
    variants: [
      {
        id: "lidar-survey-standard",
        name: "LiDAR Survey Drone",
        specVersions: [
          {
            id: "lidar-survey-v1",
            status: "provisional",
            values: [
              { label: "Frame", value: "15in propeller class, 750 mm" },
              { label: "Deployment", value: "UAV-mounted, backpack, or vehicle-mounted" },
              { label: "Endurance", value: "35-40 min" },
              { label: "Range", value: "up to 5 km" },
              { label: "Max altitude", value: "up to 100 m AGL" },
              { label: "LiDAR channels", value: "up to 128" },
              { label: "Point cloud density", value: "up to 5.2 million points/sec" },
              { label: "Battery", value: "6S 22,000 mAh" },
              { label: "Flight time", value: "30-35 min" },
            ],
            evidence: [
              {
                source: "research/references/legacy-site-content/page-surveillance-drone.md",
                note: "LiDAR Survey Drone section, not a standalone page.",
                capturedAt: "2026-09-09",
              },
            ],
          },
        ],
      },
    ],
    technologies: [{ id: "lidar-mapping", name: "High-density LiDAR terrain mapping", status: "provisional" }],
    // No LiDAR imagery exists in the legacy asset set - the DRISHTI hexarotor
    // renders belong to a different airframe on the same source page, and
    // reusing them here would be the same cross-product contamination GAJRAJ's
    // media comment above already declines.
    //
    // PLACEHOLDER, added 2026-09-19 on explicit direction (draft review, not
    // a real asset): a 3D terrain elevation render, not a photo of any
    // aircraft, chosen specifically to avoid the alternative - every
    // available stock photo of a mapping-class multirotor shows visibly
    // branded third-party hardware (DJI/Mavic), which would misrepresent a
    // competitor's product as Nabhastra's. `isPlaceholder: true` so it reads
    // as temporary and is the first thing swapped once a real LiDAR Survey
    // Drone photo exists.
    media: [
      {
        type: "image",
        src: "/media/lidar-survey-placeholder.webp",
        alt: "A 3D elevation render of mountainous terrain, representative of LiDAR-derived point-cloud mapping output.",
        isPlaceholder: true,
        origin: "unknown",
        provenance: "Unsplash, downloaded 2026-09-19 as a draft placeholder - not a Nabhastra asset.",
        width: 1600,
        height: 849,
      },
    ],
    evidence: [
      {
        source: "research/references/legacy-site-content/page-surveillance-drone.md",
        capturedAt: "2026-09-09",
      },
    ],
  },
  {
    id: "kite-i",
    name: "KITE I",
    tagline: "Fiber-optic tethered drone system",
    description:
      "A next-generation fiber-optic tethered drone engineered for secure, beyond-line-of-sight operations, delivering uninterrupted HD video, command-and-control connectivity and secure data transmission resilient against jamming and interception.",
    lifecycleStatus: "production",
    contentStatus: "provisional",
    variants: [
      {
        id: "kite-i-standard",
        name: "KITE I",
        specVersions: [
          {
            id: "kite-i-v1",
            status: "provisional",
            note:
              "Sourced from a spec-sheet infographic (public/media/kite-i.png), a different source from the rest of this product line's WordPress-export copy - not yet independently verified. See project/PRODUCT.md.",
            values: [
              { label: "Frame", value: "Quadcopter" },
              { label: "Max take-off weight", value: "4.5 kg" },
              { label: "Payload", value: "up to 1 kg" },
              { label: "Endurance", value: "up to 60 min (tethered power)" },
              { label: "Operational range", value: "unlimited (fiber-optic tether)" },
              { label: "Tether", value: "fiber optic, up to 10 km (customizable)" },
              { label: "Max altitude", value: "4000 m AGL" },
              { label: "Wind resistance", value: "up to 40 km/h" },
              { label: "Max speed", value: "60 km/h" },
              { label: "Operating temp", value: "-20°C to +55°C" },
              { label: "Protection", value: "IP54" },
              { label: "Launch / recovery", value: "manual/catapult · winch/manual" },
              { label: "Navigation", value: "GPS/GLONASS + INS" },
              { label: "Communication", value: "fiber optic (data + power)" },
              { label: "Video", value: "real-time HD/4K over fiber" },
            ],
            evidence: [
              {
                source: "apps/web/public/media/kite-i.png",
                note: "Branded technical spec-sheet infographic.",
                capturedAt: "2026-09-12",
              },
              {
                source: "research/references/legacy-site-content/page-kamikaze-racer-drones.md",
                note: "Descriptive copy only, no numeric specs.",
                capturedAt: "2026-09-09",
              },
            ],
          },
        ],
      },
    ],
    technologies: [{ id: "fiber-optic-tether", name: "Fiber-optic tethered command and power link", status: "provisional" }],
    media: [
      {
        type: "image",
        src: "/media/kite-i.png",
        alt: "A branded technical spec-sheet infographic for KITE, a quadcopter fiber-optic tethered drone with a tether reel and battery pack slung beneath it.",
        isPlaceholder: false,
        origin: "unknown",
        provenance: "apps/web/public/media/kite-i.png",
        width: 1536,
        height: 1024,
      },
    ],
    evidence: [
      {
        source: "research/references/legacy-site-content/page-kamikaze-racer-drones.md",
        capturedAt: "2026-09-09",
      },
      {
        source: "project/PRODUCT.md",
        note: "Q4 - KITE production status, client-confirmed 2026-09-12",
        capturedAt: "2026-09-12",
      },
    ],
  },
  {
    id: "kite-ii",
    name: "KITE II",
    tagline: "15in fiber-optic tethered drone system",
    description:
      "A high-payload, 15-inch fiber-optic tethered drone system for mission-critical operations, engineered for modern defense, surveillance and security applications with uninterrupted HD video and jam-resistant data transmission.",
    lifecycleStatus: "production",
    contentStatus: "provisional",
    variants: [
      {
        id: "kite-ii-standard",
        name: "KITE II",
        specVersions: [
          {
            id: "kite-ii-v1",
            status: "provisional",
            note:
              "Sourced from a spec-sheet infographic (public/media/kite-ii.png), a different source from the rest of this product line's WordPress-export copy - not yet independently verified. See project/PRODUCT.md.",
            values: [
              { label: "Frame", value: "Quadcopter (15in)" },
              { label: "Max take-off weight", value: "8 kg" },
              { label: "Payload", value: "up to 2 kg" },
              { label: "Endurance", value: "up to 60 min (tethered power)" },
              { label: "Operational range", value: "unlimited (fiber-optic tether)" },
              { label: "Tether", value: "fiber optic, up to 10 km (customizable)" },
              { label: "Max altitude", value: "4000 m AGL" },
              { label: "Wind resistance", value: "up to 40 km/h" },
              { label: "Max speed", value: "60 km/h" },
              { label: "Operating temp", value: "-20°C to +55°C" },
              { label: "Protection", value: "IP54" },
              { label: "Launch / recovery", value: "manual/catapult · winch/manual" },
              { label: "Navigation", value: "GPS/GLONASS + INS" },
              { label: "Communication", value: "fiber optic (data + power)" },
              { label: "Video", value: "real-time HD/4K over fiber" },
            ],
            evidence: [
              {
                source: "apps/web/public/media/kite-ii.png",
                note: "Branded technical spec-sheet infographic.",
                capturedAt: "2026-09-12",
              },
              {
                source: "research/references/legacy-site-content/page-kamikaze-racer-drones.md",
                note: "Descriptive copy only, no numeric specs.",
                capturedAt: "2026-09-09",
              },
            ],
          },
        ],
      },
    ],
    technologies: [{ id: "fiber-optic-tether", name: "Fiber-optic tethered command and power link", status: "provisional" }],
    media: [
      {
        type: "image",
        src: "/media/kite-ii.png",
        alt: "A branded technical spec-sheet infographic for KITE II, a larger 15-inch quadcopter fiber-optic tethered drone with a tether reel and battery pack slung beneath it.",
        isPlaceholder: false,
        origin: "unknown",
        provenance: "apps/web/public/media/kite-ii.png",
        width: 1536,
        height: 1024,
      },
    ],
    evidence: [
      {
        source: "research/references/legacy-site-content/page-kamikaze-racer-drones.md",
        capturedAt: "2026-09-09",
      },
      {
        source: "project/PRODUCT.md",
        note: "Q4 - KITE production status, client-confirmed 2026-09-12",
        capturedAt: "2026-09-12",
      },
    ],
  },
  {
    id: "fpv-5",
    name: "5in FPV Training Drone",
    tagline: "FPV training drone",
    // No description: the legacy page's descriptive copy for this entry is
    // unedited Lorem ipsum filler, never written - see project/PRODUCT.md §4.3.
    // The spec table below it is real; the paragraph copy is not carried forward.
    lifecycleStatus: "unknown",
    contentStatus: "provisional",
    variants: [
      {
        id: "fpv-5-standard",
        name: "5in FPV Training Drone",
        specVersions: [
          {
            id: "fpv-5-v1",
            status: "provisional",
            values: [
              { label: "Frame", value: "5in" },
              { label: "Motor", value: "2207 1750KV" },
              { label: "Battery", value: "4S 1300 mAh" },
              { label: "Flight time", value: "6-8 min" },
            ],
            evidence: [
              {
                source: "research/references/legacy-site-content/page-kamikaze-racer-drones.md",
                capturedAt: "2026-09-09",
              },
            ],
          },
        ],
      },
    ],
    technologies: [],
    media: [
      {
        type: "image",
        src: "/media/fpv-5-training-kit.png",
        alt: "A NABHASTRA-branded 5-inch FPV quadcopter with goggles and controller, titled \"5 INCH FPV TRAINING DRONE\" on the product photo.",
        isPlaceholder: false,
        origin: "photograph",
        provenance: "project/asset-library/images/5in fpv training kit.png",
        width: 1402,
        height: 1122,
      },
    ],
    evidence: [
      {
        source: "research/references/legacy-site-content/page-kamikaze-racer-drones.md",
        capturedAt: "2026-09-09",
      },
      {
        source: "research/references/asset-placement-audit.md",
        note:
          "Product photo is explicitly titled \"5 INCH FPV TRAINING DRONE\" - the only FPV image in the library with an unambiguous size label, unlike A0004/fpv-training-kit.png which shows the same kit type with no size marking.",
        capturedAt: "2026-09-12",
      },
    ],
  },
  {
    id: "fpv-10",
    name: "10in FPV Training Drone",
    tagline: "FPV training drone",
    // No description - see the 5in entry's comment above; same Lorem ipsum
    // placeholder issue, same PRODUCT.md §4.3 exclusion.
    lifecycleStatus: "unknown",
    contentStatus: "provisional",
    variants: [
      {
        id: "fpv-10-standard",
        name: "10in FPV Training Drone",
        specVersions: [
          {
            id: "fpv-10-v1",
            status: "provisional",
            values: [
              { label: "Frame", value: "10in" },
              { label: "Motor", value: "2812 900KV" },
              { label: "Battery", value: "4S 5000 mAh" },
              { label: "Flight time", value: "15-20 min" },
            ],
            evidence: [
              {
                source: "research/references/legacy-site-content/page-kamikaze-racer-drones.md",
                capturedAt: "2026-09-09",
              },
            ],
          },
        ],
      },
    ],
    technologies: [],
    // The only other FPV kit photo in the library (A0004/fpv-training-kit.png)
    // shows the same kit type as the 5in entry's image with no size marking,
    // so it cannot be attributed to 10in specifically without guessing - still
    // not used, for that reason.
    //
    // PLACEHOLDER, added 2026-09-19 on explicit direction (draft review, not
    // a real asset): a generic FPV racing quad, chosen specifically for
    // having no visible brand markings (unlike most FPV stock photography,
    // which prominently shows third-party frame/camera brands). `isPlaceholder:
    // true` so it reads as temporary.
    media: [
      {
        type: "image",
        src: "/media/fpv-10-placeholder.webp",
        alt: "A custom-built FPV racing quadcopter with red propellers, hovering outdoors.",
        isPlaceholder: true,
        origin: "unknown",
        provenance: "Unsplash, downloaded 2026-09-19 as a draft placeholder - not a Nabhastra asset.",
        width: 1600,
        height: 1066,
      },
    ],
    evidence: [
      {
        source: "research/references/legacy-site-content/page-kamikaze-racer-drones.md",
        capturedAt: "2026-09-09",
      },
      {
        source: "research/references/asset-placement-audit.md",
        note: "No uncontested 10in-specific image exists in the library.",
        capturedAt: "2026-09-12",
      },
    ],
  },
  {
    id: "arjun",
    name: "ARJUN",
    tagline: "Beginner FPV training drone",
    // No description - Lorem ipsum placeholder on the legacy page, same
    // PRODUCT.md §4.3 exclusion as the two FPV trainers above.
    lifecycleStatus: "unknown",
    contentStatus: "provisional",
    variants: [
      {
        id: "arjun-standard",
        name: "ARJUN",
        specVersions: [
          {
            id: "arjun-v1",
            status: "provisional",
            values: [
              { label: "Frame", value: "350 mm" },
              { label: "Motor", value: "1000KV" },
              { label: "Battery", value: "3S 2200 mAh" },
              { label: "Flight time", value: "12-15 min" },
            ],
            evidence: [
              {
                source: "research/references/legacy-site-content/page-kamikaze-racer-drones.md",
                capturedAt: "2026-09-09",
              },
            ],
          },
        ],
      },
    ],
    technologies: [],
    // The only ARJUN image in the asset library (A0457/A0142__arjun.jpeg)
    // carries a visible "Grok" watermark - it's AI-generated promotional art,
    // not a photograph or CG render of a real unit. Per the same policy that
    // already excluded a self-declared AI-generated team photo elsewhere in
    // this project, it is not used here. See project/PRODUCT.md.
    //
    // PLACEHOLDER, added 2026-09-19 on explicit direction (draft review, not
    // a real asset): a small ducted "whoop"-class FPV drone, chosen for the
    // beginner-training framing this product carries and for having no
    // visible brand markings. `isPlaceholder: true` so it reads as temporary.
    media: [
      {
        type: "image",
        src: "/media/arjun-placeholder.webp",
        alt: "A small ducted FPV training quadcopter with propeller guards, on a plain background.",
        isPlaceholder: true,
        origin: "unknown",
        provenance: "Unsplash, downloaded 2026-09-19 as a draft placeholder - not a Nabhastra asset.",
        width: 1600,
        height: 1200,
      },
    ],
    evidence: [
      {
        source: "research/references/legacy-site-content/page-kamikaze-racer-drones.md",
        capturedAt: "2026-09-09",
      },
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return demoProducts.find((p) => p.id === id);
}
