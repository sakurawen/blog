import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '~/generated/prisma/client';

import 'server-only';

let prismaClient: PrismaClient;

export function prisma() {
  if (!prismaClient) {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });
    prismaClient = new PrismaClient({ adapter });
  }
  return prismaClient;
}
