import type { CollectionBeforeChangeHook } from "payload";

export const enforceFeaturedLimit: CollectionBeforeChangeHook = async ({
  data,
  originalDoc,
  req: { payload },
}) => {
  // Only check when toggling featured on
  if (data.featured === true && !originalDoc?.featured) {
    const existing = await payload.count({
      collection: "posts",
      where: { featured: { equals: true } },
    });

    if (existing.totalDocs >= 3) {
      throw new Error(
        "Maximum of 3 featured blog posts allowed. Please unfeature another post first.",
      );
    }
  }

  return data;
};
