import { db } from '~/db/client';

export async function getCommentList(postId: string) {
  return db.query.comments.findMany({
    where(fields, { eq }) {
      return eq(fields.postId, postId);
    },
    with: {
      user: true,
    },
  });
}
