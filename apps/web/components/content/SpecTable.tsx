import type { SpecVersion } from "@/content/types";
import { MetaRow } from "@/components/ui/MetaRow";
import { specContextLabel } from "@/lib/spec";

/**
 * One spec sheet, in the engineering-document grammar measured from
 * `inspiration/cards shape.png`: label small and bold above, value larger
 * below, hairline rule above each row rather than between rows.
 *
 * When a variant has multiple SpecVersions (the "conflicting" case - e.g.
 * AKSHAY's three disagreeing sheets), the caller renders one SpecTable per
 * version rather than this component merging them - see
 * content/demo/products.ts and project/DESIGN.md §9.
 */
export function SpecTable({ specVersion }: { specVersion: SpecVersion }) {
  const context = specContextLabel(specVersion);

  return (
    <div className="border-t-2 border-line pt-4">
      <p className="mb-1 font-mono text-meta-sm tracking-nav text-paper-dim uppercase">
        {specVersion.effectiveUntil
          ? `Effective until ${specVersion.effectiveUntil}`
          : "Current"}
      </p>

      <dl>
        {specVersion.values.map((v) => (
          <MetaRow key={v.label} label={v.label} value={v.value} />
        ))}
      </dl>

      {context ? (
        <p className="mt-1 font-mono text-meta-sm tracking-meta text-paper-dim uppercase">
          {context}
        </p>
      ) : null}

      {specVersion.note ? (
        <p className="mt-4 border-t border-line pt-3 text-sm text-paper-dim">
          {specVersion.note}
        </p>
      ) : null}
    </div>
  );
}
