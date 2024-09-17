import type { PortableTextComponentProps } from 'next-sanity';

export function PortableTextNormal(props: PortableTextComponentProps<any>) {
  const { value, children } = props;
  return <p className='my-4 leading-8'>{children}</p>;
}
