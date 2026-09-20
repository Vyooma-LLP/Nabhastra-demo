"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * The one scroll-driven signature moment for PROOF (DESIGN.md, Phase 2.6):
 * a cluster of real-world evidence images that separates into an asymmetric
 * editorial composition as the visitor scrolls, rather than a masonry grid or
 * a generic fade-up. Reference mechanics only - not a copy - of a supplied
 * "StackSpread" brief: cluster -> scroll-linked spread, restrained pointer
 * parallax, reduced-motion parity, mobile changes the composition rather than
 * shrinking it.
 *
 * GSAP + ScrollTrigger, not a second animation library: the project already
 * depends on GSAP (DESIGN.md §11, package.json) and the performance rule
 * explicitly forbids duplicate animation libraries, so this reuses the
 * existing dependency instead of adding `motion`/Framer Motion for one
 * component.
 *
 * Deliberately reserved for ONE place on the site (DESIGN.md §5.4 / motion
 * law): this is not the site's global scroll treatment. Do not reuse this
 * component for Technology or Products - those use `RevealCard`.
 *
 * Data-only, like `RevealCard`: this component derives no meaning from
 * filenames. Every item's `src`/`alt`/`caption` is supplied explicitly by the
 * caller. It renders nothing on its own if `items` is empty - it does not
 * invent placeholder photography.
 */

export interface ProofWallItem {
  id: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  /** Optional hand-tuned rest position once real composition is decided.
   *  x/y in vw/vh from centre, scale 0-1, rotate in degrees. Falls back to an
   *  algorithmic asymmetric layout when omitted. */
  target?: { x: number; y: number; scale: number; rotate: number; w: number; h: number };
}

export interface ProofWallProps {
  items: ProofWallItem[];
  className?: string;
}

const SCATTER_START = 0.12;
const SCATTER_END = 0.9;
const PARALLAX_PX = 1.6;
const PARALLAX_PY = 1.3;

/** Deterministic, asymmetric default layout - no two items land identically,
 *  and every third item runs larger to establish hierarchy (DESIGN.md §9:
 *  "some proof items dominant, some supporting"), without depending on
 *  content that has not been chosen yet. */
function defaultTarget(i: number, total: number): NonNullable<ProofWallItem["target"]> {
  const dominant = i % 3 === 0;
  const side = i % 2 === 0 ? -1 : 1;
  const ring = Math.floor(i / 2);
  const spreadX = 14 + ring * 11;
  const spreadY = ((i * 37) % 60) - 30;
  return {
    x: side * spreadX,
    y: spreadY,
    scale: dominant ? 1 : 0.72,
    rotate: total > 1 ? side * (2 + (i % 3)) : 0,
    w: dominant ? 30 : 20,
    h: dominant ? 34 : 24,
  };
}

function useReducedMotion() {
  const [reduced, setReduced] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(mq.matches);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);
  return reduced;
}

function usePointerFine() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const read = () => setFine(mq.matches);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);
  return fine;
}

export function ProofWall({ items, className = "" }: ProofWallProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();
  const pointerFine = usePointerFine();

  const targets = useMemo(
    () => items.map((item, i) => item.target ?? defaultTarget(i, items.length)),
    [items],
  );

  // Scroll-driven cluster -> spread. Skipped entirely under reduced motion:
  // items render straight into their final spread position, statically.
  useEffect(() => {
    if (reducedMotion !== false) return;
    if (!sectionRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          pin: stageRef.current,
        },
      });

      cardRefs.current.forEach((el, i) => {
        const t = targets[i];
        if (!el || !t) return;
        tl.fromTo(
          el,
          { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: 0.82, rotate: (i % 2 === 0 ? -1 : 1) * 6 },
          {
            xPercent: -50,
            yPercent: -50,
            x: `${t.x}vw`,
            y: `${t.y}vh`,
            scale: t.scale,
            rotate: 0,
            ease: "none",
            duration: SCATTER_END - SCATTER_START,
          },
          SCATTER_START,
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion, targets]);

  // Restrained pointer parallax, desktop-fine-pointer only, additive to the
  // scroll position rather than replacing it.
  useEffect(() => {
    if (!pointerFine || reducedMotion !== false) return;

    const onMove = (e: PointerEvent) => {
      const px = (e.clientX / window.innerWidth) * 2 - 1;
      const py = (e.clientY / window.innerHeight) * 2 - 1;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const depth = 0.4 + (i / Math.max(1, items.length - 1)) * 0.6;
        gsap.to(el, {
          "--parallax-x": `${px * PARALLAX_PX * depth}vw`,
          "--parallax-y": `${py * PARALLAX_PY * depth}vh`,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointerFine, reducedMotion, items.length]);

  if (items.length === 0) return null;

  return (
    <div
      ref={sectionRef}
      data-proof-wall
      className={`relative ${className}`}
      style={{ height: reducedMotion ? undefined : "250vh" }}
    >
      <div
        ref={stageRef}
        className="relative h-screen w-full overflow-hidden bg-ink max-lg:!static max-lg:h-auto max-lg:overflow-visible"
      >
        {/* Mobile/tablet: no pin, no scroll-scrub - a simple stacked column so
            the composition doesn't depend on hover or scroll-linked motion. */}
        <div className="hidden max-lg:flex max-lg:flex-col max-lg:gap-4 max-lg:p-6">
          {items.map((item) => (
            <figure key={item.id} className="relative aspect-[4/5] w-full overflow-hidden border border-line">
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width ?? 1200}
                height={item.height ?? 1500}
                sizes="90vw"
                className="h-full w-full object-cover"
              />
              {item.caption ? (
                <figcaption className="absolute inset-x-0 bottom-0 bg-ink/80 px-3 py-2 font-mono text-meta-sm tracking-nav text-paper uppercase">
                  {item.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>

        <div className="absolute inset-0 max-lg:hidden">
          {items.map((item, i) => {
            const t = targets[i] ?? defaultTarget(i, items.length);
            const style = reducedMotion
              ? ({
                  left: "50%",
                  top: "50%",
                  width: `${t.w}vw`,
                  height: `${t.h}vh`,
                  transform: `translate(calc(-50% + ${t.x}vw), calc(-50% + ${t.y}vh)) scale(${t.scale})`,
                } as const)
              : ({
                  left: "50%",
                  top: "50%",
                  width: `${t.w}vw`,
                  height: `${t.h}vh`,
                  translate: "var(--parallax-x, 0) var(--parallax-y, 0)",
                } as const);

            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="absolute overflow-hidden border border-line will-change-transform"
                style={style}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width ?? 1200}
                  height={item.height ?? 1500}
                  sizes="30vw"
                  className="h-full w-full object-cover"
                />
                {item.caption ? (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-ink/80 px-3 py-2 font-mono text-meta-sm tracking-nav text-paper uppercase">
                    {item.caption}
                  </figcaption>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
