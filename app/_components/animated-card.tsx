import { cn } from "@/lib/utils";
import { ReactNode } from "react";

// TODO: use class-variance-authority for the classes/different type of states

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  disableScale?: boolean;
  disableTextColor?: boolean;
  inverseHover?: boolean;
  isActive?: boolean;
  isOnLight?: boolean;
}

export function AnimatedCard({ children, className = "", disableScale = false, disableTextColor = false, inverseHover = false, isActive = false, isOnLight = false }: AnimatedCardProps) {
  const cornerColor = isOnLight ? "bg-black" : "bg-white";

  return (
    <div
      className={cn(
        "relative md:p-8 md:px-12 p-4 px-6 border-2 transition-all duration-400 font-medium group/card",
        inverseHover
          ? "bg-background-secondary border-accent/25 hover:bg-transparent hover:border-white/50"
          : cn(
              isActive ? "bg-background-secondary border-accent/25" : "bg-transparent",
              !disableScale && "hover:scale-[1.00] hover:bg-background-secondary",
              !disableTextColor && "text-white/40 hover:text-white",
              !isActive && (isOnLight ? "border-black/25 text-black" : "border-white/25 text-white")
            ),
        className
      )}
    >
      {/* Top-left corner - vertical line crossing top border */}
      <span className={cn(
        "absolute -left-px top-0 w-[2px] h-3 transition-all duration-200",
        inverseHover
          ? "bg-accent group-hover/card:bg-white translate-y-[25%] translate-x-[200%] rounded-t-none rounded-b-full group-hover/card:-translate-y-full group-hover/card:-translate-x-1/2 group-hover/card:rounded-t-full group-hover/card:rounded-b-none"
          : cn(
              "rounded-t-full -translate-x-1/2 -translate-y-full group-hover/card:translate-y-[25%] group-hover/card:translate-x-[200%] group-hover/card:rounded-t-none group-hover/card:rounded-b-full",
              cornerColor,
              isActive && "bg-accent translate-y-[25%] translate-x-[200%] rounded-t-none rounded-b-full"
            )
      )} />
      {/* Top-left corner - horizontal line crossing left border */}
      <span className={cn(
        "absolute left-0 -top-px w-3 h-[2px] transition-all duration-200",
        inverseHover
          ? "bg-accent group-hover/card:bg-white translate-x-[25%] translate-y-[200%] rounded-l-none rounded-r-full group-hover/card:-translate-x-full group-hover/card:-translate-y-1/2 group-hover/card:rounded-l-full group-hover/card:rounded-r-none"
          : cn(
              "rounded-l-full -translate-x-full -translate-y-1/2 group-hover/card:translate-x-[25%] group-hover/card:translate-y-[200%] group-hover/card:rounded-l-none group-hover/card:rounded-r-full",
              cornerColor,
              isActive && "bg-accent translate-x-[25%] translate-y-[200%] rounded-l-none rounded-r-full"
            )
      )} />

      {/* Top-right corner - vertical line crossing top border */}
      <span className={cn(
        "absolute -right-px top-0 w-[2px] h-3 transition-all duration-200",
        inverseHover
          ? "bg-accent group-hover/card:bg-white translate-y-[25%] -translate-x-[200%] rounded-t-none rounded-b-full group-hover/card:-translate-y-full group-hover/card:translate-x-1/2 group-hover/card:rounded-t-full group-hover/card:rounded-b-none"
          : cn(
              "rounded-t-full translate-x-1/2 -translate-y-full group-hover/card:translate-y-[25%] group-hover/card:-translate-x-[200%] group-hover/card:rounded-t-none group-hover/card:rounded-b-full",
              cornerColor,
              isActive && "bg-accent translate-y-[25%] -translate-x-[200%] rounded-t-none rounded-b-full"
            )
      )} />
      {/* Top-right corner - horizontal line crossing right border */}
      <span className={cn(
        "absolute right-0 -top-px w-3 h-[2px] transition-all duration-200",
        inverseHover
          ? "bg-accent group-hover/card:bg-white -translate-x-[25%] translate-y-[200%] rounded-r-none rounded-l-full group-hover/card:translate-x-full group-hover/card:-translate-y-1/2 group-hover/card:rounded-r-full group-hover/card:rounded-l-none"
          : cn(
              "rounded-r-full translate-x-full -translate-y-1/2 group-hover/card:-translate-x-[25%] group-hover/card:translate-y-[200%] group-hover/card:rounded-r-none group-hover/card:rounded-l-full",
              cornerColor,
              isActive && "bg-accent -translate-x-[25%] translate-y-[200%] rounded-r-none rounded-l-full"
            )
      )} />

      {/* Bottom-left corner - vertical line crossing bottom border */}
      <span className={cn(
        "absolute -left-px bottom-0 w-[2px] h-3 transition-all duration-200",
        inverseHover
          ? "bg-accent group-hover/card:bg-white -translate-y-[25%] translate-x-[200%] rounded-b-none rounded-t-full group-hover/card:translate-y-full group-hover/card:-translate-x-1/2 group-hover/card:rounded-b-full group-hover/card:rounded-t-none"
          : cn(
              "rounded-b-full -translate-x-1/2 translate-y-full group-hover/card:-translate-y-[25%] group-hover/card:translate-x-[200%] group-hover/card:rounded-b-none group-hover/card:rounded-t-full",
              cornerColor,
              isActive && "bg-accent -translate-y-[25%] translate-x-[200%] rounded-b-none rounded-t-full"
            )
      )} />
      {/* Bottom-left corner - horizontal line crossing left border */}
      <span className={cn(
        "absolute left-0 -bottom-px w-3 h-[2px] transition-all duration-200",
        inverseHover
          ? "bg-accent group-hover/card:bg-white translate-x-[25%] -translate-y-[200%] rounded-l-none rounded-r-full group-hover/card:-translate-x-full group-hover/card:translate-y-1/2 group-hover/card:rounded-l-full group-hover/card:rounded-r-none"
          : cn(
              "rounded-l-full -translate-x-full translate-y-1/2 group-hover/card:translate-x-[25%] group-hover/card:-translate-y-[200%] group-hover/card:rounded-l-none group-hover/card:rounded-r-full",
              cornerColor,
              isActive && "bg-accent translate-x-[25%] -translate-y-[200%] rounded-l-none rounded-r-full"
            )
      )} />

      {/* Bottom-right corner - vertical line crossing bottom border */}
      <span className={cn(
        "absolute -right-px bottom-0 w-[2px] h-3 transition-all duration-200",
        inverseHover
          ? "bg-accent group-hover/card:bg-white -translate-y-[25%] -translate-x-[200%] rounded-b-none rounded-t-full group-hover/card:translate-y-full group-hover/card:translate-x-1/2 group-hover/card:rounded-b-full group-hover/card:rounded-t-none"
          : cn(
              "rounded-b-full translate-x-1/2 translate-y-full group-hover/card:-translate-y-[25%] group-hover/card:-translate-x-[200%] group-hover/card:rounded-b-none group-hover/card:rounded-t-full",
              cornerColor,
              isActive && "bg-accent -translate-y-[25%] -translate-x-[200%] rounded-b-none rounded-t-full"
            )
      )} />
      {/* Bottom-right corner - horizontal line crossing right border */}
      <span className={cn(
        "absolute right-0 -bottom-px w-3 h-[2px] transition-all duration-200",
        inverseHover
          ? "bg-accent group-hover/card:bg-white -translate-x-[25%] -translate-y-[200%] rounded-r-none rounded-l-full group-hover/card:translate-x-full group-hover/card:translate-y-1/2 group-hover/card:rounded-r-full group-hover/card:rounded-l-none"
          : cn(
              "rounded-r-full translate-x-full translate-y-1/2 group-hover/card:-translate-x-[25%] group-hover/card:-translate-y-[200%] group-hover/card:rounded-r-none group-hover/card:rounded-l-full",
              cornerColor,
              isActive && "bg-accent -translate-x-[25%] -translate-y-[200%] rounded-r-none rounded-l-full"
            )
      )} />

      {children}
    </div>
  );
}
