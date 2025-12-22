'use client';

import type { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

// 获取或创建访客 ID
function getVisitorId(): string {
  const STORAGE_KEY = 'visitor_id';

  // 尝试从 localStorage 获取
  if (typeof window !== 'undefined') {
    let visitorId = localStorage.getItem(STORAGE_KEY);

    if (!visitorId) {
      // 生成新的访客 ID
      visitorId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem(STORAGE_KEY, visitorId);
    }

    return visitorId;
  }

  return 'unknown';
}

export function AnalyticsProvider({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    // 避免重复追踪同一路径
    if (pathname === lastPathRef.current) {
      return;
    }

    // 过滤管理后台路径，不记录 /studio 开头的访问
    if (pathname.startsWith('/studio')) {
      return;
    }

    lastPathRef.current = pathname;

    const visitorId = getVisitorId();
    const referrer = typeof document !== 'undefined' ? document.referrer : '';

    // 发送追踪请求
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        visitorId,
        path: pathname,
        referrer: referrer || undefined,
      }),
      // 使用 keepalive 确保在页面卸载时也能发送
      keepalive: true,
    }).catch(() => {
      // 静默失败，不影响用户体验
    });
  }, [pathname]);

  return <>{children}</>;
}
