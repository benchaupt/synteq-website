import Link from "next/link";
import { getRecentPressReleases } from "@/lib/payload/press-releases";
import { Button } from "@/app/_components/button";
import type { PressRelease } from "@/payload-types";

function truncateWords(text: string, maxWords: number): string {
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
}

function PressReleaseCard({ release }: { release: PressRelease }) {
  return (
    <Link
      href={`/knowledge-hub/press-releases/${release.slug}`}
      className="group/card flex flex-col gap-4"
    >
      <h3 className="heading5">{release.title}</h3>
      <p className="text-body">
        {truncateWords(release.excerpt, 40)}
      </p>
      <span className="inline-flex items-center w-fit overflow-hidden relative">
        <span className="absolute inset-y-0 left-0 bg-lava size-6 transition-all duration-300 ease-out group-hover/card:w-full" />
        <span className="relative z-10 flex shrink-0 items-center justify-center size-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/button-arrow-right.svg" alt="" className="size-3.5" />
        </span>
        <span className="relative z-10 pr-3 pl-2 text-sm font-bold text-lava transition-colors duration-300 group-hover/card:text-white">
          Read
        </span>
      </span>
    </Link>
  );
}

export async function RecentPressReleases() {
  const releases = await getRecentPressReleases(3);

  if (releases.length === 0) return null;

  return (
    <div className="flex flex-col gap-10">
      {/* Header row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <h2 className="heading1">Press Releases</h2>
        <div className="flex items-center gap-4">
          <Button href="/press-and-media" variant="primary" size="md">
            Press & Media Inquiries
          </Button>
          <Button href="/knowledge-hub/press-releases" variant="primary" size="md">
            View All
          </Button>
        </div>
      </div>
      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {releases.map((release: PressRelease) => (
          <PressReleaseCard key={release.id} release={release} />
        ))}
      </div>
    </div>
  );
}
