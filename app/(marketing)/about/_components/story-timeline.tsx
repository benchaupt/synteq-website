"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface TimelineItem {
    title: string;
    date: string;
    description: string;
}

interface StoryTimelineProps {
    items: TimelineItem[];
    className?: string;
}

export function StoryTimeline({ items, className }: StoryTimelineProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const activeItem = items[activeIndex];

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (isAutoPlaying) {
            intervalRef.current = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % items.length);
            }, 4000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isAutoPlaying, items.length]);

    const handleButtonClick = (index: number) => {
        setIsAutoPlaying(false);
        setActiveIndex(index);
    };

    return (
        <section className={cn("max-w-viewport w-full mx-auto px-5 py-24 flex flex-col gap-12", className)}>
            {/* Header Row - Our Story left, Buttons right */}
            <div className="flex flex-col md:flex-row md:items-center items-start md:items-start md:justify-between gap-6">
                <h2 className="heading">
                    Our Story
                </h2>

                {/* Stage Buttons */}
                <div className="flex flex-wrap gap-4 md:gap-8 justify-start md:justify-start">
                    {items.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleButtonClick(index)}
                            className={cn(
                                "text-base md:text-lg transition-all duration-300",
                                activeIndex === index
                                    ? "text-white opacity-100"
                                    : "text-white/50 opacity-50 hover:opacity-100 hover:text-white/80"
                            )}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-[minmax(140px,200px)_1fr] gap-4 md:gap-12 min-h-24 md:min-h-20"
                >
                    {/* Date */}
                    <motion.p
                        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: isMobile ? 0.15 : 0 }}
                        className="text-lg md:text-xl text-white text-left md:text-left order-2 md:order-1"
                    >
                        {activeItem.date}
                    </motion.p>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: isMobile ? 0 : 0.15 }}
                        className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl text-left md:text-left order-1 md:order-2"
                    >
                        {activeItem.description}
                    </motion.p>
                </motion.div>
            </AnimatePresence>
        </section>
    );
}
