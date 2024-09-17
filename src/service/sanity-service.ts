import { groq } from 'next-sanity';

import { getDate } from '~/lib/date';
import { client } from '~/sanity/lib/client';

/**
 * 获取文章列表
 */
export async function getPostsList() {
  return client.fetch<
    Array<{
      _id: string
      title: string
      slug: string
      description: string
      publishedAt: string
    }>
  >(groq`
  *[_type=="post" && publishedAt <= "${getDate().toISOString()}"] {
    _id,
    title,
    description,
    "slug":slug.current,
    publishedAt
  }
  `);
}

/**
 * 获取文章
 * @param slug
 */
export async function getPostBySlug(slug: string) {
  return client.fetch<{
    title: string
    publishedAt: string
    content: any
    description: string
    slug: string
  }>(
    groq`
  *[_type=='post' && slug.current == $slug && !(_id in path("drafts.**"))][0]{
    _id,
    title,
    "slug": slug.current,
    description,
    publishedAt,
    content[]{
      ...,
      _type == "image" => {
        "url": asset->url,
        "lqip": asset->metadata.lqip,
        "dimensions": asset->metadata.dimensions,
        ...
      }
    },
    "headings": body[length(style) == 2 && string::startsWith(style, "h")],
  }
  `,
    { slug },
  );
}
