ALTER TABLE "comments" RENAME COLUMN "slug" TO "post_id";--> statement-breakpoint
ALTER TABLE "comments" ADD COLUMN "user_id" text;--> statement-breakpoint
ALTER TABLE "comments" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "comments" DROP COLUMN IF EXISTS "url";--> statement-breakpoint
ALTER TABLE "comments" DROP COLUMN IF EXISTS "login";