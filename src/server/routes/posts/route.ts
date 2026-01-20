import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { posts } from '~/db/schema';
import { success } from '~/lib/result';
import { factory } from '~/server/factory';
import { authMiddleware } from '~/server/middleware/auth';
import { postsCreateSchema, postsDetailSchema, postsUpdateSchema } from './schema';

export const postsRouter = factory.createApp()
  // 获取文章列表
  .get('/', async (c) => {
    const list = await c.var.db.query.posts.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return c.json(success(list));
  })
  // 创建文章
  .post('/', authMiddleware, zValidator('json', postsCreateSchema), async (c) => {
    const data = c.req.valid('json');
    const [res] = await c.var.db
      .insert(posts)
      .values({
        ...data,
      })
      .returning();
    return c.json(success(res));
  })
  // 修改文章
  .put('/', authMiddleware, zValidator('json', postsUpdateSchema), async (c) => {
    const { id, ...rest } = c.req.valid('json');
    const [res] = await c.var.db
      .update(posts)
      .set({
        ...rest,
      })
      .where(eq(posts.id, id))
      .returning();
    return c.json(success(res));
  })
  // 获取文章详情
  .get('/:id', zValidator('param', postsDetailSchema), async (c) => {
    const { id } = c.req.valid('param');
    const post = await c.var.db.query.posts.findFirst({
      where: {
        id,
        published: true,
      },
    });
    return c.json(success(post));
  })
  // 删除文章
  .delete('/:id', authMiddleware, zValidator('param', postsDetailSchema), async (c) => {
    const { id } = c.req.valid('param');
    const [deleted] = await c.var.db
      .delete(posts)
      .where(eq(posts.id, id))
      .returning();
    return c.json(success(deleted));
  });
