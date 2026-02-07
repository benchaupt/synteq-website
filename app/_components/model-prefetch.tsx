"use client"

import { useEffect } from "react"
import { prefetchFeaturedModels, prefetchInitialModels } from "@/lib/model-cache"

export function ModelPrefetch() {
  useEffect(() => {
    prefetchFeaturedModels()
    prefetchInitialModels()
  }, [])
  return null
}
