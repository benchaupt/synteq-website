import { Section } from "@/app/_components/section";
import { PageHeader } from "@/app/_components/page-header";
import { CTASection } from "@/app/_components/cta-section";
import { MissionReveal } from "@/app/(site)/about/_components/mission-reveal";
import { StoryTimeline } from "@/app/(site)/about/_components/story-timeline";

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
        label="About Us"
        title="Powering the Infrastructure Behind Modern Business."
        body="Synteq Digital delivers enterprise hardware, HPC, and IT services trusted by organizations worldwide."
      />
      <Section>
        <MissionReveal text={missionText} />
      </Section>
      <Section background="offwhite">
        <StoryTimeline />
      </Section>
      <CTASection
        heading="Want to learn more?"
        subtext="Reach out to our team to discuss how we can support your business."
        buttonText="Contact Us"
        buttonHref="/contact"
        background="cream"
      />
    </>
  );
}
