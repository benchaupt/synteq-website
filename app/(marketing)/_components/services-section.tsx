"use client";

import Link from "next/link";
import Image from "next/image";

export default function ServicesSection() {
  const products = [
    {
      title: "Inference Cloud",
      description: "Instant inference for production systems. Start serving traffic in minutes.",
      href: "/cloud",
      image: "/assets/landing/inference-cloud.svg"
    },
    {
      title: "GPU Clusters",
      description: "Persistent GPU systems for long-running, high-intensity workloads.",
      href: "/cloud",
      image: "/assets/landing/gpu-cloud-servers.svg"
    },
    {
      title: "General Compute",
      description: "The foundation everything else runs on. CPU and storage for orchestration, APIs, and data.",
      href: "/hardware",
      image: "/assets/landing/bare-metal-clusters.svg"
    }
  ];

  return (
    <section className="max-w-viewport w-full mx-auto px-5 py-16 md:py-24 lg:py-32 flex flex-col">
      <div className="flex flex-col gap-8 w-full">
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-52 items-start lg:items-end w-full">
          <div className="flex flex-col gap-3 flex-1">
            <p className="subheading">
              Our Products
            </p>
            <h2 className="heading max-w-[75%]">
            Built for teams that ship
            </h2>
          </div>
          <p className="text-base md:text-base lg:text-base text-dark-foreground flex-1 leading-relaxed max-w-2xl">
            From first experiment to multi-node training runs, choose the right mix of shared cloud, dedicated nodes, and bare metal for your workload.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          {products.map((product, index) => (
            <Link
              key={index}
              href={product.href}
              className="group bg-background-secondary border border-transparent hover:border-white/10 flex flex-col overflow-hidden relative transition-all duration-300 hover:-translate-y-2 cursor-pointer aspect-3/4 md:aspect-auto md:min-h-[500px] lg:min-h-[580px]"
            >
              {/* Top content */}
              <div className="px-6 md:px-8 lg:px-9 pt-6 md:pt-8 lg:pt-9 z-10 flex flex-col">
                <h3 className="heading2 tracking-tight text-white transition-colors duration-300">
                  {product.title}
                </h3>
                <div className="flex items-center gap-2 text-accent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 mt-3">
                  <span className="text-sm font-medium">Explore</span>
                  <svg className="size-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* SVG Image - top aligned */}
              <div className="flex-1 flex items-start justify-center px-6 md:px-8 lg:px-9 pt-8 md:pt-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={280}
                  height={280}
                  className="w-full h-auto max-h-[260px] object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Description at bottom */}
              <div className="mt-auto px-6 md:px-8 lg:px-9 pb-6 md:pb-8 lg:pb-9 z-10">
                <p className="text-base text-dark-foreground group-hover:text-foreground/80 leading-relaxed transition-colors duration-300">
                  {product.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
