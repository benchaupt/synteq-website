"use client";

import { cn } from "@/lib/utils";
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
  const barRef = useRef<HTMLDivElement>(null);
  const hasSelection = activeItem !== null && activeItem !== "" && items.includes(activeItem);

  // "idle" = hidden, "revealing" = scaleX grows, "sliding" = left/width also transition
  const [mode, setMode] = useState<"idle" | "revealing" | "sliding">("idle");

  // Position bar directly on the DOM — no React state, no stale renders
  const positionBar = useCallback(() => {
    const bar = barRef.current;
    const container = containerRef.current;
    if (!bar || !container || !activeItem) return;

    const activeIndex = items.indexOf(activeItem);
    if (activeIndex === -1) return;
    const buttons = container.querySelectorAll("button");
    const activeButton = buttons[activeIndex];
    if (!activeButton) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();

    bar.style.left = `${buttonRect.left - containerRect.left}px`;
    bar.style.width = `${buttonRect.width}px`;
  }, [activeItem, items]);

  // Runs synchronously before paint — bar is at correct position before anything is visible
  useLayoutEffect(() => {
    positionBar();
  }, [positionBar]);

  useEffect(() => {
    window.addEventListener("resize", positionBar);
    return () => window.removeEventListener("resize", positionBar);
  }, [positionBar]);

  // Kick off reveal when selection appears (adjusting state during render)
  if (!hasSelection && mode !== "idle") {
    setMode("idle");
  } else if (hasSelection && mode === "idle") {
    setMode("revealing");
  }

  // After reveal completes, enable position transitions
  useEffect(() => {
    if (mode === "revealing") {
      const timer = setTimeout(() => setMode("sliding"), 350);
      return () => clearTimeout(timer);
    }
  }, [mode]);

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

      <div
        ref={barRef}
        className={cn(
          "absolute bottom-0 h-[2px]",
          isShimmering ? "shimmer-accent" : "bg-accent"
        )}
        style={{
          transformOrigin: "left",
          transform: mode !== "idle" ? "scaleX(1)" : "scaleX(0)",
          transitionProperty: mode === "sliding" ? "transform, left, width" : "transform",
          transitionDuration: "300ms",
          transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />
    </div>
  );
}
