import Image from "next/image";
import type { Metadata } from "next";
import { Factory, Cpu, SlidersHorizontal, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { MakeInIndiaMark } from "@/components/ui/MakeInIndiaMark";
import { TechnicalButton } from "@/components/ui/TechnicalButton";
import { LogoCloud } from "@/components/ui/logo-cloud-2";
import { ProofSection } from "@/components/sections/ProofSection";

/**
 * INSTITUTIONAL AFFILIATIONS, added 2026-09-19, originally as a `Marquee`
 * strip of just AMTZ + IITM (the other five candidates - ajashy,
 * "nautical wings aerospace", ncc, neosky, yaanendriya - were reviewed and
 * excluded per research/references/asset-placement-audit.md: three are
 * unrelated third-party companies with no confirmed Nabhastra connection,
 * ncc is the official NCC government crest with no confirmed legal
 * clearance to display it, and neosky's partner status was never
 * confirmed). All seven are shown now regardless, on later explicit
 * direction accepting that risk - see `logo-cloud-2.tsx`'s own doc comment,
 * which replaced the `Marquee` version entirely, for the full list and the
 * component itself.
 */

export const metadata: Metadata = {
  title: "Company",
  description: "Nabhastra Private Limited — indigenous aerial systems, engineered in India.",
};

/**
 * TEAM ROSTER, added 2026-09-19 on explicit direction (Praneeth), superseding
 * the earlier "deliberately does not include a team page" stance this file
 * carried (project/PRODUCT.md §5 flagged the roster as unresolved; one
 * candidate photo was self-declared AI-generated). Both blockers are cleared
 * here specifically, not by re-deriving trust from the legacy site:
 *
 *   - Titles are the CLIENT-CONFIRMED roster (PRODUCT.md §5, the block that
 *     supersedes the legacy `/about` one), not the legacy titles - Anjali
 *     Verma is "Managing Director" (legacy called her "Founder & Managing
 *     Director"; "Founder" was explicitly dropped in the confirmed update).
 *   - Photos (all `.webp`, converted from the source stills for file size):
 *     `team-ramakrishna` replaces the earlier AI-generated candidate with a
 *     real photo supplied directly for this purpose. `team-chauhan` is a
 *     face-only crop out of the group photo `falicitation.jpeg` (identity
 *     confirmed directly, not inferred; first pass kept too much of the
 *     surrounding scene, corrected 2026-09-19 to match the other three
 *     photos' headshot framing). `team-anjali-verma` and
 *     `team-yogender-singh` are used as supplied and confirmed.
 *
 * FOUNDER'S MESSAGE AND VALUES, reinstated 2026-09-19 from the legacy
 * `/about` page (research/references/legacy-site-content/page-about.md),
 * word-for-word. Deliberately left UNSIGNED even now that the roster above
 * exists: the legacy page itself never attached a name to this quote inline
 * either (its heading is "Founder's Message"; the byline lives only in the
 * separate team section, which no longer applies here since "Founder" isn't
 * Anjali Verma's confirmed current title). Attributing it to her by name
 * would assert a title the confirmed roster deliberately dropped.
 *
 * WHY NABHASTRA, reinstated 2026-09-19 from the legacy `/home` page's
 * four-bullet list, with ONE deliberate rewording: legacy's fourth bullet
 * was "Secure & Compliant Architecture," which on the legacy site sat right
 * next to (and was seemingly shorthand for) the DGCA/NPNT regulatory
 * compliance claim this project's client confirmed removing entirely
 * (PRODUCT.md §3, Q3 - see the FAQ page's own comment for the same call on
 * a different page). Reusing that exact phrase here would resurrect the
 * same claim through a different door. Reworded to "Secure Systems
 * Architecture," which keeps the true, uncontested part (encrypted comms,
 * hardened flight-controller firmware - both already asserted as
 * Technology entries) without the regulatory-compliance implication.
 */
const TEAM = [
  {
    name: "Col Lakshyajeet Singh Chauhan (Retd)",
    role: "Chairman & CEO",
    photo: "/media/team-chauhan.webp",
  },
  {
    name: "Anjali Verma",
    role: "Managing Director",
    photo: "/media/team-anjali-verma.webp",
  },
  {
    name: "Prof. P.A. Ramakrishna",
    role: "Tech Advisor and Mentor",
    photo: "/media/team-ramakrishna.webp",
  },
  {
    name: "Maj Gen Yogender Singh, VSM (Retd)",
    role: "Strategic Advisor & Mentor",
    photo: "/media/team-yogender-singh.webp",
  },
];
export default function CompanyPage() {
  return (
    <SiteHeader>
      <main>
        <section className="border-b border-line py-(--spacing-section-sm)">
          <div className="mx-auto max-w-(--container-editorial) px-6">
            <SectionLabel>Company</SectionLabel>
            <EditorialHeading as="h1" level="xl" className="mt-5 max-w-[18ch]">
              Nabhastra Private Limited
            </EditorialHeading>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-paper-dim text-pretty">
              An Indian aerial systems company designing and building
              surveillance, VTOL, sensing and agricultural platforms.
            </p>

            {/* The mark sits directly under the sentence it supports, not in a
                badge rail of its own. See MakeInIndiaMark's doc comment. */}
            <MakeInIndiaMark className="mt-10" />
          </div>
        </section>

        <section className="on-paper border-b border-line py-(--spacing-section-sm)">
          <div className="mx-auto grid max-w-(--container-editorial) gap-12 px-6 lg:grid-cols-2">
            <div>
              <p className="font-mono text-meta-sm tracking-nav uppercase opacity-60">
                Mission
              </p>
              <p className="mt-3 max-w-[42ch] text-lg leading-relaxed text-pretty">
                To empower industries and institutions with intelligent aerial
                systems that drive efficiency, safety and data-driven
                decision-making.
              </p>
            </div>
            <div>
              <p className="font-mono text-meta-sm tracking-nav uppercase opacity-60">
                Vision
              </p>
              <p className="mt-3 max-w-[42ch] text-lg leading-relaxed text-pretty">
                To establish India as a global leader in drone technology
                through innovation, precision engineering and scalable
                solutions.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-line py-(--spacing-section-sm)">
          <div className="mx-auto max-w-(--container-editorial) px-6">
            {/* Two columns so the quote isn't stranded in the left 45% with a
                dead black half beside it. The oversized quote mark is the
                same "one large typographic gesture" device the footer's ghost
                wordmark uses, scoped to this section. */}
            <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:items-start lg:gap-16">
              <div>
                <p className="font-mono text-meta-sm tracking-nav uppercase opacity-60">
                  Founder&apos;s Message
                </p>
                <p className="mt-3 max-w-[54ch] text-xl leading-relaxed text-pretty">
                  &ldquo;At Nabhastra, we are not just building drones&mdash;we
                  are building the future of intelligent aviation in India. Our
                  focus is on creating technology that solves real-world
                  challenges while positioning India at the forefront of global
                  innovation.&rdquo;
                </p>
              </div>

              <p
                aria-hidden
                className="hidden select-none font-(family-name:--font-display) text-[12rem] leading-[0.7] text-paper/10 lg:block lg:text-right"
              >
                &rdquo;
              </p>
            </div>

            <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Innovation", "with purpose"],
                ["Reliability", "in every mission"],
                ["Commitment", "to national growth"],
                ["Excellence", "in execution"],
              ].map(([term, description]) => (
                <div key={term} className="border-t border-line pt-4">
                  <dt className="font-(family-name:--font-display) text-xl font-normal">
                    {term}
                  </dt>
                  <dd className="mt-2 text-base leading-relaxed text-paper-dim">
                    {description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="border-b border-line py-(--spacing-section-sm)">
          <div className="mx-auto max-w-(--container-editorial) px-6">
            <p className="font-mono text-meta-sm tracking-nav uppercase opacity-60">
              Why Nabhastra
            </p>
            <ul className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {[
                { label: "Indigenous technology", Icon: Factory },
                { label: "AI-driven intelligence systems", Icon: Cpu },
                { label: "Customizable drone platforms", Icon: SlidersHorizontal },
                { label: "Secure systems architecture", Icon: ShieldCheck },
              ].map(({ label, Icon }) => (
                <li key={label} className="flex items-center gap-3 border-t border-line pt-4 text-lg">
                  <Icon aria-hidden className="size-5 shrink-0 text-signal" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="on-paper border-b border-line py-(--spacing-section-sm)">
          <div className="mx-auto max-w-(--container-editorial) px-6">
            <SectionLabel>Team</SectionLabel>
            <EditorialHeading level="md" className="mt-5 max-w-[20ch]">
              Who runs Nabhastra.
            </EditorialHeading>

            <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {TEAM.map((member) => (
                <li key={member.name}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-4 font-(family-name:--font-display) text-lg font-normal leading-snug">
                    {member.name}
                  </p>
                  <p className="mt-1 font-mono text-meta-sm tracking-nav text-paper-dim uppercase">
                    {member.role}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* New section (explicit direction, 2026-09-20: "create a new
            section after who runs nabhastra... partners & collaborations
            section, some content about these in short in one line"), with
            `LogoCloud` beside the heading (explicit direction, 2026-09-20:
            "beside the heading only... just like you have put beside the
            who owns nabhastra heading") - same two-column pattern the Team
            section used before `LogoCloud` moved out of it into this
            section. */}
        <section className="border-b border-line py-(--spacing-section-sm)">
          <div className="mx-auto max-w-(--container-editorial) px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <SectionLabel>Partners & Collaborations</SectionLabel>
                <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-paper-dim text-pretty">
                  Institutions and organisations Nabhastra works and builds
                  with.
                </p>
              </div>

              <div className="logo-cloud-scope">
                <LogoCloud />
              </div>
            </div>
          </div>
        </section>

        <ProofSection mode="full" />

        <section className="py-(--spacing-section-sm)">
          <div className="mx-auto max-w-(--container-editorial) px-6">
            <EditorialHeading level="md" className="max-w-[24ch]">
              Talk to Nabhastra about a system.
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
