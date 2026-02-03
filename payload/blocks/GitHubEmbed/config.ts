import type { Block } from 'payload'

export const GitHubEmbed: Block = {
  slug: 'githubEmbed',
  interfaceName: 'GitHubEmbedBlock',
  labels: {
    singular: 'GitHub Embed',
    plural: 'GitHub Embeds',
  },
  fields: [
    {
      name: 'embedType',
      type: 'select',
      label: 'Embed Type',
      required: true,
      defaultValue: 'repo',
      options: [
        { label: 'Repository', value: 'repo' },
        { label: 'Gist', value: 'gist' },
        { label: 'File', value: 'file' },
      ],
    },
    {
      name: 'url',
      type: 'text',
      label: 'GitHub URL',
      required: true,
      admin: {
        placeholder: 'https://github.com/owner/repo',
        description: 'Paste the GitHub repository, gist, or file URL',
      },
    },
    {
      name: 'showStats',
      type: 'checkbox',
      label: 'Show Stats (stars, forks, watchers)',
      defaultValue: true,
      admin: {
        condition: (_, siblingData) => siblingData?.embedType === 'repo',
      },
    },
    {
      name: 'showDescription',
      type: 'checkbox',
      label: 'Show Description',
      defaultValue: true,
      admin: {
        condition: (_, siblingData) => siblingData?.embedType === 'repo',
      },
    },
  ],
}
