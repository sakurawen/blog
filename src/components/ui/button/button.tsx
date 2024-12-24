'use client';
import type { VariantProps } from 'cva';
import { Icon } from '@iconify/react';
import { cva } from 'cva';
import { AnimatePresence, m } from 'motion/react';
import { type ComponentProps, useState } from 'react';
import { cn } from '~/lib/cn';

const buttonStyle = cva({
  base: 'inline-flex relative items-center rounded-md text-sm  cursor-default py-1.5 px-4 disabled:point-event-none disabled:cursor-not-allowed disabled:opacity-60',
  variants: {
    loading: {
      true: 'pointer-events-none select-none ',
      false: '',
    },
    variant: {
      primary: 'transition border border-zinc-200 text-white  bg-zinc-800 data-[loading=false]:hover:bg-zinc-900 data-[loading=false]:active:bg-zinc-600',
      default: 'transition border border-zinc-200 bg-zinc-100 data-[loading=false]:hover:bg-zinc-200 data-[loading=false]:active:bg-zinc-300',
      text: 'transition text-zinc-600 data-[loading=false]:hover:text-zinc-950 data-[loading=false]:hover:scale-105 data-[loading=false]:active:scale-95',
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
                className='absolute cursor-wait left-0 top-0 h-full w-full flex items-center justify-center bg-zinc-100/60 rounded-md'
                initial={loadingInit}
                animate={loadingAnimate}
                exit={loadingInit}
              >
                <Icon icon='ri:loader-5-fill' className='text-xl text-zinc-600 animate-spin' />
              </m.div>
            )
          : null}
      </AnimatePresence>
    </button>
  );
}
