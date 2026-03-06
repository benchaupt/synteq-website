import { cn } from "@/lib/utils";
import Image from "next/image";

const sizeMap = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  "2xl": 40,
} as const;

interface IconProps {
  name: string;
  size?: keyof typeof sizeMap;
  className?: string;
}

export function Icon({ name, size = "md", className }: IconProps) {
  const px = sizeMap[size];
  return (
    <Image
      src={`/icons/${name}.svg`}
      alt=""
      width={px}
      height={px}
      className={cn("shrink-0", className)}
    />
  );
}

interface CSSIconProps {
  name: string;
  size?: keyof typeof sizeMap;
  className?: string;
}

export function CSSIcon({ name, size = "md", className }: CSSIconProps) {
  const px = sizeMap[size];
  return (
    <span
      className={cn("inline-block shrink-0 bg-current", className)}
      style={{
        width: px,
        height: px,
        maskImage: `url(/icons/${name}.svg)`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskImage: `url(/icons/${name}.svg)`,
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
      }}
      aria-hidden="true"
    />
  );
}
