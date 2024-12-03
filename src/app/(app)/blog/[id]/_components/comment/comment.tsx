import type { PropsWithChildren } from 'react';
import { CommentsInput } from './comment-input';
import { CommentList } from './comment-list';

interface CommentProps {
  id: string
}
export function Comment(props: CommentProps) {
  const { id } = props;
  return (
    <ComingMask>
      <div className='comment w-full '>
        <CommentsInput id={id} />
        <CommentList id={id} />
      </div>
    </ComingMask>
  );
}

export function ComingMask({ children }: PropsWithChildren) {
  return (
    <div className='pointer-events-none relative w-full select-none border border-zinc-50 rounded-md p-2'>
      <div className='absolute z-10 top-0 left-0 h-full w-full bg-white/60'>
        <div className='h-full w-full flex justify-center items-center'>
          comments coming soon...
        </div>
      </div>
      {children}
    </div>
  );
}
