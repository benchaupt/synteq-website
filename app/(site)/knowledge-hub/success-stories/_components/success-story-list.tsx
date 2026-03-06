"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CSSIcon } from "@/app/_components/icon";
import { SuccessStoryCard } from "@/app/_components/success-story-card";
import type { SuccessStory } from "@/payload-types";

interface SuccessStoryListProps {
  stories: SuccessStory[];
}

export function SuccessStoryList({ stories }: SuccessStoryListProps) {
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);

  const filtered = stories.filter((story) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      story.title.toLowerCase().includes(q) ||
      story.excerpt?.toLowerCase().includes(q) ||
      story.client?.toLowerCase().includes(q) ||
      story.industry?.toLowerCase().includes(q)
    );
  });

  const isActive = focused || search.trim().length > 0;

  return (
    <>
      {/* Search bar */}
      <div className="mb-12">
        <label className="relative flex items-center gap-2 pb-2 w-full max-w-sm cursor-text">
          <CSSIcon
            name="search"
            size="md"
            className={cn(
              "transition-colors duration-300",
              isActive ? "text-lava" : "text-lava-25",
            )}
          />
          <input
            type="text"
            placeholder="Search success stories"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full bg-transparent text-body text-lava placeholder:text-lava-50 outline-none"
          />
          <span className="absolute bottom-0 left-0 right-0 h-px bg-lava-25" />
          <span
            className={cn(
              "absolute bottom-0 left-0 right-0 h-px bg-lava origin-left transition-transform duration-300 ease-out",
              isActive ? "scale-x-100" : "scale-x-0",
            )}
          />
        </label>
      </div>

      {filtered.length > 0 ? (
        <div className="flex flex-col gap-12 md:gap-16">
          {filtered.map((story) => (
            <SuccessStoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-slate text-body-lg">
            {search.trim()
              ? "No success stories match your search."
              : "No success stories published yet. Check back soon."}
          </p>
        </div>
      )}
    </>
  );
}
