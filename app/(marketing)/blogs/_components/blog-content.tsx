"use client";

import { useMemo, useState } from "react";
import { BlogCard } from "./blog-card";
import { BlogFilters } from "./blog-filters";
import { BlogPagination } from "./blog-pagination";

export interface BlogPost {
  image: string;
  category: string;
  title: string;
  description: string;
  href: string;
}

interface BlogContentProps {
  posts: BlogPost[];
  categories: string[];
  itemsPerPage?: number;
}

export function BlogContent({
  posts,
  categories,
  itemsPerPage = 6,
}: BlogContentProps) {
  const [activeCategory, setActiveCategory] = useState("ALL NEWS");
  const [currentPage, setCurrentPage] = useState(0);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "ALL NEWS") {
      return posts;
    }
    return posts.filter(
      (post) => post.category.toUpperCase() === activeCategory.toUpperCase()
    );
  }, [activeCategory, posts]);

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const paginatedPosts = filteredPosts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(0);
  };

  return (
    <>
      {/* Filters and Pagination Row */}
      <section className="max-w-viewport w-full mx-auto px-5 py-10 pt-16">
        <div className="flex items-center justify-between gap-8">
          <BlogFilters
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
          <BlogPagination
            currentPage={currentPage}
            totalPages={Math.max(1, totalPages)}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-viewport w-full mx-auto px-5 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {paginatedPosts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>

        {/* Empty State */}
        {paginatedPosts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="text-xl text-foreground/60">
              No posts found in this category.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
