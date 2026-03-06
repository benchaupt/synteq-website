import type { CollectionConfig } from "payload";

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

import { authenticated } from "@/payload/access/authenticated";
import { authenticatedOrPublished } from "@/payload/access/authenticatedOrPublished";
import { Banner } from "@/payload/blocks/Banner/config";
import { Code } from "@/payload/blocks/Code/config";
import { MediaBlock } from "@/payload/blocks/MediaBlock/config";
import {
  revalidateSuccessStory,
  revalidateSuccessStoryDelete,
} from "@/payload/collections/SuccessStories/hooks/revalidateSuccessStory";
import { ensureSingleFeatured } from "@/payload/collections/SuccessStories/hooks/ensureSingleFeatured";
import { slugField } from "@/payload/fields/slug";
import { generatePreviewPath } from "@/payload/utilities/generatePreviewPath";
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";

export const SuccessStories: CollectionConfig = {
  slug: "success-stories",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    excerpt: true,
    client: true,
    clientLogo: true,
    coverImage: true,
    industry: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ["title", "client", "industry", "updatedAt"],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === "string" ? data.slug : "",
          collection: "success-stories",
          req,
        });
        return path;
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === "string" ? data.slug : "",
        collection: "success-stories",
        req,
      }),
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
    },
    {
      name: "client",
      type: "text",
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "clientLogo",
      type: "upload",
      relationTo: "media",
      admin: {
        position: "sidebar",
        description: "Client logo displayed on success story cards",
      },
    },
    {
      name: "industry",
      type: "select",
      options: [
        { label: "Technology", value: "technology" },
        { label: "Finance", value: "finance" },
        { label: "Healthcare", value: "healthcare" },
        { label: "Manufacturing", value: "manufacturing" },
        { label: "Education", value: "education" },
        { label: "Government", value: "government" },
        { label: "Energy", value: "energy" },
        { label: "Other", value: "other" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description:
          "Feature this story on the landing page and nav. Only one story can be featured at a time.",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          fields: [
            {
              name: "coverImage",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "content",
              type: "richText",
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({
                      enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
                    }),
                    BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ];
                },
              }),
              label: false,
              required: true,
            },
          ],
          label: "Content",
        },
        {
          fields: [
            {
              name: "metrics",
              type: "array",
              fields: [
                { name: "label", type: "text", required: true },
                { name: "value", type: "text", required: true },
              ],
            },
            {
              name: "testimonial",
              type: "group",
              fields: [
                { name: "quote", type: "textarea" },
                { name: "author", type: "text" },
                { name: "role", type: "text" },
              ],
            },
          ],
          label: "Metrics & Testimonial",
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({ hasGenerateFn: true }),
            MetaImageField({ relationTo: "media" }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        date: { pickerAppearance: "dayAndTime" },
        position: "sidebar",
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === "published" && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
    ...slugField(),
  ],
  hooks: {
    beforeChange: [ensureSingleFeatured],
    afterChange: [revalidateSuccessStory],
    afterDelete: [revalidateSuccessStoryDelete],
  },
  versions: {
    drafts: {
      autosave: { interval: 100 },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
