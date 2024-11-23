import Image from 'next/image';
import { Social } from './social';

export function Hero() {
  return (
    <div className='hero container min-h-screen mx-auto flex items-center justify-center'>
      <div className='flex flex-col w-full justify-center  items-center space-y-12'>
        <div>
          <Image src='/image/avatar.jpg' width={220} height={220} className='rounded-full shadow-xl ring-1 ring-zinc-200' alt='avatar' />
        </div>
        <div className='text-center '>
          <h1 className='text-3xl mb-4'>
            Hello ,I'm
            <span className='font-bold'> Wen</span>
          </h1>
          <p className='text-2xl'>A NodeJS Full Stack Developer</p>
        </div>
        <div className='flex justify-center'>
          <Social className='mt-4' />
        </div>
      </div>
    </div>

  );
}
