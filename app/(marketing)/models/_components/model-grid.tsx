"use client"

import { cn } from "@/lib/utils"
import { ModelCard, ModelCardSkeleton } from "./model-card"
import type { HuggingFaceModel } from "@/db/schema"
import { motion } from "motion/react"

export type ModelWithParsedTags = Omit<HuggingFaceModel, "tags"> & { tags: string[] }

interface ModelGridProps {
  models: ModelWithParsedTags[]
  selectedModelId: number | null
  onSelectModel: (model: ModelWithParsedTags) => void
  isLoading?: boolean
  isPaginating?: boolean
  className?: string
}

const SKELETON_COUNT = 20
const MOBILE_SKELETON_COUNT = 12

export function ModelGrid({
  models,
  selectedModelId,
  onSelectModel,
  isLoading,
  isPaginating,
  className,
}: ModelGridProps) {
  if (models.length === 0 && !isLoading) {
    return (
      <div className={cn("flex flex-col items-center justify-center py-20 text-white/40", className)}>
        <p className="text-lg">No models found</p>
        <p className="text-sm mt-1">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className={cn(
      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
      // Align items to start so cards don't stretch when grid has empty space
      "items-start",
      // Dim content during pagination
      isPaginating && "opacity-50 pointer-events-none",
      "transition-opacity duration-200",
      className
    )}>
      {isLoading ? (
        // Skeleton loading state (only on initial load)
        Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <motion.div
            key={`skeleton-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: i * 0.03 }}
            // Hide extra skeletons on mobile (show only 12)
            className={cn(i >= MOBILE_SKELETON_COUNT && "hidden sm:block")}
          >
            <ModelCardSkeleton />
          </motion.div>
        ))
      ) : (
        // Actual content
        models.map((model, i) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: i * 0.02 }}
            // Hide extra models on mobile (show only 12)
            className={cn(i >= MOBILE_SKELETON_COUNT && "hidden sm:block")}
          >
            <ModelCard
              model={model}
              isSelected={selectedModelId === model.id}
              onClick={() => onSelectModel(model)}
            />
          </motion.div>
        ))
      )}
    </div>
  )
}
