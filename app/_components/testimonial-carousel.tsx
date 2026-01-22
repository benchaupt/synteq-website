"use client";
import { AnimatedCard } from "@/app/_components/animated-card";
import { CornerCard } from "@/app/_components/corner-card";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";

interface TestimonialCarouselProps {
    testimonials: {
        name: string;
        title: string;
        company: string;
        logo: React.ReactNode;
        text: string;
    }[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        dragFree: false,
        align: 'center',
    });
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemCount = testimonials.length;

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
        <div className="relative flex flex-col gap-8 max-w-viewport w-full mx-auto px-5 py-16 md:py-24 lg:py-32">
            {/* Left gradient fade - hidden on mobile */}
            <div className="hidden md:block absolute top-0 left-0 w-32 lg:w-[200px] h-full bg-linear-to-r from-background to-transparent pointer-events-none z-10" />
            {/* Right gradient fade - hidden on mobile */}
            <div className="hidden md:block absolute top-0 right-0 w-32 lg:w-[200px] h-full bg-linear-to-l from-background to-transparent pointer-events-none z-10" />
            
            <div className='w-full overflow-hidden py-4 md:py-8'>
                <div className='overflow-hidden' ref={emblaRef}>
                    <div className='flex'>
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="flex-[0_0_100%] md:flex-[0_0_auto] min-w-0 pl-4 pr-4 cursor-pointer"
                                onClick={() => {
                                    if (emblaApi) emblaApi.scrollTo(index);
                                }}
                            >
                                <CornerCard
                                    className="w-full max-w-[calc(100vw-2.5rem)] md:w-[500px] lg:w-[580px] hover:bg-background-secondary"
                                >
                                    <div className="flex flex-col gap-6 md:gap-10">
                                        <div className="flex flex-row gap-4 md:gap-6 items-center">
                                            <div className="shrink-0">
                                                {testimonial.logo}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <h3 className="text-lg md:text-md">{testimonial.name}</h3>
                                                <p className="text-white/50 font-mono text-sm md:text-sm lg:text-sm truncate">{testimonial.title}, {testimonial.company}</p>
                                            </div>
                                        </div>
                                        <p className="text-dark-foreground text-base md:text-base font-normal leading-relaxed">{testimonial.text}</p>
                                    </div>
                                </CornerCard>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Navigation controls */}
            <div className="flex flex-row gap-3 md:gap-4 items-center justify-center">
                <button 
                    className="size-10 relative flex items-center justify-center hover:bg-white/5 rounded-lg transition-colors group" 
                    onClick={() => {
                        if (emblaApi) emblaApi.scrollPrev();
                    }}
                    aria-label="Previous testimonial"
                >
                    {/* Corner arrows */}
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
                        <button 
                            key={index} 
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-400",
                                index === currentIndex ? "bg-white w-4" : "bg-white/50 w-1.5"
                            )} 
                            onClick={() => {
                                if (emblaApi) emblaApi.scrollTo(index);
                            }}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
                <button 
                    className="size-10 relative flex items-center justify-center hover:bg-white/5 rounded-lg transition-colors group" 
                    onClick={() => {
                        if (emblaApi) emblaApi.scrollNext();
                    }}
                    aria-label="Next testimonial"
                >
                    {/* Corner arrows */}
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
    )
}