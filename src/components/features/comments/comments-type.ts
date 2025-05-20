import type { Comment, User } from '~/generated/prisma';

export interface CommentWithUser extends Comment {
  user: User
}
