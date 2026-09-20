/**
 * The tick ruler and rotated margin micro-labels that frame the aircraft in
 * "drone bigger picture.jpeg" and "brand endorsment or hero image.png".
 *
 * Technical density is variable: this is inspection furniture, so it belongs
 * around an aircraft or a sensor frame and nowhere near an editorial moment.
 * Every mark carries a scale; none of it is decorative telemetry.
 */
export function EdgeRuler({
  ticks = 24,
  className = "",
}: {
  ticks?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none w-full text-line ${className}`}
      height="10"
      preserveAspectRatio="none"
      viewBox={`0 0 ${ticks * 10} 10`}
    >
      {Array.from({ length: ticks + 1 }, (_, i) => (
        <line
          key={i}
          x1={i * 10}
          x2={i * 10}
          y1={0}
          y2={i % 5 === 0 ? 10 : 5}
          stroke="currentColor"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

/**
 * A single rotated label pinned to a frame edge. Reads as a stencil on the
 * side of a shipping case rather than as a HUD element.
 */
export function MarginLabel({
  children,
  side = "left",
  className = "",
}: {
  children: string;
  side?: "left" | "right";
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`absolute top-1/2 font-mono text-meta-sm tracking-nav whitespace-nowrap text-paper-dim/60 uppercase ${
        side === "left" ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"
      } ${className}`}
      style={{
        writingMode: "vertical-rl",
        transform: `translateY(-50%) rotate(${side === "left" ? 180 : 0}deg)`,
      }}
    >
      {children}
    </span>
  );
}
