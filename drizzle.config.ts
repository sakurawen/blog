import { defineConfig } from 'drizzle-kit';

const config = defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schemas/*',
  out: './db/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});

export default config;
