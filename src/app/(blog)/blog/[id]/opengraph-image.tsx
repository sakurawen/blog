import { eq } from 'drizzle-orm';
import { ImageResponse } from 'next/og';
import { posts } from '~/db/schema';
import { db } from '~/lib/db';

export const runtime = 'nodejs';

export const alt = 'Blog Post Preview';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const drizzle = db();
  const post = await drizzle.select().from(posts).where(eq(posts.id, id)).limit(1).then(res => res[0] ?? null);

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 64,
            background: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Post Not Found
        </div>
      ),
      { ...size },
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'https://localhost:3000';
  const bannerUrl = post.banner ? (post.banner.startsWith('http') ? post.banner : `${baseUrl}${post.banner}`) : null;

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {bannerUrl
          ? (
              <img
                src={bannerUrl}
                alt='Banner'
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            )
          : (
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              />
            )}

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.8) 100%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '80px 60px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 16,
              alignItems: 'center',
            }}
          >
            <span
              style={{
                background: '#2563eb',
                color: 'white',
                padding: '8px 20px',
                borderRadius: 8,
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              Blog
            </span>
            <span
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: 20,
              }}
            >
              {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
            </span>
          </div>

          <h1
            style={{
              color: 'white',
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1.2,
              margin: 0,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.title}
          </h1>

          {post.description && (
            <p
              style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: 24,
                margin: 0,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {post.description}
            </p>
          )}
        </div>

        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <span
            style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: 20,
              fontWeight: 500,
            }}
          >
            akumanoko.com
          </span>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              fontWeight: 700,
              color: '#2563eb',
            }}
          >
            S
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
