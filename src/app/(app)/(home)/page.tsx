import Image from 'next/image';
import { PageContainer } from '~/components/layout/page-container';
import { Social } from './_components/social';

export default function Home() {
  return (
    <PageContainer className='home overflow-hidden hero container min-h-screen mx-auto flex items-center justify-center'>
      <div className='flex flex-col w-full justify-center  items-center space-y-12'>
        <Image src='/image/avatar.png' width={260} height={260} className=' pointer-events-none' alt='avatar' />
        <div className='text-center '>
          <h1 className='text-3xl mb-4'>
            Hello ,I'm
            <span className='font-bold'> Wen</span>
          </h1>
          <p className='text-2xl'>A NodeJS Full Stack Developer</p>
        </div>
        <Social className='mt-4' />
      </div>
    </PageContainer>
  );
}
