import type { ComponentProps } from 'react';
import { cn } from '~/lib/cn';

export interface InputProps extends ComponentProps<'input'> {

}

export function Input(props: InputProps) {
  const { className, ...restProps } = props;
  return <input className={cn('bg-zinc-50 transition border text-sm py-1.5 px-2.5 rounded-md focus-within:ring-3  ring-transparent  focus-visible:ring-zinc-200 focus-visible:border-zinc-400 ', className)} {...restProps} />;
}
