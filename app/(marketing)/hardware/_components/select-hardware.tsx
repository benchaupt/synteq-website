/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";


import { AnimatedButton } from "@/app/_components/animated-button";
import { AnimatedCard } from "@/app/_components/animated-card";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

interface HardwareSpec {
    label: string;
    value: string;
    unit?: string;
    accentValue?: boolean;
}

interface HardwareDescription {
    title: string;
    text: string;
}

interface Hardware {
    id: string;
    image: string;
    name: string;
    specs: HardwareSpec[];
    descriptions: HardwareDescription[];
}

interface SpecItemProps {
    label: string;
    value: string;
    unit?: string;
    accentValue?: boolean;
}

const SpecItem = ({ label, value, unit, accentValue = false }: SpecItemProps) => (
    <div className="flex flex-col gap-1">
        <p className="font-mono text-xs text-white/40 uppercase tracking-wider">{label}</p>
        <h3 className="text-2xl md:text-3xl inline-flex items-baseline gap-1">
            <span className={cn("font-sequel-book", accentValue && "text-accent")}>{value}</span>
            {unit && <span className="text-base text-accent">{unit}</span>}
        </h3>
    </div>
)
const hardware: Hardware[] = [
    {
        id: "1",
        image: "/assets/hardware/Group 20.png",
        name: "Nvidia H100",
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

const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

const SelectHardwareInner = ({ hideOverview = false, className = "", navigateOnClick = false }: { hideOverview?: boolean, className?: string, navigateOnClick?: boolean }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        dragFree: false,
    });
    const carouselRef = useRef<HTMLDivElement>(null);
    const specsRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemCount = hardware.length;

    // Read URL param and scroll to that hardware on mount
    useEffect(() => {
        if (!emblaApi) return;
        const productSlug = searchParams.get("product");
        if (productSlug) {
            const index = hardware.findIndex((h) => toSlug(h.name) === productSlug);
            if (index !== -1) {
                emblaApi.scrollTo(index, true);
                // Scroll to specs section after a short delay
                setTimeout(() => {
                    specsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 100);
            }
        }
    }, [emblaApi, searchParams]);

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setCurrentIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on("select", onSelect);
        onSelect(); // Set initial index

        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi]);

    return (
        <div>
            <div className="bg-dark max-w-viewport w-full mx-auto px-5">
                {/* hw selector */}
                <div className={cn("py-6 md:py-8 flex flex-col gap-8", className)}>
                    <div className="relative flex flex-col gap-8">
                        <div className="absolute top-0 left-0 w-[25px] sm:w-[200px] h-full bg-linear-to-r from-background to-transparent pointer-events-none z-10" />
                        <div className="absolute top-0 right-0 w-[25px] sm:w-[200px] h-full bg-linear-to-l from-background to-transparent pointer-events-none z-10" />
                        <div
                            className='flex w-full flex-row items-center justify-center gap-4 overflow-hidden py-4'
                            ref={carouselRef}
                        >
                            <div className='embla__viewport' ref={emblaRef}>
                                <div className='embla__container'>
                                    {hardware.map((item, index) => (
                                        <div key={index} onClick={() => {
                                            if (emblaApi) {
                                                emblaApi.scrollTo(index);
                                            }
                                            if (navigateOnClick) {
                                                router.push(`/hardware?product=${toSlug(item.name)}`);
                                            }
                                        }}>
                                            <AnimatedCard className="sm:min-w-[300px] min-w-[250px] m-5 mx-4 sm:mx-8" disableScale disableTextColor isActive={!navigateOnClick && index === currentIndex}>
                                                <div className="flex flex-col gap-2 sm:gap-10 items-center justify-center">
                                                    <img src={item.image} className="object-contain" />
                                                    <h3 className={cn("font-mono text-md md:text-md lg:text-md text-center transition-all duration-400", !navigateOnClick && index === currentIndex ? "text-accent" : "text-white")}>{item.name}</h3>
                                                </div>
                                            </AnimatedCard>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 items-center justify-center">
                        <button 
                            className="size-10 relative flex items-center justify-center hover:bg-white/5 rounded-lg transition-colors group" 
                            onClick={() => {
                                if (emblaApi) emblaApi.scrollPrev();
                            }}
                        >
                            {/* Corner accents */}
                            <span className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/30 group-hover:border-accent transition-colors" />
                            <span className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/30 group-hover:border-accent transition-colors" />
                            <span className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/30 group-hover:border-accent transition-colors" />
                            <span className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/30 group-hover:border-accent transition-colors" />
                            <svg className="size-4" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.2927 7.36992C15.2927 6.87117 14.8881 6.46651 14.3889 6.46612L4.94015 6.46613C4.18743 6.46613 3.81031 5.55582 4.34272 5.02341L7.81181 1.55432C8.16484 1.20129 8.16484 0.6291 7.81181 0.276071L7.79881 0.263067C7.44616 -0.0888145 6.87435 -0.0891969 6.52132 0.263832L0.415415 6.36974C-0.137269 6.92243 -0.137269 7.81819 0.415414 8.37088L6.52132 14.4768C6.87435 14.8298 7.44654 14.8298 7.79957 14.4768L7.81257 14.4638C8.1656 14.1107 8.1656 13.5386 7.81257 13.1855L4.3431 9.71606C3.81069 9.18364 4.18781 8.27334 4.94053 8.27334L14.3889 8.27372C14.8877 8.27372 15.2924 7.86906 15.2924 7.37031L15.2927 7.36992Z" fill="white" />
                            </svg>
                        </button>
                        <div className="px-3 md:px-5 flex flex-row items-center gap-1.5">
                            {Array.from({ length: itemCount }).map((_, index) => (
                                <button key={index} className={cn("h-1.5 rounded-full transition-all duration-400", index === currentIndex ? "bg-white w-4" : "bg-white/50 w-1.5")} onClick={() => {
                                    if (emblaApi) emblaApi.scrollTo(index);
                                }} />
                            ))}
                        </div>
                        <button 
                            className="size-10 relative flex items-center justify-center hover:bg-white/5 rounded-lg transition-colors group" 
                            onClick={() => {
                                if (emblaApi) emblaApi.scrollNext();
                            }}
                        >
                            {/* Corner accents */}
                            <span className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/30 group-hover:border-accent transition-colors" />
                            <span className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/30 group-hover:border-accent transition-colors" />
                            <span className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/30 group-hover:border-accent transition-colors" />
                            <span className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/30 group-hover:border-accent transition-colors" />
                            <svg className="size-4" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.000235885 7.36992C0.000235485 6.87117 0.404899 6.46651 0.904036 6.46612L10.3528 6.46613C11.1055 6.46613 11.4827 5.55582 10.9503 5.02341L7.48116 1.55432C7.12813 1.20129 7.12813 0.6291 7.48116 0.276071L7.49416 0.263067C7.84681 -0.0888145 8.41862 -0.0891969 8.77164 0.263832L14.8776 6.36974C15.4302 6.92243 15.4302 7.81819 14.8776 8.37088L8.77165 14.4768C8.41862 14.8298 7.84643 14.8298 7.4934 14.4768L7.4804 14.4638C7.12737 14.1107 7.12737 13.5386 7.48039 13.1855L10.9499 9.71606C11.4823 9.18364 11.1052 8.27334 10.3524 8.27334L0.904036 8.27372C0.405282 8.27372 0.000618115 7.86906 0.000618368 7.37031L0.000235885 7.36992Z" fill="white" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {!hideOverview && (
                <div ref={specsRef} className="max-w-viewport w-full mx-auto px-5 overflow-hidden">
                    <div className="py-12 md:py-16 flex flex-col gap-6">
                        <div className="flex flex-col sm:flex-row gap-6 justify-between sm:items-center items-center md:items-start">
                            <div className="flex flex-col gap-3">
                                <p className="font-mono text-xs text-accent uppercase tracking-wider text-center md:text-left">Specifications</p>
                                <AnimatePresence mode="wait">
                                    <motion.h2
                                        key={currentIndex}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className="heading"
                                    >
                                        {hardware[currentIndex].name}
                                    </motion.h2>
                                </AnimatePresence>
                            </div>
                            <Link href="/contact">
                              <AnimatedButton background={"dark"} className="hover:bg-background-secondary">Contact Sales</AnimatedButton>
                            </Link>
                        </div>
                        <div className="grid lg:grid-cols-5 gap-12 w-full">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="lg:col-span-3 flex flex-col gap-20 order-2 lg:order-1 pt-14"
                                >
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        {hardware[currentIndex].specs.map((spec, index) => (
                                            <SpecItem
                                                key={index}
                                                label={spec.label}
                                                value={spec.value}
                                                unit={spec.unit}
                                                accentValue={spec.accentValue}
                                            />
                                        ))}
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-8">
                                        {hardware[currentIndex].descriptions.map((desc, index) => (
                                            <div key={index} className="flex flex-col gap-3">
                                                <h3 className="font-mono text-sm text-accent uppercase tracking-wider">{desc.title}</h3>
                                                <p className="text-base text-white/60 leading-relaxed">
                                                    {desc.text}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                            <div className="lg:col-span-2 flex items-start justify-end order-1 lg:order-2">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -30 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="relative"
                                    >
                                        <img src={hardware[currentIndex].image} className="relative object-contain w-full" alt={hardware[currentIndex].name} />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export const SelectHardware = (props: { hideOverview?: boolean, className?: string, navigateOnClick?: boolean }) => {
    return (
        <Suspense fallback={<div className="max-w-viewport w-full mx-auto px-5 py-6 md:py-8" />}>
            <SelectHardwareInner {...props} />
        </Suspense>
    )
}