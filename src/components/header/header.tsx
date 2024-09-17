'use client';
import { useIsClient } from 'foxact/use-is-client';
import { motion } from 'framer-motion';
import { Balancer } from 'react-wrap-balancer';
import { Novatrix } from 'uvcanvas';

import { Social } from '~/components/social';

export function Header() {
  const isClient = useIsClient();
  if (!isClient) {
    return <div className='mx-auto h-96 bg-zinc-100/50' />;
  }
  return (
    <div className='relative mx-auto  h-96 overflow-hidden'>
      <Novatrix />
      <div className='absolute bottom-0 left-0  z-10 w-full'>
        <motion.div
          className='p-3'
          initial={{
            y: 20,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
        >
          <h1 className='mb-2 text-5xl  font-bold md:text-7xl'>WEN</h1>
          <p className='mr-16 text-sm'>
            <Balancer>
              Hello, I am Wen, a programmer, I build user interface. Besides coding, I enjoy watching Japanese tokusatsu
              animations, which bring me a lot of inspiration and joy. If you have any questions or suggestions, please
              feel free to reach out to me via email at&ensp;
              <a
                className='underline'
                href='mailto://wisakura@outlook.com'
              >
                wisakura@outlook.com
              </a>
              .
            </Balancer>
          </p>
        </motion.div>
        <div className='bg-gradient-to-t from-white to-transparent px-3 pb-6'>
          <motion.div
            transition={{ delay: 0.1 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Social />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
