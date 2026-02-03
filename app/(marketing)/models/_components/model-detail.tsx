"use client"

import { AnimatedButton } from "@/app/_components/animated-button"
import { cn } from "@/lib/utils"
import { getModelLogo } from "@/lib/model-logos"
import { Download, Heart, ExternalLink } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState, useMemo } from "react"
import type { ModelWithParsedTags } from "./model-grid"

interface ModelDetailProps {
  model: ModelWithParsedTags | null
  className?: string
}

// Check if a tag is irrelevant (arxiv IDs, license codes, etc.)
function isIrrelevantTag(tag: string): boolean {
  const lower = tag.toLowerCase()

  // arxiv IDs (e.g., arxiv:2305.14314)
  if (lower.startsWith("arxiv:")) return true

  // DOI patterns
  if (lower.startsWith("doi:") || lower.startsWith("10.")) return true

  // License identifiers (e.g., mit, apache-2.0, cc-by-4.0)
  if (/^(mit|apache|gpl|bsd|cc-|lgpl|agpl|mpl|isc|wtfpl|unlicense)/i.test(tag)) return true

  // Pure version numbers or dates (e.g., v1.0, 2023, 1.5.2)
  if (/^v?\d+(\.\d+)*$/.test(tag)) return true

  // Short codes that are just letters/numbers (2-3 chars like "en", "pt", "zh")
  if (tag.length <= 3 && /^[a-z0-9]+$/i.test(tag)) return true

  // Paper/dataset IDs that are mostly numbers
  if (/^\d{4}\.\d+$/.test(tag)) return true

  return false
}

// Separate meaningful tags from irrelevant ones
function filterTags(tags: string[]): { primary: string[]; hidden: string[] } {
  const primary: string[] = []
  const hidden: string[] = []

  for (const tag of tags) {
    if (isIrrelevantTag(tag)) {
      hidden.push(tag)
    } else {
      primary.push(tag)
    }
  }

  return { primary, hidden }
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

export function ModelDetail({ model, className }: ModelDetailProps) {
  // Use authorLogo from database, fallback to hardcoded logos
  const logoUrl = model ? (model.authorLogo || getModelLogo(model.author)) : null
  const [showAllTags, setShowAllTags] = useState(false)
  const [logoError, setLogoError] = useState(false)

  // Track model ID to reset state when model changes
  const [prevModelId, setPrevModelId] = useState<number | undefined>(model?.id)
  if (model?.id !== prevModelId) {
    setPrevModelId(model?.id)
    setLogoError(false)
    setShowAllTags(false)
  }

  // Only show logo if we have a URL and it hasn't failed to load
  const showLogo = logoUrl && !logoError

  // Filter tags: meaningful tags shown, irrelevant ones hidden
  const modelTags = model?.tags
  const { primary: primaryTags, hidden: hiddenTags } = useMemo(() => {
    if (!modelTags) return { primary: [], hidden: [] }
    return filterTags(modelTags)
  }, [modelTags])

  return (
    <AnimatePresence mode="wait">
      {model && (
        <motion.div
          key={model.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "",
            className
          )}
        >
          <div className="flex flex-col gap-6 pt-28">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 min-w-0">
                {showLogo && (
                  <div className="size-16 rounded-xl bg-white/5 flex items-center justify-center shrink-0 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logoUrl}
                      alt={model.author}
                      className="size-10 object-contain"
                      onError={() => setLogoError(true)}
                    />
                  </div>
                )}
                <div className="flex flex-col gap-2 min-w-0">
                  <p className="font-mono text-sm text-accent uppercase tracking-wider">
                    {model.author}
                  </p>
                  <h2 className="text-4xl font-regular text-white">
                    {model.name}
                  </h2>
                  {model.taskType && (
                    <p className="text-white/50">
                      {model.taskType.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Stats & Info */}
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col gap-1">
                <p className="font-mono text-xs text-white/40 uppercase">Downloads</p>
                <p className="text-xl font-medium text-white flex items-center gap-2">
                  <Download className="size-5 text-accent" />
                  {formatNumber(model.downloads || 0)}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-mono text-xs text-white/40 uppercase">Likes</p>
                <p className="text-xl font-medium text-white flex items-center gap-2">
                  <Heart className="size-5 text-accent" />
                  {formatNumber(model.likes || 0)}
                </p>
              </div>
              {model.parameterLabel && (
                <div className="flex flex-col gap-1">
                  <p className="font-mono text-xs text-white/40 uppercase">Parameters</p>
                  <p className="text-xl font-medium text-accent">
                    {model.parameterLabel}
                  </p>
                </div>
              )}
              {model.lastModified && (
                <div className="flex flex-col gap-1">
                  <p className="font-mono text-xs text-white/40 uppercase">Last Updated</p>
                  <p className="text-lg text-white/70">
                    {new Date(model.lastModified).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            {model.description && (
              <div className="flex flex-col gap-2">
                <p className="font-mono text-xs text-white/40 uppercase">Description</p>
                <p className="text-white/70 leading-relaxed">{model.description}</p>
              </div>
            )}

            {/* Tags */}
            {model.tags && model.tags.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="font-mono text-xs text-white/40 uppercase">Tags</p>
                <div className="flex flex-wrap gap-2 items-center">
                  {/* Primary tags (meaningful tags) */}
                  {primaryTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/5 text-white/60 text-sm rounded-md"
                    >
                      {tag}
                    </span>
                  ))}

                  {/* Hidden tags (arxiv IDs, license codes, etc.) - expandable */}
                  {hiddenTags.length > 0 && (
                    <>
                      <AnimatePresence>
                        {showAllTags && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="contents"
                          >
                            {hiddenTags.map((tag) => (
                              <motion.span
                                key={tag}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2 }}
                                className="px-3 py-1 bg-white/5 text-white/40 text-sm rounded-md"
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {!showAllTags && (
                        <button
                          onClick={() => setShowAllTags(true)}
                          className="text-white/30 text-sm hover:text-white/50 transition-colors"
                        >
                          +{hiddenTags.length}
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-4">
              {model.modelUrl && (
                <a href={model.modelUrl} target="_blank" rel="noopener noreferrer">
                  <AnimatedButton background="dark" className="gap-2 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span>View on Hugging Face</span>
                    <ExternalLink className="size-4" /></div>
                  </AnimatedButton>
                </a>
              )}
              <AnimatedButton background="primary">
                Deploy
              </AnimatedButton>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
