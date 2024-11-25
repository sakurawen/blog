import { Avatar } from './avatar';
import { Social } from './social';

export function Hero() {
  return (
    <div className='hero container min-h-screen mx-auto flex items-center justify-center'>
      <div className='flex flex-col w-full justify-center  items-center space-y-12'>
        <Avatar />
        <div className='text-center '>
          <h1 className='text-3xl mb-4'>
            Hello ,I'm
            <span className='font-bold'> Wen</span>
          </h1>
          <p className='text-2xl'>A NodeJS Full Stack Developer</p>
        </div>
        <Social className='mt-4' />
      </div>
    </div>
  );
}
