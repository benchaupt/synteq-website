"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

export function ScrollRevealText({ text, className }: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "start 0.2"],
  });

  // Gradient position moves as you scroll (-20% to 100% to fully complete)
  const gradientY = useTransform(scrollYProgress, [0, 1], [-80, 100]);

  return (
    <div ref={containerRef} className={className}>
      <motion.p
        className="text-4xl md:text-5xl lg:text-6xl leading-tight max-w-7xl"
        style={{
          backgroundImage: useTransform(
            gradientY,
            (y) => `linear-gradient(to bottom, white ${y}%, rgba(60, 60, 60, 1) ${y + 30}%)`
          ),
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        {text}
      </motion.p>
    </div>
  );
}
