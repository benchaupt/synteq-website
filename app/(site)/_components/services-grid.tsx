import Image from "next/image";
import Link from "next/link";

interface ServiceCard {
  icon: string;
  title: string;
  description: string;
  href: string;
}

const services: ServiceCard[] = [
  {
    icon: "/icons/placement/icon-1.svg",
    title: "HPC",
    description:
      "High-performance cloud infrastructure delivering VPS, dedicated, GPU, and bare-metal servers at scale.",
    href: "/hpc",
  },
  {
    icon: "/icons/placement/icon-2.svg",
    title: "Hardware",
    description:
      "End-to-end supply of new and secondary market ASICs, GPUs, infrastructure and critical spare parts.",
    href: "/hardware",
  },
  {
    icon: "/icons/placement/icon-3.svg",
    title: "Repair",
    description:
      "Enterprise-grade hardware repair, refurbishment, and lifecycle management for ASICs, GPUs, and critical compute infrastructure.",
    href: "/repair",
  },
];

export function ServicesGrid() {
  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-12 md:gap-18">
      {services.map((service) => (
        <Link
          key={service.title}
          href={service.href}
          className="group flex flex-col items-start gap-2 md:max-w-sm"
        >
          <Image
            src={service.icon}
            alt=""
            width={36}
            height={36}
            className="mb-1"
          />
          <h4 className="heading4">{service.title}</h4>
          <p className="text-body pb-2">
            {service.description}
          </p>
          <span className="relative inline-flex w-fit items-center overflow-hidden font-medium">
            <span className="absolute inset-y-0 left-0 size-6 bg-lava transition-all duration-300 ease-out group-hover:w-full" />
            <span className="relative z-10 flex size-6 shrink-0 items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/button-arrow-right.svg" alt="" className="size-3.5" />
            </span>
            <span className="relative z-10 pr-3 pl-2 text-sm font-bold text-lava transition-colors duration-300 group-hover:text-white">
              Learn More
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
