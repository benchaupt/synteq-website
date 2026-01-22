"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState, useCallback, ReactNode } from "react";
import { DitherGrid } from "./dither-grid";

interface UseCase {
    title: string;
    highlight: string;
    description: string;
    icon: ReactNode;
    useDitherGrid?: boolean;
}

const useCases: UseCase[] = [
    {
        title: "Research",
        highlight: "Explore new frontiers in AI.",
        description: "Purpose-built infrastructure for academic institutions, labs, and breakthrough experimentation.",
        icon: (
            <svg className="size-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 3H5C3.89543 3 3 3.89543 3 5V9M9 21H5C3.89543 21 3 20.1046 3 19V15M21 9V5C21 3.89543 20.1046 3 19 3H15M15 21H19C20.1046 21 21 20.1046 21 19V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 9V6M12 18V15M15 12H18M6 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        )
    },
    {
        title: "Training",
        highlight: "Train models at any scale.",
        description: "From fine-tuning to full pre-training, our GPU clusters handle the heaviest workloads.",
        icon: null,
        useDitherGrid: true,
    },
    {
        title: "Startups",
        highlight: "Ship faster, spend smarter.",
        description: "Flexible pricing and instant access to GPUs let you iterate quickly without overcommitting.",
        icon: (
            <svg className="size-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L4 9V21H9V14H15V21H20V9L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 3V7M8 6L12 3L16 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        )
    },
    {
        title: "Enterprise",
        highlight: "Infrastructure that scales with you.",
        description: "Dedicated support, custom SLAs, and security compliance for mission-critical AI deployments.",
        icon: (
            <svg className="size-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 21H21M5 21V7L12 3L19 7V21M9 21V15H15V21M9 11H9.01M15 11H15.01M12 11H12.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        )
    }
];

interface UseCaseCardProps {
    useCase: UseCase;
    index: number;
    isInView: boolean;
}

function UseCaseCard({ useCase, index, isInView }: UseCaseCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!useCase.useDitherGrid || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePos({ x, y });
    }, [useCase.useDitherGrid]);

    const handleMouseEnter = useCallback(() => {
        if (useCase.useDitherGrid) {
            setIsHovering(true);
        }
    }, [useCase.useDitherGrid]);

    const handleMouseLeave = useCallback(() => {
        setMousePos(null);
        setIsHovering(false);
    }, []);

    return (
        <motion.div
            ref={cardRef}
            className="bg-background-secondary p-6 flex flex-col aspect-3/4 overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-2"
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 + index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex-1 flex items-start justify-start w-full">
                {useCase.useDitherGrid ? (
                    <DitherGrid
                        externalMousePos={mousePos}
                        isHovering={isHovering}
                        className="max-w-full"
                    />
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

export function UseCasesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={sectionRef}
            className="max-w-viewport w-full mx-auto px-5 py-24 flex flex-col gap-12"
        >
            <div className="flex flex-col gap-4 text-center">
                <motion.p
                    className="font-mono text-accent text-xs uppercase tracking-widest"
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    Built for every stage of AI
                </motion.p>
                <motion.h2
                    className="heading"
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                >
                    Built for every stage of AI
                </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {useCases.map((useCase, index) => (
                    <UseCaseCard
                        key={useCase.title}
                        useCase={useCase}
                        index={index}
                        isInView={isInView}
                    />
                ))}
            </div>
        </section>
    );
}
