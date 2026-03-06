"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { CSSIcon } from "@/app/_components/icon";

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  /** Control image crop position — e.g. "object-top", "object-bottom". Default: "object-center" */
  imageClassName?: string;
  linkedIn?: string;
  bio?: string;
}

export function TeamCard({
  name,
  role,
  image,
  imageClassName,
  linkedIn,
  bio,
}: TeamCardProps) {
  const hasBack = !!bio;

  return (
    <div className="flex flex-col gap-3">
      <div
        className={cn(
          "relative aspect-[5/6]",
          hasBack && "perspective-[1000px] group/card cursor-pointer",
        )}
      >
        <div
          className={cn(
            "relative size-full",
            hasBack &&
              "transform-3d transition-transform duration-700 ease-in-out group-hover/card:transform-[rotateY(180deg)]",
          )}
        >
          {/* Front */}
          <div className="absolute inset-0 overflow-hidden bg-offwhite backface-hidden">
            <Image
              src={image}
              alt={name}
              fill
              className={cn(
                "object-cover grayscale",
                imageClassName ?? "object-center",
              )}
            />
          </div>

          {/* Back */}
          {hasBack && (
            <div className="absolute inset-0 overflow-hidden bg-white p-6 flex items-start backface-hidden transform-[rotateY(180deg)]">
              <p className="text-lava text-body">{bio}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        <div className="flex items-center justify-between">
          <span className="text-xl font-medium text-lava">{name}</span>
          {linkedIn && (
            <a
              href={linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-lava transition-transform duration-200 hover:scale-[0.85]"
            >
              <CSSIcon name="socials/linkedin-logo" size="sm" />
            </a>
          )}
        </div>
        <p className="text-body">{role}</p>
      </div>
    </div>
  );
}
