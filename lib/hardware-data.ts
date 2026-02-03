export interface HardwareSpec {
  label: string
  value: string
  unit?: string
  accentValue?: boolean
}

export interface HardwareDescription {
  title: string
  text: string
}

export interface Hardware {
  id: string
  image: string
  name: string
  manufacturer: string
  specs: HardwareSpec[]
  descriptions: HardwareDescription[]
}

export const MANUFACTURERS = ["Nvidia", "AMD", "Google", "Intel", "AWS"] as const
export type Manufacturer = typeof MANUFACTURERS[number]

export const hardware: Hardware[] = [
  {
    id: "1",
    image: "/assets/hardware/Group 20.png",
    name: "Nvidia H100",
    manufacturer: "Nvidia",
    specs: [
      { label: "GPU Memory", value: "80", unit: "GB" },
      { label: "Bandwidth", value: "3.35", unit: "TB/s" },
      { label: "FP16", value: "989", unit: "TF" },
      { label: "FP8", value: "1979", unit: "TF" },
      { label: "TDP", value: "700", unit: "W" },
      { label: "NVLink", value: "900", unit: "GB/s" },
      { label: "Process", value: "4nm", accentValue: true },
      { label: "Form", value: "SXM5", accentValue: true },
    ],
    descriptions: [
      {
        title: "Performance",
        text: "Built on the NVIDIA Hopper architecture, the H100 delivers up to 3x faster training and 30x faster inference than previous generations for large language models.",
      },
      {
        title: "Memory",
        text: "80GB of HBM3 memory with 3.35TB/s bandwidth enables processing of massive datasets and complex models with unprecedented speed and efficiency.",
      },
      {
        title: "Scalability",
        text: "NVLink connectivity at 900GB/s enables multi-GPU configurations to scale seamlessly across clusters for the most demanding AI workloads.",
      },
    ],
  },
  {
    id: "2",
    image: "/assets/hardware/Group 20.png",
    name: "Nvidia H200",
    manufacturer: "Nvidia",
    specs: [
      { label: "GPU Memory", value: "141", unit: "GB" },
      { label: "Bandwidth", value: "4.8", unit: "TB/s" },
      { label: "FP16", value: "989", unit: "TF" },
      { label: "FP8", value: "1979", unit: "TF" },
      { label: "TDP", value: "700", unit: "W" },
      { label: "NVLink", value: "900", unit: "GB/s" },
      { label: "Process", value: "4nm", accentValue: true },
      { label: "Form", value: "SXM5", accentValue: true },
    ],
    descriptions: [
      {
        title: "Performance",
        text: "The H200 builds on Hopper architecture with significantly increased memory capacity, enabling larger model inference and reduced memory bottlenecks for enterprise AI.",
      },
      {
        title: "Memory",
        text: "141GB of HBM3e memory with 4.8TB/s bandwidth—nearly 1.8x the capacity of H100—handles the largest language models without memory constraints.",
      },
      {
        title: "Scalability",
        text: "Maintains full NVLink compatibility at 900GB/s for seamless integration into existing H100 clusters while delivering enhanced memory performance.",
      },
    ],
  },
  {
    id: "3",
    image: "/assets/hardware/Group 20.png",
    name: "Nvidia A100",
    manufacturer: "Nvidia",
    specs: [
      { label: "GPU Memory", value: "80", unit: "GB" },
      { label: "Bandwidth", value: "2.0", unit: "TB/s" },
      { label: "FP16", value: "312", unit: "TF" },
      { label: "FP64", value: "19.5", unit: "TF" },
      { label: "TDP", value: "400", unit: "W" },
      { label: "NVLink", value: "600", unit: "GB/s" },
      { label: "Process", value: "7nm", accentValue: true },
      { label: "Form", value: "SXM4", accentValue: true },
    ],
    descriptions: [
      {
        title: "Performance",
        text: "The A100 Ampere architecture delivers versatile performance for both training and inference workloads, with proven reliability across thousands of deployments.",
      },
      {
        title: "Memory",
        text: "80GB HBM2e memory with 2TB/s bandwidth provides excellent capacity for most production AI models at an optimized price-performance ratio.",
      },
      {
        title: "Scalability",
        text: "Multi-Instance GPU (MIG) technology allows partitioning into up to 7 isolated instances, maximizing utilization for diverse workloads.",
      },
    ],
  },
  {
    id: "4",
    image: "/assets/hardware/Group 20.png",
    name: "AMD MI300X",
    manufacturer: "AMD",
    specs: [
      { label: "GPU Memory", value: "192", unit: "GB" },
      { label: "Bandwidth", value: "5.3", unit: "TB/s" },
      { label: "FP16", value: "1307", unit: "TF" },
      { label: "FP8", value: "2615", unit: "TF" },
      { label: "TDP", value: "750", unit: "W" },
      { label: "Infinity Fabric", value: "896", unit: "GB/s" },
      { label: "Process", value: "5nm", accentValue: true },
      { label: "Form", value: "OAM", accentValue: true },
    ],
    descriptions: [
      {
        title: "Performance",
        text: "AMD's CDNA 3 architecture delivers exceptional AI inference performance with industry-leading memory capacity for running the largest open-source models.",
      },
      {
        title: "Memory",
        text: "192GB of HBM3 memory—the highest in its class—with 5.3TB/s bandwidth enables running 70B+ parameter models without model parallelism overhead.",
      },
      {
        title: "Scalability",
        text: "Infinity Fabric connectivity enables efficient multi-GPU scaling with full ROCm software stack compatibility for PyTorch and major AI frameworks.",
      },
    ],
  },
  {
    id: "5",
    image: "/assets/hardware/Group 20.png",
    name: "Google TPU v5e",
    manufacturer: "Google",
    specs: [
      { label: "HBM Memory", value: "16", unit: "GB" },
      { label: "Bandwidth", value: "819", unit: "GB/s" },
      { label: "BF16", value: "197", unit: "TF" },
      { label: "INT8", value: "394", unit: "TOPS" },
      { label: "TDP", value: "200", unit: "W" },
      { label: "ICI", value: "1600", unit: "Gbps" },
      { label: "Process", value: "7nm", accentValue: true },
      { label: "Form", value: "Pod", accentValue: true },
    ],
    descriptions: [
      {
        title: "Performance",
        text: "Purpose-built for cost-efficient inference and training of transformer models, TPU v5e delivers exceptional performance-per-dollar for cloud AI workloads.",
      },
      {
        title: "Memory",
        text: "16GB HBM per chip is optimized for inference workloads, with pods scaling to thousands of chips for distributed training of massive models.",
      },
      {
        title: "Scalability",
        text: "Inter-Chip Interconnect (ICI) at 1600Gbps enables seamless scaling across TPU pods with JAX and TensorFlow native optimization.",
      },
    ],
  },
  {
    id: "6",
    image: "/assets/hardware/Group 20.png",
    name: "Intel Gaudi 2",
    manufacturer: "Intel",
    specs: [
      { label: "HBM Memory", value: "96", unit: "GB" },
      { label: "Bandwidth", value: "2.45", unit: "TB/s" },
      { label: "BF16", value: "432", unit: "TF" },
      { label: "FP8", value: "865", unit: "TF" },
      { label: "TDP", value: "600", unit: "W" },
      { label: "RDMA", value: "2100", unit: "Gbps" },
      { label: "Process", value: "7nm", accentValue: true },
      { label: "Form", value: "OAM", accentValue: true },
    ],
    descriptions: [
      {
        title: "Performance",
        text: "Intel Gaudi 2 delivers competitive deep learning performance with native PyTorch support and optimized software stack for enterprise AI deployments.",
      },
      {
        title: "Memory",
        text: "96GB of HBM2e memory provides ample capacity for large language models while maintaining excellent price-performance for production inference.",
      },
      {
        title: "Scalability",
        text: "Integrated RDMA networking at 2100Gbps enables efficient distributed training across Gaudi 2 clusters without external network switches.",
      },
    ],
  },
  {
    id: "7",
    image: "/assets/hardware/Group 20.png",
    name: "Nvidia L40S",
    manufacturer: "Nvidia",
    specs: [
      { label: "GPU Memory", value: "48", unit: "GB" },
      { label: "Bandwidth", value: "864", unit: "GB/s" },
      { label: "FP16", value: "362", unit: "TF" },
      { label: "FP8", value: "724", unit: "TF" },
      { label: "TDP", value: "350", unit: "W" },
      { label: "PCIe", value: "64", unit: "GB/s" },
      { label: "Process", value: "4nm", accentValue: true },
      { label: "Form", value: "PCIe", accentValue: true },
    ],
    descriptions: [
      {
        title: "Performance",
        text: "The L40S combines Ada Lovelace architecture with enterprise features, delivering excellent inference performance in standard PCIe form factor.",
      },
      {
        title: "Memory",
        text: "48GB GDDR6 with ECC provides reliable memory for production inference workloads with lower cost than HBM-based accelerators.",
      },
      {
        title: "Scalability",
        text: "PCIe Gen4 x16 interface enables deployment in standard servers without specialized infrastructure, ideal for edge and distributed inference.",
      },
    ],
  },
  {
    id: "8",
    image: "/assets/hardware/Group 20.png",
    name: "AWS Trainium",
    manufacturer: "AWS",
    specs: [
      { label: "HBM Memory", value: "32", unit: "GB" },
      { label: "Bandwidth", value: "820", unit: "GB/s" },
      { label: "BF16", value: "210", unit: "TF" },
      { label: "FP8", value: "420", unit: "TF" },
      { label: "TDP", value: "280", unit: "W" },
      { label: "NeuronLink", value: "768", unit: "Gbps" },
      { label: "Process", value: "7nm", accentValue: true },
      { label: "Form", value: "Custom", accentValue: true },
    ],
    descriptions: [
      {
        title: "Performance",
        text: "AWS-designed silicon optimized for training transformer models, delivering up to 50% cost savings compared to GPU-based alternatives on AWS.",
      },
      {
        title: "Memory",
        text: "32GB HBM per chip with 820GB/s bandwidth, optimized for AWS Neuron SDK and seamless integration with SageMaker workflows.",
      },
      {
        title: "Scalability",
        text: "NeuronLink interconnect enables efficient scaling across Trn1 instances with EFA networking for distributed training at cloud scale.",
      },
    ],
  },
]

export const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-")
