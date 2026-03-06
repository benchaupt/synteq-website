import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

import { revalidatePath, revalidateTag } from "next/cache";

import type { PressRelease } from "@/payload-types";

export const revalidatePressRelease: CollectionAfterChangeHook<PressRelease> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === "published") {
      const path = `/knowledge-hub/press-releases/${doc.slug}`;

      payload.logger.info(`Revalidating press release at path: ${path}`);

      revalidatePath(path);
      revalidateTag("press-releases-sitemap");
      revalidateTag("press-releases");
    }

    if (previousDoc._status === "published" && doc._status !== "published") {
      const oldPath = `/knowledge-hub/press-releases/${previousDoc.slug}`;

      payload.logger.info(`Revalidating old press release at path: ${oldPath}`);

      revalidatePath(oldPath);
      revalidateTag("press-releases-sitemap");
      revalidateTag("press-releases");
    }
  }
  return doc;
};

export const revalidatePressReleaseDelete: CollectionAfterDeleteHook<PressRelease> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/knowledge-hub/press-releases/${doc?.slug}`;

    payload.logger.info(`Revalidating deleted press release at path: ${path}`);

    revalidatePath(path);
    revalidateTag("press-releases-sitemap");
    revalidateTag("press-releases");
  }

  return doc;
};
