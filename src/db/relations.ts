import { defineRelations } from 'drizzle-orm';
import * as schema from './schemas';

export const relations = defineRelations(schema, r => ({
  users: {
    sessions: r.many.sessions(),
    accounts: r.many.accounts(),
    comments: r.many.comments(),
  },

  // Session relations
  sessions: {
    user: r.one.users({
      from: r.sessions.userId,
      to: r.users.id,
    }),
  },

  // Account relations
  accounts: {
    user: r.one.users({
      from: r.accounts.userId,
      to: r.users.id,
    }),
  },

  // Comment relations
  comments: {
    user: r.one.users({
      from: r.comments.userId,
      to: r.users.id,
    }),
  },

  // Post relations - many-to-many with tags through postTags
  posts: {
    tags: r.many.tags({
      from: r.posts.id.through(r.postTags.postId),
      to: r.tags.id.through(r.postTags.tagId),
    }),
  },

  // Tag relations - many-to-many with posts through postTags
  tags: {
    posts: r.many.posts({
      from: r.tags.id.through(r.postTags.tagId),
      to: r.posts.id.through(r.postTags.postId),
    }),
  },

  // PostTag relations (junction table)
  postTags: {
    post: r.one.posts({
      from: r.postTags.postId,
      to: r.posts.id,
    }),
    tag: r.one.tags({
      from: r.postTags.tagId,
      to: r.tags.id,
    }),
  },
}));
