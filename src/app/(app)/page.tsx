import Image from 'next/image';
import Link from 'next/link';
import { Button } from '~/components/ui/button';
import { PageContainer } from '~/components/ui/page-container';
import { Social } from './_components/social';

export default function Home() {
  return (
    <PageContainer className='home overflow-hidden container  mx-auto '>
      <div className='min-h-screen flex flex-col w-full justify-center  items-center space-y-8'>
        <Image src='/image/avatar.jpg' width={144} height={144} className='object-contain shrink-0 pointer-events-none rounded-full' alt='avatar' />
        <div className='text-center '>
          <h1 className='text-3xl mb-4'>
            Hello ,I'm
            <span className='font-bold'> Wen</span>
          </h1>
          <p className='text-2xl'>A NodeJS Full Stack Developer</p>
        </div>
        <Social />
        <Link href='/blog'>
          <Button className='px-8 rounded-full'>Blog</Button>
        </Link>
      </div>
    </PageContainer>
  );
}
