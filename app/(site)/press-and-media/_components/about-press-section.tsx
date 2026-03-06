import Image from "next/image";
import Link from "next/link";
import { StyledHeading } from "@/app/_components/styled-heading";
import { Button } from "@/app/_components/button";

const partnerLogos = [
  { src: "/images/brands/Cleanspark.svg", alt: "CleanSpark", height: 24 },
  { src: "/images/brands/Stronghold.png", alt: "Stronghold Digital Mining", height: 24 },
  { src: "/assets/hardware/delv-logo.svg", alt: "DELV", height: 24 },
];

export function AboutPressSection() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-end justify-between gap-4">
        <span className="subheading">About Synteq</span>
        <Link
          href="/about"
          className="text-sm font-medium text-lava underline underline-offset-4 hover:text-slate transition-colors"
        >
          Read More
        </Link>
      </div>

      <div className="flex flex-col gap-8 max-w-3xl">
        <StyledHeading as="h2" className="heading1">
          {"The Vision Behind Synteq."}
        </StyledHeading>
        <p className="text-body leading-relaxed text-slate">
          Synteq Digital was founded on a shared commitment to trust,
          professionalism, and integrity in digital infrastructure. United by a
          deep understanding of the evolving compute landscape, our founding
          team set out to build a company that meets the needs of modern
          workloads with scale, reliability, and transparency. Today, that
          vision powers Synteq&apos;s continued growth into new frontiers,
          combining infrastructure expertise with the agility of Crunchbits to
          serve high-performance computing, digital asset mining, and beyond.
          Together, we&apos;re building the backbone for the next generation of
          global compute.
        </p>
        <Button variant="primary" size="md" href="/about">
          Learn More
        </Button>
      </div>

      {/* Partner logos */}
      <div className="flex items-center gap-10 pt-4">
        {partnerLogos.map((logo) => (
          <Image
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            width={140}
            height={logo.height}
            className="h-6 w-auto object-contain grayscale opacity-60"
          />
        ))}
      </div>
    </div>
  );
}
