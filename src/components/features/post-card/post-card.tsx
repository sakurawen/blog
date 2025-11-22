import type { Post } from '~/generated/prisma/client';
import { cn } from '~/lib/utils';

interface PostCardProps {
  post: RPCResponse<Post>
  className?: string
}

export function PostCard(props: PostCardProps) {
  const { post, className } = props;
  return (
    <div
      className={cn(' shadow-md border  bg-white rounded-xl overflow-hidden hover:opacity-80 flex flex-col', className)}
    >
      <div className='w-full aspect-video'>
        <img src={post.banner} alt='' />
      </div>
      <div className='bg-white p-2 flex-1'>
        <h2 className='text-lg font-bold mb-2'>{post.title}</h2>
        <p className=' text-xs mb-4 sm:line-clamp-2 lg:line-clamp-2'>{post.description}</p>
      </div>
    </div>
  );
}
