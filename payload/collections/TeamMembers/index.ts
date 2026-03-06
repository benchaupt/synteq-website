import type { CollectionConfig } from "payload";

import { authenticated } from "@/payload/access/authenticated";
import { anyone } from "@/payload/access/anyone";
import {
  revalidateTeam,
  revalidateTeamDelete,
} from "@/payload/collections/TeamMembers/hooks/revalidateTeam";

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["name", "role", "department", "sortOrder", "updatedAt"],
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "text",
      required: true,
      admin: {
        description: "Job title (e.g. Co-founder & CEO, VP of Operations)",
      },
    },
    {
      name: "department",
      type: "select",
      hasMany: true,
      required: true,
      options: [
        { label: "Leadership", value: "leadership" },
        { label: "Board", value: "board" },
        { label: "Hardware", value: "hardware" },
        { label: "HPC", value: "hpc" },
        { label: "Engineering", value: "engineering" },
        { label: "Operations", value: "operations" },
        { label: "Marketing", value: "marketing" },
        { label: "Sales", value: "sales" },
        { label: "Finance", value: "finance" },
        { label: "HR", value: "hr" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "headshot",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Team member headshot image",
      },
    },
    {
      name: "bio",
      type: "textarea",
      admin: {
        description: "Short biography (shown on hover/flip on the team page)",
      },
    },
    {
      name: "linkedIn",
      type: "text",
      admin: {
        description: "Full LinkedIn profile URL",
      },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "Lower numbers appear first",
      },
    },
  ],
  hooks: {
    afterChange: [revalidateTeam],
    afterDelete: [revalidateTeamDelete],
  },
};
