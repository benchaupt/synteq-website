"use client"

import { AnimatedCard } from "@/app/_components/animated-card"
import { cn } from "@/lib/utils"
import { getModelLogo } from "@/lib/model-logos"
import { Download, Heart } from "lucide-react"
import { useState } from "react"
import type { HuggingFaceModel } from "@/db/schema"

type ModelWithParsedTags = Omit<HuggingFaceModel, "tags"> & { tags: string[] }

interface ModelCardProps {
  model: ModelWithParsedTags
  isSelected: boolean
  onClick: () => void
}

export function ModelCardSkeleton() {
  return (
    <div className="bg-background-secondary border border-white/5 rounded-xl p-5">
      <div className="flex flex-col gap-3 animate-pulse">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-3 w-16 bg-white/10 rounded" />
            <div className="h-5 w-3/4 bg-white/10 rounded" />
          </div>
          <div className="h-6 w-12 bg-white/10 rounded" />
        </div>

        {/* Task type */}
        <div className="h-4 w-1/2 bg-white/10 rounded" />

        {/* Stats */}
        <div className="flex items-center gap-4">
          <div className="h-4 w-14 bg-white/10 rounded" />
          <div className="h-4 w-14 bg-white/10 rounded" />
        </div>

        {/* Tags */}
        <div className="flex gap-1.5 mt-1">
          <div className="h-5 w-12 bg-white/10 rounded" />
          <div className="h-5 w-16 bg-white/10 rounded" />
          <div className="h-5 w-10 bg-white/10 rounded" />
        </div>
      </div>
    </div>
  )
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

export function ModelCard({ model, isSelected, onClick }: ModelCardProps) {
  // Use authorLogo from database, fallback to hardcoded logos
  const logoUrl = model.authorLogo || getModelLogo(model.author)
  const [logoError, setLogoError] = useState(false)

  // Only show logo if we have a URL and it hasn't failed to load
  const showLogo = logoUrl && !logoError

  return (
    <button onClick={onClick} className="text-left w-full">
      <AnimatedCard
        className="cursor-pointer"
        isActive={isSelected}
        disableScale
      >
        <div className="flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-3 min-w-0">
              {showLogo && (
                <div className="size-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logoUrl}
                    alt={model.author}
                    className="size-6 object-contain"
                    onError={() => setLogoError(true)}
                  />
                </div>
              )}
              <div className="flex flex-col gap-1 min-w-0">
                <p className="font-mono text-xs text-accent uppercase tracking-wider truncate">
                  {model.author}
                </p>
                <h3 className={cn(
                  "font-medium text-lg transition-colors truncate",
                  isSelected ? "text-white" : "text-white/80 group-hover/card:text-white"
                )}>
                  {model.name}
                </h3>
              </div>
            </div>
            {model.parameterLabel && (
              <span className="shrink-0 px-2 py-1 bg-accent/10 text-accent text-xs font-mono rounded">
                {model.parameterLabel}
              </span>
            )}
          </div>

          {/* Task type - always reserve space */}
          <p className={cn("text-sm truncate h-5", model.taskType ? "text-white/50" : "invisible")}>
            {model.taskType ? model.taskType.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : "-"}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-white/40">
            <span className="flex items-center gap-1.5">
              <Download className="size-4" />
              {formatNumber(model.downloads || 0)}
            </span>
            <span className="flex items-center gap-1.5">
              <Heart className="size-4" />
              {formatNumber(model.likes || 0)}
            </span>
          </div>

          {/* Tags - single line, always show +X count */}
          <div className="flex gap-1.5 h-6 items-center">
            {model.tags && model.tags.length > 0 ? (
              <>
                {/* Show max 2 tags to always leave room for +X */}
                {model.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-white/5 text-white/40 text-xs rounded whitespace-nowrap truncate max-w-24"
                  >
                    {tag}
                  </span>
                ))}
                {model.tags.length > 2 && (
                  <span className="px-2 py-0.5 text-white/30 text-xs whitespace-nowrap shrink-0">
                    +{model.tags.length - 2}
                  </span>
                )}
              </>
            ) : (
              <span className="invisible px-2 py-0.5 text-xs">-</span>
            )}
          </div>
        </div>
      </AnimatedCard>
    </button>
  )
}
