"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface SliderTabsProps {
  items: string[];
  activeItem: string;
  onItemChange: (item: string) => void;
  className?: string;
}

export function SliderTabs({
  items,
  activeItem,
  onItemChange,
  className,
}: SliderTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const updateIndicator = () => {
      const container = containerRef.current;
      if (!container) return;

      const activeIndex = items.indexOf(activeItem);
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
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeItem, items]);

  return (
    <div
      ref={containerRef}
      className={cn("relative flex items-center gap-8", className)}
    >
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onItemChange(item)}
          className={cn(
            "relative font-mono text-sm uppercase tracking-tight py-2 transition-colors duration-200",
            activeItem === item ? "text-accent" : "text-white hover:text-white/80"
          )}
        >
          {item}
        </button>
      ))}

      {/* Sliding underline indicator */}
      <motion.div
        className="absolute bottom-0 h-[2px] bg-accent"
        initial={false}
        animate={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 35,
        }}
      />
    </div>
  );
}
