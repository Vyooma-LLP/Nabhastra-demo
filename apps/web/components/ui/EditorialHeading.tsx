import type { ElementType, ReactNode } from "react";

/**
 * The display scale and its tracking relationships in one place, so no page
 * hardcodes a size step. Tracking tightens as the size grows, which is what
 * gives the reference headlines their architectural weight without a display
 * face - the type is engineered, never futuristic.
 *
 * Weight is regular (400), not medium - measured against the live shield.ai
 * (2026-09-09 fidelity audit): every sampled H1/H2 there is font-weight 400.
 * The medium weight this shipped with read heavier and more SaaS-confident
 * than the reference's restraint.
 */
type Level = "xl" | "lg" | "md" | "sm";

const SIZE: Record<Level, string> = {
  xl: "text-display-md sm:text-display-lg lg:text-display-xl tracking-[-0.03em] leading-[0.92]",
  lg: "text-display-sm sm:text-display-md lg:text-display-lg tracking-[-0.025em] leading-[0.98]",
  md: "text-2xl sm:text-display-sm lg:text-display-md tracking-[-0.02em] leading-[1.05]",
  sm: "text-xl sm:text-2xl tracking-[-0.01em] leading-[1.15]",
};

export function EditorialHeading({
  as: Tag = "h2",
  level = "lg",
  children,
  className = "",
}: {
  as?: ElementType;
  level?: Level;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Tag
      className={`font-(family-name:--font-display) font-normal text-balance ${SIZE[level]} ${className}`}
    >
      {children}
    </Tag>
  );
}
