import dayjs from 'dayjs';
import Image from 'next/image';
import { db } from '~/db/client';

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
export async function CommentList({ id }: CommentProps) {
  const data = await getCommentList(id);
  return (
    <div className='comment-list w-full'>
      {
        data.map((comment) => {
          return (
            <CommentListItem key={comment.id} comment={comment} />
          );
        })
      }
    </div>
  );
}

type Comment = Awaited<ReturnType<typeof getCommentList>>[number];
function CommentListItem({ comment }: { comment: Comment }) {
  function formatNow(date?: Date | null) {
    if (!date) {
      return '-';
    }
    return dayjs(date).fromNow();
  }
  return (
    <div className='comment-list-item gap-4 flex items-end !mb-4'>
      <div>
        <Image width={32} height={32} className='rounded-full' src={comment.user?.image || ''} alt='avatar' />
      </div>
      <div>
        <div className='pl-1 space-x-2'>
          <span className='font-bold'>{comment.user?.name}</span>
          <span className='text-xs'>{formatNow(comment.createAt)}</span>
        </div>
        <p className='inline-block text-sm bg-zinc-100 rounded-t-xl rounded-br-xl p-2'>{comment.content}</p>
      </div>
    </div>
  );
}
