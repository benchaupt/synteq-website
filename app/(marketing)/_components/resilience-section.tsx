import Link from "next/link";

export default function ResilienceSection() {
  return (
    <section className="max-w-viewport w-full mx-auto px-5 py-32 flex flex-col">
      <div className="grid grid-cols-2 gap-16">
        {/* Left Content */}
        <div className="flex h-full shrink-0 flex-col justify-between">
          <div className="flex w-full flex-col gap-8">
            <h2 className="text-6xl leading-9 text-foreground font-sequel-book">
              Built for resilience.
            </h2>
            <p className="text-2xl leading-9 text-foreground/65 max-w-2xl">
              <span className="text-foreground">Modern SLAs</span>
              {` should be enforced, monitored, and optimized in real time. By leveraging AI, service level agreements evolve from `}
              <span className="text-foreground">{`static promises into living `}</span>
              systems that predict risk, detect anomalies, and adapt before breaches happen.
            </p>
          </div>
          <Link
            href="#infrastructure"
            className="font-mono text-sm uppercase text-darker-accent underline decoration-solid underline-offset-2"
          >
            Understand our Infrastructure
          </Link>
        </div>

        {/* Right Grid - Stats */}
        <div className="grid shrink-0 grid-cols-2 grid-rows-2 gap-16 h-full">
          {/* Uptime Card - Top Left */}
          <div className="flex flex-col gap-4 justify-self-start">
            <p className="text-2xl text-white/65">
              Uptime
            </p>
            <p className="text-5xl text-transparent bg-linear-to-l from-white to-[#cbf1ea] bg-clip-text">
              99.95% SLA
            </p>
            <p className="text-2xl text-white/65">
              they should be enforced, and optimized in real time.
            </p>
          </div>

          {/* Up to 95% Card - Top Right */}
          <div className="flex flex-col gap-4 justify-self-end">
            <p className="text-2xl text-white/65">
              Up to
            </p>
            <p className="text-5xl text-transparent bg-linear-to-l from-white from-[73.558%] to-[#cbf1ea] bg-clip-text">
              95%
            </p>
            <p className="text-2xl text-white/65">
              they should be enforced, and optimized in real time.
            </p>
          </div>

          {/* AI Training Card 1 - Bottom Left */}
          <div className="flex flex-col gap-4 justify-self-start">
            <p className="text-2xl text-white/65">
              Designed For
            </p>
            <p className="text-5xl text-transparent bg-linear-to-l from-white to-[#cbf1ea] bg-clip-text">
              AI Training
            </p>
            <p className="text-2xl text-white/65">
              they should be enforced, and optimized in real time.
            </p>
          </div>

          {/* AI Training Card 2 - Bottom Right */}
          <div className="flex flex-col gap-4 justify-self-end">
            <p className="text-2xl text-white/65">
              Designed For
            </p>
            <p className="text-5xl text-transparent bg-linear-to-l from-white from-[26.923%] via-[#cbf1ea] via-[50.962%] to-white to-[70.192%] bg-clip-text">
              AI Training
            </p>
            <p className="text-2xl text-white/65">
              they should be enforced, and optimized in real time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
