import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { TechnologySection } from "@/components/sections/TechnologySection";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "The control, sensing and communications stack behind Nabhastra's aerial systems.",
};

export default function TechnologyPage() {
  return (
    <SiteHeader>
      <main>
        <section className="border-b border-line py-(--spacing-section-sm)">
          <div className="mx-auto max-w-(--container-editorial) px-6">
            <SectionLabel>Technology</SectionLabel>
            <EditorialHeading as="h1" level="xl" className="mt-5 max-w-[20ch]">
              The stack, not the airframe.
            </EditorialHeading>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-paper-dim text-pretty">
              Every capability below is carried by at least one platform.
              Follow a link to see it in that system&apos;s specifications.
            </p>
          </div>
        </section>

        <TechnologySection />
      </main>
      <SiteFooter />
    </SiteHeader>
  );
}
