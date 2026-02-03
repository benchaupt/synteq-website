-- Remove unused custom fields from huggingface_models table
-- Run with: npx wrangler d1 execute synteq-models --remote --file=scripts/remove-custom-fields.sql

ALTER TABLE huggingface_models DROP COLUMN custom_name;
ALTER TABLE huggingface_models DROP COLUMN custom_description;
ALTER TABLE huggingface_models DROP COLUMN custom_logo;
ALTER TABLE huggingface_models DROP COLUMN custom_tags;
ALTER TABLE huggingface_models DROP COLUMN display_order;
