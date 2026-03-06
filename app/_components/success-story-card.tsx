/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { SuccessStory, Media } from "@/payload-types";

interface SuccessStoryCardProps {
  story: SuccessStory;
  className?: string;
}

/** Parse **bold** markers in plain text into React nodes */
function parseBold(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export function SuccessStoryCard({ story, className }: SuccessStoryCardProps) {
  const coverImage =
    story.coverImage && typeof story.coverImage === "object"
      ? (story.coverImage as Media)
      : null;

  const clientLogo =
    story.clientLogo && typeof story.clientLogo === "object"
      ? (story.clientLogo as Media)
      : null;

  const href = `/knowledge-hub/success-stories/${story.slug}`;

  return (
    <Link
      href={href}
      className={cn(
        "group/card grid grid-cols-1 md:grid-cols-[380px_1fr] gap-4 md:gap-12",
        className,
      )}
    >
      {/* Left: Cover image */}
      {coverImage?.url && (
        <div className="aspect-[5/3] overflow-hidden bg-lava/25">
          <img
            src={coverImage.url}
            alt={coverImage.alt ?? story.title}
            className="size-full object-cover transition-transform duration-500 group-hover/card:scale-110"
          />
        </div>
      )}

      {/* Right: Content */}
      <div className="flex flex-col justify-between gap-4 md:gap-6 py-2">
        {/* Logo */}
        <div className="h-8 flex items-center">
          {clientLogo?.url && (
            <img
              src={clientLogo.url}
              alt={story.client}
              className="h-full w-auto object-contain"
            />
          )}
        </div>

        {/* Title + Body */}
        <div className="flex flex-col gap-3">
          <h3 className="heading5">{story.title}</h3>
          <p className="text-body text-lava">{parseBold(story.excerpt)}</p>
        </div>

        {/* Sliding button */}
        <span className="inline-flex items-center w-fit overflow-hidden relative">
          <span className="absolute inset-y-0 left-0 bg-lava size-6 transition-all duration-300 ease-out group-hover/card:w-full" />
          <span className="relative z-10 flex shrink-0 items-center justify-center size-6">
            <img src="/icons/button-arrow-right.svg" alt="" className="size-3.5" />
          </span>
          <span className="relative z-10 pr-3 pl-2 text-sm font-bold text-lava transition-colors duration-300 group-hover/card:text-white">
            Read case study
          </span>
        </span>
      </div>
    </Link>
  );
}
