import type { VariantProps } from 'cva';
import type { ComponentProps } from 'react';
import { cva } from 'cva';
import { cn } from '~/lib/cn';

const buttonStyle = cva({
  base: 'inline-flex items-center rounded-md text-sm  cursor-pointer py-1.5 px-4 disabled:point-event-none disabled:cursor-not-allowed disabled:opacity-60',
  variants: {
    variant: {
      primary: 'transition border border-zinc-200 text-white  bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-600',
      default: 'transition border border-zinc-200 bg-zinc-100 hover:bg-zinc-100 active:bg-zinc-200',
      text: 'transition text-zinc-600 hover:text-zinc-950 hover:scale-105 active:scale-95',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type ButtonProps = ComponentProps<'button'> & VariantProps<typeof buttonStyle>;

export function Button(props: ButtonProps) {
  const {
    className,
    type = 'button',
    variant,
    ...restProps
  } = props;
  return <button className={cn(buttonStyle({ variant }), className)} type={type} {...restProps} />;
}
