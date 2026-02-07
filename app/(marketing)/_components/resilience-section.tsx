"use client";

import Link from "next/link";
import { useRef, useCallback } from "react";

function StatCard({
  label,
  value,
  description,
  className,
}: {
  label: string;
  value: string;
  description: string;
  className?: string;
}) {
  const shimmerRef = useRef<HTMLSpanElement>(null);
  const running = useRef(false);

  const onMouseEnter = useCallback(() => {
    if (running.current) return;
    const el = shimmerRef.current;
    if (!el) return;
    running.current = true;
    el.classList.remove("animate-shimmer-stat");
    void el.offsetWidth;
    el.classList.add("animate-shimmer-stat");
  }, []);

  const onAnimationEnd = useCallback(() => {
    running.current = false;
    shimmerRef.current?.classList.remove("animate-shimmer-stat");
  }, []);

  return (
    <div
      className={`flex flex-col gap-3 md:gap-4 ${className ?? ""}`}
      onMouseEnter={onMouseEnter}
    >
      <p className="font-mono text-sm md:text-sm lg:text-md text-white/65 uppercase">
        {label}
      </p>
      <p className="heading2 text-white relative">
        {value}
        <span
          ref={shimmerRef}
          onAnimationEnd={onAnimationEnd}
          className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,transparent_35%,#A0F0CD_50%,transparent_65%,transparent_100%)] bg-[length:200%_100%] bg-no-repeat bg-clip-text text-transparent pointer-events-none select-none"
          style={{ backgroundPosition: "150% 0" }}
          aria-hidden="true"
        >
          {value}
        </span>
      </p>
      <p className="text-base md:text-base lg:text-base text-white/65">
        {description}
      </p>
    </div>
  );
}

export default function ResilienceSection() {
  return (
    <section className="max-w-viewport w-full mx-auto px-5 py-16 md:py-24 lg:py-32 flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
        {/* Left Content */}
        <div className="flex h-full shrink-0 flex-col justify-between gap-8 md:gap-10">
          <div className="flex w-full flex-col gap-6 md:gap-6">
            <h2 className="heading leading-tight md:leading-9 font-sequel-book text-white">
              Designed for the frontier
            </h2>
            <p className="text-base md:text-base lg:text-base text-foreground/65 max-w-lg">
              <span>Every layer of our infrastructure has been engineered from the group up for your workloads. </span>
              <span className="text-foreground">{`Enterprise grade hardware `}</span>
              with production reliability, to support what ships next.
            </p>
          </div>
          <Link
            href="#infrastructure"
            className="group relative w-fit font-mono text-xs md:text-sm uppercase text-darker-accent hover:text-accent transition-colors flex items-center gap-2"
          >
            Explore our Infrastructure
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
          </Link>
        </div>

        {/* Right Grid - Stats */}
        <div className="grid shrink-0 grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 lg:gap-16 h-full">
          <StatCard
            label="Uptime"
            value="99.99% SLA"
            description="Built in redundancy & monitoring to keep running."
            className="justify-self-start"
          />
          <StatCard
            label="Latency"
            value="<50ms"
            description="Sub-50ms response times for production workloads."
            className="justify-self-start sm:justify-self-end"
          />
          <StatCard
            label="Hardware"
            value="Blackwell & H200"
            description="Latest-generation GPUs, available to you."
            className="justify-self-start"
          />
          <StatCard
            label="EXECUTION"
            value="We get shit done"
            description="Deployment, support, and scale. Without wait."
            className="justify-self-start sm:justify-self-end"
          />
        </div>
      </div>
    </section>
  );
}
