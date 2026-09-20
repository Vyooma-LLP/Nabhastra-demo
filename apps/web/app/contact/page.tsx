import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { TechnicalButton } from "@/components/ui/TechnicalButton";
import { demoProducts } from "@/content/demo/products";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Nabhastra to discuss a system or request a briefing.",
};

/**
 * No form is built in this vertical slice - there is no backend to receive
 * one, and a form that silently fails is worse than none. Every contact
 * method below is real and sourced from the verified legacy contact page
 * (research/references/legacy-site-content/page-contact.md).
 */
export default function ContactPage() {
  return (
    <SiteHeader>
      <main>
        <section className="border-b border-line py-(--spacing-section-sm)">
          <div className="mx-auto max-w-(--container-editorial) px-6">
            <SectionLabel>Contact</SectionLabel>
            <EditorialHeading as="h1" level="xl" className="mt-5 max-w-[18ch]">
              Talk to Nabhastra.
            </EditorialHeading>
          </div>
        </section>

        <section className="py-(--spacing-section-sm)">
          <div className="mx-auto grid max-w-(--container-editorial) gap-16 px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
            <div>
              <dl className="space-y-8 border-t border-line pt-6">
                <div>
                  <dt className="font-mono text-meta-sm tracking-nav text-paper-dim uppercase">
                    Phone
                  </dt>
                  <dd className="mt-2">
                    <a
                      href="tel:+919815968889"
                      className="text-2xl hover:text-signal"
                    >
                      +91 98159 68889
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-meta-sm tracking-nav text-paper-dim uppercase">
                    Email
                  </dt>
                  <dd className="mt-2">
                    <a
                      href="mailto:nabhastra@gmail.com"
                      className="text-2xl hover:text-signal"
                    >
                      nabhastra@gmail.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-meta-sm tracking-nav text-paper-dim uppercase">
                    Address
                  </dt>
                  <dd className="mt-2 max-w-[32ch] text-lg leading-relaxed">
                    AMTZ Campus, Siddeswaram, Nadupuru Reserve Forest,
                    Visakhapatnam, Andhra Pradesh, India
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <p className="font-mono text-meta-sm tracking-nav uppercase opacity-60">
                Request a briefing on a specific system
              </p>
              <ul className="mt-4 flex flex-wrap gap-4 border-t border-line pt-6">
                {demoProducts.map((p) => (
                  <li key={p.id}>
                    <TechnicalButton
                      href={`mailto:nabhastra@gmail.com?subject=${encodeURIComponent(
                        `Briefing request — ${p.name}`,
                      )}`}
                    >
                      {p.name}
                    </TechnicalButton>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </SiteHeader>
  );
}
