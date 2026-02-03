'use client'

import { Play, ExternalLink } from 'lucide-react'

export type HiggsFieldEmbedBlockProps = {
  videoUrl: string
  caption?: string
  autoplay?: boolean
  loop?: boolean
  blockType: 'higgsFieldEmbed'
}

type Props = HiggsFieldEmbedBlockProps & {
  className?: string
}

function extractVideoId(url: string): string | null {
  try {
    const urlObj = new URL(url)
    if (!urlObj.hostname.includes('higgsfield')) {
      return null
    }
    // Extract video ID from paths like /video/abc123 or /v/abc123
    const match = urlObj.pathname.match(/\/(?:video|v)\/([^/?]+)/)
    return match ? match[1] : null
  } catch {
    return null
  }
}

export function HiggsFieldEmbedBlock({
  className,
  videoUrl,
  caption,
  autoplay = false,
  loop = true,
}: Props) {
  const videoId = extractVideoId(videoUrl)

  if (!videoId) {
    return (
      <div className={className}>
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-background-secondary border border-white/10 rounded-xl p-6 hover:border-accent/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="size-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Play className="size-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-white">Higgsfield Video</p>
              <p className="text-sm text-white/50">Click to view on Higgsfield</p>
            </div>
            <ExternalLink className="size-5 text-white/30" />
          </div>
        </a>
      </div>
    )
  }

  // Construct embed URL with options
  const embedParams = new URLSearchParams()
  if (autoplay) embedParams.set('autoplay', '1')
  if (loop) embedParams.set('loop', '1')
  const embedUrl = `https://higgsfield.ai/embed/${videoId}?${embedParams.toString()}`

  return (
    <div className={['not-prose', className].filter(Boolean).join(' ')}>
      <div className="bg-background-secondary border border-white/10 rounded-xl overflow-hidden">
        <div className="aspect-video">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {caption && (
          <div className="p-4 border-t border-white/10">
            <p className="text-sm text-white/60 text-center">{caption}</p>
          </div>
        )}
        <div className="px-4 pb-4 flex justify-end">
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/40 hover:text-accent transition-colors flex items-center gap-1"
          >
            View on Higgsfield
            <ExternalLink className="size-3" />
          </a>
        </div>
      </div>
    </div>
  )
}
