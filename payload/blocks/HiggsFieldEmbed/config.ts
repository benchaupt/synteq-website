import type { Block } from 'payload'

export const HiggsFieldEmbed: Block = {
  slug: 'higgsFieldEmbed',
  interfaceName: 'HiggsFieldEmbedBlock',
  labels: {
    singular: 'Higgsfield Video',
    plural: 'Higgsfield Videos',
  },
  fields: [
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Higgsfield Video URL',
      required: true,
      admin: {
        placeholder: 'https://higgsfield.ai/video/...',
        description: 'Paste the Higgsfield video URL',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
      admin: {
        description: 'Optional caption for the video',
      },
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      label: 'Autoplay (muted)',
      defaultValue: false,
    },
    {
      name: 'loop',
      type: 'checkbox',
      label: 'Loop',
      defaultValue: true,
    },
  ],
}
