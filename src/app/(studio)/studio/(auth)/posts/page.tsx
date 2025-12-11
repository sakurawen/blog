import Link from 'next/link';
import { AdminContainer } from '~/components/admin/admin-container';
import { Button } from '~/components/ui/button';
import { Posts } from './_components/posts';
import { PostsRefreshButton } from './_components/posts-refresh-button';

export default function PostsPage() {
  return (
    <AdminContainer className='space-y-4'>
      <div className='flex gap-4'>
        <Link href='/studio/posts/upsert'>
          <Button>New Post</Button>
        </Link>
        <PostsRefreshButton />
      </div>
      <Posts />
    </AdminContainer>
  );
}
