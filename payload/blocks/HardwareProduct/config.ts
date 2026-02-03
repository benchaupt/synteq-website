import type { Block } from 'payload'

export const HardwareProduct: Block = {
  slug: 'hardwareProduct',
  interfaceName: 'HardwareProductBlock',
  labels: {
    singular: 'Hardware Product',
    plural: 'Hardware Products',
  },
  fields: [
    {
      name: 'hardwareId',
      type: 'select',
      label: 'Hardware',
      required: true,
      options: [
        { label: 'Nvidia H100', value: '1' },
        { label: 'Nvidia H200', value: '2' },
        { label: 'Nvidia A100', value: '3' },
        { label: 'AMD MI300X', value: '4' },
        { label: 'Google TPU v5e', value: '5' },
        { label: 'Intel Gaudi 2', value: '6' },
        { label: 'Nvidia L40S', value: '7' },
        { label: 'AWS Trainium', value: '8' },
      ],
    },
    {
      name: 'showSpecs',
      type: 'checkbox',
      label: 'Show Specifications',
      defaultValue: true,
    },
    {
      name: 'showDescription',
      type: 'checkbox',
      label: 'Show Description',
      defaultValue: true,
    },
    {
      name: 'linkToProduct',
      type: 'checkbox',
      label: 'Link to Product Page',
      defaultValue: true,
    },
  ],
}
