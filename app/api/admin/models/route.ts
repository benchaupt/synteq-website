import { getCloudflareContext } from "@opennextjs/cloudflare"
import { createDb, huggingFaceModels } from "@/db"
import { eq, sql } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

const HF_API_BASE = "https://huggingface.co/api"

interface HFAuthorInfo {
  avatarUrl?: string
}

// Fetch author avatar from HuggingFace (tries organizations first, then users)
async function fetchHuggingFaceAvatar(author: string): Promise<string | null> {
  try {
    // Try as organization first (needs /overview suffix)
    const orgResponse = await fetch(`${HF_API_BASE}/organizations/${author}/overview`)
    if (orgResponse.ok) {
      const orgData: HFAuthorInfo = await orgResponse.json()
      if (orgData.avatarUrl) {
        return orgData.avatarUrl
      }
    }

    // Try as user (needs /overview suffix)
    const userResponse = await fetch(`${HF_API_BASE}/users/${author}/overview`)
    if (userResponse.ok) {
      const userData: HFAuthorInfo = await userResponse.json()
      if (userData.avatarUrl) {
        return userData.avatarUrl
      }
    }

    return null
  } catch (error) {
    console.error(`Failed to fetch avatar for ${author}:`, error)
    return null
  }
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

function parseParameterCount(model: HFModelInfo): { count: number | null; label: string | null } {
  if (model.safetensors?.total) {
    const billions = model.safetensors.total / 1_000_000_000
    if (billions >= 1) {
      return { count: billions, label: `${billions.toFixed(1)}B` }
    }
    const millions = model.safetensors.total / 1_000_000
    return { count: billions, label: `${millions.toFixed(0)}M` }
  }

  if (model.config?.num_parameters) {
    const billions = model.config.num_parameters / 1_000_000_000
    if (billions >= 1) {
      return { count: billions, label: `${billions.toFixed(1)}B` }
    }
    const millions = model.config.num_parameters / 1_000_000
    return { count: billions, label: `${millions.toFixed(0)}M` }
  }

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

// GET - Fetch a single model by ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 })
    }

    const cloudflare = await getCloudflareContext({ async: true })
    const d1 = cloudflare.env.MODELS_DB as D1Database
    const db = createDb(d1)

    const [model] = await db
      .select()
      .from(huggingFaceModels)
      .where(eq(huggingFaceModels.id, parseInt(id)))

    if (!model) {
      return NextResponse.json({ error: "Model not found" }, { status: 404 })
    }

    return NextResponse.json({
      ...model,
      tags: model.tags ? JSON.parse(model.tags) : [],
    })
  } catch (error) {
    console.error("Error fetching model:", error)
    return NextResponse.json({ error: "Failed to fetch model" }, { status: 500 })
  }
}

// POST - Import a model from HuggingFace
export async function POST(request: NextRequest) {
  try {
    const { modelId } = (await request.json()) as { modelId?: string }

    if (!modelId || typeof modelId !== "string") {
      return NextResponse.json({ error: "modelId is required" }, { status: 400 })
    }

    // Fetch model info from HuggingFace
    const response = await fetch(`${HF_API_BASE}/models/${modelId}`)
    if (!response.ok) {
      return NextResponse.json({ error: "Model not found on HuggingFace" }, { status: 404 })
    }

    const hfModel: HFModelInfo = await response.json()
    const { count, label } = parseParameterCount(hfModel)
    const [author, ...nameParts] = hfModel.id.split("/")

    const cloudflare = await getCloudflareContext({ async: true })
    const d1 = cloudflare.env.MODELS_DB as D1Database
    const db = createDb(d1)

    // Check if any existing model from this author has a logo or priority status
    const [existingAuthorModel] = await db
      .select({
        authorLogo: huggingFaceModels.authorLogo,
        priorityAuthor: huggingFaceModels.priorityAuthor,
      })
      .from(huggingFaceModels)
      .where(eq(huggingFaceModels.author, author || "unknown"))
      .limit(1)

    // Priority: 1) Existing custom logo, 2) Fetch from HuggingFace
    let authorLogo = existingAuthorModel?.authorLogo || null
    if (!authorLogo && author) {
      authorLogo = await fetchHuggingFaceAvatar(author)
    }

    // Auto-feature if author is marked as priority
    const isPriorityAuthor = existingAuthorModel?.priorityAuthor || false

    // Insert or update the model
    const modelData = {
      modelId: hfModel.id,
      name: nameParts.join("/") || hfModel.id,
      author: author || "unknown",
      authorLogo, // Auto-apply existing logo for this author
      description: hfModel.cardData?.model_name || null,
      taskType: hfModel.pipeline_tag || null,
      pipelineTag: hfModel.pipeline_tag || null,
      downloads: hfModel.downloads,
      likes: hfModel.likes,
      tags: JSON.stringify(hfModel.tags || []),
      parameterCount: count,
      parameterLabel: label,
      modelUrl: `https://huggingface.co/${hfModel.id}`,
      lastModified: hfModel.lastModified,
      featured: isPriorityAuthor, // Auto-feature if author is priority
      priorityAuthor: isPriorityAuthor, // Inherit priority status
      scrapedAt: new Date().toISOString(),
    }

    await db.insert(huggingFaceModels)
      .values(modelData)
      .onConflictDoUpdate({
        target: huggingFaceModels.modelId,
        set: {
          ...modelData,
          // Preserve these fields on re-import
          featured: sql`${huggingFaceModels.featured}`,
          authorLogo: sql`${huggingFaceModels.authorLogo}`,
        },
      })

    // Fetch the inserted/updated model
    const [insertedModel] = await db
      .select()
      .from(huggingFaceModels)
      .where(eq(huggingFaceModels.modelId, hfModel.id))

    return NextResponse.json({
      success: true,
      model: insertedModel,
      message: `Model ${hfModel.id} imported successfully`
    })
  } catch (error) {
    console.error("Error importing model:", error)
    return NextResponse.json({ error: "Failed to import model" }, { status: 500 })
  }
}

interface PatchBody {
  id?: number
  featured?: boolean
  priorityAuthor?: boolean
  name?: string
  description?: string | null
  authorLogo?: string | null
}

// PATCH - Update model fields directly
export async function PATCH(request: NextRequest) {
  try {
    const body = (await request.json()) as PatchBody
    const { id, featured, priorityAuthor, name, description, authorLogo } = body

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 })
    }

    const cloudflare = await getCloudflareContext({ async: true })
    const d1 = cloudflare.env.MODELS_DB as D1Database
    const db = createDb(d1)

    const updates: Partial<typeof huggingFaceModels.$inferInsert> = {}

    if (typeof featured === "boolean") {
      updates.featured = featured
    }
    if (typeof priorityAuthor === "boolean") {
      updates.priorityAuthor = priorityAuthor
    }
    if (name !== undefined) {
      updates.name = name
    }
    if (description !== undefined) {
      updates.description = description
    }
    if (authorLogo !== undefined) {
      updates.authorLogo = authorLogo
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No valid updates provided" }, { status: 400 })
    }

    await db
      .update(huggingFaceModels)
      .set(updates)
      .where(eq(huggingFaceModels.id, id))

    const [updatedModel] = await db
      .select()
      .from(huggingFaceModels)
      .where(eq(huggingFaceModels.id, id))

    return NextResponse.json({ success: true, model: updatedModel })
  } catch (error) {
    console.error("Error updating model:", error)
    return NextResponse.json({ error: "Failed to update model" }, { status: 500 })
  }
}

// PUT - Re-sync model from HuggingFace (preserves name, logo, featured)
export async function PUT(request: NextRequest) {
  try {
    const { id } = (await request.json()) as { id?: number }

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 })
    }

    const cloudflare = await getCloudflareContext({ async: true })
    const d1 = cloudflare.env.MODELS_DB as D1Database
    const db = createDb(d1)

    // Get existing model
    const [existingModel] = await db
      .select()
      .from(huggingFaceModels)
      .where(eq(huggingFaceModels.id, id))

    if (!existingModel) {
      return NextResponse.json({ error: "Model not found" }, { status: 404 })
    }

    // Fetch fresh data from HuggingFace
    const response = await fetch(`${HF_API_BASE}/models/${existingModel.modelId}`)
    if (!response.ok) {
      return NextResponse.json({ error: "Model not found on HuggingFace" }, { status: 404 })
    }

    const hfModel: HFModelInfo = await response.json()
    const { count, label } = parseParameterCount(hfModel)

    // Update only HuggingFace-sourced fields, preserve edits
    await db
      .update(huggingFaceModels)
      .set({
        // Don't update name, authorLogo - those are user-editable
        description: hfModel.cardData?.model_name || existingModel.description,
        taskType: hfModel.pipeline_tag || null,
        pipelineTag: hfModel.pipeline_tag || null,
        downloads: hfModel.downloads,
        likes: hfModel.likes,
        tags: JSON.stringify(hfModel.tags || []),
        parameterCount: count,
        parameterLabel: label,
        lastModified: hfModel.lastModified,
        scrapedAt: new Date().toISOString(),
      })
      .where(eq(huggingFaceModels.id, id))

    const [updatedModel] = await db
      .select()
      .from(huggingFaceModels)
      .where(eq(huggingFaceModels.id, id))

    return NextResponse.json({
      success: true,
      model: updatedModel,
      message: `Model ${existingModel.modelId} re-synced from HuggingFace`
    })
  } catch (error) {
    console.error("Error re-syncing model:", error)
    return NextResponse.json({ error: "Failed to re-sync model" }, { status: 500 })
  }
}

// DELETE - Remove a model
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 })
    }

    const cloudflare = await getCloudflareContext({ async: true })
    const d1 = cloudflare.env.MODELS_DB as D1Database
    const db = createDb(d1)

    await db
      .delete(huggingFaceModels)
      .where(eq(huggingFaceModels.id, parseInt(id)))

    return NextResponse.json({ success: true, message: "Model deleted" })
  } catch (error) {
    console.error("Error deleting model:", error)
    return NextResponse.json({ error: "Failed to delete model" }, { status: 500 })
  }
}
