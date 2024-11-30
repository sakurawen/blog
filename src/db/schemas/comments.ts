import { pgTable } from 'drizzle-orm/pg-core';

export const comments = pgTable('comments', t => ({
  id: t.serial().primaryKey(),
  parentId: t.integer(),
  username: t.text(),
  createAt: t.timestamp(),
  content: t.text(),
}));
