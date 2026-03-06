import { Section } from "@/app/_components/section";
import { PageHeader } from "@/app/_components/page-header";
import { CTASection } from "@/app/_components/cta-section";
import { StatsSection } from "@/app/_components/stats-section";
import { ValuesSection } from "@/app/(site)/_components/values-section";
import { MissionReveal } from "@/app/(site)/about/_components/mission-reveal";
import { StoryTimeline } from "@/app/(site)/about/_components/story-timeline";
import { CareersCTA } from "@/app/(site)/about/_components/careers-cta";
import { LinkCards } from "@/app/(site)/about/_components/link-cards";

export const metadata = {
  title: "About Us | Synteq Digital",
  description: "Learn about Synteq Digital — our mission, values, and story.",
};

const missionText =
  "We believe the future of computing demands a partner you can trust. Since 2016, we've built our reputation on reliability, transparency, and an unwavering commitment to our clients — delivering the hardware and infrastructure that powers the world's most ambitious digital operations.";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About"
        title={"About Synteq."}
        body="Crunchbits by Synteq Digital, delivers high performance, at scale and cost effective infrastructure solutions built for developers, startups, and enterprises with demanding compute needs. Since 2021 we've earned a reputation for reliable and scalable VPS, VDS, dedicated, and GPU server hosting, powered by enterprise grade hardware, robust network connectivity, and responsive support."
        contentWidth="w-full md:w-4/5"
        height="min-h-[65vh]"
        className="pt-[10vh]"
        image="/images/header-assets/bird-eye.svg"
        imageClassName="right-0 bottom-0 w-[200px] h-auto md:bottom-auto md:top-2/5 md:-translate-y-1/4 md:w-[290px]"
      />
      <Section>
        <MissionReveal text={missionText} />
      </Section>
      <Section>
        <StoryTimeline />
      </Section>
      <Section innerClassName="flex flex-col gap-5 py-16 md:py-20">
        <CareersCTA />
        <LinkCards />
      </Section>
      <Section background="silver" innerClassName="pt-24 md:pt-36">
        <StatsSection
          stats={[
            { value: "400,000", label: "Compute units sold since 2020" },
            { value: "30+", label: "Countries served" },
            { value: "99.99%", label: "Infrastructure uptime" },
          ]}
        />
      </Section>
      <Section background="silver" innerClassName="py-8 md:py-12">
        <ValuesSection />
      </Section>
      <CTASection
        heading={
          <>
            Want to learn more?{" "}
            <br />
            Contact Us!
          </>
        }
        buttonText="Contact Us"
        buttonHref="/contact"
        background="silver"
        backgroundImage="/images/dotted-circle-bg.svg"
        contentWidth="max-w-3xl"
        className="pb-[7.5rem] md:pb-32"
      />
    </>
  );
}
