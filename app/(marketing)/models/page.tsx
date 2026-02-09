"use client"

import { Suspense, useCallback, useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { getInitialModels } from "@/lib/model-cache"
import { ModelSearch } from "./_components/model-search"
import { ModelFilters, SIZE_OPTIONS } from "./_components/model-filters"
import { ModelGrid, type ModelWithParsedTags } from "./_components/model-grid"
import { ModelDetail } from "./_components/model-detail"
import { BlogPagination } from "../blogs/_components/blog-pagination"
import CallToActionNew from "@/app/_components/call-to-action-new"

interface ModelsResponse {
  models: ModelWithParsedTags[]
  total: number
  limit: number
  offset: number
  filters: {
    taskTypes: string[]
    authors: string[]
    sizes: string[]
  }
}

function ModelsContent() {
  const searchParams = useSearchParams()
  const initialCache = getInitialModels()
  const [models, setModels] = useState<ModelWithParsedTags[]>(
    (initialCache.cached?.models as ModelWithParsedTags[]) ?? []
  )
  const [selectedModel, setSelectedModel] = useState<ModelWithParsedTags | null>(null)
  const [isLoading, setIsLoading] = useState(!initialCache.cached)
  const [isPaginating, setIsPaginating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const detailRef = useRef<HTMLDivElement>(null)
  const hasAutoSelected = useRef(false)
  const isInitialLoad = useRef(!initialCache.cached)
  const usedCache = useRef(!!initialCache.cached)

  // URL params
  const selectedId = searchParams.get("selected")
  const prevSelectedId = useRef(selectedId)

  // Filter state (not synced from URL - search bar stays empty)
  const [search, setSearch] = useState("")
  const [taskType, setTaskType] = useState<string | null>(null)
  const [author, setAuthor] = useState<string | null>(null)
  const [size, setSize] = useState<string | null>(null)

  // Reset auto-select when selected param changes
  useEffect(() => {
    if (selectedId !== prevSelectedId.current) {
      prevSelectedId.current = selectedId
      hasAutoSelected.current = false
    }
  }, [selectedId])

  // Available filter options
  const [taskTypes, setTaskTypes] = useState<string[]>(initialCache.cached?.filters?.taskTypes ?? [])
  const [authors, setAuthors] = useState<string[]>(initialCache.cached?.filters?.authors ?? [])
  const [availableSizes, setAvailableSizes] = useState<string[]>(initialCache.cached?.filters?.sizes ?? [])

  // Pagination (4x5 grid = 20 items per page)
  const [total, setTotal] = useState(initialCache.cached?.total ?? 0)
  const [offset, setOffset] = useState(0)
  const limit = 20

  const fetchModels = useCallback(async () => {
    // Skip first fetch if we already have cached data
    if (usedCache.current) {
      usedCache.current = false
      return
    }

    // Only show full loading state on initial load, use subtle indicator for pagination
    if (isInitialLoad.current) {
      setIsLoading(true)
    } else {
      setIsPaginating(true)
    }
    setError(null)

    try {
      const params = new URLSearchParams()
      if (search) params.set("search", search)
      if (taskType) params.set("taskType", taskType)
      if (author) params.set("author", author)

      if (size) {
        const sizeOption = SIZE_OPTIONS.find(s => s.value === size)
        if (sizeOption) {
          if (sizeOption.minParams !== null) params.set("minParams", sizeOption.minParams.toString())
          if (sizeOption.maxParams !== null) params.set("maxParams", sizeOption.maxParams.toString())
        }
      }

      params.set("limit", limit.toString())
      params.set("offset", offset.toString())

      const response = await fetch(`/api/models?${params.toString()}`)
      if (!response.ok) throw new Error("Failed to fetch models")

      const data: ModelsResponse = await response.json()
      setModels(data.models)
      setTotal(data.total)
      setTaskTypes(data.filters.taskTypes)
      setAuthors(data.filters.authors)
      setAvailableSizes(data.filters.sizes)

      // Clear filters that are no longer available in scoped results
      if (taskType && !data.filters.taskTypes.includes(taskType)) setTaskType(null)
      if (author && !data.filters.authors.includes(author)) setAuthor(null)
      if (size && !data.filters.sizes.includes(size)) setSize(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
      setIsPaginating(false)
      isInitialLoad.current = false
    }
  }, [search, taskType, author, size, offset])

  useEffect(() => {
    fetchModels()
  }, [fetchModels])

  // Reset offset when filters change
  useEffect(() => {
    setOffset(0)
  }, [search, taskType, author, size])

  // Fetch and auto-select model when coming from URL with selected param
  useEffect(() => {
    if (!selectedId || hasAutoSelected.current) return

    const fetchSelectedModel = async () => {
      // First check if it's already in current models
      const existingModel = models.find(m => m.id === parseInt(selectedId))
      if (existingModel) {
        hasAutoSelected.current = true
        setSelectedModel(existingModel)
        setTimeout(() => {
          const lenis = window.__lenis
          if (lenis && detailRef.current) {
            lenis.scrollTo(detailRef.current)
          } else {
            detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        }, 100)
        return
      }

      // If not loaded yet and we're still loading, wait
      if (isLoading) return

      // Fetch the specific model by searching for it
      try {
        const response = await fetch(`/api/models/${selectedId}`)
        if (response.ok) {
          const model = await response.json() as ModelWithParsedTags
          hasAutoSelected.current = true
          setSelectedModel({ ...model, tags: model.tags || [] })
          setTimeout(() => {
            const lenis = window.__lenis
            if (lenis && detailRef.current) {
              lenis.scrollTo(detailRef.current)
            } else {
              detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
          }, 100)
        }
      } catch (err) {
        console.error("Failed to fetch selected model:", err)
      }
    }

    fetchSelectedModel()
  }, [isLoading, models, selectedId])

  const handleSelectModel = useCallback((model: ModelWithParsedTags) => {
    const isDeselecting = selectedModel?.id === model.id
    setSelectedModel(prev => prev?.id === model.id ? null : model)

    // Scroll to detail section when selecting a model
    if (!isDeselecting) {
      setTimeout(() => {
        const lenis = window.__lenis
        if (lenis && detailRef.current) {
          lenis.scrollTo(detailRef.current)
        } else {
          detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 100)
    }
  }, [selectedModel?.id])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-viewport w-full mx-auto px-5 py-12 md:py-20 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <p className="font-mono text-sm text-accent uppercase tracking-wider">Model Foundry</p>
          <h1 className="title text-white">
            Browse AI Models
          </h1>
          <p className="text-white/60 max-w-2xl mt-2">
            Explore and deploy hundreds of pre-trained models from Hugging Face.
            Filter by task type, model size, or search for specific architectures.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col gap-4">
          <ModelSearch
            value={search}
            onChange={setSearch}
            className="max-w-xl"
          />
          <ModelFilters
            taskTypes={taskTypes}
            authors={authors}
            availableSizes={availableSizes}
            selectedTaskType={taskType}
            selectedAuthor={author}
            selectedSize={size}
            search={search}
            onTaskTypeChange={setTaskType}
            onAuthorChange={setAuthor}
            onSizeChange={setSize}
            onSearchChange={setSearch}
          />
        </div>

        {/* Results info */}
        {!isLoading && !error && (
          <p className="text-sm text-white/40">
            Showing {models.length} of {total} models
          </p>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
            {error}
          </div>
        )}

        {/* Model Grid */}
        <ModelGrid
          models={models}
          selectedModelId={selectedModel?.id ?? null}
          onSelectModel={handleSelectModel}
          isLoading={isLoading}
          isPaginating={isPaginating}
        />

        {/* Pagination */}
        {!isLoading && total > limit && (
          <div className="flex items-center justify-center">
            <BlogPagination
              currentPage={Math.floor(offset / limit)}
              totalPages={Math.ceil(total / limit)}
              onPageChange={(page) => setOffset(page * limit)}
            />
          </div>
        )}

        {/* Selected Model Detail */}
        <div ref={detailRef}>
          <ModelDetail
            model={selectedModel}
          />
        </div>
      </div>

      <CallToActionNew />
    </div>
  )
}

export default function ModelsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ModelsContent />
    </Suspense>
  )
}
