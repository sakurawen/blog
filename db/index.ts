import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as userSchemas from './schemas/comment';

const pool = new Pool({ connectionString: process.env.PG_DATABASE_URL });

export const db = drizzle(pool, {
  schema: {
    ...userSchemas,
  },
});
