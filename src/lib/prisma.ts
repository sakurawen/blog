import { PrismaClient } from '~/generated/prisma';
import 'server-only';

export const prisma = new PrismaClient();
