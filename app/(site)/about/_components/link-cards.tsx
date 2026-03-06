import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const cards = [
  {
    title: "Meet Our Executive Team",
    href: "/team",
  },
  {
    title: "Explore Press & Media",
    href: "/press-and-media",
  },
];

export function LinkCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {cards.map((card) => (
        <Link
          key={card.href}
          href={card.href}
          className="group border border-lava/25 p-8 md:p-12 flex items-center justify-between gap-4 transition-colors hover:bg-offwhite"
        >
          <span className="text-xl md:text-2xl font-medium text-lava">
            {card.title}
          </span>
          <ArrowUpRight className="size-6 text-lava shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      ))}
    </div>
  );
}
