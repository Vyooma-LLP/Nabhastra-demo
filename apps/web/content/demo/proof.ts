import type { ProofItem } from "@/content/types";

/**
 * Evidence, and only evidence.
 *
 * EXPANDED 2026-09-18. This array held two items because two is how many
 * verifiable items existed in the *extracted legacy* record. Praneeth then
 * supplied eleven photographs from `project/asset-library/images/`, and every
 * one of them was opened and read before being written up here. That matters:
 * their filenames ("army demo", "aviation minister", "bvr 2") assert
 * relationships that a caption must not simply repeat. What follows describes
 * what is legible IN each frame - a banner, a nameplate, a ministry sign, a
 * uniform - and stops there.
 *
 * THE LINE THIS FILE HOLDS. Attendance is not endorsement. A demonstration is
 * not a deployment. A photograph with an official in it is not a contract, a
 * procurement or an approval. Several of these images would support a much
 * louder claim than the one written beside them, and that restraint is the
 * point: every line below survives someone checking it against the photograph.
 *
 * Still explicitly NOT proof, and still not listed:
 * - The three legacy testimonials. Reused verbatim across three pages and
 *   unverified (project/PRODUCT.md §4.4).
 * - DGCA compliance and NPNT. A regulatory claim on the live /faqs page that
 *   this project has not verified (PRODUCT.md §3, §5).
 * - The /r-d page. PRODUCT.md: "reads as aspirational positioning, not
 *   verified capability."
 * - The named team members. Roster unresolved, and one portrait is
 *   self-declared AI-generated. Note that `proof-techpioneer.jpg` DOES name two
 *   founders on its printed panel; that is recorded in its evidence note below
 *   but is deliberately not promoted into a team roster here, because one
 *   exhibition board is not a resolved roster.
 *
 * Provenance for all eleven: `project/asset-library/images/`, supplied by
 * Praneeth 2026-09-18. All are photographs, not renders.
 */
export const demoProof: ProofItem[] = [
  {
    id: "startup-techpioneer-recognition",
    category: "certification",
    title: "Startup TechPioneer Recognition, Intellectual Property Day 2026",
    // The most self-evidencing image in the set: the claim is printed in the
    // frame rather than asserted around it.
    detail:
      "Nabhastra Private Limited was featured in the Startup TechPioneer Recognitions at Intellectual Property Day 2026. The exhibition panel beside the company's name carries the IITM Incubation Cell mark.",
    status: "provisional",
    media: {
      type: "image",
      src: "/media/proof-techpioneer.jpg",
      alt: "Five people standing in front of a large printed backdrop reading Intellectual Property Day 2026, Startup TechPioneer Recognitions, Celebrating Deep-Tech Success, beside a panel headed Nabhastra Pvt. Ltd. and a poster introducing the ARJUN drone.",
      isPlaceholder: false,
      origin: "photograph",
      provenance: "project/asset-library/images/techpioneer.jpeg",
      width: 1448,
      height: 1000,
    },
    evidence: [
      {
        source: "project/asset-library/images/techpioneer.jpeg",
        note: "Text legible in frame: 'INTELLECTUAL PROPERTY DAY 2026 / STARTUP TECHPIONEER RECOGNITIONS / CELEBRATING DEEP-TECH SUCCESS'. The company panel reads 'Nabhastra Pvt. Ltd.' and describes 'indigenous AI-enabled UAVs for surveillance, heavy-lift logistics (up to 100 kg payload), and specialised spray drones across defence, disaster response, and agriculture', and names two founders. The IITM Incubation Cell logo appears on the same backdrop. The 100 kg payload figure and the founder names are recorded here as what the panel states; neither is promoted into a product spec or a team roster elsewhere in this project on the strength of one exhibition board.",
        capturedAt: "2026-09-18",
      },
    ],
  },

  {
    id: "civil-aviation-ministry-meeting",
    category: "institutional",
    title: "Ministry of Civil Aviation",
    // Deliberately not "met the Minister": the room is identifiable from its
    // signage, the individuals are not identifiable to this project.
    detail:
      "A meeting at the Ministry of Civil Aviation, identified by the ministry's nameplate and the national emblem on the wall behind the group.",
    status: "provisional",
    media: {
      type: "image",
      src: "/media/proof-aviation-minister.jpg",
      alt: "Six people standing together in a government office beneath the Indian national emblem and a wall sign reading, in Hindi and English, Ministry of Civil Aviation, flanked by Indian flags.",
      isPlaceholder: false,
      origin: "photograph",
      provenance: "project/asset-library/images/aviation minister.jpeg",
      width: 1500,
      height: 1000,
    },
    evidence: [
      {
        source: "project/asset-library/images/aviation minister.jpeg",
        note: "Wall signage legible in frame: 'नागर विमानन मंत्रालय / MINISTRY OF CIVIL AVIATION', with the State Emblem of India and framed portraits of the President and Prime Minister. The supplied filename asserts the Minister is present; no individual is captioned here because none is identifiable from the photograph alone. The room is the verifiable fact, not the roster.",
        capturedAt: "2026-09-18",
      },
    ],
  },

  {
    id: "army-field-demonstration",
    category: "field-validation",
    title: "Field demonstration to Indian Army personnel",
    detail:
      "An outdoor demonstration attended by uniformed Indian Army officers, with two Nabhastra airframes set out on camouflage-draped tables. A demonstration, not a deployment or a procurement.",
    status: "provisional",
    media: {
      type: "image",
      src: "/media/proof-army-demo.jpg",
      alt: "A group of uniformed Indian Army officers and civilians standing outdoors behind two multirotor drones displayed on camouflage-covered tables, under a camouflage net canopy.",
      isPlaceholder: false,
      origin: "photograph",
      provenance: "project/asset-library/images/army demo.jpeg",
      width: 1179,
      height: 835,
    },
    evidence: [
      {
        source: "project/asset-library/images/army demo.jpeg",
        note: "Indian Army combat uniforms, rank insignia and regimental headdress are clearly visible, as are two multirotor aircraft laid out for inspection. What the photograph establishes is that a demonstration took place before Army personnel. It does not establish a trial outcome, an evaluation result, an order or any service adoption, and the wording above is held to that limit.",
        capturedAt: "2026-09-18",
      },
    ],
  },

  {
    id: "heavy-lift-airframe-unveiling",
    category: "r-and-d",
    title: "Heavy-lift airframe on public display",
    detail:
      "A large carbon-tube heavy-lift multirotor airframe shown behind barriers to an assembled group of visitors at an indoor venue.",
    status: "provisional",
    media: {
      type: "image",
      src: "/media/proof-amtz-demo.webp",
      alt: "A large black carbon-tube multirotor airframe with orange-tipped propellers displayed behind red rope barriers, with a group of visitors standing around it inside a glass-walled building.",
      isPlaceholder: false,
      origin: "photograph",
      provenance: "project/asset-library/images/amtz demo.webp",
      width: 2560,
      height: 1703,
    },
    evidence: [
      {
        source: "project/asset-library/images/amtz demo.webp",
        note: "The airframe is a large multirotor built from carbon tube with a domed upper truss and high-power motors. It is described here only by what is visible in the frame. No payload, endurance or lift figure is claimed from a photograph, and the aircraft is not identified as a specific named product because no marking establishing that is legible at this resolution.",
        capturedAt: "2026-09-18",
      },
    ],
  },

  {
    id: "amtz-delegation",
    category: "institutional",
    title: "Delegation visit, AMTZ",
    detail:
      "A group photograph in an official reception room carrying the AMTZ mark and the national emblem.",
    status: "provisional",
    media: {
      type: "image",
      src: "/media/proof-amtz-panel.jpg",
      alt: "A large group of adults and one child standing for a formal photograph in a wood-panelled reception room, beneath the Indian national emblem with an AMTZ logo on the wall and Indian flags on either side.",
      isPlaceholder: false,
      origin: "photograph",
      provenance: "project/asset-library/images/amtz panel.jpeg",
      width: 1600,
      height: 1064,
    },
    evidence: [
      {
        source: "project/asset-library/images/amtz panel.jpeg",
        note: "The AMTZ logo and the State Emblem of India are both legible on the back wall. This corroborates the AMTZ association already recorded separately from the published contact address. No individual is named and no agreement is implied.",
        capturedAt: "2026-09-18",
      },
    ],
  },

  {
    id: "startup-arunachal-felicitation",
    category: "institutional",
    title: "Felicitation, Startup Arunachal Day 2026",
    // The banner carries date and venue, so both are quotable verbatim.
    detail:
      "A Nabhastra representative being felicitated at Startup Arunachal Day 2026, held on 23 January 2026 at the State Banquet Hall, Itanagar, as part of Innovation Month and the tenth anniversary of Startup India.",
    status: "provisional",
    media: {
      type: "image",
      src: "/media/proof-felicitation.jpg",
      alt: "Two men holding a gift basket between them for a photograph, one wearing a ceremonial white scarf, beside an event banner for Startup Arunachal Day 2026 at the State Banquet Hall, Itanagar.",
      isPlaceholder: false,
      origin: "photograph",
      provenance: "project/asset-library/images/falicitation.jpeg",
      width: 1500,
      height: 1000,
    },
    evidence: [
      {
        source: "project/asset-library/images/falicitation.jpeg",
        note: "Banner text legible in frame: 'Startup Arunachal Day 2026', 'As part of the Celebration of Innovation Month', 'Commemorating 10 Years of Startup India', '23rd January, 2026', 'Venue: State Banquet Hall, Itanagar', with the DPIIT #startupindia mark and an Arunachal Pradesh Innovation & Investment Park lockup. Date and venue are quoted from the banner rather than inferred.",
        capturedAt: "2026-09-18",
      },
    ],
  },

  // REMOVED 2026-09-18 on Praneeth's instruction: `col conference.jpeg`, which
  // carried the "Session seating, Startup Arunachal Day 2026" item. It was the
  // weakest of the three frames from that event - a placarded empty-ish seat
  // row evidences the least of the set - and dropping it takes the wall to ten
  // photographs. The other two Arunachal frames remain.

  {
    id: "startup-arunachal-front-row",
    category: "institutional",
    title: "Front row, Startup Arunachal Day 2026",
    detail:
      "A Nabhastra representative seated in the front row at the same event, beside other invited guests.",
    status: "provisional",
    media: {
      type: "image",
      src: "/media/proof-col-1.jpg",
      alt: "Two men seated side by side in red upholstered front-row chairs at a conference, with a full audience seated behind them.",
      isPlaceholder: false,
      origin: "photograph",
      provenance: "project/asset-library/images/col 1.jpeg",
      width: 1600,
      height: 1066,
    },
    evidence: [
      {
        source: "project/asset-library/images/col 1.jpeg",
        note: "One subject also appears in `falicitation.jpeg` receiving the felicitation, which is what ties this frame to Nabhastra and to Startup Arunachal Day 2026. Neighbouring guests are not named here, because seating adjacency is not a relationship.",
        capturedAt: "2026-09-18",
      },
    ],
  },

  {
    id: "ncc-drone-competition",
    category: "institutional",
    title: "Inter-battalion drone competition, 71 UP Battalion NCC",
    detail:
      "An instructional session at an inter-battalion drone competition hosted for 71 UP Battalion NCC cadets, with several airframes laid out for demonstration.",
    status: "provisional",
    media: {
      type: "image",
      src: "/media/proof-training-workshop.webp",
      alt: "A man holding a small quadcopter addresses a large seated group of NCC cadets in uniform on a field, with more drones displayed on a table beside him and a welcome board reading 71 UP BN NCC, Inter BN Drone Competition.",
      isPlaceholder: false,
      origin: "photograph",
      provenance: "project/asset-library/images/training workshop.webp",
      width: 2560,
      height: 1440,
    },
    evidence: [
      {
        source: "project/asset-library/images/training workshop.webp",
        note: "Board text legible in frame: '71 UP BN NCC', 'WELCOME', 'INTER BN DRONE COMPETITION'. Cadet uniforms carry NCC shoulder flashes. The audience size is visible and substantial; no attendance figure is given because none can be counted reliably from the frame.",
        capturedAt: "2026-09-18",
      },
    ],
  },

  {
    id: "facility-spray-platform-review",
    category: "r-and-d",
    title: "Spray platform review at the workshop",
    detail:
      "Visitors with a spray platform and its transit case inside a working assembly and test space.",
    status: "provisional",
    media: {
      type: "image",
      src: "/media/proof-bvr.jpg",
      alt: "Seven people standing beside a multirotor spray drone resting on a large black wheeled flight case, inside a workshop with shelving and equipment trays along the walls.",
      isPlaceholder: false,
      origin: "photograph",
      provenance: "project/asset-library/images/bvr 2.jpeg",
      width: 1600,
      height: 1200,
    },
    evidence: [
      {
        source: "project/asset-library/images/bvr 2.jpeg",
        note: "The room reads as a working assembly and test space: parts shelving, stacked component trays, workbenches and a wheeled transit case. The supplied filename abbreviates 'BVR', which would denote beyond-visual-range operation; nothing in the frame evidences a BVR capability or flight, so no such claim is made and the title avoids the term.",
        capturedAt: "2026-09-18",
      },
    ],
  },

  {
    id: "aditya-university-visit",
    category: "institutional",
    title: "Industrial visit, Aditya University",
    // Corrected 2026-09-09 after inspecting the source photo directly: the
    // visible banner reads "Aditya University Industrial Visit — School of
    // Pharmacy", not engineering, and the object held by the man at front is
    // a handheld camera or gimbal rig, not verifiably a Nabhastra drone - no
    // Nabhastra branding is visible on it at this resolution. The earlier
    // draft asserted both details without that check. Describing only what
    // the photograph actually shows.
    detail:
      "A group photograph from an institutional visit hosted by Nabhastra, identified by an on-site banner as an Aditya University, School of Pharmacy industrial visit.",
    status: "provisional",
    media: {
      type: "image",
      src: "/media/proof-aditya-university-visit.jpg",
      alt: "A large group of students in white coats and a few staff, standing behind a banner reading Aditya University Industrial Visit, School of Pharmacy, in front of a globe sculpture.",
      isPlaceholder: false,
      origin: "photograph",
      provenance:
        "nabhastra present/wp-content/uploads/2026/04/a1c7aea5-ff3a-40dd-b557-c89c0bf5ecdf.jpg",
      width: 1600,
      height: 1200,
    },
    evidence: [
      {
        source:
          "nabhastra present/wp-content/uploads/2026/04/a1c7aea5-ff3a-40dd-b557-c89c0bf5ecdf.jpg",
        note: "Photograph, not a render — one of very few genuine photographs in the legacy asset set. The banner text is the only verifiable detail; the specific object held by the man at front is not clearly identifiable as Nabhastra equipment at this resolution and is not claimed as one.",
        capturedAt: "2026-09-09",
      },
    ],
  },

  {
    id: "amtz-campus",
    category: "institutional",
    title: "AMTZ Campus, Visakhapatnam",
    detail:
      "Nabhastra operates from the Andhra Pradesh MedTech Zone campus in Visakhapatnam, Andhra Pradesh.",
    status: "provisional",
    evidence: [
      {
        source: "research/references/legacy-site-content/page-contact.md",
        note: "Registered address as published on the live contact page.",
        capturedAt: "2026-09-09",
      },
    ],
  },
];

/** Categories that actually hold evidence. Drives what the UI renders. */
export function getPopulatedProofCategories(): string[] {
  return [...new Set(demoProof.map((p) => p.category))];
}
