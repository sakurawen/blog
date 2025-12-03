import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';

export const comments = pgTable('comments', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  postId: text('post_id').notNull(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  parentId: text('parent_id'),
  createdAt: timestamp('created_at').notNull(),
  content: text('content').notNull(),
});
