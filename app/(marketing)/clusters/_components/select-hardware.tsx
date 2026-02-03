/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { AnimatedButton } from "@/app/_components/animated-button";
import { AnimatedCard } from "@/app/_components/animated-card";
import { ComparisonModal } from "@/app/_components/comparison-modal";
import { cn } from "@/lib/utils";
import { hardware, toSlug } from "@/lib/hardware-data";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

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

interface SelectHardwareProps {
    hideOverview?: boolean
    className?: string
    navigateOnClick?: boolean
    onCompare?: (selectedIds: string[]) => void
}

const SelectHardwareInner = ({ hideOverview = false, className = "", navigateOnClick = false, onCompare }: SelectHardwareProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        dragFree: false,
    });
    const carouselRef = useRef<HTMLDivElement>(null);
    const specsRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
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
            <div className="max-w-viewport w-full mx-auto px-5">
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
                                                router.push(`/clusters?product=${toSlug(item.name)}`);
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
                            <div className="flex gap-3">
                              <Link href="/contact">
                                <AnimatedButton background={"dark"} className="hover:bg-background-secondary">Contact Sales</AnimatedButton>
                              </Link>
                            </div>
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

            {/* Comparison Modal */}
            <ComparisonModal
                isOpen={isCompareModalOpen}
                onClose={() => setIsCompareModalOpen(false)}
                initialSelected={[hardware[currentIndex].id]}
                onCompare={onCompare}
            />
        </div>
    )
}

export const SelectHardware = (props: SelectHardwareProps) => {
    return (
        <Suspense fallback={<div className="max-w-viewport w-full mx-auto px-5 py-6 md:py-8" />}>
            <SelectHardwareInner {...props} />
        </Suspense>
    )
}