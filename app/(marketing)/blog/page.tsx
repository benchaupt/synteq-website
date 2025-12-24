"use client";

import { Footer } from "@/app/_components/footer";
import { Navigation } from "@/app/_components/navigation";
import { useMemo, useState } from "react";
import { BlogCard } from "./_components/blog-card";
import { BlogFilters } from "./_components/blog-filters";
import { BlogHero } from "./_components/blog-hero";
import { BlogPagination } from "./_components/blog-pagination";

const CATEGORIES = [
  "ALL NEWS",
  "AGENT NATIVE DEVELOPMENT",
  "COMPANY",
  "ENGINEERING",
  "FUNDRAISE",
  "PARTNERSHIP",
  "RESEARCH",
  "SECURITY",
];

const BLOG_POSTS = [
  {
    image: "/assets/blog/assistant-improvements.png",
    category: "ENGINEERING",
    title: "Inside our effort to improve the Synteq assistant",
    description:
      "A data-driven look at improving the assistant, powered by ClickHouse and deeper feedback analysis. Irure aute Lorem aute tempor proident do ipsum dolor.",
    href: "/blog/assistant-improvements",
  },
  {
    image: "/assets/blog/accelerate-compute.png",
    category: "AGENT NATIVE DEVELOPMENT",
    title: "Crunchbits is joining Synteq to accelerate high-performance compute solutions",
    description:
      "A data-driven look at improving the assistant, powered by ClickHouse and deeper feedback analysis.",
    href: "/blog/crunchbits-joining",
  },
  {
    image: "/assets/blog/hero-featured.png",
    category: "COMPANY",
    title: "Introducing self-updating LLM models",
    description:
      "A data-driven look at improving the assistant, powered by ClickHouse and deeper feedback analysis. Irure aute Lorem aute tempor proident do ipsum dolor.",
    href: "/blog/self-updating-llm",
  },
  {
    image: "/assets/blog/hero-featured.png",
    category: "FUNDRAISE",
    title: "Inside our effort to improve the Synteq assistant",
    description:
      "A data-driven look at improving the assistant, powered by ClickHouse and deeper feedback analysis. Irure aute Lorem aute tempor proident do ipsum dolor.",
    href: "/blog/fundraise-announcement",
  },
  {
    image: "/assets/blog/accelerate-compute.png",
    category: "PARTNERSHIP",
    title: "Inside our effort to improve the Synteq assistant",
    description:
      "A data-driven look at improving the assistant, powered by ClickHouse and deeper feedback analysis. Irure aute Lorem aute tempor proident do ipsum dolor.",
    href: "/blog/partnership-news",
  },
  {
    image: "/assets/blog/assistant-improvements.png",
    category: "RESEARCH",
    title: "Inside our effort to improve the Synteq assistant",
    description:
      "A data-driven look at improving the assistant, powered by ClickHouse and deeper feedback analysis. Irure aute Lorem aute tempor proident do ipsum dolor.",
    href: "/blog/research-update",
  },
];

const FEATURED_POST = {
  image: "/assets/blog/hero-featured.png",
  category: "ENGINEERING",
  title: "Introducing the next step towards self-updating LLM models",
  description:
    "The agent now monitors your codebase, proactively identifies new LLM model updates, and surfaces needed suggestions to your team.",
  href: "/blog/self-updating-llm-intro",
};

const ITEMS_PER_PAGE = 6;

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("ALL NEWS");
  const [currentPage, setCurrentPage] = useState(0);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "ALL NEWS") {
      return BLOG_POSTS;
    }
    return BLOG_POSTS.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(0);
  };

  return (
    <>
      <Navigation />
      <main className="flex flex-col bg-background">
        {/* Hero Section */}
        <section className="max-w-viewport w-full mx-auto px-5 pt-4">
          <BlogHero {...FEATURED_POST} />
        </section>

        {/* Filters and Pagination Row */}
        <section className="max-w-viewport w-full mx-auto px-5 py-10 pt-16">
          <div className="flex items-center justify-between gap-8">
            <BlogFilters
              categories={CATEGORIES}
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
              <p className="text-xl text-[#ccc]">
                No posts found in this category.
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
