import { groq } from 'next-sanity';
import { getDate } from '~/lib/date';
import { sanity } from '~/lib/sanity';

/**
 * 获取文章列表
 */
export async function getPostsList() {
  return sanity.fetch<
    Array<{
      _id: string;
      title: string;
      slug:{
        current:string,
        _type:string
      }
      description: string;
      publishedAt: string;
    }>
  >(groq`
  *[_type=="post" && publishedAt <= "${getDate().toISOString()}"] {
    _id,
    title,
    description,
    slug,
    publishedAt
  }
  `);
}
