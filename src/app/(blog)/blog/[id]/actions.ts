'use server';
import { db } from '~/lib/db';

export async function getPosts() {
  const drizzle = db();
  const posts = await drizzle.query.posts.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return posts;
}

export async function getPost(id: string) {
  const drizzle = db();
  const post = await drizzle.query.posts.findFirst({
    where: {
      id,
      published: true,
    },
  });
  return post;
}
