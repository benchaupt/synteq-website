/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";


import { AnimatedButton } from "@/app/_components/animated-button";
import { AnimatedCard } from "@/app/_components/animated-card";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
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
        name: "Nvidia H100",
    },

    {
        id: "3",
        image: "/assets/hardware/Group 20.png",
        name: "Nvidia H100",
    },
    {
        id: "4",
        image: "/assets/hardware/Group 20.png",
        name: "Nvidia H100",
    },
    {
        id: "5",
        image: "/assets/hardware/Group 20.png",
        name: "Nvidia H100",
    },
    {
        id: "6",
        image: "/assets/hardware/Group 20.png",
        name: "Nvidia H100",
    },
    {
        id: "7",
        image: "/assets/hardware/Group 20.png",
        name: "Nvidia H100",
    },
    {
        id: "8",
        image: "/assets/hardware/Group 20.png",
        name: "Nvidia H100",
    },
    {
        id: "9",
        image: "/assets/hardware/Group 20.png",
        name: "Nvidia H100",
    },
    {
        id: "10",
        image: "/assets/hardware/Group 20.png",
        name: "Nvidia H100",
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
                <div className={cn("py-16 sm:py-32 sm:pt-48 flex flex-col gap-8", className)}>
                    <div className="relative flex flex-col gap-8">
                        <div className="absolute top-0 left-0 w-[25px] sm:w-[200px] h-full bg-linear-to-r from-background to-transparent" style={{
                            zIndex: 999,
                        }} />
                        <div className="absolute top-0 right-0 w-[25px] sm:w-[200px] h-full bg-linear-to-l from-background to-transparent" style={{
                            zIndex: 999,
                        }} />
                        <div
                            className='flex w-full flex-row items-center justify-center gap-4 overflow-hidden py-8'
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
                        <button className="p-2" onClick={() => {
                            if (emblaApi) emblaApi.scrollPrev();
                        }}>
                            <svg className="size-4" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.2927 7.36992C15.2927 6.87117 14.8881 6.46651 14.3889 6.46612L4.94015 6.46613C4.18743 6.46613 3.81031 5.55582 4.34272 5.02341L7.81181 1.55432C8.16484 1.20129 8.16484 0.6291 7.81181 0.276071L7.79881 0.263067C7.44616 -0.0888145 6.87435 -0.0891969 6.52132 0.263832L0.415415 6.36974C-0.137269 6.92243 -0.137269 7.81819 0.415414 8.37088L6.52132 14.4768C6.87435 14.8298 7.44654 14.8298 7.79957 14.4768L7.81257 14.4638C8.1656 14.1107 8.1656 13.5386 7.81257 13.1855L4.3431 9.71606C3.81069 9.18364 4.18781 8.27334 4.94053 8.27334L14.3889 8.27372C14.8877 8.27372 15.2924 7.86906 15.2924 7.37031L15.2927 7.36992Z" fill="white" />
                            </svg>
                        </button>
                        <div className="px-5 flex flex-row items-center gap-2">
                            {Array.from({ length: itemCount }).map((_, index) => (
                                <button key={index} className={cn("w-2 h-2 rounded-full transition-all duration-400", index === currentIndex ? "bg-white w-5" : "bg-white/50")} onClick={() => {
                                    if (emblaApi) emblaApi.scrollTo(index);
                                }} />
                            ))}
                        </div>
                        <button className="p-2" onClick={() => {
                            if (emblaApi) emblaApi.scrollNext();
                        }}>
                            <svg className="size-4" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.000235885 7.36992C0.000235485 6.87117 0.404899 6.46651 0.904036 6.46612L10.3528 6.46613C11.1055 6.46613 11.4827 5.55582 10.9503 5.02341L7.48116 1.55432C7.12813 1.20129 7.12813 0.6291 7.48116 0.276071L7.49416 0.263067C7.84681 -0.0888145 8.41862 -0.0891969 8.77164 0.263832L14.8776 6.36974C15.4302 6.92243 15.4302 7.81819 14.8776 8.37088L8.77165 14.4768C8.41862 14.8298 7.84643 14.8298 7.4934 14.4768L7.4804 14.4638C7.12737 14.1107 7.12737 13.5386 7.48039 13.1855L10.9499 9.71606C11.4823 9.18364 11.1052 8.27334 10.3524 8.27334L0.904036 8.27372C0.405282 8.27372 0.000618115 7.86906 0.000618368 7.37031L0.000235885 7.36992Z" fill="white" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {!hideOverview && (
                <div className="max-w-viewport w-full mx-auto px-5">
                    <div className="py-16 sm:py-32 pb-32 sm:pb-48 flex flex-col gap-8">
                        <div className="flex flex-col sm:flex-row gap-8 sm:gap-4 justify-between sm:items-center items-start">
                            <h2 className="text-4xl sm:text-6xl">Nvidia H100</h2>
                            <AnimatedButton background={"dark"}>Contact</AnimatedButton>
                        </div>
                        <div className="grid md:grid-cols-5 gap-8 w-full">
                            <div className="col-span-3 flex flex-col justify-start gap-12 order-2 sm:order-1">
                                <div className="flex items-center justify-start">
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 sm:text-2xl text-sm">
                                        <div className="flex flex-col pr-12">
                                            <p className="text-white/50">vRAM</p>
                                            <h2 className="text-2xl sm:text-3xl inline-flex items-center gap-0.5">128<span className="text-sm sm:text-xl">gb</span></h2>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-white/50">vRAM</p>
                                            <h2 className="text-2xl sm:text-3xl inline-flex items-center gap-0.5">128<span className="text-sm sm:text-xl">gb</span></h2>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-white/50">vRAM</p>
                                            <h2 className="text-2xl sm:text-3xl inline-flex items-center gap-0.5">128<span className="text-sm sm:text-xl">gb</span></h2>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-white/50">vRAM</p>
                                            <h2 className="text-2xl sm:text-3xl inline-flex items-center gap-0.5">128<span className="text-sm sm:text-xl">gb</span></h2>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-white/50">vRAM</p>
                                            <h2 className="text-2xl sm:text-3xl inline-flex items-center gap-0.5">128<span className="text-sm sm:text-xl">gb</span></h2>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-white/50">vRAM</p>
                                            <h2 className="text-2xl sm:text-3xl inline-flex items-center gap-0.5">128<span className="text-sm sm:text-xl">gb</span></h2>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-white/50">vRAM</p>
                                            <h2 className="text-2xl sm:text-3xl inline-flex items-center gap-0.5">128<span className="text-sm sm:text-xl">gb</span></h2>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-white/50">vRAM</p>
                                            <h2 className="text-2xl sm:text-3xl inline-flex items-center gap-0.5">128<span className="text-sm sm:text-xl">gb</span></h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1" />
                                <div className="grid sm:grid-cols-3 gap-12">
                                    <div className="flex flex-col sm:text-2xl text-sm">
                                        <h2 className="text-white/50">Paragraph</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae sapien at arcu volutpat interdum. Quisque nec justo nec neque efficitur tincidunt.</p>
                                    </div>
                                    <div className="flex flex-col sm:text-2xl text-sm">
                                        <h2 className="text-white/50">Paragraph</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae sapien at arcu volutpat interdum. Quisque nec justo nec neque efficitur tincidunt.</p>
                                    </div>
                                    <div className="flex flex-col sm:text-2xl text-sm">
                                        <h2 className="text-white/50">Paragraph</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae sapien at arcu volutpat interdum. Quisque nec justo nec neque efficitur tincidunt.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-end col-span-2 order-1 sm:order-2">
                                <img src="/assets/hardware/Group 20.png" className="object-contain" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}