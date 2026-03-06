import { StyledHeading } from "@/app/_components/styled-heading";
import { TeamCard } from "@/app/(site)/team/_components/team-card";
import { getTeamMembers } from "@/lib/payload/team";
import type { Media } from "@/payload-types";

function getHeadshotUrl(headshot: unknown): string {
  if (headshot && typeof headshot === "object" && "url" in headshot) {
    return (headshot as Media).url ?? "/images/team/placeholder.png";
  }
  return "/images/team/placeholder.png";
}

export async function HardwareTeamSection() {
  const team = await getTeamMembers("hardware");

  return (
    <div className="flex flex-col gap-12">
      <StyledHeading as="h2" className="heading1">
        {"Meet the Hardware Team."}
      </StyledHeading>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        {team.map((person) => (
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
  );
}
