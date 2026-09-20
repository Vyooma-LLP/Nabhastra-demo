import Link from "next/link";

/**
 * Verified against research/references/legacy-site-content/navigation-menu.md
 * - this is the live site's real primary nav, kept as the baseline IA per
 * AGENTS.md ("routes finalized after content/SEO validation" - until that
 * happens, we don't invent a different nav structure).
 */
const PRIMARY_LINKS = [
  { href: "/", label: "Home" },
  { href: "/systems", label: "Systems" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur">
      <nav className="mx-auto flex max-w-(--container-editorial) items-center justify-between px-6 py-4">
        <Link href="/" className="font-mono text-meta tracking-meta uppercase">
          Nabhastra
        </Link>
        <ul className="flex gap-6">
          {PRIMARY_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-mono text-meta tracking-meta text-paper-dim uppercase hover:text-paper"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
