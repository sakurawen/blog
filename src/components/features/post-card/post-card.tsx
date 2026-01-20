import type { posts } from '~/db/schema';
import { Badge } from '~/components/ui/badge';
import { dayjs } from '~/lib/dayjs';
import { cn } from '~/lib/utils';

interface PostCardProps {
  post: RPCResponse<typeof posts.$inferSelect>
  className?: string
}

export function PostCard(props: PostCardProps) {
  const { post, className } = props;
  return (
    <div
      className={cn('rounded-xl border shadow-xs overflow-hidden hover:opacity-90 flex flex-col', className)}
    >
      <div className='w-full aspect-video'>
        <img className='w-full h-full min-h-32 md:max-h-48 object-fill' src={post.banner || ''} alt='' />
      </div>
      <div className='bg-background p-2 flex-1 select-none'>
        <h2 className='text-lg font-bold'>{post.title || 'Untitled'}</h2>
        <p className='text-xs mb-2 sm:line-clamp-2 lg:line-clamp-2'>
          {post.description || 'No description available'}
        </p>
        <div className='flex items-center justify-between'>
          <Badge className='uppercase' variant='outline'>
            {post.published ? 'Published' : 'Draft'}
          </Badge>
          <span className='text-xs opacity-50'>{dayjs(post.createdAt).format('YYYY-MM-DD')}</span>
        </div>
      </div>
    </div>
  );
}
