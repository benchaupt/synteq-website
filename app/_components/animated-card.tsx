import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  disableScale?: boolean;
  disableTextColor?: boolean;
  isActive?: boolean;
}

export function AnimatedCard({ children, className = "", disableScale = false, disableTextColor = false, isActive = false }: AnimatedCardProps) {
  return (
    <div
      className={cn("relative p-8 px-12 border-2 border-white/25 bg-transparent transition-all duration-400 font-medium group", !disableScale && "hover:scale-[1.01]", !disableTextColor && "text-white/40 hover:text-white", isActive && "border-accent/25", className)}
    >
      {/* Top-left corner - vertical line crossing top border */}
      <span className={cn("absolute -left-px top-0 w-[2px] h-3 bg-white rounded-t-full -translate-x-1/2 -translate-y-full group-hover:translate-y-[25%] group-hover:translate-x-[200%] group-hover:rounded-t-none group-hover:rounded-b-full transition-transform duration-200", isActive && "bg-accent translate-y-[25%] translate-x-[200%] rounded-t-none rounded-b-full")} />
      {/* Top-left corner - horizontal line crossing left border */}
      <span className={cn("absolute left-0 -top-px w-3 h-[2px] bg-white rounded-l-full -translate-x-full -translate-y-1/2 group-hover:translate-x-[25%] group-hover:translate-y-[200%] group-hover:rounded-l-none group-hover:rounded-r-full transition-transform duration-200", isActive && "bg-accent translate-x-[25%] translate-y-[200%] rounded-l-none rounded-r-full")} />

      {/* Top-right corner - vertical line crossing top border */}
      <span className={cn("absolute -right-px top-0 w-[2px] h-3 bg-white rounded-t-full translate-x-1/2 -translate-y-full group-hover:translate-y-[25%] group-hover:-translate-x-[200%] group-hover:rounded-t-none group-hover:rounded-b-full transition-transform duration-200", isActive && "bg-accent translate-y-[25%] -translate-x-[200%] rounded-t-none rounded-b-full")} />
      {/* Top-right corner - horizontal line crossing right border */}
      <span className={cn("absolute right-0 -top-px w-3 h-[2px] bg-white rounded-r-full translate-x-full -translate-y-1/2 group-hover:-translate-x-[25%] group-hover:translate-y-[200%] group-hover:rounded-r-none group-hover:rounded-l-full transition-transform duration-200", isActive && "bg-accent -translate-x-[25%] translate-y-[200%] rounded-r-none rounded-l-full")} />

      {/* Bottom-left corner - vertical line crossing bottom border */}
      <span className={cn("absolute -left-px bottom-0 w-[2px] h-3 bg-white rounded-b-full -translate-x-1/2 translate-y-full group-hover:-translate-y-[25%] group-hover:translate-x-[200%] group-hover:rounded-b-none group-hover:rounded-t-full transition-transform duration-200", isActive && "bg-accent -translate-y-[25%] translate-x-[200%] rounded-b-none rounded-t-full")} />
      {/* Bottom-left corner - horizontal line crossing left border */}
      <span className={cn("absolute left-0 -bottom-px w-3 h-[2px] bg-white rounded-l-full -translate-x-full translate-y-1/2 group-hover:translate-x-[25%] group-hover:-translate-y-[200%] group-hover:rounded-l-none group-hover:rounded-r-full transition-transform duration-200", isActive && "bg-accent translate-x-[25%] -translate-y-[200%] rounded-l-none rounded-r-full")} />

      {/* Bottom-right corner - vertical line crossing bottom border */}
      <span className={cn("absolute -right-px bottom-0 w-[2px] h-3 bg-white rounded-b-full translate-x-1/2 translate-y-full group-hover:-translate-y-[25%] group-hover:-translate-x-[200%] group-hover:rounded-b-none group-hover:rounded-t-full transition-transform duration-200", isActive && "bg-accent -translate-y-[25%] -translate-x-[200%] rounded-b-none rounded-t-full")} />
      {/* Bottom-right corner - horizontal line crossing right border */}
      <span className={cn("absolute right-0 -bottom-px w-3 h-[2px] bg-white rounded-r-full translate-x-full translate-y-1/2 group-hover:-translate-x-[25%] group-hover:-translate-y-[200%] group-hover:rounded-r-none group-hover:rounded-l-full transition-transform duration-200", isActive && "bg-accent -translate-x-[25%] -translate-y-[200%] rounded-r-none rounded-l-full")} />

      {children}
    </div>
  );
}
