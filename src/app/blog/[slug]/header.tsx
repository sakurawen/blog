'use client';
import { throttle } from 'lodash-es';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Header() {
  const [scrollTop, setScrollTop] = useState(0);
  const [prevScrollTop, setPrevScrollTop] = useState(scrollTop);

  useEffect(() => {
    return () => {
      setPrevScrollTop(scrollTop);
    };
  }, [scrollTop]);

  useEffect(() => {
    function scroll() {
      const top = document.documentElement.scrollTop;
      setScrollTop(top);
    }
    const throttleScroll = throttle(scroll, 50);
    document.addEventListener('scroll', throttleScroll);
    return () => {
      document.removeEventListener('scroll', throttleScroll);
    };
  }, []);

  const arrow = scrollTop > prevScrollTop ? 'down' : 'up';

  return (
    <div
      className='sticky top-6 mb-16 flex w-full items-center justify-between transition-all'
      style={{
        top: arrow === 'up' ? 24 : -80,
      }}
    >
      <div>
        <Link
          className='inline-block rounded-lg bg-white/80 px-2.5 py-1 shadow backdrop-blur hover:bg-zinc-50'
          href='/'
        >
          首 页
        </Link>
      </div>
      <div>
        {/* <SignInButton /> */}
        {/* <UserButton /> */}
      </div>
    </div>
  );
}
