import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CornerCardProps {
  children: ReactNode;
  className?: string;
  cornerColor?: "white" | "accent";
  borderColor?: "white" | "transparent";
}

export function CornerCard({
  children,
  className = "",
  cornerColor = "white",
  borderColor = "white",
}: CornerCardProps) {
  const cornerColorClass = cornerColor === "accent" ? "bg-accent" : "bg-white";
  const borderColorClass =
    borderColor === "transparent" ? "border-transparent" : "border-white/25";

  return (
    <div
      className={cn(
        "relative p-6 md:p-8 border-2 font-medium",
        borderColorClass,
        className
      )}
    >
      {/* Top-left corner */}
      <span
        className={cn(
          "absolute -left-[2px] -top-[2px] w-[2px] h-3",
          cornerColorClass
        )}
      />
      <span
        className={cn(
          "absolute -left-[2px] -top-[2px] w-3 h-[2px]",
          cornerColorClass
        )}
      />

      {/* Top-right corner */}
      <span
        className={cn(
          "absolute -right-[2px] -top-[2px] w-[2px] h-3",
          cornerColorClass
        )}
      />
      <span
        className={cn(
          "absolute -right-[2px] -top-[2px] w-3 h-[2px]",
          cornerColorClass
        )}
      />

      {/* Bottom-left corner */}
      <span
        className={cn(
          "absolute -left-[2px] -bottom-[2px] w-[2px] h-3",
          cornerColorClass
        )}
      />
      <span
        className={cn(
          "absolute -left-[2px] -bottom-[2px] w-3 h-[2px]",
          cornerColorClass
        )}
      />

      {/* Bottom-right corner */}
      <span
        className={cn(
          "absolute -right-[2px] -bottom-[2px] w-[2px] h-3",
          cornerColorClass
        )}
      />
      <span
        className={cn(
          "absolute -right-[2px] -bottom-[2px] w-3 h-[2px]",
          cornerColorClass
        )}
      />

      {children}
    </div>
  );
}
