import { SignOutButton } from '~/components/modules/auth/sign-out-button/sign-out-button';
import { CommentsInput } from './comment-input';
import { CommentList } from './comment-list';
import { CommentSignInMask } from './comment-sign-in-mask';

interface CommentProps {
  id: string
}
export function Comment(props: CommentProps) {
  const { id } = props;
  return (
    <div className='comment w-full '>
      <CommentSignInMask>
        <CommentsInput id={id} />
      </CommentSignInMask>
      <CommentList id={id} />
      <div className='text-center pt-24'>
        <SignOutButton />
      </div>
    </div>
  );
}
