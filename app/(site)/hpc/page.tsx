import { PageHeader } from "@/app/_components/page-header";
import { Section } from "@/app/_components/section";
import { LogoCarousel } from "@/app/_components/logo-carousel";
import { StyledHeading } from "@/app/_components/styled-heading";
import { CrunchbitsBanner } from "@/app/(site)/hpc/_components/crunchbits-banner";
import { FeaturesSection } from "@/app/(site)/hpc/_components/features-section";
import { LocationsSection } from "@/app/(site)/hpc/_components/locations-section";
import { CTASection } from "@/app/_components/cta-section";

export const metadata = {
  title: "HPC | Synteq Digital",
  description:
    "High-performance computing solutions — enterprise servers, GPU hosting, and scalable infrastructure by Crunchbits, a Synteq Digital company.",
};

const partnerLogos = [
  { src: "/images/hpc/logo-apc.svg", alt: "APC" },
  { src: "/images/hpc/logo-arista.svg", alt: "Arista" },
  { src: "/images/hpc/logo-intel.svg", alt: "Intel" },
  { src: "/images/hpc/logo-supermicro.svg", alt: "Supermicro" },
  { src: "/images/hpc/logo-hpe.svg", alt: "HPE" },
];

const stats = [
  { value: "8", label: "Global Data Centers" },
  {
    value: "2.2Tbps",
    label: "Multi-homed edge capacity across tier 1 backbones",
  },
  { value: "Thousands", label: "Of GPUs Deployed" },
];

export default function HPCPage() {
  return (
    <>

      <PageHeader
        label="HPC"
        title={"High Performance Servers.\nPractical Infrastructure.\nReal Results."}
        body="Crunchbits by Synteq Digital, delivers high performance, at scale and cost effective infrastructure solutions built for developers, startups, and enterprises with demanding compute needs. Since 2021 we've earned a reputation for reliable and scalable VPS, VDS, dedicated, and GPU server hosting, powered by enterprise grade hardware, robust network connectivity, and responsive support."
        contentWidth="w-full md:w-4/5"
        height="min-h-[85vh]"
        className="pt-[10vh]"
        image="/images/header-assets/bird-eye.svg"
        imageClassName="right-0 bottom-0 w-[200px] h-auto md:bottom-auto md:top-2/5 md:-translate-y-1/4 md:w-[290px]"
      />

      <CrunchbitsBanner />

      <FeaturesSection />

      {/* Partner quote + logos */}
      <Section>
        <div className="flex flex-col gap-16 items-center">
          <StyledHeading as="h2" className="heading1 text-center max-w-full">
            Every deployment is backed by trusted hardware partners ensuring
            consistent performance across the board.
          </StyledHeading>
          <LogoCarousel logos={partnerLogos} />
        </div>
      </Section>

      {/* Stats */}
      <Section background="offwhite">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 text-center"
            >
              <span className="text-4xl md:text-5xl lg:text-6xl font-medium text-lava tracking-tight">
                {stat.value}
              </span>
              <p className="text-body-large">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <LocationsSection />

      <CTASection
        heading={
          <>
            Head over to{" "}
            <a
              href="https://crunchbits.com"
              target="_blank"
              rel="noopener noreferrer"
              className="decoration-3 underline-offset-8 underline decoration-lava bg-[linear-gradient(theme(colors.lava),theme(colors.lava))] bg-[position:0_calc(100%-4px)] bg-no-repeat bg-[size:100%_0%] transition-all duration-300 ease-out hover:bg-[size:100%_100%] hover:text-white"
            >
              Crunchbits
            </a>{" "}
            for more information and our product lineup
            <span className="text-slate">.</span>
          </>
        }
        buttonText="Crunchbits.com"
        buttonHref="https://crunchbits.com"
        background="silver"
        backgroundImage="/images/dotted-circle-bg.svg"
        contentWidth="max-w-3xl"
      />
    </>
  );
}
