"use client";

import { AnimatedButton } from "@/app/_components/animated-button";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const stats = [
  { value: "~40%", label: "Lower inference costs" },
  { value: "~40%", label: "Lower inference costs" },
  { value: "2x+", label: "More predictable performance" },
  { value: "99.99%", label: "Uptime SLA availability" },
];

export function StorageSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="storage"
      ref={sectionRef}
      className="max-w-viewport w-full mx-auto px-5 py-16 md:py-24 lg:py-32 flex flex-col"
    >
      <div className="flex flex-col gap-12 lg:gap-8 w-full">
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-52 items-start lg:items-end w-full">
          <motion.div
            className="flex flex-col gap-3 flex-1"
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="subheading">Storage</p>
            <h2 className="heading">
              A Better Foundation for General-Purpose Storage
            </h2>
          </motion.div>
          <motion.p
            className="text-base text-dark-foreground flex-1 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            Flexible storage infrastructure for datasets, application state, artifacts, backups, and archives. Designed to support both AI and non-AI workloads without unnecessary abstraction.
          </motion.p>
        </div>

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
                {stat.value}
              </div>
              <p className="font-mono text-xs text-white/40 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
