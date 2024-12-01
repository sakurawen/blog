import { pgTable } from 'drizzle-orm/pg-core';

export const comments = pgTable('comments', t => ({
  id: t.serial().primaryKey(),
  slug: t.text(),
  parentId: t.integer(),
  username: t.text(),
  createAt: t.timestamp(),
  content: t.text(),
  email: t.text(),
  url: t.text(),
  login: t.boolean().default(false),
}));
