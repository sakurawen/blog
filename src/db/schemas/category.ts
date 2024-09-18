import { boolean, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

export const categorys = pgTable('categorys', {
  id: varchar('id', { length: 256 }).primaryKey().$defaultFn(nanoid),
  label: varchar('label', { length: 256 }),
  deleted: boolean('deleted').default(false),
});
