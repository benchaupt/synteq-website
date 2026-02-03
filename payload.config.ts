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
import { ModelManagement } from "./payload/globals/ModelManagement";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const generateTitle: GenerateTitle<Post> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Synteq AI` : "Synteq AI";
};

const generateURL: GenerateURL<Post> = ({ doc }) => {
  const url = getServerSideURL();
  console.log(doc);
  return doc?.slug ? `${url}/${doc.slug}` : url;
};

const cloudflare = await getCloudflareContext({ async: true });
export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "- Synteq AI",
    },
  },
  editor: lexicalEditor(),
  collections: [Users, Media, Categories, Posts],
  globals: [ModelManagement],
  secret: process.env.PAYLOAD_SECRET || "my-im-crunchbits-ell-ell-cee-secure",
  db: postgresAdapter({
    pool: {
      connectionString: cloudflare.env.HYPERDRIVE.connectionString,
      maxUses: 1,
    },
  }),
  plugins: [
    redirectsPlugin({
      collections: ["posts"],
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
    // s3Storage({
    //   collections: {
    //     media: true,
    //   },
    //   bucket: process.env.S3_BUCKET || "",
    //   config: {
    //     credentials: {
    //       accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
    //       secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
    //     },
    //     region: process.env.S3_REGION || "",
    //     endpoint: process.env.S3_ENDPOINT || "",
    //     // ... Other S3 configuration
    //   },
    // }),
    // TODO: use this when we setup open-next / workers
    r2Storage({
      collections: {
        media: true,
      },
      bucket: cloudflare.env.MEDIA_R2_BUCKET,
    }),
  ],
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  // sharp is disabled for Cloudflare Workers compatibility
  // Image processing is handled by Cloudflare Images instead
});
