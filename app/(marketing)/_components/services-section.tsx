"use client";

import { useState } from "react";
import Link from "next/link";
import DepthImage from "@/app/_components/depth-image";

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const products = [
    {
      title: "Inference Cloud",
      description: "Ultra-low latency and scalable throughput, built for production workloads.",
      href: "/cloud",
      depth: "/assets/landing/depth-images/depth/inference-cloud.png",
    },
    {
      title: "GPU Clusters",
      description: "Dedicated GPU architecture for pre training, fine tuning, and high intensity workloads.",
      href: "/clusters",
      depth: "/assets/landing/depth-images/depth/general-compute.png",
    },
    {
      title: "General Compute",
      description: "Low latency compute for general workloads.",
      href: "/compute",
      depth: "/assets/landing/depth-images/depth/gpu-clusters.png",
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
            <h2 className="heading max-w-[100%] md:max-w-[75%]">
            Purpose-built for AI
            </h2>
          </div>
          <p className="text-base md:text-base lg:text-base text-dark-foreground flex-1 leading-relaxed max-w-2xl">
          We&apos;re here from first experiment to full scale production. Best in class speed, throughput, and reliability- at every stage.
          {/* We&apos;re here at every stage. From first experiment to full scale production, with purpose-built infrastructure, best in class speed, throughput, and reliability. */}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          {products.map((product, index) => (
            <Link
              key={index}
              href={product.href}
              className="group bg-background-secondary flex flex-col overflow-hidden relative transition-all duration-300 hover:-translate-y-2 cursor-pointer aspect-3/4 md:aspect-auto md:min-h-[500px] lg:min-h-[580px]"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
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

              {/* Depth Image with grid overlay - scaled down 35% */}
              <div className="flex-1 relative overflow-hidden flex items-center justify-center">
                <div className="relative w-[65%] h-[65%]">
                  <DepthImage
                    depth={product.depth}
                    className="absolute inset-0 w-full h-full"
                    gridScaleX={70}
                    gridScaleY={55}
                    scanSpeed={0.12}
                    barWidth={0.25}
                    minHeight={0.1}
                    maxHeight={0.85}
                    baseAlpha={0.5}
                    hover={hoveredIndex === index}
                    depthThreshold={0.12}
                  />
                </div>
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
