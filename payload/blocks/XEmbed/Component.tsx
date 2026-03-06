'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

function EmbedCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("bg-offwhite rounded-xl border border-cream p-6 md:p-8", className)}>
      {children}
    </div>
  )
}

export type XEmbedBlockProps = {
  tweetUrl: string
  theme?: 'dark' | 'light'
  blockType: 'xEmbed'
}

type Props = XEmbedBlockProps & {
  className?: string
}

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void
        createTweet: (
          tweetId: string,
          container: HTMLElement,
          options?: Record<string, unknown>
        ) => Promise<HTMLElement>
      }
    }
  }
}

function extractTweetId(url: string): string | null {
  // Match both twitter.com and x.com URLs
  const match = url.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/)
  return match ? match[1] : null
}

export function XEmbedBlock({ className, tweetUrl, theme = 'dark' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const embeddedRef = useRef(false)
  const tweetId = extractTweetId(tweetUrl)

  useEffect(() => {
    if (!tweetId || !containerRef.current) return

    // Prevent double embedding (React Strict Mode runs effects twice)
    if (embeddedRef.current) return
    embeddedRef.current = true

    // Clear any existing content
    containerRef.current.innerHTML = ''

    const createTweet = () => {
      if (!containerRef.current) return

      window.twttr?.widgets.createTweet(tweetId, containerRef.current, {
        theme,
        align: 'center',
        conversation: 'none',
        dnt: true,
      })
    }

    // Load Twitter widget script if not already loaded
    if (window.twttr) {
      createTweet()
    } else {
      // Check if script is already being loaded
      const existingScript = document.querySelector('script[src*="platform.twitter.com/widgets.js"]')

      if (existingScript) {
        // Wait for existing script to load
        existingScript.addEventListener('load', createTweet)
      } else {
        const script = document.createElement('script')
        script.src = 'https://platform.twitter.com/widgets.js'
        script.async = true
        script.onload = createTweet
        document.body.appendChild(script)
      }
    }

    return () => {
      embeddedRef.current = false
    }
  }, [tweetId, theme])

  if (!tweetId) {
    return (
      <div className={className}>
        <EmbedCard className="text-center">
          <p className="text-slate">Invalid X/Twitter URL</p>
        </EmbedCard>
      </div>
    )
  }

  return (
    <div className={['not-prose', className].filter(Boolean).join(' ')}>
      <div
        ref={containerRef}
        className="flex justify-center min-h-32"
      />
    </div>
  )
}
