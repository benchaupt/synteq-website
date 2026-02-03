/**
 * Seed script to insert featured models into the database.
 *
 * Run with: npx tsx scripts/seed-featured-models.ts
 *
 * Note: This script is designed to run locally and connect to the D1 database.
 * You may need to use wrangler d1 execute for production.
 */

// Featured models to seed - these match the original hardcoded models
const featuredModels = [
  {
    modelId: "openai/gpt-4o",
    name: "GPT-4o",
    author: "openai",
    description: "GPT-4o is OpenAI's most advanced multimodal model, capable of processing text, images, and audio.",
    taskType: "text-generation",
    pipelineTag: "text-generation",
    downloads: 0,
    likes: 0,
    tags: JSON.stringify(["multimodal", "text-generation", "vision", "openai"]),
    parameterCount: null,
    parameterLabel: null,
    modelUrl: "https://platform.openai.com/docs/models/gpt-4o",
  },
  {
    modelId: "anthropic/claude-3.5-sonnet",
    name: "Claude 3.5 Sonnet",
    author: "anthropic",
    description: "Claude 3.5 Sonnet is Anthropic's most intelligent model, with state-of-the-art reasoning capabilities.",
    taskType: "text-generation",
    pipelineTag: "text-generation",
    downloads: 0,
    likes: 0,
    tags: JSON.stringify(["reasoning", "text-generation", "anthropic"]),
    parameterCount: null,
    parameterLabel: null,
    modelUrl: "https://www.anthropic.com/claude",
  },
  {
    modelId: "meta-llama/Llama-3.1-405B-Instruct",
    name: "Llama 3.1 405B",
    author: "meta-llama",
    description: "Meta's largest and most capable open-source large language model.",
    taskType: "text-generation",
    pipelineTag: "text-generation",
    downloads: 500000,
    likes: 5000,
    tags: JSON.stringify(["open-source", "text-generation", "meta", "llama"]),
    parameterCount: 405,
    parameterLabel: "405B",
    modelUrl: "https://huggingface.co/meta-llama/Llama-3.1-405B-Instruct",
  },
  {
    modelId: "google/gemini-1.5-pro",
    name: "Gemini 1.5 Pro",
    author: "google",
    description: "Google's most capable multimodal model with a 1 million token context window.",
    taskType: "text-generation",
    pipelineTag: "text-generation",
    downloads: 0,
    likes: 0,
    tags: JSON.stringify(["multimodal", "text-generation", "vision", "google"]),
    parameterCount: null,
    parameterLabel: null,
    modelUrl: "https://deepmind.google/technologies/gemini/",
  },
  {
    modelId: "deepseek-ai/DeepSeek-R1",
    name: "DeepSeek R1",
    author: "deepseek-ai",
    description: "DeepSeek's reasoning model with chain-of-thought capabilities.",
    taskType: "text-generation",
    pipelineTag: "text-generation",
    downloads: 100000,
    likes: 2000,
    tags: JSON.stringify(["reasoning", "text-generation", "deepseek"]),
    parameterCount: null,
    parameterLabel: null,
    modelUrl: "https://huggingface.co/deepseek-ai/DeepSeek-R1",
  },
  {
    modelId: "Qwen/Qwen2.5-72B-Instruct",
    name: "Qwen 2.5",
    author: "Qwen",
    description: "Alibaba's multilingual large language model with strong performance across languages.",
    taskType: "text-generation",
    pipelineTag: "text-generation",
    downloads: 200000,
    likes: 1500,
    tags: JSON.stringify(["multilingual", "text-generation", "alibaba", "qwen"]),
    parameterCount: 72,
    parameterLabel: "72B",
    modelUrl: "https://huggingface.co/Qwen/Qwen2.5-72B-Instruct",
  },
  {
    modelId: "mistralai/Mistral-Large-Instruct-2407",
    name: "Mistral Large",
    author: "mistralai",
    description: "Mistral AI's flagship model for enterprise applications.",
    taskType: "text-generation",
    pipelineTag: "text-generation",
    downloads: 150000,
    likes: 1200,
    tags: JSON.stringify(["enterprise", "text-generation", "mistral"]),
    parameterCount: null,
    parameterLabel: null,
    modelUrl: "https://huggingface.co/mistralai/Mistral-Large-Instruct-2407",
  },
  {
    modelId: "CohereForAI/c4ai-command-r-plus",
    name: "Command R+",
    author: "CohereForAI",
    description: "Cohere's RAG-optimized model for retrieval-augmented generation tasks.",
    taskType: "text-generation",
    pipelineTag: "text-generation",
    downloads: 80000,
    likes: 800,
    tags: JSON.stringify(["rag-optimized", "text-generation", "cohere"]),
    parameterCount: 104,
    parameterLabel: "104B",
    modelUrl: "https://huggingface.co/CohereForAI/c4ai-command-r-plus",
  },
  {
    modelId: "anthropic/claude-3-opus",
    name: "Claude 3 Opus",
    author: "anthropic",
    description: "Anthropic's most powerful model for complex tasks requiring deep analysis.",
    taskType: "text-generation",
    pipelineTag: "text-generation",
    downloads: 0,
    likes: 0,
    tags: JSON.stringify(["advanced", "text-generation", "anthropic"]),
    parameterCount: null,
    parameterLabel: null,
    modelUrl: "https://www.anthropic.com/claude",
  },
  {
    modelId: "mistralai/Mixtral-8x22B-Instruct-v0.1",
    name: "Mixtral 8x22B",
    author: "mistralai",
    description: "Mistral AI's open-source mixture-of-experts model.",
    taskType: "text-generation",
    pipelineTag: "text-generation",
    downloads: 300000,
    likes: 2500,
    tags: JSON.stringify(["open-source", "text-generation", "mistral", "moe"]),
    parameterCount: 176,
    parameterLabel: "8x22B",
    modelUrl: "https://huggingface.co/mistralai/Mixtral-8x22B-Instruct-v0.1",
  },
  {
    modelId: "xai/grok-2",
    name: "Grok-2",
    author: "xai",
    description: "xAI's reasoning model with real-time knowledge capabilities.",
    taskType: "text-generation",
    pipelineTag: "text-generation",
    downloads: 0,
    likes: 0,
    tags: JSON.stringify(["reasoning", "text-generation", "xai"]),
    parameterCount: null,
    parameterLabel: null,
    modelUrl: "https://x.ai/",
  },
  {
    modelId: "microsoft/Phi-3-medium-128k-instruct",
    name: "Phi-3",
    author: "microsoft",
    description: "Microsoft's efficient small language model with strong performance.",
    taskType: "text-generation",
    pipelineTag: "text-generation",
    downloads: 400000,
    likes: 1800,
    tags: JSON.stringify(["efficient", "text-generation", "microsoft", "slm"]),
    parameterCount: 14,
    parameterLabel: "14B",
    modelUrl: "https://huggingface.co/microsoft/Phi-3-medium-128k-instruct",
  },
]

// Generate SQL for insertion
const now = new Date().toISOString()

console.log("-- SQL to seed featured models")
console.log("-- Run with: wrangler d1 execute MODELS_DB --file=scripts/seed-featured.sql")
console.log("")

for (const model of featuredModels) {
  const sql = `
INSERT INTO huggingface_models (
  model_id, name, author, description, task_type, pipeline_tag,
  downloads, likes, tags, parameter_count, parameter_label,
  model_url, featured, scraped_at
) VALUES (
  '${model.modelId}',
  '${model.name.replace(/'/g, "''")}',
  '${model.author}',
  '${model.description?.replace(/'/g, "''") || ''}',
  '${model.taskType || ''}',
  '${model.pipelineTag || ''}',
  ${model.downloads},
  ${model.likes},
  '${model.tags}',
  ${model.parameterCount || 'NULL'},
  ${model.parameterLabel ? `'${model.parameterLabel}'` : 'NULL'},
  '${model.modelUrl || ''}',
  1,
  '${now}'
) ON CONFLICT(model_id) DO UPDATE SET featured = 1;
`
  console.log(sql.trim())
  console.log("")
}
