import { Section } from "@/app/_components/section";
import { StyledHeading } from "@/app/_components/styled-heading";
import { getLocations } from "@/lib/payload/locations";
import type { Location } from "@/payload-types";

import { LocationCard, type LocationGroup } from "./location-card";

function groupLocations(docs: Location[]): LocationGroup[] {
  const map = new Map<string, LocationGroup>();

  for (const doc of docs) {
    const key = `${doc.type}:${doc.state}`;
    if (!map.has(key)) {
      map.set(key, {
        state: doc.state,
        type: doc.type,
        names: [],
        dots: [],
      });
    }
    const group = map.get(key)!;
    group.names.push(doc.name);
    group.dots.push({ x: doc.coordinates.x, y: doc.coordinates.y });
  }

  return Array.from(map.values());
}

export async function LocationsSection() {
  const docs = await getLocations();

  if (!docs.length) return null;

  const groups = groupLocations(docs);
  const domestic = groups.filter((g) => g.type === "domestic");
  const international = groups.filter((g) => g.type === "international");

  return (
    <Section>
      <div className="flex flex-col gap-8">
        <StyledHeading as="h2" className="heading">
          Locations.
        </StyledHeading>

        {domestic.length > 0 && (
          <div className="flex flex-col gap-6">
            <h3 className="heading2">Domestic</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {domestic.map((group) => (
                <LocationCard key={group.state} group={group} />
              ))}
            </div>
          </div>
        )}

        {international.length > 0 && (
          <div className="flex flex-col gap-6">
            <h3 className="heading2">International</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {international.map((group) => (
                <LocationCard
                  key={group.state}
                  group={group}
                  international
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
