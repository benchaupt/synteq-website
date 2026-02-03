import { getCloudflareContext } from "@opennextjs/cloudflare"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const author = formData.get("author") as string | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ["image/png", "image/jpeg", "image/svg+xml", "image/webp", "image/gif"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Use PNG, JPG, SVG, WebP, or GIF" }, { status: 400 })
    }

    // Max 2MB
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large. Max 2MB" }, { status: 400 })
    }

    const cloudflare = await getCloudflareContext({ async: true })
    const r2 = cloudflare.env.MEDIA_R2_BUCKET as R2Bucket

    // Generate filename
    const ext = file.name.split(".").pop() || "png"
    const slug = author ? author.toLowerCase().replace(/[^a-z0-9]/g, "-") : "logo"
    const filename = `model-logos/${slug}-${Date.now()}.${ext}`

    // Upload to R2
    const arrayBuffer = await file.arrayBuffer()
    await r2.put(filename, arrayBuffer, {
      httpMetadata: {
        contentType: file.type,
      },
    })

    // Return the public URL
    // Assuming R2 is configured with a public domain or using Cloudflare Images
    // You may need to adjust this URL based on your R2 public access setup
    const publicUrl = `https://media.synteq.ai/${filename}`

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
    })
  } catch (error) {
    console.error("Error uploading logo:", error)
    return NextResponse.json({ error: "Failed to upload logo" }, { status: 500 })
  }
}
