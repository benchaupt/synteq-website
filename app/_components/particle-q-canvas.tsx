"use client"

import { useEffect, useRef, useState, useCallback } from "react"

// Q logo SVG path from logo-shape.svg
const Q_PATH = "M252.01,244.27h-83.5s120,155.72,120,155.72h83.5l-61.59-79.93c36.08-33.12,57.96-81.23,57.96-136.63C368.37,78.9,289.86,0,184.68,0S0,79.41,0,183.44s79.01,183.94,184.68,183.94c18.96,0,37.05-2.56,53.97-7.38l-51.1-64.52c-.95.02-1.91.04-2.88.04-61.73,0-108.64-48.75-108.64-112.07s46.91-111.57,108.64-111.57,107.65,47.74,107.65,111.57c0,30.34-10.41,57.13-27.93,76.92l-12.4-16.08Z"

// Original SVG viewBox dimensions
const SVG_WIDTH = 372.01
const SVG_HEIGHT = 400

interface Particle {
  x: number
  y: number
  opacity: number
  baseOpacity: number
}

interface RepelZone {
  id: string
  x: number
  y: number
  radius: number
  strength: number
}

interface AnimatedRepelZone extends RepelZone {
  currentStrength: number
}

interface ParticleQCanvasProps {
  className?: string
  squareSize?: number
  gridGap?: number
  color?: string
  maxOpacity?: number
  mouseRepelRadius?: number
  fadeSpeed?: number
  repelZones?: RepelZone[]
  isHovering?: boolean
  mousePosition?: { x: number; y: number } | null
}

export function ParticleQCanvas({
  className = "",
  squareSize = 4,
  gridGap = 10,
  color = "rgb(255, 255, 255)",
  maxOpacity = 0.15,
  mouseRepelRadius = 80,
  fadeSpeed = 0.03,
  repelZones = [],
  isHovering: externalIsHovering,
  mousePosition: externalMousePosition,
}: ParticleQCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const isHoveringRef = useRef(false)
  const hoverProgressRef = useRef(0)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const animateFnRef = useRef<((time: number) => void) | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const lastTimeRef = useRef(0)
  const pathRef = useRef<Path2D | null>(null)
  const repelZonesRef = useRef<RepelZone[]>(repelZones)
  const animatedZonesRef = useRef<Map<string, AnimatedRepelZone>>(new Map())
  const externalHoverRef = useRef(externalIsHovering)
  const externalMouseRef = useRef(externalMousePosition)

  // Keep refs updated and manage animated zones
  useEffect(() => {
    repelZonesRef.current = repelZones

    // Add new zones or update existing ones
    const currentIds = new Set(repelZones.map(z => z.id))

    repelZones.forEach(zone => {
      if (!animatedZonesRef.current.has(zone.id)) {
        // New zone - start with 0 strength
        animatedZonesRef.current.set(zone.id, { ...zone, currentStrength: 0 })
      } else {
        // Update position/radius for existing zone
        const existing = animatedZonesRef.current.get(zone.id)!
        existing.x = zone.x
        existing.y = zone.y
        existing.radius = zone.radius
        existing.strength = zone.strength
      }
    })

    // Mark removed zones for fade out (set target strength to 0)
    animatedZonesRef.current.forEach((zone, id) => {
      if (!currentIds.has(id)) {
        zone.strength = 0
      }
    })
  }, [repelZones])

  useEffect(() => {
    externalHoverRef.current = externalIsHovering
  }, [externalIsHovering])

  useEffect(() => {
    externalMouseRef.current = externalMousePosition
  }, [externalMousePosition])

  // Parse color to rgba format
  const getRGBA = useCallback((colorStr: string) => {
    if (typeof window === "undefined") return { r: 255, g: 255, b: 255 }
    const canvas = document.createElement("canvas")
    canvas.width = canvas.height = 1
    const ctx = canvas.getContext("2d")
    if (!ctx) return { r: 255, g: 255, b: 255 }
    ctx.fillStyle = colorStr
    ctx.fillRect(0, 0, 1, 1)
    const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data)
    return { r, g, b }
  }, [])

  // Calculate Q bounds and create scaled path
  const setupQPath = useCallback((canvasWidth: number, canvasHeight: number, dpr: number) => {
    const qDisplayHeight = canvasHeight * 0.7
    const scale = qDisplayHeight / SVG_HEIGHT
    const qDisplayWidth = SVG_WIDTH * scale
    const offsetX = (canvasWidth - qDisplayWidth) / 2
    const offsetY = (canvasHeight - qDisplayHeight) / 2

    // Create a scaled Path2D for the Q
    const path = new Path2D()
    const svgPath = new Path2D(Q_PATH)
    const matrix = new DOMMatrix()
      .scale(dpr, dpr)
      .translate(offsetX, offsetY)
      .scale(scale, scale)
    path.addPath(svgPath, matrix)
    pathRef.current = path
  }, [])

  // Initialize particles in a grid
  const initParticles = useCallback((width: number, height: number) => {
    const cols = Math.floor(width / (squareSize + gridGap))
    const rows = Math.floor(height / (squareSize + gridGap))
    const particles: Particle[] = []

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * (squareSize + gridGap) + squareSize / 2
        const y = j * (squareSize + gridGap) + squareSize / 2

        particles.push({
          x,
          y,
          opacity: Math.random() * maxOpacity,
          baseOpacity: Math.random() * maxOpacity,
        })
      }
    }

    particlesRef.current = particles
  }, [squareSize, gridGap, maxOpacity])

  // Check if point is inside Q
  const isPointInQ = useCallback((x: number, y: number, ctx: CanvasRenderingContext2D, dpr: number) => {
    if (!pathRef.current) return false
    return ctx.isPointInPath(pathRef.current, x * dpr, y * dpr)
  }, [])

  // Animation loop
  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const deltaTime = Math.min((time - lastTimeRef.current) / 1000, 0.1)
    lastTimeRef.current = time

    const dpr = window.devicePixelRatio || 1
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Use external state if provided, otherwise use internal
    const mouse = externalMouseRef.current ?? mouseRef.current
    const isHovering = externalHoverRef.current ?? isHoveringRef.current
    const particles = particlesRef.current
    const { r, g, b } = getRGBA(color)

    // Animate repel zones
    const zonesToRemove: string[] = []
    animatedZonesRef.current.forEach((zone, id) => {
      // Smoothly interpolate current strength toward target
      const lerpSpeed = 0.15
      zone.currentStrength += (zone.strength - zone.currentStrength) * lerpSpeed

      // Remove zones that have fully faded out
      if (zone.strength === 0 && zone.currentStrength < 0.001) {
        zonesToRemove.push(id)
      }
    })
    zonesToRemove.forEach(id => animatedZonesRef.current.delete(id))

    const animatedZones = Array.from(animatedZonesRef.current.values())

    // Smoothly transition hover progress
    const targetProgress = isHovering ? 1 : 0
    const speed = isHovering ? fadeSpeed : fadeSpeed * 1.5
    hoverProgressRef.current += (targetProgress - hoverProgressRef.current) * speed * 60 * deltaTime
    hoverProgressRef.current = Math.max(0, Math.min(1, hoverProgressRef.current))

    const progress = hoverProgressRef.current

    // Draw grid particles
    particles.forEach((particle) => {
      // Flicker opacity
      if (Math.random() < 0.3 * deltaTime) {
        particle.baseOpacity = Math.random() * maxOpacity
      }

      // Mouse repulsion
      const mouseDx = particle.x - mouse.x
      const mouseDy = particle.y - mouse.y
      const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy)

      let repelX = 0
      let repelY = 0
      if (mouseDist < mouseRepelRadius && mouseDist > 0) {
        const force = (1 - mouseDist / mouseRepelRadius) * 0.4
        repelX += (mouseDx / mouseDist) * force * mouseRepelRadius
        repelY += (mouseDy / mouseDist) * force * mouseRepelRadius
      }

      // Additional repel zones (buttons) with smooth animation
      animatedZones.forEach((zone) => {
        const zoneDx = particle.x - zone.x
        const zoneDy = particle.y - zone.y
        const zoneDist = Math.sqrt(zoneDx * zoneDx + zoneDy * zoneDy)

        if (zoneDist < zone.radius && zoneDist > 0) {
          const force = (1 - zoneDist / zone.radius) * zone.currentStrength
          repelX += (zoneDx / zoneDist) * force * zone.radius
          repelY += (zoneDy / zoneDist) * force * zone.radius
        }
      })

      const drawX = (particle.x + repelX) * dpr
      const drawY = (particle.y + repelY) * dpr

      // Determine opacity - increase for dots inside Q when hovering (embossed)
      let opacity = particle.baseOpacity

      if (progress > 0.01) {
        const inQ = isPointInQ(particle.x, particle.y, ctx, dpr)

        if (inQ) {
          // Dots inside Q get brighter (embossed effect)
          const targetOpacity = maxOpacity * 2.5 // Much brighter
          opacity = particle.baseOpacity + (targetOpacity - particle.baseOpacity) * progress
        }
      }

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`
      ctx.fillRect(
        drawX - (squareSize * dpr) / 2,
        drawY - (squareSize * dpr) / 2,
        squareSize * dpr,
        squareSize * dpr
      )
    })

    animationFrameRef.current = requestAnimationFrame((t) => animateFnRef.current?.(t))
  }, [color, maxOpacity, squareSize, mouseRepelRadius, fadeSpeed, getRGBA, isPointInQ])

  // Keep animate ref updated
  useEffect(() => {
    animateFnRef.current = animate
  }, [animate])

  // Handle resize
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setDimensions({ width, height })
      }
    })

    resizeObserver.observe(container)
    return () => resizeObserver.disconnect()
  }, [])

  // Initialize canvas and particles when dimensions change
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = dimensions.width * dpr
    canvas.height = dimensions.height * dpr
    canvas.style.width = `${dimensions.width}px`
    canvas.style.height = `${dimensions.height}px`

    setupQPath(dimensions.width, dimensions.height, dpr)
    initParticles(dimensions.width, dimensions.height)
  }, [dimensions, initParticles, setupQPath])

  // Start animation
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    lastTimeRef.current = performance.now()
    animationFrameRef.current = requestAnimationFrame((t) => animateFnRef.current?.(t))
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [dimensions])

  // Mouse event handlers
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    isHoveringRef.current = true
  }, [])

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false
    mouseRef.current = { x: -1000, y: -1000 }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  )
}
