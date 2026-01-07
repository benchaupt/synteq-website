
import Link from "next/link";

interface BlogHeroProps {
  image: string;
  category: string;
  title: string;
  description: string;
  href: string;
}

export function BlogHero({
  image,
  category,
  title,
  description,
  href,
}: BlogHeroProps) {
  return (
    <Link href={href} className="group relative w-full block">
      <div className="bg-gradient-to-br from-accent/20 to-background rounded-lg overflow-hidden">
        <div className="relative h-[400px] md:h-[450px] lg:h-[500px] w-full p-6 md:p-8" style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
          <div className="flex flex-col gap-2 md:gap-3 max-w-2xl items-start justify-end h-full">
            <span className="font-mono text-xs md:text-sm text-darker-accent tracking-tight uppercase">
              {category}
            </span>
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight tracking-tight">
              {title}
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-[#bfbfbf] tracking-tight line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </div>
      {/* <img
        src={image}
        alt={title}
        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[57%] to-black/25 to-[80%]" />
      <div className="absolute bottom-10 left-10 flex flex-col gap-4 max-w-2xl">
        <span className="font-mono text-lg text-darker-accent tracking-tight uppercase">
          {category}
        </span>
        <h1 className="text-4xl text-foreground leading-tight tracking-tight">
          {title}
        </h1>
        <p className="text-xl text-[#bfbfbf] tracking-tight">
          {description}
        </p>
      </div> */}
    </Link>
  );
}
