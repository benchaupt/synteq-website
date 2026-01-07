/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

interface BlogCardProps {
  image: string;
  category: string;
  title: string;
  description: string;
  href: string;
}

export function BlogCard({
  image,
  category,
  title,
  description,
  href,
}: BlogCardProps) {
  return (
    <Link href={href} className="group flex flex-col gap-6">
      <div className="relative border border-white/25 aspect-video w-full overflow-hidden bg-gradient-to-br from-accent/20 to-background">
        <img
          src={image}
          alt={title}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-3">
        <span className="font-mono text-sm leading-none tracking-tight text-darker-accent uppercase">
          {category}
        </span>
        <h3 className="text-2xl text-white leading-tight tracking-tight group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-lg text-[#ccc] leading-normal tracking-tight">
          {description}
        </p>
        <span className="font-mono text-sm leading-none tracking-tight text-darker-accent uppercase underline underline-offset-4 hover:underline-offset-6 duration-200 decoration-from-font group-hover:text-accent transition-colors">
          LEARN MORE ↘
        </span>
      </div>
    </Link>
  );
}
