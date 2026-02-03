"use client";

import { cn } from "@/lib/utils";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
}: BlogPaginationProps) {
  return (
    <div className="flex items-center gap-4">
      {/* Previous Arrow */}
      <button
        onClick={() => onPageChange(Math.max(0, currentPage - 1))}
        disabled={currentPage === 0}
        className="size-10 relative flex items-center justify-center hover:bg-white/5 rounded-lg transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {/* Corner accents */}
        <span className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/30 group-hover:border-accent transition-colors" />
        <span className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/30 group-hover:border-accent transition-colors" />
        <span className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/30 group-hover:border-accent transition-colors" />
        <span className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/30 group-hover:border-accent transition-colors" />
        <svg
          className="size-4"
          viewBox="0 0 16 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.2927 7.36992C15.2927 6.87117 14.8881 6.46651 14.3889 6.46612L4.94015 6.46613C4.18743 6.46613 3.81031 5.55582 4.34272 5.02341L7.81181 1.55432C8.16484 1.20129 8.16484 0.6291 7.81181 0.276071L7.79881 0.263067C7.44616 -0.0888145 6.87435 -0.0891969 6.52132 0.263832L0.415415 6.36974C-0.137269 6.92243 -0.137269 7.81819 0.415414 8.37088L6.52132 14.4768C6.87435 14.8298 7.44654 14.8298 7.79957 14.4768L7.81257 14.4638C8.1656 14.1107 8.1656 13.5386 7.81257 13.1855L4.3431 9.71606C3.81069 9.18364 4.18781 8.27334 4.94053 8.27334L14.3889 8.27372C14.8877 8.27372 15.2924 7.86906 15.2924 7.37031L15.2927 7.36992Z"
            fill="white"
          />
        </svg>
      </button>

      {/* Page Dots */}
      <div className="flex items-center gap-1.5 px-3">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-400",
              index === currentPage
                ? "bg-accent w-4"
                : "bg-white/50 w-1.5 hover:bg-white/70"
            )}
          />
        ))}
      </div>

      {/* Next Arrow */}
      <button
        onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
        disabled={currentPage === totalPages - 1}
        className="size-10 relative flex items-center justify-center hover:bg-white/5 rounded-lg transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {/* Corner accents */}
        <span className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/30 group-hover:border-accent transition-colors" />
        <span className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/30 group-hover:border-accent transition-colors" />
        <span className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/30 group-hover:border-accent transition-colors" />
        <span className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/30 group-hover:border-accent transition-colors" />
        <svg
          className="size-4"
          viewBox="0 0 16 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.000235885 7.36992C0.000235485 6.87117 0.404899 6.46651 0.904036 6.46612L10.3528 6.46613C11.1055 6.46613 11.4827 5.55582 10.9503 5.02341L7.48116 1.55432C7.12813 1.20129 7.12813 0.6291 7.48116 0.276071L7.49416 0.263067C7.84681 -0.0888145 8.41862 -0.0891969 8.77164 0.263832L14.8776 6.36974C15.4302 6.92243 15.4302 7.81819 14.8776 8.37088L8.77165 14.4768C8.41862 14.8298 7.84643 14.8298 7.4934 14.4768L7.4804 14.4638C7.12737 14.1107 7.12737 13.5386 7.48039 13.1855L10.9499 9.71606C11.4823 9.18364 11.1052 8.27334 10.3524 8.27334L0.904036 8.27372C0.405282 8.27372 0.000618115 7.86906 0.000618368 7.37031L0.000235885 7.36992Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
}
