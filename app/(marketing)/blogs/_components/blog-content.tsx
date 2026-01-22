"use client";

import { useMemo, useState } from "react";
import { BlogCard, BlogCardProps } from "@/app/_components/blog-card";
import { BlogFilters } from "./blog-filters";
import { EmailCapture } from "@/app/_components/email-capture";

export type BlogPost = BlogCardProps;

interface BlogContentProps {
  posts: BlogPost[];
  categories: string[];
}

const INITIAL_COUNT = 9;
const LOAD_MORE_COUNT = 6;

export function BlogContent({ posts, categories }: BlogContentProps) {
  const [activeCategory, setActiveCategory] = useState("ALL NEWS");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "ALL NEWS") {
      return posts;
    }
    return posts.filter(
      (post) => post.category.toUpperCase() === activeCategory.toUpperCase()
    );
  }, [activeCategory, posts]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(INITIAL_COUNT);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, filteredPosts.length));
  };

  return (
    <>
      {/* Blog Header */}
      <section className="max-w-viewport w-full mx-auto px-5 pt-16 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl text-foreground tracking-tight">Blog</h1>
            <p className="text-base text-foreground/60 max-w-xl">
              Here, we share insights, engineering deep-dives, and stories that inspire your next build.
            </p>
          </div>
          <EmailCapture
            buttonText="Join waitlist"
            layout="horizontal"
            className="w-lg"
            icon="/assets/icons/email.svg"
          />
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-viewport w-full mx-auto px-5 py-10">
        <BlogFilters
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </section>

      {/* Blog Grid */}
      <section className="max-w-viewport w-full mx-auto px-5 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {visiblePosts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>

        {/* Empty State */}
        {visiblePosts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="text-xl text-foreground/60">
              No posts found in this category.
            </p>
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center pt-16">
            <button
              onClick={handleLoadMore}
              className="font-mono text-base text-foreground/60 hover:text-foreground transition-colors"
            >
              Load more
            </button>
          </div>
        )}
      </section>
    </>
  );
}
