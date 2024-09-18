import { boolean, index, json, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';
import { posts } from './post';

export const comments = pgTable(
  'comments',
  {
    id: varchar('id', { length: 256 }).primaryKey().$defaultFn(nanoid),
    userId: varchar('user_id', { length: 256 }).notNull(),
    userInfo: json('user_info'),
    postId: varchar('post_id', { length: 256 }).references(() => posts.id),
    paragraphId: varchar('paragraph_id', { length: 256 }),
    content: json('content'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    deleted: boolean('deleted').default(false),
  },
);
