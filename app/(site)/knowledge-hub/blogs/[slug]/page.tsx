import { notFound } from "next/navigation";
import { Section } from "@/app/_components/section";
import { CSSIcon } from "@/app/_components/icon";
import { getBlogBySlug, getRecentBlogs } from "@/lib/payload/blogs";
import { RecentBlogsClient } from "@/app/(site)/knowledge-hub/_components/recent-blogs";
import RichText from "@/payload/components/RichText";
import { TableOfContents } from "@/app/(site)/knowledge-hub/blogs/[slug]/_components/table-of-contents";
import { ShareButtons } from "@/app/_components/share-buttons";
import { ArrowLeft } from "lucide-react";
import type { Media, Category, Author } from "@/payload-types";
import type { Metadata } from "next";
import Link from "next/link";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} | Synteq Digital`,
    description: post.excerpt ?? post.meta?.description ?? "",
  };
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function estimateReadTime(content: any): number {
  let text = "";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function walk(node: any) {
    if (node?.text) text += node.text + " ";
    if (node?.children) node.children.forEach(walk);
  }
  walk(content?.root);
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 230));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) notFound();

  const heroImage =
    post.heroImage && typeof post.heroImage === "object"
      ? (post.heroImage as Media)
      : null;

  const categoryNames = (post.categories ?? [])
    .map((cat) => (typeof cat === "object" ? (cat as Category).title : null))
    .filter(Boolean)
    .map((name) => name!.charAt(0).toUpperCase() + name!.slice(1));

  const bylineAuthors = (post.bylineAuthors ?? [])
    .filter((a): a is Author => typeof a === "object" && a !== null);

  const recentBlogs = await getRecentBlogs(4);
  const relatedBlogs = recentBlogs.filter((b) => b.id !== post.id).slice(0, 3);

  return (
    <>
      <Section className="pt-28 md:pt-32" innerClassName="flex flex-col gap-6">
        {/* Mobile back + share row */}
        <div className="flex items-center justify-between xl:hidden">
          <Link
            href="/knowledge-hub/blogs"
            className="group flex items-center gap-2 text-body font-medium text-lava hover:text-lava-70 transition-colors"
          >
            <ArrowLeft className="size-4" />
            All Blogs
          </Link>
          <ShareButtons />
        </div>

        <div className="grid gap-12 xl:grid-cols-[200px_1fr]">
        <aside className="hidden xl:block">
          <div className="sticky top-36 flex flex-col gap-6">
            <Link
              href="/knowledge-hub/blogs"
              className="group flex items-center gap-2 text-body font-medium text-lava hover:text-lava-70 transition-colors"
            >
              <CSSIcon
                name="arrow-up-right"
                size="sm"
                className="-scale-x-100 -scale-y-100 rotate-45 transition-transform group-hover:-translate-x-0.5"
              />
              All Blogs
            </Link>
            <TableOfContents />
            <ShareButtons />
          </div>
        </aside>

        <div className="max-w-3xl mx-auto" data-article-content>
          <div className="flex flex-wrap items-center gap-3 mb-2 text-body">
            {categoryNames.length > 0 && (
              <span className="font-semibold text-lava">{categoryNames.join(", ")}</span>
            )}
            {categoryNames.length > 0 && <span className="text-cream">|</span>}
            {post.publishedAt && (
              <time className="text-lava-70">{formatDate(post.publishedAt)}</time>
            )}
            <span className="text-cream">|</span>
            <span className="text-lava-70">{estimateReadTime(post.content)} min read</span>
          </div>

          {bylineAuthors.length > 0 ? (
            <div className="flex items-center gap-3 mb-4">
              <div className="flex -space-x-2">
                {bylineAuthors.map((author) => {
                  const photo =
                    author.photo && typeof author.photo === "object"
                      ? (author.photo as Media)
                      : null;
                  return photo?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={author.id}
                      src={photo.url}
                      alt={author.name}
                      className="size-7 rounded-full object-cover border-2 border-white"
                    />
                  ) : (
                    <div
                      key={author.id}
                      className="size-7 rounded-full bg-cream border-2 border-white flex items-center justify-center text-label font-semibold text-lava"
                    >
                      {author.name.charAt(0)}
                    </div>
                  );
                })}
              </div>
              <span className="text-body text-lava-70">
                {bylineAuthors.map((a, i) => (
                  <span key={a.id}>
                    <span className="hover:text-lava transition-colors cursor-default">{a.name}</span>
                    {i < bylineAuthors.length - 1 && ", "}
                  </span>
                ))}
              </span>
            </div>
          ) : post.author ? (
            <div className="flex items-center gap-3 mb-4 text-body text-lava-70">
              <span>{post.author}</span>
            </div>
          ) : null}

          <h1 className="title mb-4">{post.title}</h1>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag.id ?? tag.tag}
                  className="subheading"
                >
                  {tag.tag}
                </span>
              ))}
            </div>
          )}

          {heroImage?.url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={heroImage.url}
              alt={heroImage.alt ?? post.title}
              className="w-full mb-10 aspect-video object-cover"
            />
          )}
          <RichText
            data={post.content}
            enableGutter={false}
            enableProse
          />
        </div>
        </div>
      </Section>

      {relatedBlogs.length > 0 && (
        <Section>
          <RecentBlogsClient posts={relatedBlogs} heading="Read More." />
        </Section>
      )}
    </>
  );
}
