import { relations } from 'drizzle-orm';
import { pgTable } from 'drizzle-orm/pg-core';
import { user } from './auth';

export const comments = pgTable('comments', t => ({
  id: t.serial().primaryKey(),
  postId: t.text(),
  userId: t.text(),
  parentId: t.integer(),
  createAt: t.timestamp(),
  content: t.text(),
}));

export const commentRelations = relations(comments, ({ one }) => ({
  user: one(user, {
    fields: [comments.userId],
    references: [user.id],
  }),
}));
