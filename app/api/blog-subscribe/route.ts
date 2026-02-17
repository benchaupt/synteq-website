import { NextRequest, NextResponse } from "next/server";
import { validateBlogSubscribe, type BlogSubscribeData } from "@/lib/validation";
import { verifyTurnstile } from "@/lib/turnstile";
import {
  createOrUpdateContact,
  findContactByEmail,
  addContactToList,
} from "@/lib/hubspot";

const MIN_SUBMIT_TIME_MS = 2000;

export async function POST(request: NextRequest) {
  try {
    const raw: unknown = await request.json();
    const body = raw as BlogSubscribeData;

    // Honeypot check
    if (body._hp_email) {
      return NextResponse.json({ success: true });
    }

    // Time-based check
    if (typeof body._t === "number" && Date.now() - body._t < MIN_SUBMIT_TIME_MS) {
      return NextResponse.json({ success: true });
    }

    // Server-side validation
    const validation = validateBlogSubscribe(raw);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // Verify Turnstile token
    const ip = request.headers.get("cf-connecting-ip") ?? undefined;
    const turnstileValid = await verifyTurnstile(body.turnstileToken, ip);
    if (!turnstileValid) {
      return NextResponse.json(
        { success: false, error: "Security verification failed. Please try again." },
        { status: 400 }
      );
    }

    const email = body.email.trim().toLowerCase();

    // Find existing contact or create a minimal one
    let contactId: string;
    const existing = await findContactByEmail(email);
    if (existing) {
      contactId = existing.id;
    } else {
      const result = await createOrUpdateContact({
        firstname: "",
        lastname: "",
        email,
      });
      contactId = result.id;
    }

    // Add to blog subscriber list
    const listId = process.env.HUBSPOT_BLOG_LIST_ID;
    if (!listId) {
      console.error("HUBSPOT_BLOG_LIST_ID is not configured");
      return NextResponse.json(
        { success: false, error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    await addContactToList(listId, contactId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Blog subscribe error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
