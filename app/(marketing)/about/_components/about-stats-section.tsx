"use client";

import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState, useMemo } from "react";

interface Stat {
  value: string;
  label: string;
}

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  const hasPercent = value.includes("%");
  const hasTilde = value.includes("~");
  const hasX = value.includes("x");
  const hasPlus = value.includes("+");
  const hasSlash = value.includes("/");
  const numericValue = useMemo(
    () => parseFloat(value.replace(/[^0-9.]/g, "")),
    [value]
  );

  useEffect(() => {
    if (!isInView || started || hasSlash || isNaN(numericValue)) return;

    setStarted(true);
    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = duration / frameRate;
    const increment = numericValue / totalFrames;
    let frame = 0;

    const animate = () => {
      frame++;
      const newCount = Math.min(increment * frame, numericValue);
      setCount(newCount);

      if (newCount < numericValue) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, started, numericValue, hasSlash]);

  const formatValue = (num: number) => {
    let formatted = "";
    if (hasTilde) formatted += "~";

    if (hasPercent) {
      const decimals = numericValue % 1 !== 0 && num === numericValue ? 2 : 0;
      formatted += `${num.toFixed(decimals)}%`;
    } else if (hasX) {
      formatted += `${num.toFixed(num < 10 ? 1 : 0)}x`;
    } else {
      formatted += Math.round(num);
    }

    if (hasPlus) formatted += "+";
    return formatted;
  };

  if (hasSlash || isNaN(numericValue)) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref} className="tabular-nums">
      {formatValue(count)}
    </span>
  );
}

const defaultStats: Stat[] = [
  { value: "~40%", label: "Lower inference costs" },
  { value: "2x+", label: "More predictable performance" },
  { value: "99.99%", label: "Uptime SLA availability" },
];

interface AboutStatsSectionProps {
  title?: string;
  stats?: Stat[];
}

export function AboutStatsSection({
  title = "Designed to do less,\nand perform better.",
  stats = defaultStats,
}: AboutStatsSectionProps) {
  return (
    <section className="max-w-viewport w-full mx-auto px-5 py-16 md:py-24">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between items-center md:items-start gap-12 py-8 border-white/10">
        {/* Leader text */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="heading whitespace-pre-line"
        >
          {title}
        </motion.h2>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-12 lg:gap-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className="flex flex-col gap-2"
            >
              <div className="heading text-white">
                <AnimatedCounter value={stat.value} />
              </div>
              <p className="font-mono text-xs text-white/40 uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
