"use client";

import { useRef, useState, useLayoutEffect } from "react";
import Link from "next/link";
import type { Post, Media } from "@/payload-types";

function truncateWords(text: string, maxWords: number): string {
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
}

function getImageUrl(post: Post): string | null {
  if (post.heroImage && typeof post.heroImage === "object") {
    return (post.heroImage as Media).url ?? null;
  }
  return null;
}

function formatMonth(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });
}

export function BlogInfoCard({ post }: { post: Post }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [lineMetrics, setLineMetrics] = useState<
    { bottom: number; width: number }[]
  >([]);

  useLayoutEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const text = el.firstChild;
    if (!text || text.nodeType !== Node.TEXT_NODE) return;

    const range = document.createRange();
    const content = text.textContent ?? "";
    const containerRect = el.getBoundingClientRect();

    const measured: { top: number; bottom: number; width: number }[] = [];
    let currentTop = -1;

    for (let i = 0; i < content.length; i++) {
      range.setStart(text, i);
      range.setEnd(text, i + 1);
      const rect = range.getBoundingClientRect();

      if (rect.top !== currentTop) {
        currentTop = rect.top;
        measured.push({
          top: rect.top,
          bottom: rect.bottom - containerRect.top,
          width: rect.right - containerRect.left,
        });
      } else {
        const line = measured[measured.length - 1];
        line.width = Math.max(line.width, rect.right - containerRect.left);
        line.bottom = Math.max(line.bottom, rect.bottom - containerRect.top);
      }
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLineMetrics(measured.map((l) => ({ bottom: l.bottom, width: l.width })));
  }, [post.title]);

  const image = getImageUrl(post);

  return (
    <Link
      href={`/knowledge-hub/blogs/${post.slug}`}
      className="group flex flex-col gap-2"
    >
      {image && (
        <div className="relative aspect-[5/3] w-full overflow-hidden bg-offwhite">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={post.title}
            className="size-full object-cover grayscale transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      )}

      <div className="relative pt-2">
        <h3 ref={titleRef} className="heading5 leading-tight">
          {post.title}
        </h3>
        {lineMetrics.map((line, i) => (
          <span
            key={i}
            className="absolute left-0 h-[2px] bg-lava origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
            style={{
              top: `${line.bottom + 6}px`,
              width: `${line.width}px`,
              transitionDelay: `${i * 150}ms`,
            }}
          />
        ))}
      </div>

      <p className="text-body leading-relaxed">
        {truncateWords(post.excerpt ?? "", 25)}
      </p>

      {post.publishedAt && (
        <span className="text-body-sm font-semibold text-lava">
          {formatMonth(post.publishedAt)}
        </span>
      )}
    </Link>
  );
}
