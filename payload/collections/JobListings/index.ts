import type { CollectionConfig } from "payload";

import { authenticated } from "@/payload/access/authenticated";
import { anyone } from "@/payload/access/anyone";
import {
  revalidateJobListing,
  revalidateJobListingDelete,
} from "@/payload/collections/JobListings/hooks/revalidateJobListing";

export const JobListings: CollectionConfig = {
  slug: "job-listings",
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["name", "department", "workLocation", "employmentType", "updatedAt"],
    useAsTitle: "name",
    description: "Job listings synced from Rippling ATS every 6 hours.",
    components: {
      beforeListTable: [
        "@/payload/collections/JobListings/SyncJobsButton#SyncJobsButton",
      ],
    },
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "ripplingId",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        description: "UUID from Rippling ATS",
      },
    },
    {
      name: "department",
      type: "text",
    },
    {
      name: "workLocation",
      type: "text",
    },
    {
      name: "employmentType",
      type: "text",
      admin: {
        description: "e.g. Salaried, full-time",
      },
    },
    {
      name: "descriptionMarkdown",
      type: "textarea",
      admin: {
        description: "Job description converted to markdown from Rippling",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
  hooks: {
    afterChange: [revalidateJobListing],
    afterDelete: [revalidateJobListingDelete],
  },
};
