import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

import { revalidatePath, revalidateTag } from "next/cache";

export const revalidateJobListing: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating job listings`);
    revalidatePath("/careers");
    revalidatePath(`/careers/${doc.slug}`);
    revalidateTag("job-listings");
  }
  return doc;
};

export const revalidateJobListingDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating deleted job listing`);
    revalidatePath("/careers");
    revalidatePath(`/careers/${doc?.slug}`);
    revalidateTag("job-listings");
  }
  return doc;
};
