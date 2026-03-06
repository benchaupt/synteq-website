import type { CollectionBeforeChangeHook } from "payload";

export const ensureSingleFeatured: CollectionBeforeChangeHook = async ({
  data,
  originalDoc,
  req: { payload },
}) => {
  if (data.featured === true && !originalDoc?.featured) {
    const existing = await payload.find({
      collection: "success-stories",
      where: { featured: { equals: true } },
      limit: 100,
    });

    for (const doc of existing.docs) {
      if (doc.id !== originalDoc?.id) {
        await payload.update({
          collection: "success-stories",
          id: doc.id,
          data: { featured: false },
          context: { disableRevalidate: true },
        });
      }
    }
  }

  return data;
};
