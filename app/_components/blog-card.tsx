/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

function truncateWords(text: string, maxWords: number): string {
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
}

export interface BlogCardProps {
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
    <Link href={href} className="group flex flex-col gap-4 md:gap-6">
      <div className="relative aspect-video w-full overflow-hidden bg-offwhite rounded-lg">
        <img
          src={image}
          alt={title}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-2 md:gap-3">
        <span className="text-label text-slate uppercase tracking-wide">
          {category}
        </span>
        <h3 className="text-lg md:text-xl lg:text-2xl text-lava leading-tight tracking-tight group-hover:text-slate transition-colors">
          {title}
        </h3>
        <p className="text-body text-slate-80 leading-normal line-clamp-3">
          {truncateWords(description, 20)}
        </p>
        <span className="relative text-label text-slate uppercase tracking-wide group-hover:text-lava transition-colors flex items-center gap-2 w-fit">
          LEARN MORE
          <svg
            className="size-3 -rotate-45 group-hover:rotate-0 transition-transform duration-300"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.000235885 7.36992C0.000235485 6.87117 0.404899 6.46651 0.904036 6.46612L10.3528 6.46613C11.1055 6.46613 11.4827 5.55582 10.9503 5.02341L7.48116 1.55432C7.12813 1.20129 7.12813 0.6291 7.48116 0.276071L7.49416 0.263067C7.84681 -0.0888145 8.41862 -0.0891969 8.77164 0.263832L14.8776 6.36974C15.4302 6.92243 15.4302 7.81819 14.8776 8.37088L8.77165 14.4768C8.41862 14.8298 7.84643 14.8298 7.4934 14.4768L7.4804 14.4638C7.12737 14.1107 7.12737 13.5386 7.48039 13.1855L10.9499 9.71606C11.4823 9.18364 11.1052 8.27334 10.3524 8.27334L0.904036 8.27372C0.405282 8.27372 0.000618115 7.86906 0.000618368 7.37031L0.000235885 7.36992Z"
              fill="currentColor"
            />
          </svg>
          <span className="absolute left-0 -bottom-1 h-px w-full bg-current origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </span>
      </div>
    </Link>
  );
}
