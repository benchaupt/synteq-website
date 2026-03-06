"use client";

import { Button } from "@/app/_components/button";
import { BlogInfoCard } from "@/app/_components/blog-info-card";
import { StyledHeading } from "@/app/_components/styled-heading";
import type { Post } from "@/payload-types";

interface RecentBlogsProps {
  posts: Post[];
  heading?: string;
}

export function RecentBlogsClient({ posts, heading = "Info Library." }: RecentBlogsProps) {
  if (posts.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 md:gap-10">
      {/* Header row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <StyledHeading as="h2" className="heading1">
          {heading}
        </StyledHeading>
        <Button href="/knowledge-hub/blogs" variant="primary" size="md">
          View All
        </Button>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {posts.map((post: Post) => (
          <BlogInfoCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
