"use client";

import { cn } from "@/lib/utils";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

interface MissionRevealProps {
  text: string;
  className?: string;
}

function Word({
  word,
  index,
  totalWords,
  scrollYProgress,
}: {
  word: string;
  index: number;
  totalWords: number;
  scrollYProgress: MotionValue<number>;
}) {
  const wordStart = index / totalWords;
  const wordEnd = (index + 1) / totalWords;

  const opacity = useTransform(
    scrollYProgress,
    [wordStart, wordEnd],
    [0.25, 1]
  );

  const color = useTransform(
    scrollYProgress,
    [wordStart, wordEnd],
    ["#768692", "#0F1315"]
  );

  return (
    <motion.span
      className="inline-block mr-[0.25em] transition-none"
      style={{ opacity, color }}
    >
      {word}
    </motion.span>
  );
}

export function MissionReveal({ text, className }: MissionRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.4"],
  });

  const paragraphs = text.split("\n");
  const allWords = paragraphs.flatMap((p) => p.split(" "));
  const totalWords = allWords.length;

  const paragraphOffsets = paragraphs.reduce<number[]>((acc, p, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + paragraphs[i - 1].split(" ").length);
    return acc;
  }, []);

  return (
    <div ref={containerRef} className={cn("py-8 md:py-16", className)}>
      <span className="subheading mb-6 block">Our Mission</span>
      <p className="heading2 font-normal max-w-5xl">
        {paragraphs.map((paragraph, pIndex) => {
          const words = paragraph.split(" ");
          const offset = paragraphOffsets[pIndex];
          return (
            <span
              key={pIndex}
              className={pIndex > 0 ? "block mt-4" : undefined}
            >
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
