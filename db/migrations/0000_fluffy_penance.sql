CREATE TABLE IF NOT EXISTS "comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"user_info" json,
	"post_slug" varchar(255) NOT NULL,
	"paragraph_id" varchar(255),
	"content" json,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_slug_key" ON "comments" ("post_slug");