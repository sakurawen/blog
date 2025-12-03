import { pgTable, primaryKey, text } from 'drizzle-orm/pg-core';
import { posts } from './posts';
import { tags } from './tags';

export const postTags = pgTable('post_tags', {
  postId: text('post_id').notNull().references(() => posts.id),
  tagId: text('tag_id').notNull().references(() => tags.id),
}, table => [
  primaryKey({ columns: [table.postId, table.tagId] }),
]);
