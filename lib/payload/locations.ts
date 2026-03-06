import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@/payload.config";

export const getLocations = unstable_cache(
  async () => {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "locations",
      limit: 100,
      sort: "sortOrder",
    });
    return result.docs;
  },
  ["locations"],
  { tags: ["locations"], revalidate: 600 },
);
