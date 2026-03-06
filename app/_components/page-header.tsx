/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { Button } from "@/app/_components/button";
import { StyledHeading } from "@/app/_components/styled-heading";

interface PageHeaderProps {
  label?: string;
  title: string;
  body?: string;
  ctaText?: string;
  ctaHref?: string;
  /** Image source path */
  image?: string;
  imageAlt?: string;
  /** Custom classes to position/size the image (absolute positioning within the header) */
  imageClassName?: string;
  /** Add a bottom gradient fade for images that dip below the header */
  imageFade?: boolean;
  /** Tailwind min-height class for the header — defaults to "min-h-screen" */
  height?: string;
  /** Width of the text content area — defaults to "w-4/5" */
  contentWidth?: string;
  /** "lander" uses larger hero type (68px), "page" uses standard (60px) */
  variant?: "lander" | "page";
  className?: string;
}

export function PageHeader({
  label,
  title,
  body,
  ctaText,
  ctaHref,
  image,
  imageAlt = "",
  imageClassName,
  imageFade = false,
  height = "min-h-screen",
  contentWidth = "w-full md:w-[70%]",
  variant = "page",
  className,
}: PageHeaderProps) {
  return (
    <section
      className={cn("relative w-full overflow-hidden", height, className)}
    >
      {/* Content container — image is positioned relative to this 1200px boundary */}
      <div className={cn("relative mx-auto flex w-full max-w-viewport flex-col justify-center px-5 md:px-8", height)}>
        <div className={cn("relative z-10 flex flex-col gap-4 py-16 md:py-24 lg:py-32", contentWidth)}>
          {label && <span className="subheading">{label}</span>}
          <StyledHeading as="h1" className={variant === "lander" ? "title-hero" : "title"}>{title}</StyledHeading>
          {body && (
            <p className="text-body leading-relaxed text-lava">{body}</p>
          )}
          {ctaText && ctaHref && (
            <div className="pt-2">
              <Button href={ctaHref} size="md">
                {ctaText}
              </Button>
            </div>
          )}
        </div>

        {/* Decorative image — positioned within the 1200px container */}
        {image && (
          <div
            className={cn(
              "pointer-events-none absolute inset-0 z-0 opacity-30 md:opacity-100",
              imageFade && "mask-fade-bottom",
            )}
          >
            <img
              src={image}
              alt={imageAlt}
              className={cn(
                "absolute",
                imageClassName ||
                  "right-0 top-1/2 h-auto w-1/2 -translate-y-1/2",
              )}
            />
          </div>
        )}
      </div>
    </section>
  );
}
