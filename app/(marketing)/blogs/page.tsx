import { Category, Media } from "@/payload-types";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { BlogContent, BlogPost } from "./_components/blog-content";
import { BlogHero } from "./_components/blog-hero";

export const dynamic = "force-static";
export const revalidate = 60;

// Helper to extract URL from a media field that could be an ID or populated object
function getMediaUrl(media: number | Media | null | undefined): string {
  if (!media) return "";
  if (typeof media === "number") return "";
  return media.url || "";
}

// Helper to extract category title from a category that could be an ID or populated object
function getCategoryTitle(category: number | Category | null | undefined): string {
  if (!category) return "";
  if (typeof category === "number") return "";
  return category.title || "";
}

export default async function BlogPage() {
  const payload = await getPayload({ config: configPromise });

  // Fetch posts with proper depth to populate relationships
  const postsResult = await payload.find({
    collection: "posts",
    depth: 2,
    limit: 100,
    overrideAccess: false,
    sort: "-publishedAt",
    where: {
      _status: {
        equals: "published",
      },
    },
  });

  // Fetch categories for filters
  const categoriesResult = await payload.find({
    collection: "categories",
    depth: 0,
    limit: 100,
    overrideAccess: false,
  });

  // Build categories array - "ALL NEWS" first, then all category titles
  const categoryTitles = categoriesResult.docs
    .map((cat) => cat.title.toUpperCase())
    .filter(Boolean);
  const categories = ["ALL NEWS", ...categoryTitles];

  // Transform posts to BlogPost format
  const posts: BlogPost[] = postsResult.docs.map((post) => {
    // Try heroImage first, fall back to meta.image
    const imageUrl = getMediaUrl(post.heroImage) || getMediaUrl(post.meta?.image);
    // Get first category title
    const category = getCategoryTitle(post.categories?.[0]);

    return {
      image: imageUrl,
      category: category,
      title: post.title || "",
      description: post.meta?.description || "",
      href: `/blogs/${post.slug}`,
    };
  });

  // Featured post is the most recent one
  const featuredPost = posts[0];
  // Rest of posts for the grid (excluding featured)
  const gridPosts = posts.slice(1);

  return (
    <main className="flex flex-col bg-background">
      {/* Hero Section */}
      {featuredPost && (
        <section className="max-w-viewport w-full mx-auto px-5 pt-4">
          <BlogHero
            image={featuredPost.image}
            category={featuredPost.category}
            title={featuredPost.title}
            description={featuredPost.description}
            href={featuredPost.href}
          />
        </section>
      )}

      {/* Client-side Filters, Pagination, and Grid */}
      <BlogContent posts={gridPosts} categories={categories} />
    </main>
  );
}
