import { AnimatedButton } from "@/app/_components/animated-button";
import { BlogCarousel } from "@/app/_components/blog-carousel";
import type { Category, Media, Post } from "@/payload-types";
import configPromise from "@payload-config";
import Link from "next/link";
import { getPayload } from "payload";
import { unstable_cache } from "next/cache";

// Helper to safely extract image URL from a Payload media relation
function getImageUrl(media: number | null | Media | undefined): string {
    if (!media || typeof media === "number") return "/assets/blog/placeholder.png";
    return media.url ?? "/assets/blog/placeholder.png";
}

// Helper to safely extract category title from categories array
function getCategoryTitle(categories: (number | Category)[] | null | undefined): string {
    if (!categories || categories.length === 0) return "Uncategorized";
    const firstCategory = categories[0];
    if (typeof firstCategory === "number") return "Uncategorized";
    return firstCategory.title;
}

// Cache the blog posts fetch with a 60-second TTL
// This ensures fresh data across Cloudflare Workers edge regions
const getCachedPosts = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise });
        return payload.find({
            collection: "posts",
            depth: 2,
            limit: 6,
            overrideAccess: false,
            sort: "-publishedAt",
            where: {
                _status: {
                    equals: "published",
                },
            },
        });
    },
    ["blog-posts"], // Cache key
    { revalidate: 60, tags: ["posts"] } // Revalidate every 60 seconds
);

export const Blog = async () => {
    // Use cached fetch with 60s TTL
    const postsResult = await getCachedPosts();

    // Map Payload posts to BlogCarousel format
    const blogs = postsResult.docs.map((post: Post) => ({
        image: getImageUrl(post.heroImage) || getImageUrl(post.meta?.image),
        category: getCategoryTitle(post.categories),
        title: post.title,
        description: post.meta?.description ?? "",
        href: `/blogs/${post.slug}`,
    }));

    // Don't render the section if there are no posts
    if (blogs.length === 0) return null;

    return (
        <div className="max-w-viewport w-full mx-auto px-5 py-16 md:py-24 lg:py-32 flex flex-col">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 md:gap-8 lg:gap-12 mb-6 md:mb-8 lg:mb-12 px-4 md:px-6 lg:px-[25px]">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight md:tracking-[-1.8px] leading-tight md:leading-[110px]">Read our blog</h2>
                <Link href="/blogs" className="relative flex items-center shrink-0">
                    <AnimatedButton className="min-w-[120px] md:min-w-[137px] hover:bg-background-secondary text-sm md:text-base">View All</AnimatedButton>
                </Link>
            </div>
            <BlogCarousel blogs={blogs} />
        </div>
    )
}