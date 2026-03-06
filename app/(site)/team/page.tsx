import { Section } from "@/app/_components/section";
import { CTASection } from "@/app/_components/cta-section";
import { StyledHeading } from "@/app/_components/styled-heading";
import { TeamCard } from "./_components/team-card";
import { getTeamMembers } from "@/lib/payload/team";
import type { Media } from "@/payload-types";

export const metadata = {
  title: "Team | Synteq Digital",
  description: "Meet the people behind Synteq Digital.",
};

function getHeadshotUrl(headshot: unknown): string {
  if (headshot && typeof headshot === "object" && "url" in headshot) {
    return (headshot as Media).url ?? "/images/team/placeholder.png";
  }
  return "/images/team/placeholder.png";
}

export default async function TeamPage() {
  const [leadership, board] = await Promise.all([
    getTeamMembers("leadership"),
    getTeamMembers("board"),
  ]);

  return (
    <>
      {/* Leadership Team */}
      <Section innerClassName="flex flex-col gap-12 pt-32 md:pt-40">
        <StyledHeading as="h1" className="heading1">
          Our Leadership Team.
        </StyledHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {leadership.map((person) => (
            <TeamCard
              key={person.id}
              name={person.name}
              role={person.role}
              image={getHeadshotUrl(person.headshot)}
              linkedIn={person.linkedIn ?? undefined}
              bio={person.bio ?? undefined}
            />
          ))}
        </div>
      </Section>

      {/* Board of Directors */}
      <Section background="offwhite">
        <div className="flex flex-col gap-12">
          <StyledHeading as="h2" className="heading1">
            Board Of Directors.
          </StyledHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {board.map((person) => (
              <TeamCard
                key={person.id}
                name={person.name}
                role={person.role}
                image={getHeadshotUrl(person.headshot)}
                linkedIn={person.linkedIn ?? undefined}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <CTASection
        heading={<>Learn more about us.</>}
        subtext=" "
        buttonText="Learn More"
        buttonHref="/about"
        background="silver"
        backgroundImage="/images/dotted-circle-bg.svg"
        contentWidth="max-w-3xl"
      />
    </>
  );
}
