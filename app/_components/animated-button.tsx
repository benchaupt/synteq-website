import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React, { type ReactNode } from 'react';

const buttonVariants = cva(
    "relative px-6 py-2 border-2 bg-transparent text-black font-medium group",
    {
        variants: {
            size: {
                default: "px-6 py-2",
                wide: "px-8 py-2.5",
                // small: "text-sm",
                // medium: "text-base",
                // large: "text-lg",
            },
            background: {
                light: "border-black/25 text-black",
                dark: "border-white/25 text-white",
                primary: "border-accent/25 text-white",
            }
        },
        defaultVariants: {
            size: "default",
            background: "dark",
        },
    }
)
const getBorderColor = (background: "light" | "dark" | "primary" | null | undefined) => {
    switch (background) {
        case "light":
            return "bg-black";
        case "dark":
            return "bg-white";
        case "primary":
            return "bg-accent";
        default:
            return "bg-white";
    }
}
type AnimatedButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & {
    children: ReactNode;
}
export const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
    children, 
    onClick, 
    className = '', 
    size,
    background,
    ...props 
}) => {
    return (
        <button 
            onClick={onClick} 
            className={cn(buttonVariants({ size, background, className }))}
            {...props}
        >
            {/* Top-left corner - vertical line crossing top border */}
            <span className={cn("absolute -left-px top-0 w-[2px] h-2 bg-black rounded-t-full -translate-x-1/2 -translate-y-full group-hover:translate-y-[10%] group-hover:translate-x-[80%] group-hover:rounded-t-none group-hover:rounded-b-full transition-transform duration-200", getBorderColor(background))} />
            {/* Top-left corner - horizontal line crossing left border */}
            <span className={cn("absolute left-0 -top-px w-2 h-[2px] bg-black rounded-l-full -translate-x-full -translate-y-1/2 group-hover:translate-x-[10%] group-hover:translate-y-[80%] group-hover:rounded-l-none group-hover:rounded-r-full transition-transform duration-200", getBorderColor(background))} />

            {/* Top-right corner - vertical line crossing top border */}
            <span className={cn("absolute -right-px top-0 w-[2px] h-2 bg-black rounded-t-full translate-x-1/2 -translate-y-full group-hover:translate-y-[10%] group-hover:-translate-x-[80%] group-hover:rounded-t-none group-hover:rounded-b-full transition-transform duration-200", getBorderColor(background))} />
            {/* Top-right corner - horizontal line crossing right border */}
            <span className={cn("absolute right-0 -top-px w-2 h-[2px] bg-black rounded-r-full translate-x-full -translate-y-1/2 group-hover:-translate-x-[10%] group-hover:translate-y-[80%] group-hover:rounded-r-none group-hover:rounded-l-full transition-transform duration-200", getBorderColor(background))} />

            {/* Bottom-left corner - vertical line crossing bottom border */}
            <span className={cn("absolute -left-px bottom-0 w-[2px] h-2 bg-black rounded-b-full -translate-x-1/2 translate-y-full group-hover:-translate-y-[10%] group-hover:translate-x-[80%] group-hover:rounded-b-none group-hover:rounded-t-full transition-transform duration-200", getBorderColor(background))} />
            {/* Bottom-left corner - horizontal line crossing left border */}
            <span className={cn("absolute left-0 -bottom-px w-2 h-[2px] bg-black rounded-l-full -translate-x-full translate-y-1/2 group-hover:translate-x-[10%] group-hover:-translate-y-[80%] group-hover:rounded-l-none group-hover:rounded-r-full transition-transform duration-200", getBorderColor(background))} />

            {/* Bottom-right corner - vertical line crossing bottom border */}
            <span className={cn("absolute -right-px bottom-0 w-[2px] h-2 bg-black rounded-b-full translate-x-1/2 translate-y-full group-hover:-translate-y-[10%] group-hover:-translate-x-[80%] group-hover:rounded-b-none group-hover:rounded-t-full transition-transform duration-200", getBorderColor(background))} />
            {/* Bottom-right corner - horizontal line crossing right border */}
            <span className={cn("absolute right-0 -bottom-px w-2 h-[2px] bg-black rounded-r-full translate-x-full translate-y-1/2 group-hover:-translate-x-[10%] group-hover:-translate-y-[80%] group-hover:rounded-r-none group-hover:rounded-l-full transition-transform duration-200", getBorderColor(background))} />

            {children}
        </button>
    );
};
