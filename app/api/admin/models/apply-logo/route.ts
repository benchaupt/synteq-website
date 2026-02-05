import { getCloudflareContext } from "@opennextjs/cloudflare"
import { createDb, huggingFaceModels } from "@/db"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

// POST - Apply a logo to all models from the same author
export async function POST(request: NextRequest) {
  try {
    const { author, authorLogo } = (await request.json()) as { author?: string; authorLogo?: string }

    if (!author) {
      return NextResponse.json({ error: "author is required" }, { status: 400 })
    }

    if (!authorLogo) {
      return NextResponse.json({ error: "authorLogo is required" }, { status: 400 })
    }

    const cloudflare = await getCloudflareContext({ async: true })
    const d1 = cloudflare.env.MODELS_DB as D1Database
    const db = createDb(d1)

    // Update all models with this author
    await db
      .update(huggingFaceModels)
      .set({ authorLogo })
      .where(eq(huggingFaceModels.author, author))

    // Count how many were updated
    const models = await db
      .select({ id: huggingFaceModels.id })
      .from(huggingFaceModels)
      .where(eq(huggingFaceModels.author, author))

    return NextResponse.json({
      success: true,
      message: `Logo applied to ${models.length} models from ${author}`,
      count: models.length,
    })
  } catch (error) {
    console.error("Error applying logo:", error)
    return NextResponse.json({ error: "Failed to apply logo" }, { status: 500 })
  }
}
