import type { VariantProps } from 'cva';
import type { ComponentProps } from 'react';
import { cva } from 'cva';
import { cn } from '~/lib/cn';

const buttonStyle = cva({
  base: 'inline-flex items-center rounded-md text-sm  cursor-pointer py-1.5 px-4 disabled:point-event-none disabled:cursor-not-allowed disabled:opacity-60',
  variants: {
    variant: {
      primary: 'transition border border-primary  bg-primary-fade hover:bg-primary active:bg-primary-deep',
      default: 'transition border border-zinc-100 bg-zinc-50 hover:bg-zinc-100 active:bg-zinc-200',
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
