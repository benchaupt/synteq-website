/* eslint-disable @next/next/no-img-element */
"use client";

import { motion, useInView } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "~40%", label: "Lower inference costs" },
  { value: "5ms", label: "Faster response times" },
  { value: "2x+", label: "More predictable performance" },
  { value: "99.99%", label: "Uptime SLA availability" },
];


function UptimeDotGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(0);
  const dotSize = 7;
  const gap = 8;
  const totalDots = 220;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      setCols(Math.max(1, Math.floor((width + gap) / (dotSize + gap))));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (cols === 0) return <div ref={containerRef} className="w-full" />;

  const firstRowCount = totalDots % cols || cols;
  const remainingDots = totalDots - firstRowCount;

  return (
    <div ref={containerRef} className="flex flex-col items-end w-full" style={{ gap }}>
      <div className="flex justify-end" style={{ gap }}>
        {Array.from({ length: firstRowCount }).map((_, i) => (
          <div
            key={`first-${i}`}
            className={`rounded-full ${i === 0 ? "bg-accent" : "bg-accent"}`}
            style={{ width: dotSize, height: dotSize }}
          />
        ))}
      </div>
      {remainingDots > 0 && (
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${cols}, ${dotSize}px)`,
            gap,
          }}
        >
          {Array.from({ length: remainingDots }).map((_, i) => (
            <div
              key={`rest-${i}`}
              className="rounded-full bg-accent"
              style={{ width: dotSize, height: dotSize }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function AnimatedCounter({ value }: { value: string }) {
  // For simplicity, just display the value directly
  // The main stats section has the full animated counter
  return <span>{value}</span>;
}

export function ComputeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="compute"
      ref={sectionRef}
      className="max-w-viewport w-full mx-auto px-5 py-16 md:py-24 lg:py-32 flex flex-col"
    >
      <div className="flex flex-col gap-12 lg:gap-12 w-full">
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-52 items-start lg:items-end w-full">
          <motion.div
            className="flex flex-col gap-3 flex-1"
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="subheading">CPU Clusters</p>
            <h2 className="heading">
            Modern Infrastructure for General Purpose Compute
            </h2>
          </motion.div>
          <motion.p
            className="text-base text-dark-foreground flex-1 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            State of the art CPU clusters for running application servers, data pipelines, orchestration layers, and supporting services.
          </motion.p>
        </div>

        {/* Talk to Sales 
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          <AnimatedButton background="dark" size="default">
            Talk To Sales
          </AnimatedButton>
        </motion.div>  */}

        {/* Stats */}
        
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4"
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="heading2 text-accent">
                <AnimatedCounter value={stat.value} />
              </div>
              <p className="font-mono text-xs text-white/40 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Cards Grid - 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {/* Global Data Centers Card */}
          <motion.div
            className="bg-background-secondary p-6 flex flex-col aspect-[3/4] overflow-hidden"
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          >
            <span className="heading2 text-accent">
              9+
            </span>
            <p className="text-base text-white leading-relaxed pt-4">
              Global data centers. Deployed at edge and servicing 30+ countries.
            </p>
            <div className="flex-1 flex items-end justify-center mt-auto pb-6">
              <Image
                src="/assets/infrastructure/dc-globe.svg"
                alt="Global data centers"
                width={280}
                height={280}
                className="w-full max-w-64 h-auto"
              />
            </div>
          </motion.div>

          {/* Uptime Card */}
          <motion.div
            className="bg-background-secondary p-6 flex flex-col aspect-[3/4] overflow-hidden"
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          >
            <span className="heading2">
              99.99% <span className="text-white/50">Uptime</span>
            </span>
            <div className="mt-auto w-full">
              <UptimeDotGrid />
            </div>
          </motion.div>

          {/* Testimonial Card */}
          <motion.div
            className="bg-background-secondary p-6 flex flex-col aspect-[3/4]"
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
          >
            {/* Stacked avatars + text */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <Image
                    key={i}
                    src={`/assets/infrastructure/headshots/headshot-${i}.jpg`}
                    alt={`Team member ${i}`}
                    width={40}
                    height={40}
                    className="size-10 rounded-lg border-2 border-background-secondary object-cover"
                  />
                ))}
              </div>
              <p className="text-sm text-white leading-tight">
                Trusted By Leading Technical
                <br />
                Teams
              </p>
            </div>

            {/* Logo + Testimonial */}
            <div className="flex flex-col gap-4 mt-auto">
              <img
                src="/assets/contact/delv-logo.svg"
                alt="DELV"
                className="h-6 max-w-24"
              />
              <p className="text-base text-white leading-relaxed">
                &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus porttitor, ex vitae vehicula sodales, urna sapien
                interdum orci, sed accumsan erat magna eget enim. Integer quis
                libero in turpis sodales blandit.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Compute Image Card */}
          <motion.div
            className="bg-background-secondary flex items-center justify-center aspect-[3/4] overflow-hidden"
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
          >
            <Image
              src="/assets/infrastructure/compute-image.png"
              alt="Compute"
              width={400}
              height={500}
              className="w-full h-full object-cover object-[center_65%] scale-130"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
