"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CSSIcon } from "@/app/_components/icon";
import type { PressRelease } from "@/payload-types";

function truncateWords(text: string, maxWords: number): string {
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
}

interface PressReleaseListProps {
  releases: PressRelease[];
}

export function PressReleaseList({ releases }: PressReleaseListProps) {
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);

  const filtered = releases.filter((pr) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      pr.title.toLowerCase().includes(q) ||
      pr.excerpt?.toLowerCase().includes(q)
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
            placeholder="Search press releases"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full bg-transparent text-body text-lava placeholder:text-lava-50 outline-none"
          />
          {/* Resting underline */}
          <span className="absolute bottom-0 left-0 right-0 h-px bg-lava-25" />
          {/* Active underline — slides in from left */}
          <span
            className={cn(
              "absolute bottom-0 left-0 right-0 h-px bg-lava origin-left transition-transform duration-300 ease-out",
              isActive ? "scale-x-100" : "scale-x-0",
            )}
          />
        </label>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-x-16 md:gap-y-16">
          {filtered.map((pr: PressRelease) => (
            <Link
              key={pr.id}
              href={`/knowledge-hub/press-releases/${pr.slug}`}
              className="group/card flex flex-col gap-4"
            >
              <h3 className="heading5">{pr.title}</h3>
              <p className="text-body leading-relaxed">
                {truncateWords(pr.excerpt, 50)}
              </p>
              <span className="inline-flex items-center w-fit overflow-hidden relative">
                <span className="absolute inset-y-0 left-0 bg-lava size-6 transition-all duration-300 ease-out group-hover/card:w-full" />
                <span className="relative z-10 flex shrink-0 items-center justify-center size-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/icons/button-arrow-right.svg"
                    alt=""
                    className="size-3.5"
                  />
                </span>
                <span className="relative z-10 pr-3 pl-2 text-sm font-bold text-lava transition-colors duration-300 group-hover/card:text-white">
                  Read More
                </span>
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-slate text-body-lg">
            {search.trim()
              ? "No press releases match your search."
              : "No press releases published yet. Check back soon."}
          </p>
        </div>
      )}
    </>
  );
}
