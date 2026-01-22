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
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const activeItem = items[activeIndex];

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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <h2 className="heading">
                    Our Story
                </h2>

                {/* Stage Buttons */}
                <div className="flex flex-wrap gap-4 md:gap-8">
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
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="grid grid-cols-1 md:grid-cols-[minmax(140px,200px)_1fr] gap-4 md:gap-12"
                >
                    {/* Date */}
                    <p className="text-lg md:text-xl text-white">
                        {activeItem.date}
                    </p>

                    {/* Description */}
                    <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl">
                        {activeItem.description}
                    </p>
                </motion.div>
            </AnimatePresence>
        </section>
    );
}
