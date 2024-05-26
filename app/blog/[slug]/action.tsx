'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { throttle } from 'lodash-es';
export function Action() {
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
      className='bg-white/80 transition-all ring-1 ring-zinc-50  ring-inset shadow backdrop-blur rounded-full  fixed left-1/2 -translate-x-1/2'
      style={{
        top: arrow === 'up' ? 24 : -80,
      }}>
      <Link
        className='inline-block py-2 px-12  rounded-full hover:bg-zinc-100/80'
        href='/'>
        首页
      </Link>
    </div>
  );
}
