"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

interface SliderTabsProps {
  items: string[];
  activeItem: string | null;
  onItemChange: (item: string) => void;
  className?: string;
  isShimmering?: boolean;
}

export function SliderTabs({
  items,
  activeItem,
  onItemChange,
  className,
  isShimmering = false,
}: SliderTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const hasSelection = activeItem !== null && activeItem !== "" && items.includes(activeItem);
  const prevHasSelection = useRef(false);
  const isRevealing = hasSelection && !prevHasSelection.current;

  const measureIndicator = useCallback(() => {
    const container = containerRef.current;
    if (!container || !activeItem) return;

    const activeIndex = items.indexOf(activeItem);
    if (activeIndex === -1) return;
    const buttons = container.querySelectorAll("button");
    const activeButton = buttons[activeIndex];

    if (activeButton) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      setIndicatorStyle({
        left: buttonRect.left - containerRect.left,
        width: buttonRect.width,
      });
    }
  }, [activeItem, items]);

  // Measure synchronously before paint so isRevealing sees the correct position
  useLayoutEffect(() => {
    measureIndicator();
  }, [measureIndicator]);

  // Resize listener in regular effect
  useEffect(() => {
    window.addEventListener("resize", measureIndicator);
    return () => window.removeEventListener("resize", measureIndicator);
  }, [measureIndicator]);

  // Track previous selection state after paint
  useEffect(() => {
    prevHasSelection.current = hasSelection;
  });

  return (
    <div
      ref={containerRef}
      className={cn("relative flex items-center gap-8", className)}
    >
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onItemChange(item)}
          disabled={isShimmering}
          className={cn(
            "relative font-mono text-sm uppercase tracking-tight py-2 transition-colors duration-200",
            isShimmering
              ? activeItem === item ? "shimmer-accent" : "text-white/40"
              : activeItem === item ? "text-accent" : "text-white/40 hover:text-white/60"
          )}
          style={isShimmering && activeItem === item ? {
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          } : undefined}
        >
          {item}
        </button>
      ))}

      {/* Sliding underline indicator — only visible after first selection */}
      <motion.div
        className={cn("absolute bottom-0 h-[2px]", isShimmering ? "shimmer-accent" : "bg-accent")}
        initial={false}
        animate={{
          left: indicatorStyle.left,
          width: hasSelection ? indicatorStyle.width : 0,
          opacity: hasSelection ? 1 : 0,
        }}
        transition={{
          left: isRevealing
            ? { duration: 0 }
            : { type: "spring", stiffness: 500, damping: 35 },
          width: { type: "spring", stiffness: 500, damping: 35 },
          opacity: { duration: 0.1 },
        }}
      />
    </div>
  );
}
