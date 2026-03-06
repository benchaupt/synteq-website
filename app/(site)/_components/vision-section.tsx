import { Button } from "@/app/_components/button";
import { StyledHeading } from "@/app/_components/styled-heading";

export function VisionSection() {
  return (
    <div className="relative flex flex-col lg:flex-row gap-12 pb-32 lg:gap-16 items-center">
      {/* Mobile: image pulled up behind content */}
      <div className="absolute inset-x-0 -bottom-6 flex items-end justify-center overflow-hidden lg:hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white to-transparent z-10" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/header-assets/triangle-down-asset.svg"
          alt=""
          className="w-3/4 opacity-40"
        />
      </div>

      {/* Left: Text content */}
      <div className="relative z-10 flex flex-col gap-6 lg:w-3/5">
        <StyledHeading as="h2" className="heading1">
          The Vision Behind Synteq.
        </StyledHeading>
        <p className="body">
          Synteq Digital was founded on a shared commitment to trust,
          professionalism, and integrity in digital infrastructure. United by a
          deep understanding of the evolving compute landscape, our founding
          team set out to build a company that meets the needs of modern
          workloads with scale, reliability, and transparency. Today, that
          vision powers Synteq&apos;s continued growth into new frontiers,
          combining infrastructure expertise with the agility of Crunchbits to
          serve high-performance computing, digital asset mining, and beyond.
        </p>
        <Button variant="primary" size="md" href="/about">
          Learn More
        </Button>
      </div>

      {/* Right: Asset (desktop only) */}
      <div className="hidden lg:flex lg:w-2/5 items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/header-assets/triangle-down-asset.svg"
          alt=""
          className="w-4/5"
        />
      </div>
    </div>
  );
}
