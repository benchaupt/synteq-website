const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_STRING_LENGTH = 1000;
const MAX_MESSAGE_LENGTH = 5000;

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  selectedProduct: string;
  budget?: string;
  teamSize?: string;
  message: string;
  turnstileToken: string;
  _hp_email?: string;
  _t?: number;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidLength(value: string, max: number): boolean {
  return value.trim().length <= max;
}

export function validateContactForm(data: unknown): ValidationResult {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Invalid request body." };
  }

  const form = data as Record<string, unknown>;

  if (!isNonEmptyString(form.firstName) || !isValidLength(form.firstName as string, MAX_STRING_LENGTH)) {
    return { valid: false, error: "First name is required." };
  }
  if (!isNonEmptyString(form.lastName) || !isValidLength(form.lastName as string, MAX_STRING_LENGTH)) {
    return { valid: false, error: "Last name is required." };
  }
  if (!isNonEmptyString(form.email) || !EMAIL_REGEX.test((form.email as string).trim())) {
    return { valid: false, error: "A valid email address is required." };
  }
  if (form.company !== undefined && form.company !== "" && !isValidLength(form.company as string, MAX_STRING_LENGTH)) {
    return { valid: false, error: "Company name is too long." };
  }
  if (!isNonEmptyString(form.selectedProduct) || !isValidLength(form.selectedProduct as string, MAX_STRING_LENGTH)) {
    return { valid: false, error: "Please select a product." };
  }
  if (form.budget !== undefined && form.budget !== "" && !isValidLength(form.budget as string, MAX_STRING_LENGTH)) {
    return { valid: false, error: "Invalid budget." };
  }
  if (form.teamSize !== undefined && form.teamSize !== "" && !isValidLength(form.teamSize as string, MAX_STRING_LENGTH)) {
    return { valid: false, error: "Invalid team size." };
  }
  if (!isNonEmptyString(form.message) || !isValidLength(form.message as string, MAX_MESSAGE_LENGTH)) {
    return { valid: false, error: "Message is required (max 5000 characters)." };
  }
  if (!isNonEmptyString(form.turnstileToken)) {
    return { valid: false, error: "Security verification failed. Please try again." };
  }

  return { valid: true };
}

export interface BlogSubscribeData {
  email: string;
  turnstileToken: string;
  _hp_email?: string;
  _t?: number;
}

export function validateBlogSubscribe(data: unknown): ValidationResult {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Invalid request body." };
  }

  const form = data as Record<string, unknown>;

  if (!isNonEmptyString(form.email) || !EMAIL_REGEX.test((form.email as string).trim())) {
    return { valid: false, error: "A valid email address is required." };
  }
  if (!isNonEmptyString(form.turnstileToken)) {
    return { valid: false, error: "Security verification failed. Please try again." };
  }

  return { valid: true };
}
