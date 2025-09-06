import type { Env } from '~/server/env';
import { createFactory } from 'hono/factory';

export const factory = createFactory<Env>();
