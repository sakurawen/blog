import type { S3Client } from '@aws-sdk/client-s3';
import type { auth } from '~/lib/auth';
import type { Database } from '~/lib/db';

export interface Env {
  Variables: {
    s3: S3Client
    db: Database
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
  }
}
