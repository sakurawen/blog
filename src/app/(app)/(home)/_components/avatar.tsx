'use client';
import Image from 'next/image';

export function Avatar() {
  return (
    <div className='relative h-56 w-56'>
      <Image src='/image/avatar.jpg' fill className='z-10 rounded-full shadow-xl pointer-events-none  ' alt='avatar' />
      <Image src='/image/avatar.jpg' fill className='rounded-full opacity-60 blur-xl pointer-events-none' alt='avatar shadow' aria-hidden />
    </div>
  );
}
