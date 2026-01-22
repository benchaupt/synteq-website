"use client";

import { cn } from "@/lib/utils";

interface EmailCaptureProps {
  title?: string;
  description?: string;
  buttonText?: string;
  placeholder?: string;
  className?: string;
  layout?: "vertical" | "horizontal";
}

export function EmailCapture({
  title,
  description,
  buttonText = "Subscribe",
  placeholder = "your@email.com",
  className,
  layout = "vertical",
}: EmailCaptureProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {title && <h3 className="text-xl font-medium">{title}</h3>}
      {description && (
        <p className="text-white/60 text-sm">{description}</p>
      )}
      <div
        className={cn(
          "flex gap-3",
          layout === "vertical"
            ? "flex-col sm:flex-row"
            : "flex-row"
        )}
      >
        <input
          type="email"
          placeholder={placeholder}
          className="flex-1 bg-background-secondary border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-accent/50 transition-colors placeholder:text-white/30"
        />
        <button className="bg-accent hover:bg-darker-accent text-background font-medium px-6 py-3 rounded transition-colors duration-200 text-sm whitespace-nowrap">
          {buttonText}
        </button>
      </div>
    </div>
  );
}
