'use client'

import { useEffect, useRef } from 'react'

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
  const tweetId = extractTweetId(tweetUrl)

  useEffect(() => {
    if (!tweetId || !containerRef.current) return

    // Load Twitter widget script if not already loaded
    const loadTwitterScript = () => {
      if (window.twttr) {
        window.twttr.widgets.createTweet(tweetId, containerRef.current!, {
          theme,
          align: 'center',
          conversation: 'none',
          dnt: true,
        })
        return
      }

      const script = document.createElement('script')
      script.src = 'https://platform.twitter.com/widgets.js'
      script.async = true
      script.onload = () => {
        window.twttr?.widgets.createTweet(tweetId, containerRef.current!, {
          theme,
          align: 'center',
          conversation: 'none',
          dnt: true,
        })
      }
      document.body.appendChild(script)
    }

    loadTwitterScript()
  }, [tweetId, theme])

  if (!tweetId) {
    return (
      <div className={className}>
        <div className="bg-background-secondary border border-white/10 rounded-xl p-6 text-center">
          <p className="text-white/50">Invalid X/Twitter URL</p>
        </div>
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
