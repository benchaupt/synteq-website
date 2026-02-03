CREATE TABLE `huggingface_models` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`model_id` text NOT NULL,
	`name` text NOT NULL,
	`author` text NOT NULL,
	`description` text,
	`task_type` text,
	`pipeline_tag` text,
	`downloads` integer DEFAULT 0,
	`likes` integer DEFAULT 0,
	`tags` text,
	`parameter_count` real,
	`parameter_label` text,
	`model_url` text,
	`last_modified` text,
	`featured` integer DEFAULT false,
	`scraped_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `huggingface_models_model_id_unique` ON `huggingface_models` (`model_id`);