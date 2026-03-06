import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@/payload.config";

export const getBlogs = unstable_cache(
  async (page = 1, limit = 10) => {
    const payload = await getPayload({ config });
    const blogs = await payload.find({
      collection: "posts",
      depth: 1,
      limit,
      page,
      sort: "-publishedAt",
      where: {
        _status: { equals: "published" },
      },
    });
    return blogs;
  },
  ["blogs"],
  { tags: ["posts"], revalidate: 600 },
);

export const getBlogBySlug = async (slug: string) => {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "posts",
    depth: 2,
    limit: 1,
    where: {
      slug: { equals: slug },
      _status: { equals: "published" },
    },
  });
  return result.docs[0] ?? null;
};

export const getCategories = unstable_cache(
  async () => {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "categories",
      limit: 100,
      sort: "title",
    });
    return result.docs;
  },
  ["categories"],
  { tags: ["categories"], revalidate: 600 },
);

export const getFeaturedBlogs = unstable_cache(
  async (limit = 3) => {
    const payload = await getPayload({ config });

    // Fetch featured posts first
    const featured = await payload.find({
      collection: "posts",
      depth: 1,
      limit,
      sort: "-publishedAt",
      where: {
        _status: { equals: "published" },
        featured: { equals: true },
      },
    });

    if (featured.docs.length >= limit) {
      return featured.docs.slice(0, limit);
    }

    // Backfill with recent non-featured posts
    const featuredIds = featured.docs.map((doc) => doc.id);
    const remaining = limit - featured.docs.length;

    const recent = await payload.find({
      collection: "posts",
      depth: 1,
      limit: remaining,
      sort: "-publishedAt",
      where: {
        _status: { equals: "published" },
        ...(featuredIds.length > 0
          ? { id: { not_in: featuredIds } }
          : {}),
      },
    });

    return [...featured.docs, ...recent.docs];
  },
  ["featured-blogs"],
  { tags: ["posts"], revalidate: 600 },
);

export const getRecentBlogs = unstable_cache(
  async (limit = 3) => {
    const payload = await getPayload({ config });
    const blogs = await payload.find({
      collection: "posts",
      depth: 1,
      limit,
      sort: "-publishedAt",
      where: {
        _status: { equals: "published" },
      },
    });
    return blogs.docs;
  },
  ["recent-blogs"],
  { tags: ["posts"], revalidate: 600 },
);
