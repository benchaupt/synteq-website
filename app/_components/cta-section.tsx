import { cn } from "@/lib/utils";
import { Button } from "@/app/_components/button";
import { cva } from "class-variance-authority";

const ctaVariants = cva("py-20 md:py-32", {
  variants: {
    background: {
      lava: "bg-lava text-white",
      slate: "bg-slate text-white",
      cream: "bg-cream text-lava",
      offwhite: "bg-offwhite text-lava",
      silver: "bg-silver text-lava",
    },
  },
  defaultVariants: {
    background: "lava",
  },
});

interface CTASectionProps {
  heading: React.ReactNode;
  subtext?: string;
  buttonText: string;
  buttonHref: string;
  background?: "lava" | "slate" | "cream" | "offwhite" | "silver";
  backgroundImage?: string;
  /** Max-width class for the text content area — defaults to "max-w-3xl" */
  contentWidth?: string;
  className?: string;
}

export function CTASection({
  heading,
  subtext,
  buttonText,
  buttonHref,
  background = "lava",
  backgroundImage,
  contentWidth = "max-w-4xl",
  className,
}: CTASectionProps) {
  const isLight =
    background === "cream" ||
    background === "offwhite" ||
    background === "silver";

  return (
    <section
      className={cn(ctaVariants({ background }), "relative overflow-hidden", className)}
    >
      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-viewport px-5 md:px-8",
          backgroundImage
            ? "flex flex-col items-start gap-6"
            : "flex flex-col items-center gap-6 text-center",
        )}
      >
        <h2 className={cn("heading1", contentWidth)}>
          {heading}
        </h2>
        {subtext && (
          <p
            className={cn(
              "text-body-lg",
              contentWidth,
              isLight ? "text-lava" : "text-white/80",
            )}
          >
            {subtext}
          </p>
        )}
        <div className="pt-2">
          <Button
            href={buttonHref}
            variant={isLight ? "primary" : "outline"}
            size="md"
            className={
              isLight
                ? undefined
                : "border-white text-white hover:bg-white hover:text-lava"
            }
          >
            {buttonText}
          </Button>
        </div>
      </div>

      {backgroundImage && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 -right-12 w-90 translate-y-1/3 opacity-75 md:right-[max(0px,calc((100%-1200px)/2))] md:w-140 md:opacity-100"
        />
      )}
    </section>
  );
}
