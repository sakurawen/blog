'use server';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { comments } from '~/db/schema';
import { auth } from '~/lib/auth';
import { db } from '~/lib/db';

export async function getComments(postId: string) {
  const result = await db().query.comments.findMany({
    where: {
      postId,
    },
    with: {
      user: true,
    },
  });
  return result;
}

export async function createComment(data: {
  postId: string
  content: string
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error('Unauthorized');
  }
  const [comment] = await db()
    .insert(comments)
    .values({
      ...data,
      createdAt: new Date(),
      userId: session.user.id,
    })
    .returning();
  revalidatePath(`/blog/${data.postId}`);
  return comment;
}
