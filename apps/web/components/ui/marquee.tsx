// VENDORED THIRD-PARTY COMPONENT - `magicui/marquee` (dillionverma) via
// 21st.dev, MIT licensed, installed 2026-09-19. Treat this file as upstream
// source: keep edits minimal and listed here so a future re-install can be
// diffed rather than guessed at.
//
// ONE EDIT: none to this file itself. The animation it depends on
// (`animate-marquee`, `animate-marquee-vertical`) is upstream's own
// `tailwind.config.js` snippet, translated to this project's Tailwind v4
// CSS-based config instead of a JS config file this project doesn't have -
// see the `@keyframes marquee` / `--animate-marquee` block in globals.css.
// The component code itself is byte-identical to upstream.
import { cn } from "@/lib/utils";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: unknown;
}

export function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
