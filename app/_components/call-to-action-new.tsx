"use client"

import { FlickeringGrid } from "@/app/_components/flickering-grid"
import { motion } from "motion/react"
import Link from "next/link"
import { AnimatedButton } from "./animated-button"

// Floating icon card component
const FloatingIconCard = ({
  icon,
  delay = 0,
  position,
}: {
  icon: React.ReactNode
  delay?: number
  position: string
}) => {
  return (
    <motion.div
      className={`absolute ${position} w-16 h-16 bg-background/5 backdrop-blur-sm border border-background/10 rounded-xl flex items-center justify-center z-10`}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, 0, -5, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      {icon}
    </motion.div>
  )
}

export default function CallToActionNew() {

  return (
    <section className="max-w-viewport w-full mx-auto px-5 py-16 md:py-24 lg:py-32 flex flex-col">
      {/* Rounded container with teal background and flickering grid */}
      <div className="relative rounded-2xl md:rounded-3xl bg-accent overflow-hidden min-h-[450px] md:min-h-[550px] lg:min-h-[600px] flex flex-col">
        {/* FlickeringGrid background */}
        <div className="absolute inset-0 z-0">
          <FlickeringGrid
            className="w-full h-full"
            squareSize={4}
            gridGap={6}
            color="rgb(255, 255, 255)"
            maxOpacity={0.15}
            flickerChance={0.2}
          />
        </div>

        {/* Floating background icons - Hidden on mobile */}
      <FloatingIconCard
        position="top-20 left-20 hidden lg:flex"
        delay={0}
        icon={
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-background/40"
            strokeWidth="1.5"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        }
      />
      <FloatingIconCard
        position="top-32 right-24 hidden lg:flex"
        delay={1}
        icon={
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-background/40"
            strokeWidth="1.5"
          >
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
        }
      />
      <FloatingIconCard
        position="top-48 left-32 hidden xl:flex"
        delay={2}
        icon={
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-background/40"
            strokeWidth="1.5"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        }
      />
      <FloatingIconCard
        position="bottom-48 left-40 hidden xl:flex"
        delay={0.5}
        icon={
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-background/40"
            strokeWidth="1.5"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        }
      />
      <FloatingIconCard
        position="bottom-32 right-32 hidden lg:flex"
        delay={1.5}
        icon={
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-background/40"
            strokeWidth="1.5"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        }
      />
      <FloatingIconCard
        position="top-40 right-48 hidden xl:flex"
        delay={2.5}
        icon={
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-background/40"
            strokeWidth="1.5"
          >
            <line x1="12" y1="2" x2="12" y2="6" />
            <line x1="12" y1="18" x2="12" y2="22" />
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
            <line x1="2" y1="12" x2="6" y2="12" />
            <line x1="18" y1="12" x2="22" y2="12" />
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
          </svg>
        }
      />

        {/* Main content */}
        <div className="relative z-20 flex flex-col items-center text-center gap-4 md:gap-6 max-w-3xl mx-auto py-12 md:py-16 lg:py-24 px-5 md:px-8 flex-1 justify-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-background font-sequel-book">
            Built for AI at scale
          </h2>
          <p className="text-base md:text-lg text-background/80 max-w-xl">
            From first experiment to multi-node training runs, choose the right mix of shared cloud, dedicated nodes, and bare metal for your workload.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 lg:gap-6 mt-2 md:mt-4 w-full sm:w-auto">
            <Link href="/cloud">
              <AnimatedButton className="px-5 md:px-6 py-2.5 md:py-3 bg-background text-accent font-medium hover:bg-background/90 transition-colors text-sm md:text-base w-full sm:w-auto">
                Start building with AI
              </AnimatedButton>
            </Link>
            <Link href="/contact">
              <AnimatedButton className="px-5 md:px-6 py-2.5 md:py-3 text-background/80 font-medium hover:text-background transition-colors text-sm md:text-base w-full sm:w-auto">
                Chat with Sales
              </AnimatedButton>
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
