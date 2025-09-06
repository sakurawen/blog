import type { PrismaClient } from '~/generated/prisma';
import type { auth } from '~/lib/auth';

export interface Env {
  Variables: {
    prisma: PrismaClient
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
  }
}
