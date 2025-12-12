import { AdminContainer } from '~/components/admin/admin-container';
import { Posts } from './_components/posts';
import { PostsCreateButton } from './_components/posts-create-button';
import { PostsRefreshButton } from './_components/posts-refresh-button';

export default function PostsPage() {
  return (
    <AdminContainer className='space-y-4'>
      <div className='flex gap-4'>
        <PostsCreateButton />
        <PostsRefreshButton />
      </div>
      <Posts />
    </AdminContainer>
  );
}
