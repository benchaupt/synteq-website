import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core"

export const huggingFaceModels = sqliteTable("huggingface_models", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  modelId: text("model_id").notNull().unique(), // e.g., "meta-llama/Llama-3.3-70B-Instruct"
  name: text("name").notNull(), // e.g., "Llama-3.3-70B-Instruct"
  author: text("author").notNull(), // e.g., "meta-llama"
  authorLogo: text("author_logo"), // URL to author's avatar/logo from HuggingFace
  description: text("description"),
  taskType: text("task_type"), // e.g., "text-generation", "image-classification"
  pipelineTag: text("pipeline_tag"),
  downloads: integer("downloads").default(0),
  likes: integer("likes").default(0),
  tags: text("tags"), // JSON array stored as text
  parameterCount: real("parameter_count"), // in billions, e.g., 70.0 for 70B
  parameterLabel: text("parameter_label"), // e.g., "70B", "8B", "405B"
  modelUrl: text("model_url"),
  lastModified: text("last_modified"), // ISO date string
  featured: integer("featured", { mode: "boolean" }).default(false),
  scrapedAt: text("scraped_at").notNull(), // ISO date string
})

export type HuggingFaceModel = typeof huggingFaceModels.$inferSelect
export type NewHuggingFaceModel = typeof huggingFaceModels.$inferInsert
