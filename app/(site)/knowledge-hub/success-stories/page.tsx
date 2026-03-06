import { Section } from "@/app/_components/section";
import { StyledHeading } from "@/app/_components/styled-heading";
import { getSuccessStories } from "@/lib/payload/success-stories";
import { SuccessStoryList } from "./_components/success-story-list";

export const metadata = {
  title: "Success Stories | Synteq Digital",
  description:
    "See how organizations are transforming with Synteq Digital.",
};

export default async function SuccessStoriesPage() {
  const stories = await getSuccessStories(1, 50);

  return (
    <>
      {/* Small ancillary header */}
      <Section className="pt-28 md:pt-32" innerClassName="pb-8 md:pb-12">
        <div className="flex flex-col gap-2">
          <span className="subheading">Case Studies</span>
          <StyledHeading as="h1" className="heading">
            {"Success Stories."}
          </StyledHeading>
          <p className="body max-w-4xl">We&apos;re grateful to our clients and partners for placing their trust in us, and we&apos;re excited to share their stories with you. At Synteq, we believe that our clients&apos; success is our success, and we take pride in being a part of their journey.</p>
        </div>
      </Section>

      <Section innerClassName="pt-8 md:pt-12">
        <SuccessStoryList stories={stories.docs} />
      </Section>
    </>
  );
}
