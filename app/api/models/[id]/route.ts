import { getCloudflareContext } from "@opennextjs/cloudflare"
import { createDb, huggingFaceModels } from "@/db"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const modelId = parseInt(id)

  if (isNaN(modelId)) {
    return NextResponse.json(
      { error: "Invalid model ID" },
      { status: 400 }
    )
  }

  try {
    const cloudflare = await getCloudflareContext({ async: true })
    const d1 = cloudflare.env.MODELS_DB as D1Database
    const db = createDb(d1)

    const result = await db
      .select()
      .from(huggingFaceModels)
      .where(eq(huggingFaceModels.id, modelId))
      .limit(1)

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Model not found" },
        { status: 404 }
      )
    }

    const model = result[0]

    return NextResponse.json({
      ...model,
      tags: model.tags ? JSON.parse(model.tags) : []
    })
  } catch (error) {
    console.error("Error fetching model:", error)
    return NextResponse.json(
      { error: "Failed to fetch model" },
      { status: 500 }
    )
  }
}
