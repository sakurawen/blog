import { boolean, jsonb, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

export const posts = pgTable('posts', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  title: varchar('title', { length: 256 }),
  content: jsonb('content'),
  createAt: timestamp('create_at'),
  updateAt: timestamp('update_at'),
  deleted: boolean('deleted').default(false),
  disabled: boolean('disabled').default(false),
});
