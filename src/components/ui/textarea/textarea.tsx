import type { ComponentProps } from 'react';
import { cn } from '~/lib/cn';

export interface TextareaProps extends ComponentProps<'textarea'> {}
export function Textarea(props: TextareaProps) {
  const { className, ...restProps } = props;
  return <textarea className={cn('bg-zinc-50 transition text-sm border py-1.5 px-2.5 rounded-md ring-2  ring-primary/0 focus-visible:bg-primary/10 focus-visible:ring-primary/20 focus-visible:border-primary/80', className)} {...restProps} />;
}
