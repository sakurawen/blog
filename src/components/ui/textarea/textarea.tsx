import type { ComponentProps } from 'react';
import { cn } from '~/lib/cn';

export interface TextareaProps extends ComponentProps<'textarea'> {}
export function Textarea(props: TextareaProps) {
  const { className, ...restProps } = props;
  return <textarea className={cn('bg-zinc-50 transition border text-sm py-1.5 px-2.5 rounded-md focus-visible:ring-3  ring-transparent  focus-visible:ring-zinc-200 focus-visible:border-zinc-400', className)} {...restProps} />;
}
