import { type PortableTextComponentProps } from '@portabletext/react';
import Image from 'next/image';

export function PortableTextImage(
  props: PortableTextComponentProps<{
    _key: string;
    url: string;
    dimensions: {
      width: number;
      height: number;
    };
    lqip?: string;
    label?: string;
    alt?: string;
  }>
) {
  const { value } = props;
  return (
    <Image
      src={value.url}
      width={value.dimensions.width}
      height={value.dimensions.height}
      placeholder={value.lqip ? 'blur' : 'empty'}
      blurDataURL={value.lqip}
      className='mx-auto h-full overflow-hidden object-contain my-4'
      alt={value.alt || ''}
      unoptimized
    />
  );
}
