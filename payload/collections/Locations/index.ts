import type { CollectionConfig } from "payload";

import {
  revalidateLocation,
  revalidateLocationDelete,
} from "./hooks/revalidateLocation";

export const Locations: CollectionConfig = {
  slug: "locations",
  labels: {
    singular: "Location",
    plural: "Locations",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "city", "state", "type", "sortOrder"],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [revalidateLocation],
    afterDelete: [revalidateLocationDelete],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: {
        description: 'Display name, e.g. "Dallas"',
      },
    },
    {
      name: "zipCode",
      type: "text",
      admin: {
        description:
          "Enter a US zip code to auto-fill city, state, and country",
        components: {
          Field:
            "@/payload/fields/zip-lookup/ZipLookupComponent#ZipLookupComponent",
        },
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "city",
          type: "text",
          required: true,
          admin: { width: "33%" },
        },
        {
          name: "state",
          type: "text",
          required: true,
          admin: {
            width: "33%",
            description: "State abbreviation, used for card grouping",
          },
        },
        {
          name: "country",
          type: "text",
          required: true,
          defaultValue: "US",
          admin: { width: "33%" },
        },
      ],
    },
    {
      name: "type",
      type: "select",
      required: true,
      defaultValue: "domestic",
      options: [
        { label: "Domestic", value: "domestic" },
        { label: "International", value: "international" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "coordinates",
      type: "group",
      admin: {
        description: "Click the map to set coordinates",
        components: {
          Field:
            "@/payload/fields/map-picker/MapPickerComponent#MapPickerComponent",
        },
      },
      fields: [
        {
          name: "x",
          type: "number",
          required: true,
          admin: {
            step: 1,
            description: "X coordinate in SVG viewBox (0–5795)",
          },
        },
        {
          name: "y",
          type: "number",
          required: true,
          admin: {
            step: 1,
            description: "Y coordinate in SVG viewBox (0–3821)",
          },
        },
      ],
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "Lower numbers display first",
      },
    },
  ],
};
