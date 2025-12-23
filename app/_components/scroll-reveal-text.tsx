"use client";

import { cn } from "@/lib/utils";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  textClassName?: string;
}

interface WordProps {
  word: string;
  index: number;
  totalWords: number;
  scrollYProgress: MotionValue<number>;
}

function Word({ word, index, totalWords, scrollYProgress }: WordProps) {
  const start = index / totalWords;
  const end = (index + 1) / totalWords;

  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

  return (
    <motion.span
      className="inline-block mr-[0.25em]"
      style={{ opacity }}
    >
      {word}
    </motion.span>
  );
}

export function ScrollRevealText({ text, className, textClassName }: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.6"],
  });

  // Split text into words
  const words = text.split(" ");

  return (
    <div ref={containerRef} className={className}>
      <p className={cn("text-4xl md:text-5xl lg:text-6xl leading-tight max-w-8xl", textClassName)}>
        {words.map((word, index) => (
          <Word
            key={index}
            word={word}
            index={index}
            totalWords={words.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </p>
    </div>
  );
}
