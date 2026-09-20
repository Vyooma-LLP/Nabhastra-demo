import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { SystemCard } from "@/components/content/SystemCard";
import { demoProducts } from "@/content/demo/products";

export const metadata: Metadata = {
  title: "Systems",
  description:
    "Nabhastra's aerial platforms: surveillance, VTOL, sensing and agricultural systems.",
};

export default function SystemsPage() {
  return (
    <SiteHeader>
      <main>
        <section className="border-b border-line py-(--spacing-section-sm)">
          <div className="mx-auto max-w-(--container-editorial) px-6">
            <SectionLabel>Systems</SectionLabel>
            <EditorialHeading as="h1" level="xl" className="mt-5 max-w-[18ch]">
              Every platform, one dossier each.
            </EditorialHeading>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-paper-dim text-pretty">
              Open a system to see its specifications, the technology it
              carries, and the systems it connects to.
            </p>
          </div>
        </section>

        <section className="py-(--spacing-section-sm)">
          <div className="mx-auto max-w-(--container-editorial) px-6">
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {demoProducts.map((product) => (
                <li key={product.id}>
                  <SystemCard product={product} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </SiteHeader>
  );
}
