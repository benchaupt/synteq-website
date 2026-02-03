import type { Block } from 'payload'

export const AIModel: Block = {
  slug: 'aiModel',
  interfaceName: 'AIModelBlock',
  labels: {
    singular: 'AI Model',
    plural: 'AI Models',
  },
  fields: [
    {
      name: 'modelId',
      type: 'text',
      label: 'Model ID',
      required: true,
      admin: {
        placeholder: 'e.g., meta-llama/Llama-3.3-70B-Instruct',
        description: 'Enter the full HuggingFace model ID',
      },
    },
    {
      name: 'showStats',
      type: 'checkbox',
      label: 'Show Download/Like Stats',
      defaultValue: true,
    },
    {
      name: 'showTags',
      type: 'checkbox',
      label: 'Show Tags',
      defaultValue: true,
    },
    {
      name: 'linkToModels',
      type: 'checkbox',
      label: 'Link to Models Page',
      defaultValue: true,
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'Call-to-Action Text',
      admin: {
        placeholder: 'e.g., Deploy this model',
      },
    },
  ],
}
