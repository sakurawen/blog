import { getTableColumns } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '~/db/client';
import { comments } from '~/db/schemas';
import { CommentsInput } from './comment-input';
import { CommentList } from './comment-list';
import { CommentSignInMask } from './comment-sign-in-mask';

async function getCommentList(postId: string) {
  return db.query.comments.findMany({
    where(fields, { eq }) {
      return eq(fields.postId, postId);
    },
    with: {
      user: true,
    },
  });
}

interface CommentProps {
  id: string
}
export async function Comment(props: CommentProps) {
  const { id } = props;
  const commentList = await getCommentList(id);
  async function createPostComment(create: typeof comments.$inferInsert) {
    'use server';
    revalidatePath(`/blog/${id}`);
    return db.insert(comments).values(create).returning(getTableColumns(comments));
  }
  return (
    <div className='comment w-full '>
      <CommentList list={commentList} />
      <CommentSignInMask>
        <CommentsInput id={id} createComment={createPostComment} />
      </CommentSignInMask>
    </div>
  );
}
