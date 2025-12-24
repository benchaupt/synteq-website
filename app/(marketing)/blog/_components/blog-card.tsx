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
    <article className="flex flex-col gap-6">
      <Link
        href={href}
        className="group relative border border-white/25 aspect-video w-full overflow-hidden"
      >
        <img
          src={image}
          alt={title}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-col gap-3">
        <span className="font-mono text-sm leading-none tracking-tight text-darker-accent uppercase">
          {category}
        </span>
        <h3 className="text-2xl text-white leading-tight tracking-tight">
          {title}
        </h3>
        <p className="text-lg text-[#ccc] leading-normal tracking-tight">
          {description}
        </p>
        <Link
          href={href}
          className="font-mono text-sm leading-none tracking-tight text-darker-accent uppercase underline decoration-from-font hover:text-accent transition-colors"
        >
          LEARN MORE ↘
        </Link>
      </div>
    </article>
  );
}
