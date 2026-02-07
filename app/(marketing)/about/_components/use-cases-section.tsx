"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState, useCallback, useEffect, ReactNode } from "react";
import { DitherGrid } from "./dither-grid";
import { DitherSphere } from "./dither-sphere";
import { DitherStartupStatue } from "./dither-startup-statue";
import { DitherEnterpriseStatue } from "./dither-enterprise-statue";

interface UseCase {
    title: string;
    highlight: string;
    description: string;
    icon: ReactNode;
    useDitherGrid?: boolean;
    useDitherSphere?: boolean;
    useDitherStartupStatue?: boolean;
    useDitherEnterpriseStatue?: boolean;
    ditherImage?: string;
}

const useCases: UseCase[] = [
    {
        title: "Research",
        highlight: "Built for experimentation.",
        description: "Dedicated infrastructure for labs and institutions pushing models beyond what's known.",
        icon: null,
        useDitherSphere: true,
    },
    {
        title: "Training",
        highlight: "Train at scale.",
        description: "Built for fine-tuning and pre-training with elastic throughput- from baseline runs to peak utilization.",
        icon: null,
        useDitherGrid: true,
    },
    {
        title: "Startups",
        highlight: "Move at full speed.",
        description: "Production ready systems with transparent pricing, built to scale when you do.",
        icon: null,
        useDitherStartupStatue: true,
    },
    {
        title: "Enterprise",
        highlight: "Infrastructure you can commit to.",
        description: "Dedicated architecture, custom SLAs, compliance, and direct support. Built around your AI strategy.",
        icon: null,
        useDitherEnterpriseStatue: true,
    }
];

interface UseCaseCardProps {
    useCase: UseCase;
    index: number;
    hasEntered: boolean;
    ditherReady: boolean;
    onHoverStart: () => void;
    onHoverEnd: () => void;
}

function UseCaseCard({ useCase, index, hasEntered, ditherReady, onHoverStart, onHoverEnd }: UseCaseCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
    const [isHovering, setIsHovering] = useState(false);

    const hasDitherEffect = useCase.useDitherGrid || useCase.useDitherSphere || useCase.useDitherStartupStatue || useCase.useDitherEnterpriseStatue;

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!hasDitherEffect) return;
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePos({ x, y });
    }, [hasDitherEffect]);

    const handleMouseEnter = useCallback(() => {
        if (hasDitherEffect) {
            setIsHovering(true);
            onHoverStart();
        }
    }, [hasDitherEffect, onHoverStart]);

    const handleMouseLeave = useCallback(() => {
        setMousePos(null);
        setIsHovering(false);
        onHoverEnd();
    }, [onHoverEnd]);

    return (
        <motion.div
            ref={cardRef}
            className="group relative bg-background-secondary p-6 flex flex-col min-h-96 overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-2 cursor-pointer"
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={hasEntered ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 + index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Explore link - top right */}
            <div className="absolute top-6 right-6 flex items-center gap-1 text-accent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-medium">Explore</span>
                <svg className="size-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>

            <div className="flex-1 flex items-start justify-start w-full">
                {useCase.useDitherGrid ? (
                    <DitherGrid
                        externalMousePos={mousePos}
                        isHovering={isHovering}
                        animating={ditherReady}
                        className="max-w-full"
                    />
                ) : useCase.useDitherSphere ? (
                    <DitherSphere
                        externalMousePos={mousePos}
                        isHovering={isHovering}
                        animating={ditherReady}
                        className="max-w-full"
                    />
                ) : useCase.useDitherStartupStatue ? (
                    <div className="aspect-square w-full flex items-center justify-center">
                        <DitherStartupStatue
                            externalMousePos={mousePos}
                            isHovering={isHovering}
                            animating={ditherReady}
                            autoPanRange={35}
                            autoPanSpeed={0.4}
                        />
                    </div>
                ) : useCase.useDitherEnterpriseStatue ? (
                    <div className="aspect-square w-full flex items-center justify-center">
                        <DitherEnterpriseStatue
                            externalMousePos={mousePos}
                            isHovering={isHovering}
                            animating={ditherReady}
                            autoPanRange={35}
                            autoPanSpeed={0.4}
                        />
                    </div>
                ) : useCase.ditherImage ? (
                    <div className="aspect-square w-full flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={useCase.ditherImage}
                            alt=""
                            className="w-3/4 h-3/4 object-contain opacity-50"
                        />
                    </div>
                ) : (
                    <div className="size-16 text-white/30">
                        {useCase.icon}
                    </div>
                )}
            </div>
            <div className="mt-auto flex flex-col gap-2">
                <h3 className="heading3">{useCase.title}</h3>
                <p className="text-base leading-relaxed">
                    <span className="text-white">{useCase.highlight}</span>{" "}
                    <span className="text-white/50">{useCase.description}</span>
                </p>
            </div>
        </motion.div>
    );
}

function useDitherTiming(isInView: boolean) {
    const [hasEntered, setHasEntered] = useState(false);
    const [ditherReady, setDitherReady] = useState(false);
    const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
    const viewTimerRef = useRef<NodeJS.Timeout | null>(null);

    // First time in view — lock entrance animations
    useEffect(() => {
        if (isInView && !hasEntered) setHasEntered(true);
    }, [isInView, hasEntered]);

    // 3s in-view timer, stops on leave
    useEffect(() => {
        if (isInView) {
            viewTimerRef.current = setTimeout(() => setDitherReady(true), 3000);
            return () => { if (viewTimerRef.current) clearTimeout(viewTimerRef.current); };
        } else {
            setDitherReady(false);
            if (viewTimerRef.current) clearTimeout(viewTimerRef.current);
        }
    }, [isInView]);

    // Hover for 1s also kicks it off
    const onHoverStart = useCallback(() => {
        if (ditherReady) return;
        hoverTimerRef.current = setTimeout(() => setDitherReady(true), 1000);
    }, [ditherReady]);

    const onHoverEnd = useCallback(() => {
        if (hoverTimerRef.current) {
            clearTimeout(hoverTimerRef.current);
            hoverTimerRef.current = null;
        }
    }, []);

    return { hasEntered, ditherReady, onHoverStart, onHoverEnd };
}

// Just the cards grid (for reuse on other pages)
export function UseCasesCards() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { margin: "-100px" });
    const { hasEntered, ditherReady, onHoverStart, onHoverEnd } = useDitherTiming(isInView);

    return (
        <div
            ref={containerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
            {useCases.map((useCase, index) => (
                <UseCaseCard
                    key={useCase.title}
                    useCase={useCase}
                    index={index}
                    hasEntered={hasEntered}
                    ditherReady={ditherReady}
                    onHoverStart={onHoverStart}
                    onHoverEnd={onHoverEnd}
                />
            ))}
        </div>
    );
}

export function UseCasesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={sectionRef}
            className="max-w-viewport w-full mx-auto px-5 py-24 flex flex-col gap-12"
        >
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                <motion.p
                    className="font-mono text-accent text-xs uppercase tracking-widest"
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    Built for every stage of AI
                </motion.p>
                <motion.h2
                    className="heading max-w-5xl"
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                >
                    We&apos;re here to support your workloads, whether they&apos;re research, training, or production.
                </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {useCases.map((useCase, index) => (
                    <UseCaseCard
                        key={useCase.title}
                        useCase={useCase}
                        index={index}
                        hasEntered={isInView}
                        ditherReady={true}
                        onHoverStart={() => {}}
                        onHoverEnd={() => {}}
                    />
                ))}
            </div>
        </section>
    );
}
