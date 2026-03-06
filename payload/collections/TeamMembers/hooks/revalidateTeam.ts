import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";
import { revalidatePath, revalidateTag } from "next/cache";

export const revalidateTeam: CollectionAfterChangeHook = ({
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info("Revalidating team members");
    revalidateTag("team-members");
    revalidatePath("/team");
    revalidatePath("/hardware");
  }
};

export const revalidateTeamDelete: CollectionAfterDeleteHook = ({
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info("Revalidating team members after delete");
    revalidateTag("team-members");
    revalidatePath("/team");
    revalidatePath("/hardware");
  }
};
