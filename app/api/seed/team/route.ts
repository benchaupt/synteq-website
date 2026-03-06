import { getPayload } from "payload";
import config from "@/payload.config";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const teamMembers = [
  {
    name: "Taras Kulyk",
    role: "Co-founder & CEO",
    department: ["leadership", "hardware"],
    image: "taras.png",
    linkedIn: "https://www.linkedin.com/in/taraskulyk/",
    bio: "Taras has been at the forefront of digital infrastructure since 2016, building Synteq into one of the world's most trusted hardware distributors.",
    sortOrder: 1,
  },
  {
    name: "Joe Stephanelli",
    role: "Co-founder & President",
    department: ["leadership", "hardware"],
    image: "joe.png",
    linkedIn: "https://www.linkedin.com/in/joestephanelli/",
    bio: "Joe oversees global operations and strategic partnerships, ensuring Synteq delivers best-in-class service to clients worldwide.",
    sortOrder: 2,
  },
  {
    name: "Patty Stephanelli",
    role: "Co-founder & COO",
    department: ["leadership", "hardware"],
    image: "patty.png",
    linkedIn: "https://www.linkedin.com/in/pattystephanelli/",
    sortOrder: 3,
  },
  {
    name: "Manash Goswami",
    role: "CFO",
    department: ["leadership", "hardware"],
    image: "manash.png",
    linkedIn: "https://www.linkedin.com/in/manashgoswami/",
    sortOrder: 4,
  },
  {
    name: "Eric",
    role: "VP of HPC Operations",
    department: ["leadership", "hpc"],
    image: "eric.png",
    sortOrder: 5,
  },
  {
    name: "Bronwyn",
    role: "Head of HR",
    department: ["leadership", "hr"],
    image: "bronwyn.png",
    sortOrder: 6,
  },
  {
    name: "TBD",
    role: "Director of Marketing & Communication",
    department: ["leadership", "marketing"],
    image: "marketing-dir.png",
    sortOrder: 7,
  },
  {
    name: "Kara",
    role: "Director of Strategic Projects",
    department: ["leadership"],
    image: "kara.png",
    linkedIn: "https://www.linkedin.com/in/kara/",
    sortOrder: 8,
  },
  {
    name: "Jamie Leverton",
    role: "Chair of the Board",
    department: ["board"],
    image: "jamie.png",
    linkedIn: "https://www.linkedin.com/in/jamieleverton/",
    sortOrder: 1,
  },
  {
    name: "Rob Fedrock",
    role: "Director of the Board",
    department: ["board"],
    image: "rob.png",
    linkedIn: "https://www.linkedin.com/in/robfedrock/",
    sortOrder: 2,
  },
];

export async function POST() {
  try {
    const payload = await getPayload({ config });

    // Delete existing team members to allow re-seeding
    const existing = await payload.find({
      collection: "team-members",
      limit: 100,
    });

    for (const doc of existing.docs) {
      await payload.delete({ collection: "team-members", id: doc.id });
    }

    const results = [];

    for (const member of teamMembers) {
      // Try to upload headshot from public/images/team/
      let headshotId: number | undefined;
      const imagePath = path.join(
        process.cwd(),
        "public",
        "images",
        "team",
        member.image,
      );

      if (fs.existsSync(imagePath)) {
        try {
          const buffer = fs.readFileSync(imagePath);
          const media = await payload.create({
            collection: "media",
            data: {
              alt: member.name,
            },
            file: {
              data: buffer,
              name: member.image,
              mimetype: member.image.endsWith(".png")
                ? "image/png"
                : "image/webp",
              size: buffer.length,
            },
          });
          headshotId = media.id;
        } catch (e) {
          console.warn(`Failed to upload headshot for ${member.name}:`, e);
        }
      }

      const created = await payload.create({
        collection: "team-members",
        data: {
          name: member.name,
          role: member.role,
          department: member.department as ("leadership" | "board" | "hardware" | "hpc" | "engineering" | "operations" | "marketing" | "sales" | "finance" | "hr")[],
          headshot: headshotId,
          bio: member.bio ?? null,
          linkedIn: member.linkedIn ?? null,
          sortOrder: member.sortOrder,
        },
        context: { disableRevalidate: true },
      });

      results.push({ id: created.id, name: created.name });
    }

    return NextResponse.json({
      message: `Seeded ${results.length} team members`,
      members: results,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 },
    );
  }
}
