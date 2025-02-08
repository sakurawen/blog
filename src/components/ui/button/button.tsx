'use client';
import type { VariantProps } from 'cva';
import { Icon } from '@iconify/react';
import { cva } from 'cva';
import { AnimatePresence, m } from 'motion/react';
import { type ComponentProps, useState } from 'react';
import { cn } from '~/lib/cn';

const buttonStyle = cva({
  base: 'inline-flex relative items-center rounded-lg text-sm  transition-colors cursor-default py-2 px-4 disabled:point-event-none disabled:cursor-not-allowed disabled:opacity-60',
  variants: {
    loading: {
      true: 'pointer-events-none select-none ',
      false: '',
    },
    variant: {
      primary: 'transition border border-gray-200 text-white  bg-gray-800 data-[loading=false]:hover:bg-gray-900 data-[loading=false]:active:bg-gray-700',
      default: 'transition border border-gray-200/60 text-gray-800 bg-gray-100 data-[loading=false]:hover:bg-gray-200 data-[loading=false]:active:bg-gray-300',
      text: 'transition text-gray-600 data-[loading=false]:hover:text-gray-950 data-[loading=false]:hover:scale-105 data-[loading=false]:active:scale-95',
    },
  },
  defaultVariants: {
    variant: 'default',
    loading: false,
  },
});

export type ButtonProps = ComponentProps<'button'> & VariantProps<typeof buttonStyle> & {
  loading?: boolean
};

const loadingInit = {
  opacity: 0,
};

const loadingAnimate = {
  opacity: 1,
};
export function Button(props: ButtonProps) {
  const {
    className,
    type = 'button',
    variant,
    loading: propsLoading,
    children,
    onClick,
    ...restProps
  } = props;
  const [internalLoading, setInternalLoading] = useState(false);

  const loading = propsLoading || internalLoading;

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (loading) {
      return;
    }
    const p = onClick?.(e) as any;
    if (p instanceof Promise) {
      setInternalLoading(true);
      p.finally(() => {
        setInternalLoading(false);
      });
    }
  }
  return (
    <button className={cn(buttonStyle({ variant, loading }), className)} type={type} onClick={handleClick} data-loading={loading} {...restProps}>
      {children}
      <AnimatePresence>
        {loading
          ? (
              <m.div
                className='absolute cursor-wait left-0 top-0 h-full w-full flex items-center justify-center bg-gray-100/60 rounded-md'
                initial={loadingInit}
                animate={loadingAnimate}
                exit={loadingInit}
              >
                <Icon icon='ri:loader-5-fill' className='text-xl text-gray-600 animate-spin' />
              </m.div>
            )
          : null}
      </AnimatePresence>
    </button>
  );
}
