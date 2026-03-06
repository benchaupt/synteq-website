import { notFound } from "next/navigation";
import { Section } from "@/app/_components/section";
import { CSSIcon } from "@/app/_components/icon";
import { getPressReleaseBySlug, getRecentPressReleases } from "@/lib/payload/press-releases";
import { MorePressReleases } from "@/app/(site)/knowledge-hub/press-releases/[slug]/_components/more-press-releases";
import { PressContactBlock } from "@/app/(site)/knowledge-hub/press-releases/[slug]/_components/press-contact-block";
import RichText from "@/payload/components/RichText";
import { ShareButtons } from "@/app/_components/share-buttons";
import { ArrowLeft } from "lucide-react";
import type { Media, Author } from "@/payload-types";
import type { Metadata } from "next";
import Link from "next/link";

interface PressReleasePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PressReleasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const release = await getPressReleaseBySlug(slug);
  if (!release) return { title: "Not Found" };
  return {
    title: `${release.title} | Synteq Digital`,
    description: release.excerpt ?? release.meta?.description ?? "",
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

export default async function PressReleasePage({
  params,
}: PressReleasePageProps) {
  const { slug } = await params;
  const release = await getPressReleaseBySlug(slug);

  if (!release) notFound();

  const bylineAuthors = (release.bylineAuthors ?? [])
    .filter((a): a is Author => typeof a === "object" && a !== null);

  const recentReleases = await getRecentPressReleases(4);
  const otherReleases = recentReleases
    .filter((r) => r.id !== release.id)
    .slice(0, 3);

  return (
    <>
      <Section className="pt-28 md:pt-32" innerClassName="flex flex-col gap-6">
        {/* Mobile back + share row */}
        <div className="flex items-center justify-between xl:hidden">
          <Link
            href="/knowledge-hub/press-releases"
            className="group flex items-center gap-2 text-body font-medium text-lava hover:text-lava-70 transition-colors"
          >
            <ArrowLeft className="size-4" />
            All Press Releases
          </Link>
          <ShareButtons />
        </div>

        <div className="grid gap-12 xl:grid-cols-[200px_1fr]">
        <aside className="hidden xl:block">
          <div className="sticky top-36 flex flex-col gap-6">
            <Link
              href="/knowledge-hub/press-releases"
              className="group flex items-center gap-2 text-body font-medium text-lava hover:text-lava-70 transition-colors"
            >
              <CSSIcon
                name="arrow-up-right"
                size="sm"
                className="-scale-x-100 -scale-y-100 rotate-45 transition-transform group-hover:-translate-x-0.5"
              />
              All Press Releases
            </Link>
            <ShareButtons />
          </div>
        </aside>

        <div className="max-w-3xl mx-auto" data-article-content>
          <div className="flex items-center gap-3 mb-2 text-body">
            <time className="font-semibold text-lava">
              {formatDate(release.releaseDate)}
            </time>
            {release.source && (
              <>
                <span className="text-cream">|</span>
                <span className="text-lava-70">{release.source}</span>
              </>
            )}
            <span className="text-cream">|</span>
            <span className="text-lava-70">{estimateReadTime(release.content)} min read</span>
          </div>

          {bylineAuthors.length > 0 && (
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
          )}

          <h1 className="title mb-4">{release.title}</h1>
          <p className="text-body-lg text-lava leading-relaxed mb-8">
            {release.excerpt}
          </p>

          <RichText
            data={release.content}
            enableGutter={false}
            enableProse
          />

          {/* Press contact block */}
          <div className="mt-12 pt-8">
            <PressContactBlock />
          </div>
        </div>
        </div>
      </Section>

      {otherReleases.length > 0 && (
        <Section>
          <MorePressReleases releases={otherReleases} />
        </Section>
      )}
    </>
  );
}
