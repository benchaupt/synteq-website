import { Section } from "@/app/_components/section";
import { StyledHeading } from "@/app/_components/styled-heading";
import { getPressReleases } from "@/lib/payload/press-releases";
import { PressReleaseList } from "./_components/press-release-list";
import { PressContactBlock } from "./[slug]/_components/press-contact-block";

export const metadata = {
  title: "Press Releases | Synteq Digital",
  description:
    "The latest news and announcements from Synteq Digital.",
};

export default async function PressReleasesPage() {
  const releases = await getPressReleases(1, 50);

  return (
    <>
      {/* Small ancillary header */}
      <Section className="pt-28 md:pt-32" innerClassName="pb-8 md:pb-12">
        <div className="flex flex-col gap-2">
          <span className="subheading">Press</span>
          <StyledHeading as="h1" className="heading">
            {"In the News."}
          </StyledHeading>
        </div>
      </Section>

      <Section innerClassName="pt-8 md:pt-12">
        <PressReleaseList releases={releases.docs} />
      </Section>

      <Section>
        <div className="w-full">
          <PressContactBlock />
        </div>
      </Section>
    </>
  );
}
