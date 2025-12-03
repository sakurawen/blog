import { pgTable, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';

export const tags = pgTable('tags', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
}, table => [
  uniqueIndex('tags_name_unique').on(table.name),
]);
