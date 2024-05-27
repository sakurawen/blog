import { PortableTextComponentProps } from 'next-sanity';

export function PortableTextNormal(props: PortableTextComponentProps<any>) {
  const { value, children } = props;
  return <p className='leading-8 my-4'>{children}</p>;
}
