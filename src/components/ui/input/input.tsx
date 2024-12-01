import type { ComponentProps } from 'react';
import { cn } from '~/lib/cn';

export interface InputProps extends ComponentProps<'input'> {

}

export function Input(props: InputProps) {
  const { className, ...restProps } = props;
  return <input className={cn('bg-zinc-50 transition border text-sm py-1.5 px-2.5 rounded-md ring-2  ring-primary/0 focus-visible:bg-primary/10 focus-visible:ring-primary/20 focus-visible:border-primary/80 ', className)} {...restProps} />;
}
