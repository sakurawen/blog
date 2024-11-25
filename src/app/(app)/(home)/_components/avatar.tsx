'use client';
import { m } from 'motion/react';
import Image from 'next/image';

export function Avatar() {
  return (
    <m.div className='relative h-56 w-56' initial={{ opacity: 0, scale: 0, y: 100, x: -100 }} animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}>
      <Image src='/image/avatar.jpg' fill className='z-10 rounded-full shadow-xl pointer-events-none  ' alt='avatar' />
      <Image src='/image/avatar.jpg' fill className='rounded-full opacity-60 blur-xl pointer-events-none' alt='avatar' />
    </m.div>
  );
}
