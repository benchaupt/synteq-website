import Link from "next/link";
import { StyledHeading } from "@/app/_components/styled-heading";
import { Button } from "@/app/_components/button";
import { getRecentPressReleases } from "@/lib/payload/press-releases";
import type { PressRelease } from "@/payload-types";

function truncateWords(text: string, maxWords: number): string {
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
}

export async function PressReleasesPreview() {
  const releases = await getRecentPressReleases(3);

  if (releases.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 md:gap-10">
      <div className="flex items-end justify-between gap-4">
        <StyledHeading as="h2" className="heading">
          {"Press Releases."}
        </StyledHeading>
        <Button variant="primary" size="md" href="/knowledge-hub/press-releases">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {releases.map((pr: PressRelease) => (
          <Link
            key={pr.id}
            href={`/knowledge-hub/press-releases/${pr.slug}`}
            className="group/card flex flex-col gap-4"
          >
            <h3 className="heading5">{pr.title}</h3>
            <p className="text-body leading-5">
              {truncateWords(pr.excerpt, 40)}
            </p>
            <span className="inline-flex items-center w-fit overflow-hidden relative">
              <span className="absolute inset-y-0 left-0 bg-lava size-6 transition-all duration-300 ease-out group-hover/card:w-full" />
              <span className="relative z-10 flex shrink-0 items-center justify-center size-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/button-arrow-right.svg" alt="" className="size-3.5" />
              </span>
              <span className="relative z-10 pr-3 pl-2 text-sm font-bold text-lava transition-colors duration-300 group-hover/card:text-white">
                Read More
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
