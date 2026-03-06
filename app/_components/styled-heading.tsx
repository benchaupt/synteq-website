import { cn } from "@/lib/utils";

interface StyledHeadingProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
  className?: string;
  children: string;
}

/**
 * Renders a heading where a trailing period is automatically
 * styled in `text-slate`. Use `\n` in the string to insert
 * line breaks (<br>).
 */
export function StyledHeading({
  as: Tag = "h2",
  className,
  children,
}: StyledHeadingProps) {
  const lines = children.split("\n");

  const rendered = lines.flatMap((line, i) => {
    const parts: React.ReactNode[] = [];
    if (i > 0) parts.push(<br key={`br-${i}`} className="hidden md:inline" />);

    // Style trailing period on the very last line
    if (i === lines.length - 1 && line.endsWith(".")) {
      parts.push(
        <span key={`line-${i}`}>
          {line.slice(0, -1)}
          <span className="text-slate">.</span>
        </span>
      );
    } else {
      parts.push(<span key={`line-${i}`}>{line}</span>);
    }
    return parts;
  });

  return <Tag className={cn(className)}>{rendered}</Tag>;
}
