"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface Milestone {
  year: string;
  title: string;
  description: string;
}

const milestones: Milestone[] = [
  {
    year: "2018",
    title: "The Beginning",
    description:
      "Founded with a focus on sourcing and distributing digital computing hardware, serving early adopters in the crypto mining space.",
  },
  {
    year: "2019",
    title: "Building Trust",
    description:
      "Established key vendor relationships with publicly traded companies, growing our reputation as a reliable hardware partner.",
  },
  {
    year: "2020",
    title: "Scaling Operations",
    description:
      "Surpassed 100,000 compute units sold, expanding logistics and quality assurance capabilities to meet surging demand.",
  },
  {
    year: "2021",
    title: "Institutional Growth",
    description:
      "Became the preferred vendor for over a dozen public companies, representing billions in combined market capitalization.",
  },
  {
    year: "2022",
    title: "Full-Service Infrastructure",
    description:
      "Launched data center infrastructure services, repair operations, and consulting — evolving from hardware supplier to end-to-end partner.",
  },
  {
    year: "2023",
    title: "Global Expansion",
    description:
      "Extended operations across 30+ countries, building out international logistics and support networks for enterprise clients.",
  },
  {
    year: "2024",
    title: "Next-Gen Compute",
    description:
      "400,000+ compute units delivered worldwide, with HPC and enterprise infrastructure capabilities serving the next generation of digital compute.",
  },
  {
    year: "2025",
    title: "Enterprise Evolution",
    description:
      "Expanded into high-performance computing and AI infrastructure, partnering with leading hardware manufacturers to deliver cutting-edge solutions.",
  },
  {
    year: "2026",
    title: "The Road Ahead",
    description:
      "Continuing to scale our infrastructure services and global reach, building the foundation for the next era of enterprise computing.",
  },
];

export function StoryTimeline() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = milestones[selectedIndex];

  return (
    <div className="flex flex-col gap-10">
      <h2 className="heading">Our Story.</h2>

      {/* Year tabs */}
      <div className="flex flex-wrap gap-2 md:gap-3">
        {milestones.map((milestone, i) => (
          <button
            key={milestone.year}
            onClick={() => setSelectedIndex(i)}
            className={cn(
              "text-xl md:text-2xl font-medium transition-colors duration-200 cursor-pointer",
              i === selectedIndex ? "text-lava" : "text-lava-25 hover:text-lava-50"
            )}
          >
            {milestone.year}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="relative min-h-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.year}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="max-w-2xl"
          >
            <h3 className="heading3 mb-3">{selected.title}</h3>
            <p className="text-slate text-body-lg leading-relaxed">
              {selected.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
