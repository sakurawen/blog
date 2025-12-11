import type { posts } from '~/db/schema';
import { cn } from '~/lib/utils';

interface PostCardProps {
  post: RPCResponse<typeof posts.$inferSelect>
  className?: string
}

export function PostCard(props: PostCardProps) {
  const { post, className } = props;
  return (
    <div
      className={cn('rounded-xl border shadow-md overflow-hidden hover:opacity-80 transition   flex flex-col', className)}
    >
      <div className='w-full aspect-video'>
        <img className='w-full h-full object-fill' src={post.banner || ''} alt='' />
      </div>
      <div className='bg-background dark:bg-secondary-foreground p-2 flex-1'>
        <h2 className='text-lg font-bold mb-2'>{post.title}</h2>
        <p className=' text-xs mb-4 sm:line-clamp-2 lg:line-clamp-2'>{post.description}</p>
      </div>
    </div>
  );
}
