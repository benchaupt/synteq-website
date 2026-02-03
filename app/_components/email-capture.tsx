"use client";

import { cn } from "@/lib/utils";

interface EmailCaptureProps {
  title?: string;
  description?: string;
  buttonText?: string;
  placeholder?: string;
  className?: string;
  layout?: "vertical" | "horizontal";
  icon?: string;
}

export function EmailCapture({
  title,
  description,
  buttonText = "Subscribe",
  placeholder = "your@email.com",
  className,
  layout: _layout = "vertical",
  icon,
}: EmailCaptureProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {title && <h3 className="text-xl font-medium">{title}</h3>}
      {description && (
        <p className="text-white/60 text-sm">{description}</p>
      )}
      <div
        className={cn(
          "flex gap-3 flex-col sm:flex-row"
        )}
      >
        <div className="flex-1 flex items-center gap-3 bg-background-secondary border border-white/10 rounded px-4 py-3 min-w-0">
          {icon && (
            <img src={icon} alt="" className="h-3.5 w-auto brightness-0 invert shrink-0" />
          )}
          <input
            type="email"
            placeholder={placeholder}
            className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-white/30 min-w-0"
          />
        </div>
        <button className="bg-accent hover:bg-darker-accent text-background font-medium px-6 py-3 rounded transition-colors duration-200 text-sm whitespace-nowrap">
          {buttonText}
        </button>
      </div>
    </div>
  );
}
