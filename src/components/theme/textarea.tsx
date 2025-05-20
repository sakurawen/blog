import type { ComponentProps } from 'react';
import { cn } from '~/lib/utils';

export interface TextareaProps extends ComponentProps<'textarea'> {}
export function Textarea(props: TextareaProps) {
  const { className, ...restProps } = props;
  return <textarea className={cn('bg-gray-50 transition border text-sm py-1.5 px-2.5 rounded-md focus-visible:ring-3  ring-transparent  focus-visible:ring-gray-200 focus-visible:border-gray-400', className)} {...restProps} />;
}
