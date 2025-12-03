import { db } from '~/lib/db';
import { factory } from '../factory';

export const drizzleMiddleware = factory.createMiddleware(async (c, next) => {
  c.set('db', db());
  return next();
});
