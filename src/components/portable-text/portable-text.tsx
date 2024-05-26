import { PortableText as PortableTextReact, type PortableTextComponents } from '@portabletext/react';
import { PortableTextImage } from './portable-text-image';
import { PortableTextLink } from './portable-text-link';
import { PortableTextCodeBlock } from './portable-text-code-block';

const components: PortableTextComponents = {
  types: {
    image: PortableTextImage,
    codeBlock: PortableTextCodeBlock,
  },
  marks: {
    link: PortableTextLink,
  },
};

export function PortableText(props: { value: any; components?: PortableTextComponents }) {
  return (
    <PortableTextReact
      value={props.value}
      components={props.components ?? components}
    />
  );
}