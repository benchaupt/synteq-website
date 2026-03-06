"use client";

import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState, useMemo } from "react";

interface Stat {
  value: string;
  label: string;
}

interface StatsSectionProps {
  title?: string;
  stats: Stat[];
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
  const hasComma = value.includes(",");
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
    } else if (hasComma) {
      formatted += Math.round(num).toLocaleString("en-US");
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

export function StatsSection({ title, stats }: StatsSectionProps) {
  return (
    <div className="flex flex-col items-center gap-12">
      {title && (
        <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium text-lava text-center tracking-tight">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 lg:flex lg:justify-between gap-12 w-full">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            className="flex flex-col items-center gap-2 text-center"
          >
            <div className="text-4xl md:text-5xl lg:text-6xl font-medium text-lava tabular-nums min-w-max">
              <AnimatedCounter value={stat.value} />
            </div>
            <p className="heading6">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
