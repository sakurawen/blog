import * as sanityService from '~/service/sanity-service';
import {redis} from "~/lib/redis"
import { Post } from './post';

export const revalidate = 0;

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await sanityService.getPostBySlug(slug);
  let view = 0;
  if (process.env.NODE_ENV === 'production') {
    view = await redis.incr(slug);
  } else {
    view = (await redis.get(slug)) || 0;
  }
  return <Post post={post} view={view}/>;
}
