import Image from "next/image";
import { cn } from "@/lib/utils";

const values = [
  {
    icon: "/icons/values/integrity-icon.svg",
    title: "Integrity",
    description:
      "Trust is at the core of everything we do, and it shows in the long-term relationships we have with our clients. In the digital compute industry, security is essential, which is why we strive to earn and maintain your confidence through our hard work and dedication to your needs.",
  },
  {
    icon: "/icons/values/people-icon.svg",
    title: "People-First",
    description:
      "Our mission is not just to sell products, but to build lasting relationships based on mutual success. We're dedicated to helping our clients and the digital compute community succeed–that's our guiding principle.",
  },
  {
    icon: "/icons/values/excellence-icon.svg",
    title: "Committed to Excellence",
    description:
      "We are committed to optimizing our processes, maintaining clear communication, and constantly improving. That's how we provide an exceptional experience to our clients and partners.",
  },
  {
    icon: "/icons/values/transformation-icon.svg",
    title: "Transforming the Industry",
    description:
      "Through our extensive consultation expertise, Synteq Digital is leading the charge in advancing the digital compute sector. And with a team that is predominantly female, we are challenging the status quo and pushing for greater diversity in the field.",
  },
];

export function ValuesSection() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4 max-w-4xl">
        <h2 className="heading">
          Built on a foundation of integrity, reliability, and excellence.
        </h2>
        <p className="body-lg text-slate">
          At Synteq Digital, our values are the driving force behind everything
          we do.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border border-cream bg-offwhite overflow-hidden">
        {values.map((value, index) => (
          <div
            key={value.title}
            className={cn(
              "flex flex-col gap-2 pr-8 pl-4 pt-8 pb-8 md:p-10 border-cream",
              index < 3 && "border-b",
              index >= 2 && "md:border-b-0",
              index % 2 === 0 && "md:border-r",
            )}
          >
            <div className="flex items-center gap-4">
              <Image
                src={value.icon}
                alt=""
                width={40}
                height={40}
                className="shrink-0"
              />
              <h3 className="heading3 font-medium">{value.title}</h3>
            </div>
            <p className="body text-slate pl-14">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
