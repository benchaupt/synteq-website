"use client";

import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState, useMemo } from "react";

interface Stat {
  value: string;
  label: string;
}

interface StatsSectionProps {
  stats: Stat[];
}

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  // Extract format info
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

  // Format the display value
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

  // For non-numeric values like "24/7", just display as-is
  if (hasSlash || isNaN(numericValue)) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref} className="tabular-nums">
      {formatValue(count)}
    </span>
  );
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className="grid grid-cols-2 lg:flex lg:justify-between gap-8 pt-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
          className="flex flex-col gap-2"
        >
          <div className="text-4xl md:text-5xl lg:text-6xl font-sequel-book text-accent">
            <AnimatedCounter value={stat.value} />
          </div>
          <p className="font-mono text-xs text-white/40 uppercase tracking-wider">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
