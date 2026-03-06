import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

import { revalidatePath, revalidateTag } from "next/cache";

import type { SuccessStory } from "@/payload-types";

export const revalidateSuccessStory: CollectionAfterChangeHook<SuccessStory> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === "published") {
      const path = `/knowledge-hub/success-stories/${doc.slug}`;

      payload.logger.info(`Revalidating success story at path: ${path}`);

      revalidatePath(path);
      revalidateTag("success-stories-sitemap");
      revalidateTag("success-stories");
    }

    if (previousDoc._status === "published" && doc._status !== "published") {
      const oldPath = `/knowledge-hub/success-stories/${previousDoc.slug}`;

      payload.logger.info(`Revalidating old success story at path: ${oldPath}`);

      revalidatePath(oldPath);
      revalidateTag("success-stories-sitemap");
      revalidateTag("success-stories");
    }
  }
  return doc;
};

export const revalidateSuccessStoryDelete: CollectionAfterDeleteHook<SuccessStory> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/knowledge-hub/success-stories/${doc?.slug}`;

    payload.logger.info(`Revalidating deleted success story at path: ${path}`);

    revalidatePath(path);
    revalidateTag("success-stories-sitemap");
    revalidateTag("success-stories");
  }

  return doc;
};
