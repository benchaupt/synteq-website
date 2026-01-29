import Link from "next/link";

export default function ResilienceSection() {
  return (
    <section className="max-w-viewport w-full mx-auto px-5 py-16 md:py-24 lg:py-32 flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
        {/* Left Content */}
        <div className="flex h-full shrink-0 flex-col justify-between gap-8 md:gap-10">
          <div className="flex w-full flex-col gap-6 md:gap-8">
            <h2 className="heading leading-tight md:leading-9 font-sequel-book relative">
              <span className="text-white">Engineering for AI</span>
              <span className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,transparent_40%,#8EEBD3_50%,transparent_60%,transparent_100%)] bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer pointer-events-none select-none" aria-hidden="true">Engineering for AI</span>
            </h2>
            <p className="text-base md:text-base lg:text-base text-foreground/65 max-w-lg">
              <span> Every component from GPU clusters to network fabri is optimized for your workloads.</span>
              <span className="text-foreground">{` Research-grade infrastructure `}</span>
              that delivers production reliability, designed for the next generation of AI products.
            </p>
          </div>
          <Link
            href="#infrastructure"
            className="font-mono text-xs md:text-sm uppercase text-darker-accent underline decoration-solid underline-offset-4 hover:underline-offset-6 duration-150"
          >
            Explore our Infrastructure ↘
          </Link>
        </div>

        {/* Right Grid - Stats */}
        <div className="grid shrink-0 grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 lg:gap-16 h-full">
          {/* Uptime Card - Top Left */}
          <div className="flex flex-col gap-3 md:gap-4 justify-self-start">
            <p className="font-mono text-md md:text-md lg:text-md text-white/65 uppercase">
              Uptime
            </p>
            <p className="heading2 text-white">
              99.99% SLA
            </p>
            <p className="text-base md:text-base lg:text-base text-white/65">
              Enterprise-grade reliability with redundant systems and automated failover.
            </p>
          </div>

          {/* Latency Card - Top Right */}
          <div className="flex flex-col gap-3 md:gap-4 justify-self-start sm:justify-self-end">
            <p className="font-mono text-md md:text-md lg:text-md text-white/65 uppercase">
              Latency
            </p>
            <p className="heading2 text-white">
              &lt;50ms
            </p>
            <p className="text-base md:text-base lg:text-base text-white/65">
              Sub-50ms response times for real-time AI inference workloads.
            </p>
          </div>

          {/* Hardware Card - Bottom Left */}
          <div className="flex flex-col gap-3 md:gap-4 justify-self-start">
            <p className="font-mono text-md md:text-md lg:text-md text-white/65 uppercase">
              Hardware
            </p>
            <p className="heading2 text-white">
            Blackwell & H200 clusters
            </p>
            <p className="text-base md:text-base lg:text-base text-white/65">
              Latest-generation GPUs optimized for training and inference.
            </p>
          </div>

          {/* Design Card - Bottom Right */}
          <div className="flex flex-col gap-3 md:gap-4 justify-self-start sm:justify-self-end">
            <p className="font-mono text-md md:text-md lg:text-md text-white/65 uppercase">
              Design
            </p>
            <p className="heading2 text-white">
              AI-Native
            </p>
            <p className="text-base md:text-base lg:text-base text-white/65">
              Infrastructure architected from the ground up for AI workloads.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
