import { PageHeader } from "@/app/_components/page-header";
import { CTASection } from "@/app/_components/cta-section";
import { AcquisitionSection } from "./_components/acquisition-section";
import { ServicesSection } from "./_components/services-section";
import { FeaturesSection } from "./_components/features-section";

export const metadata = {
  title: "Repair Services | Synteq Digital",
  description:
    "Precise, reliable, at-scale repair services with end-to-end support. Manufacturer certified technicians and US-based facilities.",
};

export default function RepairPage() {
  return (
    <>
      <PageHeader
        label="Repair"
        title="Precise, Reliable, At-Scale Repair Services With End-to-End Support."
        contentWidth="w-full md:w-7/8"
        height="min-h-[75vh]"
        className="pt-[10vh]"
        image="/images/header-assets/bird-eye.svg"
        imageClassName="right-0 bottom-0 w-[200px] h-auto md:bottom-auto md:top-2/5 md:-translate-y-1/4 md:w-[290px]"
      />
      <AcquisitionSection />
      <ServicesSection />
      <FeaturesSection />
      <CTASection
        heading={
          <>
            Interested in our services?{" "}
            <br />
            Contact Us!
          </>
        }
        buttonText="Contact Us"
        buttonHref="/contact"
        background="silver"
        backgroundImage="/images/dotted-circle-bg.svg"
        contentWidth="max-w-3xl"
      />
    </>
  );
}
