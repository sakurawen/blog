import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { PortableTextImage } from './portable-text-image';
import { PortableTextLink } from './portable-text-link';
const components: PortableTextComponents = {
  types: {
    image: PortableTextImage,
  },
  marks: {
    link: PortableTextLink,
  },
};

export function PostPortableText(props: { value: any; components?: PortableTextComponents }) {
  return (
    <PortableText
      value={props.value}
      components={props.components ?? components}
    />
  );
}
