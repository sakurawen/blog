import { getTableColumns } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '~/db/client';
import { comments } from '~/db/schemas';
import { CommentsInput } from './comment-input';
import { CommentList } from './comment-list';
import { CommentSignInMask } from './comment-sign-in-mask';

interface CommentProps {
  id: string
}
export function Comment(props: CommentProps) {
  const { id } = props;
  async function createPostComment(create: typeof comments.$inferInsert) {
    'use server';
    revalidatePath(`/blog/${id}`);
    return db.insert(comments).values(create).returning(getTableColumns(comments));
  }
  return (
    <div className='comment w-full '>
      <CommentList id={id} />
      <CommentSignInMask>
        <CommentsInput id={id} createComment={createPostComment} />
      </CommentSignInMask>
    </div>
  );
}
