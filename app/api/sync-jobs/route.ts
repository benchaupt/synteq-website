import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload.config";
import { scrapeAllJobs } from "@/lib/rippling/careers";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  // Allow access via CRON_SECRET (worker cron) or Payload admin session
  const hasCronAuth = cronSecret && authHeader === `Bearer ${cronSecret}`;
  const hasPayloadAuth = req.cookies.has("payload-token");

  if (!hasCronAuth && !hasPayloadAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await getPayload({ config });
    const scrapedJobs = await scrapeAllJobs();

    const scrapedIds = new Set(scrapedJobs.map((j) => j.ripplingId));

    // Get all existing job listings
    const existing = await payload.find({
      collection: "job-listings",
      limit: 500,
    });

    const existingByRipplingId = new Map(
      existing.docs.map((doc) => [doc.ripplingId as string, doc])
    );

    let created = 0;
    let updated = 0;
    let deleted = 0;

    // Upsert scraped jobs
    for (const job of scrapedJobs) {
      const existingDoc = existingByRipplingId.get(job.ripplingId);

      if (existingDoc) {
        await payload.update({
          collection: "job-listings",
          id: existingDoc.id,
          data: {
            name: job.name,
            department: job.department,
            workLocation: job.workLocation,
            employmentType: job.employmentType,
            descriptionMarkdown: job.descriptionMarkdown,
            slug: job.slug,
          },
        });
        updated++;
      } else {
        await payload.create({
          collection: "job-listings",
          data: {
            name: job.name,
            ripplingId: job.ripplingId,
            department: job.department,
            workLocation: job.workLocation,
            employmentType: job.employmentType,
            descriptionMarkdown: job.descriptionMarkdown,
            slug: job.slug,
          },
        });
        created++;
      }
    }

    // Delete jobs no longer on Rippling
    for (const doc of existing.docs) {
      if (!scrapedIds.has(doc.ripplingId as string)) {
        await payload.delete({
          collection: "job-listings",
          id: doc.id,
        });
        deleted++;
      }
    }

    return NextResponse.json({
      success: true,
      created,
      updated,
      deleted,
      total: scrapedJobs.length,
    });
  } catch (error) {
    payload_error(error);
    return NextResponse.json(
      { error: "Sync failed", details: String(error) },
      { status: 500 }
    );
  }
}

function payload_error(error: unknown) {
  console.error("[sync-jobs] Error:", error);
}
