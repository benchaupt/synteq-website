import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@/payload.config";

export const getAuthors = unstable_cache(
  async () => {
    const payload = await getPayload({ config });
    const authors = await payload.find({
      collection: "authors",
      depth: 1,
      limit: 100,
      sort: "name",
    });
    return authors.docs;
  },
  ["authors"],
  { tags: ["authors"], revalidate: 600 },
);

export const getAuthorBySlug = async (slug: string) => {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "authors",
    depth: 1,
    limit: 1,
    where: {
      slug: { equals: slug },
    },
  });
  return result.docs[0] ?? null;
};
