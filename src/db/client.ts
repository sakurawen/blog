import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schemas';

export const db = drizzle(process.env.DATABASE_URL!, { casing: 'snake_case', schema });
