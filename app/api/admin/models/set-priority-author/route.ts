import { getCloudflareContext } from "@opennextjs/cloudflare"
import { createDb, huggingFaceModels } from "@/db"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

// POST - Set priority author status for all models from an author
export async function POST(request: NextRequest) {
  try {
    const { author, priority } = (await request.json()) as { author?: string; priority?: boolean }

    if (!author) {
      return NextResponse.json({ error: "author is required" }, { status: 400 })
    }

    if (typeof priority !== "boolean") {
      return NextResponse.json({ error: "priority must be a boolean" }, { status: 400 })
    }

    const cloudflare = await getCloudflareContext({ async: true })
    const d1 = cloudflare.env.MODELS_DB as D1Database
    const db = createDb(d1)

    // Update all models with this author
    // If setting as priority, also feature all their models
    if (priority) {
      await db
        .update(huggingFaceModels)
        .set({ priorityAuthor: true, featured: true })
        .where(eq(huggingFaceModels.author, author))
    } else {
      await db
        .update(huggingFaceModels)
        .set({ priorityAuthor: false })
        .where(eq(huggingFaceModels.author, author))
    }

    // Count how many were updated
    const models = await db
      .select({ id: huggingFaceModels.id })
      .from(huggingFaceModels)
      .where(eq(huggingFaceModels.author, author))

    return NextResponse.json({
      success: true,
      message: priority
        ? `${author} marked as priority author. ${models.length} models featured.`
        : `${author} removed from priority authors. ${models.length} models updated.`,
      count: models.length,
    })
  } catch (error) {
    console.error("Error setting priority author:", error)
    return NextResponse.json({ error: "Failed to set priority author" }, { status: 500 })
  }
}
