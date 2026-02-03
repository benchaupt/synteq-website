'use client'

import { useEffect, useState } from 'react'
import { Download, Heart, ExternalLink, Cpu } from 'lucide-react'
import { CornerCard } from '@/app/_components/corner-card'
import { AnimatedButton } from '@/app/_components/animated-button'
import { getModelLogo } from '@/lib/model-logos'
import Link from 'next/link'

export type AIModelBlockProps = {
  modelId: string
  showStats?: boolean
  showTags?: boolean
  linkToModels?: boolean
  ctaText?: string
  blockType: 'aiModel'
}

type Props = AIModelBlockProps & {
  className?: string
}

interface ModelData {
  id: number
  modelId: string
  name: string
  author: string
  authorLogo?: string | null
  description?: string | null
  taskType?: string | null
  downloads?: number
  likes?: number
  tags?: string[]
  parameterLabel?: string | null
  modelUrl?: string | null
}

function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`
  }
  return num.toString()
}

export function AIModelBlock({
  className,
  modelId,
  showStats = true,
  showTags = true,
  linkToModels = true,
  ctaText,
}: Props) {
  const [modelData, setModelData] = useState<ModelData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchModel = async () => {
      try {
        // First try to fetch from our API
        const response = await fetch(`/api/models?search=${encodeURIComponent(modelId)}&limit=1`)
        if (response.ok) {
          const data = await response.json() as { models?: ModelData[] }
          if (data.models && data.models.length > 0) {
            // Find exact match
            const exactMatch = data.models.find((m) => m.modelId === modelId)
            if (exactMatch) {
              setModelData(exactMatch)
              setLoading(false)
              return
            }
          }
        }

        // Fallback: parse the model ID and show basic info
        const [author, name] = modelId.split('/')
        if (author && name) {
          setModelData({
            id: 0,
            modelId,
            name,
            author,
            modelUrl: `https://huggingface.co/${modelId}`,
          })
        } else {
          setError('Invalid model ID format')
        }
      } catch {
        setError('Failed to load model data')
      } finally {
        setLoading(false)
      }
    }

    fetchModel()
  }, [modelId])

  if (loading) {
    return (
      <div className={['not-prose', className].filter(Boolean).join(' ')}>
        <CornerCard className="animate-pulse">
          <div className="flex items-center gap-4 mb-4">
            <div className="size-12 bg-white/10 rounded-lg" />
            <div className="flex-1">
              <div className="h-4 w-24 bg-white/10 rounded mb-2" />
              <div className="h-6 w-48 bg-white/10 rounded" />
            </div>
          </div>
          <div className="h-4 w-full bg-white/10 rounded" />
        </CornerCard>
      </div>
    )
  }

  if (error || !modelData) {
    return (
      <div className={['not-prose', className].filter(Boolean).join(' ')}>
        <a
          href={`https://huggingface.co/${modelId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <CornerCard className="relative">
            {/* HuggingFace logo - top right */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logos/huggingface-logo.svg"
              alt="HuggingFace"
              className="absolute top-6 right-6 md:top-8 md:right-8 size-6 opacity-50 invert"
            />
            <div className="flex items-center gap-3 pr-8">
              <Cpu className="size-8 text-accent" />
              <div className="flex-1">
                <p className="font-mono text-white">{modelId}</p>
                <p className="text-sm text-white/50">View on HuggingFace</p>
              </div>
              <ExternalLink className="size-5 text-white/30" />
            </div>
          </CornerCard>
        </a>
      </div>
    )
  }

  const logoUrl = modelData.authorLogo || getModelLogo(modelData.author)

  // Use database ID for auto-selection, fallback to search if no ID
  const modelUrl = modelData.id ? `/models?selected=${modelData.id}` : `/models?search=${encodeURIComponent(modelData.name)}`

  return (
    <div className={['not-prose', className].filter(Boolean).join(' ')}>
      <CornerCard className="!p-0 overflow-hidden relative">
        {/* Main clickable area */}
        <Link href={modelUrl} className="block group/card">
          {/* HuggingFace logo and param size - top right, vertically centered */}
          <div className="absolute top-6 right-6 md:top-8 md:right-8 flex items-center gap-3">
            {modelData.parameterLabel && (
              <span className="text-accent text-sm font-mono">
                {modelData.parameterLabel}
              </span>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logos/huggingface-logo.svg"
              alt="HuggingFace"
              className="size-6 opacity-50 invert"
            />
          </div>
          <div className="p-6 md:p-8">
            <div className="flex items-start gap-4">
              {/* Logo */}
              <div className="size-14 rounded-xl bg-white/5 flex items-center justify-center shrink-0 overflow-hidden">
                {logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logoUrl}
                    alt={modelData.author}
                    className="size-8 object-contain"
                  />
                ) : (
                  <Cpu className="size-7 text-accent" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pr-16">
                <div className="mb-2">
                  <p className="text-xs font-mono text-accent uppercase tracking-wider mb-1">
                    {modelData.author}
                  </p>
                  <h3 className="text-xl font-regular text-white group-hover/card:text-accent transition-colors">
                    {modelData.name}
                  </h3>
                </div>

                {modelData.taskType && (
                  <p className="text-sm text-white/50 mb-3">
                    {modelData.taskType.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </p>
                )}

                {modelData.description && (
                  <p className="text-sm text-white/60 line-clamp-2 mb-4">
                    {modelData.description}
                  </p>
                )}

                {showStats && (modelData.downloads || modelData.likes) && (
                  <div className="flex items-center gap-4 text-sm text-white/50 mb-4">
                    {modelData.downloads !== undefined && (
                      <span className="flex items-center gap-1.5">
                        <Download className="size-4" />
                        {formatNumber(modelData.downloads)}
                      </span>
                    )}
                    {modelData.likes !== undefined && (
                      <span className="flex items-center gap-1.5">
                        <Heart className="size-4" />
                        {formatNumber(modelData.likes)}
                      </span>
                    )}
                  </div>
                )}

                {showTags && modelData.tags && modelData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {modelData.tags.slice(0, 5).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-white/5 text-white/40 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {modelData.tags.length > 5 && (
                      <span className="px-2 py-0.5 text-white/30 text-xs">
                        +{modelData.tags.length - 5}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>

        {/* Actions - separate from card click */}
        <div className="px-6 md:px-8 py-4 border-t border-white/10 flex items-center justify-between gap-4">
          <a
            href={modelData.modelUrl || `https://huggingface.co/${modelId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/50 hover:text-accent transition-colors flex items-center gap-1"
          >
            View on Hugging Face
            <ExternalLink className="size-3.5" />
          </a>

          {linkToModels && (
            <Link href={modelUrl}>
              <AnimatedButton background="primary">
                {ctaText || 'Deploy Model'}
              </AnimatedButton>
            </Link>
          )}
        </div>
      </CornerCard>
    </div>
  )
}
