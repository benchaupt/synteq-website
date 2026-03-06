import { getRecentBlogs } from "@/lib/payload/blogs";
import { RecentBlogsClient } from "./recent-blogs";

export async function RecentBlogs() {
  const posts = await getRecentBlogs(3);
  return <RecentBlogsClient posts={posts} />;
}
