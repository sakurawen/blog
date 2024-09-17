import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...value: ClassValue[]) {
  return twMerge(clsx(value));
}
