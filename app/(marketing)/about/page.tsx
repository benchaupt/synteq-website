/* eslint-disable @next/next/no-img-element */
"use client";

import { AboutStatsSection } from "@/app/(marketing)/about/_components/about-stats-section";
import { DitherGlobe } from "@/app/(marketing)/about/_components/dither-globe";
import { StoryTimeline } from "@/app/(marketing)/about/_components/story-timeline";
// import { UseCasesSection } from "@/app/(marketing)/about/_components/use-cases-section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/_components/accordion";
import CallToActionNew from "@/app/_components/call-to-action-new";
import { ScrollRevealText } from "@/app/_components/scroll-reveal-text";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef, useState } from "react";

const storyItems = [
    {
        title: "Foundation",
        date: "2024",
        description: "Synteq Digital was founded in 2024 through a joint merger. We quickly grew into an industry leader in the digital asset compute space, becoming the preferred vendor to 25+ public companies, representing over $30B in market capitalization."
    },
    {
        title: "Infrastructure Acquisition",
        date: "Q2 2025",
        description: "Through a strategic acquisition in Q2 2025, we brough on Crunchbits— a long-standing, leading HPC provider with decades of infrastructure experience and a proven track record."
    },
    {
        title: "HPC Expansion",
        date: "Q3 2025",
        description: "With Crunchbits' expertise and infrastructure, we expanded our capabilities into high-performance computing, serving research institutions, AI labs, and enterprise clients with demanding workloads."
    },
    {
        title: "AI Expansion",
        date: "Today",
        description: "Synteq AI represents our next phase: purpose built AI infrastructure for inference and training at scale. The same standards that made us leaders in digital asset, and general purpose compute now powering the future of intelligence itself."
    }
];

const coreValues = [
    {
        title: "Trust First",
        summary: "Reliability, transparency, and partnership.",
        content: "Built on reliability, transparency, and long term partnership. Every decision we make is designed for long term success, and represented through consistent action and results."
    },
    {
        title: "Forward by Design",
        summary: "Built for what's next.",
        content: "Technology compounds faster than ever. Synteq AI was built with that in mind: an operational philosophy that evolves with the industry, not behind it. We continuously adapt, invest, innovate, and tinker, so our infrastructure stays ahead as workloads and demands change."
    },
    {
        title: "Built for Tomorrow",
        summary: "Systems that anticipate the future.",
        content: "We architect our systems with tomorrow in mind. Our infrastructure anticipates the needs of next-gen workloads, ensuring we're there when we need to be."
    },
    {
        title: "First Principles",
        summary: "Compounding from A > B",
        content: "We question assumptions and reason from fundamentals. Evaluating everything from the ground up."
    }
];

const leadership = [
    {
        name: "Taras Kulyk",
        role: "Co-Founder & CEO",
        image: "/assets/about/taras.webp",
        bio: "Leading Synteq AI with a vision to democratize AI infrastructure."
    },
    {
        name: "Joe Stefanelli",
        role: "Co-Founder & President",
        image: "/assets/about/joe.webp",
        bio: "Driving strategic growth and partnerships across the AI ecosystem."
    },
    {
        name: "Patty Stefanelli",
        role: "Co-Founder & COO",
        image: "/assets/about/patty.webp",
        bio: "Scaling operations and building world-class infrastructure."
    },
    {
        name: "Manash Goswami",
        role: "CFO",
        image: "/assets/about/manash.webp",
        bio: "Ensuring financial excellence and sustainable growth."
    },
    {
        name: "Jaime Leverton",
        role: "Chair of the Board",
        image: "/assets/about/jaime.webp",
        bio: "Providing strategic guidance and governance leadership."
    },
    {
        name: "Rob Fedrock",
        role: "Director of the Board",
        image: "/assets/about/rob.webp",
        bio: "Advising on technology strategy and market expansion."
    }
];

export default function About() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Globe interaction state
    const heroRef = useRef<HTMLDivElement>(null);
    const [isHoveringGlobe, setIsHoveringGlobe] = useState(false);
    const [globeMousePos, setGlobeMousePos] = useState<{ x: number; y: number } | null>(null);
    const [globeDotSize, setGlobeDotSize] = useState(2);

    // Responsive dot size
    useEffect(() => {
        const updateDotSize = () => {
            setGlobeDotSize(window.innerWidth < 640 ? 1.2 : 2);
        };
        updateDotSize();
        window.addEventListener("resize", updateDotSize);
        return () => window.removeEventListener("resize", updateDotSize);
    }, []);

        
    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on("select", onSelect);
        onSelect();

        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi]);

    const scrollTo = (index: number) => emblaApi?.scrollTo(index);

    const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        setGlobeMousePos({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height,
        });
    };

    return (
        <>
            {/* Hero Section */}
            <section
                ref={heroRef}
                className="relative max-w-viewport w-full mx-auto px-5 py-16 md:py-24 lg:min-h-[700px] flex flex-col lg:justify-center overflow-hidden"
                onMouseMove={handleHeroMouseMove}
                onMouseEnter={() => setIsHoveringGlobe(true)}
                onMouseLeave={() => setIsHoveringGlobe(false)}
            >
                {/* Text Content */}
                <div className="relative z-10 flex flex-col max-w-2xl items-start">
                    <div className="flex flex-col gap-2 items-start">
                        <p className="subheading">
                            About Us
                        </p>
                        <h1 className="title">
                            <span className="lg:block lg:whitespace-nowrap">We&apos;re building the future.</span>
                        </h1>
                    </div>
                    <p className="text-sm md:text-base text-white/60 leading-relaxed pt-4">
                    AI is moving faster than ever. We&apos;re building the infrastructure to keep up, with the team to make sure you never slow down.
                    </p>
                </div>

                {/* Globe - in flow on mobile, absolute on lg+ */}
                <div className="relative w-full aspect-square mt-8 -mb-[45%] lg:absolute lg:bottom-0 lg:right-0 lg:w-[60%] lg:mt-0 lg:mb-0 lg:translate-y-[35%] pointer-events-none">
                    <DitherGlobe
                        externalMousePos={globeMousePos}
                        isHovering={isHoveringGlobe}
                        baseRotationX={-90}
                        baseRotationY={14}
                        baseRotationZ={-36}
                        dotSize={globeDotSize}
                    />
                    {/* Gradient fade overlay - bottom fade only */}
                    <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 via-30% to-transparent" />
                </div>
            </section>

            {/* Stats Section */}
            <AboutStatsSection />

            {/* Mission Statement */}
            <section className="max-w-viewport w-full mx-auto px-5 py-24 flex flex-col gap-8">
                <p className="subheading text-center">
                    Our Mission
                </p>
                <ScrollRevealText
                    text="We believe the future of AI will be built by teams that refuse to slow down. Our mission is to make sure they never have to."
                    className="max-w-5xl mx-auto"
                    textClassName="text-center"
                />
            </section>

            {/* Our Story Section */}
            <StoryTimeline items={storyItems} />

            {/* Leadership Team */}
            <section className="max-w-viewport w-full mx-auto px-5 py-24 flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div className="flex flex-col gap-4">
                        <p className="font-mono text-accent text-xs uppercase tracking-wider">
                            Leadership
                        </p>
                        <h2 className="heading">
                            Meet the team
                        </h2>
                    </div>
                </div>

                {/* Carousel for all screen sizes */}
                <div className="relative">
                    {/* Left gradient fade */}
                    <div className="hidden md:block absolute top-0 left-0 w-32 lg:w-[200px] h-full bg-linear-to-r from-background to-transparent pointer-events-none z-10" />
                    {/* Right gradient fade */}
                    <div className="hidden md:block absolute top-0 right-0 w-32 lg:w-[200px] h-full bg-linear-to-l from-background to-transparent pointer-events-none z-10" />

                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {leadership.map((person, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-4 min-w-0 shrink-0 basis-[85%] sm:basis-[45%] md:basis-[30%] lg:basis-[22%] group pl-4 md:pl-6 cursor-pointer"
                                    onClick={() => {
                                        if (emblaApi) emblaApi.scrollTo(index);
                                    }}
                                >
                                    <div className="aspect-[4/5] w-full bg-background-secondary rounded-lg overflow-hidden transition-all duration-300">
                                        <img
                                            src={person.image}
                                            alt={person.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-lg font-sequel text-white transition-colors">
                                                {person.name}
                                            </h3>
                                            <p className="font-mono text-xs text-white uppercase tracking-wider">
                                                {person.role}
                                            </p>
                                        </div>
                                        <a
                                            href="#"
                                            className="shrink-0 size-8 flex items-center justify-center text-white/40 hover:text-accent transition-colors"
                                            aria-label={`${person.name} LinkedIn`}
                                        >
                                            <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Navigation controls */}
                <div className="flex flex-row gap-3 md:gap-4 items-center justify-center pt-4 md:pt-6">
                    <button
                        className="size-10 relative flex items-center justify-center hover:bg-white/5 rounded-lg transition-colors group"
                        onClick={() => emblaApi?.scrollPrev()}
                        aria-label="Previous team member"
                    >
                        <span className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/30 group-hover:border-accent transition-colors" />
                        <span className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/30 group-hover:border-accent transition-colors" />
                        <span className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/30 group-hover:border-accent transition-colors" />
                        <span className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/30 group-hover:border-accent transition-colors" />
                        <svg className="size-4" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.2927 7.36992C15.2927 6.87117 14.8881 6.46651 14.3889 6.46612L4.94015 6.46613C4.18743 6.46613 3.81031 5.55582 4.34272 5.02341L7.81181 1.55432C8.16484 1.20129 8.16484 0.6291 7.81181 0.276071L7.79881 0.263067C7.44616 -0.0888145 6.87435 -0.0891969 6.52132 0.263832L0.415415 6.36974C-0.137269 6.92243 -0.137269 7.81819 0.415414 8.37088L6.52132 14.4768C6.87435 14.8298 7.44654 14.8298 7.79957 14.4768L7.81257 14.4638C8.1656 14.1107 8.1656 13.5386 7.81257 13.1855L4.3431 9.71606C3.81069 9.18364 4.18781 8.27334 4.94053 8.27334L14.3889 8.27372C14.8877 8.27372 15.2924 7.86906 15.2924 7.37031L15.2927 7.36992Z" fill="white" />
                        </svg>
                    </button>
                    <div className="px-3 md:px-5 flex flex-row items-center gap-1.5">
                        {leadership.map((_, index) => (
                            <button
                                key={index}
                                className={cn(
                                    "h-1.5 rounded-full transition-all duration-400",
                                    index === selectedIndex ? "bg-white w-4" : "bg-white/50 w-1.5"
                                )}
                                onClick={() => scrollTo(index)}
                                aria-label={`Go to team member ${index + 1}`}
                            />
                        ))}
                    </div>
                    <button
                        className="size-10 relative flex items-center justify-center hover:bg-white/5 rounded-lg transition-colors group"
                        onClick={() => emblaApi?.scrollNext()}
                        aria-label="Next team member"
                    >
                        <span className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/30 group-hover:border-accent transition-colors" />
                        <span className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/30 group-hover:border-accent transition-colors" />
                        <span className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/30 group-hover:border-accent transition-colors" />
                        <span className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/30 group-hover:border-accent transition-colors" />
                        <svg className="size-4" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.000235885 7.36992C0.000235485 6.87117 0.404899 6.46651 0.904036 6.46612L10.3528 6.46613C11.1055 6.46613 11.4827 5.55582 10.9503 5.02341L7.48116 1.55432C7.12813 1.20129 7.12813 0.6291 7.48116 0.276071L7.49416 0.263067C7.84681 -0.0888145 8.41862 -0.0891969 8.77164 0.263832L14.8776 6.36974C15.4302 6.92243 15.4302 7.81819 14.8776 8.37088L8.77165 14.4768C8.41862 14.8298 7.84643 14.8298 7.4934 14.4768L7.4804 14.4638C7.12737 14.1107 7.12737 13.5386 7.48039 13.1855L10.9499 9.71606C11.4823 9.18364 11.1052 8.27334 10.3524 8.27334L0.904036 8.27372C0.405282 8.27372 0.000618115 7.86906 0.000618368 7.37031L0.000235885 7.36992Z" fill="white" />
                        </svg>
                    </button>
                </div>
            </section>

            {/* Core Values */}
            <section className="max-w-viewport w-full mx-auto px-5 py-24 flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-4">
                    <h2 className="heading shrink-0">
                        Grounded in our core values
                    </h2>
                    {/*<p className="text-base text-white/60 leading-relaxed max-w-2xl">
                        From first experiment to multi-node training runs, Synteq and Crunchbits give you a clear path to the right mix of shared cloud, dedicated nodes, and bare metal.
                    </p>*/}
                </div>

                <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue="item-1"
                >
                    {coreValues.map((value, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                        >
                            <AccordionTrigger className="py-6 group text-base [&>svg]:hidden">
                                {/* Desktop Layout */}
                                <div className="hidden md:grid md:grid-cols-[minmax(200px,1fr)_2fr_auto] w-full gap-8 items-center text-left">
                                    <span className="uppercase font-mono text-[15px] text-white group-hover:text-accent transition-colors">
                                        {value.title}
                                    </span>
                                    <span className="text-base text-white/50 group-hover:text-white/70 transition-colors">
                                        {value.summary}
                                    </span>
                                    <div className="size-6 flex items-center justify-center text-white/50 group-hover:text-accent transition-all duration-200 group-data-[state=open]:rotate-45">
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 0V14M0 7H14" stroke="currentColor" strokeWidth="1.5" />
                                        </svg>
                                    </div>
                                </div>
                                {/* Mobile Layout */}
                                <div className="flex md:hidden flex-col gap-3 w-full text-left">
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text- font-mono uppercase text-white group-hover:text-accent transition-colors">
                                            {value.title}
                                        </span>
                                        <div className="size-6 flex items-center justify-center text-white/50 group-hover:text-accent transition-all duration-200 shrink-0 group-data-[state=open]:rotate-45">
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7 0V14M0 7H14" stroke="currentColor" strokeWidth="1.5" />
                                            </svg>
                                        </div>
                                    </div>
                                    <span className="text-base text-white/50">
                                        {value.summary}
                                    </span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="!text-base  text-white/60 leading-relaxed !pb-6">
                                <div className="hidden md:grid md:grid-cols-[minmax(200px,1fr)_2fr_auto] w-full gap-8">
                                    <div />
                                    <p className="max-w-2xl">{value.content}</p>
                                    <div className="size-6" />
                                </div>
                                <p className="md:hidden max-w-2xl">{value.content}</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>

            {/* Use Cases Section - Hidden */}
            {/* <UseCasesSection /> */}

            <CallToActionNew />

                    </>
    );
}
