import { getCloudflareContext } from "@opennextjs/cloudflare"
import { createDb, huggingFaceModels } from "@/db"
import { like, desc, asc, and, gte, lte, eq, or, sql } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const search = searchParams.get("search")
  const taskType = searchParams.get("taskType")
  const author = searchParams.get("author")
  const minParams = searchParams.get("minParams")
  const maxParams = searchParams.get("maxParams")
  const featured = searchParams.get("featured")
  const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100)
  const page = parseInt(searchParams.get("page") || "1")
  const offset = parseInt(searchParams.get("offset") || String((page - 1) * limit))
  const sortBy = searchParams.get("sortBy") || "downloads"
  const sortOrder = searchParams.get("sortOrder") || "desc"

  try {
    const cloudflare = await getCloudflareContext({ async: true })
    const d1 = cloudflare.env.MODELS_DB as D1Database
    const db = createDb(d1)

    // Build conditions
    const conditions = []

    if (search) {
      conditions.push(
        or(
          like(huggingFaceModels.name, `%${search}%`),
          like(huggingFaceModels.author, `%${search}%`),
          like(huggingFaceModels.modelId, `%${search}%`)
        )
      )
    }

    if (taskType) {
      conditions.push(eq(huggingFaceModels.taskType, taskType))
    }

    if (author) {
      conditions.push(eq(huggingFaceModels.author, author))
    }

    if (minParams) {
      conditions.push(gte(huggingFaceModels.parameterCount, parseFloat(minParams)))
    }

    if (maxParams) {
      conditions.push(lte(huggingFaceModels.parameterCount, parseFloat(maxParams)))
    }

    if (featured === "true") {
      conditions.push(eq(huggingFaceModels.featured, true))
    }

    // Build query
    const orderColumn = sortBy === "likes"
      ? huggingFaceModels.likes
      : sortBy === "name"
        ? huggingFaceModels.name
        : huggingFaceModels.downloads

    const orderDirection = sortOrder === "asc" ? asc : desc

    const query = db
      .select()
      .from(huggingFaceModels)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(orderDirection(orderColumn))
      .limit(limit)
      .offset(offset)

    const models = await query

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(huggingFaceModels)
      .where(conditions.length > 0 ? and(...conditions) : undefined)

    const total = countResult[0]?.count || 0

    // Get unique task types and authors for filters, scoped to search
    const searchCondition = search
      ? or(
          like(huggingFaceModels.name, `%${search}%`),
          like(huggingFaceModels.author, `%${search}%`),
          like(huggingFaceModels.modelId, `%${search}%`)
        )
      : undefined

    const taskTypes = await db
      .selectDistinct({ taskType: huggingFaceModels.taskType })
      .from(huggingFaceModels)
      .where(
        searchCondition
          ? and(sql`${huggingFaceModels.taskType} IS NOT NULL`, searchCondition)
          : sql`${huggingFaceModels.taskType} IS NOT NULL`
      )

    const authors = await db
      .selectDistinct({ author: huggingFaceModels.author })
      .from(huggingFaceModels)
      .where(searchCondition || undefined)
      .orderBy(desc(huggingFaceModels.downloads))
      .limit(50)

    // Check which size buckets have models in search results
    const sizeBuckets = await db
      .select({
        small: sql<number>`SUM(CASE WHEN ${huggingFaceModels.parameterCount} < 1 THEN 1 ELSE 0 END)`,
        medium: sql<number>`SUM(CASE WHEN ${huggingFaceModels.parameterCount} >= 1 AND ${huggingFaceModels.parameterCount} < 10 THEN 1 ELSE 0 END)`,
        large: sql<number>`SUM(CASE WHEN ${huggingFaceModels.parameterCount} >= 10 AND ${huggingFaceModels.parameterCount} < 70 THEN 1 ELSE 0 END)`,
        xlarge: sql<number>`SUM(CASE WHEN ${huggingFaceModels.parameterCount} >= 70 THEN 1 ELSE 0 END)`,
      })
      .from(huggingFaceModels)
      .where(searchCondition || undefined)

    const availableSizes: string[] = []
    if (sizeBuckets[0]?.small > 0) availableSizes.push("small")
    if (sizeBuckets[0]?.medium > 0) availableSizes.push("medium")
    if (sizeBuckets[0]?.large > 0) availableSizes.push("large")
    if (sizeBuckets[0]?.xlarge > 0) availableSizes.push("xlarge")

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      models: models.map(m => ({
        ...m,
        tags: m.tags ? JSON.parse(m.tags) : [],
      })),
      total,
      limit,
      offset,
      pagination: {
        page,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
      filters: {
        taskTypes: taskTypes.map(t => t.taskType).filter(Boolean),
        authors: authors.map(a => a.author),
        sizes: availableSizes,
      }
    })
  } catch (error) {
    console.error("Error fetching models:", error)
    return NextResponse.json(
      { error: "Failed to fetch models" },
      { status: 500 }
    )
  }
}
