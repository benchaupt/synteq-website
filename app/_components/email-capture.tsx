"use client";

import { cn } from "@/lib/utils";
import { useState, useCallback } from "react";

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
  icon,
}: EmailCaptureProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const clearSuccess = useCallback(() => {
    setIsSuccess(false);
  }, []);

  const handleSubmit = () => {
    if (isLoading) return;
    setIsLoading(true);
    setIsSuccess(false);
    // Simulate loading — replace with real submit logic
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setEmail("");
    }, 2000);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {title && <h3 className="text-xl font-medium">{title}</h3>}
      {description && (
        <p className="text-white/60 text-sm">{description}</p>
      )}
      <div className="flex gap-4 flex-col sm:flex-row sm:items-end">
        <div className="group/field relative flex-1 min-w-0">
          <div className="flex items-center gap-3 px-2 py-3">
            {icon && (
              <span
                className={cn(
                  "h-3.5 aspect-square shrink-0 transition-colors duration-300",
                  isLoading ? "shimmer-accent" : "bg-white/50 group-focus-within/field:bg-accent"
                )}
                style={{
                  maskImage: `url(${icon})`,
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskImage: `url(${icon})`,
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                }}
              />
            )}
            <div className="relative flex-1 min-w-0">
              <input
                type="email"
                placeholder={placeholder}
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearSuccess(); }}
                disabled={isLoading}
                className={cn(
                  "w-full bg-transparent text-sm focus:outline-none min-w-0 transition-colors duration-300",
                  isLoading ? "text-transparent placeholder:text-transparent" : "placeholder:text-white/30"
                )}
              />
              {/* Shimmer text overlay — mirrors input value since background-clip:text doesn't work on inputs */}
              {isLoading && (
                <span
                  className="absolute inset-0 flex items-center text-sm pointer-events-none shimmer-accent truncate"
                  style={{
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  aria-hidden="true"
                >
                  {email || placeholder}
                </span>
              )}
            </div>
          </div>
          {/* Underline */}
          <span className={cn(
            "absolute bottom-0 left-0 w-full h-px transition-all duration-300",
            isLoading ? "shimmer-accent" : "bg-white/25"
          )} />
          <span className={cn(
            "absolute bottom-0 left-0 w-full h-px bg-accent origin-left transition-transform duration-300",
            isLoading ? "scale-x-0" : "scale-x-0 group-focus-within/field:scale-x-100"
          )} />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isLoading || isSuccess}
          className={cn(
            "size-10 relative flex items-center justify-center shrink-0 transition-colors group/btn mb-0.5 overflow-hidden",
            !isLoading && !isSuccess && "hover:bg-white/5"
          )}
        >
          {/* Corner accents */}
          <span className={cn(
            "absolute top-0 left-0 w-2 h-2 border-l border-t transition-colors",
            isLoading || isSuccess ? "border-accent" : "border-white/30 group-hover/btn:border-accent"
          )} />
          <span className={cn(
            "absolute top-0 right-0 w-2 h-2 border-r border-t transition-colors",
            isLoading || isSuccess ? "border-accent" : "border-white/30 group-hover/btn:border-accent"
          )} />
          <span className={cn(
            "absolute bottom-0 left-0 w-2 h-2 border-l border-b transition-colors",
            isLoading || isSuccess ? "border-accent" : "border-white/30 group-hover/btn:border-accent"
          )} />
          <span className={cn(
            "absolute bottom-0 right-0 w-2 h-2 border-r border-b transition-colors",
            isLoading || isSuccess ? "border-accent" : "border-white/30 group-hover/btn:border-accent"
          )} />

          {/* Arrow / Spinner / Checkmark */}
          {isLoading ? (
            <svg className="size-4 animate-spin text-accent" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" />
            </svg>
          ) : isSuccess ? (
            <svg className="size-4 text-accent" viewBox="0 0 16 16" fill="none">
              <path d="M2 8L6 12L14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
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
          )}
        </button>
      </div>
    </div>
  );
}
