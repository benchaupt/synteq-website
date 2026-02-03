// Map of known model authors/organizations to their logo paths
export const MODEL_LOGOS: Record<string, string> = {
  // OpenAI
  "openai": "/assets/cloud/logo-openai.svg",

  // Anthropic
  "anthropic": "/assets/cloud/logo-anthropic.svg",

  // Meta / Llama
  "meta-llama": "/assets/cloud/logo-meta.svg",
  "meta": "/assets/cloud/logo-meta.svg",

  // Google
  "google": "/assets/cloud/logo-google.svg",

  // Mistral
  "mistralai": "/assets/cloud/logo-mistral.svg",
  "mistral-ai": "/assets/cloud/logo-mistral.svg",

  // DeepSeek
  "deepseek-ai": "/assets/cloud/logo-deepseek.svg",
  "deepseek": "/assets/cloud/logo-deepseek.svg",

  // Alibaba / Qwen
  "qwen": "/assets/cloud/logo-qwen.svg",
  "alibaba": "/assets/cloud/logo-qwen.svg",

  // Cohere
  "cohere": "/assets/cloud/logo-cohere.svg",
  "cohereforai": "/assets/cloud/logo-cohere.svg",

  // xAI / Grok
  "xai": "/assets/cloud/logo-xai.svg",
  "x-ai": "/assets/cloud/logo-xai.svg",

  // Microsoft
  "microsoft": "/assets/cloud/logo-microsoft.svg",
}

export function getModelLogo(author: string): string | null {
  const normalizedAuthor = author.toLowerCase()
  return MODEL_LOGOS[normalizedAuthor] || null
}
