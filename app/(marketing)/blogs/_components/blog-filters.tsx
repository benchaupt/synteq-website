"use client";

import { SliderTabs } from "@/app/_components/slider-tabs";

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
    <SliderTabs
      items={categories}
      activeItem={activeCategory}
      onItemChange={onCategoryChange}
    />
  );
}
