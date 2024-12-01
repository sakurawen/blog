import { CommentsInput } from './comment-input';
import { CommentList } from './comment-list';

interface CommentProps {
  id: string
}
export function Comment(props: CommentProps) {
  const { id } = props;
  return (
    <div className='comment w-full'>
      <CommentsInput id={id} />
      <CommentList id={id} />
    </div>
  );
}
