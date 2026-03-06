import { cn } from "@/lib/utils";

const bgVariants = {
  white: "bg-white",
  offwhite: "bg-offwhite",
  cream: "bg-cream",
  lava: "bg-lava text-white",
  silver: "bg-silver",
  "slate-light-2": "bg-slate-light-2",
  "slate-light-3": "bg-slate-light-3",
} as const;

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  background?: keyof typeof bgVariants;
  id?: string;
}

export function Section({
  children,
  className,
  innerClassName,
  background = "white",
  id,
}: SectionProps) {
  return (
    <section id={id} className={cn(bgVariants[background], className)}>
      <div
        className={cn(
          "mx-auto w-full max-w-viewport px-5 md:px-8 py-16 md:py-24",
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
