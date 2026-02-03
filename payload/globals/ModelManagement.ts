import type { GlobalConfig } from 'payload'

export const ModelManagement: GlobalConfig = {
  slug: 'model-management',
  label: 'AI Models',
  admin: {
    group: 'Models',
    description: 'Manage HuggingFace AI models in your database',
  },
  fields: [
    {
      type: 'ui',
      name: 'importSection',
      admin: {
        components: {
          Field: '/payload/globals/ModelManagement/ImportModelField#ImportModelField',
        },
      },
    },
    {
      type: 'ui',
      name: 'modelListSection',
      admin: {
        components: {
          Field: '/payload/globals/ModelManagement/ModelListField#ModelListField',
        },
      },
    },
  ],
}
