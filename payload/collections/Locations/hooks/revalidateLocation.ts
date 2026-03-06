import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";

import { revalidatePath, revalidateTag } from "next/cache";

export const revalidateLocation: CollectionAfterChangeHook = ({
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info("Revalidating locations");
    revalidateTag("locations");
    revalidatePath("/hpc");
  }
};

export const revalidateLocationDelete: CollectionAfterDeleteHook = ({
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info("Revalidating locations after delete");
    revalidateTag("locations");
    revalidatePath("/hpc");
  }
};
