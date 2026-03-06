"use client";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useCallback } from "react";

interface TestimonialCarouselProps {
    title?: string;
    testimonials: {
        name: string;
        role: string;
        company: string;
        logo: React.ReactNode;
        text: string;
    }[];
}

function NavButton({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            aria-label={direction === "prev" ? "Previous testimonial" : "Next testimonial"}
            className="inline-flex items-center justify-center size-6 bg-lava transition-colors hover:bg-lava-80"
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/icons/button-arrow-right.svg"
                alt=""
                className={cn("size-3", direction === "prev" && "rotate-180")}
            />
        </button>
    );
}

export function TestimonialCarousel({ title, testimonials }: TestimonialCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        dragFree: false,
        align: "center",
        watchDrag: (_emblaApi, event) => {
            return event.type === "touchstart";
        },
    });
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemCount = testimonials.length;

    const handleNav = useCallback(
        (direction: "prev" | "next") => {
            if (!emblaApi) return;
            if (direction === "prev") emblaApi.scrollPrev();
            else emblaApi.scrollNext();
        },
        [emblaApi],
    );

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setCurrentIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on("select", onSelect);
        onSelect();

        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi]);

    return (
        <div className="flex flex-col gap-8">
            {title && (
                <h2 className="heading text-center max-w-5xl mx-auto">{title}</h2>
            )}

            <div className="flex flex-col gap-8">
                <div className="relative w-full">
                    {/* Left gradient fade */}
                    <div className="hidden md:block absolute top-0 left-0 w-24 lg:w-40 h-full bg-linear-to-r from-white to-transparent pointer-events-none z-10" />
                    {/* Right gradient fade */}
                    <div className="hidden md:block absolute top-0 right-0 w-24 lg:w-40 h-full bg-linear-to-l from-white to-transparent pointer-events-none z-10" />

                    <div className="w-full overflow-hidden">
                        <div className="overflow-hidden" ref={emblaRef}>
                            <div className="flex">
                                {testimonials.map((testimonial, index) => (
                                    <div
                                        key={index}
                                        className="flex-[0_0_85%] md:flex-[0_0_auto] min-w-0 px-2 md:px-3 cursor-pointer"
                                        onClick={() => {
                                            if (emblaApi) emblaApi.scrollTo(index);
                                        }}
                                    >
                                        <div
                                            className={cn(
                                                "relative w-full md:w-[720px] lg:w-[720px] h-[400px] md:h-[340px] border-lava/25 border-[.75px] p-8 md:p-10 flex flex-col justify-between gap-8 transition-colors duration-200",
                                                index !== currentIndex && "hover:bg-slate/5",
                                            )}
                                        >
                                            {/* Quote + text */}
                                            <div className="flex flex-col gap-3">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src="/icons/quote.svg" alt="" className="h-3 w-auto self-start" />
                                                <p className="text-body-lg leading-relaxed text-lava">{testimonial.text}</p>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src="/icons/quote.svg" alt="" className="h-3 w-auto self-end rotate-180" />
                                            </div>
                                            {/* Author + logo */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-body-lg font-medium text-lava">{testimonial.name}</span>
                                                        <span className="text-body-sm text-lava/50">{testimonial.role} of {testimonial.company}</span>
                                                    </div>
                                                    <div className="shrink-0 [&_svg]:h-6 [&_svg]:w-auto [&_img]:h-6 [&_img]:w-auto">
                                                        {testimonial.logo}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress bar + arrows */}
                <div className="flex items-center gap-6">
                    <div className="flex-1 h-0.5 bg-cream relative">
                        <div
                            className="absolute inset-y-0 left-0 bg-lava transition-all duration-500 ease-out"
                            style={{
                                width: `${((currentIndex + 1) / itemCount) * 100}%`,
                            }}
                        />
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <NavButton direction="prev" onClick={() => handleNav("prev")} />
                        <NavButton direction="next" onClick={() => handleNav("next")} />
                    </div>
                </div>
            </div>
        </div>
    );
}
