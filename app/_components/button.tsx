"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { forwardRef } from "react";

const baseStyles =
  "inline-flex items-center font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const standardVariants = cva(baseStyles, {
  variants: {
    variant: {
      secondary:
        "justify-center bg-slate text-white hover:bg-slate-90 rounded-md transition-colors",
      ghost:
        "justify-center bg-transparent text-lava hover:bg-offwhite rounded-md transition-colors",
      outline:
        "justify-center border border-lava text-lava hover:bg-lava hover:text-white rounded-md transition-colors",
    },
    size: {
      sm: "h-10 px-5 text-sm",
      md: "h-11 px-6 text-sm",
      lg: "h-13 px-8 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const arrowSizes = {
  sm: "size-5",
  md: "size-6",
  lg: "size-7",
} as const;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  Omit<VariantProps<typeof standardVariants>, "variant"> & {
    variant?: "primary" | "secondary" | "ghost" | "outline";
    href?: string;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, children, ...props }, ref) => {
    const isPrimary = variant === "primary";

    const content = isPrimary ? (
      <>
        {/* Expanding background — starts at arrow square width, grows to full */}
        <span
          className={cn(
            "absolute inset-y-0 left-0 bg-lava transition-all duration-300 ease-out group-hover:w-full",
            arrowSizes[size ?? "md"],
          )}
        />
        {/* Arrow icon */}
        <span
          className={cn(
            "relative z-10 flex shrink-0 items-center justify-center",
            arrowSizes[size ?? "md"],
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/button-arrow-right.svg"
            alt=""
            className="size-3.5"
          />
        </span>
        {/* Label */}
        <span className="relative z-10 pr-3 pl-2 text-sm font-bold text-lava transition-colors duration-300 group-hover:text-white">
          {children}
        </span>
      </>
    ) : (
      children
    );

    const classes = isPrimary
      ? cn(baseStyles, "group relative w-fit overflow-hidden", className)
      : cn(
          standardVariants({
            variant: variant as "secondary" | "ghost" | "outline",
            size,
          }),
          className,
        );

    if (href) {
      return (
        <Link href={href} className={classes}>
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";
