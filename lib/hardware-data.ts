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

export interface ComparisonSpecGroup {
  category: string
  specs: { label: string; value: string }[]
}

export interface Hardware {
  id: string
  image: string
  name: string
  manufacturer: string
  specs: HardwareSpec[]
  descriptions: HardwareDescription[]
  comparisonSpecs: ComparisonSpecGroup[]
}

export const MANUFACTURERS = ["Nvidia", "Intel"] as const
export type Manufacturer = (typeof MANUFACTURERS)[number]

export const hardware: Hardware[] = [
  {
    id: "1",
    image: "/assets/hardware/arc pro a40.png",
    name: "Intel Arc A40",
    manufacturer: "Intel",
    specs: [
      { label: "GPU Memory", value: "6", unit: "GB" },
      { label: "Bandwidth", value: "192", unit: "GB/s" },
      { label: "FP32", value: "3.5", unit: "TF" },
      { label: "FP16 Tensor", value: "N/A", accentValue: true },
      { label: "Shaders", value: "1024", unit: "EU×8" },
      { label: "Boost Clock", value: "1700", unit: "MHz" },
      { label: "Process", value: "6nm", accentValue: true },
      { label: "Architecture", value: "Xe-HPG", accentValue: true },
    ],
    descriptions: [
      {
        title: "Performance",
        text: "Built on Intel's Xe-HPG architecture, the Arc A40 delivers efficient compute for entry-level AI inference and visualization workloads with hardware ray tracing support.",
      },
      {
        title: "Memory",
        text: "6GB of GDDR6 memory with 192GB/s bandwidth provides capable throughput for lightweight inference tasks, edge deployments, and multi-display professional environments.",
      },
      {
        title: "Scalability",
        text: "Compact single-slot design enables high-density deployments in space-constrained environments, ideal for edge inference and cost-effective multi-GPU configurations.",
      },
    ],
    comparisonSpecs: [
      {
        category: "Basic Info",
        specs: [
          { label: "Architecture", value: "Xe-HPG (Alchemist)" },
          { label: "Process Node", value: "TSMC 6nm" },
          { label: "Transistors", value: "7.2B" },
        ],
      },
      {
        category: "Compute Units",
        specs: [
          { label: "CUDA Cores / Shaders", value: "1024 (EU×8)" },
          { label: "Tensor Cores", value: "128 XMX" },
          { label: "RT Cores", value: "8" },
        ],
      },
      {
        category: "Memory",
        specs: [
          { label: "GPU Memory", value: "6GB" },
          { label: "Memory Type", value: "GDDR6" },
          { label: "Memory Interface", value: "96-bit" },
          { label: "Memory Bandwidth", value: "192 GB/s" },
          { label: "Memory Speed", value: "16 Gbps" },
        ],
      },
      {
        category: "Clock Speeds",
        specs: [
          { label: "Base Clock", value: "1500 MHz" },
          { label: "Boost Clock", value: "1700 MHz" },
        ],
      },
      {
        category: "Compute Performance",
        specs: [
          { label: "FP64", value: "—" },
          { label: "FP32", value: "3.5 TF" },
          { label: "TF32 Tensor", value: "—" },
          { label: "FP16 Tensor", value: "—" },
          { label: "BF16 Tensor", value: "—" },
          { label: "FP8 Tensor", value: "—" },
          { label: "INT8 Tensor", value: "69 TOPS" },
          { label: "RT Core Perf", value: "—" },
        ],
      },
    ],
  },
  {
    id: "2",
    image: "/assets/hardware/a4000.png",
    name: "NVIDIA A4000",
    manufacturer: "Nvidia",
    specs: [
      { label: "GPU Memory", value: "16", unit: "GB" },
      { label: "Bandwidth", value: "448", unit: "GB/s" },
      { label: "FP32", value: "19.2", unit: "TF" },
      { label: "FP16 Tensor", value: "153.4", unit: "TF" },
      { label: "CUDA Cores", value: "6144" },
      { label: "Boost Clock", value: "1560", unit: "MHz" },
      { label: "Process", value: "8nm", accentValue: true },
      { label: "Architecture", value: "Ampere", accentValue: true },
    ],
    descriptions: [
      {
        title: "Performance",
        text: "The NVIDIA A4000 leverages the Ampere architecture with 3rd-gen Tensor Cores to deliver professional-grade AI inference and rendering in a single-slot form factor.",
      },
      {
        title: "Memory",
        text: "16GB of GDDR6 ECC memory with 448GB/s bandwidth supports medium-scale model inference with error-correcting reliability for enterprise production environments.",
      },
      {
        title: "Scalability",
        text: "Single-slot, low-power design enables multi-GPU rack configurations with PCIe Gen4 connectivity for scalable professional visualization and AI inference clusters.",
      },
    ],
    comparisonSpecs: [
      {
        category: "Basic Info",
        specs: [
          { label: "Architecture", value: "Ampere (GA104)" },
          { label: "Process Node", value: "Samsung 8nm" },
          { label: "Transistors", value: "17.4B" },
        ],
      },
      {
        category: "Compute Units",
        specs: [
          { label: "CUDA Cores / Shaders", value: "6144" },
          { label: "Tensor Cores", value: "192 (3rd Gen)" },
          { label: "RT Cores", value: "48 (2nd Gen)" },
        ],
      },
      {
        category: "Memory",
        specs: [
          { label: "GPU Memory", value: "16GB" },
          { label: "Memory Type", value: "GDDR6 ECC" },
          { label: "Memory Interface", value: "256-bit" },
          { label: "Memory Bandwidth", value: "448 GB/s" },
          { label: "Memory Speed", value: "14 Gbps" },
        ],
      },
      {
        category: "Clock Speeds",
        specs: [
          { label: "Base Clock", value: "735 MHz" },
          { label: "Boost Clock", value: "1560 MHz" },
        ],
      },
      {
        category: "Compute Performance",
        specs: [
          { label: "FP64", value: "0.6 TF" },
          { label: "FP32", value: "19.2 TF" },
          { label: "TF32 Tensor", value: "76.7 TF" },
          { label: "FP16 Tensor", value: "153.4 TF" },
          { label: "BF16 Tensor", value: "153.4 TF" },
          { label: "FP8 Tensor", value: "—" },
          { label: "INT8 Tensor", value: "307 TOPS" },
          { label: "RT Core Perf", value: "37.4 TF" },
        ],
      },
    ],
  },
  {
    id: "3",
    image: "/assets/hardware/4500.png",
    name: "NVIDIA A4500",
    manufacturer: "Nvidia",
    specs: [
      { label: "GPU Memory", value: "20", unit: "GB" },
      { label: "Bandwidth", value: "640", unit: "GB/s" },
      { label: "FP32", value: "23.7", unit: "TF" },
      { label: "FP16 Tensor", value: "189.2", unit: "TF" },
      { label: "CUDA Cores", value: "7168" },
      { label: "Boost Clock", value: "1650", unit: "MHz" },
      { label: "Process", value: "8nm", accentValue: true },
      { label: "Architecture", value: "Ampere", accentValue: true },
    ],
    descriptions: [
      {
        title: "Performance",
        text: "The NVIDIA A4500 builds on the Ampere GA102 die with expanded CUDA and Tensor cores, delivering enhanced AI training and rendering performance for professional workstations.",
      },
      {
        title: "Memory",
        text: "20GB of GDDR6 ECC memory with 640GB/s bandwidth provides headroom for larger models and complex datasets, bridging the gap between mid-range and high-end professional GPUs.",
      },
      {
        title: "Scalability",
        text: "NVLink bridge support enables dual-GPU configurations for demanding workloads, while PCIe Gen4 ensures broad compatibility with enterprise server platforms.",
      },
    ],
    comparisonSpecs: [
      {
        category: "Basic Info",
        specs: [
          { label: "Architecture", value: "Ampere (GA102)" },
          { label: "Process Node", value: "Samsung 8nm" },
          { label: "Transistors", value: "28.3B" },
        ],
      },
      {
        category: "Compute Units",
        specs: [
          { label: "CUDA Cores / Shaders", value: "7168" },
          { label: "Tensor Cores", value: "224 (3rd Gen)" },
          { label: "RT Cores", value: "56 (2nd Gen)" },
        ],
      },
      {
        category: "Memory",
        specs: [
          { label: "GPU Memory", value: "20GB" },
          { label: "Memory Type", value: "GDDR6 ECC" },
          { label: "Memory Interface", value: "320-bit" },
          { label: "Memory Bandwidth", value: "640 GB/s" },
          { label: "Memory Speed", value: "16 Gbps" },
        ],
      },
      {
        category: "Clock Speeds",
        specs: [
          { label: "Base Clock", value: "1050 MHz" },
          { label: "Boost Clock", value: "1650 MHz" },
        ],
      },
      {
        category: "Compute Performance",
        specs: [
          { label: "FP64", value: "0.74 TF" },
          { label: "FP32", value: "23.7 TF" },
          { label: "TF32 Tensor", value: "94.8 TF" },
          { label: "FP16 Tensor", value: "189.2 TF" },
          { label: "BF16 Tensor", value: "189.2 TF" },
          { label: "FP8 Tensor", value: "—" },
          { label: "INT8 Tensor", value: "378 TOPS" },
          { label: "RT Core Perf", value: "46.2 TF" },
        ],
      },
    ],
  },
  {
    id: "4",
    image: "/assets/hardware/3090.png",
    name: "NVIDIA RTX 3090",
    manufacturer: "Nvidia",
    specs: [
      { label: "GPU Memory", value: "24", unit: "GB" },
      { label: "Bandwidth", value: "936", unit: "GB/s" },
      { label: "FP32", value: "35.6", unit: "TF" },
      { label: "FP16 Tensor", value: "285", unit: "TF" },
      { label: "CUDA Cores", value: "10496" },
      { label: "Boost Clock", value: "1695", unit: "MHz" },
      { label: "Process", value: "8nm", accentValue: true },
      { label: "Architecture", value: "Ampere", accentValue: true },
    ],
    descriptions: [
      {
        title: "Performance",
        text: "The RTX 3090 packs the full GA102 die with 10,496 CUDA cores, delivering exceptional FP32 and tensor performance for deep learning training and high-resolution rendering.",
      },
      {
        title: "Memory",
        text: "24GB of GDDR6X memory with 936GB/s bandwidth via a 384-bit interface handles large batch training, 8K rendering, and multi-model inference without memory constraints.",
      },
      {
        title: "Scalability",
        text: "NVLink support for dual-GPU setups doubles available memory and compute for the most demanding research and content creation workflows.",
      },
    ],
    comparisonSpecs: [
      {
        category: "Basic Info",
        specs: [
          { label: "Architecture", value: "Ampere (GA102)" },
          { label: "Process Node", value: "Samsung 8nm" },
          { label: "Transistors", value: "28.3B" },
        ],
      },
      {
        category: "Compute Units",
        specs: [
          { label: "CUDA Cores / Shaders", value: "10496" },
          { label: "Tensor Cores", value: "328 (3rd Gen)" },
          { label: "RT Cores", value: "82 (2nd Gen)" },
        ],
      },
      {
        category: "Memory",
        specs: [
          { label: "GPU Memory", value: "24GB" },
          { label: "Memory Type", value: "GDDR6X" },
          { label: "Memory Interface", value: "384-bit" },
          { label: "Memory Bandwidth", value: "936 GB/s" },
          { label: "Memory Speed", value: "19.5 Gbps" },
        ],
      },
      {
        category: "Clock Speeds",
        specs: [
          { label: "Base Clock", value: "1395 MHz" },
          { label: "Boost Clock", value: "1695 MHz" },
        ],
      },
      {
        category: "Compute Performance",
        specs: [
          { label: "FP64", value: "0.56 TF" },
          { label: "FP32", value: "35.6 TF" },
          { label: "TF32 Tensor", value: "142 TF" },
          { label: "FP16 Tensor", value: "285 TF" },
          { label: "BF16 Tensor", value: "285 TF" },
          { label: "FP8 Tensor", value: "—" },
          { label: "INT8 Tensor", value: "285 TOPS" },
          { label: "RT Core Perf", value: "69 TF" },
        ],
      },
    ],
  },
  {
    id: "5",
    image: "/assets/hardware/5090.png",
    name: "NVIDIA RTX 5090",
    manufacturer: "Nvidia",
    specs: [
      { label: "GPU Memory", value: "32", unit: "GB" },
      { label: "Bandwidth", value: "1792", unit: "GB/s" },
      { label: "FP32", value: "104.8", unit: "TF" },
      { label: "FP16 Tensor", value: "838", unit: "TF" },
      { label: "CUDA Cores", value: "21760" },
      { label: "Boost Clock", value: "2407", unit: "MHz" },
      { label: "Process", value: "4nm", accentValue: true },
      { label: "Architecture", value: "Blackwell", accentValue: true },
    ],
    descriptions: [
      {
        title: "Performance",
        text: "The RTX 5090 on Blackwell architecture delivers a massive leap in AI and graphics performance with 21,760 CUDA cores and 5th-gen Tensor Cores for next-generation workloads.",
      },
      {
        title: "Memory",
        text: "32GB of GDDR7 memory with 1,792GB/s bandwidth on a 512-bit interface provides the throughput needed for large-scale model training and real-time AI inference.",
      },
      {
        title: "Scalability",
        text: "PCIe Gen5 with 64GB/s bidirectional bandwidth enables efficient multi-GPU configurations, while massive single-card throughput reduces the need for complex distributed setups.",
      },
    ],
    comparisonSpecs: [
      {
        category: "Basic Info",
        specs: [
          { label: "Architecture", value: "Blackwell (GB202)" },
          { label: "Process Node", value: "TSMC 4nm" },
          { label: "Transistors", value: "92B" },
        ],
      },
      {
        category: "Compute Units",
        specs: [
          { label: "CUDA Cores / Shaders", value: "21760" },
          { label: "Tensor Cores", value: "680 (5th Gen)" },
          { label: "RT Cores", value: "170 (4th Gen)" },
        ],
      },
      {
        category: "Memory",
        specs: [
          { label: "GPU Memory", value: "32GB" },
          { label: "Memory Type", value: "GDDR7" },
          { label: "Memory Interface", value: "512-bit" },
          { label: "Memory Bandwidth", value: "1792 GB/s" },
          { label: "Memory Speed", value: "28 Gbps" },
        ],
      },
      {
        category: "Clock Speeds",
        specs: [
          { label: "Base Clock", value: "2017 MHz" },
          { label: "Boost Clock", value: "2407 MHz" },
        ],
      },
      {
        category: "Compute Performance",
        specs: [
          { label: "FP64", value: "1.6 TF" },
          { label: "FP32", value: "104.8 TF" },
          { label: "TF32 Tensor", value: "419 TF" },
          { label: "FP16 Tensor", value: "838 TF" },
          { label: "BF16 Tensor", value: "838 TF" },
          { label: "FP8 Tensor", value: "1676 TF" },
          { label: "INT8 Tensor", value: "3352 TOPS" },
          { label: "RT Core Perf", value: "318 TF" },
        ],
      },
    ],
  },
  {
    id: "6",
    image: "/assets/hardware/RTX 6000 PRO Blackwell.png",
    name: "NVIDIA RTX PRO 6000",
    manufacturer: "Nvidia",
    specs: [
      { label: "GPU Memory", value: "96", unit: "GB" },
      { label: "Bandwidth", value: "1790", unit: "GB/s" },
      { label: "FP32", value: "125", unit: "TF" },
      { label: "FP16 Tensor", value: "1000", unit: "TF" },
      { label: "CUDA Cores", value: "24064" },
      { label: "Boost Clock", value: "2617", unit: "MHz" },
      { label: "Process", value: "5nm", accentValue: true },
      { label: "Architecture", value: "Blackwell", accentValue: true },
    ],
    descriptions: [
      {
        title: "Performance",
        text: "The RTX PRO 6000 is NVIDIA's flagship professional GPU on the Blackwell architecture, delivering unmatched compute with 24,064 CUDA cores and 5th-gen Tensor Cores.",
      },
      {
        title: "Memory",
        text: "96GB of GDDR7 ECC memory with 1,790GB/s bandwidth provides massive capacity and reliability for the largest AI models, scientific simulations, and professional visualization.",
      },
      {
        title: "Scalability",
        text: "Enterprise-grade features including ECC memory, NVLink bridge support, and vGPU compatibility make this the foundation for scalable AI infrastructure and virtual workstations.",
      },
    ],
    comparisonSpecs: [
      {
        category: "Basic Info",
        specs: [
          { label: "Architecture", value: "Blackwell (GB202)" },
          { label: "Process Node", value: "TSMC 5nm" },
          { label: "Transistors", value: "92B" },
        ],
      },
      {
        category: "Compute Units",
        specs: [
          { label: "CUDA Cores / Shaders", value: "24064" },
          { label: "Tensor Cores", value: "752 (5th Gen)" },
          { label: "RT Cores", value: "188 (4th Gen)" },
        ],
      },
      {
        category: "Memory",
        specs: [
          { label: "GPU Memory", value: "96GB" },
          { label: "Memory Type", value: "GDDR7 ECC" },
          { label: "Memory Interface", value: "512-bit" },
          { label: "Memory Bandwidth", value: "1790 GB/s" },
          { label: "Memory Speed", value: "28 Gbps" },
        ],
      },
      {
        category: "Clock Speeds",
        specs: [
          { label: "Base Clock", value: "~1600 MHz" },
          { label: "Boost Clock", value: "~2617 MHz" },
        ],
      },
      {
        category: "Compute Performance",
        specs: [
          { label: "FP64", value: "~2 TF" },
          { label: "FP32", value: "125 TF" },
          { label: "TF32 Tensor", value: "500 TF" },
          { label: "FP16 Tensor", value: "1000 TF" },
          { label: "BF16 Tensor", value: "1000 TF" },
          { label: "FP8 Tensor", value: "2000 TF" },
          { label: "INT8 Tensor", value: "4000 TOPS" },
          { label: "RT Core Perf", value: "380 TF" },
        ],
      },
    ],
  },
]

export const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-")
