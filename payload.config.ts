import { getCloudflareContext } from "@opennextjs/cloudflare";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { redirectsPlugin } from "@payloadcms/plugin-redirects";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

import { Post } from "@/payload-types";
import { revalidateRedirects } from "@/payload/hooks/revalidateRedirects";
import { getServerSideURL } from "@/payload/utilities/getURL";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
import { r2Storage } from "@payloadcms/storage-r2";
import { Categories } from "./payload/collections/Categories";
import { Media } from "./payload/collections/Media";
import { Posts } from "./payload/collections/Posts";
import { Users } from "./payload/collections/Users";
import { SuccessStories } from "./payload/collections/SuccessStories";
import { PressReleases } from "./payload/collections/PressReleases";
import { Locations } from "./payload/collections/Locations";
import { Authors } from "./payload/collections/Authors";
import { TeamMembers } from "./payload/collections/TeamMembers";
import { JobListings } from "./payload/collections/JobListings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const generateTitle: GenerateTitle<Post> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Synteq Digital` : "Synteq Digital";
};

const generateURL: GenerateURL<Post> = ({ doc }) => {
  const url = getServerSideURL();
  return doc?.slug ? `${url}/${doc.slug}` : url;
};

const cloudflare = await getCloudflareContext({ async: true });
export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "- Synteq Digital",
    },
  },
  editor: lexicalEditor(),
  collections: [Users, Media, Categories, Posts, SuccessStories, PressReleases, Locations, Authors, TeamMembers, JobListings],
  secret: process.env.PAYLOAD_SECRET || "my-im-crunchbits-ell-ell-cee-secure",
  db: postgresAdapter({
    pool: {
      connectionString: cloudflare.env.HYPERDRIVE.connectionString,
      maxUses: 1,
    },
  }),
  plugins: [
    redirectsPlugin({
      collections: ["posts", "success-stories", "press-releases"],
      overrides: {
        // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
        fields: ({ defaultFields }) => {
          return defaultFields.map((field) => {
            if ("name" in field && field.name === "from") {
              return {
                ...field,
                admin: {
                  description:
                    "You will need to rebuild the website when changing this field.",
                },
              };
            }
            return field;
          });
        },
        hooks: {
          afterChange: [revalidateRedirects],
        },
      },
    }),
    seoPlugin({
      generateTitle,
      generateURL,
    }),
    r2Storage({
      collections: {
        media: true,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      bucket: cloudflare.env.MEDIA_R2_BUCKET as any,
    }),
  ],
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
