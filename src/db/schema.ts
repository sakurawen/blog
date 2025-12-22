import { createId } from '@paralleldrive/cuid2';
import { sql } from 'drizzle-orm';
import { bigint, boolean, json, pgSchema, pgTable, primaryKey, serial, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';

export const drizzle = pgSchema('drizzle');

export const drizzleMigrationsInDrizzle = drizzle.table('__drizzle_migrations', {
  id: serial().primaryKey(),
  hash: text().notNull(),
  createdAt: bigint('created_at', { mode: 'number' }),
});

export const accounts = pgTable('accounts', {
  id: text().primaryKey().$defaultFn(createId),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text(),
  password: text(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const comments = pgTable('comments', {
  id: text().primaryKey().$defaultFn(createId),
  postId: text('post_id').notNull(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  parentId: text('parent_id'),
  createdAt: timestamp('created_at').notNull(),
  content: text().notNull(),
});

export const postTags = pgTable('post_tags', {
  postId: text('post_id').notNull().references(() => posts.id),
  tagId: text('tag_id').notNull().references(() => tags.id),
}, table => [
  primaryKey({ columns: [table.postId, table.tagId], name: 'post_tags_pkey' }),
]);

export const posts = pgTable('posts', {
  id: text().primaryKey().$defaultFn(createId),
  title: text(),
  description: text(),
  summary: text(),
  banner: text(),
  htmlContent: text('html_content'),
  textContent: text('text_content'),
  jsonContent: json('json_content'),
  slug: text(),
  createdAt: timestamp('created_at').default(sql`now()`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`now()`).notNull(),
}, table => [
  uniqueIndex('posts_slug_unique').using('btree', table.slug.asc().nullsLast()),
]);

export const sessions = pgTable('sessions', {
  id: text().primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text().notNull(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  impersonatedBy: text('impersonated_by'),
}, table => [
  uniqueIndex('sessions_token_unique').using('btree', table.token.asc().nullsLast()),
]);

export const tags = pgTable('tags', {
  id: text().primaryKey(),
  name: text().notNull(),
  createdAt: timestamp('created_at').default(sql`now()`).notNull(),
  updatedAt: timestamp('updated_at').notNull(),
}, table => [
  uniqueIndex('tags_name_unique').using('btree', table.name.asc().nullsLast()),
]);

export const users = pgTable('users', {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull(),
  emailVerified: boolean('email_verified').notNull(),
  image: text(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  banExpires: timestamp('ban_expires'),
  banReason: text('ban_reason'),
  banned: boolean().default(false),
  role: text(),
}, table => [
  uniqueIndex('users_email_unique').using('btree', table.email.asc().nullsLast()),
]);

export const verifications = pgTable('verifications', {
  id: text().primaryKey(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

export const visitors = pgTable('visitors', {
  id: text().primaryKey().$defaultFn(createId),
  visitorId: text('visitor_id').notNull(),
  firstSeenAt: timestamp('first_seen_at').default(sql`now()`).notNull(),
  lastSeenAt: timestamp('last_seen_at').default(sql`now()`).notNull(),
  ipAddress: text('ip_address'),
  country: text(),
  city: text(),
}, table => [
  uniqueIndex('visitors_visitor_id_unique').using('btree', table.visitorId.asc().nullsLast()),
]);

export const pageviews = pgTable('pageviews', {
  id: text().primaryKey().$defaultFn(createId),
  visitorId: text('visitor_id').notNull(),
  path: text().notNull(),
  referrer: text(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  device: text(),
  browser: text(),
  browserVersion: text('browser_version'),
  os: text(),
  osVersion: text('os_version'),
  country: text(),
  city: text(),
  timestamp: timestamp().default(sql`now()`).notNull(),
  duration: bigint({ mode: 'number' }),
}, table => [
  uniqueIndex('pageviews_timestamp_idx').using('btree', table.timestamp.desc().nullsLast()),
  uniqueIndex('pageviews_path_idx').using('btree', table.path.asc().nullsLast()),
]);
