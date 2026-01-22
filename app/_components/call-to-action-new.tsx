"use client"

import Link from "next/link"
import { useRef, useState, useCallback } from "react"
import { AnimatedButton } from "./animated-button"
import { ParticleQCanvas } from "./particle-q-canvas"

interface RepelZone {
  id: string
  x: number
  y: number
  radius: number
  strength: number
}

export default function CallToActionNew() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [repelZones, setRepelZones] = useState<RepelZone[]>([])
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null)

  const handleContainerMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  const handleContainerMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  const handleContainerMouseLeave = useCallback(() => {
    setIsHovering(false)
    setMousePosition(null)
  }, [])

  const handleButtonHover = useCallback((buttonId: string, e: React.MouseEvent<HTMLAnchorElement>, isEntering: boolean) => {
    if (!containerRef.current) return

    if (isEntering) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const buttonRect = e.currentTarget.getBoundingClientRect()

      // Calculate button center relative to container
      const centerX = buttonRect.left - containerRect.left + buttonRect.width / 2
      const centerY = buttonRect.top - containerRect.top + buttonRect.height / 2

      // Create repel zone around button
      const newZone: RepelZone = {
        id: buttonId,
        x: centerX,
        y: centerY,
        radius: Math.max(buttonRect.width, buttonRect.height) * 0.9,
        strength: 0.5,
      }

      setRepelZones((prev) => {
        // Replace if exists, otherwise add
        const filtered = prev.filter(z => z.id !== buttonId)
        return [...filtered, newZone]
      })
    } else {
      // Remove the specific zone
      setRepelZones((prev) => prev.filter(z => z.id !== buttonId))
    }
  }, [])

  return (
    <section className="max-w-viewport w-full mx-auto px-5 pt-16 md:pt-24 lg:pt-32 pb-16 md:pb-24 lg:pb-32 flex flex-col">
      {/* Rounded container with teal background and particle animation */}
      <div
        ref={containerRef}
        className="relative rounded-2xl md:rounded-3xl bg-accent overflow-hidden min-h-[450px] md:min-h-[550px] lg:min-h-[600px] flex flex-col"
        onMouseMove={handleContainerMouseMove}
        onMouseEnter={handleContainerMouseEnter}
        onMouseLeave={handleContainerMouseLeave}
      >
        {/* Particle Q Canvas background */}
        <ParticleQCanvas
          squareSize={4}
          gridGap={10}
          color="rgb(255, 255, 255)"
          maxOpacity={0.15}
          mouseRepelRadius={80}
          fadeSpeed={0.03}
          repelZones={repelZones}
          isHovering={isHovering}
          mousePosition={mousePosition}
        />

        {/* Main content */}
        <div className="relative z-20 flex flex-col items-center text-center gap-4 md:gap-6 max-w-3xl mx-auto py-12 md:py-16 lg:py-24 px-5 md:px-8 flex-1 justify-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-background font-sequel-book">
            Built for AI at scale
          </h2>
          <p className="text-base md:text-base lg:text-base text-background/80 max-w-xl">
            From first experiment to multi-node training runs, choose the right mix of shared cloud, dedicated nodes, and bare metal for your workload.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 lg:gap-6 mt-2 md:mt-4 w-full sm:w-auto">
            <Link
              href="/cloud"
              onMouseEnter={(e) => handleButtonHover("btn-cloud", e, true)}
              onMouseLeave={(e) => handleButtonHover("btn-cloud", e, false)}
            >
              <AnimatedButton className="px-5 md:px-6 py-2.5 md:py-3 bg-background text-accent font-medium hover:bg-background/90 transition-colors w-full sm:w-auto">
                Start building with AI
              </AnimatedButton>
            </Link>
            <Link
              href="/contact"
              onMouseEnter={(e) => handleButtonHover("btn-contact", e, true)}
              onMouseLeave={(e) => handleButtonHover("btn-contact", e, false)}
            >
              <AnimatedButton className="px-5 md:px-6 py-2.5 md:py-3 text-background/80 font-medium hover:text-background transition-colors text-sm w-full sm:w-auto">
                Chat with Sales
              </AnimatedButton>
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
