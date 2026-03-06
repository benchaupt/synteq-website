import { getPayload } from "payload";
import config from "@/payload.config";
import { NextResponse } from "next/server";

const LOCATIONS = [
  { name: "Philadelphia, PA", city: "Philadelphia", state: "PA", country: "US", type: "domestic" as const, sortOrder: 0, coordinates: { x: 1516, y: 1950 } },
  { name: "Valley Forge, PA", city: "Valley Forge", state: "PA", country: "US", type: "domestic" as const, sortOrder: 0, coordinates: { x: 1513, y: 1949 } },
  { name: "Dallas, TX", city: "Wylie", state: "TX", country: "US", type: "domestic" as const, sortOrder: 0, coordinates: { x: 1160, y: 2106 } },
  { name: "Seattle, WA", city: "Medina", state: "WA", country: "US", type: "domestic" as const, sortOrder: 0, coordinates: { x: 757, y: 1787 } },
  { name: "Spokane, WA", city: "Spokane", state: "WA", country: "US", type: "domestic" as const, sortOrder: 0, coordinates: { x: 835, y: 1788 } },
  { name: "Chicago, IL", city: "Elk Grove Village", state: "IL", country: "US", type: "domestic" as const, sortOrder: 0, coordinates: { x: 1311, y: 1910 } },
  { name: "New York, NY", city: "Carteret", state: "NJ", country: "US", type: "domestic" as const, sortOrder: 0, coordinates: { x: 1537, y: 1932 } },
  { name: "Sofia, Bulgaria", city: "n/a", state: "Sofia", country: "Bulgaria", type: "international" as const, sortOrder: 0, coordinates: { x: 3101, y: 1897 } },
];

export async function POST() {
  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "locations",
    limit: 100,
  });

  if (existing.totalDocs > 0) {
    return NextResponse.json({
      message: `Skipped — ${existing.totalDocs} locations already exist`,
    });
  }

  const created = [];
  for (const loc of LOCATIONS) {
    const doc = await payload.create({
      collection: "locations",
      data: loc,
    });
    created.push({ id: doc.id, name: doc.name });
  }

  return NextResponse.json({
    message: `Seeded ${created.length} locations`,
    locations: created,
  });
}
