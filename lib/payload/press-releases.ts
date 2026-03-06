import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@/payload.config";

export const getPressReleases = unstable_cache(
  async (page = 1, limit = 10) => {
    const payload = await getPayload({ config });
    const releases = await payload.find({
      collection: "press-releases",
      depth: 1,
      limit,
      page,
      sort: "-releaseDate",
      where: {
        _status: { equals: "published" },
      },
    });
    return releases;
  },
  ["press-releases"],
  { tags: ["press-releases"], revalidate: 600 },
);

export const getPressReleaseBySlug = async (slug: string) => {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "press-releases",
    depth: 2,
    limit: 1,
    where: {
      slug: { equals: slug },
      _status: { equals: "published" },
    },
  });
  return result.docs[0] ?? null;
};

export const getRecentPressReleases = unstable_cache(
  async (limit = 3) => {
    const payload = await getPayload({ config });
    const releases = await payload.find({
      collection: "press-releases",
      depth: 1,
      limit,
      sort: "-releaseDate",
      where: {
        _status: { equals: "published" },
      },
    });
    return releases.docs;
  },
  ["recent-press-releases"],
  { tags: ["press-releases"], revalidate: 600 },
);
