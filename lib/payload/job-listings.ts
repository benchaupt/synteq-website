import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@/payload.config";

export const getJobListings = unstable_cache(
  async () => {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "job-listings",
      limit: 100,
      sort: "name",
    });
    return result.docs;
  },
  ["job-listings"],
  { tags: ["job-listings"], revalidate: 600 },
);

export const getJobListingBySlug = async (slug: string) => {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "job-listings",
    limit: 1,
    where: {
      slug: { equals: slug },
    },
  });
  return result.docs[0] ?? null;
};
