import { NextRequest, NextResponse } from "next/server";
import { validateContactForm, type ContactFormData } from "@/lib/validation";
import { verifyTurnstile } from "@/lib/turnstile";
import {
  createOrUpdateContact,
  createOrUpdateCompany,
  associateContactToCompany,
  type HubSpotContactProperties,
} from "@/lib/hubspot";

const MIN_SUBMIT_TIME_MS = 2000;

export async function POST(request: NextRequest) {
  try {
    const raw: unknown = await request.json();
    const body = raw as ContactFormData;

    // Honeypot check — bots fill hidden fields. Return fake success.
    if (body._hp_email) {
      return NextResponse.json({ success: true });
    }

    // Time-based check — if form submitted in under 2s, likely a bot.
    if (typeof body._t === "number" && Date.now() - body._t < MIN_SUBMIT_TIME_MS) {
      return NextResponse.json({ success: true });
    }

    // Server-side validation
    const validation = validateContactForm(raw);
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

    // Build HubSpot contact properties
    const properties: HubSpotContactProperties = {
      firstname: body.firstName.trim(),
      lastname: body.lastName.trim(),
      email: body.email.trim().toLowerCase(),
      message: body.message.trim(),
      website_contact_form_submission: "true",
    };
    if (body.company?.trim()) {
      properties.company = body.company.trim();
    }
    if (body.selectedProduct) {
      properties.synteq_product_interest = body.selectedProduct;
    }
    if (body.budget) {
      properties.synteq_budget = body.budget;
    }
    if (body.teamSize) {
      properties.synteq_team_size = body.teamSize;
    }

    // Create or update contact in HubSpot
    const contact = await createOrUpdateContact(properties);

    // Create or update company and associate with contact (if company name provided)
    if (body.company?.trim()) {
      try {
        const company = await createOrUpdateCompany({
          name: body.company.trim(),
          website_contact_form_submission: "true",
          ...(body.teamSize ? { synteq_team_size: body.teamSize } : {}),
        });
        await associateContactToCompany(contact.id, company.id);
      } catch (companyError) {
        // Log but don't fail the request — the contact was already created
        console.error("Company creation/association error:", companyError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
