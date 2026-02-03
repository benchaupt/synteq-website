import type { Block } from 'payload'

export const XEmbed: Block = {
  slug: 'xEmbed',
  interfaceName: 'XEmbedBlock',
  labels: {
    singular: 'X Post',
    plural: 'X Posts',
  },
  fields: [
    {
      name: 'tweetUrl',
      type: 'text',
      label: 'X/Twitter Post URL',
      required: true,
      admin: {
        placeholder: 'https://x.com/username/status/123456789',
        description: 'Paste the full URL of the X/Twitter post',
      },
    },
    {
      name: 'theme',
      type: 'select',
      label: 'Theme',
      defaultValue: 'dark',
      options: [
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
      ],
    },
  ],
}
