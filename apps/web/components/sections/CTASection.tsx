import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { TechnicalButton } from "@/components/ui/TechnicalButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MakeInIndiaMark } from "@/components/ui/MakeInIndiaMark";

/**
 * PROOF -> CONTACT. Final step. No form is built yet - there is no backend to
 * receive it in this vertical slice - so this is a real, working contact
 * surface (phone and email, sourced from the verified legacy contact page)
 * rather than a form that would silently fail.
 */
export function CTASection() {
  return (
    <section
      id="contact"
      className="py-(--spacing-section-sm) lg:py-(--spacing-section)"
    >
      <div className="mx-auto max-w-(--container-editorial) px-6">
        <SectionLabel index="04">Contact</SectionLabel>
        <EditorialHeading level="lg" className="mt-5 max-w-[20ch]">
          Talk to Nabhastra about a system.
        </EditorialHeading>
        <p className="mt-6 max-w-[50ch] text-lg leading-relaxed text-paper-dim text-pretty">
          Request a briefing on a specific system, or reach the team directly.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
          <TechnicalButton href="mailto:nabhastra@gmail.com" variant="signal">
            Request a briefing
          </TechnicalButton>
          <a
            href="tel:+919815968889"
            className="font-mono text-meta tracking-nav uppercase text-paper-dim hover:text-paper"
          >
            +91 98159 68889
          </a>
        </div>

        <div className="mt-10 flex flex-col gap-8 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[50ch] font-mono text-meta-sm tracking-nav text-paper-dim uppercase">
            AMTZ Campus, Siddeswaram, Nadupuru Reserve Forest, Visakhapatnam,
            Andhra Pradesh
          </p>

          {/* Closing credential, opposite the registered address - the two
              facts that place the company answer the same question. */}
          <MakeInIndiaMark className="shrink-0" />
        </div>
      </div>
    </section>
  );
}
