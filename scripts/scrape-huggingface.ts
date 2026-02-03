/**
 * HuggingFace Models Scraper
 *
 * Fetches popular models from the HuggingFace API and stores them in D1.
 * Run locally: pnpm scrape:models
 *
 * For production, set up a Cloudflare Worker scheduled trigger or cron job.
 */

const HF_API_BASE = "https://huggingface.co/api"

interface HFModel {
  _id: string
  id: string // e.g., "meta-llama/Llama-3.3-70B-Instruct"
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
  modelId?: string
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
]

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

async function scrapeModels() {
  console.log("Starting HuggingFace models scrape...")

  const allModels: HFModelInfo[] = []
  const seenIds = new Set<string>()

  // Fetch top models by downloads
  console.log("Fetching top models by downloads...")
  const byDownloads = await fetchModels(200, "downloads")

  // Fetch top models by likes
  console.log("Fetching top models by likes...")
  const byLikes = await fetchModels(200, "likes")

  // Combine and dedupe
  const combined = [...byDownloads, ...byLikes]

  for (const model of combined) {
    if (seenIds.has(model.id)) continue
    if (model.private || model.disabled) continue

    // Filter for relevant task types or popular authors
    const hasRelevantTask = model.pipeline_tag && RELEVANT_TASK_TYPES.includes(model.pipeline_tag)
    const isTopAuthor = model.author && TOP_AUTHORS.includes(model.author)

    if (!hasRelevantTask && !isTopAuthor) continue

    seenIds.add(model.id)

    // Fetch full model info
    console.log(`Fetching info for ${model.id}...`)
    const info = await fetchModelInfo(model.id)
    if (info) {
      allModels.push(info)
    }

    // Rate limit
    await new Promise((r) => setTimeout(r, 100))

    // Limit total models
    if (allModels.length >= 500) break
  }

  console.log(`Scraped ${allModels.length} models`)

  // Transform to our schema
  const transformed = allModels.map((model) => {
    const { count, label } = parseParameterCount(model)
    const [author, ...nameParts] = model.id.split("/")

    return {
      modelId: model.id,
      name: nameParts.join("/") || model.id,
      author: author || "unknown",
      description: model.cardData?.model_name || null,
      taskType: model.pipeline_tag || null,
      pipelineTag: model.pipeline_tag || null,
      downloads: model.downloads,
      likes: model.likes,
      tags: JSON.stringify(model.tags || []),
      parameterCount: count,
      parameterLabel: label,
      modelUrl: `https://huggingface.co/${model.id}`,
      lastModified: model.lastModified,
      featured: (model.downloads > 1_000_000 || model.likes > 10_000) ? 1 : 0,
      scrapedAt: new Date().toISOString(),
    }
  })

  // Output as JSON for manual import or write to D1
  // For local development, we'll output SQL statements
  console.log("\n--- SQL INSERT STATEMENTS ---\n")

  for (const model of transformed) {
    const sql = `INSERT OR REPLACE INTO huggingface_models
      (model_id, name, author, description, task_type, pipeline_tag, downloads, likes, tags, parameter_count, parameter_label, model_url, last_modified, featured, scraped_at)
      VALUES (
        '${model.modelId.replace(/'/g, "''")}',
        '${model.name.replace(/'/g, "''")}',
        '${model.author.replace(/'/g, "''")}',
        ${model.description ? `'${model.description.replace(/'/g, "''")}'` : "NULL"},
        ${model.taskType ? `'${model.taskType}'` : "NULL"},
        ${model.pipelineTag ? `'${model.pipelineTag}'` : "NULL"},
        ${model.downloads},
        ${model.likes},
        '${model.tags.replace(/'/g, "''")}',
        ${model.parameterCount ?? "NULL"},
        ${model.parameterLabel ? `'${model.parameterLabel}'` : "NULL"},
        '${model.modelUrl}',
        '${model.lastModified}',
        ${model.featured},
        '${model.scrapedAt}'
      );`
    console.log(sql)
  }

  // Also output JSON for reference
  const outputPath = "./scraped-models.json"
  const fs = await import("fs")
  fs.writeFileSync(outputPath, JSON.stringify(transformed, null, 2))
  console.log(`\nJSON output written to ${outputPath}`)

  return transformed
}

// Run if called directly
scrapeModels().catch(console.error)
