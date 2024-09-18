CREATE TABLE IF NOT EXISTS "categorys" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"label" varchar(256),
	"deleted" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comments" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"user_info" json,
	"post_slug" varchar(256) NOT NULL,
	"paragraph_id" varchar(256),
	"content" json,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" varchar PRIMARY KEY NOT NULL,
	"content" jsonb,
	"create_at" timestamp,
	"update_at" timestamp
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_slug_key" ON "comments" USING btree ("post_slug");