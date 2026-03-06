import { Section } from "@/app/_components/section";
import { PageHeader } from "@/app/_components/page-header";
import { Button } from "@/app/_components/button";
import { StyledHeading } from "@/app/_components/styled-heading";
import { StatsSection } from "@/app/_components/stats-section";
import { LogoCarousel } from "@/app/_components/logo-carousel";
import { VisionSection } from "@/app/(site)/_components/vision-section";
import { ValuesSection } from "@/app/(site)/_components/values-section";
import { PressContactCard } from "@/app/(site)/press-and-media/_components/press-contact-card";
import { PressReleasesPreview } from "@/app/(site)/press-and-media/_components/press-releases-preview";
import { BrandLogosSection } from "@/app/(site)/press-and-media/_components/brand-logos-section";
import { BrandColorsSection } from "@/app/(site)/press-and-media/_components/brand-colors-section";
import { BrandTypographySection } from "@/app/(site)/press-and-media/_components/brand-typography-section";

export const metadata = {
  title: "Press & Media | Synteq Digital",
  description:
    "Media resources, press contact information, and brand assets for Synteq Digital.",
};

const stats = [
  { value: "400,000", label: "Compute units sold since 2020" },
  { value: "30+", label: "Countries served" },
  { value: "99.99%", label: "Infrastructure uptime" },
];

const brandLogos = [
  { src: "/images/brands/Cleanspark.svg", alt: "CleanSpark" },
  { src: "/images/brands/Stronghold.png", alt: "Stronghold Digital Mining" },
  { src: "/images/brands/Cathedra.png", alt: "Cathedra" },
  { src: "/images/brands/Delv.svg", alt: "DELV" },
];

export default function PressContactPage() {
  return (
    <>
      <PageHeader
        label="Press & Media"
        title="Press & Media."
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam."
        contentWidth="w-full md:w-7/8"
        height="min-h-[50vh]"
        className="pt-[20vh]"
        image="/images/header-assets/bird-eye.svg"
        imageClassName="right-0 bottom-0 w-[200px] h-auto md:bottom-auto md:top-2/5 md:-translate-y-1/4 md:w-[290px]"
      />

      {/* Press Contact Card */}
      <Section>
        <PressContactCard />
      </Section>

      {/* Recent Press Releases */}
      <Section>
        <PressReleasesPreview />
      </Section>

      {/* Brand Kit: Logos */}
      <Section>
        <BrandLogosSection />
      </Section>

      {/* Brand Kit: Colors */}
      <Section>
        <BrandColorsSection />
      </Section>

      {/* Brand Kit: Typography */}
      <Section>
        <BrandTypographySection />
      </Section>

      {/* About Synteq */}
      <Section>
        <VisionSection />
      </Section>

      <Section>
        <LogoCarousel logos={brandLogos} />
      </Section>

      <Section background="slate-light-2">
        <ValuesSection />
      </Section>

      <Section background="slate-light-2">
        <StatsSection stats={stats} />
      </Section>
    </>
  );
}
