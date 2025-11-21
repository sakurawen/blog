import type { Post } from '~/generated/prisma/client';

interface PostCardProps {
  post: RPCResponse<Post>
}

export function PostCard(props: PostCardProps) {
  const { post } = props;
  return (
    <div
      className=' shadow-md border rounded-lg p-4 h-72 w-full md:w-fit md:aspect-16/12 bg-cover relative overflow-hidden hover:opacity-80 '
      style={{
        backgroundImage: `url(${post.banner})`,
      }}
    >
      <div className='absolute w-full bottom-0 left-0 bg-white/90 backdrop-blur-2xl p-2'>
        <h2 className='text-xl font-bold mb-2'>{post.title}</h2>
        <p className='text-gray-600 mb-4'>{post.description}</p>
        <div className='text-sm text-gray-500'>
          Slug:
          {post.slug}
        </div>
      </div>
    </div>
  );
}
