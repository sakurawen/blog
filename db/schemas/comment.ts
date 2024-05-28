import { index, json, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const comments = pgTable(
  'comments',
  {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 255 }).notNull(),
    userInfo: json('user_info'),
    postSlug: varchar('post_slug', { length: 255 }).notNull(),
    paragraphId: varchar('paragraph_id', { length: 255 }),
    content: json('content'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => ({
    postSlugKey: index('post_slug_key').on(table.postSlug),
  })
);
