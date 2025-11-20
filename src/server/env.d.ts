import type { S3Client } from '@aws-sdk/client-s3';
import type { PrismaClient } from '~/generated/prisma/client';
import type { auth } from '~/lib/auth';

export interface Env {
  Variables: {
    s3: S3Client
    prisma: PrismaClient
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
  }
}
