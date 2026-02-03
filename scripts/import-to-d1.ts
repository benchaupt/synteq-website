import { readFileSync } from "fs"

interface Model {
  modelId: string
  name: string
  author: string
  description: string | null
  taskType: string | null
  pipelineTag: string | null
  downloads: number
  likes: number
  tags: string
  parameterCount: number | null
  parameterLabel: string | null
  modelUrl: string
  lastModified: string
  featured: number
  scrapedAt: string
}

const escapeSQL = (str: string | null): string => {
  if (str === null) return "NULL"
  return `'${str.replace(/'/g, "''")}'`
}

const models: Model[] = JSON.parse(readFileSync("./scraped-models.json", "utf-8"))

console.log("-- Generated SQL for D1 import")
console.log("-- Run with: npx wrangler d1 execute synteq-models --remote --file=scripts/import.sql")
console.log("")

for (const model of models) {
  const sql = `INSERT OR REPLACE INTO huggingface_models (model_id, name, author, description, task_type, pipeline_tag, downloads, likes, tags, parameter_count, parameter_label, model_url, last_modified, featured, scraped_at) VALUES (${escapeSQL(model.modelId)}, ${escapeSQL(model.name)}, ${escapeSQL(model.author)}, ${escapeSQL(model.description)}, ${escapeSQL(model.taskType)}, ${escapeSQL(model.pipelineTag)}, ${model.downloads}, ${model.likes}, ${escapeSQL(model.tags)}, ${model.parameterCount ?? "NULL"}, ${escapeSQL(model.parameterLabel)}, ${escapeSQL(model.modelUrl)}, ${escapeSQL(model.lastModified)}, ${model.featured}, ${escapeSQL(model.scrapedAt)});`
  console.log(sql)
}
