"use client";

import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState, useMemo } from "react";

interface Metric {
  id?: string | null;
  label: string;
  value: string;
}

function AnimatedValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  const hasPercent = value.includes("%");
  const hasPlus = value.includes("+");
  const hasComma = value.includes(",");
  const hasDollar = value.includes("$");
  const hasX = value.includes("x");
  const numericValue = useMemo(
    () => parseFloat(value.replace(/[^0-9.]/g, "")),
    [value],
  );

  useEffect(() => {
    if (!isInView || started || isNaN(numericValue)) return;

    setStarted(true);
    const duration = 1800;
    const frameRate = 1000 / 60;
    const totalFrames = duration / frameRate;
    const increment = numericValue / totalFrames;
    let frame = 0;

    const animate = () => {
      frame++;
      const newCount = Math.min(increment * frame, numericValue);
      setCount(newCount);
      if (newCount < numericValue) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, started, numericValue]);

  if (isNaN(numericValue)) {
    return <span ref={ref}>{value}</span>;
  }

  const format = (num: number) => {
    let s = "";
    if (hasDollar) s += "$";
    if (hasComma) {
      s += Math.round(num).toLocaleString("en-US");
    } else if (hasPercent) {
      const dec = numericValue % 1 !== 0 && num === numericValue ? 1 : 0;
      s += num.toFixed(dec) + "%";
    } else if (hasX) {
      s += num.toFixed(num < 10 ? 1 : 0) + "x";
    } else {
      s += Math.round(num);
    }
    if (hasPlus) s += "+";
    return s;
  };

  return (
    <span ref={ref} className="tabular-nums">
      {format(count)}
    </span>
  );
}

export function KeyMetrics({ metrics }: { metrics: Metric[] }) {
  if (metrics.length === 0) return null;

  return (
    <div className="flex justify-between py-6 mb-8">
      {metrics.map((metric, i) => (
        <motion.div
          key={metric.id ?? metric.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 * (i + 1) }}
          className="flex flex-col items-center gap-1 text-center"
        >
          <span className="text-2xl md:text-3xl font-medium text-lava">
            <AnimatedValue value={metric.value} />
          </span>
          <span className="text-sm text-lava-70">{metric.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
