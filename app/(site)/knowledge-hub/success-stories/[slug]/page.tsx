/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import { Section } from "@/app/_components/section";
import { CSSIcon } from "@/app/_components/icon";
import { Button } from "@/app/_components/button";
import { getSuccessStoryBySlug, getRecentSuccessStories } from "@/lib/payload/success-stories";
import { SuccessStoryCard } from "@/app/_components/success-story-card";
import { StyledHeading } from "@/app/_components/styled-heading";
import RichText from "@/payload/components/RichText";
import { TableOfContents } from "@/app/(site)/knowledge-hub/blogs/[slug]/_components/table-of-contents";
import { KeyMetrics } from "@/app/(site)/knowledge-hub/success-stories/[slug]/_components/key-metrics";
import { ShareButtons } from "@/app/_components/share-buttons";
import { ArrowLeft } from "lucide-react";
import type { Media } from "@/payload-types";
import type { Metadata } from "next";
import Link from "next/link";

interface SuccessStoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: SuccessStoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getSuccessStoryBySlug(slug);
  if (!story) return { title: "Not Found" };
  return {
    title: `${story.client}: ${story.title} | Synteq Digital`,
    description: story.excerpt ?? story.meta?.description ?? "",
  };
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

export default async function SuccessStoryPage({
  params,
}: SuccessStoryPageProps) {
  const { slug } = await params;
  const story = await getSuccessStoryBySlug(slug);

  if (!story) notFound();

  const coverImage =
    story.coverImage && typeof story.coverImage === "object"
      ? (story.coverImage as Media)
      : null;

  const clientLogo =
    story.clientLogo && typeof story.clientLogo === "object"
      ? (story.clientLogo as Media)
      : null;

  const recentStories = await getRecentSuccessStories(2);
  const otherStories = recentStories
    .filter((s) => s.id !== story.id)
    .slice(0, 1);

  return (
    <>
      <Section className="pt-28 md:pt-32" innerClassName="flex flex-col gap-6">
        {/* Mobile back + share row */}
        <div className="flex items-center justify-between xl:hidden">
          <Link
            href="/knowledge-hub/success-stories"
            className="group flex items-center gap-2 text-body font-medium text-lava hover:text-lava-70 transition-colors"
          >
            <ArrowLeft className="size-4" />
            All Success Stories
          </Link>
          <ShareButtons />
        </div>

        <div className="grid gap-12 xl:grid-cols-[200px_1fr]">
        <aside className="hidden xl:block">
          <div className="sticky top-36 flex flex-col gap-6">
            <Link
              href="/knowledge-hub/success-stories"
              className="group flex items-center gap-2 text-body font-medium text-lava hover:text-lava-70 transition-colors"
            >
              <CSSIcon
                name="arrow-up-right"
                size="sm"
                className="-scale-x-100 -scale-y-100 rotate-45 transition-transform group-hover:-translate-x-0.5"
              />
              All Success Stories
            </Link>
            <TableOfContents />
            <ShareButtons />
          </div>
        </aside>

        <div className="max-w-3xl mx-auto" data-article-content>
          {/* Client logo */}
          {clientLogo?.url && (
            <img
              src={clientLogo.url}
              alt={story.client}
              className="h-10 w-auto object-contain mb-6"
            />
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-2 text-body">
            <span className="font-semibold text-lava">{story.client}</span>
            {story.industry && (
              <>
                <span className="text-cream">|</span>
                <span className="text-lava-70 capitalize">{story.industry}</span>
              </>
            )}
            <span className="text-cream">|</span>
            <span className="text-lava-70">{estimateReadTime(story.content)} min read</span>
          </div>

          <h1 className="title my-4 md:mb-4">{story.title}</h1>
          <p className="text-body-lg text-lava leading-relaxed mb-8">
            {story.excerpt}
          </p>

          {/* Key metrics */}
          {story.metrics && story.metrics.length > 0 && (
            <KeyMetrics metrics={story.metrics} />
          )}

          {/* Cover image */}
          {coverImage?.url && (
            <img
              src={coverImage.url}
              alt={coverImage.alt ?? story.title}
              className="w-full mb-10 aspect-video object-cover"
            />
          )}

          {/* Content */}
          <RichText
            data={story.content}
            enableGutter={false}
            enableProse
          />

          {/* Testimonial */}
          {story.testimonial?.quote && (
            <blockquote className="border-l-4 border-lava pl-6 py-4 my-10">
              <p className="text-body-lg text-lava leading-relaxed italic mb-4">
                &ldquo;{story.testimonial.quote}&rdquo;
              </p>
              {(story.testimonial.author || story.testimonial.role) && (
                <footer className="text-body-sm text-lava-70">
                  {story.testimonial.author && (
                    <span className="font-semibold text-lava">
                      {story.testimonial.author}
                    </span>
                  )}
                  {story.testimonial.role && (
                    <span> — {story.testimonial.role}</span>
                  )}
                </footer>
              )}
            </blockquote>
          )}

          <div className="pt-8">
            <Button href="/contact" variant="primary" size="md">
              Start Your Success Story
            </Button>
          </div>
        </div>
        </div>
      </Section>

      {/* More Success Stories */}
      {otherStories.length > 0 && (
        <Section>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <StyledHeading as="h2" className="heading1">
                More Success Stories.
              </StyledHeading>
              <Button href="/knowledge-hub/success-stories" variant="primary" size="md">
                View All
              </Button>
            </div>
            <div className="flex flex-col gap-16">
              {otherStories.map((s) => (
                <SuccessStoryCard key={s.id} story={s} />
              ))}
            </div>
          </div>
        </Section>
      )}
    </>
  );
}
