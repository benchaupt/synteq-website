'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { TableOfContents } from './table-of-contents'

interface BlogArticleLayoutProps {
  children: React.ReactNode
}

export function BlogArticleLayout({ children }: BlogArticleLayoutProps) {
  const [tocExpanded, setTocExpanded] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const manualToggle = useRef(false)
  const wasPastHero = useRef(false)
  // Capture a stable document-top offset once, immune to layout shifts from TOC toggle
  const containerOffsetTop = useRef<number | null>(null)

  useEffect(() => {
    // Measure on mount (before any TOC collapse could shift things)
    if (containerRef.current) {
      containerOffsetTop.current =
        containerRef.current.getBoundingClientRect().top + window.scrollY
    }
  }, [])

  // Auto open/close only at the hero threshold crossing.
  // Uses the stable offset so TOC width changes can't cause feedback loops.
  useEffect(() => {
    const handleScroll = () => {
      if (containerOffsetTop.current === null) return

      const scrollMid = window.scrollY + window.innerHeight / 2
      const threshold = containerOffsetTop.current

      // Hysteresis: 80px buffer to prevent jitter at the boundary
      const pastHero = wasPastHero.current
        ? scrollMid > threshold - 80
        : scrollMid > threshold + 80

      if (pastHero !== wasPastHero.current) {
        wasPastHero.current = pastHero

        if (!pastHero) {
          manualToggle.current = false
          setTocExpanded(true)
        } else if (!manualToggle.current) {
          setTocExpanded(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="flex">
      {/* Animated TOC sidebar — desktop only */}
      <motion.aside
        className="hidden lg:block shrink-0 pb-[20vh]"
        animate={{ width: tocExpanded ? 256 : 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="sticky top-[calc(50%-15rem)]">
          <TableOfContents
            isExpanded={tocExpanded}
            onToggle={() => {
              manualToggle.current = true
              setTocExpanded((prev) => !prev)
            }}
          />
        </div>
      </motion.aside>

      {/* Main content — centered editorial column */}
      <div className="flex-1 flex justify-center">
        <div className="max-w-3xl w-full" data-article-content>
          {children}
        </div>
      </div>
    </div>
  )
}
