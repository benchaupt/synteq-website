"use client"

import { FlickeringGrid } from "@/app/_components/flickering-grid"
import { Marquee } from "@/app/_components/marquee"
import { motion } from "motion/react"
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

// Feature item for marquee
const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-2 text-sm text-background/70">
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0"
    >
      <circle cx="8" cy="8" r="2" fill="currentColor" />
    </svg>
    <span className="whitespace-nowrap">{text}</span>
  </div>
)

export default function CallToActionNew() {
  const features = [
    "Deploy to 330+ cities instantly",
    "Predictable pricing without surprises",
    "Battle-tested infrastructure powering millions",
    "No cold starts or region complexity",
  ]

  return (
    <section className="max-w-viewport w-full mx-auto px-5 py-32 flex flex-col">
      {/* Rounded container with teal background and flickering grid */}
      <div className="relative rounded-3xl bg-accent overflow-hidden min-h-[600px] flex flex-col">
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

        {/* Floating background icons */}
      <FloatingIconCard
        position="top-20 left-20"
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
        position="top-32 right-24"
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
        position="top-48 left-32"
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
        position="bottom-48 left-40"
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
        position="bottom-32 right-32"
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
        position="top-40 right-48"
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
        <div className="relative z-20 flex flex-col items-center text-center gap-6 max-w-3xl mx-auto py-24 px-8 flex-1 justify-center">
          <h2 className="text-5xl font-bold text-background">
            Build without boundaries
          </h2>
          <p className="text-lg text-background/80 max-w-2xl">
            Join thousands of developers who've eliminated infrastructure
            complexity and deployed globally with Synteq AI. Start building for
            free — no credit card required.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-6 mt-4">
            <AnimatedButton className="px-6 py-3 bg-background text-accent font-medium hover:bg-background/90 transition-colors">
              Start building for free
            </AnimatedButton>
            <AnimatedButton className="px-6 py-3 text-background/80 font-medium hover:text-background transition-colors">
              View docs
            </AnimatedButton>
          </div>
        </div>

        {/* Bottom marquee */}
        <div className="relative z-20 mt-auto">
          <Marquee className="py-4 border-t border-background/20" pauseOnHover disableGradient>
            {features.map((feature, i) => (
              <FeatureItem key={i} text={feature} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
