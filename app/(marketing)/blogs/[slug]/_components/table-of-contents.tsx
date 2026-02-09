'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'motion/react'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  isExpanded: boolean
  onToggle: () => void
  className?: string
}

function extractHeadings(): TocItem[] {
  if (typeof document === 'undefined') return []

  const mainContent = document.querySelector('article [data-article-content]')
  if (!mainContent) return []

  const headingElements = mainContent.querySelectorAll('h2, h3')
  const items: TocItem[] = []

  headingElements.forEach((heading, index) => {
    const text = heading.textContent || ''
    if (!text.trim()) return

    if (!heading.id) {
      heading.id = `heading-${index}`
    }

    items.push({
      id: heading.id,
      text,
      level: parseInt(heading.tagName[1]),
    })
  })

  return items
}

export function TableOfContents({ isExpanded, onToggle, className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const isScrollingTo = useRef(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setHeadings(extractHeadings())
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Skip observer updates while programmatically scrolling to a heading
        if (isScrollingTo.current) return

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      // Lock active state to the clicked heading during smooth scroll
      isScrollingTo.current = true
      setActiveId(id)

      const lenis = window.__lenis
      if (lenis) {
        lenis.scrollTo(element, {
          offset: -100,
          onComplete: () => { isScrollingTo.current = false },
        })
      } else {
        const top = element.getBoundingClientRect().top + window.scrollY - 100
        window.scrollTo({ top, behavior: 'smooth' })
      }

      // Fallback timeout to re-enable observer
      setTimeout(() => { isScrollingTo.current = false }, 1000)
    }
  }

  if (headings.length === 0) {
    return null
  }

  return (
    <nav className={cn('flex flex-col gap-4', className)}>
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
        aria-label={isExpanded ? 'Collapse table of contents' : 'Expand table of contents'}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <polyline points="9 18 15 12 9 6" />
        </motion.svg>
      </button>

      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, x: -10, height: 0 }}
            animate={{ opacity: 1, x: 0, height: 'auto' }}
            exit={{ opacity: 0, x: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-1 overflow-hidden"
          >
            <span className="font-mono text-xs text-accent uppercase tracking-wider mb-2">
              Table of Contents
            </span>
            <div className="flex flex-col gap-1 border-l-2 border-white/10">
              {headings.map((heading, i) => (
                <motion.a
                  key={heading.id}
                  href={`#${heading.id}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.2 }}
                  onClick={(e) => {
                    e.preventDefault()
                    handleClick(heading.id)
                  }}
                  className={cn(
                    'text-sm py-1.5 transition-colors border-l-2 -ml-0.5',
                    heading.level === 2 ? 'pl-4' : 'pl-7',
                    activeId === heading.id
                      ? 'text-accent border-accent'
                      : 'text-white/50 hover:text-white/80 border-transparent'
                  )}
                >
                  {heading.text}
                </motion.a>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col overflow-hidden"
          >
            {headings.map((heading) => (
              <button
                key={heading.id}
                onClick={() => handleClick(heading.id)}
                className="flex items-center py-1.5 cursor-pointer group"
                aria-label={`Scroll to ${heading.text}`}
              >
                <div
                  className={cn(
                    'h-0.5 rounded-full transition-colors',
                    heading.level === 2 ? 'w-8' : 'w-5',
                    activeId === heading.id
                      ? 'bg-accent'
                      : 'bg-foreground/20 group-hover:bg-foreground/40'
                  )}
                />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
