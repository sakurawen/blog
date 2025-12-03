import { json, pgTable, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  description: text('description').notNull(),
  summary: text('summary').notNull(),
  banner: text('banner').notNull(),
  htmlContent: text('html_content'),
  textContent: text('text_content'),
  jsonContent: json('json_content'),
  slug: text('slug').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
}, table => [
  uniqueIndex('posts_slug_unique').on(table.slug),
]);
