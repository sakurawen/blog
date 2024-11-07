import Image from 'next/image';
import { Social } from './social';

export function Hero() {
  return (
    <div className='hero container mx-auto min-h-screen flex items-center justify-center'>
      <div className='flex w-full justify-center gap-24 sm:flex-row flex-col items-center'>
        <div className='sm:p-0 p-4'>
          <h1 className='text-4xl'>
            Hello ,I'm
            <span className='font-bold'> Wen</span>
          </h1>
          <br />
          <p className='text-4xl'>A NodeJS Full Stack Developer</p>
          <Social className='mt-4' />
        </div>
        <div>
          <Image src='/image/avatar.jpg' width={320} height={320} className='rounded-full shadow-xl ring-1 ring-zinc-200' alt='avatar' />
        </div>
      </div>
    </div>
  );
}
