/**
 * HuggingFace Models Scraper Worker
 *
 * Runs on a schedule to fetch popular models from HuggingFace and store in D1.
 * Cron: Every 6 hours
 */

export interface Env {
  MODELS_DB: D1Database
}

const HF_API_BASE = "https://huggingface.co/api"

interface HFModel {
  _id: string
  id: string
  author?: string
  sha: string
  lastModified: string
  private: boolean
  disabled: boolean
  gated: boolean | "auto" | "manual"
  pipeline_tag?: string
  tags: string[]
  downloads: number
  likes: number
  library_name?: string
}

interface HFModelInfo {
  _id: string
  id: string
  author?: string
  sha: string
  lastModified: string
  private: boolean
  gated: boolean | "auto" | "manual"
  disabled: boolean
  pipeline_tag?: string
  tags: string[]
  downloads: number
  likes: number
  library_name?: string
  cardData?: {
    language?: string | string[]
    license?: string
    model_name?: string
    base_model?: string
  }
  config?: {
    model_type?: string
    num_parameters?: number
  }
  safetensors?: {
    parameters?: Record<string, number>
    total?: number
  }
}

// Task types we're interested in
const RELEVANT_TASK_TYPES = [
  "text-generation",
  "text2text-generation",
  "text-classification",
  "token-classification",
  "question-answering",
  "summarization",
  "translation",
  "image-classification",
  "image-to-text",
  "object-detection",
  "image-segmentation",
  "text-to-image",
  "image-to-image",
  "audio-classification",
  "automatic-speech-recognition",
  "text-to-speech",
  "feature-extraction",
  "sentence-similarity",
  "zero-shot-classification",
  "fill-mask",
]

// Popular model providers
const TOP_AUTHORS = [
  "meta-llama",
  "mistralai",
  "google",
  "microsoft",
  "openai",
  "anthropic",
  "Qwen",
  "deepseek-ai",
  "stabilityai",
  "HuggingFaceH4",
  "bigscience",
  "EleutherAI",
  "tiiuae",
  "01-ai",
  "databricks",
  "nvidia",
  "CohereForAI",
  "allenai",
  "facebook",
  "mosaicml",
  "NousResearch",
  "TheBloke",
  "huggingface",
  "sentence-transformers",
  "BAAI",
]

// Cache for author logos to avoid repeated API calls
const authorLogoCache = new Map<string, string | null>()

async function fetchAuthorLogo(author: string): Promise<string | null> {
  // Check cache first
  if (authorLogoCache.has(author)) {
    return authorLogoCache.get(author) || null
  }

  try {
    // Try organization endpoint first
    let response = await fetch(`${HF_API_BASE}/organizations/${author}`)

    if (!response.ok) {
      // Fall back to user endpoint
      response = await fetch(`${HF_API_BASE}/users/${author}`)
    }

    if (response.ok) {
      const data = await response.json() as { avatarUrl?: string }
      const logo = data.avatarUrl || null
      authorLogoCache.set(author, logo)
      return logo
    }
  } catch {
    // Ignore errors
  }

  authorLogoCache.set(author, null)
  return null
}

function parseParameterCount(model: HFModelInfo): { count: number | null; label: string | null } {
  // Try safetensors total first
  if (model.safetensors?.total) {
    const billions = model.safetensors.total / 1_000_000_000
    if (billions >= 1) {
      return { count: billions, label: `${billions.toFixed(1)}B` }
    }
    const millions = model.safetensors.total / 1_000_000
    return { count: billions, label: `${millions.toFixed(0)}M` }
  }

  // Try config
  if (model.config?.num_parameters) {
    const billions = model.config.num_parameters / 1_000_000_000
    if (billions >= 1) {
      return { count: billions, label: `${billions.toFixed(1)}B` }
    }
    const millions = model.config.num_parameters / 1_000_000
    return { count: billions, label: `${millions.toFixed(0)}M` }
  }

  // Try to parse from model name
  const nameMatch = model.id.match(/(\d+\.?\d*)[Bb]/i)
  if (nameMatch) {
    const billions = parseFloat(nameMatch[1])
    return { count: billions, label: `${billions}B` }
  }

  const millionMatch = model.id.match(/(\d+)[Mm]/i)
  if (millionMatch) {
    const millions = parseFloat(millionMatch[1])
    return { count: millions / 1000, label: `${millions}M` }
  }

  return { count: null, label: null }
}

async function fetchModels(limit = 100, sort = "downloads"): Promise<HFModel[]> {
  const url = new URL(`${HF_API_BASE}/models`)
  url.searchParams.set("limit", limit.toString())
  url.searchParams.set("sort", sort)
  url.searchParams.set("direction", "-1")
  url.searchParams.set("full", "true")

  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error(`Failed to fetch models: ${response.statusText}`)
  }

  return response.json()
}

async function fetchModelInfo(modelId: string): Promise<HFModelInfo | null> {
  try {
    const response = await fetch(`${HF_API_BASE}/models/${modelId}`)
    if (!response.ok) return null
    return response.json()
  } catch {
    return null
  }
}

async function scrapeAndStore(db: D1Database): Promise<{ success: boolean; count: number; error?: string }> {
  console.log("Starting HuggingFace models scrape...")

  try {
    const allModels: HFModelInfo[] = []
    const seenIds = new Set<string>()

    // Fetch top models by downloads
    console.log("Fetching top models by downloads...")
    const byDownloads = await fetchModels(200, "downloads")

    // Fetch top models by likes
    console.log("Fetching top models by likes...")
    const byLikes = await fetchModels(200, "likes")

    // Fetch trending models
    console.log("Fetching trending models...")
    const trending = await fetchModels(100, "trending")

    // Combine and dedupe
    const combined = [...byDownloads, ...byLikes, ...trending]

    for (const model of combined) {
      if (seenIds.has(model.id)) continue
      if (model.private || model.disabled) continue

      // Filter for relevant task types or popular authors
      const hasRelevantTask = model.pipeline_tag && RELEVANT_TASK_TYPES.includes(model.pipeline_tag)
      const isTopAuthor = model.author && TOP_AUTHORS.includes(model.author)

      if (!hasRelevantTask && !isTopAuthor) continue

      seenIds.add(model.id)

      // Fetch full model info
      const info = await fetchModelInfo(model.id)
      if (info) {
        allModels.push(info)
      }

      // Rate limit - be nice to HuggingFace API
      await new Promise((r) => setTimeout(r, 50))

      // Limit total models
      if (allModels.length >= 500) break
    }

    console.log(`Scraped ${allModels.length} models, fetching author logos...`)

    // Collect unique authors and fetch their logos
    const uniqueAuthors = new Set<string>()
    for (const model of allModels) {
      const [author] = model.id.split("/")
      if (author) uniqueAuthors.add(author)
    }

    console.log(`Fetching logos for ${uniqueAuthors.size} unique authors...`)
    for (const author of uniqueAuthors) {
      await fetchAuthorLogo(author)
      // Rate limit
      await new Promise((r) => setTimeout(r, 50))
    }

    console.log(`Inserting ${allModels.length} models into D1...`)

    // Insert/update models in D1
    const scrapedAt = new Date().toISOString()
    let insertedCount = 0

    for (const model of allModels) {
      const { count, label } = parseParameterCount(model)
      const [author, ...nameParts] = model.id.split("/")
      const authorLogo = authorLogoCache.get(author) || null

      try {
        await db
          .prepare(
            `INSERT OR REPLACE INTO huggingface_models
            (model_id, name, author, author_logo, description, task_type, pipeline_tag, downloads, likes, tags, parameter_count, parameter_label, model_url, last_modified, featured, scraped_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
          )
          .bind(
            model.id,
            nameParts.join("/") || model.id,
            author || "unknown",
            authorLogo,
            model.cardData?.model_name || null,
            model.pipeline_tag || null,
            model.pipeline_tag || null,
            model.downloads,
            model.likes,
            JSON.stringify(model.tags || []),
            count,
            label,
            `https://huggingface.co/${model.id}`,
            model.lastModified,
            model.downloads > 1_000_000 || model.likes > 10_000 ? 1 : 0,
            scrapedAt
          )
          .run()

        insertedCount++
      } catch (err) {
        console.error(`Failed to insert model ${model.id}:`, err)
      }
    }

    console.log(`Successfully inserted/updated ${insertedCount} models`)

    return { success: true, count: insertedCount }
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unknown error"
    console.error("Scrape failed:", error)
    return { success: false, count: 0, error }
  }
}

export default {
  // Handle scheduled cron trigger
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    console.log(`Cron triggered at ${new Date(event.scheduledTime).toISOString()}`)

    ctx.waitUntil(
      scrapeAndStore(env.MODELS_DB).then((result) => {
        console.log("Scrape result:", result)
      })
    )
  },

  // Optional: HTTP handler for manual triggers
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === "/scrape" && request.method === "POST") {
      // Check for secret header to prevent unauthorized triggers
      const authHeader = request.headers.get("Authorization")
      if (authHeader !== `Bearer ${env.SCRAPER_SECRET}`) {
        return new Response("Unauthorized", { status: 401 })
      }

      const result = await scrapeAndStore(env.MODELS_DB)
      return Response.json(result)
    }

    return new Response("HuggingFace Scraper Worker", { status: 200 })
  },
} satisfies ExportedHandler<Env & { SCRAPER_SECRET?: string }>
