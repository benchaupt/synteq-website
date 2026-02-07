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

  // Split text into paragraphs by newline, then words by space
  const paragraphs = text.split("\n");
  const allWords = paragraphs.flatMap((p) => p.split(" "));
  const totalWords = allWords.length;

  // Pre-compute word offset for each paragraph
  const paragraphOffsets = paragraphs.reduce<number[]>((acc, p, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + paragraphs[i - 1].split(" ").length);
    return acc;
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <p className={cn("heading max-w-8xl", textClassName)}>
        {paragraphs.map((paragraph, pIndex) => {
          const words = paragraph.split(" ");
          const offset = paragraphOffsets[pIndex];
          return (
            <span key={pIndex} className={pIndex > 0 ? "block mt-4" : undefined}>
              {words.map((word, wIndex) => (
                <Word
                  key={offset + wIndex}
                  word={word}
                  index={offset + wIndex}
                  totalWords={totalWords}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </span>
          );
        })}
      </p>
    </div>
  );
}
