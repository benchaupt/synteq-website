import type { Block } from 'payload'

export const HardwareComparison: Block = {
  slug: 'hardwareComparison',
  interfaceName: 'HardwareComparisonBlock',
  labels: {
    singular: 'Hardware Comparison',
    plural: 'Hardware Comparisons',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Comparison Title',
      admin: {
        placeholder: 'e.g., H100 vs A100: Which is Right for You?',
      },
    },
    {
      name: 'hardwareIds',
      type: 'select',
      hasMany: true,
      label: 'Hardware to Compare',
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
      admin: {
        description: 'Select 2-4 hardware products to compare',
      },
    },
    {
      name: 'highlightSpec',
      type: 'select',
      label: 'Highlight Best Value For',
      options: [
        { label: 'None', value: 'none' },
        { label: 'GPU Memory', value: 'GPU Memory' },
        { label: 'Bandwidth', value: 'Bandwidth' },
        { label: 'FP16 Performance', value: 'FP16' },
        { label: 'FP8 Performance', value: 'FP8' },
        { label: 'Power Efficiency', value: 'TDP' },
      ],
      defaultValue: 'none',
    },
    {
      name: 'showFullSpecs',
      type: 'checkbox',
      label: 'Show All Specifications',
      defaultValue: true,
    },
  ],
}
