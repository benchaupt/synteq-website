import { Section } from "@/app/_components/section";
import { PageHeader } from "@/app/_components/page-header";
import { CTASection } from "@/app/_components/cta-section";
import { WhyWorkSection } from "@/app/(site)/careers/_components/why-work-section";
import { WhatWeOfferSection } from "@/app/(site)/careers/_components/what-we-offer-section";
import { LifeAtSynteqSection } from "@/app/(site)/careers/_components/life-at-synteq-section";
import { EmployeeTestimonials } from "@/app/(site)/careers/_components/employee-testimonials";
import { OpenRolesSection } from "@/app/(site)/careers/_components/open-roles-section";

export const metadata = {
  title: "Careers | Synteq Digital",
  description:
    "Join the Synteq Digital team. Explore open roles and discover why talented professionals choose to build their careers with us.",
};

export default function CareersPage() {
  return (
    <>
      <PageHeader
        label="Careers"
        title="Join Us at Synteq Digital."
        body="Synteq Digital is focused on advancing digital and high-performance computing solutions. We are a scaleup organization looking for professionals who demonstrate grit, emotional intelligence, and a commitment to excellence and are driven to deliver results in a dynamic, fast-paced setting."
        ctaText="View Open Roles"
        ctaHref="#open-roles"
        image="/images/header-assets/circle-x-asset.svg"
        imageClassName="right-0 bottom-0 w-[200px] h-auto md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:w-[320px]"
      />

      <Section background="slate-light-2">
        <WhyWorkSection />
      </Section>

      <WhatWeOfferSection />

      <LifeAtSynteqSection />

      <Section>
        <EmployeeTestimonials />
      </Section>

      <OpenRolesSection />

      <CTASection
        heading="Don't see your role?"
        subtext="Send us your resume. We're always looking for talented people."
        buttonText="Contact Us"
        buttonHref="/contact"
        background="silver"
        backgroundImage="/images/dotted-circle-bg.svg"
        contentWidth="max-w-3xl"
      />
    </>
  );
}
