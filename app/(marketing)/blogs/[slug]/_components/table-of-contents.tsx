'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  className?: string
}

function extractHeadings(): TocItem[] {
  if (typeof document === 'undefined') return []

  // Only get headings from the main content area (RichText), not the "Read more" carousel
  const mainContent = document.querySelector('article .flex-1.min-w-0')
  if (!mainContent) return []

  const headingElements = mainContent.querySelectorAll('h2, h3')
  const items: TocItem[] = []

  headingElements.forEach((heading, index) => {
    const text = heading.textContent || ''

    // Skip empty headings
    if (!text.trim()) return

    // Generate ID if not present
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

export function TableOfContents({ className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  // Extract headings after mount (deferred to avoid sync setState in effect)
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setHeadings(extractHeadings())
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  // Track active heading based on scroll position
  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top, behavior: 'smooth' })
      setActiveId(id)
    }
  }

  if (headings.length === 0) {
    return null
  }

  return (
    <nav className={cn('flex flex-col gap-4', className)}>
      <h3 className="font-mono text-xs text-accent uppercase tracking-wider">
        Table of Contents
      </h3>
      <div className="flex flex-col gap-1 border-l-2 border-white/10">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => handleClick(e, heading.id)}
            className={cn(
              'text-sm py-1.5 transition-colors border-l-2 -ml-0.5',
              heading.level === 2 ? 'pl-4' : 'pl-7',
              activeId === heading.id
                ? 'text-accent border-accent'
                : 'text-white/50 hover:text-white/80 border-transparent'
            )}
          >
            {heading.text}
          </a>
        ))}
      </div>
    </nav>
  )
}
