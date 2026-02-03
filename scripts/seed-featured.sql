-- Seed featured models for the landing page and cloud page
-- Run with: wrangler d1 execute MODELS_DB --remote --file=scripts/seed-featured.sql

INSERT INTO huggingface_models (
  model_id, name, author, description, task_type, pipeline_tag,
  downloads, likes, tags, parameter_count, parameter_label,
  model_url, featured, scraped_at
) VALUES (
  'openai/gpt-4o',
  'GPT-4o',
  'openai',
  'GPT-4o is OpenAI''s most advanced multimodal model, capable of processing text, images, and audio.',
  'text-generation',
  'text-generation',
  0,
  0,
  '["multimodal", "text-generation", "vision", "openai"]',
  NULL,
  NULL,
  'https://platform.openai.com/docs/models/gpt-4o',
  1,
  datetime('now')
) ON CONFLICT(model_id) DO UPDATE SET featured = 1;

INSERT INTO huggingface_models (
  model_id, name, author, description, task_type, pipeline_tag,
  downloads, likes, tags, parameter_count, parameter_label,
  model_url, featured, scraped_at
) VALUES (
  'anthropic/claude-3.5-sonnet',
  'Claude 3.5 Sonnet',
  'anthropic',
  'Claude 3.5 Sonnet is Anthropic''s most intelligent model, with state-of-the-art reasoning capabilities.',
  'text-generation',
  'text-generation',
  0,
  0,
  '["reasoning", "text-generation", "anthropic"]',
  NULL,
  NULL,
  'https://www.anthropic.com/claude',
  1,
  datetime('now')
) ON CONFLICT(model_id) DO UPDATE SET featured = 1;

INSERT INTO huggingface_models (
  model_id, name, author, description, task_type, pipeline_tag,
  downloads, likes, tags, parameter_count, parameter_label,
  model_url, featured, scraped_at
) VALUES (
  'meta-llama/Llama-3.1-405B-Instruct',
  'Llama 3.1 405B',
  'meta-llama',
  'Meta''s largest and most capable open-source large language model.',
  'text-generation',
  'text-generation',
  500000,
  5000,
  '["open-source", "text-generation", "meta", "llama"]',
  405,
  '405B',
  'https://huggingface.co/meta-llama/Llama-3.1-405B-Instruct',
  1,
  datetime('now')
) ON CONFLICT(model_id) DO UPDATE SET featured = 1;

INSERT INTO huggingface_models (
  model_id, name, author, description, task_type, pipeline_tag,
  downloads, likes, tags, parameter_count, parameter_label,
  model_url, featured, scraped_at
) VALUES (
  'google/gemini-1.5-pro',
  'Gemini 1.5 Pro',
  'google',
  'Google''s most capable multimodal model with a 1 million token context window.',
  'text-generation',
  'text-generation',
  0,
  0,
  '["multimodal", "text-generation", "vision", "google"]',
  NULL,
  NULL,
  'https://deepmind.google/technologies/gemini/',
  1,
  datetime('now')
) ON CONFLICT(model_id) DO UPDATE SET featured = 1;

INSERT INTO huggingface_models (
  model_id, name, author, description, task_type, pipeline_tag,
  downloads, likes, tags, parameter_count, parameter_label,
  model_url, featured, scraped_at
) VALUES (
  'deepseek-ai/DeepSeek-R1',
  'DeepSeek R1',
  'deepseek-ai',
  'DeepSeek''s reasoning model with chain-of-thought capabilities.',
  'text-generation',
  'text-generation',
  100000,
  2000,
  '["reasoning", "text-generation", "deepseek"]',
  NULL,
  NULL,
  'https://huggingface.co/deepseek-ai/DeepSeek-R1',
  1,
  datetime('now')
) ON CONFLICT(model_id) DO UPDATE SET featured = 1;

INSERT INTO huggingface_models (
  model_id, name, author, description, task_type, pipeline_tag,
  downloads, likes, tags, parameter_count, parameter_label,
  model_url, featured, scraped_at
) VALUES (
  'Qwen/Qwen2.5-72B-Instruct',
  'Qwen 2.5',
  'Qwen',
  'Alibaba''s multilingual large language model with strong performance across languages.',
  'text-generation',
  'text-generation',
  200000,
  1500,
  '["multilingual", "text-generation", "alibaba", "qwen"]',
  72,
  '72B',
  'https://huggingface.co/Qwen/Qwen2.5-72B-Instruct',
  1,
  datetime('now')
) ON CONFLICT(model_id) DO UPDATE SET featured = 1;

INSERT INTO huggingface_models (
  model_id, name, author, description, task_type, pipeline_tag,
  downloads, likes, tags, parameter_count, parameter_label,
  model_url, featured, scraped_at
) VALUES (
  'mistralai/Mistral-Large-Instruct-2407',
  'Mistral Large',
  'mistralai',
  'Mistral AI''s flagship model for enterprise applications.',
  'text-generation',
  'text-generation',
  150000,
  1200,
  '["enterprise", "text-generation", "mistral"]',
  NULL,
  NULL,
  'https://huggingface.co/mistralai/Mistral-Large-Instruct-2407',
  1,
  datetime('now')
) ON CONFLICT(model_id) DO UPDATE SET featured = 1;

INSERT INTO huggingface_models (
  model_id, name, author, description, task_type, pipeline_tag,
  downloads, likes, tags, parameter_count, parameter_label,
  model_url, featured, scraped_at
) VALUES (
  'CohereForAI/c4ai-command-r-plus',
  'Command R+',
  'CohereForAI',
  'Cohere''s RAG-optimized model for retrieval-augmented generation tasks.',
  'text-generation',
  'text-generation',
  80000,
  800,
  '["rag-optimized", "text-generation", "cohere"]',
  104,
  '104B',
  'https://huggingface.co/CohereForAI/c4ai-command-r-plus',
  1,
  datetime('now')
) ON CONFLICT(model_id) DO UPDATE SET featured = 1;

INSERT INTO huggingface_models (
  model_id, name, author, description, task_type, pipeline_tag,
  downloads, likes, tags, parameter_count, parameter_label,
  model_url, featured, scraped_at
) VALUES (
  'anthropic/claude-3-opus',
  'Claude 3 Opus',
  'anthropic',
  'Anthropic''s most powerful model for complex tasks requiring deep analysis.',
  'text-generation',
  'text-generation',
  0,
  0,
  '["advanced", "text-generation", "anthropic"]',
  NULL,
  NULL,
  'https://www.anthropic.com/claude',
  1,
  datetime('now')
) ON CONFLICT(model_id) DO UPDATE SET featured = 1;

INSERT INTO huggingface_models (
  model_id, name, author, description, task_type, pipeline_tag,
  downloads, likes, tags, parameter_count, parameter_label,
  model_url, featured, scraped_at
) VALUES (
  'mistralai/Mixtral-8x22B-Instruct-v0.1',
  'Mixtral 8x22B',
  'mistralai',
  'Mistral AI''s open-source mixture-of-experts model.',
  'text-generation',
  'text-generation',
  300000,
  2500,
  '["open-source", "text-generation", "mistral", "moe"]',
  176,
  '8x22B',
  'https://huggingface.co/mistralai/Mixtral-8x22B-Instruct-v0.1',
  1,
  datetime('now')
) ON CONFLICT(model_id) DO UPDATE SET featured = 1;

INSERT INTO huggingface_models (
  model_id, name, author, description, task_type, pipeline_tag,
  downloads, likes, tags, parameter_count, parameter_label,
  model_url, featured, scraped_at
) VALUES (
  'xai/grok-2',
  'Grok-2',
  'xai',
  'xAI''s reasoning model with real-time knowledge capabilities.',
  'text-generation',
  'text-generation',
  0,
  0,
  '["reasoning", "text-generation", "xai"]',
  NULL,
  NULL,
  'https://x.ai/',
  1,
  datetime('now')
) ON CONFLICT(model_id) DO UPDATE SET featured = 1;

INSERT INTO huggingface_models (
  model_id, name, author, description, task_type, pipeline_tag,
  downloads, likes, tags, parameter_count, parameter_label,
  model_url, featured, scraped_at
) VALUES (
  'microsoft/Phi-3-medium-128k-instruct',
  'Phi-3',
  'microsoft',
  'Microsoft''s efficient small language model with strong performance.',
  'text-generation',
  'text-generation',
  400000,
  1800,
  '["efficient", "text-generation", "microsoft", "slm"]',
  14,
  '14B',
  'https://huggingface.co/microsoft/Phi-3-medium-128k-instruct',
  1,
  datetime('now')
) ON CONFLICT(model_id) DO UPDATE SET featured = 1;
