'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { throttle } from 'lodash-es';
import { SignInButton } from '~/components/ui/sign-in-button';
import { UserButton } from '~/components/ui/user-button';

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
      className='transition-all flex items-center justify-between w-full sticky top-6 mb-16'
      style={{
        top: arrow === 'up' ? 24 : -80,
      }}>
      <div>
        <Link
          className='inline-block py-1 px-2.5 backdrop-blur shadow bg-white/80 hover:bg-zinc-50 rounded-lg'
          href='/'>
          首 页
        </Link>
      </div>
      <div>
        <SignInButton />
        <UserButton />
      </div>
    </div>
  );
}
