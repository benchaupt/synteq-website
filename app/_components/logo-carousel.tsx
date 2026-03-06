/* eslint-disable @next/next/no-img-element */
import { Marquee } from "@/app/_components/marquee";
import { cn } from "@/lib/utils";

interface LogoCarouselProps {
  title?: string;
  logos: {
    src: string;
    alt: string;
  }[];
  className?: string;
  pauseOnHover?: boolean;
}

export function LogoCarousel({
  title,
  logos,
  className,
  pauseOnHover = false,
}: LogoCarouselProps) {
  return (
    <div className={cn("w-full overflow-hidden", className)}>
      {title && (
        <p className="text-center text-label text-slate uppercase tracking-wide mb-8">
          {title}
        </p>
      )}
      <Marquee pauseOnHover={pauseOnHover} className="[--duration:30s] [--gap:3rem]">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center px-6 md:px-10"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-6 md:h-8 w-auto object-contain"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
