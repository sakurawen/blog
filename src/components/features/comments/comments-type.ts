import type { Comment, User } from '~/generated/prisma/client';

export interface CommentWithUser extends Comment {
  user: User
}
