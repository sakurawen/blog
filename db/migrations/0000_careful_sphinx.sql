CREATE TABLE IF NOT EXISTS "comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text,
	"parentId" integer,
	"username" text,
	"createAt" timestamp,
	"content" text
);
