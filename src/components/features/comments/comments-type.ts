import type { comments, users } from '~/db/schemas';

export type Comment = typeof comments.$inferSelect;
export type User = typeof users.$inferSelect;

export interface CommentWithUser extends Comment {
  user: User
}
