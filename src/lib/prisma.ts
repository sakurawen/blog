import { PrismaClient } from '~/generated/prisma';
import 'server-only';

let prismaClient: PrismaClient;

export function prisma() {
  if (!prismaClient) {
    prismaClient = new PrismaClient();
  }
  return prismaClient;
}
