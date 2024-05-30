'use client';
import { Novatrix } from 'uvcanvas';
import { Social } from '~/components/social';
import { motion } from 'framer-motion';
import { Balancer } from 'react-wrap-balancer';
import { useIsClient } from 'usehooks-ts';

export function Header() {
  const isClient = useIsClient();
  if (!isClient) {
    return <div className='h-96 mx-auto bg-zinc-100/50'></div>;
  }
  return (
    <div className='h-96 mx-auto  overflow-hidden relative'>
      <Novatrix />
      <div className='absolute z-10 w-full  bottom-0 left-0'>
        <motion.div
          className='p-3'
          initial={{
            y: 20,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}>
          <h1 className='text-5xl md:text-7xl  font-bold mb-2'>WEN</h1>
          <p className='text-sm mr-16'>
            <Balancer>
              Hello, I am Wen, a programmer, I build user interface. Besides coding, I enjoy watching Japanese tokusatsu
              animations, which bring me a lot of inspiration and joy. If you have any questions or suggestions, please
              feel free to reach out to me via email at&ensp;
              <a
                className='underline'
                href='mailto://wisakura@outlook.com'>
                wisakura@outlook.com
              </a>
              .
            </Balancer>
          </p>
        </motion.div>
        <div className='bg-gradient-to-t px-3 from-white to-transparent pb-6'>
          <motion.div
            transition={{ delay: 0.1 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}>
            <Social />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
