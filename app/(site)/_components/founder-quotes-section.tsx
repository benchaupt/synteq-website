import Image from "next/image";

const quotes = [
  {
    text: "Synteq Digital is rapidly emerging as a leading provider of digital compute infrastructure, hardware, services, and solutions. With a focus on operational excellence, we deliver cutting-edge solutions that help our clients scale efficiently, optimize performance, and remain competitive in the rapidly evolving landscapes of high-performance computing (HPC) and digital mining.",
    name: "Taras Kulyk",
    role: "Founder & CEO",
    headshot: "/images/founder-quotes/taras-headshot.png",
    signature: "/images/founder-quotes/taras-signature.svg",
  },
  {
    text: "Synteq Digital is rapidly emerging as a leading provider of digital compute infrastructure, hardware, services, and solutions. With a focus on operational excellence, we deliver cutting-edge solutions that help our clients scale efficiently, optimize performance, and remain competitive in the rapidly evolving landscapes of high-performance computing (HPC) and digital mining.",
    name: "Joe Stephanelli",
    role: "Founder & President",
    headshot: "/images/founder-quotes/joe-headshot.png",
    signature: "/images/founder-quotes/joe-signature.svg",
  },
];

function QuoteMark({ flip }: { flip?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/icons/quote.svg"
      alt=""
      className={flip ? "h-3 md:h-4 w-auto rotate-180" : "h-3 md:h-4 w-auto self-start"}
    />
  );
}

export function FounderQuotesSection() {
  return (
    <div className="flex flex-col gap-16 md:gap-20">
      {quotes.map((quote) => (
        <div key={quote.name} className="flex flex-col gap-6">
          <QuoteMark />

          <p className="text-xl font-medium text-lava leading-snug">{quote.text}</p>

          <div className="self-end">
            <QuoteMark flip />
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            <div className="flex items-center gap-4 md:gap-6">
              <Image
                src={quote.headshot}
                alt={quote.name}
                width={80}
                height={80}
                className="size-14 md:size-20 object-cover"
              />
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-medium text-lava">
                  {quote.name}
                </span>
                <span className="text-sm text-lava">{quote.role}</span>
              </div>
            </div>
            <Image
              src={quote.signature}
              alt={`${quote.name} signature`}
              width={280}
              height={84}
              className="h-12 md:h-16 w-auto self-start md:self-auto md:ml-4"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
