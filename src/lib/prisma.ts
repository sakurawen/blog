import { PrismaClient } from '~/generated/prisma';

let prismaClient: PrismaClient;

export function prisma() {
  if (!prismaClient) {
    prismaClient = new PrismaClient();
  }
  return prismaClient;
}
