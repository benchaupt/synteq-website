/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";


import { AnimatedButton } from "@/app/_components/animated-button";
import { AnimatedCard } from "@/app/_components/animated-card";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Hardware {
    id: string;
    image: string;
    name: string;
}
const hardware: Hardware[] = [
    {
        id: "1",
        image: "/assets/hardware/Group 20.png",
        name: "Nvidia H100",
    },
    {
        id: "2",
        image: "/assets/hardware/Group 20.png",
        name: "Nvidia H200",
    },
    {
        id: "3",
        image: "/assets/hardware/Group 20.png",
        name: "Nvidia A100",
    },
    {
        id: "4",
        image: "/assets/hardware/Group 20.png",
        name: "AMD MI300X",
    },
    {
        id: "5",
        image: "/assets/hardware/Group 20.png",
        name: "Google TPU v5e",
    },
    {
        id: "6",
        image: "/assets/hardware/Group 20.png",
        name: "Intel Gaudi 2",
    },
    {
        id: "7",
        image: "/assets/hardware/Group 20.png",
        name: "Nvidia L40S",
    },
    {
        id: "8",
        image: "/assets/hardware/Group 20.png",
        name: "AWS Trainium",
    },
]

export const SelectHardware = ({ hideOverview = false, className = "" }: { hideOverview?: boolean, className?: string }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        dragFree: false,
    });
    const carouselRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemCount = hardware.length;

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
                        <div className="absolute top-0 left-0 w-[25px] sm:w-[200px] h-full bg-linear-to-r from-background to-transparent" style={{
                            zIndex: 999,
                        }} />
                        <div className="absolute top-0 right-0 w-[25px] sm:w-[200px] h-full bg-linear-to-l from-background to-transparent" style={{
                            zIndex: 999,
                        }} />
                        <div
                            className='flex w-full flex-row items-center justify-center gap-4 overflow-hidden py-4'
                            ref={carouselRef}
                        >
                            <div className='embla__viewport' ref={emblaRef}>
                                <div className='embla__container'>
                                    {hardware.map((hardware, index) => (
                                        <div key={index} onClick={() => {
                                            if (emblaApi) emblaApi.scrollTo(index);
                                        }}>
                                            <AnimatedCard className="sm:min-w-[300px] min-w-[150px] m-5 mx-4 sm:mx-8" disableScale disableTextColor isActive={index === currentIndex}>
                                                <div className="flex flex-col gap-2 sm:gap-10 items-center justify-center">
                                                    <img src={hardware.image} className="object-contain" />
                                                    <h3 className={cn("text-base sm:text-xl transition-all duration-400", index === currentIndex ? "text-accent" : "text-white")}>{hardware.name}</h3>
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
                <div className="max-w-viewport w-full mx-auto px-5">
                    <div className="py-12 md:py-16 flex flex-col gap-12">
                        <div className="flex flex-col sm:flex-row gap-6 justify-between sm:items-center items-start">
                            <div className="flex flex-col gap-3">
                                <p className="font-mono text-xs text-accent uppercase tracking-wider">Specifications</p>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-sequel-book">Nvidia H100</h2>
                            </div>
                            <Link href="/contact">
                              <AnimatedButton background={"dark"} className="hover:bg-background-secondary">Contact Sales</AnimatedButton>
                            </Link>
                        </div>
                        <div className="grid lg:grid-cols-5 gap-12 w-full">
                            <div className="lg:col-span-3 flex flex-col gap-12 order-2 lg:order-1">
                                {/* Key Specs Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div className="flex flex-col gap-2 p-4 rounded-lg border border-white/5 bg-background-secondary/50">
                                        <p className="font-mono text-xs text-white/40 uppercase tracking-wider">GPU Memory</p>
                                        <h3 className="text-2xl md:text-3xl inline-flex items-baseline gap-1">
                                            <span className="font-sequel-book">80</span>
                                            <span className="text-base text-accent">GB</span>
                                        </h3>
                                        </div>
                                    <div className="flex flex-col gap-2 p-4 rounded-lg border border-white/5 bg-background-secondary/50">
                                        <p className="font-mono text-xs text-white/40 uppercase tracking-wider">Bandwidth</p>
                                        <h3 className="text-2xl md:text-3xl inline-flex items-baseline gap-1">
                                            <span className="font-sequel-book">3.35</span>
                                            <span className="text-base text-accent">TB/s</span>
                                        </h3>
                                        </div>
                                    <div className="flex flex-col gap-2 p-4 rounded-lg border border-white/5 bg-background-secondary/50">
                                        <p className="font-mono text-xs text-white/40 uppercase tracking-wider">FP16</p>
                                        <h3 className="text-2xl md:text-3xl inline-flex items-baseline gap-1">
                                            <span className="font-sequel-book">989</span>
                                            <span className="text-base text-accent">TF</span>
                                        </h3>
                                        </div>
                                    <div className="flex flex-col gap-2 p-4 rounded-lg border border-white/5 bg-background-secondary/50">
                                        <p className="font-mono text-xs text-white/40 uppercase tracking-wider">FP8</p>
                                        <h3 className="text-2xl md:text-3xl inline-flex items-baseline gap-1">
                                            <span className="font-sequel-book">1979</span>
                                            <span className="text-base text-accent">TF</span>
                                        </h3>
                                        </div>
                                    <div className="flex flex-col gap-2 p-4 rounded-lg border border-white/5 bg-background-secondary/50">
                                        <p className="font-mono text-xs text-white/40 uppercase tracking-wider">TDP</p>
                                        <h3 className="text-2xl md:text-3xl inline-flex items-baseline gap-1">
                                            <span className="font-sequel-book">700</span>
                                            <span className="text-base text-accent">W</span>
                                        </h3>
                                        </div>
                                    <div className="flex flex-col gap-2 p-4 rounded-lg border border-white/5 bg-background-secondary/50">
                                        <p className="font-mono text-xs text-white/40 uppercase tracking-wider">NVLink</p>
                                        <h3 className="text-2xl md:text-3xl inline-flex items-baseline gap-1">
                                            <span className="font-sequel-book">900</span>
                                            <span className="text-base text-accent">GB/s</span>
                                        </h3>
                                        </div>
                                    <div className="flex flex-col gap-2 p-4 rounded-lg border border-white/5 bg-background-secondary/50">
                                        <p className="font-mono text-xs text-white/40 uppercase tracking-wider">Process</p>
                                        <h3 className="text-2xl md:text-3xl">
                                            <span className="font-sequel-book text-accent">4nm</span>
                                        </h3>
                                        </div>
                                    <div className="flex flex-col gap-2 p-4 rounded-lg border border-white/5 bg-background-secondary/50">
                                        <p className="font-mono text-xs text-white/40 uppercase tracking-wider">Form</p>
                                        <h3 className="text-2xl md:text-3xl">
                                            <span className="font-sequel-book text-accent">SXM5</span>
                                        </h3>
                                    </div>
                                </div>
                                
                                {/* Description Sections */}
                                <div className="grid md:grid-cols-3 gap-8 pt-4">
                                    <div className="flex flex-col gap-3">
                                        <h3 className="font-mono text-xs text-accent uppercase tracking-wider">Performance</h3>
                                        <p className="text-sm text-white/60 leading-relaxed">
                                            Built on the NVIDIA Hopper architecture, the H100 delivers up to 3x faster training and 30x faster inference than previous generations for large language models.
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <h3 className="font-mono text-xs text-accent uppercase tracking-wider">Memory</h3>
                                        <p className="text-sm text-white/60 leading-relaxed">
                                            80GB of HBM3 memory with 3.35TB/s bandwidth enables processing of massive datasets and complex models with unprecedented speed and efficiency.
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <h3 className="font-mono text-xs text-accent uppercase tracking-wider">Scalability</h3>
                                        <p className="text-sm text-white/60 leading-relaxed">
                                            NVLink connectivity at 900GB/s enables multi-GPU configurations to scale seamlessly across clusters for the most demanding AI workloads.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-2 flex items-start justify-center order-1 lg:order-2">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-accent/5 rounded-2xl blur-3xl" />
                                    <img src="/assets/hardware/Group 20.png" className="relative object-contain w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}