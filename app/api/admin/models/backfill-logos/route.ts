import { getCloudflareContext } from "@opennextjs/cloudflare"
import { createDb, huggingFaceModels } from "@/db"
import { eq, isNull, sql } from "drizzle-orm"
import { NextResponse } from "next/server"

const HF_API_BASE = "https://huggingface.co/api"

interface HFAuthorInfo {
  avatarUrl?: string
}

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
  } catch {
    return null
  }
}

// POST - Backfill logos for all authors without one
export async function POST() {
  try {
    const cloudflare = await getCloudflareContext({ async: true })
    const d1 = cloudflare.env.MODELS_DB as D1Database
    const db = createDb(d1)

    // Get all unique authors without logos
    const authorsWithoutLogos = await db
      .selectDistinct({ author: huggingFaceModels.author })
      .from(huggingFaceModels)
      .where(isNull(huggingFaceModels.authorLogo))

    const results: { author: string; status: string; avatarUrl?: string }[] = []

    for (const { author } of authorsWithoutLogos) {
      const avatarUrl = await fetchHuggingFaceAvatar(author)

      if (avatarUrl) {
        // Update all models from this author
        await db
          .update(huggingFaceModels)
          .set({ authorLogo: avatarUrl })
          .where(eq(huggingFaceModels.author, author))

        results.push({ author, status: "updated", avatarUrl })
      } else {
        results.push({ author, status: "no_avatar_found" })
      }
    }

    const updated = results.filter((r) => r.status === "updated").length
    const notFound = results.filter((r) => r.status === "no_avatar_found").length

    return NextResponse.json({
      success: true,
      message: `Backfill complete: ${updated} authors updated, ${notFound} not found on HuggingFace`,
      results,
    })
  } catch (error) {
    console.error("Error backfilling logos:", error)
    return NextResponse.json({ error: "Failed to backfill logos" }, { status: 500 })
  }
}

// GET - Preview which authors need logos (dry run)
export async function GET() {
  try {
    const cloudflare = await getCloudflareContext({ async: true })
    const d1 = cloudflare.env.MODELS_DB as D1Database
    const db = createDb(d1)

    // Get all unique authors without logos and count their models
    const authorsWithoutLogos = await db
      .select({
        author: huggingFaceModels.author,
        modelCount: sql<number>`count(*)`,
      })
      .from(huggingFaceModels)
      .where(isNull(huggingFaceModels.authorLogo))
      .groupBy(huggingFaceModels.author)

    return NextResponse.json({
      authorsWithoutLogos,
      total: authorsWithoutLogos.length,
      message: "POST to this endpoint to backfill logos from HuggingFace",
    })
  } catch (error) {
    console.error("Error fetching authors:", error)
    return NextResponse.json({ error: "Failed to fetch authors" }, { status: 500 })
  }
}
