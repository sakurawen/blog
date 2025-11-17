import { prisma } from '~/lib/prisma';
import { factory } from '../factory';

export const prismaMiddleware = factory.createMiddleware(async (c, next) => {
  c.set('prisma', prisma());
  return next();
});
