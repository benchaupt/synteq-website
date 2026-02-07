interface CachedModel {
  id: number
  name: string
  author: string
  authorLogo?: string | null
  taskType?: string | null
  tags?: string[]
}

interface ModelsResponse {
  models: CachedModel[]
  total: number
  limit: number
  offset: number
  filters: {
    taskTypes: string[]
    authors: string[]
    sizes: string[]
  }
}

let featuredPromise: Promise<CachedModel[]> | null = null
let featuredModels: CachedModel[] | null = null

let initialModelsPromise: Promise<ModelsResponse> | null = null
let initialModelsData: ModelsResponse | null = null

export function prefetchFeaturedModels() {
  if (featuredPromise) return featuredPromise
  featuredPromise = fetch("/api/models?featured=true&limit=16")
    .then((res) => {
      if (!res.ok) return Promise.reject()
      return res.json() as Promise<ModelsResponse>
    })
    .then((data) => {
      featuredModels = data.models
      return data.models
    })
    .catch(() => {
      featuredPromise = null
      return [] as CachedModel[]
    })
  return featuredPromise
}

export function getFeaturedModels(): {
  cached: CachedModel[] | null
  promise: Promise<CachedModel[]>
} {
  if (featuredModels) return { cached: featuredModels, promise: Promise.resolve(featuredModels) }
  const promise = prefetchFeaturedModels()
  return { cached: null, promise }
}

export function prefetchInitialModels() {
  if (initialModelsPromise) return initialModelsPromise
  initialModelsPromise = fetch("/api/models?limit=20")
    .then((res) => {
      if (!res.ok) return Promise.reject()
      return res.json() as Promise<ModelsResponse>
    })
    .then((data) => {
      initialModelsData = data
      return data
    })
    .catch(() => {
      initialModelsPromise = null
      return null as unknown as ModelsResponse
    })
  return initialModelsPromise
}

export function getInitialModels(): {
  cached: ModelsResponse | null
  promise: Promise<ModelsResponse>
} {
  if (initialModelsData) return { cached: initialModelsData, promise: Promise.resolve(initialModelsData) }
  const promise = prefetchInitialModels()
  return { cached: null, promise }
}
