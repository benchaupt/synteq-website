"use client";

import { cn } from "@/lib/utils";

interface ShareArticleProps {
  className?: string;
}

export function ShareArticle({ className }: ShareArticleProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="font-mono text-xs tracking-tight text-dark-foreground uppercase">
        Share this article
      </span>
      <div className="flex items-center gap-3">
        {/* LinkedIn */}
        <a
          href="#"
          className="size-4 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
          aria-label="Share on LinkedIn"
        >
          <svg className="size-full" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.83398 16.458H0.291992V5.75H3.83398V16.458Z" fill="currentColor"/>
            <path d="M11.7715 5.47852C15.3544 5.47864 16.0839 7.84334 16.084 10.916V16.458H12.542V11.25C12.542 9.91667 12.5212 8.2287 10.709 8.22852C8.87558 8.22852 8.58398 9.65591 8.58398 11.1455V16.458H5.04199V5.75H8.4375V7.29102H8.47949C8.94827 6.41608 10.0841 5.47852 11.7715 5.47852Z" fill="currentColor"/>
            <path d="M2.0625 0C3.20317 0 4.125 0.92187 4.125 2.0625C4.12483 3.20297 3.20306 4.125 2.0625 4.125C0.922136 4.12483 0.000173621 3.20286 0 2.0625C0 0.921977 0.922029 0.000173689 2.0625 0Z" fill="currentColor"/>
          </svg>
        </a>
        {/* X (Twitter) */}
        <a
          href="#"
          className="size-[1.125rem] flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
          aria-label="Share on X"
        >
          <svg className="size-full" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.9014 14.3251L28.3464 3.875H26.0914L17.9264 12.9501L11.4264 3.875H3.875L13.7964 17.5551L3.875 28.5625H6.13L14.7714 18.9301L21.6364 28.5625H29.1875L18.9014 14.3251ZM15.8764 17.6801L14.8914 16.3151L6.91641 5.46H10.3714L16.7514 14.2501L17.7364 15.6151L26.0914 27.0375H22.6364L15.8764 17.6801Z" fill="currentColor" />
          </svg>
        </a>
        {/* Copy Link */}
        <button
          onClick={() => navigator.clipboard.writeText(window.location.href)}
          className="size-4 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
          aria-label="Copy link"
        >
          <svg className="size-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </button>
      </div>
    </div>
  );
}
