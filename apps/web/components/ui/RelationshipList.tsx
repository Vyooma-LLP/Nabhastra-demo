import Link from "next/link";

/**
 * The graph link cluster. This is the component that makes the site behave
 * like a knowledge graph without drawing one: every system page names the
 * technologies and related systems it connects to, and every one of those is
 * a way further in rather than a label.
 *
 * The `data-rel` attribute tags each link with the entity it points at, so a
 * later hover-illumination pass can light up every connected node from CSS
 * alone, with no client JavaScript and no diagram.
 *
 * Colour (DESIGN.md §3.1a, added 2026-09-10): brand green, not signal coral.
 * This list *is* "selected system relationship" - the concrete case §3.1a
 * names for green - so it must not compete with coral's interaction role.
 */
export type RelationshipItem = {
  id: string;
  name: string;
  href: string;
  note?: string;
};

export function RelationshipList({
  label,
  items,
  emptyNote,
  focusable = true,
}: {
  label: string;
  items: RelationshipItem[];
  emptyNote?: string;
  /** Set false when rendered inside a closed disclosure (e.g. RevealCard's
   *  collapsed panel) so these links drop out of tab order along with it.
   *  Uses tabIndex, not `inert`: Chromium does not reliably honour a
   *  dynamically toggled `inert` for sequential Tab navigation even though
   *  the element is still programmatically focusable - confirmed by testing
   *  the actual keyboard path in RevealCard, not just assuming the attribute
   *  works. tabIndex has no such quirk. */
  focusable?: boolean;
}) {
  return (
    <div className="border-t border-line pt-3">
      <p className="font-mono text-meta-sm tracking-nav text-paper-dim uppercase">
        {label}
      </p>

      {items.length === 0 ? (
        <p className="mt-3 text-sm text-paper-dim">
          {emptyNote ?? "Not yet published."}
        </p>
      ) : (
        <ul className="mt-3 flex flex-col">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                data-rel={item.id}
                tabIndex={focusable ? undefined : -1}
                aria-hidden={focusable ? undefined : true}
                className="group flex items-baseline justify-between gap-4 border-b border-line/60 py-2 transition-colors duration-(--duration-fast) hover:border-brand"
              >
                <span className="text-base transition-colors duration-(--duration-fast) group-hover:text-brand">
                  {item.name}
                </span>
                {item.note ? (
                  <span className="font-mono text-meta-sm tracking-meta text-paper-dim uppercase">
                    {item.note}
                  </span>
                ) : null}
                <span
                  aria-hidden
                  className="text-paper-dim transition-transform duration-(--duration-fast) ease-(--ease-signal) group-hover:translate-x-1 group-hover:text-brand"
                >
                  &#8594;
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
