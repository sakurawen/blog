'use server';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { auth } from '~/lib/auth';
import { prisma } from '~/lib/prisma';

export async function getComments(postId: string) {
  const comments = await prisma().comment.findMany({
    where: {
      postId,
    },
    include: {
      user: true,
    },
  });
  return comments;
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
  const comment = await prisma().comment.create({
    data: {
      ...data,
      createdAt: new Date(),
      userId: session.user.id,
    },
  });
  revalidatePath(`/blog/${data.postId}`);
  return comment;
}
