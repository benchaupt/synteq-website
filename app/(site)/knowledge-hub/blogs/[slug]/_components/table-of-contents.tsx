"use client";

import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  text: string;
}

function getHeadings(): Heading[] {
  const content = document.querySelector("[data-article-content]");
  if (!content) return [];

  const elements = content.querySelectorAll("h2, h3");
  const items: Heading[] = [];

  elements.forEach((el) => {
    const text = el.textContent?.trim() ?? "";
    if (!text) return;
    const id =
      el.id ||
      text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    el.id = id;
    items.push({ id, text });
  });

  return items;
}

const emptyHeadings: Heading[] = [];

interface IndicatorPos {
  top: number;
  height: number;
}

export function TableOfContents() {
  const headingsRef = useRef<Heading[]>(emptyHeadings);
  const [activeId, setActiveId] = useState<string>("");
  const [indicator, setIndicator] = useState<IndicatorPos>({ top: 0, height: 0 });
  const isClickingRef = useRef(false);
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  const headings = useSyncExternalStore(
    () => () => {},
    () => {
      if (headingsRef.current === emptyHeadings) {
        headingsRef.current = getHeadings();
      }
      return headingsRef.current;
    },
    () => emptyHeadings
  );

  useEffect(() => {
    if (headings.length === 0) return;

    const onScroll = () => {
      if (isClickingRef.current) return;
      const mid = window.innerHeight / 3;
      let current = headings[0]?.id ?? "";

      for (const { id } of headings) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= mid) {
          current = id;
        }
      }

      setActiveId(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  // Update indicator position when activeId changes
  useEffect(() => {
    const nav = navRef.current;
    const activeEl = activeId ? itemRefs.current.get(activeId) : null;
    if (!nav || !activeEl) return;

    const navRect = nav.getBoundingClientRect();
    const itemRect = activeEl.getBoundingClientRect();
    setIndicator({
      top: itemRect.top - navRect.top,
      height: itemRect.height,
    });
  }, [activeId]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (!el) return;

      isClickingRef.current = true;
      setActiveId(id);

      const navHeight = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: "smooth" });

      setTimeout(() => {
        isClickingRef.current = false;
      }, 800);
    },
    []
  );

  if (headings.length === 0) return null;

  return (
    <nav ref={navRef} className="relative flex flex-col">
      <motion.div
        className="absolute left-0 w-0.5 bg-lava"
        animate={{ top: indicator.top, height: indicator.height }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      {headings.map(({ id, text }) => (
        <a
          key={id}
          ref={(el) => {
            if (el) itemRefs.current.set(id, el);
            else itemRefs.current.delete(id);
          }}
          href={`#${id}`}
          onClick={(e) => handleClick(e, id)}
          className={cn(
            "block py-1.5 pl-4 text-sm transition-colors duration-200",
            activeId === id
              ? "text-lava"
              : "text-slate hover:text-lava"
          )}
        >
          {text}
        </a>
      ))}
    </nav>
  );
}
