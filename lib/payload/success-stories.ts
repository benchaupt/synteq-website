import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import type { Where } from "payload";
import config from "@/payload.config";

export const getSuccessStories = unstable_cache(
  async (page = 1, limit = 10, industry?: string) => {
    const payload = await getPayload({ config });

    const where: Where = {
      _status: { equals: "published" },
    };

    if (industry) {
      where.industry = { equals: industry };
    }

    const stories = await payload.find({
      collection: "success-stories",
      depth: 1,
      limit,
      page,
      sort: "-publishedAt",
      where,
    });
    return stories;
  },
  ["success-stories"],
  { tags: ["success-stories"], revalidate: 600 },
);

export const getSuccessStoryBySlug = async (slug: string) => {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "success-stories",
    depth: 2,
    limit: 1,
    where: {
      slug: { equals: slug },
      _status: { equals: "published" },
    },
  });
  return result.docs[0] ?? null;
};

export const getFeaturedSuccessStory = unstable_cache(
  async () => {
    const payload = await getPayload({ config });

    const featured = await payload.find({
      collection: "success-stories",
      depth: 1,
      limit: 1,
      where: {
        _status: { equals: "published" },
        featured: { equals: true },
      },
      sort: "-publishedAt",
    });

    if (featured.docs.length > 0) {
      return featured.docs[0];
    }

    // Fallback: most recent published story
    const recent = await payload.find({
      collection: "success-stories",
      depth: 1,
      limit: 1,
      sort: "-publishedAt",
      where: {
        _status: { equals: "published" },
      },
    });

    return recent.docs[0] ?? null;
  },
  ["featured-success-story"],
  { tags: ["success-stories"], revalidate: 600 },
);

export const getTopSuccessStories = unstable_cache(
  async (limit = 2) => {
    const payload = await getPayload({ config });
    const stories = await payload.find({
      collection: "success-stories",
      depth: 1,
      limit,
      sort: "-publishedAt",
      where: {
        _status: { equals: "published" },
      },
    });
    return stories.docs;
  },
  ["top-success-stories"],
  { tags: ["success-stories"], revalidate: 600 },
);

export const getRecentSuccessStories = unstable_cache(
  async (limit = 3) => {
    const payload = await getPayload({ config });
    const stories = await payload.find({
      collection: "success-stories",
      depth: 1,
      limit,
      sort: "-publishedAt",
      where: {
        _status: { equals: "published" },
      },
    });
    return stories.docs;
  },
  ["recent-success-stories"],
  { tags: ["success-stories"], revalidate: 600 },
);
