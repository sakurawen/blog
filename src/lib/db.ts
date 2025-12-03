import { drizzle } from 'drizzle-orm/node-postgres';
import { relations } from '~/db/relations';
import * as schema from '~/db/schemas';

import 'server-only';

let drizzleClient: ReturnType<typeof drizzle<typeof schema, typeof relations>> | null = null;

export function db() {
  if (!drizzleClient) {
    drizzleClient = drizzle(process.env.DATABASE_URL!, {
      schema,
      relations,
    });
  }
  return drizzleClient;
}

export type Database = ReturnType<typeof db>;
