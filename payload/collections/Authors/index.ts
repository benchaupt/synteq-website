import type { CollectionConfig } from "payload";

import { authenticated } from "@/payload/access/authenticated";
import { anyone } from "@/payload/access/anyone";
import { slugField } from "@/payload/fields/slug";

export const Authors: CollectionConfig = {
  slug: "authors",
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["name", "title", "updatedAt"],
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "title",
      type: "text",
      admin: {
        description: "Role or job title (e.g. VP of Operations, Senior Analyst)",
      },
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Author headshot image",
      },
    },
    ...slugField("name"),
  ],
};
