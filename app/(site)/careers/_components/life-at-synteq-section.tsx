import Image from "next/image";
import { Section } from "@/app/_components/section";
import { StyledHeading } from "@/app/_components/styled-heading";

const photos = [
  { src: "/images/careers/track-day-ping-pong.webp", alt: "Team playing ping pong at track day offsite" },
  { src: "/images/careers/track-day-team.webp", alt: "Full team photo at track day" },
  { src: "/images/careers/bitcoin-park-austin-lexie-nathan-val.webp", alt: "Team at Bitcoin Park in Austin" },
  { src: "/images/careers/ma-dinner-bronwyn-patty-joe-taras-manash-eric.webp", alt: "Leadership dinner" },
  { src: "/images/careers/turks-volunteering.webp", alt: "Team volunteering in Turks" },
  { src: "/images/careers/ma-dinner-olena-kara-lexie-patty-nathan.webp", alt: "Team dinner" },
];

export function LifeAtSynteqSection() {
  return (
    <Section>
      <StyledHeading as="h2" className="heading1 mb-6 md:mb-10">
        Life at Synteq.
      </StyledHeading>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.src}
            className="relative aspect-[5/3] overflow-hidden bg-offwhite"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
