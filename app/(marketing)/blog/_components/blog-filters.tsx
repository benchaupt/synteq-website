"use client";

import { cn } from "@/lib/utils";

interface BlogFiltersProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function BlogFilters({
  categories,
  activeCategory,
  onCategoryChange,
}: BlogFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Settings/Filter Icon Button */}
      <button className="relative size-[25px] bg-background-secondary border border-white/10 shadow-[0px_0px_0px_1px_#0b0e0f] flex items-center justify-center">
        <svg
          className="size-4 rotate-[30deg] text-white"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 0L10.5 6L16.5 4.5L12 9L16.5 13.5L10.5 12L9 18L7.5 12L1.5 13.5L6 9L1.5 4.5L7.5 6L9 0Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {/* Category Buttons */}
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "relative font-mono text-sm leading-none tracking-tight px-1 py-1 transition-colors",
            activeCategory === category
              ? "bg-darker-accent text-background border-darker-accent"
              : "bg-background-secondary text-[#ccc] border border-white/10 hover:text-white"
          )}
        >
          <span className="relative z-10 uppercase">{category}</span>
          <div className="absolute inset-0 pointer-events-none shadow-[inset_-1px_-1px_0px_1px_rgba(255,255,255,0.15)]" />
        </button>
      ))}
    </div>
  );
}
