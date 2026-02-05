import { getCloudflareContext } from "@opennextjs/cloudflare"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params
    const filepath = path.join("/")

    // Security: only allow model-logos prefix
    if (!filepath.startsWith("model-logos/")) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const cloudflare = await getCloudflareContext({ async: true })
    const r2 = cloudflare.env.MEDIA_R2_BUCKET as R2Bucket

    const object = await r2.get(filepath)

    if (!object) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const headers = new Headers()
    headers.set("Content-Type", object.httpMetadata?.contentType || "image/png")
    headers.set("Cache-Control", "public, max-age=31536000, immutable")
    headers.set("CDN-Cache-Control", "public, max-age=31536000, immutable")

    return new NextResponse(object.body, { headers })
  } catch (error) {
    console.error("Error serving model logo:", error)
    return NextResponse.json({ error: "Failed to serve image" }, { status: 500 })
  }
}
