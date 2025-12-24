import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Your Next.js config here
    images: {
        remotePatterns: [{
                protocol: "https",
                hostname: "synteq.ai",
            },
            {
                // protocol: "https",
                hostname: process.env.NEXT_PUBLIC_SERVER_URL.replace("https://", "").replace("http://", "").replace("://", "").replace(":", "").replace("/", ""),
                // port: "3000",
            },
            {
                protocol: "http",
                hostname: "100.125.39.124",
                port: "3000",
            },
        ],
        localPatterns: [{
            pathname: "/api/media/**",
        }],
    },
};

// Make sure you wrap your `nextConfig`
// with the `withPayload` plugin
export default withPayload(nextConfig);