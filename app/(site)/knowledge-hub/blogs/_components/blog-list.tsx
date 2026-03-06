"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { CSSIcon } from "@/app/_components/icon";
import { BlogInfoCard } from "@/app/_components/blog-info-card";
import { motion } from "motion/react";
import type { Post, Category } from "@/payload-types";

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getCategoryName(post: Post): string {
  if (
    post.categories &&
    Array.isArray(post.categories) &&
    post.categories.length > 0
  ) {
    const cat = post.categories[0];
    if (typeof cat === "object" && cat !== null) {
      return capitalizeFirst((cat as Category).title);
    }
  }
  return "Article";
}

/* ─── Category Tabs ─── */

function CategoryTabs({
  categories,
  active,
  onChange,
}: {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
}) {
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [indicator, setIndicator] = useState({ left: 0, top: 0, width: 0 });

  const measure = useCallback(() => {
    const el = tabRefs.current.get(active);
    if (el) {
      setIndicator({ left: el.offsetLeft, top: el.offsetTop + el.offsetHeight, width: el.offsetWidth });
    }
  }, [active]);

  useEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return (
    <div className="relative flex flex-wrap items-center gap-x-6 gap-y-2">
      {categories.map((cat) => (
        <button
          key={cat}
          ref={(el) => {
            if (el) tabRefs.current.set(cat, el);
          }}
          onClick={() => onChange(cat)}
          className={cn(
            "shrink-0 pb-0 sm:pb-2 text-body font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap",
            active === cat ? "text-lava" : "text-lava-50 hover:text-lava-80",
          )}
        >
          {cat}
        </button>
      ))}
      {/* Sliding underline */}
      <motion.span
        className="absolute h-0.5 bg-lava"
        animate={{ left: indicator.left, top: indicator.top, width: indicator.width }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    </div>
  );
}

/* ─── Main Blog List ─── */

interface BlogListProps {
  posts: Post[];
  categories: string[];
}

export function BlogList({ posts, categories }: BlogListProps) {
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const allCategories = ["All", ...categories.map(capitalizeFirst)];

  const searchActive = searchFocused || search.trim().length > 0;

  const filtered = posts.filter((post) => {
    if (activeCategory !== "All") {
      const postCat = getCategoryName(post);
      if (postCat !== activeCategory) return false;
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      const matchesTitle = post.title.toLowerCase().includes(q);
      const matchesExcerpt = post.excerpt?.toLowerCase().includes(q);
      if (!matchesTitle && !matchesExcerpt) return false;
    }

    return true;
  });

  return (
    <>
      {/* Filters: search then categories stacked left-aligned */}
      <div className="mb-12 flex flex-col gap-6">
        {/* Search */}
        <label className="relative flex items-center gap-2 pb-2 w-full max-w-sm cursor-text">
          <CSSIcon
            name="search"
            size="md"
            className={cn(
              "transition-colors duration-300",
              searchActive ? "text-lava" : "text-lava-25",
            )}
          />
          <input
            type="text"
            placeholder="Search articles"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full bg-transparent text-body text-lava placeholder:text-lava-50 outline-none"
          />
          <span className="absolute bottom-0 left-0 right-0 h-px bg-lava-25" />
          <span
            className={cn(
              "absolute bottom-0 left-0 right-0 h-px bg-lava origin-left transition-transform duration-300 ease-out",
              searchActive ? "scale-x-100" : "scale-x-0",
            )}
          />
        </label>

        {/* Category tabs */}
        {allCategories.length > 1 && (
          <CategoryTabs
            categories={allCategories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filtered.map((post) => (
            <BlogInfoCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-slate text-body-lg">
            {search.trim()
              ? "No articles match your search."
              : "No articles in this category yet."}
          </p>
        </div>
      )}
    </>
  );
}
