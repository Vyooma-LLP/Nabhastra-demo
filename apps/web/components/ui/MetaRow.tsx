import type { ReactNode } from "react";

/**
 * Label over value with a hairline rule ABOVE the row - measured from
 * cards shape.png, where the rule sits above each spec line rather than
 * between them. The label is small bold uppercase; the value is larger and
 * regular. This inversion of the usual "Endurance: 4 hours" reading order is
 * what makes a spec block read as an engineering document.
 *
 * `context` is the data-honesty layer: specification provenance set as quiet
 * metadata beneath the value ("CURRENT PUBLIC SPEC", "LEGACY SPEC — SUPERSEDED")
 * rather than as a warning badge. Aerospace readers expect configuration
 * context; they do not expect defect notices.
 */
export function MetaRow({
  label,
  value,
  context,
  className = "",
}: {
  label: string;
  value: ReactNode;
  context?: string;
  className?: string;
}) {
  return (
    <div className={`border-t border-line pt-2 pb-4 ${className}`}>
      <dt className="font-mono text-meta-sm font-semibold tracking-nav uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-xl font-medium leading-tight text-pretty">{value}</dd>
      {context ? (
        <p className="mt-1 font-mono text-meta-sm tracking-meta text-paper-dim uppercase">
          {context}
        </p>
      ) : null}
    </div>
  );
}
