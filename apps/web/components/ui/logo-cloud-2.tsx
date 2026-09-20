// VENDORED COMPONENT - `efferd/logo-cloud-2` from 21st.dev, installed
// 2026-09-20 verbatim in structure per explicit direction ("use the
// component directly"), populated with this project's own seven
// affiliation logos per explicit direction ("use the other ones other than
// amtz and iit madras. put all of them"). See `app/company/page.tsx`'s own
// doc comment for what each of these seven is and why five of them were
// EXCLUDED from the page until this direction explicitly overrode that:
// ajashy/nautical-wings-aerospace/yaanendriya are unrelated third-party
// companies with no confirmed Nabhastra connection, ncc is the official NCC
// government crest (no confirmed legal clearance to display it), and neosky
// is an unverified/unconfirmed partner. Flagged before adding; added anyway
// on explicit direction accepting that risk.
//
// Structural changes from upstream, everything else (grid shape, border/
// bg alternation per cell, `PlusIcon` intersection accents, `bg-secondary`/
// `bg-background`/`text-muted-foreground`/`text-primary` tokens, bare `img`
// tag) untouched:
//   - 7 logos, not 8 - one fewer than upstream's 2x4 grid, so the eighth
//     (bottom-right on desktop) cell is simply omitted rather than
//     duplicating a logo to fill it.
//   - No `dark:brightness-0 dark:invert`: upstream's logos are flat
//     single-colour SVGs meant to render as white marks in dark mode.
//     These seven are full-colour raster (`.webp`) marks on white
//     backgrounds - inverting would wreck them, not recolour them.
//   - `next/image`, not a bare `<img>`: these are local files under
//     `public/media/`, not upstream's remote CDN SVGs.
//   - `bg-secondary`/`text-muted-foreground`/`text-primary` needed adding
//     to this project's `@theme` (see `app/globals.css`) - it never
//     defined shadcn's generic defaults, so these classes resolved to
//     nothing before that.
import Image from "next/image";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Logo = {
  src: string;
  alt: string;
};

const LOGOS: Record<
  "amtz" | "iitm" | "ajashy" | "nautical" | "ncc" | "neosky" | "yaanendriya",
  Logo
> = {
  amtz: { src: "/media/affiliation-amtz.webp", alt: "AMTZ — Andhra Pradesh MedTech Zone" },
  iitm: { src: "/media/affiliation-iitm.webp", alt: "Indian Institute of Technology Madras" },
  ajashy: { src: "/media/affiliation-ajashy.webp", alt: "Ajashy Engineering Sales" },
  nautical: { src: "/media/affiliation-nautical-wings-aerospace.webp", alt: "Nautical Wings Aerospace" },
  ncc: { src: "/media/affiliation-ncc.webp", alt: "NCC" },
  neosky: { src: "/media/affiliation-neosky.webp", alt: "NeoSky" },
  yaanendriya: { src: "/media/affiliation-yaanendriya.webp", alt: "Yaanendriya" },
};

type LogoCloudProps = React.ComponentProps<"div">;

export function LogoCloud({ className, ...props }: LogoCloudProps) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-2 border-x md:grid-cols-4",
        className
      )}
      {...props}
    >
      <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t" />

      <LogoCard
        className="relative border-r border-b bg-secondary dark:bg-secondary/30"
        logo={LOGOS.amtz}
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="border-b md:border-r"
        logo={LOGOS.iitm}
      />

      <LogoCard
        className="relative border-r border-b md:bg-secondary dark:md:bg-secondary/30"
        logo={LOGOS.ajashy}
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6"
          strokeWidth={1}
        />
        <PlusIcon
          className="-bottom-[12.5px] -left-[12.5px] absolute z-10 hidden size-6 md:block"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="relative border-b bg-secondary md:bg-background dark:bg-secondary/30 md:dark:bg-background"
        logo={LOGOS.nautical}
      />

      <LogoCard
        className="relative border-r border-b bg-secondary md:border-b-0 md:bg-background dark:bg-secondary/30 md:dark:bg-background"
        logo={LOGOS.ncc}
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] md:-left-[12.5px] absolute z-10 size-6 md:hidden"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="border-b bg-background md:border-r md:border-b-0 md:bg-secondary dark:md:bg-secondary/30"
        logo={LOGOS.neosky}
      />

      <LogoCard
        className="border-r"
        logo={LOGOS.yaanendriya}
      />

      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b" />
    </div>
  );
}

type LogoCardProps = React.ComponentProps<"div"> & {
  logo: Logo;
};

function LogoCard({ logo, className, children, ...props }: LogoCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-background px-4 py-8 md:p-8",
        className
      )}
      {...props}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={160}
        height={48}
        className="pointer-events-none h-8 w-auto select-none object-contain md:h-10"
      />
      {children}
    </div>
  );
}
