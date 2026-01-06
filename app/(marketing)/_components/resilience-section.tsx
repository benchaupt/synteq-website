import Link from "next/link";

export default function ResilienceSection() {
  return (
    <section className="max-w-viewport w-full mx-auto px-5 py-16 md:py-24 lg:py-32 flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
        {/* Left Content */}
        <div className="flex h-full shrink-0 flex-col justify-between gap-8 md:gap-10">
          <div className="flex w-full flex-col gap-6 md:gap-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-9 text-transparent bg-linear-to-l from-white to-[#cbf1ea] bg-clip-text font-sequel-book">
              Engineering for AI
            </h2>
            <p className="text-base md:text-lg lg:text-2xl leading-relaxed md:leading-9 text-foreground/65 max-w-2xl">
              <span className="text-foreground">Purpose-built hardware</span>
              {` meets cloud-native design. Every component from GPU clusters to network fabri is optimized for AI workloads. `}
              <span className="text-foreground">{`Research-grade infrastructure `}</span>
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
            <p className="text-lg md:text-xl lg:text-2xl text-white/65">
              Uptime
            </p>
            <p className="text-3xl md:text-4xl lg:text-5xl text-transparent bg-linear-to-l from-white to-[#cbf1ea] bg-clip-text">
              99.99% SLA
            </p>
            <p className="text-base md:text-lg lg:text-2xl text-white/65">
              Enterprise-grade reliability with redundant systems and automated failover.
            </p>
          </div>

          {/* Latency Card - Top Right */}
          <div className="flex flex-col gap-3 md:gap-4 justify-self-start sm:justify-self-end">
            <p className="text-lg md:text-xl lg:text-2xl text-white/65">
              Latency
            </p>
            <p className="text-3xl md:text-4xl lg:text-5xl text-transparent bg-linear-to-l from-white from-[73.558%] to-[#cbf1ea] bg-clip-text">
              &lt;50ms
            </p>
            <p className="text-base md:text-lg lg:text-2xl text-white/65">
              Sub-50ms response times for real-time AI inference workloads.
            </p>
          </div>

          {/* Hardware Card - Bottom Left */}
          <div className="flex flex-col gap-3 md:gap-4 justify-self-start">
            <p className="text-lg md:text-xl lg:text-2xl text-white/65">
              Hardware
            </p>
            <p className="text-3xl md:text-4xl lg:text-5xl text-transparent bg-linear-to-l from-white to-[#cbf1ea] bg-clip-text">
              H100 & A100
            </p>
            <p className="text-base md:text-lg lg:text-2xl text-white/65">
              Latest-generation GPUs optimized for training and inference.
            </p>
          </div>

          {/* Design Card - Bottom Right */}
          <div className="flex flex-col gap-3 md:gap-4 justify-self-start sm:justify-self-end">
            <p className="text-lg md:text-xl lg:text-2xl text-white/65">
              Design
            </p>
            <p className="text-3xl md:text-4xl lg:text-5xl text-transparent bg-linear-to-l from-white from-[26.923%] via-[#cbf1ea] via-[50.962%] to-white to-[70.192%] bg-clip-text">
              AI-Native
            </p>
            <p className="text-base md:text-lg lg:text-2xl text-white/65">
              Infrastructure architected from the ground up for AI workloads.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
