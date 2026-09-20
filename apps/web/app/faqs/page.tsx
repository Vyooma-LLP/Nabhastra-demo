import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { TechnicalButton } from "@/components/ui/TechnicalButton";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers about Nabhastra's aerial systems, capabilities and support.",
};

/**
 * Reinstated 2026-09-19 from the legacy `/faqs` page
 * (research/references/legacy-site-content/page-faqs.md), which the
 * project's own reconciliation pass calls out as the one page that is
 * genuinely real, non-contaminated content with nowhere to live in this
 * rebuild - see research/references/legacy-site-reconciliation.md §12,
 * doubt #11. Not a verbatim copy of every answer, for two reasons:
 *
 *   1. DROPPED ENTIRELY: "Are your drones DGCA compliant? ... align with
 *      DGCA regulations and NPNT requirements." This exact claim was
 *      client-confirmed for removal elsewhere in the project (PRODUCT.md §3,
 *      Q3) as an unverified regulatory claim. Reinstating this page is not
 *      licence to bring it back through a different door.
 *   2. REWORDED: "Is your technology made in India?" - the legacy answer
 *      claims formal alignment with the "Make in India" government
 *      initiative, which the asset-placement audit and reconciliation pass
 *      both flag as an unverified affiliation (badge assets withheld
 *      pending confirmation - see legacy-site-reconciliation.md §9). The
 *      answer here keeps the true, uncontested part - Nabhastra designs and
 *      manufactures in India, which the rest of this site already asserts -
 *      without the unverified campaign-affiliation claim.
 *
 * Everything else below is carried forward as published.
 */

const SECTIONS: { label: string; items: { q: string; a: string }[] }[] = [
  {
    label: "General",
    items: [
      {
        q: "What is Nabhastra?",
        a: "Nabhastra Private Limited is a next-generation drone technology company specializing in advanced UAV solutions for defense, agriculture, surveillance, and industrial applications.",
      },
      {
        q: "What industries do you serve?",
        a: "We serve defense, agriculture, infrastructure, mining, disaster management, and enterprise sectors.",
      },
      {
        q: "What makes Nabhastra unique?",
        a: "Indigenous manufacturing, AI-enabled systems, customizable payloads, and enterprise-grade reliability.",
      },
    ],
  },
  {
    label: "Product & Technology",
    items: [
      {
        q: "What types of drones do you manufacture?",
        a: "We design multi-rotor, fixed-wing, and hybrid UAV systems tailored for different mission requirements.",
      },
      {
        q: "Can drones be customized?",
        a: "Yes, we offer mission-specific customization including payload integration, endurance optimization, and software configuration.",
      },
      {
        q: "What is the flight time range?",
        a: "Depending on the model, flight time ranges from 30 minutes to several hours.",
      },
    ],
  },
  {
    label: "Services & Support",
    items: [
      {
        q: "Do you provide training?",
        a: "Yes, we offer certified training programs covering operations, safety, and analytics.",
      },
      {
        q: "What support do you provide post-purchase?",
        a: "End-to-end lifecycle support including maintenance, servicing, and upgrades.",
      },
      {
        q: "How can I request a demo?",
        a: "You can submit a request via our website or contact our sales team for a live demonstration.",
      },
    ],
  },
  {
    label: "Government & Defense",
    items: [
      {
        q: "Are your drones suitable for defense use?",
        a: "Yes, our UAVs are designed for surveillance, reconnaissance, and mission-critical operations.",
      },
      {
        q: "Do you participate in government tenders?",
        a: "Yes, we actively engage in government and defense procurement programs.",
      },
      {
        q: "Is your technology made in India?",
        a: "Yes — Nabhastra's platforms are designed and manufactured in India.",
      },
      {
        q: "Can you handle large-scale deployments?",
        a: "Yes, we have the capability to execute large-scale, multi-location deployments with training and support.",
      },
    ],
  },
  // Deliberately LAST and deliberately one item: in a two-column grid the
  // section order decides the column balance, and this is the only short
  // section. Sitting anywhere else it left a tall dead gap beside its
  // partner column; last, it spans the full width (see `col-span-2` below)
  // and reads as a closing note rather than a stub.
  {
    label: "Compliance & Safety",
    items: [
      {
        q: "Are your systems secure?",
        a: "We implement high-grade encryption and secure communication protocols for sensitive operations.",
      },
    ],
  },
];

export default function FaqsPage() {
  return (
    <SiteHeader>
      <main>
        <section className="border-b border-line py-(--spacing-section-sm)">
          <div className="mx-auto max-w-(--container-editorial) px-6">
            <SectionLabel>FAQs</SectionLabel>
            <EditorialHeading as="h1" level="xl" className="mt-5 max-w-[18ch]">
              Answers, before you ask.
            </EditorialHeading>
          </div>
        </section>

        <section className="py-(--spacing-section-sm)">
          <div className="mx-auto max-w-(--container-editorial) px-6">
            <div className="grid gap-x-16 gap-y-12 lg:grid-cols-2">
              {SECTIONS.map((section, i) => (
                <div
                  key={section.label}
                  className={
                    // An odd final section would otherwise leave a half-empty
                    // last row; span it instead.
                    i === SECTIONS.length - 1 && SECTIONS.length % 2 === 1
                      ? "lg:col-span-2"
                      : undefined
                  }
                >
                  <SectionLabel index={String(i + 1).padStart(2, "0")}>
                    {section.label}
                  </SectionLabel>
                  <dl className="mt-6 space-y-1">
                    {section.items.map((item) => (
                      <details
                        key={item.q}
                        className="group border-t border-line py-4"
                      >
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg leading-snug marker:content-none">
                          {item.q}
                          <span
                            aria-hidden
                            className="mt-1 shrink-0 font-mono text-meta text-paper-dim transition-transform duration-(--duration-fast) group-open:rotate-45"
                          >
                            +
                          </span>
                        </summary>
                        <dd className="mt-3 max-w-[60ch] text-base leading-relaxed text-paper-dim text-pretty">
                          {item.a}
                        </dd>
                      </details>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line py-(--spacing-section-sm)">
          <div className="mx-auto max-w-(--container-editorial) px-6">
            <EditorialHeading level="md" className="max-w-[24ch]">
              Still have questions?
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
