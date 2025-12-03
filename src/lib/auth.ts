import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { betterAuth } from 'better-auth/minimal';
import { nextCookies } from 'better-auth/next-js';
import { admin } from 'better-auth/plugins';
import { db } from './db';
import { env } from './env';

export const auth = betterAuth({
  database: drizzleAdapter(db(), { provider: 'pg' }),
  plugins: [nextCookies(), admin()],
  emailAndPassword: {
    enabled: true,
  },
  session: {
    modelName: 'sessions',
  },
  account: {
    modelName: 'accounts',
  },
  verification: {
    modelName: 'verifications',
  },
  user: {
    modelName: 'users',
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
});
