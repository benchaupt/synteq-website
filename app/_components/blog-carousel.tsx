/* eslint-disable @next/next/no-img-element */
"use client";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface BlogCarouselProps {
    blogs: {
        image: string;
        category: string;
        title: string;
        description: string;
        href: string;
    }[];
}

export function BlogCarousel({ blogs }: BlogCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        dragFree: false,
    });
    const carouselRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemCount = blogs.length;

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
        <div className="relative flex flex-col gap-6 md:gap-8">
            <div
                className='flex w-full flex-row items-center justify-center gap-4 overflow-hidden pt-0 pb-6 md:pb-8'
                ref={carouselRef}
            >

                <div className='embla__viewport' ref={emblaRef}>
                    <div className='embla__container'>
                        {blogs.map((blog, index) => (
                            <div key={index} className="min-w-full md:min-w-1/2 lg:min-w-1/3 px-4 md:px-6 lg:px-[25px]">
                                <Link href={blog.href} className="flex flex-col gap-4 md:gap-6 group">
                                    <div className="border border-white/25 aspect-video w-full overflow-hidden bg-gradient-to-br from-accent/20 to-background">
                                        <img src={blog.image} alt={blog.title} className="size-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                    </div>
                                    <div className="flex flex-col gap-2 md:gap-3">
                                        <p className="font-mono text-accent text-xs md:text-sm lg:text-[15px] leading-[1.1] tracking-tight md:tracking-[-0.45px] uppercase">
                                            {blog.category}
                                        </p>
                                        <h3 className="text-lg md:text-xl lg:text-2xl text-white leading-tight tracking-tight md:tracking-[-0.72px] group-hover:text-accent transition-colors">
                                            {blog.title}
                                        </h3>
                                        <p className="text-base md:text-lg text-[#ccc] leading-normal tracking-tight md:tracking-[-0.45px]">
                                            {blog.description}
                                        </p>
                                        <span className="font-mono text-accent text-xs md:text-sm leading-[1.1] tracking-tight md:tracking-[-0.45px] uppercase underline underline-offset-4 decoration-from-font pb-1 group-hover:underline-offset-2 duration-150">
                                            LEARN MORE ↘
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-3 md:gap-4 items-center justify-center">
                <button className="p-1.5 md:p-2" onClick={() => {
                    if (emblaApi) emblaApi.scrollPrev();
                }} aria-label="Previous">
                    <svg className="size-3.5 md:size-4" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.2927 7.36992C15.2927 6.87117 14.8881 6.46651 14.3889 6.46612L4.94015 6.46613C4.18743 6.46613 3.81031 5.55582 4.34272 5.02341L7.81181 1.55432C8.16484 1.20129 8.16484 0.6291 7.81181 0.276071L7.79881 0.263067C7.44616 -0.0888145 6.87435 -0.0891969 6.52132 0.263832L0.415415 6.36974C-0.137269 6.92243 -0.137269 7.81819 0.415414 8.37088L6.52132 14.4768C6.87435 14.8298 7.44654 14.8298 7.79957 14.4768L7.81257 14.4638C8.1656 14.1107 8.1656 13.5386 7.81257 13.1855L4.3431 9.71606C3.81069 9.18364 4.18781 8.27334 4.94053 8.27334L14.3889 8.27372C14.8877 8.27372 15.2924 7.86906 15.2924 7.37031L15.2927 7.36992Z" fill="white" />
                    </svg>
                </button>
                <div className="px-3 md:px-5 flex flex-row items-center gap-1.5">
                    {Array.from({ length: itemCount }).map((_, index) => (
                        <button key={index} className={cn("h-1.5 rounded-full transition-all duration-400", index === currentIndex ? "bg-accent w-[18px]" : "bg-white/20 w-1.5")} onClick={() => {
                            if (emblaApi) emblaApi.scrollTo(index);
                        }} aria-label={`Go to slide ${index + 1}`} />
                    ))}
                </div>
                <button className="p-1.5 md:p-2" onClick={() => {
                    if (emblaApi) emblaApi.scrollNext();
                }} aria-label="Next">
                    <svg className="size-3.5 md:size-4" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.000235885 7.36992C0.000235485 6.87117 0.404899 6.46651 0.904036 6.46612L10.3528 6.46613C11.1055 6.46613 11.4827 5.55582 10.9503 5.02341L7.48116 1.55432C7.12813 1.20129 7.12813 0.6291 7.48116 0.276071L7.49416 0.263067C7.84681 -0.0888145 8.41862 -0.0891969 8.77164 0.263832L14.8776 6.36974C15.4302 6.92243 15.4302 7.81819 14.8776 8.37088L8.77165 14.4768C8.41862 14.8298 7.84643 14.8298 7.4934 14.4768L7.4804 14.4638C7.12737 14.1107 7.12737 13.5386 7.48039 13.1855L10.9499 9.71606C11.4823 9.18364 11.1052 8.27334 10.3524 8.27334L0.904036 8.27372C0.405282 8.27372 0.000618115 7.86906 0.000618368 7.37031L0.000235885 7.36992Z" fill="white" />
                    </svg>
                </button>
            </div>
        </div>
    )
}